import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from './supabaseClient';

/**
 * Obtener configuración de la empresa desde Supabase
 */
const fetchCompanyConfig = async () => {
    try {
        const { data, error } = await supabase
            .from('company_config')
            .select('*')
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching company config:', error);
        // Fallback robusto con los datos actuales del usuario
        return {
            company_name: 'Engorilate - Rafael Alcalde Molina',
            tax_id: '48822622Q',
            fiscal_address: 'Av Isla de Pascua 5 Bajo E',
            city: 'Cartagena',
            postal_code: '30868',
            country: 'España',
            bank_account_iban: 'ES00 0000 0000 0000 0000 0000',
            bank_name: 'Banco',
            legal_text: 'De acuerdo con la Ley Orgánica 3:2018 de Protección de Datos Personales (LOPDGDD) y el Reglamento General de Protección de Datos (RGPD), le informamos que sus datos están incorporados en un tratamiento responsabilidad de RAFAEL ALCALDE MOLINA con la finalidad de gestionar la relación comercial.'
        };
    }
};

/**
 * Formatear moneda
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount || 0);
};

// Estilos simples (Negro y Gris)
const DARK = [10, 10, 10];
const GRAY = [100, 100, 100];
const BORDER = [220, 220, 220];

/**
 * Render de cabecera simple (estilo anterior revertido)
 */
const renderHeader = (doc, title, docNumber, dateValue, companyInfo) => {
    const pageWidth = doc.internal.pageSize.width;

    // Nombre Empresa / Logo texto
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...DARK);
    doc.text(companyInfo.company_name.toUpperCase(), 20, 30);

    // Datos Fiscales Emisor (Derecha)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    let rightY = 25;
    doc.text(`NIF: ${companyInfo.tax_id}`, pageWidth - 20, rightY, { align: 'right' });
    rightY += 5;
    doc.text(companyInfo.fiscal_address || '', pageWidth - 20, rightY, { align: 'right' });
    rightY += 5;
    doc.text(`${companyInfo.postal_code || ''} ${companyInfo.city || ''}`, pageWidth - 20, rightY, { align: 'right' });
    rightY += 5;
    doc.text(companyInfo.country || 'España', pageWidth - 20, rightY, { align: 'right' });

    // Línea separadora
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.5);
    doc.line(20, 55, pageWidth - 20, 55);

    // Título del documento y Número
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK);
    doc.text(title.toUpperCase(), 20, 70);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    doc.text(`Nº Documento: ${docNumber}`, 20, 78);
    doc.text(`Fecha: ${dateValue}`, 20, 84);
};

/**
 * Render de información del cliente
 */
const renderClientInfo = (doc, client, label = 'CLIENTE / RECEPTOR:') => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text(label, 20, 105);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(client.full_name || 'Sin asignar', 20, 112);
    if (client.tax_id) doc.text(`NIF/CIF: ${client.tax_id}`, 20, 117);
    if (client.fiscal_address) {
        const addr = doc.splitTextToSize(client.fiscal_address, 80);
        doc.text(addr, 20, 122);
        const lines = Array.isArray(addr) ? addr.length : 1;
        if (client.city) doc.text(`${client.postal_code || ''} ${client.city}`, 20, 122 + (lines * 5));
    } else if (client.city) {
        doc.text(`${client.postal_code || ''} ${client.city}`, 20, 122);
    }
};

/**
 * Render del pie de página con IBAN e Info Legal
 */
const renderFooter = (doc, companyInfo) => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Línea superior del footer
    doc.setDrawColor(...BORDER);
    doc.line(20, pageHeight - 45, pageWidth - 20, pageHeight - 45);

    // Datos Bancarios
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    doc.text('DATOS DE PAGO:', 20, pageHeight - 35);
    doc.setFont('helvetica', 'normal');
    doc.text(`IBAN: ${companyInfo.bank_account_iban} (${companyInfo.bank_name || 'Transferencia'})`, 20, pageHeight - 30);

    // Texto Legal (LOPD)
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    const splitLegal = doc.splitTextToSize(companyInfo.legal_text || '', pageWidth - 40);
    doc.text(splitLegal, 20, pageHeight - 20);
};

