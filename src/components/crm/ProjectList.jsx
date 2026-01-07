import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, Calendar, DollarSign, Clock, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { fetchProjects, deleteProject, getProjectStats } from '../../lib/crm/projects';

const ProjectList = ({ onSelectProject, onCreateProject }) => {
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, total_budget: 0 });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all'
    });

    useEffect(() => {
        loadProjects();
        loadStats();
    }, [filters]);

    const loadProjects = async () => {
        setLoading(true);
        const { data } = await fetchProjects(filters);
        if (data) setProjects(data);
        setLoading(false);
    };

    const loadStats = async () => {
        const { data } = await getProjectStats();
        if (data) setStats(data);
    };

    const handleDelete = async (projectId) => {
        if (!confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return;

        const { error } = await deleteProject(projectId);
        if (!error) {
            loadProjects();
            loadStats();
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

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Pendiente';
            case 'in_progress': return 'En Curso';
            case 'completed': return 'Completado';
            case 'cancelled': return 'Cancelado';
            default: return status;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-bold text-white">{stats.total}</span>
                    </div>
                    <p className="text-sm text-gray-400">Total Proyectos</p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span className="text-2xl font-bold text-blue-400">{stats.active}</span>
                    </div>
                    <p className="text-sm text-gray-400">En Curso</p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <span className="text-2xl font-bold text-green-400">{stats.completed}</span>
                    </div>
                    <p className="text-sm text-gray-400">Completados</p>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-5 h-5 text-purple-400" />
                        <span className="text-2xl font-bold text-purple-400">{formatCurrency(stats.total_budget)}</span>
                    </div>
                    <p className="text-sm text-gray-400">Presupuesto Total</p>
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
                                placeholder="Buscar proyecto..."
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
                        <option value="pending">Pendiente</option>
                        <option value="in_progress">En Curso</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                    </select>

                    {/* New Project Button */}
                    <button
                        onClick={onCreateProject}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-6 py-2 rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo Proyecto
                    </button>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20">
                        <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No hay proyectos que mostrar</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Proyecto</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Presupuesto</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Fecha Inicio</th>
                                    <th className="text-right px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{project.title}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{project.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.contacts ? (
                                                <div>
                                                    <div className="text-white text-sm">{project.contacts.full_name}</div>
                                                    <div className="text-xs text-gray-500">{project.contacts.company}</div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-600">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                                {getStatusLabel(project.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white font-mono">
                                            {formatCurrency(project.budget)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {project.start_date
                                                ? new Date(project.start_date).toLocaleDateString('es-ES')
                                                : '-'
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onSelectProject(project)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Ver detalles"
                                                >
                                                    <Eye className="w-4 h-4 text-gray-400 hover:text-primary" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
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

export default ProjectList;
