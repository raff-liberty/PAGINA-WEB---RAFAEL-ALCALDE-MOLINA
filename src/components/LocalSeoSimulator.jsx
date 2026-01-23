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

    // Simulation sequence
    useEffect(() => {
        const delays = [3500, 3000, 3000, 6000]; // Delays for steps 0, 1, 2, 3
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
        <div className="relative w-full max-w-[380px] mx-auto">
            {/* Main Container */}
            <div className="relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2rem] p-4 md:p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden group">
                {/* Header - Compact */}
                <div className="relative z-10 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-primary font-mono text-[8px] font-bold tracking-[0.3em] uppercase">
                            Google Maps
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                            <div className={`w-1.5 h-1.5 rounded-full ${step === 3 ? 'bg-primary' : 'bg-white/40'} animate-pulse`} />
                            <span className="text-[7px] text-white/60 font-bold uppercase tracking-wider">
                                {step === 0 ? 'Situación Inicial' : step === 3 ? 'Dominio Local' : 'Optimizando...'}
                            </span>
                        </div>
                    </div>
                    <div className="text-base font-display font-black text-white italic uppercase tracking-tighter">
                        Resultados de Búsqueda
                    </div>
                </div>

                {/* Search Results */}
                <div className="relative z-10 flex flex-col gap-2 mb-6">
                    {currentBusinesses.map((business) => {
                        const rank = business.positions[step];

                        return (
                            <motion.div
                                key={business.name}
                                layout="position"
                                initial={false}
                                animate={{
                                    opacity: business.isClient ? 1 : 0.45,
                                    scale: business.isClient ? 1 : 0.98,
                                    zIndex: business.isClient ? 20 : 10
                                }}
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 25,
                                    }
                                }}
                                className={`relative p-3 rounded-xl border transition-colors duration-500 h-[54px] w-full shrink-0 flex items-center ${business.isClient
                                    ? 'bg-primary/10 border-primary/40'
                                    : 'bg-white/[0.02] border-white/5'
                                    }`}
                            >
                                {/* Position Badge */}
                                <div
                                    className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-black transition-colors duration-500 shadow-xl z-30 ${business.isClient && step > 0
                                        ? 'bg-primary text-black'
                                        : 'bg-white/10 text-white/40'
                                        }`}
                                >
                                    {rank}º
                                </div>

                                {/* Business Info */}
                                <div className="flex items-start justify-between gap-3 h-full w-full">
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <MapPin className={`w-3 h-3 shrink-0 transition-colors duration-500 ${business.isClient ? 'text-primary' : 'text-white/20'
                                                }`} />
                                            <h4 className={`text-xs font-bold uppercase italic tracking-tight truncate transition-colors duration-500 ${business.isClient ? 'text-white' : 'text-white/40'
                                                }`}>
                                                {business.name}
                                            </h4>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-2 h-2 ${i < Math.floor(business.rating)
                                                            ? 'fill-yellow-500 text-yellow-500'
                                                            : 'text-white/10'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[8px] text-white/20 font-medium font-mono">
                                                {business.rating} ({business.reviews})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {business.isClient && (
                                        <div className="flex gap-1 opacity-60 items-center">
                                            <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <Phone className="w-2.5 h-2.5 text-primary" />
                                            </div>
                                            <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <Navigation className="w-2.5 h-2.5 text-primary" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Metrics Footer */}
                <div className="relative z-10 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Crecimiento Mensual</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
                            <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-1.5 mb-1 text-[7px] text-white/40 font-bold uppercase tracking-wider">
                                    <div className={`w-1 h-1 rounded-full ${step > 0 ? 'bg-primary' : 'bg-white/20'}`} />
                                    Llamadas
                                </div>
                                <div className="text-xl font-display font-black text-white italic tracking-tighter">
                                    <span className={step > 0 ? 'text-primary' : 'text-white/20'}>
                                        +<AnimatedNumber value={callsVal} />%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
                            <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-1.5 mb-1 text-[7px] text-white/40 font-bold uppercase tracking-wider">
                                    <div className={`w-1 h-1 rounded-full ${step > 0 ? 'bg-primary' : 'bg-white/20'}`} />
                                    Rutas
                                </div>
                                <div className="text-xl font-display font-black text-white italic tracking-tighter">
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
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none rounded-full blur-3xl opacity-20" />
        </div>
    );
};

export default LocalSeoSimulator;