/**
 * Función principal para descargar PRESUPUESTO
 */
export const downloadQuotePDF = async (quote) => {
    try {
        const doc = new jsPDF();
        const companyInfo = await fetchCompanyConfig();
        const quoteNumber = quote.quote_number || `P-${new Date().getFullYear()}-${quote.id.substring(0, 4).toUpperCase()}`;
        const fecha = new Date(quote.created_at || new Date()).toLocaleDateString('es-ES');

        renderHeader(doc, 'PRESUPUESTO', quoteNumber, fecha, companyInfo);
        renderClientInfo(doc, quote.project?.contact || {});

        const lines = quote.lines || [];
        const tableData = lines.map(line => [
            line.concept || '',
            String(line.quantity || 1),
            formatCurrency(line.unit_price || 0),
            formatCurrency((line.quantity || 1) * (line.unit_price || 0))
        ]);

        autoTable(doc, {
            startY: 140,
            head: [['CONCEPTO', 'CANT.', 'PRECIO UNIT.', 'TOTAL']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255], halign: 'center' },
            columnStyles: { 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' } },
            margin: { left: 20, right: 20 }
        });

        const finalY = doc.lastAutoTable.finalY + 15;
        const subtotal = quote.subtotal || lines.reduce((sum, l) => sum + (l.quantity || 1) * (l.unit_price || 0), 0);
        const taxRate = quote.tax_rate || 21;
        const taxAmount = (subtotal * taxRate / 100);
        const total = (subtotal + taxAmount);

        // Bloque de Totales
        const boxX = doc.internal.pageSize.width - 90;
        doc.setFontSize(10);
        doc.setTextColor(...DARK);
        doc.text('Subtotal:', boxX, finalY);
        doc.text(formatCurrency(subtotal), doc.internal.pageSize.width - 20, finalY, { align: 'right' });

        doc.text(`IVA (${taxRate}%):`, boxX, finalY + 7);
        doc.text(formatCurrency(taxAmount), doc.internal.pageSize.width - 20, finalY + 7, { align: 'right' });

        doc.setDrawColor(...BORDER);
        doc.line(boxX, finalY + 10, doc.internal.pageSize.width - 20, finalY + 10);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('TOTAL:', boxX, finalY + 18);
        doc.text(formatCurrency(total), doc.internal.pageSize.width - 20, finalY + 18, { align: 'right' });

        renderFooter(doc, companyInfo);
        doc.save(`${quoteNumber}.pdf`);
        return { success: true };
    } catch (error) {
        console.error('Error generating Quote PDF:', error);
        return { error };
    }
};

/**
 * Función principal para descargar FACTURA
 */
