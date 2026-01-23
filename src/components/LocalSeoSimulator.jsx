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

const LocalSeoSimulator = () => {
    const [step, setStep] = useState(0); // 0 to 3

    // Simulation sequence
    useEffect(() => {
        let timeout;
        const runSequence = () => {
            setStep((prev) => {
                const isAtTop = prev === 3;
                const next = isAtTop ? 0 : prev + 1;
                const delay = next === 3 ? 5000 : next === 0 ? 3000 : 2000;
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

    const currentBusinesses = [...businesses].sort((a, b) => {
        return a.positions[step] - b.positions[step];
    });

    // Calculate animated metrics
    const client = businesses.find(b => b.isClient);
    const callsVal = Math.round((client.maxCalls / 3) * step);
    const routesVal = Math.round((client.maxRoutes / 3) * step);

    return (
        <div className="relative w-full max-w-[380px] mx-auto">
            {/* Main Container */}
            <div className="relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2.5rem] p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden group">
                {/* Header */}
                <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-primary font-mono text-[9px] font-bold tracking-[0.3em] uppercase">
                            Google Maps
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className={`w-1.5 h-1.5 rounded-full ${step === 3 ? 'bg-primary' : 'bg-white/40'} animate-pulse`} />
                            <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                {step === 0 ? 'Situación Inicial' : step === 3 ? 'Dominio Local' : 'Optimizando...'}
                            </span>
                        </div>
                    </div>
                    <div className="text-lg font-display font-black text-white italic uppercase tracking-tighter">
                        Resultados de Búsqueda
                    </div>
                </div>

                {/* Search Results - Fixed Height Container */}
                <div className="relative z-10 space-y-3 min-h-[280px]">
                    {currentBusinesses.map((business) => {
                        const position = business.positions[step];

                        return (
                            <motion.div
                                key={business.name}
                                layout
                                layoutId={business.name}
                                initial={false}
                                animate={{
                                    opacity: business.isClient ? 1 : 0.4,
                                }}
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                        mass: 1
                                    },
                                    opacity: { duration: 0.3 }
                                }}
                                className={`relative p-4 rounded-2xl border transition-all duration-500 h-[62px] ${business.isClient
                                    ? 'bg-primary/5 border-primary/30'
                                    : 'bg-white/[0.02] border-white/5'
                                    }`}
                            >
                                {/* Position Badge */}
                                <motion.div
                                    layout="position"
                                    className={`absolute -top-2 -left-2 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-colors duration-500 ${business.isClient && step > 0
                                        ? 'bg-primary text-black'
                                        : 'bg-white/10 text-white/40'
                                        }`}
                                >
                                    {position}º
                                </motion.div>

                                {/* Business Info */}
                                <div className="flex items-start justify-between gap-3 h-full">
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPin className={`w-3.5 h-3.5 shrink-0 transition-colors duration-500 ${business.isClient ? 'text-primary' : 'text-white/20'
                                                }`} />
                                            <h4 className={`text-sm font-bold uppercase italic tracking-tight truncate transition-colors duration-500 ${business.isClient ? 'text-white' : 'text-white/40'
                                                }`}>
                                                {business.name}
                                            </h4>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-2.5 h-2.5 ${i < Math.floor(business.rating)
                                                            ? 'fill-yellow-500 text-yellow-500'
                                                            : 'text-white/10'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-white/20 font-medium">
                                                {business.rating} ({business.reviews})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions always visible for client */}
                                    {business.isClient && (
                                        <div className="flex gap-1.5 opacity-60 items-center">
                                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <Phone className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <Navigation className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Metrics Footer (Always Visible) */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Crecimiento Mensual</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group/metric">
                            <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${step > 0 ? 'bg-primary' : 'bg-white/20'}`} />
                                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Llamadas</span>
                                </div>
                                <div className="text-3xl font-display font-black text-white italic tracking-tighter transition-all duration-500">
                                    <span className={step > 0 ? 'text-primary' : 'text-white/20'}>
                                        +<AnimatedNumber value={callsVal} />%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group/metric">
                            <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${step > 0 ? 'bg-primary' : 'bg-white/20'}`} />
                                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Rutas</span>
                                </div>
                                <div className="text-3xl font-display font-black text-white italic tracking-tighter transition-all duration-500">
                                    <span className={step > 0 ? 'text-primary' : 'text-white/20'}>
                                        +<AnimatedNumber value={routesVal} />%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full opacity-20 pointer-events-none" />
        </div>
    );
};

export default LocalSeoSimulator;
