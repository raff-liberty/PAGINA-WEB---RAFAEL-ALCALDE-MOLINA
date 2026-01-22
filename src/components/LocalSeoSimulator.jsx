import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Phone, Navigation, TrendingUp } from 'lucide-react';

const LocalSeoSimulator = () => {
    const [phase, setPhase] = useState(0); // 0 = before, 1 = after

    // Auto-cycle between before/after
    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev === 0 ? 1 : 0));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const businesses = [
        {
            name: "Tu Negocio",
            rating: 4.9,
            reviews: 127,
            isClient: true,
            beforePosition: 4,
            afterPosition: 1,
            calls: "+340%",
            routes: "+280%"
        },
        {
            name: "Competidor A",
            rating: 4.2,
            reviews: 45,
            isClient: false,
            beforePosition: 1,
            afterPosition: 2
        },
        {
            name: "Competidor B",
            rating: 3.8,
            reviews: 23,
            isClient: false,
            beforePosition: 2,
            afterPosition: 3
        },
        {
            name: "Competidor C",
            rating: 4.0,
            reviews: 67,
            isClient: false,
            beforePosition: 3,
            afterPosition: 4
        }
    ];

    const currentBusinesses = [...businesses].sort((a, b) => {
        const posA = phase === 0 ? a.beforePosition : a.afterPosition;
        const posB = phase === 0 ? b.beforePosition : b.afterPosition;
        return posA - posB;
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
                            <div className={`w-1.5 h-1.5 rounded-full ${phase === 1 ? 'bg-primary' : 'bg-white/40'} animate-pulse`} />
                            <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                {phase === 0 ? 'Antes' : 'Después'}
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
                        {currentBusinesses.map((business, index) => {
                            const position = phase === 0 ? business.beforePosition : business.afterPosition;

                            return (
                                <motion.div
                                    key={business.name}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: business.isClient && phase === 1 ? 1 : business.isClient ? 0.5 : 0.3,
                                        y: 0,
                                        scale: business.isClient && phase === 1 ? 1.02 : 1
                                    }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        layout: { duration: 0.6, ease: "easeInOut" },
                                        opacity: { duration: 0.4 }
                                    }}
                                    className={`relative p-4 rounded-2xl border transition-all duration-500 ${business.isClient && phase === 1
                                            ? 'bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                            : 'bg-white/[0.02] border-white/5'
                                        }`}
                                >
                                    {/* Position Badge */}
                                    <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${business.isClient && phase === 1
                                            ? 'bg-primary text-black'
                                            : 'bg-white/10 text-white/40'
                                        }`}>
                                        {position}º
                                    </div>

                                    {/* Business Info */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <MapPin className={`w-3.5 h-3.5 shrink-0 ${business.isClient && phase === 1 ? 'text-primary' : 'text-white/40'
                                                    }`} />
                                                <h4 className={`text-sm font-bold uppercase italic tracking-tight truncate ${business.isClient && phase === 1 ? 'text-white' : 'text-white/60'
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

                                        {/* Actions (only for client in "after" state) */}
                                        {business.isClient && phase === 1 && (
                                            <div className="flex gap-1.5">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center"
                                                >
                                                    <Phone className="w-3.5 h-3.5 text-primary" />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center"
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

                {/* Metrics Footer (only show in "after" state) */}
                <AnimatePresence>
                    {phase === 1 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative z-10 mt-4 pt-4 border-t border-white/5"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Phone className="w-3 h-3 text-primary" />
                                        <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">Llamadas</span>
                                    </div>
                                    <div className="text-xl font-display font-black text-primary italic">
                                        {businesses[0].calls}
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Navigation className="w-3 h-3 text-primary" />
                                        <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">Rutas</span>
                                    </div>
                                    <div className="text-xl font-display font-black text-primary italic">
                                        {businesses[0].routes}
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
