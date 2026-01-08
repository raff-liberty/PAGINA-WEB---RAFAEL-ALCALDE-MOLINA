import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Building2, Calendar, Tag, MessageSquare, Edit, Save, Globe, Link2, Clock, User, FileText, PhoneCall, Send, Briefcase, Plus } from 'lucide-react';
import { fetchContactById, updateContact, changeOperationalStatus, changeContactType } from '../../lib/crm/contacts';
import { addNoteToContact } from '../../lib/crm/interactions';
import { fetchProjectsByContact, createProject } from '../../lib/crm/projects';
import ProjectDetail from './ProjectDetail';

const ContactDetail = ({ contactId, onClose, onUpdate }) => {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'origin', 'interactions', 'projects'
    const [newNote, setNewNote] = useState('');
    const [addingNote, setAddingNote] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [creatingProject, setCreatingProject] = useState(false);

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
        if (contactId && contactId !== 'new') {
            loadContact();
        } else if (contactId === 'new') {
            initNewContact();
        }
    }, [contactId]);

    const initNewContact = () => {
        const newContact = {
            full_name: '',
            email: '',
            contact_type: 'lead',
            operational_status: 'nuevo',
            phone: '',
            company: '',
            sector: '',
            city: '',
            notes: '',
            interactions: []
        };
        setContact(newContact);
        setEditData(newContact);
        setEditing(true);
        setLoading(false);
    };

    const loadContact = async () => {
        setLoading(true);
        const { data } = await fetchContactById(contactId);
        if (data) {
            setContact(data);
            setEditData(data);
            // Cargar proyectos del contacto
            await loadProjects(contactId);
        }
        setLoading(false);
    };

    const loadProjects = async (id) => {
        const { data } = await fetchProjectsByContact(id || contactId);
        if (data) setProjects(data);
    };

    const handleCreateProject = async () => {
        if (!contact?.id) return;
        setCreatingProject(true);
        const { data } = await createProject(contact.id, { name: `Proyecto - ${contact.full_name}` });
        if (data) {
            await loadProjects();
            setSelectedProject(data.id);
        }
        setCreatingProject(false);
    };

    const handleSave = async () => {
        if (!editData.email) return alert('El email es obligatorio');

        // Remove non-editable fields before saving
        const { interactions, entry_channel, entry_url, utm_source, utm_medium, utm_campaign,
            first_contact_at, last_interaction_at, created_at, id, ...dataToSave } = editData;

        let result;
        if (contactId === 'new') {
            // Para nuevo contacto, usar la API directamente
            const { supabase } = await import('../../lib/supabaseClient');
            result = await supabase
                .from('contacts')
                .insert({
                    ...dataToSave,
                    contact_type: dataToSave.contact_type || 'lead',
                    operational_status: dataToSave.operational_status || 'nuevo',
                    entry_channel: 'manual',
                    first_contact_at: new Date().toISOString(),
                    last_interaction_at: new Date().toISOString()
                })
                .select()
                .single();
        } else {
            result = await updateContact(contactId, dataToSave);
        }

        const { error, data } = result;

        if (!error) {
            if (contactId !== 'new') {
                await loadContact();
            } else {
                setContact(data || editData);
            }
            setEditing(false);
            if (onUpdate) onUpdate();
            if (contactId === 'new') onClose();
        } else {
            alert('Error al guardar: ' + (error.message || 'Error desconocido'));
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim() || !contact?.id) return;
        setAddingNote(true);

        const { error } = await addNoteToContact(contact.id, newNote, 'admin');

        if (!error) {
            setNewNote('');
            await loadContact();
        }
        setAddingNote(false);
    };

    const handleStatusChange = async (newStatus) => {
        if (!contact?.id) return;
        await changeOperationalStatus(contact.id, newStatus);
        await loadContact();
        if (onUpdate) onUpdate();
    };

    const handleTypeChange = async (newType) => {
        if (!contact?.id) return;
        await changeContactType(contact.id, newType);
        await loadContact();
        if (onUpdate) onUpdate();
    };

    // Colores por estado operativo
    const getStatusColor = (status) => {
        switch (status) {
            case 'nuevo': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'en_seguimiento': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'respondido': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'cerrado': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'descartado': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            default: return 'bg-white/5 text-gray-400 border-white/10';
        }
    };

    // Colores por tipo de interacción
    const getInteractionIcon = (type) => {
        switch (type) {
            case 'form_submission': return <FileText className="w-4 h-4 text-blue-400" />;
            case 'email': return <Mail className="w-4 h-4 text-purple-400" />;
            case 'whatsapp': return <MessageSquare className="w-4 h-4 text-green-400" />;
            case 'call': return <PhoneCall className="w-4 h-4 text-yellow-400" />;
            case 'note': return <Edit className="w-4 h-4 text-gray-400" />;
            default: return <MessageSquare className="w-4 h-4 text-gray-400" />;
        }
    };

    const getInteractionLabel = (type) => {
        switch (type) {
            case 'form_submission': return 'Formulario Web';
            case 'email': return 'Email';
            case 'whatsapp': return 'WhatsApp';
            case 'call': return 'Llamada';
            case 'note': return 'Nota Interna';
            case 'system': return 'Sistema';
            default: return type;
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!contact) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50000] flex items-start justify-center pt-20 p-4 overflow-y-auto">
            <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl max-w-4xl w-full shadow-2xl mb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold text-2xl">
                                {contact.full_name?.charAt(0).toUpperCase() || '?'}
                            </span>
                        </div>
                        <div className="flex-1">
                            {editing ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editData.full_name || ''}
                                        onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                        className="text-2xl font-bold text-white bg-black/30 border border-white/20 rounded px-2 w-full focus:border-primary focus:outline-none"
                                        placeholder="Nombre completo"
                                    />
                                    <input
                                        type="email"
                                        value={editData.email || ''}
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                        className="text-gray-400 bg-black/30 border border-white/20 rounded px-2 w-full focus:border-primary focus:outline-none"
                                        placeholder="Email"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-white">{contact.full_name}</h2>
                                    <p className="text-gray-400">{contact.email}</p>
                                </>
                            )}
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

                {/* Tabs */}
                <div className="flex border-b border-white/10 px-6">
                    {[
                        { id: 'info', label: 'Información', icon: User },
                        { id: 'origin', label: 'Origen', icon: Globe },
                        { id: 'interactions', label: `Interacciones (${contact.interactions?.length || 0})`, icon: MessageSquare },
                        { id: 'projects', label: `Proyectos (${projects.length})`, icon: Briefcase }
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
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            {/* Tipo y Estado en fila */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Tipo de Contacto */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Contacto</label>
                                    {editing || contactId === 'new' ? (
                                        <select
                                            value={editData.contact_type || 'lead'}
                                            onChange={(e) => setEditData({ ...editData, contact_type: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        >
                                            <option value="lead">Lead</option>
                                            <option value="cliente">Cliente</option>
                                            <option value="partner">Partner</option>
                                            <option value="proveedor">Proveedor</option>
                                        </select>
                                    ) : (
                                        <div className="flex gap-2 flex-wrap">
                                            {['lead', 'cliente', 'partner', 'proveedor'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => handleTypeChange(type)}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${contact.contact_type === type
                                                        ? 'bg-primary/20 text-primary border-primary/40'
                                                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                                                        }`}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Estado Operativo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Estado Operativo</label>
                                    {editing || contactId === 'new' ? (
                                        <select
                                            value={editData.operational_status || 'nuevo'}
                                            onChange={(e) => setEditData({ ...editData, operational_status: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        >
                                            <option value="nuevo">Nuevo</option>
                                            <option value="en_seguimiento">En Seguimiento</option>
                                            <option value="respondido">Respondido</option>
                                            <option value="cerrado">Cerrado</option>
                                            <option value="descartado">Descartado</option>
                                        </select>
                                    ) : (
                                        <div className="flex gap-2 flex-wrap">
                                            {['nuevo', 'en_seguimiento', 'respondido', 'cerrado', 'descartado'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusChange(status)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${getStatusColor(status)} ${contact.operational_status === status ? 'ring-2 ring-offset-2 ring-offset-[#1a1a1a]' : 'opacity-60 hover:opacity-100'
                                                        }`}
                                                >
                                                    {status === 'en_seguimiento' ? 'Seguimiento' : status.charAt(0).toUpperCase() + status.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Último contacto (calculado) */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    <span>Último contacto:</span>
                                    <span className="text-white font-medium">
                                        {contact.last_interaction_at
                                            ? new Date(contact.last_interaction_at).toLocaleString('es-ES', {
                                                day: '2-digit', month: 'long', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })
                                            : 'Sin interacciones'
                                        }
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editData.phone || ''}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">{contact.phone || '-'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Empresa</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editData.company || ''}
                                            onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">{contact.company || '-'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Sector</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editData.sector || ''}
                                            onChange={(e) => setEditData({ ...editData, sector: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">{contact.sector || '-'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Ciudad</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editData.city || ''}
                                            onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">{contact.city || '-'}</p>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Notas internas</label>
                                {editing ? (
                                    <textarea
                                        value={editData.notes || ''}
                                        onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    />
                                ) : (
                                    <p className="text-white whitespace-pre-wrap">{contact.notes || 'Sin notas'}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'origin' && (
                        <div className="space-y-6">
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                                <p className="text-blue-400 text-sm mb-2">ℹ️ Estos datos se capturan automáticamente y no son editables.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                        <MessageSquare className="w-4 h-4" />
                                        Canal de entrada
                                    </div>
                                    <p className="text-white font-medium">{contact.entry_channel || 'No registrado'}</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        Primer contacto
                                    </div>
                                    <p className="text-white font-medium">
                                        {contact.first_contact_at
                                            ? new Date(contact.first_contact_at).toLocaleString('es-ES', {
                                                day: '2-digit', month: 'long', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })
                                            : new Date(contact.created_at).toLocaleString('es-ES')
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                    <Link2 className="w-4 h-4" />
                                    URL de origen
                                </div>
                                <p className="text-white font-medium break-all">{contact.entry_url || 'No registrada'}</p>
                            </div>

                            {/* UTMs */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-3">Parámetros UTM</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                        <p className="text-xs text-gray-500 mb-1">utm_source</p>
                                        <p className="text-white text-sm">{contact.utm_source || '-'}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                        <p className="text-xs text-gray-500 mb-1">utm_medium</p>
                                        <p className="text-white text-sm">{contact.utm_medium || '-'}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                        <p className="text-xs text-gray-500 mb-1">utm_campaign</p>
                                        <p className="text-white text-sm">{contact.utm_campaign || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'interactions' && (
                        <div className="space-y-4">
                            {/* Add Note Form */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        placeholder="Añadir nota interna..."
                                        rows={2}
                                        className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                                    />
                                    <button
                                        onClick={handleAddNote}
                                        disabled={!newNote.trim() || addingNote}
                                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed self-end"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Interactions List */}
                            {contact.interactions?.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No hay interacciones registradas</p>
                            ) : (
                                <div className="space-y-3">
                                    {contact.interactions?.map((interaction) => (
                                        <div key={interaction.id} className="bg-white/5 border border-white/10 rounded-lg p-4 relative">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                    {getInteractionIcon(interaction.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-white">
                                                                {getInteractionLabel(interaction.type)}
                                                            </span>
                                                            {interaction.channel && (
                                                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                                                                    {interaction.channel}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(interaction.created_at).toLocaleString('es-ES', {
                                                                day: '2-digit', month: 'short', year: 'numeric',
                                                                hour: '2-digit', minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{interaction.content}</p>
                                                    {interaction.author && interaction.author !== 'system' && (
                                                        <p className="text-xs text-gray-500 mt-2">Por: {interaction.author}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="space-y-4">
                            {/* Crear Proyecto */}
                            {contactId !== 'new' && (
                                <button
                                    onClick={handleCreateProject}
                                    disabled={creatingProject}
                                    className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-bold py-3 rounded-xl transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    {creatingProject ? 'Creando...' : 'Nuevo Proyecto'}
                                </button>
                            )}

                            {/* Lista de Proyectos */}
                            {projects.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No hay proyectos asociados</p>
                            ) : (
                                <div className="space-y-3">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => setSelectedProject(project.id)}
                                            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-primary/40 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-white">{project.name}</h4>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${project.status === 'propuesta' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                                        project.status === 'aceptado' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                            project.status === 'en_ejecucion' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    }`}>
                                                    {project.status === 'en_ejecucion' ? 'En Ejecución' : project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{new Date(project.created_at).toLocaleDateString('es-ES')}</span>
                                                <span>{project.quotes?.length || 0} presupuesto(s)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal ProjectDetail */}
            {selectedProject && (
                <ProjectDetail
                    projectId={selectedProject}
                    onClose={() => { setSelectedProject(null); loadProjects(); }}
                    onUpdate={() => { loadProjects(); if (onUpdate) onUpdate(); }}
                />
            )}
        </div>
    );
};

export default ContactDetail;
