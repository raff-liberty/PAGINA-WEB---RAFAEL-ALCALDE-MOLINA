import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Phone, Navigation, TrendingUp } from 'lucide-react';

const LocalSeoSimulator = () => {
    const [step, setStep] = useState(0); // 0 to 3

    // Simulation sequence
    useEffect(() => {
        let timeout;
        const runSequence = () => {
            setStep((prev) => {
                const isAtTop = prev === 3;
                const next = isAtTop ? 0 : prev + 1;
                // If we just reached the top or are restarting, use different timing
                const delay = next === 3 ? 5000 : next === 0 ? 3000 : 1500;
                timeout = setTimeout(runSequence, delay);
                return next;
            });
        };
        timeout = setTimeout(runSequence, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const businesses = [
        {
            name: "Tu Negocio",
            rating: 4.9,
            reviews: 127,
            isClient: true,
            positions: [4, 3, 2, 1],
            calls: "+340%",
            routes: "+280%"
        },
        {
            name: "Competidor A",
            rating: 4.2,
            reviews: 45,
            isClient: false,
            positions: [1, 1, 1, 2]
        },
        {
            name: "Competidor B",
            rating: 3.8,
            reviews: 23,
            isClient: false,
            positions: [2, 2, 3, 3]
        },
        {
            name: "Competidor C",
            rating: 4.0,
            reviews: 67,
            isClient: false,
            positions: [3, 4, 4, 4]
        }
    ];

    const currentBusinesses = [...businesses].sort((a, b) => {
        return a.positions[step] - b.positions[step];
    });

    return (
        <div className="relative w-full max-w-[380px] mx-auto">
            {/* Main Container */}
            <div className="relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2.5rem] p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden group">
                {/* Rim Light */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Ambient Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

                {/* Header */}
                <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-primary font-mono text-[9px] font-bold tracking-[0.3em] uppercase">
                            Google Maps
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className={`w-1.5 h-1.5 rounded-full ${step === 3 ? 'bg-primary' : 'bg-white/40'} animate-pulse`} />
                            <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                {step === 0 ? 'Sin Estrategia' : step === 3 ? 'Dominio Local' : 'En ascenso...'}
                            </span>
                        </div>
                    </div>
                    <div className="text-lg font-display font-black text-white italic uppercase tracking-tighter">
                        Resultados de Búsqueda
                    </div>
                </div>

                {/* Search Results */}
                <div className="relative z-10 space-y-3">
                    <AnimatePresence mode="popLayout">
                        {currentBusinesses.map((business) => {
                            const position = business.positions[step];
                            const isAtTop = step === 3;

                            return (
                                <motion.div
                                    key={business.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: business.isClient ? 1 : (isAtTop ? 0.3 : 0.5),
                                        scale: business.isClient && isAtTop ? 1.05 : 1,
                                        borderColor: business.isClient && step > 0 ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.05)'
                                    }}
                                    transition={{
                                        layout: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                                        opacity: { duration: 0.4 },
                                        scale: { duration: 0.4 }
                                    }}
                                    className={`relative p-4 rounded-2xl border transition-all duration-500 ${business.isClient
                                        ? 'bg-primary/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                                        : 'bg-white/[0.02]'
                                        }`}
                                >
                                    {/* Position Badge */}
                                    <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-colors duration-500 ${business.isClient && step > 0
                                        ? 'bg-primary text-black'
                                        : 'bg-white/10 text-white/40'
                                        }`}>
                                        {position}º
                                    </div>

                                    {/* Business Info */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <MapPin className={`w-3.5 h-3.5 shrink-0 transition-colors duration-500 ${business.isClient && step > 0 ? 'text-primary' : 'text-white/40'
                                                    }`} />
                                                <h4 className={`text-sm font-bold uppercase italic tracking-tight truncate transition-colors duration-500 ${business.isClient ? 'text-white' : 'text-white/60'
                                                    }`}>
                                                    {business.name}
                                                </h4>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-2.5 h-2.5 ${i < Math.floor(business.rating)
                                                                ? 'fill-yellow-500 text-yellow-500'
                                                                : 'text-white/20'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-white/40 font-medium">
                                                    {business.rating} ({business.reviews})
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions (only for client in successful steps) */}
                                        {business.isClient && step > 1 && (
                                            <div className="flex gap-1.5">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/10"
                                                >
                                                    <Phone className="w-3.5 h-3.5 text-primary" />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/10"
                                                >
                                                    <Navigation className="w-3.5 h-3.5 text-primary" />
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Metrics Footer (Progressive Reveal) */}
                <AnimatePresence>
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="relative z-10 mt-6 pt-5 border-t border-white/5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest">Crecimiento Mensual</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm group/metric">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">Llamadas</span>
                                    </div>
                                    <div className="text-2xl font-display font-black text-primary italic">
                                        {businesses.find(b => b.isClient).calls}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm group/metric">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">Rutas</span>
                                    </div>
                                    <div className="text-2xl font-display font-black text-primary italic">
                                        {businesses.find(b => b.isClient).routes}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Glow */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none rounded-[2.5rem]" />
        </div>
    );
};

export default LocalSeoSimulator;
