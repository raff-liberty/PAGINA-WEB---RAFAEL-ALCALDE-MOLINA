import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, Save, Plus, Trash2, Send, Lock, FileDown, MessageSquare, Mail, Eye, Edit3, ClipboardList, CheckCircle } from 'lucide-react';
import { fetchInvoiceById, updateInvoice, addInvoiceLine, updateInvoiceLine, deleteInvoiceLine } from '../../lib/crm/invoices';
// Note: We'll need to create similar email/PDF services for invoices later
// import { sendInvoiceEmail, generateInvoicePDF } from '../../lib/emailService';

const InvoiceEditor = ({ invoiceId, onClose, onUpdate }) => {
    const [invoice, setInvoice] = useState(null);
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingNotes, setEditingNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const [taxRate, setTaxRate] = useState(21);
    const [currentSection, setCurrentSection] = useState('General');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        if (invoiceId) loadInvoice();
    }, [invoiceId]);

    const loadInvoice = async () => {
        setLoading(true);
        const { data } = await fetchInvoiceById(invoiceId);
        if (data) {
            setInvoice(data);
            setLines(data.lines || []);
            setNotes(data.notes || '');
            setTaxRate(data.tax_rate || 21);
        }
        setLoading(false);
    };

    const isEditable = invoice?.status === 'borrador';

    const handleAddLine = async () => {
        if (!isEditable) return;
        setSaving(true);
        const { data } = await addInvoiceLine(invoiceId, {
            concept: 'Nueva línea',
            quantity: 1,
            unit_price: 0,
            section: currentSection
        });
        if (data) {
            await loadInvoice();
        }
        setSaving(false);
    };

    const handleUpdateLine = async (lineId, field, value) => {
        if (!isEditable) return;
        setLines(prev => prev.map(l =>
            l.id === lineId ? { ...l, [field]: value } : l
        ));
    };

    const handleSaveLine = async (lineId) => {
        if (!isEditable) return;
        const line = lines.find(l => l.id === lineId);
        if (!line) return;

        setSaving(true);
        await updateInvoiceLine(lineId, {
            concept: line.concept,
            description: line.description,
            quantity: parseFloat(line.quantity) || 1,
            unit_price: parseFloat(line.unit_price) || 0,
            section: line.section,
            comment: line.comment
        });
        await loadInvoice();
        setSaving(false);
    };

    const handleDeleteLine = async (lineId) => {
        if (!isEditable) return;
        if (!confirm('¿Eliminar esta línea?')) return;
        setSaving(true);
        await deleteInvoiceLine(lineId);
        await loadInvoice();
        setSaving(false);
    };

    const handleUpdateStatus = async (newStatus) => {
        setSaving(true);
        const updates = { status: newStatus };
        if (newStatus === 'pagada') {
            updates.paid_at = new Date().toISOString();
        }
        const { error } = await updateInvoice(invoiceId, updates);
        if (!error) {
            await loadInvoice();
            if (onUpdate) onUpdate();
        }
        setSaving(false);
    };

    const calculateSubtotal = () => {
        return lines.reduce((acc, line) => acc + (line.quantity * line.unit_price), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * (taxRate / 100);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-[#0a0a0a] z-[70000] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!invoice) return null;

    const sections = ['General', ...new Set(lines.map(l => l.section).filter(s => s && s !== 'General'))];

    return createPortal(
        <div className="fixed inset-0 bg-[#0a0a0a] z-[70000] flex flex-col overflow-hidden">
            <div className="flex flex-col h-full w-full max-w-7xl mx-auto border-x border-white/5 relative">

                {/* Save Progress Overlay */}
                {saving && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-[80000] flex items-center justify-center">
                        <div className="bg-[#1a1a1a] border border-white/10 p-4 rounded-xl flex items-center gap-3 shadow-2xl">
                            <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <span className="text-white font-bold text-sm tracking-widest uppercase">Guardando...</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between p-6 px-8 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg group transition-all">
                            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-white tracking-tighter uppercase italic">{invoice.invoice_number}</h2>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${invoice.status === 'pagada' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    invoice.status === 'enviada' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        invoice.status === 'atrasada' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {invoice.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                                {invoice.contact?.full_name} · {invoice.project?.name || 'Venta directa'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/5 rounded-lg border border-white/10 p-1 mr-2 px-3 items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Cambiar estado:</span>
                            {['enviada', 'pagada', 'cancelada'].filter(s => s !== invoice.status).map(s => (
                                <button
                                    key={s}
                                    onClick={() => handleUpdateStatus(s)}
                                    className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded bg-white/5 hover:bg-primary hover:text-black transition-all text-gray-400"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar lg:grid lg:grid-cols-3 lg:gap-12">
                    {/* Main Content: Line Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {sections.map(section => (
                            <div key={section} className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-4 bg-primary rounded-full"></div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest">{section}</h3>
                                    </div>
                                    {isEditable && currentSection !== section && (
                                        <button
                                            onClick={() => setCurrentSection(section)}
                                            className="text-[10px] text-gray-500 hover:text-primary uppercase font-bold"
                                        >
                                            Usar esta sección
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {lines.filter(l => (l.section || 'General') === section).map((line) => (
                                        <div key={line.id} className="bg-[#1F1F1F] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all group shadow-sm">
                                            <div className="grid grid-cols-12 gap-4">
                                                <div className="col-span-12 md:col-span-6">
                                                    <input
                                                        type="text"
                                                        value={line.concept}
                                                        onChange={(e) => handleUpdateLine(line.id, 'concept', e.target.value)}
                                                        onBlur={() => handleSaveLine(line.id)}
                                                        disabled={!isEditable}
                                                        className="w-full bg-transparent border-none text-white font-bold focus:ring-0 p-0 placeholder:text-gray-700"
                                                        placeholder="Concepto de la línea..."
                                                    />
                                                    <textarea
                                                        value={line.description || ''}
                                                        onChange={(e) => handleUpdateLine(line.id, 'description', e.target.value)}
                                                        onBlur={() => handleSaveLine(line.id)}
                                                        disabled={!isEditable}
                                                        rows={1}
                                                        className="w-full bg-transparent border-none text-gray-500 text-xs focus:ring-0 p-0 mt-1 resize-none placeholder:text-gray-800"
                                                        placeholder="Descripción opcional..."
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2">
                                                    <label className="text-[10px] uppercase font-black text-gray-600 block mb-1">Cant.</label>
                                                    <input
                                                        type="number"
                                                        value={line.quantity}
                                                        onChange={(e) => handleUpdateLine(line.id, 'quantity', e.target.value)}
                                                        onBlur={() => handleSaveLine(line.id)}
                                                        disabled={!isEditable}
                                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-white text-sm focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2">
                                                    <label className="text-[10px] uppercase font-black text-gray-600 block mb-1">Precio</label>
                                                    <input
                                                        type="number"
                                                        value={line.unit_price}
                                                        onChange={(e) => handleUpdateLine(line.id, 'unit_price', e.target.value)}
                                                        onBlur={() => handleSaveLine(line.id)}
                                                        disabled={!isEditable}
                                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-white text-sm focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2 text-right">
                                                    <label className="text-[10px] uppercase font-black text-gray-600 block mb-1">Total</label>
                                                    <div className="text-white font-mono font-bold pt-1">
                                                        {formatCurrency(line.quantity * line.unit_price)}
                                                    </div>
                                                </div>
                                            </div>
                                            {isEditable && (
                                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        value={line.comment || ''}
                                                        onChange={(e) => handleUpdateLine(line.id, 'comment', e.target.value)}
                                                        onBlur={() => handleSaveLine(line.id)}
                                                        placeholder="Añadir comentario interno..."
                                                        className="bg-transparent border-none text-[10px] text-gray-500 italic focus:ring-0 p-0 flex-1"
                                                    />
                                                    <button onClick={() => handleDeleteLine(line.id)} className="p-1 hover:bg-red-500/20 rounded opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {isEditable && (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddLine}
                                    className="flex-1 border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                >
                                    <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-black uppercase tracking-tighter">Añadir Línea a {currentSection}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const newSection = prompt('Nombre de la nueva sección:');
                                        if (newSection) setCurrentSection(newSection);
                                    }}
                                    className="border-2 border-dashed border-white/10 rounded-2xl px-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                                >
                                    <ClipboardList className="w-6 h-6" />
                                    <span className="text-xs font-black uppercase tracking-tighter">Nueva Sección</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Totals & Summary */}
                    <div className="space-y-6 mt-12 lg:mt-0">
                        {/* Summary Card */}
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 sticky top-28 shadow-2xl overflow-hidden group">

                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Resumen</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 font-bold uppercase tracking-tighter">Subtotal</span>
                                    <span className="text-white font-mono">{formatCurrency(calculateSubtotal())}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 font-bold uppercase tracking-tighter">IVA</span>
                                        <select
                                            value={taxRate}
                                            onChange={(e) => setTaxRate(parseInt(e.target.value))}
                                            disabled={!isEditable}
                                            className="bg-white/5 border border-white/10 rounded text-[10px] text-primary px-1 font-black"
                                        >
                                            <option value={21}>21%</option>
                                            <option value={10}>10%</option>
                                            <option value={4}>4%</option>
                                            <option value={0}>0%</option>
                                        </select>
                                    </div>
                                    <span className="text-white font-mono">{formatCurrency(calculateTax())}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-white font-black uppercase italic tracking-tighter text-lg">Total</span>
                                    <div className="text-right">
                                        <div className="text-4xl font-black text-primary tracking-tighter leading-none italic">
                                            {formatCurrency(calculateTotal())}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {!isEditable && (
                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
                                        <Lock className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-yellow-500/80 font-medium leading-relaxed uppercase tracking-tighter">
                                            Esta factura ya ha sido emitida o cancelada. No se pueden realizar cambios en las líneas ni en los importes.
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
                                        <FileDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 group-hover:text-white">Descargar PDF</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
                                        <Send className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 group-hover:text-white">Enviar Email</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Notas Internas</label>
                                    <button
                                        onClick={() => setEditingNotes(!editingNotes)}
                                        className="text-[10px] text-primary hover:text-white font-bold transition-colors"
                                    >
                                        {editingNotes ? 'LISTO' : 'EDITAR'}
                                    </button>
                                </div>
                                {editingNotes ? (
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        onBlur={async () => {
                                            await updateInvoice(invoiceId, { notes });
                                            setEditingNotes(false);
                                        }}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-primary outline-none h-32 resize-none"
                                        placeholder="Solo visible para ti..."
                                    />
                                ) : (
                                    <p className="text-xs text-gray-400 leading-relaxed italic whitespace-pre-wrap">
                                        {notes || 'Sin notas internas.'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceEditor;
