import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

const LeakDetectionSimulator = () => {
    const [leaksDetected, setLeaksDetected] = useState([]);
    const [isScanning, setIsScanning] = useState(true);
    const [savings, setSavings] = useState(0);
    const [fixedCount, setFixedCount] = useState(0);
    const [showFinalStatus, setShowFinalStatus] = useState(false);

    // Initial leaks data
    const initialLeaks = [
        { id: 1, x: '25%', y: '25%', label: 'Fuga de Leads', value: 1200 },
        { id: 2, x: '75%', y: '35%', label: 'Checkout Abandonado', value: 2400 },
        { id: 3, x: '40%', y: '70%', label: 'Fricción en Registro', value: 850 },
        { id: 4, x: '80%', y: '75%', label: 'Lead Sin Respuesta', value: 1500 },
    ];

    const resetSimulation = useCallback(() => {
        setLeaksDetected(initialLeaks);
        setIsScanning(true);
        setSavings(0);
        setFixedCount(0);
        setShowFinalStatus(false);
    }, []);

    useEffect(() => {
        resetSimulation();
    }, [resetSimulation]);

    const handleFixLeak = (leakId, value) => {
        setLeaksDetected(prev => prev.filter(l => l.id !== leakId));
        setSavings(prev => prev + value);
        setFixedCount(prev => prev + 1);

        if (fixedCount + 1 === initialLeaks.length) {
            setIsScanning(false);
            setTimeout(() => setShowFinalStatus(true), 500);
            setTimeout(resetSimulation, 5000); // Restart after showing success
        }
    };

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-center p-6">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            {/* Top Stats Bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Dinero Recuperado</span>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <motion.span
                            key={savings}
                            initial={{ scale: 1.2, color: '#22c55e' }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            className="text-xl font-black font-mono tracking-tight"
                        >
                            {savings.toLocaleString()}€
                        </motion.span>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                        {fixedCount}/{initialLeaks.length} Optimizados
                    </span>
                </div>
            </div>

            {/* Radar Scan (Subtle sweep) */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,197,94,0.1)_180deg,transparent_200deg)]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Central Core */}
            <div className="relative z-20 mt-4">
                <motion.div
                    animate={{
                        borderColor: showFinalStatus ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.1)',
                        boxShadow: showFinalStatus ? '0 0 30px rgba(34,197,94,0.2)' : '0 0 0px transparent'
                    }}
                    className="w-24 h-24 rounded-[2.5rem] bg-black/60 border-2 flex items-center justify-center backdrop-blur-2xl transition-all duration-700"
                >
                    {showFinalStatus ? (
                        <ShieldAlert className="w-10 h-10 text-primary" />
                    ) : (
                        <Search className={`w-10 h-10 ${fixedCount > 0 ? 'text-primary' : 'text-white/20'}`} />
                    )}
                </motion.div>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-max">
                    <motion.span
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40"
                    >
                        {showFinalStatus ? 'SISTEMA SELLADO' : 'DETECTANDO FUGAS'}
                    </motion.span>
                </div>
            </div>

            {/* Interactive Leaks */}
            <AnimatePresence>
                {leaksDetected.map((leak) => (
                    <motion.button
                        key={leak.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: [0, -4, 0]
                        }}
                        exit={{
                            scale: 1.5,
                            opacity: 0,
                            filter: 'blur(8px)'
                        }}
                        transition={{
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        onClick={() => handleFixLeak(leak.id, leak.value)}
                        className="absolute z-40 flex flex-col items-center gap-2 group cursor-pointer"
                        style={{ left: leak.x, top: leak.y }}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.2, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-[-8px] bg-red-500/20 rounded-full blur-sm"
                            />
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-red-500/30 transition-colors">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center pointer-events-none translate-y-[-2px]">
                            <span className="text-[7px] font-black text-red-400 uppercase bg-black/80 px-2 py-0.5 rounded-full border border-red-900/30 whitespace-nowrap shadow-xl">
                                {leak.label}
                            </span>
                            <span className="text-[9px] font-black text-white/60 font-mono mt-0.5">
                                -{leak.value}€
                            </span>
                        </div>
                    </motion.button>
                ))}
            </AnimatePresence>

            {/* Final Success Banner */}
            <AnimatePresence>
                {showFinalStatus && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-primary/10 border border-primary/40 backdrop-blur-xl px-8 py-4 rounded-[2rem] flex flex-col items-center gap-2 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Optimización Completada</span>
                            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Todos los puntos sellados</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Visual Flair */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default LeakDetectionSimulator;

