import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { MapPin, Star, Phone, Navigation, TrendingUp } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const display = useTransform(spring, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        spring.set(value);
        const unsubscribe = display.onChange(setDisplayValue);
        return unsubscribe;
    }, [value, spring, display]);

    return <>{displayValue}</>;
};

const businessesData = [
    {
        name: "Tu Negocio",
        rating: 4.9,
        reviews: 127,
        isClient: true,
        positions: [4, 3, 2, 1],
        maxCalls: 340,
        maxRoutes: 280
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

const LocalSeoSimulator = () => {
    const [step, setStep] = useState(0); // 0 to 3

    // Simulation sequence - MUCH FASTER DELAYS
    useEffect(() => {
        const delays = [1500, 1200, 1200, 4000]; // Significantly reduced from [3500, 3000, 3000, 6000]
        const timer = setTimeout(() => {
            setStep((prev) => (prev === 3 ? 0 : prev + 1));
        }, delays[step]);
        return () => clearTimeout(timer);
    }, [step]);

    // Sort businesses based on current rank for DOM reordering
    const currentBusinesses = [...businessesData].sort((a, b) => {
        return a.positions[step] - b.positions[step];
    });

    // Calculate animated metrics
    const client = businessesData.find(b => b.isClient);
    const callsVal = Math.round((client.maxCalls / 3) * step);
    const routesVal = Math.round((client.maxRoutes / 3) * step);

    return (
        <div className="relative w-full max-w-[420px] mx-auto">
            {/* Main Container - High Contrast Redesign */}
            <div className="relative bg-[#1A1A1A] border border-white/20 rounded-[2.5rem] p-6 md:p-8 shadow-[0_60px_120px_-20px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.1)_inset] overflow-hidden group text-left">

                {/* Dynamic Aura - Improved Visibility */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-100" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Header - More Premium */}
                <div className="relative z-10 mb-6 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <h3 className="text-primary font-mono text-[9px] font-black tracking-[0.3em] uppercase">
                                Google Maps
                            </h3>
                        </div>
                        <div className="text-xl font-display font-black text-white italic uppercase tracking-tighter leading-none">
                            Ranking <span className="text-primary">Regional</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest whitespace-nowrap">
                            {step === 0 ? 'Analizando...' : step === 3 ? 'Dominio Total' : 'Optimización Activa'}
                        </span>
                    </div>
                </div>

                {/* Search Results - Glass Cards */}
                <div className="relative z-10 flex flex-col gap-3 mb-8">
                    {currentBusinesses.map((business, idx) => {
                        const rank = business.positions[step];
                        const isActive = business.isClient;

                        return (
                            <motion.div
                                key={business.name}
                                layout
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0.4,
                                    scale: isActive ? 1 : 0.96,
                                    backgroundColor: isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                    borderColor: isActive ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                                }}
                                transition={{
                                    layout: { type: "spring", stiffness: 200, damping: 25 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 }
                                }}
                                className={`relative p-3.5 pr-4 rounded-2xl border flex items-center h-[76px] transition-colors overflow-hidden group/card shadow-xl`}
                            >
                                {/* Active Indicator Glow */}
                                {isActive && (
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/40 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                )}

                                {/* Business Info Component - Compacted */}
                                <div className="relative z-10 flex items-center gap-4 flex-1">
                                    {!isActive && (
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black bg-white/10 text-white/30 border border-white/5">
                                            {rank}º
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className={`text-[13px] font-black uppercase italic tracking-tight truncate transition-colors ${isActive ? 'text-white' : 'text-white/40'
                                                }`}>
                                                {business.name}
                                            </h4>
                                            {isActive && (
                                                <span className="text-[6px] px-1 py-0.5 bg-primary/30 text-primary border border-primary/40 rounded-md font-black uppercase leading-none">Activo</span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mb-0.5">
                                            <div className="flex text-yellow-500 gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-white/10'}`} />
                                                ))}
                                            </div>
                                            <span className="text-[9px] text-white/50 font-mono font-bold leading-none">{business.rating}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-[8px] text-white/30 font-bold uppercase italic tracking-wider leading-none">
                                            <span>Agencia</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span>Murcia</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Rank Widget on the Right (High Contrast & Compact) */}
                                {isActive && (
                                    <div className="relative z-10 -mr-2 h-full flex items-center gap-2.5">
                                        <div className="bg-primary/10 p-2 rounded-lg border border-primary/30 text-primary hidden md:block group-hover/card:bg-primary group-hover/card:text-black transition-all">
                                            <Phone className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="bg-primary text-black px-2 py-0.5 text-[8px] font-black uppercase italic rounded-t-lg relative z-20 shadow-xl border-b border-black/20">
                                                TÚ
                                            </div>
                                            <div className="bg-primary text-black w-12 h-12 rounded-xl rounded-tr-none flex items-center justify-center font-black text-xl md:text-2xl italic shadow-[0_10px_25px_rgba(34,197,94,0.6)] relative z-10 border border-white/30">
                                                {rank}º
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Impact Section */}
                <div className="relative z-10 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Crecimiento Directo</span>
                        </div>
                        <div className="text-[10px] text-primary font-mono font-bold animate-pulse">Sincronizando...</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Llamadas', val: callsVal, icon: Phone },
                            { label: 'Rutas', val: routesVal, icon: Navigation }
                        ].map((m, i) => (
                            <div key={i} className="group/metric p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-primary/5 opacity-0 group-hover/metric:opacity-100 transition-opacity`} />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <m.icon className={`w-3 h-3 transition-colors ${step > 0 ? 'text-primary' : 'text-white/20'}`} />
                                        <span className="text-[8px] text-white/60 font-black uppercase tracking-widest">{m.label}</span>
                                    </div>
                                    <div className="text-3xl font-display font-black text-white italic tracking-tighter transition-all">
                                        <span className={step > 0 ? 'text-primary' : 'text-white/10'}>
                                            +<AnimatedNumber value={m.val} />%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none rounded-full blur-3xl opacity-20" />
        </div>
    );
};

export default LocalSeoSimulator;
