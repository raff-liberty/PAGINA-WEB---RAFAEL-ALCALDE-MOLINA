import React from 'react';
import { ClipboardList, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';

const DiagnosisList = ({ diagnoses, onSelect, selectedId }) => {

    const getChaosColor = (level) => {
        switch (level?.toUpperCase()) {
            case 'CAOS CRÍTICO': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'CAOS FUNCIONAL': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'CAOS BAJO': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getUrgenciaColor = (urgency) => {
        switch (urgency?.toLowerCase()) {
            case 'alta': case 'critica': case 'maxima': return 'text-red-400';
            case 'media': return 'text-orange-400';
            default: return 'text-green-400';
        }
    };

    if (diagnoses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-text-muted">
                <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
                <p>No hay diagnósticos registrados todavía.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-xs font-medium text-text-muted uppercase tracking-wider">
                        <th className="px-6 py-4">Fecha</th>
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Rama</th>
                        <th className="px-6 py-4">Nivel de Caos</th>
                        <th className="px-6 py-4">Urgencia</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {diagnoses.map((diag) => (
                        <tr
                            key={diag.id}
                            onClick={() => onSelect(diag)}
                            className={`group cursor-pointer transition-colors hover:bg-white/5 ${selectedId === diag.id ? 'bg-primary/5' : ''}`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {diag.created_at ? new Date(diag.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '---'}
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-white">{diag.full_name || 'Anónimo'}</div>
                                <div className="text-xs text-text-muted">{diag.email}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white">
                                    {diag.detected_branch || 'N/A'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getChaosColor(diag.chaos_level)}`}>
                                    {diag.chaos_level || 'PENDIENTE IA'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                                <span className={getUrgenciaColor(diag.urgency)}>
                                    {diag.urgency || '---'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Info className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiagnosisList;
