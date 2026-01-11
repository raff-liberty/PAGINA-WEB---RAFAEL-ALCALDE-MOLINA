import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Send quote email with PDF attachment
 */
export const sendQuoteEmail = async (quoteData, emailData) => {
    try {
        const { to, subject, message } = emailData;

        // Retrieve API Key from environment variable
        const apiKey = import.meta.env.VITE_RESEND_API_KEY;

        if (!apiKey) {
            throw new Error('Resend API Key not found. Please add VITE_RESEND_API_KEY to your .env.local');
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Engorilate <r.alcalde@engorilate.com>',
                to: [to],
                subject: subject,
                html: message.replace(/\n/g, '<br>'),
                attachments: emailData.attachments || []
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al enviar el email');
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error('Error sending quote email:', error);
        return { data: null, error };
    }
};

/**
 * Generate PDF from quote data with premium Engorilate style
 * @param {Object} quote - The quote data
 */
export const generateQuotePDF = async (quote) => {
    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Custom Colors
        const PRIMARY_COLOR = [110, 231, 183]; // #6EE7B7
        const DARK_COLOR = [15, 15, 15];
        const TEXT_COLOR = [31, 41, 55];
        const MUTED_COLOR = [107, 114, 128];

        // Unique Numbering
        const year = new Date(quote.created_at || new Date()).getFullYear();
        const shortId = (quote.id || '0000').substring(0, 4).toUpperCase();
        const quoteNumber = `ENG-${year}-${shortId}-V${quote.version}`;

        // 1. Background Decor (Subtle)
        doc.setFillColor(250, 250, 250);
        doc.rect(0, 0, pageWidth, 50, 'F');
        doc.setDrawColor(...PRIMARY_COLOR);
        doc.setLineWidth(1.5);
        doc.line(20, 50, pageWidth - 20, 50);

        // 2. Header (Brand)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(...DARK_COLOR);
        doc.text('ENGORILATE', 20, 28);

        // Brand Slogan or Subtitle
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('ESTRATEGIA & AUTOMATIZACIÓN', 20, 35);

        // 3. Sender Details (Top Right)
        doc.setFontSize(8);
        doc.setTextColor(...TEXT_COLOR);
        doc.text('RAFAEL ALCALDE MOLINA (Autónomo)', pageWidth - 20, 15, { align: 'right' });
        doc.setTextColor(...MUTED_COLOR);
        doc.text('NIF: 48822622Q', pageWidth - 20, 21, { align: 'right' });
        doc.text('Av Isla de Pascua 5 Bajo E', pageWidth - 20, 26, { align: 'right' });
        doc.text('30868 Cartagena, Murcia', pageWidth - 20, 31, { align: 'right' });
        doc.text('r.alcalde@engorilate.com', pageWidth - 20, 36, { align: 'right' });
        doc.text('www.engorilate.com', pageWidth - 20, 41, { align: 'right' });

        // 4. Quote Info Grid
        // Left: Client info
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('PREPARADO PARA:', 20, 65);

        doc.setFontSize(12);
        doc.setTextColor(...DARK_COLOR);
        doc.text(quote.project?.contact?.full_name || 'CLIENTE', 20, 72);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...TEXT_COLOR);
        doc.text(quote.project?.contact?.email || '', 20, 77);

        // Fiscal data lines
        let currentY = 82;
        if (quote.project?.contact?.tax_id) {
            doc.text(`NIF/CIF: ${quote.project?.contact?.tax_id}`, 20, currentY);
            currentY += 5;
        }
        if (quote.project?.contact?.fiscal_address) {
            doc.text(quote.project?.contact?.fiscal_address, 20, currentY);
            currentY += 5;
        }
        if (quote.project?.contact?.city || quote.project?.contact?.postal_code) {
            const cityInfo = [
                quote.project?.contact?.postal_code,
                quote.project?.contact?.city,
                (quote.project?.contact?.country && quote.project?.contact?.country !== 'España') ? quote.project?.contact?.country : ''
            ].filter(Boolean).join(' ');
            doc.text(cityInfo, 20, currentY);
        }

        // Right: Document info
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('DOCUMENTO:', pageWidth - 80, 65);

        doc.setFontSize(12);
        doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1] - 40, PRIMARY_COLOR[2] - 20);
        doc.text('PRESUPUESTO', pageWidth - 80, 72);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...DARK_COLOR);
        doc.text(quoteNumber, pageWidth - 80, 77);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...MUTED_COLOR);
        doc.text(`FECHA: ${new Date(quote.created_at || new Date()).toLocaleDateString('es-ES')}`, pageWidth - 80, 83);
        doc.text(`PROYECTO: ${quote.project?.name?.toUpperCase() || 'GENERAL'}`, pageWidth - 80, 88);

        // 5. Lines Table
        const tableData = [];
        const lines = quote.lines || [];
        const sections = [...new Set(lines.map(l => l.section || 'General'))];

        sections.forEach(section => {
            // Section Divider Row
            tableData.push([
                {
                    content: section.toUpperCase(),
                    colSpan: 4,
                    styles: {
                        fillColor: [248, 250, 252],
                        textColor: [71, 85, 105],
                        fontStyle: 'bold',
                        fontSize: 8,
                        cellPadding: 3
                    }
                }
            ]);

            const sectionLines = lines.filter(l => (l.section || 'General') === section);
            sectionLines?.forEach(line => {
                tableData.push([
                    {
                        content: line.concept,
                        styles: { fontStyle: 'bold', fontSize: 10 }
                    },
                    {
                        content: line.quantity.toString(),
                        styles: { halign: 'center' }
                    },
                    {
                        content: formatCurrency(line.unit_price),
                        styles: { halign: 'right' }
                    },
                    {
                        content: formatCurrency(line.line_total),
                        styles: { halign: 'right', fontStyle: 'bold', textColor: DARK_COLOR }
                    }
                ]);

                if (line.comment) {
                    tableData.push([
                        {
                            content: line.comment,
                            colSpan: 4,
                            styles: {
                                fontSize: 8,
                                textColor: MUTED_COLOR,
                                fontStyle: 'italic',
                                cellPadding: { top: 0, bottom: 4, left: 5, right: 5 }
                            }
                        }
                    ]);
                }
            });
        });

        autoTable(doc, {
            startY: 105,
            head: [['DESCRIPCIÓN', 'CANT.', 'PRECIO UNIT.', 'TOTAL']],
            body: tableData,
            theme: 'plain',
            headStyles: {
                fillColor: DARK_COLOR,
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                cellPadding: 4
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20 },
                2: { cellWidth: 35 },
                3: { cellWidth: 35 }
            },
            margin: { left: 20, right: 20 },
            didDrawPage: (data) => {
                // Footer on every page
                doc.setFontSize(8);
                doc.setTextColor(...MUTED_COLOR);
                doc.text('Presupuesto generado por Engorilate. Válido por 30 días.', 20, pageHeight - 10);
                doc.text(`Página ${data.pageNumber}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
            }
        });

        // 6. Summary and Totals
        let finalY = doc.lastAutoTable.finalY + 15;

        if (finalY > pageHeight - 60) {
            doc.addPage();
            finalY = 30;
        }

        // Totals Box
        const totalsX = pageWidth - 90;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(totalsX, finalY, 70, 35, 3, 3, 'F');

        doc.setFontSize(10);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('SUBTOTAL', totalsX + 5, finalY + 10);
        doc.setTextColor(...DARK_COLOR);
        doc.text(formatCurrency(quote.subtotal), pageWidth - 25, finalY + 10, { align: 'right' });

        doc.setTextColor(...MUTED_COLOR);
        doc.text(`IVA (${quote.tax_rate}%)`, totalsX + 5, finalY + 18);
        doc.setTextColor(...DARK_COLOR);
        doc.text(formatCurrency(quote.tax_amount), pageWidth - 25, finalY + 18, { align: 'right' });

        doc.setDrawColor(226, 232, 240);
        doc.line(totalsX + 5, finalY + 22, pageWidth - 25, finalY + 22);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...DARK_COLOR);
        doc.text('TOTAL', totalsX + 5, finalY + 30);
        doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1] - 40, PRIMARY_COLOR[2] - 20);
        doc.text(formatCurrency(quote.total), pageWidth - 25, finalY + 30, { align: 'right' });

        // 7. Notes
        if (quote.notes) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(...DARK_COLOR);
            doc.text('NOTAS Y CONDICIONES:', 20, finalY + 10);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...TEXT_COLOR);
            const splitNotes = doc.splitTextToSize(quote.notes, totalsX - 30);
            doc.text(splitNotes, 20, finalY + 17);
        }

        // Return base64 for email
        const pdfOutput = doc.output('datauristring');
        return {
            data: pdfOutput,
            base64: pdfOutput.split(',')[1],
            quoteNumber: quoteNumber,
            filename: `${quoteNumber}.pdf`,
            error: null
        };
    } catch (error) {
        console.error('Error in PDF generation:', error);
        return { data: null, error };
    }
};

/**
 * Generate PDF from invoice data with premium Engorilate style
 * @param {Object} invoice - The invoice data
 */
export const generateInvoicePDF = async (invoice) => {
    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Custom Colors
        const PRIMARY_COLOR = [110, 231, 183]; // #6EE7B7
        const DARK_COLOR = [15, 15, 15];
        const TEXT_COLOR = [31, 41, 55];
        const MUTED_COLOR = [107, 114, 128];

        const invoiceNumber = invoice.invoice_number || `F-${invoice.id.substring(0, 8)}`;

        // 1. Background Decor (Subtle)
        doc.setFillColor(250, 250, 250);
        doc.rect(0, 0, pageWidth, 50, 'F');
        doc.setDrawColor(...PRIMARY_COLOR);
        doc.setLineWidth(1.5);
        doc.line(20, 50, pageWidth - 20, 50);

        // 2. Header (Brand)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(...DARK_COLOR);
        doc.text('ENGORILATE', 20, 28);

        // Brand Slogan or Subtitle
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('ESTRATEGIA & AUTOMATIZACIÓN', 20, 35);

        // 3. Sender Details (Top Right)
        doc.setFontSize(8);
        doc.setTextColor(...TEXT_COLOR);
        doc.text('RAFAEL ALCALDE MOLINA (Autónomo)', pageWidth - 20, 15, { align: 'right' });
        doc.setTextColor(...MUTED_COLOR);
        doc.text('NIF: 48822622Q', pageWidth - 20, 21, { align: 'right' });
        doc.text('Av Isla de Pascua 5 Bajo E', pageWidth - 20, 26, { align: 'right' });
        doc.text('30868 Cartagena, Murcia', pageWidth - 20, 31, { align: 'right' });
        doc.text('r.alcalde@engorilate.com', pageWidth - 20, 36, { align: 'right' });
        doc.text('www.engorilate.com', pageWidth - 20, 41, { align: 'right' });

        // 4. Invoice Info Grid
        // Left: Client info
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('FACTURADO A:', 20, 65);

        doc.setFontSize(12);
        doc.setTextColor(...DARK_COLOR);
        doc.text(invoice.contact?.full_name || invoice.contacts?.full_name || 'CLIENTE', 20, 72);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...TEXT_COLOR);
        doc.text(invoice.contact?.email || invoice.contacts?.email || '', 20, 77);

        // Fiscal data lines for Client
        let currentY = 82;
        const contact = invoice.contact || invoice.contacts; // Handle different structure from joins
        if (contact?.tax_id) {
            doc.text(`NIF/CIF: ${contact.tax_id}`, 20, currentY);
            currentY += 5;
        }
        if (contact?.fiscal_address) {
            doc.text(contact.fiscal_address, 20, currentY);
            currentY += 5;
        }
        if (contact?.city || contact?.postal_code) {
            const cityInfo = [
                contact?.postal_code,
                contact?.city,
                (contact?.country && contact?.country !== 'España') ? contact?.country : ''
            ].filter(Boolean).join(' ');
            doc.text(cityInfo, 20, currentY);
        }

        // Right: Document info
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('DOCUMENTO:', pageWidth - 80, 65);

        doc.setFontSize(12);
        doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1] - 40, PRIMARY_COLOR[2] - 20);
        doc.text('FACTURA', pageWidth - 80, 72);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...DARK_COLOR);
        doc.text(invoiceNumber, pageWidth - 80, 77);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...MUTED_COLOR);
        const issueDate = new Date(invoice.issue_date || invoice.created_at || new Date()).toLocaleDateString('es-ES');
        doc.text(`FECHA EMISIÓN: ${issueDate}`, pageWidth - 80, 83);

        if (invoice.due_date) {
            const dueDate = new Date(invoice.due_date).toLocaleDateString('es-ES');
            doc.text(`VENCIMIENTO: ${dueDate}`, pageWidth - 80, 88);
        }

        // 5. Lines Table
        const tableData = [];
        const lines = invoice.lines || [];
        const sections = [...new Set(lines.map(l => l.section || 'General'))];

        sections.forEach(section => {
            // Section Divider Row
            tableData.push([
                {
                    content: section.toUpperCase(),
                    colSpan: 4,
                    styles: {
                        fillColor: [248, 250, 252],
                        textColor: [71, 85, 105],
                        fontStyle: 'bold',
                        fontSize: 8,
                        cellPadding: 3
                    }
                }
            ]);

            const sectionLines = lines.filter(l => (l.section || 'General') === section);
            sectionLines?.forEach(line => {
                tableData.push([
                    {
                        content: line.concept,
                        styles: { fontStyle: 'bold', fontSize: 10 }
                    },
                    {
                        content: line.quantity.toString(),
                        styles: { halign: 'center' }
                    },
                    {
                        content: formatCurrency(line.unit_price),
                        styles: { halign: 'right' }
                    },
                    {
                        content: formatCurrency((line.quantity * line.unit_price)),
                        styles: { halign: 'right', fontStyle: 'bold', textColor: DARK_COLOR }
                    }
                ]);

                if (line.description) {
                    tableData.push([
                        {
                            content: line.description,
                            colSpan: 4,
                            styles: {
                                fontSize: 8,
                                textColor: MUTED_COLOR,
                                fontStyle: 'italic',
                                cellPadding: { top: 0, bottom: 4, left: 5, right: 5 }
                            }
                        }
                    ]);
                }
            });
        });

        // Calculate totals if not present in object (sometimes invoice object might lack these depending on fetch)
        let subtotal = invoice.subtotal;
        let tax_amount = invoice.tax_amount;
        let total = invoice.total;

        if (subtotal === undefined) {
            subtotal = lines.reduce((acc, line) => acc + (line.quantity * line.unit_price), 0);
            tax_amount = subtotal * ((invoice.tax_rate || 21) / 100);
            total = subtotal + tax_amount;
        }

        autoTable(doc, {
            startY: 105,
            head: [['DESCRIPCIÓN', 'CANT.', 'PRECIO UNIT.', 'TOTAL']],
            body: tableData,
            theme: 'plain',
            headStyles: {
                fillColor: DARK_COLOR,
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                cellPadding: 4
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20 },
                2: { cellWidth: 35 },
                3: { cellWidth: 35 }
            },
            margin: { left: 20, right: 20 },
            didDrawPage: (data) => {
                // Footer on every page
                doc.setFontSize(8);
                doc.setTextColor(...MUTED_COLOR);
                doc.text('Gracias por su confianza.', 20, pageHeight - 10);
                doc.text(`Página ${data.pageNumber}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
            }
        });

        // 6. Summary and Totals
        let finalY = doc.lastAutoTable.finalY + 15;

        if (finalY > pageHeight - 60) {
            doc.addPage();
            finalY = 30;
        }

        // Totals Box
        const totalsX = pageWidth - 90;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(totalsX, finalY, 70, 35, 3, 3, 'F');

        doc.setFontSize(10);
        doc.setTextColor(...MUTED_COLOR);
        doc.text('BASE IMPONIBLE', totalsX + 5, finalY + 10);
        doc.setTextColor(...DARK_COLOR);
        doc.text(formatCurrency(subtotal), pageWidth - 25, finalY + 10, { align: 'right' });

        doc.setTextColor(...MUTED_COLOR);
        doc.text(`IVA (${invoice.tax_rate || 21}%)`, totalsX + 5, finalY + 18);
        doc.setTextColor(...DARK_COLOR);
        doc.text(formatCurrency(tax_amount), pageWidth - 25, finalY + 18, { align: 'right' });

        doc.setDrawColor(226, 232, 240);
        doc.line(totalsX + 5, finalY + 22, pageWidth - 25, finalY + 22);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...DARK_COLOR);
        doc.text('TOTAL', totalsX + 5, finalY + 30);
        doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1] - 40, PRIMARY_COLOR[2] - 20);
        doc.text(formatCurrency(total), pageWidth - 25, finalY + 30, { align: 'right' });

        // 7. Notes / Payment Info
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...DARK_COLOR);
        doc.text('NOTAS / FORMA DE PAGO:', 20, finalY + 10);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...TEXT_COLOR);

        let notesText = invoice.notes || '';
        // Add default payment info if not present
        if (!notesText.includes('IBAN')) {
            notesText += notesText ? '\n\n' : '';
            notesText += 'Pago por transferencia bancaria a la cuenta:\nESXX XXXX XXXX XXXX XXXX';
        }

        const splitNotes = doc.splitTextToSize(notesText, totalsX - 30);
        doc.text(splitNotes, 20, finalY + 17);

        // Return base64 for email
        const pdfOutput = doc.output('datauristring');
        return {
            data: pdfOutput,
            base64: pdfOutput.split(',')[1],
            invoiceNumber: invoiceNumber,
            filename: `${invoiceNumber}.pdf`,
            error: null
        };
    } catch (error) {
        console.error('Error in Invoice PDF generation:', error);
        return { data: null, error };
    }
};

