import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, FileText, Download, MoreHorizontal, Calendar, User, Briefcase, Plus, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { fetchInvoices, deleteInvoice } from '../../lib/crm/invoices';
import { generateBulkPDFZip } from '../../lib/emailService';
import { downloadInvoicePDF } from '../../lib/pdfGenerator';

const InvoiceList = ({ onSelectInvoice, onCreateInvoice, invoices: initialInvoices }) => {
    const [invoices, setInvoices] = useState(initialInvoices || []);
    const [loading, setLoading] = useState(!initialInvoices);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        if (!initialInvoices) {
            loadInvoices();
        } else {
            setInvoices(initialInvoices);
            setLoading(false);
        }
    }, [filterStatus, initialInvoices]);

    const loadInvoices = async () => {
        setLoading(true);
        const { data } = await fetchInvoices({ status: filterStatus });
        if (data) setInvoices(data);
        setLoading(false);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredInvoices.map(i => i.id));
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
        const selectedInvoices = invoices.filter(inv => selectedIds.includes(inv.id));
        await generateBulkPDFZip(selectedInvoices, 'invoices');
        setExporting(false);
        setSelectedIds([]);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('¿Seguro que quieres eliminar esta factura?')) return;
        const { error } = await deleteInvoice(id);
        if (!error) loadInvoices();
    };

    const handleDownloadPDF = (e, invoice) => {
        e.stopPropagation();
        downloadInvoicePDF(invoice);
    };

    // Sort by correlative ID (Invoice Number) descending
    const sortedInvoices = [...invoices].sort((a, b) => {
        return (b.invoice_number || '').localeCompare(a.invoice_number || '');
    });

    const filteredInvoices = sortedInvoices.filter(inv => {
        const invoiceNum = inv.invoice_number || '';
        const contactName = inv.contacts?.full_name || '';
        const projectName = inv.projects?.name || '';
        const search = searchTerm.toLowerCase();

        return invoiceNum.toLowerCase().includes(search) ||
            contactName.toLowerCase().includes(search) ||
            projectName.toLowerCase().includes(search);
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pagada': return <CheckCircle className="w-4 h-4 text-green-400" anchor="green" />;
            case 'enviada': return <Clock className="w-4 h-4 text-blue-400" />;
            case 'atrasada': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'cancelada': return <XCircle className="w-4 h-4 text-gray-500" />;
            default: return <FileText className="w-4 h-4 text-yellow-400" />;
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pagada': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'enviada': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'atrasada': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'cancelada': return 'bg-white/5 text-gray-500 border-white/10';
            default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    return (
        <div className="space-y-6">
            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                <div className="flex flex-1 gap-4 w-full md:w-auto">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por nº factura, cliente, proyecto..."
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
                            <option value="enviada">Enviada</option>
                            <option value="pagada">Pagada</option>
                            <option value="atrasada">Atrasada</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </div>
                </div>
                {onCreateInvoice && (
                    <button
                        onClick={onCreateInvoice}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-white text-gray-900 font-black uppercase tracking-tighter px-6 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(224,255,0,0.3)] group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Nueva Factura
                    </button>
                )}
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <span className="text-sm font-bold text-white">
                        {selectedIds.length} facturas seleccionadas
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
            ) : filteredInvoices.length > 0 ? (
                <div className="bg-[#222222]/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/20">
                                    <th className="px-6 py-4 w-10">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={filteredInvoices.length > 0 && selectedIds.length === filteredInvoices.length}
                                            className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">ID / Nº Factura</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Estado</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Cliente / Proyecto</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Fecha</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Total</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredInvoices.map((inv) => (
                                    <tr
                                        key={inv.id}
                                        onClick={() => onSelectInvoice(inv)}
                                        className={`group hover:bg-white/[0.02] transition-all cursor-pointer ${selectedIds.includes(inv.id) ? 'bg-white/[0.05]' : ''}`}
                                    >
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(inv.id)}
                                                onChange={(e) => handleSelectOne(e, inv.id)}
                                                className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/30 transition-all">
                                                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                                </div>
                                                <span className="text-sm font-bold text-white uppercase tracking-tighter">{inv.invoice_number}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyles(inv.status)}`}>
                                                {getStatusIcon(inv.status)}
                                                {inv.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-3 h-3 text-gray-600" />
                                                    <span className="text-xs font-bold text-gray-300">{inv.contacts?.full_name || 'Sin asignar'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-3 h-3 text-gray-600" />
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter font-medium">{inv.projects?.name || 'Venta Directa'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(inv.issue_date).toLocaleDateString('es-ES')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="text-sm font-black text-white italic tracking-tighter">
                                                {/* Note: In a real app we'd fetch a total from the DB or a sum function */}
                                                -- €
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onSelectInvoice(inv); }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-primary"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDownloadPDF(e, inv)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                                    title="Descargar PDF"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e, inv.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-500 hover:text-red-500"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
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
                    <h3 className="text-lg font-bold text-white mb-2 uppercase italic tracking-tighter">No hay facturas</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8 uppercase tracking-widest text-[10px] font-bold">
                        Comienza creando una factura manual o convirtiendo un presupuesto aceptado.
                    </p>
                </div>
            )}
        </div>
    );
};

export default InvoiceList;
