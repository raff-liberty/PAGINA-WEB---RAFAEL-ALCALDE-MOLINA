import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, UserCheck, Zap, Mail, PhoneCall, Sparkles, MousePointer2 } from 'lucide-react';

const LeadAttractionSimulator = () => {
    const [intensity, setIntensity] = useState(30);
    const [leads, setLeads] = useState([]);
    const [agenda, setAgenda] = useState([]);
    const [statQualified, setStatQualified] = useState(0);

    // Dynamic Lead Generation based on Intensity
    useEffect(() => {
        // Optimized interval and count
        const intervalTime = Math.max(150, 1200 - (intensity * 10));
        const interval = setInterval(() => {
            if (leads.length > 15) return; // Cap for performance

            const newLead = {
                id: Math.random(),
                x: Math.random() * 80 + 10,
                isQualified: Math.random() > (0.95 - (intensity / 300)),
                startTime: Date.now()
            };
            setLeads(prev => [...prev.slice(-12), newLead]);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [intensity, leads.length]);

    const handleQualified = useCallback((lead) => {
        setStatQualified(prev => prev + 1);
        const names = ['Cliente Potencial', 'Lead Cualificado', 'Reunión Agendada', 'Interés Alto'];
        const newEntry = {
            id: lead.id,
            name: names[Math.floor(Math.random() * names.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setAgenda(prev => [newEntry, ...prev.slice(0, 2)]); // Keep small for vertical space
    }, []);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-start p-6 pt-20">
            {/* Background Flair */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/20 to-transparent" />
            </div>

            {/* Top Control Bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Flujo de Entrada</span>
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
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Captados</span>
                    <span className="text-xl font-black text-white font-mono leading-none">{statQualified}</span>
                </div>
            </div>

            {/* Particle Stream (Traffic) */}
            <div className="absolute inset-x-0 top-0 h-[45%] z-10 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {leads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            initial={{ y: -20, x: `${lead.x}%`, opacity: 0, scale: 0.5 }}
                            animate={{
                                y: [0, 140],
                                x: lead.isQualified ? [null, 50] : null,
                                opacity: [0, 1, 1, 0],
                                scale: lead.isQualified ? [0.5, 1, 0.5] : [0.3, 0.6, 0.2],
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
                                    <Sparkles className="w-5 h-5 text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                                    <motion.div
                                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute inset-0 bg-primary/30 rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="w-1.5 h-1.5 bg-white/20 rounded-full blur-[1px]" />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lead Magnet / Filter */}
            <div className="relative z-20 my-2 mt-12 flex flex-col items-center">
                <motion.div
                    animate={{
                        scale: intensity > 60 ? [1, 1.1, 1] : 1,
                        rotate: intensity > 80 ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 rounded-2xl bg-black/80 border-2 border-primary/20 flex items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(34,197,94,0.1)] relative"
                >
                    <Filter className={`w-8 h-8 transition-colors duration-500 ${intensity > 0 ? 'text-primary' : 'text-white/10'}`} />

                    {/* Pulsing Energy */}
                    <AnimatePresence>
                        {intensity > 50 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.3, scale: 1.8 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 border-2 border-primary/40 rounded-2xl pointer-events-none"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className="mt-4 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Filtro Inteligente</span>
                    <div className="flex items-center gap-2 opacity-40">
                        <MousePointer2 className="w-3 h-3 text-primary animate-pulse" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-white">Ajusta el slider para escalar</span>
                    </div>
                </div>
            </div>

            {/* Agenda Dashboard */}
            <div className="w-full mt-auto relative z-20 pb-4">
                <div className="bg-black/60 border border-white/10 rounded-2xl p-4 backdrop-blur-3xl overflow-hidden min-h-[140px] shadow-2xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-primary" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Agenda Lead-Gen</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[8px] font-bold text-primary uppercase tracking-tighter">Live Monitor</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <AnimatePresence initial={false}>
                            {agenda.length === 0 ? (
                                <div className="h-16 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest text-center">Inyectando tráfico...</span>
                                </div>
                            ) : (
                                agenda.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -30, height: 0 }}
                                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                                        exit={{ opacity: 0, scale: 0.9, height: 0 }}
                                        className="bg-white/5 border border-white/10 rounded-xl flex items-center px-4 py-3 justify-between shadow-inner mb-2"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
                                                <UserCheck className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-white">{item.name}</span>
                                                <span className="text-[7px] font-bold text-primary/60 uppercase tracking-tighter">Cualificado {item.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
                                                <PhoneCall className="w-3 h-3 text-white/40" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        </div>
    );
};

export default LeadAttractionSimulator;
