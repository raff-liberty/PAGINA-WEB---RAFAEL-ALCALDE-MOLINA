import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Mail, Phone, Building2, MapPin, Tag, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { fetchContacts, deleteContact, getContactStats } from '../../lib/crm/contacts';

const ContactList = ({ onSelectContact, onCreateContact }) => {
    const [contacts, setContacts] = useState([]);
    const [stats, setStats] = useState({ total: 0, leads: 0, clientes: 0, inactivos: 0 });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        sector: 'all',
        city: 'all'
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'lead': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'cliente': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'inactivo': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            default: return 'bg-white/5 text-gray-400 border-white/10';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'lead': return 'Lead';
            case 'cliente': return 'Cliente';
            case 'inactivo': return 'Inactivo';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-bold text-white">{stats.total}</span>
                    </div>
                    <p className="text-sm text-gray-400">Total Contactos</p>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Tag className="w-5 h-5 text-yellow-400" />
                        <span className="text-2xl font-bold text-yellow-400">{stats.leads}</span>
                    </div>
                    <p className="text-sm text-gray-400">Leads</p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-green-400" />
                        <span className="text-2xl font-bold text-green-400">{stats.clientes}</span>
                    </div>
                    <p className="text-sm text-gray-400">Clientes</p>
                </div>
                <div className="bg-gray-500/5 border border-gray-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-2xl font-bold text-gray-400">{stats.inactivos}</span>
                    </div>
                    <p className="text-sm text-gray-400">Inactivos</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
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
                        <option value="lead">Leads</option>
                        <option value="cliente">Clientes</option>
                        <option value="inactivo">Inactivos</option>
                    </select>

                    {/* New Contact Button */}
                    <button
                        onClick={onCreateContact}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-6 py-2 rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo Contacto
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
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Empresa</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Ciudad</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Último Contacto</th>
                                    <th className="text-right px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-white/5 transition-colors">
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
                                                    {contact.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                                            <Phone className="w-3 h-3" />
                                                            {contact.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.company ? (
                                                <div className="flex items-center gap-2 text-white">
                                                    <Building2 className="w-4 h-4 text-gray-500" />
                                                    {contact.company}
                                                </div>
                                            ) : (
                                                <span className="text-gray-600">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                                                {getStatusLabel(contact.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.city ? (
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    {contact.city}
                                                </div>
                                            ) : (
                                                <span className="text-gray-600">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {contact.last_contact_date
                                                ? new Date(contact.last_contact_date).toLocaleDateString('es-ES')
                                                : new Date(contact.created_at).toLocaleDateString('es-ES')
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onSelectContact(contact)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="w-4 h-4 text-gray-400 hover:text-primary" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
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
