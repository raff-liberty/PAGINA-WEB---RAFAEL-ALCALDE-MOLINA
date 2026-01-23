import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, TrendingUp, MousePointer2 } from 'lucide-react';

const LeakDetectionSimulator = () => {
    const [leaksDetected, setLeaksDetected] = useState([]);
    const [isScanning, setIsScanning] = useState(true);
    const [savings, setSavings] = useState(0);
    const [fixedCount, setFixedCount] = useState(0);
    const [showFinalStatus, setShowFinalStatus] = useState(false);

    // Mobile-safe coordinates (30%-70% range for better containment)
    const initialLeaks = [
        { id: 1, x: '32%', y: '30%', label: 'Fuga de Leads', value: 1200 },
        { id: 2, x: '68%', y: '35%', label: 'Checkout Abandonado', value: 2400 },
        { id: 3, x: '32%', y: '65%', label: 'Fricción en Registro', value: 850 },
        { id: 4, x: '68%', y: '68%', label: 'Lead Sin Respuesta', value: 1500 },
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
            setTimeout(resetSimulation, 8000);
        }
    };

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-center p-4 md:p-6 text-center">
            {/* Background Grid - Simplified */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, #22c55e 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            {/* Top Stats Bar */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex justify-between items-start z-30">
                <div className="flex flex-col gap-1 items-start text-left">
                    <span className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Dinero Recuperado</span>
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <motion.span
                            key={savings}
                            initial={{ scale: 1.2, color: '#22c55e' }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            className="text-lg md:text-2xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                        >
                            {savings.toLocaleString()}€
                        </motion.span>
                    </div>
                </div>
                <div className="bg-primary/20 border border-primary/30 px-2 md:px-3 py-0.5 md:py-1 rounded-full backdrop-blur-md">
                    <span className="text-[7px] md:text-[9px] font-black text-primary uppercase tracking-widest">
                        {fixedCount}/{initialLeaks.length} DETECTADOS
                    </span>
                </div>
            </div>

            {/* Circular Radar Scan */}
            <AnimatePresence mode="wait">
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,197,94,0.2)_180deg,transparent_200deg)] z-0 origin-center"
                            style={{ borderRadius: '50%' }}
                        />
                        {[1, 2, 3].map(i => (
                            <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div
                                    className="border border-primary/10 rounded-full"
                                    style={{ width: `${i * 33}%`, height: `${i * 33}%` }}
                                />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Central Core - Responsive sizing */}
            <div className="relative z-20">
                <motion.div
                    animate={{
                        borderColor: showFinalStatus ? 'rgba(34,197,94,0.8)' : 'rgba(255,255,255,0.1)',
                        boxShadow: showFinalStatus ? '0 0 50px rgba(34,197,94,0.5)' : '0 0 20px rgba(34,197,94,0.1)',
                        scale: showFinalStatus ? [1, 1.05, 1] : 1
                    }}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-black/80 border-2 flex items-center justify-center backdrop-blur-2xl transition-all duration-700"
                >
                    {showFinalStatus ? (
                        <ShieldAlert className="w-8 h-8 md:w-12 md:h-12 text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    ) : (
                        <Search className={`w-8 h-8 md:w-12 md:h-12 transition-colors duration-500 ${fixedCount > 0 ? 'text-primary' : 'text-white/20'} drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]`} />
                    )}
                </motion.div>

                <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 text-center w-max">
                    <motion.span
                        animate={{ opacity: [0.6, 1, 0.6], letterSpacing: ['0.4em', '0.5em', '0.4em'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-[9px] md:text-[11px] font-black uppercase text-white/60"
                    >
                        {showFinalStatus ? 'SISTEMA SELLADO' : 'ANALIZANDO FLUJO'}
                    </motion.span>
                </div>
            </div>

            {/* Interactive Note */}
            <AnimatePresence>
                {!showFinalStatus && leaksDetected.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-6 md:bottom-10 flex items-center gap-1.5 md:gap-2 bg-white/5 border border-white/10 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full backdrop-blur-xl z-50 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    >
                        <MousePointer2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary animate-bounce" />
                        <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-white/80">Haz clic en las alertas para optimizar</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Leaks - Responsive sizing */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                    {leaksDetected.map((leak) => (
                        <motion.button
                            key={leak.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: [0, -8, 0]
                            }}
                            exit={{
                                scale: 2,
                                opacity: 0,
                                filter: 'blur(15px)'
                            }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            onClick={() => handleFixLeak(leak.id, leak.value)}
                            className="absolute z-40 flex flex-col items-center gap-1.5 md:gap-2 group cursor-pointer pointer-events-auto"
                            style={{ left: leak.x, top: leak.y, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.3, 0.6] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    className="absolute inset-[-10px] md:inset-[-15px] bg-red-500/40 rounded-full blur-xl"
                                />
                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-black/60 border border-red-500/60 flex items-center justify-center backdrop-blur-md group-hover:bg-red-500/40 transition-all group-hover:scale-110 shadow-2xl">
                                    <AlertTriangle className="w-5 h-5 md:w-7 md:h-7 text-red-500" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center pointer-events-none translate-y-[-2px]">
                                <span className="text-[7px] md:text-[8px] font-black text-red-400 uppercase bg-black/60 backdrop-blur-md px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full border border-red-900/50 whitespace-nowrap shadow-2xl tracking-tighter">
                                    {leak.label}
                                </span>
                                <span className="text-[9px] md:text-[11px] font-black text-white font-mono mt-0.5 md:mt-1 tracking-tighter drop-shadow-lg">
                                    -{leak.value}€
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            {/* Final Success Banner */}
            <AnimatePresence>
                {showFinalStatus && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="bg-primary/10 border border-primary/40 backdrop-blur-3xl px-8 md:px-12 py-6 md:py-8 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center gap-3 md:gap-4 shadow-[0_0_100px_rgba(34,197,94,0.4)] border-2">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-primary" />
                            </div>
                            <div className="text-center">
                                <div className="text-lg md:text-xl font-black text-white uppercase tracking-[0.2em] mb-1">Éxito Total</div>
                                <div className="text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Fugas 100% Selladas</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LeakDetectionSimulator;
