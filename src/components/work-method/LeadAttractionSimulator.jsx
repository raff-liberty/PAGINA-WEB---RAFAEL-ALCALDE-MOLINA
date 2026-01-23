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
        const intervalTime = Math.max(150, 1200 - (intensity * 10));
        const interval = setInterval(() => {
            if (leads.length > 15) return;

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
        setAgenda(prev => [newEntry, ...prev.slice(0, 2)]);
    }, []);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-start p-8 pt-24">
            {/* Background Flair - More pronounced gradient */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 inset-x-0 h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent)]" />
            </div>

            {/* Top Control Bar */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-30">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Flujo de Entrada</span>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="range"
                            min="0" max="100"
                            value={intensity}
                            onChange={(e) => setIntensity(parseInt(e.target.value))}
                            className="w-32 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-sm font-mono font-black text-primary">{intensity}%</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Captados</span>
                    <motion.span
                        key={statQualified}
                        initial={{ scale: 1.5, color: '#22c55e' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-2xl font-black text-white font-mono leading-none mt-1"
                    >
                        {statQualified}
                    </motion.span>
                </div>
            </div>

            {/* Particle Stream (Traffic) */}
            <div className="absolute inset-x-0 top-0 h-[50%] z-10 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {leads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            initial={{ y: -20, x: `${lead.x}%`, opacity: 0, scale: 0.5 }}
                            animate={{
                                y: [0, 180],
                                x: lead.isQualified ? [null, 50] : null,
                                opacity: [0, 1, 1, 0],
                                scale: lead.isQualified ? [0.8, 1.4, 0.8] : [0.4, 0.7, 0.3],
                            }}
                            transition={{ duration: 2.2, ease: "linear" }}
                            onAnimationComplete={() => {
                                if (lead.isQualified) handleQualified(lead);
                                setLeads(prev => prev.filter(l => l.id !== lead.id));
                            }}
                            className="absolute"
                        >
                            {lead.isQualified ? (
                                <div className="relative">
                                    <Sparkles className="w-7 h-7 text-primary drop-shadow-[0_0_20px_rgba(34,197,94,1)]" />
                                    <motion.div
                                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="absolute inset-0 bg-primary/40 rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="w-2 h-2 bg-white/30 rounded-full blur-[1px]" />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lead Magnet / Filter - Increased Size and Glow */}
            <div className="relative z-20 my-4 mt-16 flex flex-col items-center">
                <motion.div
                    animate={{
                        scale: intensity > 60 ? [1, 1.15, 1] : 1,
                        rotate: intensity > 80 ? [0, 8, -8, 0] : 0,
                        boxShadow: intensity > 50 ? `0 0 ${intensity}px rgba(34,197,94,0.3)` : '0 0 0px transparent'
                    }}
                    transition={{ duration: 1 }}
                    className="w-24 h-24 rounded-3xl bg-black/90 border-2 border-primary/20 flex items-center justify-center backdrop-blur-2xl shadow-2xl relative"
                >
                    <Filter className={`w-12 h-12 transition-all duration-500 ${intensity > 0 ? 'text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'text-white/10'}`} />

                    {/* Pulsing Energy */}
                    <AnimatePresence>
                        {intensity > 30 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.4, scale: 2 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 border-2 border-primary/40 rounded-3xl pointer-events-none"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-6 flex flex-col items-center gap-2">
                    <span className="text-[14px] font-black uppercase tracking-[0.5em] text-white italic drop-shadow-sm">Filtro Inteligente</span>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <MousePointer2 className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Ajusta el slider para escalar</span>
                    </div>
                </div>
            </div>

            {/* Agenda Dashboard */}
            <div className="w-full mt-auto relative z-20 pb-6 px-4">
                <div className="bg-black/80 border border-white/10 rounded-3xl p-6 backdrop-blur-3xl overflow-hidden min-h-[160px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-t-white/20">
                    <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <Zap className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">Agenda Lead-Gen</span>
                        </div>
                        <div className="flex gap-2 items-center bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Live Monitor</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence initial={false}>
                            {agenda.length === 0 ? (
                                <motion.div
                                    className="h-20 flex items-center justify-center border border-dashed border-white/10 rounded-2xl"
                                >
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] text-center">Inyectando tráfico de alta calidad...</span>
                                </motion.div>
                            ) : (
                                agenda.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -50, height: 0 }}
                                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                                        exit={{ opacity: 0, scale: 0.9, height: 0 }}
                                        className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 py-4 justify-between shadow-xl mb-2 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                                                <UserCheck className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-black text-white">{item.name}</span>
                                                <span className="text-[8px] font-bold text-primary/80 uppercase tracking-widest mt-0.5">Cualificado {item.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-black/60 cursor-pointer shadow-lg hover:border-primary/50"
                                            >
                                                <PhoneCall className="w-4 h-4 text-white/60" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        </div>
    );
};

export default LeadAttractionSimulator;
