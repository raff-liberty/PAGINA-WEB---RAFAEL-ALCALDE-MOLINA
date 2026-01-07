import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Building2, MapPin, Calendar, Tag, MessageSquare, Briefcase, Edit, Save } from 'lucide-react';
import { fetchContactById, updateContact, upsertContact, markMessagesAsRead } from '../../lib/crm/contacts';

const ContactDetail = ({ contactId, onClose, onUpdate }) => {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'messages', 'projects'

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
        loadContact();
        // Mark messages as read when opening detail
        if (contactId !== 'new') {
            markMessagesAsRead(contactId);
        }
    }, [contactId]);

    const loadContact = async () => {
        setLoading(true);
        if (contactId === 'new') {
            const newContact = {
                full_name: 'Nuevo Contacto',
                email: '',
                status: 'lead',
                phone: '',
                company: '',
                sector: '',
                city: '',
                notes: ''
            };
            setContact(newContact);
            setEditData(newContact);
            setEditing(true);
        } else {
            const { data } = await fetchContactById(contactId);
            if (data) {
                setContact(data);
                setEditData(data);
            }
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editData.email) return alert('El email es obligatorio');

        // Remove messages and projects arrays before saving
        const { messages, projects, ...dataToSave } = editData;

        let result;
        if (contactId === 'new') {
            result = await upsertContact(dataToSave);
        } else {
            result = await updateContact(contactId, dataToSave);
        }

        const { error, data } = result;

        if (!error) {
            // Reload full contact data (with messages and projects)
            if (contactId !== 'new') {
                await loadContact();
            } else {
                setContact(data || editData);
            }
            setEditing(false);
            if (onUpdate) onUpdate();
            if (contactId === 'new') onClose();
        } else {
            alert('Error al guardar: ' + error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'lead': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'cliente': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'inactivo': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
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

    if (!contact) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50000] flex items-start justify-center pt-28 p-4 overflow-y-auto">
            <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl max-w-4xl w-full shadow-2xl mb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold text-2xl">
                                {contact.full_name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1">
                            {editing ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editData.full_name}
                                        onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                        className="text-2xl font-bold text-white bg-black/30 border border-white/20 rounded px-2 w-full focus:border-primary focus:outline-none"
                                        placeholder="Nombre completo"
                                    />
                                    <input
                                        type="email"
                                        value={editData.email}
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
                        { id: 'info', label: 'Información', icon: Building2 },
                        { id: 'messages', label: `Mensajes (${contact.messages?.length || 0})`, icon: MessageSquare },
                        { id: 'projects', label: `Proyectos (${contact.projects?.length || 0})`, icon: Briefcase }
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
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Estado</label>
                                {editing ? (
                                    <select
                                        value={editData.status}
                                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    >
                                        <option value="lead">Lead</option>
                                        <option value="cliente">Cliente</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                ) : (
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(contact.status)}`}>
                                        {contact.status}
                                    </span>
                                )}
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
                                <label className="block text-sm font-medium text-gray-400 mb-2">Notas</label>
                                {editing ? (
                                    <textarea
                                        value={editData.notes || ''}
                                        onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                                        rows={4}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                    />
                                ) : (
                                    <p className="text-white whitespace-pre-wrap">{contact.notes || 'Sin notas'}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="space-y-4">
                            {contact.messages?.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No hay mensajes</p>
                            ) : (
                                contact.messages?.map((msg) => (
                                    <div key={msg.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-primary font-mono">{msg.source}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(msg.created_at).toLocaleString('es-ES')}
                                            </span>
                                        </div>
                                        <p className="text-white">{msg.message}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="space-y-4">
                            {contact.projects?.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No hay proyectos</p>
                            ) : (
                                contact.projects?.map((project) => (
                                    <div key={project.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <h4 className="text-white font-bold mb-2">{project.title}</h4>
                                        <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                                        <div className="flex items-center gap-4 text-xs">
                                            <span className="text-gray-500">Estado: {project.status}</span>
                                            <span className="text-gray-500">Presupuesto: {project.budget}€</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;
