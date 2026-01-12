import { supabase } from '../supabaseClient';

/**
 * Fetch all invoices with filters
 */
export const fetchInvoices = async (filters = {}) => {
    try {
        let query = supabase
            .from('invoices')
            .select('*, contacts(id, full_name, company), projects(id, name)')
            .order('created_at', { ascending: false });

        if (filters.status && filters.status !== 'all') {
            query = query.eq('status', filters.status);
        }

        if (filters.project_id) {
            query = query.eq('project_id', filters.project_id);
        }

        if (filters.contact_id) {
            query = query.eq('contact_id', filters.contact_id);
        }

        if (filters.search) {
            query = query.or(`invoice_number.ilike.%${filters.search}%,notes.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return { data: [], error };
    }
};

/**
 * Fetch invoice by ID with lines
 */
export const fetchInvoiceById = async (invoiceId) => {
    try {
        const { data, error } = await supabase
            .from('invoices')
            .select(`
                *,
                lines:invoice_lines(*),
                contact:contacts(id, full_name, email, tax_id, fiscal_address, city, postal_code, country, company),
                project:projects(id, name)
            `)
            .eq('id', invoiceId)
            .single();

        if (error) throw error;

        if (data?.lines) {
            data.lines.sort((a, b) => a.position - b.position);
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching invoice:', error);
        return { data: null, error };
    }
};

/**
 * Generar número de factura secuencial correlativo (YYYY/NNNN)
 * OBLIGATORIO por normativa fiscal española: correlativo y sin saltos.
 */
const generateInvoiceNumber = async () => {
    try {
        const year = new Date().getFullYear();

        const { data: config, error: fetchError } = await supabase
            .from('company_config')
            .select('*')
            .single();

        if (fetchError || !config) {
            // Fallback si no hay config todavía
            return `${year}/0001`;
        }

        let nextCounter = (config.invoice_year === year) ? (config.invoice_counter + 1) : 1;

        const { error: updateError } = await supabase
            .from('company_config')
            .update({
                invoice_counter: nextCounter,
                invoice_year: year
            })
            .eq('id', config.id);

        if (updateError) throw updateError;

        return `${year}/${nextCounter.toString().padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generating invoice number:', error);
        return `${new Date().getFullYear()}/ERR`;
    }
};

/**
 * Create invoice
 */
export const createInvoice = async (invoiceData) => {
    try {
        // Generate a sequential invoice number if not provided
        let invoiceNumber = invoiceData.invoice_number;
        if (!invoiceNumber) {
            invoiceNumber = await generateInvoiceNumber();
        }

        const { data, error } = await supabase
            .from('invoices')
            .insert({
                project_id: invoiceData.project_id || null,
                contact_id: invoiceData.contact_id || null,
                quote_id: invoiceData.quote_id || null,
                invoice_number: invoiceNumber,
                status: invoiceData.status || 'borrador',
                issue_date: invoiceData.issue_date || new Date().toISOString().split('T')[0],
                due_date: invoiceData.due_date || null,
                tax_rate: invoiceData.tax_rate || 21,
                notes: invoiceData.notes || null
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating invoice:', error);
        return { data: null, error };
    }
};

/**
 * Update invoice
 */
export const updateInvoice = async (invoiceId, updates) => {
    try {
        const { data, error } = await supabase
            .from('invoices')
            .update(updates)
            .eq('id', invoiceId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating invoice:', error);
        return { data: null, error };
    }
};

/**
 * Create invoice from an accepted quote
 */
export const createInvoiceFromQuote = async (quoteId) => {
    try {
        // 1. Get quote with lines
        const { data: quote, error: quoteError } = await supabase
            .from('quotes')
            .select('*, lines:quote_lines(*)')
            .eq('id', quoteId)
            .single();

        if (quoteError || !quote) throw new Error('Coud not find quote');

        // 2. Get project to get contact_id
        const { data: project } = await supabase
            .from('projects')
            .select('contact_id')
            .eq('id', quote.project_id)
            .single();

        // 3. Create invoice
        const { data: invoice, error: invoiceError } = await createInvoice({
            project_id: quote.project_id,
            contact_id: project?.contact_id || null,
            quote_id: quoteId,
            tax_rate: quote.tax_rate,
            notes: `Generada desde presupuesto ${quote.quote_number || ''}`
        });

        if (invoiceError) throw invoiceError;

        // 4. Copy lines
        if (quote.lines && quote.lines.length > 0) {
            const invoiceLines = quote.lines.map(line => ({
                invoice_id: invoice.id,
                position: line.position,
                concept: line.concept,
                description: line.description,
                quantity: line.quantity,
                unit_price: line.unit_price,
                section: line.section || 'General'
            }));

            const { error: linesError } = await supabase
                .from('invoice_lines')
                .insert(invoiceLines);

            if (linesError) throw linesError;
        }

        return { data: invoice, error: null };
    } catch (error) {
        console.error('Error converting quote to invoice:', error);
        return { data: null, error };
    }
};

/**
 * Delete invoice
 */
export const deleteInvoice = async (invoiceId) => {
    try {
        const { error } = await supabase
            .from('invoices')
            .delete()
            .eq('id', invoiceId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting invoice:', error);
        return { error };
    }
};

// ============ INVOICE LINES ============

export const addInvoiceLine = async (invoiceId, lineData) => {
    try {
        const { data: maxPos } = await supabase
            .from('invoice_lines')
            .select('position')
            .eq('invoice_id', invoiceId)
            .order('position', { ascending: false })
            .limit(1);

        const nextPosition = maxPos && maxPos.length > 0 ? maxPos[0].position + 1 : 0;

        const { data, error } = await supabase
            .from('invoice_lines')
            .insert({
                invoice_id: invoiceId,
                position: nextPosition,
                concept: lineData.concept || 'Nueva línea',
                description: lineData.description || null,
                quantity: lineData.quantity || 1,
                unit_price: lineData.unit_price || 0,
                section: lineData.section || 'General'
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error adding invoice line:', error);
        return { data: null, error };
    }
};

export const updateInvoiceLine = async (lineId, updates) => {
    try {
        const { data, error } = await supabase
            .from('invoice_lines')
            .update(updates)
            .eq('id', lineId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating invoice line:', error);
        return { data: null, error };
    }
};

export const deleteInvoiceLine = async (lineId) => {
    try {
        const { error } = await supabase
            .from('invoice_lines')
            .delete()
            .eq('id', lineId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting invoice line:', error);
        return { error };
    }
};
