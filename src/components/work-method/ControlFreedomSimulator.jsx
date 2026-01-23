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
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col p-10 justify-between">
            {/* Premium Header - More balanced */}
            <div className="flex items-center justify-between relative z-20">
                <div className="flex flex-col">
                    <span className="text-[12px] font-black text-white italic tracking-tighter uppercase mb-0.5 opacity-90">Protocolo de Crecimiento</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isAuto ? 'bg-primary animate-pulse shadow-[0_0_10px_#22c55e]' : 'bg-white/20'}`} />
                        <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.4em]">Status: {isAuto ? 'SISTEMA OPTIMIZADO' : 'MODO MANUAL'}</span>
                    </div>
                </div>
                <motion.div
                    animate={{
                        borderColor: isAuto ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.05)',
                        backgroundColor: isAuto ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.5)',
                        scale: isAuto ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center backdrop-blur-xl transition-all duration-700 shadow-2xl"
                >
                    <ShieldCheck className={`w-8 h-8 transition-colors duration-500 ${isAuto ? 'text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'text-white/10'}`} />
                </motion.div>
            </div>

            {/* Main Interactive Hub */}
            <div className="flex flex-col items-center gap-10 relative z-20">
                <div className="flex flex-col items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAuto(!isAuto)}
                        className="relative group cursor-pointer"
                    >
                        <motion.div
                            animate={{
                                scale: isAuto ? [1, 1.1, 1] : 1,
                                boxShadow: isAuto ? '0 0 80px rgba(34,197,94,0.5)' : '0 0 20px rgba(0,0,0,0.5)',
                                borderColor: isAuto ? '#22c55e' : 'rgba(255,255,255,0.1)'
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`w-32 h-32 rounded-full bg-black border-4 flex items-center justify-center transition-all duration-700 relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]`}
                        >
                            {/* Energy Swirl inside button when active */}
                            {isAuto && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.3),transparent)]"
                                />
                            )}
                            <Power className={`w-14 h-14 transition-colors duration-700 relative z-10 ${isAuto ? 'text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'text-white/10'}`} />
                        </motion.div>

                        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center">
                            <span className={`text-[14px] font-black uppercase tracking-[0.5em] transition-all duration-500 mb-2 ${isAuto ? 'text-primary' : 'text-white/30'}`}>
                                {isAuto ? 'PILOTO AUTO ON' : 'TOMA EL CONTROL'}
                            </span>
                            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/5 opacity-80">
                                <MousePointer2 className="w-3.5 h-3.5 text-primary animate-bounce" />
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">{isAuto ? 'Toca para pausar' : 'Toca para activar'}</span>
                            </div>
                        </div>
                    </motion.button>
                </div>

                {/* Automation Panel - Integrated better */}
                <div className={`w-full max-w-[280px] bg-black/70 border border-white/10 rounded-[2rem] p-6 transition-all duration-700 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] mt-8 ${isAuto ? 'opacity-100 translate-y-0 scale-100' : 'opacity-20 translate-y-4 scale-95 pointer-events-none'}`}>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">Nivel de Optimización</span>
                            <span className="text-[8px] font-bold text-primary/80 uppercase mt-1 tracking-tighter italic">Optimización Activa</span>
                        </div>
                        <span className="text-xl font-black font-mono text-primary leading-none tabular-nums drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">{automation}%</span>
                    </div>
                    <input
                        type="range"
                        min="10" max="100"
                        value={automation}
                        onChange={(e) => setAutomation(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary mb-2 shadow-inner"
                    />
                </div>
            </div>

            {/* Growth Chart Area - Enhanced with Trend Line */}
            <div className="relative z-20 pb-4">
                <div className="w-full h-32 bg-black/80 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t-white/10">
                    {/* SVG Trend Line */}
                    {isAuto && (
                        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none">
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                d="M 40,70 L 80,65 L 120,75 L 160,60 L 200,50 L 240,40 L 280,35 L 320,20 L 360,15"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                                stroke="#22c55e"
                                strokeWidth="3"
                                fill="none"
                                className="drop-shadow-[0_0_8px_rgba(34,197,94,1)]"
                            />
                        </svg>
                    )}

                    <div className="flex items-end justify-between h-full gap-2 relative z-0">
                        {[40, 35, 45, 30, 55, 40, 70, 55, 90, 100].map((h, i) => {
                            const factor = isAuto ? (automation / 100) : 0.15;
                            const currentH = Math.min(100, (h * factor) + (isAuto ? Math.sin(growth / 10 + i) * 8 : 0));
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: `${currentH}%`,
                                        backgroundColor: isAuto ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.02)'
                                    }}
                                    className={`flex-1 rounded-t-lg transition-colors duration-500`}
                                />
                            );
                        })}
                    </div>

                    {isAuto && (
                        <div className="absolute top-4 right-6 flex flex-col items-end z-20">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30 backdrop-blur-xl shadow-lg shadow-primary/10"
                            >
                                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] font-black font-mono text-white tracking-tighter">CRECIMIENTO EXPONENCIAL</span>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Impact Metrics Overlay */}
                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-[1.5rem] border transition-all duration-700 flex items-center gap-4 ${isAuto ? 'bg-primary/5 border-primary/20 shadow-xl opacity-100' : 'bg-white/20 border-white/5 opacity-20'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Tiempo</span>
                            <span className="text-[14px] font-mono font-black text-white">+{isAuto ? Math.floor(automation * 0.8) : 0}h/mes</span>
                        </div>
                    </div>
                    <div className={`p-4 rounded-[1.5rem] border transition-all duration-700 flex items-center gap-4 ${isAuto ? 'bg-primary/5 border-primary/20 shadow-xl opacity-100' : 'bg-white/20 border-white/5 opacity-20'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <Euro className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Ingresos</span>
                            <span className="text-[14px] font-mono font-black text-white">x{isAuto ? (1 + automation / 100).toFixed(1) : 1}</span>
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
                        <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full" />
                        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlFreedomSimulator;
