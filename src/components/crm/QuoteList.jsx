import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, FileText, Download, User, Briefcase, Plus, CheckCircle, Clock, XCircle, AlertTriangle, Mail } from 'lucide-react';
import { fetchQuotes } from '../../lib/crm/quotes';
import { generateBulkPDFZip } from '../../lib/emailService';
import { downloadQuotePDF } from '../../lib/pdfGenerator';
import { generateQuotePDF } from '../../lib/pdfGenerator';
import { sendQuoteEmail } from '../../lib/emailService';
import { supabase } from '../../lib/supabaseClient';

const QuoteList = ({ onSelectQuote, onCreateQuote }) => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);
    const [exporting, setExporting] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(null);

    useEffect(() => {
        loadQuotes();
    }, [filterStatus]);

    const loadQuotes = async () => {
        setLoading(true);
        const { data } = await fetchQuotes({ status: filterStatus });
        if (data) setQuotes(data);
        setLoading(false);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredQuotes.map(q => q.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (e, id) => {
        e.stopPropagation();
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkExport = async () => {
        setExporting(true);
        const selectedQuotes = quotes.filter(q => selectedIds.includes(q.id));
        await generateBulkPDFZip(selectedQuotes, 'quotes');
        setExporting(false);
        setSelectedIds([]);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'aceptado': return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'enviado': return <Clock className="w-4 h-4 text-blue-400" />;
            case 'rechazado': return <XCircle className="w-4 h-4 text-red-500" />;
            case 'caducado': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
            default: return <FileText className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'aceptado': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'enviado': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'rechazado': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'caducado': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            default: return 'bg-white/5 text-gray-400 border-white/10';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    const handleDownloadPDF = (e, quote) => {
        e.stopPropagation();
        downloadQuotePDF(quote);
    };

    const handleSendEmail = async (e, quote) => {
        e.stopPropagation();

        // Validar que el contacto tenga email
        if (!quote.project?.contact?.email) {
            alert('Este contacto no tiene email configurado. Añade un email en la ficha del contacto.');
            return;
        }

        const confirmed = confirm(`¿Enviar presupuesto a ${quote.project.contact.email}?`);
        if (!confirmed) return;

        setSendingEmail(quote.id);

        try {
            // 1. Generar PDF
            const { data: pdfDataUri, error: pdfError } = await generateQuotePDF(quote);

            if (pdfError || !pdfDataUri) {
                throw new Error('Error al generar el PDF');
            }

            // 2. Extraer base64 del PDF
            const pdfBase64 = pdfDataUri.split(',')[1];

            // 3. Enviar email con Resend
            await sendQuoteEmail(quote, pdfBase64);

            // 4. Actualizar estado del presupuesto en Supabase
            await supabase
                .from('quotes')
                .update({
                    status: 'enviado',
                    sent_at: new Date().toISOString()
                })
                .eq('id', quote.id);

            // 5. Recargar lista
            await loadQuotes();

            alert('✅ Presupuesto enviado con éxito');
        } catch (error) {
            console.error('Error al enviar email:', error);
            alert(`❌ Error al enviar: ${error.message}`);
        } finally {
            setSendingEmail(null);
        }
    };

    // Sort by created_at DESC (effectively correlative by creation time)
    const sortedQuotes = [...quotes].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    const filteredQuotes = sortedQuotes.filter(quote => {
        const projectName = quote.project?.name || '';
        const contactName = quote.project?.contact?.full_name || '';
        const version = `v${quote.version || ''}`;
        const search = searchTerm.toLowerCase();

        return projectName.toLowerCase().includes(search) ||
            contactName.toLowerCase().includes(search) ||
            version.toLowerCase().includes(search);
    });

    return (
        <div className="space-y-6">
            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                <div className="flex flex-1 gap-4 w-full md:w-auto">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente, proyecto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#222222]/60 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-primary focus:outline-none transition-all"
                        />
                    </div>
                    <div className="relative group">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-primary" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-[#222222]/60 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-10 py-3 text-white focus:border-primary focus:outline-none appearance-none cursor-pointer transition-all"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="borrador">Borrador</option>
                            <option value="enviado">Enviado</option>
                            <option value="aceptado">Aceptado</option>
                            <option value="rechazado">Rechazado</option>
                            <option value="caducado">Caducado</option>
                        </select>
                    </div>
                </div>
                {onCreateQuote && (
                    <button
                        onClick={onCreateQuote}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-white text-gray-900 font-black uppercase tracking-tighter px-6 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(224,255,0,0.3)] group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Nuevo Presupuesto
                    </button>
                )}
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <span className="text-sm font-bold text-white">
                        {selectedIds.length} presupuestos seleccionados
                    </span>
                    <button
                        onClick={handleBulkExport}
                        disabled={exporting}
                        className="flex items-center gap-2 bg-primary hover:bg-white text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors text-xs uppercase tracking-widest disabled:opacity-50"
                    >
                        {exporting ? (
                            <div className="w-4 h-4 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin"></div>
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        Exportar Selección ({selectedIds.length})
                    </button>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : filteredQuotes.length > 0 ? (
                <div className="bg-[#222222]/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/20">
                                    <th className="px-6 py-4 w-10">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={filteredQuotes.length > 0 && selectedIds.length === filteredQuotes.length}
                                            className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Versión / ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Estado</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Cliente / Proyecto</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Fecha</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Total</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredQuotes.map((quote) => (
                                    <tr
                                        key={quote.id}
                                        onClick={() => onSelectQuote(quote)}
                                        className={`group hover:bg-white/[0.02] transition-all cursor-pointer ${selectedIds.includes(quote.id) ? 'bg-white/[0.05]' : ''}`}
                                    >
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(quote.id)}
                                                onChange={(e) => handleSelectOne(e, quote.id)}
                                                className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/30 transition-all">
                                                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                                </div>
                                                <span className="text-sm font-bold text-white uppercase tracking-tighter">v{quote.version}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyles(quote.status)}`}>
                                                {getStatusIcon(quote.status)}
                                                {quote.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-3 h-3 text-gray-600" />
                                                    <span className="text-xs font-bold text-gray-300">
                                                        {quote.project?.contact?.full_name || 'Sin asignar'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-3 h-3 text-gray-600" />
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter font-medium">
                                                        {quote.project?.name || 'Sin Proyecto'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock className="w-3 h-3" />
                                                {new Date(quote.created_at).toLocaleDateString('es-ES')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="text-sm font-black text-white italic tracking-tighter">
                                                {formatCurrency(quote.total || 0)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onSelectQuote(quote); }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-primary"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDownloadPDF(e, quote)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                                    title="Descargar PDF"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleSendEmail(e, quote)}
                                                    disabled={sendingEmail === quote.id}
                                                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-gray-400 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Enviar por email"
                                                >
                                                    {sendingEmail === quote.id ? (
                                                        <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                                    ) : (
                                                        <Mail className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-[#1a1a1a] border border-dashed border-white/10 rounded-3xl p-16 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <FileText className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase italic tracking-tighter">No hay presupuestos</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8 uppercase tracking-widest text-[10px] font-bold">
                        No se encontraron presupuestos con los filtros seleccionados.
                    </p>
                    {onCreateQuote && (
                        <button
                            onClick={onCreateQuote}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all text-xs uppercase tracking-widest"
                        >
                            <Plus className="w-4 h-4" />
                            Crear presupuesto
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuoteList;
