import React, { useState, useEffect } from 'react';
import { X, Edit, Save, User, Calendar, FileText, Plus, Send, Check, XCircle, Copy, Trash2, ArrowLeft } from 'lucide-react';
import { fetchProjectById, updateProject, changeProjectStatus, deleteProject } from '../../lib/crm/projects';
import { fetchQuotesByProject, createQuote, sendQuote, acceptQuote, rejectQuote, createNewVersion, deleteQuote } from '../../lib/crm/quotes';
import QuoteEditor from './QuoteEditor';

const ProjectDetail = ({ projectId, onClose, onUpdate }) => {
    const [project, setProject] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('info');
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [creatingQuote, setCreatingQuote] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        if (projectId) loadProject();
    }, [projectId]);

    const loadProject = async () => {
        setLoading(true);
        const { data } = await fetchProjectById(projectId);
        if (data) {
            setProject(data);
            setEditData(data);
            setQuotes(data.quotes || []);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        const { contact, quotes: _, ...updates } = editData;
        const { error } = await updateProject(projectId, updates);
        if (!error) {
            await loadProject();
            setEditing(false);
            if (onUpdate) onUpdate();
        }
    };

    const handleStatusChange = async (status) => {
        await changeProjectStatus(projectId, status);
        await loadProject();
        if (onUpdate) onUpdate();
    };

    const handleCreateQuote = async () => {
        setCreatingQuote(true);
        const { data } = await createQuote(projectId);
        if (data) {
            await loadProject();
            setSelectedQuote(data.id);
        }
        setCreatingQuote(false);
    };

    const handleQuoteAction = async (action, quoteId) => {
        switch (action) {
            case 'send':
                await sendQuote(quoteId);
                break;
            case 'accept':
                await acceptQuote(quoteId);
                break;
            case 'reject':
                await rejectQuote(quoteId);
                break;
            case 'newVersion':
                const { data } = await createNewVersion(quoteId);
                if (data) setSelectedQuote(data.id);
                break;
            case 'delete':
                if (confirm('¿Eliminar este presupuesto en borrador?')) {
                    await deleteQuote(quoteId);
                }
                break;
        }
        await loadProject();
        if (onUpdate) onUpdate();
    };

    const handleDeleteProject = async () => {
        if (!confirm('¿Eliminar este proyecto y todos sus presupuestos?')) return;
        const { error } = await deleteProject(projectId);
        if (!error) onClose();
    };

    const getStatusColor = (status) => {
        const colors = {
            propuesta: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
            presupuestado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            aceptado: 'bg-green-500/10 text-green-400 border-green-500/20',
            en_ejecucion: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            cerrado: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            cancelado: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
        return colors[status] || colors.propuesta;
    };

    const getQuoteStatusColor = (status) => {
        const colors = {
            borrador: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
            enviado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            aceptado: 'bg-green-500/10 text-green-400 border-green-500/20',
            rechazado: 'bg-red-500/10 text-red-400 border-red-500/20',
            caducado: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        };
        return colors[status] || colors.borrador;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60000] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) return null;

    // Si hay un presupuesto seleccionado, mostrar el editor
    if (selectedQuote) {
        return (
            <QuoteEditor
                quoteId={selectedQuote}
                onClose={() => { setSelectedQuote(null); loadProject(); }}
                onUpdate={() => { loadProject(); if (onUpdate) onUpdate(); }}
            />
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60000] flex items-start justify-center pt-16 p-4 overflow-y-auto">
            <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl max-w-4xl w-full shadow-2xl mb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <div>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editData.name || ''}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="text-xl font-bold text-white bg-black/30 border border-white/20 rounded px-2 focus:border-primary focus:outline-none"
                                />
                            ) : (
                                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                            )}
                            <p className="text-sm text-gray-400">
                                {project.contact?.full_name} · {project.contact?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {editing ? (
                            <button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-4 py-2 rounded-lg">
                                <Save className="w-4 h-4" /> Guardar
                            </button>
                        ) : (
                            <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg">
                                <Edit className="w-4 h-4" /> Editar
                            </button>
                        )}
                        <button onClick={handleDeleteProject} className="p-2 hover:bg-red-500/20 rounded-lg" title="Eliminar proyecto">
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 px-6">
                    {[
                        { id: 'info', label: 'Información', icon: FileText },
                        { id: 'quotes', label: `Presupuestos (${quotes.length})`, icon: FileText }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            {/* Estado */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Estado del Proyecto</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['propuesta', 'presupuestado', 'aceptado', 'en_ejecucion', 'cerrado', 'cancelado'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(status)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${getStatusColor(status)} ${project.status === status ? 'ring-2 ring-offset-2 ring-offset-[#1a1a1a]' : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            {status === 'en_ejecucion' ? 'En Ejecución' : status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                                {editing ? (
                                    <textarea
                                        value={editData.description || ''}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        rows={3}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    />
                                ) : (
                                    <p className="text-white">{project.description || 'Sin descripción'}</p>
                                )}
                            </div>

                            {/* Responsable */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Responsable</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={editData.responsible || ''}
                                        onChange={(e) => setEditData({ ...editData, responsible: e.target.value })}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    />
                                ) : (
                                    <p className="text-white">{project.responsible || 'Sin asignar'}</p>
                                )}
                            </div>

                            {/* Fechas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 mb-1">Creado</p>
                                    <p className="text-white text-sm">
                                        {new Date(project.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 mb-1">Actualizado</p>
                                    <p className="text-white text-sm">
                                        {new Date(project.updated_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'quotes' && (
                        <div className="space-y-4">
                            {/* Crear Presupuesto */}
                            <button
                                onClick={handleCreateQuote}
                                disabled={creatingQuote}
                                className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-bold py-3 rounded-xl transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                {creatingQuote ? 'Creando...' : 'Nuevo Presupuesto'}
                            </button>

                            {/* Lista de Presupuestos */}
                            {quotes.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No hay presupuestos</p>
                            ) : (
                                <div className="space-y-3">
                                    {quotes.map((quote) => (
                                        <div key={quote.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white font-bold">v{quote.version}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getQuoteStatusColor(quote.status)}`}>
                                                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                                    </span>
                                                </div>
                                                <span className="text-xl font-bold text-primary">{formatCurrency(quote.total)}</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {new Date(quote.created_at).toLocaleDateString('es-ES')}
                                                    {quote.sent_at && ` · Enviado ${new Date(quote.sent_at).toLocaleDateString('es-ES')}`}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    {quote.status === 'borrador' && (
                                                        <>
                                                            <button
                                                                onClick={() => setSelectedQuote(quote.id)}
                                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('send', quote.id)}
                                                                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs rounded-lg flex items-center gap-1"
                                                            >
                                                                <Send className="w-3 h-3" /> Enviar
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('delete', quote.id)}
                                                                className="p-1 hover:bg-red-500/20 rounded"
                                                            >
                                                                <Trash2 className="w-3 h-3 text-red-400" />
                                                            </button>
                                                        </>
                                                    )}
                                                    {quote.status === 'enviado' && (
                                                        <>
                                                            <button
                                                                onClick={() => setSelectedQuote(quote.id)}
                                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
                                                            >
                                                                Ver
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('accept', quote.id)}
                                                                className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs rounded-lg flex items-center gap-1"
                                                            >
                                                                <Check className="w-3 h-3" /> Aceptar
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('reject', quote.id)}
                                                                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg flex items-center gap-1"
                                                            >
                                                                <XCircle className="w-3 h-3" /> Rechazar
                                                            </button>
                                                        </>
                                                    )}
                                                    {['rechazado', 'caducado'].includes(quote.status) && (
                                                        <button
                                                            onClick={() => handleQuoteAction('newVersion', quote.id)}
                                                            className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs rounded-lg flex items-center gap-1"
                                                        >
                                                            <Copy className="w-3 h-3" /> Nueva Versión
                                                        </button>
                                                    )}
                                                    {['aceptado', 'rechazado', 'caducado'].includes(quote.status) && (
                                                        <button
                                                            onClick={() => setSelectedQuote(quote.id)}
                                                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
                                                        >
                                                            Ver
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
