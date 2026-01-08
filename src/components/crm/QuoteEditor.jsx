import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Save, Plus, Trash2, Send, Lock } from 'lucide-react';
import { fetchQuoteById, updateQuote, addQuoteLine, updateQuoteLine, deleteQuoteLine, sendQuote } from '../../lib/crm/quotes';

const QuoteEditor = ({ quoteId, onClose, onUpdate }) => {
    const [quote, setQuote] = useState(null);
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingNotes, setEditingNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const [taxRate, setTaxRate] = useState(21);

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
            unit_price: 0
        });
        if (data) {
            await loadQuote();
        }
        setSaving(false);
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
            unit_price: parseFloat(line.unit_price) || 0
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

    const handleSaveNotes = async () => {
        setSaving(true);
        await updateQuote(quoteId, { notes, tax_rate: parseFloat(taxRate) || 21 });
        await loadQuote();
        setEditingNotes(false);
        setSaving(false);
    };

    const handleSend = async () => {
        if (!confirm('¿Enviar presupuesto? Una vez enviado no podrá editarse.')) return;
        setSaving(true);
        await sendQuote(quoteId);
        await loadQuote();
        if (onUpdate) onUpdate();
        setSaving(false);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70000] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!quote) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70000] flex items-start justify-center pt-10 p-4 overflow-y-auto">
            <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl max-w-5xl w-full shadow-2xl mb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
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
                <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                    {/* Notas y Config */}
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-400">Notas / Observaciones</label>
                            {isEditable && !editingNotes && (
                                <button onClick={() => setEditingNotes(true)} className="text-xs text-primary hover:underline">
                                    Editar
                                </button>
                            )}
                        </div>
                        {editingNotes && isEditable ? (
                            <div className="space-y-3">
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                    placeholder="Condiciones, plazos, observaciones..."
                                />
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs text-gray-400">IVA %:</label>
                                        <input
                                            type="number"
                                            value={taxRate}
                                            onChange={(e) => setTaxRate(e.target.value)}
                                            className="w-16 bg-black/30 border border-white/20 rounded px-2 py-1 text-white text-sm focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <button onClick={handleSaveNotes} className="text-xs bg-primary text-black px-3 py-1 rounded font-bold">
                                        Guardar
                                    </button>
                                    <button onClick={() => { setEditingNotes(false); setNotes(quote.notes || ''); }} className="text-xs text-gray-400 hover:text-white">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-white text-sm">{quote.notes || 'Sin notas'}</p>
                        )}
                    </div>

                    {/* Líneas */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white">Líneas del Presupuesto</h3>
                            {isEditable && (
                                <button
                                    onClick={handleAddLine}
                                    disabled={saving}
                                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                    <Plus className="w-4 h-4" /> Añadir línea
                                </button>
                            )}
                        </div>

                        {lines.length === 0 ? (
                            <p className="text-center text-gray-400 py-8 bg-white/5 rounded-lg">
                                No hay líneas. {isEditable && 'Añade una para empezar.'}
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {/* Header */}
                                <div className="grid grid-cols-12 gap-2 text-xs font-bold text-gray-400 uppercase px-2">
                                    <div className="col-span-5">Concepto</div>
                                    <div className="col-span-2 text-right">Cantidad</div>
                                    <div className="col-span-2 text-right">Precio Unit.</div>
                                    <div className="col-span-2 text-right">Total</div>
                                    <div className="col-span-1"></div>
                                </div>

                                {/* Lines */}
                                {lines.map((line) => (
                                    <div key={line.id} className="grid grid-cols-12 gap-2 items-center bg-white/5 border border-white/10 rounded-lg p-2">
                                        <div className="col-span-5">
                                            {isEditable ? (
                                                <input
                                                    type="text"
                                                    value={line.concept}
                                                    onChange={(e) => handleUpdateLine(line.id, 'concept', e.target.value)}
                                                    onBlur={() => handleSaveLine(line.id)}
                                                    className="w-full bg-transparent border-none text-white text-sm focus:outline-none focus:bg-white/5 rounded px-1"
                                                />
                                            ) : (
                                                <span className="text-white text-sm">{line.concept}</span>
                                            )}
                                        </div>
                                        <div className="col-span-2">
                                            {isEditable ? (
                                                <input
                                                    type="number"
                                                    value={line.quantity}
                                                    onChange={(e) => handleUpdateLine(line.id, 'quantity', e.target.value)}
                                                    onBlur={() => handleSaveLine(line.id)}
                                                    className="w-full bg-transparent border-none text-white text-sm text-right focus:outline-none focus:bg-white/5 rounded px-1"
                                                    step="0.01"
                                                />
                                            ) : (
                                                <span className="text-white text-sm text-right block">{line.quantity}</span>
                                            )}
                                        </div>
                                        <div className="col-span-2">
                                            {isEditable ? (
                                                <input
                                                    type="number"
                                                    value={line.unit_price}
                                                    onChange={(e) => handleUpdateLine(line.id, 'unit_price', e.target.value)}
                                                    onBlur={() => handleSaveLine(line.id)}
                                                    className="w-full bg-transparent border-none text-white text-sm text-right focus:outline-none focus:bg-white/5 rounded px-1"
                                                    step="0.01"
                                                />
                                            ) : (
                                                <span className="text-white text-sm text-right block">{formatCurrency(line.unit_price)}</span>
                                            )}
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <span className="text-primary font-bold text-sm">
                                                {formatCurrency(line.line_total || (line.quantity * line.unit_price))}
                                            </span>
                                        </div>
                                        <div className="col-span-1 text-right">
                                            {isEditable && (
                                                <button
                                                    onClick={() => handleDeleteLine(line.id)}
                                                    className="p-1 hover:bg-red-500/20 rounded"
                                                >
                                                    <Trash2 className="w-3 h-3 text-red-400" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Totales */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Subtotal</span>
                                <span className="text-white">{formatCurrency(quote.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">IVA ({quote.tax_rate}%)</span>
                                <span className="text-white">{formatCurrency(quote.tax_amount)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2 mt-2">
                                <span className="text-white">Total</span>
                                <span className="text-primary">{formatCurrency(quote.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info adicional */}
                    {quote.sent_at && (
                        <div className="mt-4 text-xs text-gray-500 text-center">
                            Enviado el {new Date(quote.sent_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteEditor;