export const downloadInvoicePDF = async (invoice) => {
    try {
        const doc = new jsPDF();
        const companyInfo = await fetchCompanyConfig();
        const invoiceNumber = invoice.invoice_number || `${new Date().getFullYear()}/0000`;
        const fecha = new Date(invoice.issue_date || invoice.created_at || new Date()).toLocaleDateString('es-ES');

        renderHeader(doc, 'FACTURA', invoiceNumber, fecha, companyInfo);
        renderClientInfo(doc, invoice.contact || invoice.project?.contact || {}, 'FACTURADO A:');

        const lines = invoice.lines || [];
        const tableData = lines.map(line => [
            line.concept || '',
            String(line.quantity || 1),
            formatCurrency(line.unit_price || 0),
            formatCurrency((line.quantity || 1) * (line.unit_price || 0))
        ]);

        autoTable(doc, {
            startY: 140,
            head: [['CONCEPTO', 'CANT.', 'PRECIO UNIT.', 'TOTAL']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255], halign: 'center' },
            columnStyles: { 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' } },
            margin: { left: 20, right: 20 }
        });

        const finalY = doc.lastAutoTable.finalY + 15;
        const subtotal = lines.reduce((sum, l) => sum + (l.quantity || 1) * (l.unit_price || 0), 0);
        const taxRate = invoice.tax_rate || 21;
        const taxAmount = (subtotal * taxRate / 100);
        const total = (subtotal + taxAmount);

        // Bloque de Totales
        const boxX = doc.internal.pageSize.width - 90;
        doc.setFontSize(10);
        doc.setTextColor(...DARK);
        doc.text('Subtotal:', boxX, finalY);
        doc.text(formatCurrency(subtotal), doc.internal.pageSize.width - 20, finalY, { align: 'right' });

        doc.text(`IVA (${taxRate}%):`, boxX, finalY + 7);
        doc.text(formatCurrency(taxAmount), doc.internal.pageSize.width - 20, finalY + 7, { align: 'right' });

        doc.setDrawColor(...BORDER);
        doc.line(boxX, finalY + 10, doc.internal.pageSize.width - 20, finalY + 10);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('TOTAL:', boxX, finalY + 18);
        doc.text(formatCurrency(total), doc.internal.pageSize.width - 20, finalY + 18, { align: 'right' });

        renderFooter(doc, companyInfo);
        // Reemplazamos / por - para el nombre del archivo
        const safeInvoiceNumber = invoiceNumber.replace(/\//g, '-');
        doc.save(`Factura-${safeInvoiceNumber}.pdf`);
        return { success: true };
    } catch (error) {
        console.error('Error generating Invoice PDF:', error);
        return { error };
    }
};

/**
 * Generar base64 para envío por email
 */
export const generateQuotePDFBase64 = async (quote) => {
    try {
        const doc = new jsPDF();
        const companyInfo = await fetchCompanyConfig();
        const quoteNumber = quote.quote_number || `P-${new Date().getFullYear()}-${quote.id.substring(0, 4).toUpperCase()}`;
        const fecha = new Date(quote.created_at || new Date()).toLocaleDateString('es-ES');

        renderHeader(doc, 'PRESUPUESTO', quoteNumber, fecha, companyInfo);
        renderClientInfo(doc, quote.project?.contact || {});

        const lines = quote.lines || [];
        const tableData = lines.map(line => [
            line.concept || '',
            String(line.quantity || 1),
            formatCurrency(line.unit_price || 0),
            formatCurrency((line.quantity || 1) * (line.unit_price || 0))
        ]);

        autoTable(doc, {
            startY: 140,
            head: [['CONCEPTO', 'CANT.', 'PRECIO UNIT.', 'TOTAL']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255], halign: 'center' },
            columnStyles: { 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' } },
            margin: { left: 20, right: 20 }
        });

        const finalY = doc.lastAutoTable.finalY + 15;
        const subtotal = quote.subtotal || lines.reduce((sum, l) => sum + (l.quantity || 1) * (l.unit_price || 0), 0);
        const taxRate = quote.tax_rate || 21;
        const taxAmount = (subtotal * taxRate / 100);
        const total = (subtotal + taxAmount);

        // Bloque de Totales
        const boxX = doc.internal.pageSize.width - 90;
        doc.setFontSize(10);
        doc.setTextColor(...DARK);
        doc.text('Subtotal:', boxX, finalY);
        doc.text(formatCurrency(subtotal), doc.internal.pageSize.width - 20, finalY, { align: 'right' });

        doc.text(`IVA (${taxRate}%):`, boxX, finalY + 7);
        doc.text(formatCurrency(taxAmount), doc.internal.pageSize.width - 20, finalY + 7, { align: 'right' });

        doc.setDrawColor(...BORDER);
        doc.line(boxX, finalY + 10, doc.internal.pageSize.width - 20, finalY + 10);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('TOTAL:', boxX, finalY + 18);
        doc.text(formatCurrency(total), doc.internal.pageSize.width - 20, finalY + 18, { align: 'right' });

        renderFooter(doc, companyInfo);

        const pdfBase64 = doc.output('datauristring').split(',')[1];
        return { base64: pdfBase64, filename: `${quoteNumber}.pdf`, error: null };
    } catch (error) {
        console.error('Error generando base64:', error);
        return { error };
    }
};
