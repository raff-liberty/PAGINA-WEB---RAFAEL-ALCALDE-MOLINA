import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Mail, Phone, Building2, MapPin, Tag, Plus, Eye, Trash2, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { fetchContacts, deleteContact, getContactStats } from '../../lib/crm/contacts';

const ContactList = ({ onSelectContact, onCreateContact }) => {
    const [contacts, setContacts] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        nuevos: 0,
        en_seguimiento: 0,
        respondidos: 0,
        cerrados: 0,
        descartados: 0
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        type: 'all'
    });

    useEffect(() => {
        loadContacts();
        loadStats();
    }, [filters]);

    const loadContacts = async () => {
        setLoading(true);
        const { data } = await fetchContacts(filters);
        if (data) setContacts(data);
        setLoading(false);
    };

    const loadStats = async () => {
        const { data } = await getContactStats();
        if (data) setStats(data);
    };

    const handleDelete = async (contactId) => {
        if (!confirm('¿Eliminar este contacto? Esta acción no se puede deshacer.')) return;

        const { error } = await deleteContact(contactId);
        if (!error) {
            loadContacts();
            loadStats();
        }
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

    const getStatusLabel = (status) => {
        switch (status) {
            case 'nuevo': return 'Nuevo';
            case 'en_seguimiento': return 'En seguimiento';
            case 'respondido': return 'Respondido';
            case 'cerrado': return 'Cerrado';
            case 'descartado': return 'Descartado';
            default: return status;
        }
    };

    // Colores por tipo de contacto
    const getTypeColor = (type) => {
        switch (type) {
            case 'lead': return 'text-yellow-400';
            case 'cliente': return 'text-green-400';
            case 'partner': return 'text-blue-400';
            case 'proveedor': return 'text-purple-400';
            default: return 'text-gray-400';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'lead': return 'Lead';
            case 'cliente': return 'Cliente';
            case 'partner': return 'Partner';
            case 'proveedor': return 'Proveedor';
            default: return type;
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards - Estados Operativos */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div
                    className={`bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 cursor-pointer transition-all hover:bg-blue-500/10 ${filters.status === 'nuevo' ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setFilters({ ...filters, status: filters.status === 'nuevo' ? 'all' : 'nuevo' })}
                >
                    <div className="flex items-center justify-between mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-xl font-bold text-blue-400">{stats.nuevos}</span>
                    </div>
                    <p className="text-xs text-gray-400">Nuevos</p>
                </div>
                <div
                    className={`bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 cursor-pointer transition-all hover:bg-yellow-500/10 ${filters.status === 'en_seguimiento' ? 'ring-2 ring-yellow-500' : ''}`}
                    onClick={() => setFilters({ ...filters, status: filters.status === 'en_seguimiento' ? 'all' : 'en_seguimiento' })}
                >
                    <div className="flex items-center justify-between mb-2">
                        <MessageSquare className="w-4 h-4 text-yellow-400" />
                        <span className="text-xl font-bold text-yellow-400">{stats.en_seguimiento}</span>
                    </div>
                    <p className="text-xs text-gray-400">En Seguimiento</p>
                </div>
                <div
                    className={`bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 cursor-pointer transition-all hover:bg-purple-500/10 ${filters.status === 'respondido' ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setFilters({ ...filters, status: filters.status === 'respondido' ? 'all' : 'respondido' })}
                >
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span className="text-xl font-bold text-purple-400">{stats.respondidos}</span>
                    </div>
                    <p className="text-xs text-gray-400">Respondidos</p>
                </div>
                <div
                    className={`bg-green-500/5 border border-green-500/20 rounded-xl p-4 cursor-pointer transition-all hover:bg-green-500/10 ${filters.status === 'cerrado' ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => setFilters({ ...filters, status: filters.status === 'cerrado' ? 'all' : 'cerrado' })}
                >
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xl font-bold text-green-400">{stats.cerrados}</span>
                    </div>
                    <p className="text-xs text-gray-400">Cerrados</p>
                </div>
                <div
                    className={`bg-gray-500/5 border border-gray-500/20 rounded-xl p-4 cursor-pointer transition-all hover:bg-gray-500/10 ${filters.status === 'descartado' ? 'ring-2 ring-gray-500' : ''}`}
                    onClick={() => setFilters({ ...filters, status: filters.status === 'descartado' ? 'all' : 'descartado' })}
                >
                    <div className="flex items-center justify-between mb-2">
                        <XCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-xl font-bold text-gray-400">{stats.descartados}</span>
                    </div>
                    <p className="text-xs text-gray-400">Descartados</p>
                </div>
            </div>

            {/* Total y resumen */}
            <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Total: <strong className="text-white">{stats.total}</strong> contactos</span>
                <span>Leads: <strong className="text-yellow-400">{stats.leads}</strong> · Clientes: <strong className="text-green-400">{stats.clientes}</strong></span>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, email o empresa..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="nuevo">Nuevos</option>
                        <option value="en_seguimiento">En seguimiento</option>
                        <option value="respondido">Respondidos</option>
                        <option value="cerrado">Cerrados</option>
                        <option value="descartado">Descartados</option>
                    </select>

                    {/* Type Filter */}
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                    >
                        <option value="all">Todos los tipos</option>
                        <option value="lead">Leads</option>
                        <option value="cliente">Clientes</option>
                        <option value="partner">Partners</option>
                        <option value="proveedor">Proveedores</option>
                    </select>

                    {/* New Contact Button */}
                    <button
                        onClick={onCreateContact}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-6 py-2 rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo
                    </button>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="text-center py-20">
                        <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No hay contactos que mostrar</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Contacto</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Tipo</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Último Contacto</th>
                                    <th className="text-right px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onSelectContact(contact)}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <span className="text-primary font-bold">
                                                        {contact.full_name?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{contact.full_name}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="w-3 h-3" />
                                                        {contact.email}
                                                    </div>
                                                    {contact.company && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <Building2 className="w-3 h-3" />
                                                            {contact.company}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-medium ${getTypeColor(contact.contact_type)}`}>
                                                {getTypeLabel(contact.contact_type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.operational_status)}`}>
                                                {getStatusLabel(contact.operational_status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {contact.last_interaction_at
                                                ? new Date(contact.last_interaction_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
                                                : new Date(contact.created_at).toLocaleDateString('es-ES')
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onSelectContact(contact); }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="w-4 h-4 text-gray-400 hover:text-primary" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
