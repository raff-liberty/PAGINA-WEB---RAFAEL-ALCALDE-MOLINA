import { supabase } from '../supabaseClient';
import { changeProjectStatus } from './projects';

// Función local para evitar dependencia circular con contacts.js
const updateContactType = async (contactId, newType) => {
    return supabase
        .from('contacts')
        .update({ contact_type: newType })
        .eq('id', contactId);
};

/**
 * Obtener todos los presupuestos con filtros opcionales
 */
export const fetchQuotes = async ({ status } = {}) => {
    try {
        let query = supabase
            .from('quotes')
            .select(`
                *,
                lines:quote_lines(*),
                project:projects(id, name, contact_id, contact:contacts(full_name))
            `)
            .order('created_at', { ascending: false });

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return { data: [], error };
    }
};

/**
 * Obtener presupuestos de un proyecto
 */
export const fetchQuotesByProject = async (projectId) => {
    try {
        const { data, error } = await supabase
            .from('quotes')
            .select('*, lines:quote_lines(*)')
            .eq('project_id', projectId)
            .order('version', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return { data: [], error };
    }
};

/**
 * Obtener presupuestos de un contacto
 */
export const fetchQuotesByContact = async (contactId) => {
    try {
        // Primero obtenemos los proyectos del contacto para filtrar
        // O usamos el join si Supabase lo permite directamente
        const { data, error } = await supabase
            .from('quotes')
            .select(`
                *,
                lines:quote_lines(*),
                project:projects!inner(contact_id)
            `)
            .eq('project.contact_id', contactId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching quotes by contact:', error);
        return { data: [], error };
    }
};

/**
 * Obtener presupuesto por ID con líneas
 */
export const fetchQuoteById = async (quoteId) => {
    try {
        const { data, error } = await supabase
            .from('quotes')
            .select(`
                *,
                lines:quote_lines(*),
                project:projects(id, name, contact_id, contact:contacts(id, full_name, email, tax_id, fiscal_address, city, postal_code, country))
            `)
            .eq('id', quoteId)
            .single();

        if (error) throw error;

        // Ordenar líneas por posición
        if (data?.lines) {
            data.lines.sort((a, b) => a.position - b.position);
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching quote:', error);
        return { data: null, error };
    }
};

/**
 * Crear nuevo presupuesto (siempre v1 borrador)
 */
export const createQuote = async (projectId, quoteData = {}) => {
    try {
        // Obtener la versión más alta existente
        const { data: existing } = await supabase
            .from('quotes')
            .select('version')
            .eq('project_id', projectId)
            .order('version', { ascending: false })
            .limit(1);

        const nextVersion = existing && existing.length > 0 ? existing[0].version + 1 : 1;

        const { data, error } = await supabase
            .from('quotes')
            .insert({
                project_id: projectId,
                version: nextVersion,
                status: 'borrador',
                responsible: quoteData.responsible || null,
                notes: quoteData.notes || null,
                tax_rate: quoteData.tax_rate || 21
            })
            .select()
            .single();

        if (error) throw error;

        // Actualizar estado del proyecto a "presupuestado" si estaba en propuesta
        await supabase
            .from('projects')
            .update({ status: 'presupuestado' })
            .eq('id', projectId)
            .eq('status', 'propuesta');

        return { data, error: null };
    } catch (error) {
        console.error('Error creating quote:', error);
        return { data: null, error };
    }
};

/**
 * Actualizar presupuesto (solo si está en borrador)
 */
export const updateQuote = async (quoteId, updates) => {
    try {
        // Verificar que está en borrador
        const { data: quote } = await supabase
            .from('quotes')
            .select('status')
            .eq('id', quoteId)
            .single();

        if (quote?.status !== 'borrador') {
            throw new Error('Solo se pueden editar presupuestos en borrador');
        }

        const { data, error } = await supabase
            .from('quotes')
            .update(updates)
            .eq('id', quoteId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating quote:', error);
        return { data: null, error };
    }
};

/**
 * Enviar presupuesto (bloquea edición)
 */
export const sendQuote = async (quoteId) => {
    try {
        const { data, error } = await supabase
            .from('quotes')
            .update({
                status: 'enviado',
                sent_at: new Date().toISOString()
            })
            .eq('id', quoteId)
            .eq('status', 'borrador')
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error sending quote:', error);
        return { data: null, error };
    }
};

/**
 * Aceptar presupuesto
 * - Presupuesto → Aceptado
 * - Proyecto → Aceptado
 * - Contacto → Cliente
 */
export const acceptQuote = async (quoteId) => {
    try {
        // Obtener presupuesto con proyecto y contacto
        const { data: quote } = await fetchQuoteById(quoteId);
        if (!quote) throw new Error('Presupuesto no encontrado');

        // Actualizar presupuesto
        const { error: quoteError } = await supabase
            .from('quotes')
            .update({
                status: 'aceptado',
                accepted_at: new Date().toISOString()
            })
            .eq('id', quoteId);

        if (quoteError) throw quoteError;

        // Actualizar proyecto a "aceptado"
        await changeProjectStatus(quote.project.id, 'aceptado');

        // Actualizar contacto a "cliente"
        if (quote.project.contact_id) {
            await updateContactType(quote.project.contact_id, 'cliente');
        }

        return { data: quote, error: null };
    } catch (error) {
        console.error('Error accepting quote:', error);
        return { data: null, error };
    }
};

/**
 * Rechazar presupuesto
 */
export const rejectQuote = async (quoteId) => {
    try {
        const { data, error } = await supabase
            .from('quotes')
            .update({
                status: 'rechazado',
                rejected_at: new Date().toISOString()
            })
            .eq('id', quoteId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error rejecting quote:', error);
        return { data: null, error };
    }
};

/**
 * Crear nueva versión de presupuesto (copia las líneas)
 */
export const createNewVersion = async (quoteId) => {
    try {
        // Obtener presupuesto original con líneas
        const { data: original } = await fetchQuoteById(quoteId);
        if (!original) throw new Error('Presupuesto no encontrado');

        // Crear nuevo presupuesto
        const { data: newQuote, error: createError } = await createQuote(original.project_id, {
            responsible: original.responsible,
            notes: original.notes,
            tax_rate: original.tax_rate
        });

        if (createError) throw createError;

        // Copiar líneas
        if (original.lines && original.lines.length > 0) {
            const newLines = original.lines.map(line => ({
                quote_id: newQuote.id,
                position: line.position,
                concept: line.concept,
                description: line.description,
                quantity: line.quantity,
                unit_price: line.unit_price
            }));

            await supabase.from('quote_lines').insert(newLines);
        }

        // Recargar presupuesto con líneas
        return fetchQuoteById(newQuote.id);
    } catch (error) {
        console.error('Error creating new version:', error);
        return { data: null, error };
    }
};

/**
 * Eliminar presupuesto (solo borrador)
 */
export const deleteQuote = async (quoteId) => {
    try {
        const { error } = await supabase
            .from('quotes')
            .delete()
            .eq('id', quoteId)
            .eq('status', 'borrador');

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting quote:', error);
        return { error };
    }
};

// ============ LÍNEAS DE PRESUPUESTO ============

/**
 * Añadir línea a presupuesto
 */
export const addQuoteLine = async (quoteId, lineData) => {
    try {
        // Verificar que el presupuesto está en borrador
        const { data: quote } = await supabase
            .from('quotes')
            .select('status')
            .eq('id', quoteId)
            .single();

        if (quote?.status !== 'borrador') {
            throw new Error('Solo se pueden añadir líneas a presupuestos en borrador');
        }

        // Obtener máxima posición
        const { data: maxPos } = await supabase
            .from('quote_lines')
            .select('position')
            .eq('quote_id', quoteId)
            .order('position', { ascending: false })
            .limit(1);

        const nextPosition = maxPos && maxPos.length > 0 ? maxPos[0].position + 1 : 0;

        const { data, error } = await supabase
            .from('quote_lines')
            .insert({
                quote_id: quoteId,
                position: nextPosition,
                concept: lineData.concept || 'Nueva línea',
                description: lineData.description || null,
                quantity: lineData.quantity || 1,
                unit_price: lineData.unit_price || 0
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error adding quote line:', error);
        return { data: null, error };
    }
};

/**
 * Actualizar línea de presupuesto
 */
export const updateQuoteLine = async (lineId, updates) => {
    try {
        const { data, error } = await supabase
            .from('quote_lines')
            .update(updates)
            .eq('id', lineId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating quote line:', error);
        return { data: null, error };
    }
};

/**
 * Eliminar línea de presupuesto
 */
export const deleteQuoteLine = async (lineId) => {
    try {
        const { error } = await supabase
            .from('quote_lines')
            .delete()
            .eq('id', lineId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting quote line:', error);
        return { error };
    }
};
