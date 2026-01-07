import React, { useState, useEffect } from 'react';
import { X, Briefcase, Calendar, DollarSign, User, CheckCircle, Clock, Edit, Save, Plus, Trash2 } from 'lucide-react';
import { fetchProjectById, upsertProject } from '../../lib/crm/projects';
import { fetchContacts } from '../../lib/crm/contacts';

const ProjectDetail = ({ projectId, onClose, onUpdate }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [contacts, setContacts] = useState([]); // Para el selector de clientes
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'items'

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, []);

    useEffect(() => {
        loadProject();
        if (projectId === 'new' || editing) {
            loadContacts();
        }
    }, [projectId, editing]);

    const loadProject = async () => {
        setLoading(true);
        if (projectId === 'new') {
            const newProject = {
                title: 'Nuevo Proyecto',
                description: '',
                status: 'pending',
                budget: 0,
                start_date: new Date().toISOString().split('T')[0],
                contact_id: null
            };
            setProject(newProject);
            setEditData(newProject);
            setEditing(true);
        } else {
            const { data } = await fetchProjectById(projectId);
            if (data) {
                setProject(data);
                setEditData(data);
            }
        }
        setLoading(false);
    };

    const loadContacts = async () => {
        const { data } = await fetchContacts(); // Cargar todos para el select
        if (data) setContacts(data);
    };

    const handleSave = async () => {
        if (!editData.title) return alert('El título es obligatorio');

        const { error, data } = await upsertProject(editData);

        if (!error) {
            const savedProject = data || editData;
            setProject(savedProject);
            setEditing(false);
            if (onUpdate) onUpdate();
            if (projectId === 'new') onClose();
        } else {
            alert('Error al guardar: ' + error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'in_progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-white/5 text-gray-400 border-white/10';
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50000] flex items-start justify-center pt-28 p-4 overflow-y-auto">
            <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl max-w-4xl w-full shadow-2xl mb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            {editing ? (
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    className="text-2xl font-bold text-white bg-black/30 border border-white/20 rounded px-2 w-full focus:border-primary focus:outline-none mb-2"
                                    placeholder="Título del Proyecto"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                {editing ? (
                                    <select
                                        value={editData.status}
                                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                        className="bg-black/30 border border-white/20 rounded px-2 py-1 text-white focus:border-primary focus:outline-none"
                                    >
                                        <option value="pending">Pendiente</option>
                                        <option value="in_progress">En Curso</option>
                                        <option value="completed">Completado</option>
                                        <option value="cancelled">Cancelado</option>
                                    </select>
                                ) : (
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                        {project.status.toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        {editing ? (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-4 py-2 rounded-lg transition-all"
                            >
                                <Save className="w-4 h-4" />
                                Guardar
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                            >
                                <Edit className="w-4 h-4" />
                                Editar
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                                {editing ? (
                                    <textarea
                                        value={editData.description || ''}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        rows={4}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        placeholder="Descripción detallada del proyecto..."
                                    />
                                ) : (
                                    <p className="text-white whitespace-pre-wrap">{project.description || 'Sin descripción'}</p>
                                )}
                            </div>

                            {/* Partidas (Placeholder for now) */}
                            <div className="pt-6 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4">Partidas del Proyecto</h3>
                                <div className="bg-white/5 rounded-lg p-8 text-center border border-white/10 border-dashed">
                                    <p className="text-gray-400">La gestión de partidas y presupuestos estará disponible próximamente.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Metadata */}
                        <div className="space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Cliente
                                    </label>
                                    {editing ? (
                                        <select
                                            value={editData.contact_id || ''}
                                            onChange={(e) => setEditData({ ...editData, contact_id: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        >
                                            <option value="">Seleccionar Cliente</option>
                                            {contacts.map(c => (
                                                <option key={c.id} value={c.id}>{c.full_name} ({c.company || 'Sin empresa'})</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="text-white font-medium">
                                            {project.contacts?.full_name || 'Sin cliente asignado'}
                                            {project.contacts?.company && <div className="text-xs text-gray-500">{project.contacts.company}</div>}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" /> Presupuesto
                                    </label>
                                    {editing ? (
                                        <input
                                            type="number"
                                            value={editData.budget || 0}
                                            onChange={(e) => setEditData({ ...editData, budget: parseFloat(e.target.value) })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <div className="text-white font-mono text-lg">
                                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(project.budget || 0)}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Fecha Inicio
                                    </label>
                                    {editing ? (
                                        <input
                                            type="date"
                                            value={editData.start_date || ''}
                                            onChange={(e) => setEditData({ ...editData, start_date: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <div className="text-white">
                                            {project.start_date ? new Date(project.start_date).toLocaleDateString('es-ES') : '-'}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Fecha Fin
                                    </label>
                                    {editing ? (
                                        <input
                                            type="date"
                                            value={editData.end_date || ''}
                                            onChange={(e) => setEditData({ ...editData, end_date: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <div className="text-white">
                                            {project.end_date ? new Date(project.end_date).toLocaleDateString('es-ES') : '-'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
