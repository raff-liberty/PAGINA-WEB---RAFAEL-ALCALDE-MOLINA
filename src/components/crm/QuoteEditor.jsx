import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, Save, Plus, Trash2, Send, Lock, FileDown, MessageSquare, Mail, Eye, Edit3, ClipboardList, DollarSign } from 'lucide-react';
import { fetchQuoteById, updateQuote, addQuoteLine, updateQuoteLine, deleteQuoteLine, sendQuote } from '../../lib/crm/quotes';
import { createInvoiceFromQuote } from '../../lib/crm/invoices';
import { sendQuoteEmail, getDefaultQuoteEmailTemplate } from '../../lib/emailService';
import { downloadQuotePDF, generateQuotePDFBase64 } from '../../lib/pdfGenerator';

const QuoteEditor = ({ quoteId, onClose, onUpdate }) => {
    const [quote, setQuote] = useState(null);
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingNotes, setEditingNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const [taxRate, setTaxRate] = useState(21);
    const [currentSection, setCurrentSection] = useState('General');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailData, setEmailData] = useState({ to: '', subject: '', message: '' });
    const [previewMode, setPreviewMode] = useState('email'); // 'email' or 'pdf'
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        if (quoteId) loadQuote();
    }, [quoteId]);

    const loadQuote = async () => {
        setLoading(true);
        const { data } = await fetchQuoteById(quoteId);
        if (data) {
            setQuote(data);
            setLines(data.lines || []);
            setNotes(data.notes || '');
            setTaxRate(data.tax_rate || 21);
        }
        setLoading(false);
    };

    const isEditable = quote?.status === 'borrador';

    const handleAddLine = async () => {
        if (!isEditable) return;
        setSaving(true);
        const { data } = await addQuoteLine(quoteId, {
            concept: 'Nueva línea',
            quantity: 1,
            unit_price: 0,
            section: currentSection,
            section_order: getSectionOrder(currentSection)
        });
        if (data) {
            await loadQuote();
        }
        setSaving(false);
    };

    const getSectionOrder = (section) => {
        const sections = [...new Set(lines.map(l => l.section).filter(Boolean))];
        const index = sections.indexOf(section);
        return index >= 0 ? index : sections.length;
    };

    const handleUpdateLine = async (lineId, field, value) => {
        if (!isEditable) return;

        // Actualizar localmente primero para UX
        setLines(prev => prev.map(l =>
            l.id === lineId ? { ...l, [field]: value } : l
        ));
    };

    const handleSaveLine = async (lineId) => {
        if (!isEditable) return;
        const line = lines.find(l => l.id === lineId);
        if (!line) return;

        setSaving(true);
        await updateQuoteLine(lineId, {
            concept: line.concept,
            description: line.description,
            quantity: parseFloat(line.quantity) || 1,
            unit_price: parseFloat(line.unit_price) || 0,
            section: line.section,
            comment: line.comment
        });
        await loadQuote();
        setSaving(false);
    };

    const handleDeleteLine = async (lineId) => {
        if (!isEditable) return;
        if (!confirm('¿Eliminar esta línea?')) return;
        setSaving(true);
        await deleteQuoteLine(lineId);
        await loadQuote();
        setSaving(false);
    };

    const handleConvertToInvoice = async () => {
        if (!confirm('¿Deseas convertir este presupuesto en una factura oficial?')) return;
        setSaving(true);
        const { data, error } = await createInvoiceFromQuote(quoteId);
        if (!error && data) {
            alert(`Factura generada con éxito: ${data.invoice_number}`);
            if (onUpdate) onUpdate();
        } else {
            alert('Error al generar la factura');
        }
        setSaving(false);
    };

    const handleSaveNotes = async () => {
        setSaving(true);
        await updateQuote(quoteId, { notes, tax_rate: parseFloat(taxRate) || 21 });
        await loadQuote();
        setEditingNotes(false);
        setSaving(false);
    };

    const handleSend = async () => {
        if (lines.length === 0) {
            alert('Añade al menos una línea al presupuesto antes de enviar.');
            return;
        }

        setSaving(true);
        try {
            // Generate PDF for preview
            const result = await generateQuotePDFBase64(quote);
            setPdfPreviewUrl(`data:application/pdf;base64,${result.base64}`);

            const template = getDefaultQuoteEmailTemplate(quote, quote.project?.contact?.full_name || 'Cliente');
            setEmailData({
                to: quote.project?.contact?.email || '',
                subject: template.subject,
                message: template.message
            });
            setPreviewMode('email');
            setShowEmailModal(true);
        } catch (error) {
            console.error('Error preparing email:', error);
            alert('Error al preparar el envío.');
        }
        setSaving(false);
    };

    const handleConfirmSendEmail = async () => {
        if (!emailData.to || !emailData.subject || !emailData.message) {
            alert('Por favor completa todos los campos del email');
            return;
        }

        setSaving(true);

        // 1. Generar PDF
        const { base64: pdfBase64, filename, error: pdfError } = await generateQuotePDFBase64(quote);
        if (pdfError) {
            alert('Error al generar el PDF del presupuesto.');
            setSaving(false);
            return;
        }

        // 2. Enviar el email vía Resend con el PDF adjunto
        const { error: emailError } = await sendQuoteEmail(quote, {
            ...emailData,
            attachments: [
                {
                    filename: `Presupuesto_v${quote.version}.pdf`,
                    content: pdfBase64
                }
            ]
        });

        if (emailError) {
            alert(`Error al enviar el email: ${emailError.message}`);
            setSaving(false);
            return;
        }

        // 2. Actualizar estado del presupuesto en Supabase
        const { error: quoteError } = await sendQuote(quoteId);

        if (!quoteError) {
            await loadQuote();
            if (onUpdate) onUpdate();
            setShowEmailModal(false);
            alert('Presupuesto enviado correctamente');
        } else {
            alert('Email enviado pero error al actualizar el estado del presupuesto');
        }

        setSaving(false);
    };

    const handleDownloadPDF = async () => {
        setSaving(true);
        downloadQuotePDF(quote);
        setSaving(false);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    if (loading) {
        return createPortal(
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70001] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>,
            document.body
        );
    }

    if (!quote) return null;

    return createPortal(
        <div className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col overflow-hidden">
            <div className="flex flex-col h-full w-full max-w-7xl mx-auto border-x border-white/5 relative">
                {/* Header - Estilo Página Premium */}
                <div className="flex items-center justify-between p-6 px-8 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-white">
                                    Presupuesto v{quote.version}
                                </h2>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${quote.status === 'borrador' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                    quote.status === 'enviado' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        quote.status === 'aceptado' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                </span>
                                {!isEditable && <Lock className="w-4 h-4 text-gray-500" />}
                            </div>
                            <p className="text-sm text-gray-400">
                                {quote.project?.name} · {quote.project?.contact?.full_name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={saving}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        >
                            <FileDown className="w-4 h-4" /> PDF
                        </button>
                        {quote.status === 'aceptado' && (
                            <button
                                onClick={handleConvertToInvoice}
                                disabled={saving}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                                <DollarSign className="w-4 h-4" /> Facturar
                            </button>
                        )}
                        {isEditable && (
                            <button
                                onClick={handleSend}
                                disabled={saving || lines.length === 0}
                                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" /> Enviar
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                    {/* Project & Client Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="p-5 bg-[#1F1F1F] border border-white/10 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <ClipboardList className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-white">Detalles del Proyecto</h3>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">Nombre: <span className="text-white ml-1 font-medium">{quote.project?.name}</span></p>
                                <p className="text-sm text-gray-400">Responsable: <span className="text-white ml-1 font-medium">{quote.project?.responsible}</span></p>
                            </div>
                        </div>

                        <div className="p-5 bg-[#1F1F1F] border border-white/10 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="font-bold text-white">Información del Cliente</h3>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">Cliente: <span className="text-white ml-1 font-medium">{quote.project?.contact?.full_name}</span></p>
                                <p className="text-sm text-gray-400">Email: <span className="text-white ml-1 font-medium">{quote.project?.contact?.email}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Notas y Config */}
                    <div className="mb-10 group">
                        <div className="flex items-center justify-between mb-3 px-1">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-gray-400" />
                                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Notas del Presupuesto</label>
                            </div>
                            {isEditable && !editingNotes && (
                                <button onClick={() => setEditingNotes(true)} className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors font-bold">
                                    <Edit3 className="w-3 h-3" /> EDITAR NOTAS
                                </button>
                            )}
                        </div>

                        <div className={`p-6 rounded-2xl transition-all duration-300 ${editingNotes ? 'bg-black/40 border-primary/30 ring-1 ring-primary/20' : 'bg-[#1F1F1F] border border-white/10 group-hover:border-white/20'}`}>
                            {editingNotes && isEditable ? (
                                <div className="space-y-5">
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={4}
                                        className="w-full bg-transparent border-none text-white text-base focus:outline-none placeholder:text-gray-600 resize-none"
                                        placeholder="Escribe aquí las condiciones, plazos de entrega u otras observaciones importantes..."
                                    />
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-3 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10">
                                                <span className="text-xs font-bold text-gray-500 uppercase">IVA</span>
                                                <input
                                                    type="number"
                                                    value={taxRate}
                                                    onChange={(e) => setTaxRate(e.target.value)}
                                                    className="w-12 bg-transparent border-none text-white text-sm font-bold focus:outline-none text-center"
                                                />
                                                <span className="text-xs font-bold text-gray-500">%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => { setEditingNotes(false); setNotes(quote.notes || ''); }} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                                Cancelar
                                            </button>
                                            <button onClick={handleSaveNotes} className="bg-primary hover:bg-primary-hover text-black px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95">
                                                Guardar Cambios
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                                    {quote.notes || 'No se han añadido notas adicionales a este presupuesto.'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Líneas */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6 px-1">
                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                Conceptos del Presupuesto
                            </h3>
                            {isEditable && (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase px-1">Sección</span>
                                        <select
                                            value={currentSection}
                                            onChange={(e) => setCurrentSection(e.target.value)}
                                            className="bg-transparent border-none text-white text-sm font-medium focus:outline-none cursor-pointer"
                                        >
                                            {[...new Set(['General', ...lines.map(l => l.section).filter(Boolean)])].map(section => (
                                                <option key={section} value={section}>{section}</option>
                                            ))}
                                            <option value="__new__">+ Nueva Sección</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleAddLine}
                                        disabled={saving}
                                        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary px-5 py-2 rounded-xl font-bold text-sm transition-all transform active:scale-95"
                                    >
                                        <Plus className="w-4 h-4" /> Añadir Concepto
                                    </button>
                                </div>
                            )}
                        </div>

                        {lines.length === 0 ? (
                            <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                                <ClipboardList className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-20" />
                                <p className="text-gray-400 font-medium">No hay líneas en este presupuesto.</p>
                                {isEditable && <p className="text-sm text-gray-500 mt-1">Empieza añadiendo tu primer concepto arriba.</p>}
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {/* Group by section */}
                                {[...new Set(lines.map(l => l.section || 'General'))].map(section => {
                                    const sectionLines = lines.filter(l => (l.section || 'General') === section);
                                    const sectionSubtotal = sectionLines.reduce((sum, l) => sum + (l.line_total || (l.quantity * l.unit_price)), 0);

                                    return (
                                        <div key={section} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            {/* Section Header */}
                                            <div className="flex items-center justify-between mb-4 px-4 py-3 bg-[#1F1F1F] rounded-lg border-l-4 border-primary border border-white/5 shadow-md">
                                                <h4 className="font-black text-white text-sm tracking-widest uppercase">{section}</h4>
                                                <div className="flex items-center gap-4 text-xs font-bold">
                                                    <span className="text-gray-400 scale-90">{sectionLines.length} Conceptos</span>
                                                    <span className="text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                                        Subtotal: {formatCurrency(sectionSubtotal)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Lines in section */}
                                            <div className="space-y-4">
                                                {sectionLines.map((line) => (
                                                    <div key={line.id} className="group relative bg-[#1A1A1A] hover:bg-[#252525] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-300 shadow-md">
                                                        {/* Main line layout */}
                                                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                                            <div className="flex-1 w-full">
                                                                {isEditable ? (
                                                                    <input
                                                                        type="text"
                                                                        value={line.concept}
                                                                        onChange={(e) => handleUpdateLine(line.id, 'concept', e.target.value)}
                                                                        onBlur={() => handleSaveLine(line.id)}
                                                                        className="w-full bg-transparent border-none text-white text-lg font-bold placeholder:text-gray-700 focus:outline-none"
                                                                        placeholder="Título del concepto..."
                                                                    />
                                                                ) : (
                                                                    <span className="text-white text-lg font-bold">{line.concept}</span>
                                                                )}
                                                            </div>

                                                            <div className="flex items-center justify-between w-full md:w-auto gap-8">
                                                                <div className="flex flex-col items-end min-w-[60px]">
                                                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter mb-1">Cant.</span>
                                                                    {isEditable ? (
                                                                        <input
                                                                            type="number"
                                                                            value={line.quantity}
                                                                            onChange={(e) => handleUpdateLine(line.id, 'quantity', e.target.value)}
                                                                            onBlur={() => handleSaveLine(line.id)}
                                                                            className="w-16 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm font-bold text-center focus:outline-none focus:border-primary transition-colors"
                                                                            step="0.01"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-white text-sm font-bold">{line.quantity}</span>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col items-end min-w-[100px]">
                                                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter mb-1">Precio Unit.</span>
                                                                    {isEditable ? (
                                                                        <div className="relative">
                                                                            <input
                                                                                type="number"
                                                                                value={line.unit_price}
                                                                                onChange={(e) => handleUpdateLine(line.id, 'unit_price', e.target.value)}
                                                                                onBlur={() => handleSaveLine(line.id)}
                                                                                className="w-24 bg-white/5 border border-white/10 rounded pl-2 pr-6 py-1 text-white text-sm font-bold text-right focus:outline-none focus:border-primary transition-colors"
                                                                                step="0.01"
                                                                            />
                                                                            <span className="absolute right-2 top-1.5 text-xs text-gray-500 font-bold">€</span>
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-white text-sm font-bold">{formatCurrency(line.unit_price)}</span>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col items-end min-w-[110px]">
                                                                    <span className="text-[10px] font-black text-primary uppercase tracking-tighter mb-1">Total</span>
                                                                    <span className="text-primary font-black text-lg">
                                                                        {formatCurrency(line.line_total || (line.quantity * line.unit_price))}
                                                                    </span>
                                                                </div>

                                                                {isEditable && (
                                                                    <button
                                                                        onClick={() => handleDeleteLine(line.id)}
                                                                        className="p-2 hover:bg-red-500/20 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                                                                        title="Eliminar concepto"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Integrated Comment Field */}
                                                        <div className="mt-4 pt-4 border-t border-white/[0.03] flex gap-3 items-start">
                                                            <div className="p-1.5 bg-white/5 rounded-lg mt-0.5">
                                                                <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                                                            </div>
                                                            <div className="flex-1">
                                                                {isEditable ? (
                                                                    <textarea
                                                                        value={line.comment || ''}
                                                                        onChange={(e) => handleUpdateLine(line.id, 'comment', e.target.value)}
                                                                        onBlur={() => handleSaveLine(line.id)}
                                                                        placeholder="Descripción detallada o aclaraciones para este concepto..."
                                                                        rows={1}
                                                                        className="w-full bg-transparent border-none text-gray-400 text-sm focus:outline-none placeholder:text-gray-700 resize-none min-h-[1.5rem]"
                                                                        onInput={(e) => {
                                                                            e.target.style.height = 'auto';
                                                                            e.target.style.height = e.target.scrollHeight + 'px';
                                                                        }}
                                                                    />
                                                                ) : line.comment ? (
                                                                    <p className="text-sm text-gray-400 leading-relaxed italic">
                                                                        {line.comment}
                                                                    </p>
                                                                ) : (
                                                                    <span className="text-xs text-gray-600 italic">Sin descripción adicional</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Final Totals Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
                                <h4 className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-3 uppercase tracking-widest">
                                    <Send className="w-4 h-4" /> Información Legal
                                </h4>
                                <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4 italic">
                                    <li>Precios vigentes durante 30 días a partir de la fecha de emisión.</li>
                                    <li>La aceptación de este presupuesto implica la aceptación de los términos y condiciones de servicio.</li>
                                    <li>Los plazos de entrega empezarán a contar a partir de la recepción del primer pago acordado.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full"></div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Base Imponible</span>
                                    <span className="text-white font-bold">{formatCurrency(quote.subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">IVA ({quote.tax_rate}%)</span>
                                    <span className="text-white font-bold">{formatCurrency(quote.tax_amount)}</span>
                                </div>
                                <div className="pt-6 mt-6 border-t border-white/10">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Total Presupuestado</span>
                                            <span className="text-3xl font-black text-white">{formatCurrency(quote.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extra Info Footer */}
                    {quote.sent_at && (
                        <div className="mt-8 py-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-gray-600 font-bold uppercase tracking-widest">
                            <Eye className="w-4 h-4" /> Visualizado por última vez el {new Date(quote.sent_at).toLocaleDateString()}
                        </div>
                    )}
                </div>

            </div>

            {/* Email Modal - Redesigned Two-Column Premium Modal with PDF Preview */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[80000] flex items-center justify-center p-4 md:p-8">
                    <div className="bg-[#111] border border-white/10 rounded-[2.5rem] max-w-7xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row h-full max-h-[90vh]">

                        {/* Column 1: Drafting Area */}
                        <div className="w-full md:w-[400px] lg:w-[450px] p-6 md:p-8 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-primary/10 rounded-2xl">
                                    <Edit3 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Redactar Envío</h3>
                                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-tight">Configura cómo recibirá el presupuesto tu cliente</p>
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 px-1 group-focus-within:text-primary transition-colors">Destinatario</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3 w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            value={emailData.to}
                                            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                                            placeholder="email@cliente.com"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 px-1 group-focus-within:text-primary transition-colors">Asunto del Email</label>
                                    <input
                                        type="text"
                                        value={emailData.subject}
                                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white font-bold focus:border-primary focus:bg-white/[0.05] focus:outline-none transition-all text-sm"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 px-1 group-focus-within:text-primary transition-colors">Mensaje Personalizado</label>
                                    <textarea
                                        value={emailData.message}
                                        onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                                        rows={8}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white text-sm leading-relaxed focus:border-primary focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                                        placeholder="Escribe un mensaje acompañando al presupuesto..."
                                    />
                                </div>

                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
                                    <div className="p-2 bg-primary/20 rounded-xl">
                                        <FileDown className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary mb-0.5 shadow-primary/10">Archivo Adjunto Automático</p>
                                        <p className="text-xs text-primary/70 font-medium italic">Presupuesto_v{quote.version}.pdf</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Live Preview Area */}
                        <div className="flex-1 bg-white/[0.02] p-6 md:p-8 flex flex-col min-w-0">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-500/10 rounded-2xl">
                                            <Eye className="w-6 h-6 text-green-400" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Previsualizar</h3>
                                    </div>

                                    {/* Tab Selectors */}
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                                        <button
                                            onClick={() => setPreviewMode('email')}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${previewMode === 'email' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Email
                                        </button>
                                        <button
                                            onClick={() => setPreviewMode('pdf')}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${previewMode === 'pdf' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Archivo PDF
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => setShowEmailModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Dynamic Content Area */}
                            <div className="flex-1 min-h-0 bg-black/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-inner relative">
                                {previewMode === 'email' ? (
                                    <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-8">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-primary"></div>

                                        <div className="mb-6 pb-6 border-b border-white/5">
                                            <p className="text-[10px] font-black text-gray-600 uppercase mb-2 tracking-widest">Desde</p>
                                            <p className="text-sm text-white font-bold">Rafael Alcalde <span className="text-gray-500 font-medium ml-1">&lt;r.alcalde@engorilate.com&gt;</span></p>
                                        </div>

                                        <div className="mb-8">
                                            <p className="text-[10px] font-black text-gray-600 uppercase mb-2 tracking-widest">Asunto</p>
                                            <p className="text-lg text-white font-black">{emailData.subject || 'Sin asunto'}</p>
                                        </div>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-sm leading-8 whitespace-pre-wrap">
                                                {emailData.message || 'El mensaje aparecerá aquí...'}
                                            </p>
                                        </div>

                                        <div className="mt-12 pt-10 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary border border-primary/30">RA</div>
                                                <div>
                                                    <p className="text-sm font-black text-white decoration-primary decoration-2">Rafael Alcalde Molina</p>
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">CEO & Consultor | Engorilate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full bg-[#1a1a1a]">
                                        {pdfPreviewUrl ? (
                                            <iframe
                                                src={pdfPreviewUrl}
                                                className="w-full h-full border-none"
                                                title="PDF Preview"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-600">
                                                <ClipboardList className="w-12 h-12 opacity-20" />
                                                <p className="text-sm font-bold uppercase tracking-widest">Generando vista previa...</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex items-center justify-end gap-6">
                                <button
                                    onClick={() => setShowEmailModal(false)}
                                    className="text-sm font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all"
                                >
                                    No enviar
                                </button>
                                <button
                                    onClick={handleConfirmSendEmail}
                                    disabled={saving}
                                    className="group relative flex items-center gap-4 bg-primary hover:bg-white text-black font-black px-10 py-5 rounded-[2rem] text-lg transition-all shadow-2xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                                >
                                    <span className="relative z-10">{saving ? 'VOLANDO...' : '¡ENVIAR AHORA!'}</span>
                                    <Send className={`w-6 h-6 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 ${saving ? 'animate-bounce' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
};

export default QuoteEditor;
