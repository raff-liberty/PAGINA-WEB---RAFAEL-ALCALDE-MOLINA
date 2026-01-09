import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, User, Mail, Phone, LayoutGrid, Brain, MessageSquare, Heart, AlertTriangle } from 'lucide-react';

const DiagnosisDetail = ({ diagnosis, onClose }) => {
    if (!diagnosis) return null;

    const getChaosLevelData = (level) => {
        switch (level?.toUpperCase()) {
            case 'CAOS CRÍTICO': return { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
            case 'CAOS FUNCIONAL': return { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' };
            case 'CAOS BAJO': return { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' };
            default: return { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
        }
    };

    const levelData = getChaosLevelData(diagnosis.chaos_level);

    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full bg-[#121212] border-l border-white/10 w-full md:w-[600px] overflow-hidden shadow-2xl"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-display font-medium">Detalle de Autopsia</h2>
                    <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {diagnosis.created_at ? new Date(diagnosis.created_at).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : '---'}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                {/* Executive Summary */}
                <div className={`p-6 rounded-2xl border ${levelData.bg} ${levelData.border}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <Brain className={`w-5 h-5 ${levelData.color}`} />
                        <span className={`text-sm font-bold uppercase tracking-widest ${levelData.color}`}>
                            {diagnosis.chaos_level || 'Pendiente de Análisis por IA'}
                        </span>
                    </div>
                    {diagnosis.ai_analysis?.resumen ? (
                        <p className="text-lg leading-relaxed text-white">"{diagnosis.ai_analysis.resumen}"</p>
                    ) : (
                        <p className="italic text-text-muted">Aguardando procesamiento de n8n...</p>
                    )}
                </div>

                {/* Cliente / Contacto */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <User className="w-4 h-4" /> Datos de Contacto
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-xs text-text-muted block mb-1">Nombre</span>
                            <p className="font-medium">{diagnosis.full_name || 'Anónimo'}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden text-ellipsis">
                            <span className="text-xs text-text-muted block mb-1">Email</span>
                            <p className="font-medium truncate">{diagnosis.email}</p>
                        </div>
                        {diagnosis.phone && (
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-xs text-text-muted block mb-1">WhatsApp</span>
                                <p className="font-medium">{diagnosis.phone}</p>
                            </div>
                        )}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-xs text-text-muted block mb-1">Rama Detectada</span>
                            <span className="inline-block px-2 py-0.5 rounded bg-primary text-background-dark text-[10px] font-bold">
                                {diagnosis.detected_branch}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dolores Detectados (IA) */}
                {diagnosis.ai_analysis?.dolores && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Dolores Prioritarios
                        </h3>
                        <div className="space-y-2">
                            {diagnosis.ai_analysis.dolores.map((dolor, i) => (
                                <div key={i} className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                    <p className="text-sm font-medium text-red-200">{dolor}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bloque Emocional */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <Heart className="w-4 h-4" /> Bloque Emocional
                    </h3>
                    <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                            <span className="text-xs text-primary/70 block mb-2 italic">Si recuperara 4 horas, las usaría para...</span>
                            <p className="text-white italic">"{diagnosis.responses?.recovery_time || 'No especificado'}"</p>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                            <span className="text-xs text-orange-400 block mb-2 italic">Lo que más me angustia es...</span>
                            <p className="text-white italic">"{diagnosis.responses?.current_distress || 'No especificado'}"</p>
                        </div>
                    </div>
                </div>

                {/* Respuestas Técnicas */}
                <div className="space-y-4 pb-12">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4" /> Mapa de Respuestas
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(diagnosis.responses || {}).map(([key, value]) => {
                            if (key === 'recovery_time' || key === 'current_distress') return null;
                            return (
                                <div key={key} className="flex justify-between items-center p-3 text-xs bg-white/5 border-b border-white/5 last:border-0 uppercase tracking-tight">
                                    <span className="text-text-muted">{key.replace(/_/g, ' ')}</span>
                                    <span className="font-bold text-primary">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-white/10 bg-[#0A0A0A] flex gap-3">
                <button className="flex-1 py-3 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
                    Marcar como Contactado
                </button>
                <button className="px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                    <MessageSquare className="w-5 h-5 text-text-muted" />
                </button>
            </div>
        </motion.div>
    );
};

export default DiagnosisDetail;
