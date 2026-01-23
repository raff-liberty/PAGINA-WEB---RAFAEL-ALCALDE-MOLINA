import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, BarChart, TrendingUp, ShieldCheck, Settings, Play, Clock, Euro, MousePointer2 } from 'lucide-react';

const ControlFreedomSimulator = () => {
    const [automation, setAutomation] = useState(20);
    const [isAuto, setIsAuto] = useState(false);
    const [growth, setGrowth] = useState(0);

    useEffect(() => {
        if (isAuto) {
            const timer = setInterval(() => {
                setGrowth(prev => Math.min(prev + (automation / 10), 500));
            }, 50);
            return () => clearInterval(timer);
        } else {
            setGrowth(0);
        }
    }, [isAuto, automation]);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col p-8 justify-between">
            {/* Premium Header */}
            <div className="flex items-center justify-between relative z-20">
                <div className="flex flex-col">
                    <span className="text-[11px] font-black text-white italic tracking-tighter uppercase mb-0.5">Protocolo de Crecimiento</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isAuto ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
                        <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.3em]">Status: {isAuto ? 'SISTEMA OPTIMIZADO' : 'MODO MANUAL'}</span>
                    </div>
                </div>
                <motion.div
                    animate={{
                        borderColor: isAuto ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.05)',
                        backgroundColor: isAuto ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.5)',
                        rotate: isAuto ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center backdrop-blur-xl transition-all duration-700 shadow-2xl"
                >
                    <ShieldCheck className={`w-6 h-6 transition-colors duration-500 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                </motion.div>
            </div>

            {/* Main Interactive Hub */}
            <div className="flex flex-col items-center gap-8 relative z-20">
                <div className="flex flex-col items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAuto(!isAuto)}
                        className="relative group cursor-pointer"
                    >
                        <motion.div
                            animate={{
                                scale: isAuto ? [1, 1.1, 1] : 1,
                                boxShadow: isAuto ? '0 0 60px rgba(34,197,94,0.4)' : '0 0 0px transparent',
                                borderColor: isAuto ? '#22c55e' : 'rgba(255,255,255,0.1)'
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`w-28 h-28 rounded-full bg-black border-4 flex items-center justify-center transition-all duration-700 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden`}
                        >
                            {/* Energy Swirl inside button when active */}
                            {isAuto && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.4),transparent)] opacity-40"
                                />
                            )}
                            <Power className={`w-12 h-12 transition-colors duration-700 relative z-10 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                        </motion.div>

                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center">
                            <span className={`text-[12px] font-black uppercase tracking-[0.4em] transition-colors duration-500 mb-1 ${isAuto ? 'text-primary' : 'text-white/20'}`}>
                                {isAuto ? 'PILOTO AUTO ON' : 'TOMA EL CONTROL'}
                            </span>
                            <div className="flex items-center gap-2 opacity-40">
                                <MousePointer2 className="w-3 h-3 text-primary animate-bounce" />
                                <span className="text-[7px] font-bold text-white uppercase tracking-widest">{isAuto ? 'Haz clic para desactivar' : 'Haz clic para activar'}</span>
                            </div>
                        </div>
                    </motion.button>
                </div>

                {/* Automation Panel */}
                <div className={`w-full max-w-[260px] bg-black/60 border border-white/10 rounded-2xl p-5 transition-all duration-700 backdrop-blur-3xl shadow-2xl mt-4 ${isAuto ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4 pointer-events-none'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest leading-none">Nivel de Optimización</span>
                            <span className="text-[7px] font-bold text-primary/60 uppercase mt-0.5 tracking-tighter">Ajuste en tiempo real</span>
                        </div>
                        <span className="text-sm font-black font-mono text-primary leading-none">{automation}%</span>
                    </div>
                    <input
                        type="range"
                        min="10" max="100"
                        value={automation}
                        onChange={(e) => setAutomation(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary mb-2"
                    />
                </div>
            </div>

            {/* Growth Chart Area */}
            <div className="relative z-20">
                <div className="w-full h-28 bg-black/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden backdrop-blur-3xl shadow-inner">
                    <div className="flex items-end justify-between h-full gap-2">
                        {[40, 35, 45, 30, 55, 40, 70, 55, 90, 100].map((h, i) => {
                            const factor = isAuto ? (automation / 100) : 0.15;
                            const currentH = Math.min(100, (h * factor) + (isAuto ? Math.sin(growth / 10 + i) * 6 : 0));
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: `${currentH}%`,
                                        backgroundColor: isAuto ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.05)'
                                    }}
                                    className={`flex-1 rounded-t-xl shadow-[0_-5px_15px_rgba(0,0,0,0.5)]`}
                                />
                            );
                        })}
                    </div>

                    {isAuto && (
                        <div className="absolute top-4 right-5 flex flex-col items-end">
                            <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/20 backdrop-blur-md">
                                <TrendingUp className="w-3 h-3 text-primary" />
                                <span className="text-[9px] font-black font-mono text-white">ESTADÍSTICAS POSITIVAS</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Impact Metrics Overlay */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-2xl border transition-all duration-700 flex items-center gap-3 ${isAuto ? 'bg-primary/5 border-primary/20 opacity-100' : 'bg-white/5 border-white/5 opacity-30'}`}>
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 shadow-xl">
                            <Clock className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Tiempo</span>
                            <span className="text-[11px] font-mono font-black text-white">+{isAuto ? Math.floor(automation * 0.8) : 0}h/mes</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-2xl border transition-all duration-700 flex items-center gap-3 ${isAuto ? 'bg-primary/5 border-primary/20 opacity-100' : 'bg-white/5 border-white/5 opacity-30'}`}>
                        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20 shadow-xl">
                            <Euro className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Ingresos</span>
                            <span className="text-[11px] font-mono font-black text-white">x{isAuto ? (1 + automation / 100).toFixed(1) : 1}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Ambient Glow */}
            <AnimatePresence>
                {isAuto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none z-0"
                    >
                        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
                        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlFreedomSimulator;
