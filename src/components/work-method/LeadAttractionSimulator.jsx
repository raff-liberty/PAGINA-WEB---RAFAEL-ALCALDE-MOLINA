import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, UserCheck, Zap, Mail, PhoneCall, Sparkles } from 'lucide-react';

const LeadAttractionSimulator = () => {
    const [intensity, setIntensity] = useState(30);
    const [leads, setLeads] = useState([]);
    const [agenda, setAgenda] = useState([]);
    const [statQualified, setStatQualified] = useState(0);

    // Dynamic Lead Generation based on Intensity
    useEffect(() => {
        const intervalTime = Math.max(100, 1000 - (intensity * 8));
        const interval = setInterval(() => {
            const newLead = {
                id: Math.random(),
                x: Math.random() * 80 + 10,
                isQualified: Math.random() > (0.9 - (intensity / 200)), // More intensity = better quality too
                startTime: Date.now()
            };
            setLeads(prev => [...prev.slice(-20), newLead]);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [intensity]);

    const handleQualified = useCallback((lead) => {
        setStatQualified(prev => prev + 1);
        const names = ['Cliente Potencial', 'Lead Cualificado', 'Reunión Agendada', 'Interés Alto'];
        const newEntry = {
            id: lead.id,
            name: names[Math.floor(Math.random() * names.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setAgenda(prev => [newEntry, ...prev.slice(0, 3)]);
    }, []);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-center p-6">
            {/* Organic Flow Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.1),transparent_70%)]" />
            </div>

            {/* Top Control Bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Intensidad de Captación</span>
                    <div className="flex items-center gap-3 mt-1">
                        <input
                            type="range"
                            min="0" max="100"
                            value={intensity}
                            onChange={(e) => setIntensity(parseInt(e.target.value))}
                            className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-[10px] font-mono font-bold text-primary">{intensity}%</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Conversión</span>
                    <span className="text-sm font-black text-white font-mono">{statQualified}</span>
                </div>
            </div>

            {/* Particle Stream */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <AnimatePresence>
                    {leads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            initial={{ y: 60, x: `${lead.x}%`, opacity: 0, scale: 0.5 }}
                            animate={{
                                y: [60, 180, 240, 280],
                                x: lead.isQualified ? [null, lead.x + (Math.random() * 5 - 2.5), 50, 50] : null,
                                opacity: [0, 1, 1, 0, 0],
                                scale: lead.isQualified ? [0.5, 1, 1.2, 0.8] : [0.5, 0.8, 0.4],
                            }}
                            transition={{ duration: 2.5, ease: "linear" }}
                            onAnimationComplete={() => {
                                if (lead.isQualified) handleQualified(lead);
                                setLeads(prev => prev.filter(l => l.id !== lead.id));
                            }}
                            className="absolute"
                        >
                            {lead.isQualified ? (
                                <div className="relative">
                                    <Sparkles className="w-4 h-4 text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                    <motion.div
                                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute inset-0 bg-primary/20 rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="w-1.5 h-1.5 bg-white/10 rounded-full blur-[1px]" />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* AI Filter / Magnet */}
            <div className="relative z-20 my-4">
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        borderColor: intensity > 70 ? 'rgba(34,197,94,0.6)' : 'rgba(34,197,94,0.2)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-2xl bg-black/60 border-2 flex items-center justify-center backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,0.1)]"
                >
                    <Filter className={`w-8 h-8 transition-colors duration-500 ${intensity > 0 ? 'text-primary' : 'text-white/10'}`} />

                    {/* Pulsing Energy Rings */}
                    <AnimatePresence>
                        {intensity > 50 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 italic">Filtro Inteligente</span>
                </div>
            </div>

            {/* Agenda Dashboard */}
            <div className="w-full mt-10 relative z-20">
                <div className="bg-black/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md overflow-hidden min-h-[140px]">
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-primary" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Agenda de Captación</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[8px] font-bold text-primary uppercase tracking-tighter">Live</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <AnimatePresence initial={false}>
                            {agenda.length === 0 ? (
                                <div className="h-20 flex items-center justify-center border border-dashed border-white/5 rounded-xl">
                                    <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest text-center">Esperando tráfico cualificado...</span>
                                </div>
                            ) : (
                                agenda.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="h-10 bg-white/5 border border-white/10 rounded-xl flex items-center px-4 justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <UserCheck className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-white">{item.name}</span>
                                                <span className="text-[7px] font-bold text-white/30 uppercase">{item.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full border border-white/5 flex items-center justify-center">
                                                <Mail className="w-3 h-3 text-white/20" />
                                            </div>
                                            <div className="w-6 h-6 rounded-full border border-white/5 flex items-center justify-center">
                                                <PhoneCall className="w-3 h-3 text-white/20" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>
    );
};

export default LeadAttractionSimulator;

