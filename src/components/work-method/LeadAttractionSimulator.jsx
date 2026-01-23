import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, UserCheck, Zap, Mail, PhoneCall } from 'lucide-react';

const LeadAttractionSimulator = () => {
    const [leads, setLeads] = useState([]);
    const [qualifiedCount, setQualifiedCount] = useState(0);

    // Particle/Lead Generation
    useEffect(() => {
        const interval = setInterval(() => {
            if (leads.length < 15) {
                const newLead = {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    isQualified: Math.random() > 0.7
                };
                setLeads(prev => [...prev, newLead]);

                // Cleanup lead after animation
                setTimeout(() => {
                    setLeads(prev => prev.filter(l => l.id !== newLead.id));
                    if (newLead.isQualified) setQualifiedCount(c => c + 1);
                }, 3000);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [leads]);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-inner flex items-center justify-center">
            {/* Background Vibe */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />

            {/* Top Funnel / Traffic Area */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Users className="w-3 h-3 text-white/40" />
                <span className="text-[7px] font-black uppercase tracking-widest text-white/40">Tráfico Masivo</span>
            </div>

            {/* Filtering Particles */}
            <AnimatePresence>
                {leads.map((lead) => (
                    <motion.div
                        key={lead.id}
                        initial={{ y: 20, x: `${lead.x}%`, opacity: 0, scale: 0.5 }}
                        animate={{
                            y: [20, 150, 300],
                            opacity: [0, 1, 1, 0],
                            scale: lead.isQualified ? [0.5, 1.2, 0.8] : [0.5, 0.8, 0.4],
                            color: lead.isQualified ? '#22c55e' : '#ffffff'
                        }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="absolute z-10"
                    >
                        {lead.isQualified ? (
                            <div className="relative">
                                <UserCheck className="w-4 h-4 text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <motion.div
                                    animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute inset-0 bg-primary/20 rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Magnet / Filter Divider */}
            <div className="absolute top-[45%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex items-center justify-center overflow-visible">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-black border border-primary/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                >
                    <Filter className="w-5 h-5 text-primary" />
                </motion.div>
                <div className="absolute -right-2 top-0 translate-y-[-50%] px-2 py-0.5 rounded-md border border-primary/20 bg-primary/10 text-primary text-[6px] font-black uppercase tracking-tighter">Filtro IA</div>
            </div>

            {/* Agenda / Conversion Area */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%]">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-primary animate-pulse" />
                            <span className="text-[8px] font-black text-white uppercase tracking-wider">Agenda de Hoy</span>
                        </div>
                        <span className="text-[10px] font-mono font-black text-primary">{qualifiedCount} LEADS</span>
                    </div>

                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="h-6 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                    <div className="w-16 h-1 bg-white/10 rounded-full" />
                                </div>
                                <div className="flex gap-2">
                                    <Mail className="w-2.5 h-2.5 text-white/20" />
                                    <PhoneCall className="w-2.5 h-2.5 text-white/20" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-3">
                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.3em] text-white/40">ATRACCIÓN CUALIFICADA</span>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />
        </div>
    );
};

export default LeadAttractionSimulator;