/**
 * Generate a ZIP file with multiple PDFs (quotes or invoices)
 * @param {Array} items - Array of quotes or invoices
 * @param {string} type - 'quotes' or 'invoices'
 */
export const generateBulkPDFZip = async (items, type = 'invoices') => {
    try {
        const zip = new JSZip();

        // Generate all PDFs
        const promises = items.map(async (item) => {
            let result;
            if (type === 'quotes') {
                result = await generateQuotePDF(item);
            } else {
                result = await generateInvoicePDF(item);
            }

            if (result.base64 && !result.error) {
                // Add PDF to zip folder
                zip.file(result.filename, result.base64, { base64: true });
            }
        });

        await Promise.all(promises);

        // Generate zip file
        const timestamp = new Date().toISOString().split('T')[0];
        const zipParams = { type: 'blob' };

        // Generate Async
        const content = await zip.generateAsync(zipParams);

        // Save
        const zipName = `${type === 'quotes' ? 'Presupuestos' : 'Facturas'}_Export_${timestamp}.zip`;
        saveAs(content, zipName);

        return { error: null };
    } catch (error) {
        console.error('Error generating bulk ZIP:', error);
        return { error };
    }
};

/**
 * Get default email template for quotes
 */
export const getDefaultQuoteEmailTemplate = (quote, contactName) => {
    return {
        subject: `Presupuesto ${quote.version} - ${quote.project?.name || 'Proyecto'}`,
        message: `Hola ${contactName},

Adjunto encontrarás el presupuesto v${quote.version} para el proyecto "${quote.project?.name}".

${quote.notes ? `\nObservaciones:\n${quote.notes}\n` : ''}
Total: ${formatCurrency(quote.total)}

Si tienes cualquier duda o necesitas alguna aclaración, no dudes en contactarme.

Un saludo,
Rafael Alcalde
Engorilate
r.alcalde@engorilate.com`
    };
};

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount || 0);
}
