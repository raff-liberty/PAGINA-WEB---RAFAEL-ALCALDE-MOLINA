import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, TrendingUp, ShieldCheck, Clock, Euro, MousePointer2 } from 'lucide-react';

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
        <div className="w-full aspect-[4/5] bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col p-6 md:p-8 justify-between">
            {/* Background Grid */}
            <div className="absolute inset-0.5 rounded-[2.8rem] opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Premium Header */}
            <div className="flex items-center justify-between relative z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white italic tracking-tighter uppercase mb-0.5 opacity-80">Protocolo de Crecimiento</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isAuto ? 'bg-primary animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-white/20'}`} />
                        <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.3em]">Status: {isAuto ? 'OPTIMIZADO' : 'MANUAL'}</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                    <ShieldCheck className={`w-5 h-5 transition-colors duration-500 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                </div>
            </div>

            {/* Main Interactive Hub - Compacted */}
            <div className="flex flex-col items-center gap-4 relative z-20">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAuto(!isAuto)}
                    className="relative group cursor-pointer"
                >
                    <motion.div
                        animate={{
                            scale: isAuto ? [1, 1.1, 1] : 1,
                            boxShadow: isAuto ? '0 0 60px rgba(34,197,94,0.4)' : '0 0 20px rgba(0,0,0,0.5)',
                            borderColor: isAuto ? '#22c55e' : 'rgba(255,255,255,0.1)'
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-24 h-24 rounded-full bg-black border-[3px] flex items-center justify-center transition-all duration-700 relative overflow-hidden`}
                    >
                        {isAuto && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.3),transparent)]"
                            />
                        )}
                        <Power className={`w-10 h-10 transition-colors duration-700 relative z-10 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                    </motion.div>

                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center">
                        <span className={`text-[12px] font-black uppercase tracking-[0.4em] transition-all duration-500 mb-1 ${isAuto ? 'text-primary' : 'text-white/30'}`}>
                            {isAuto ? 'PILOTO AUTO ON' : 'TOMA EL CONTROL'}
                        </span>
                        <div className="flex items-center gap-1.5 opacity-60">
                            <MousePointer2 className="w-3 h-3 text-primary animate-bounce" />
                            <span className="text-[7px] font-black text-white uppercase tracking-widest">{isAuto ? 'Pausar' : 'Activar'}</span>
                        </div>
                    </div>
                </motion.button>

                {/* Automation Slider Panel */}
                <div className={`w-full max-w-[220px] bg-black/70 border border-white/10 rounded-2xl p-4 transition-all duration-700 backdrop-blur-3xl shadow-xl mt-8 ${isAuto ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-2 pointer-events-none'}`}>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Optimización</span>
                        <span className="text-sm font-black font-mono text-primary tabular-nums">{automation}%</span>
                    </div>
                    <input
                        type="range"
                        min="10" max="100"
                        value={automation}
                        onChange={(e) => setAutomation(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary mb-1"
                    />
                </div>
            </div>

            {/* Growth Chart Area - Repositioned and Compacted */}
            <div className="relative z-20 space-y-4">
                <div className="w-full h-24 bg-black/80 border border-white/5 rounded-2xl p-4 relative overflow-hidden backdrop-blur-3xl shadow-inner">
                    {/* SVG Trend Line */}
                    {isAuto && (
                        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none">
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                d="M 20,80 L 60,70 L 100,75 L 140,55 L 180,45 L 220,30 L 260,15"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                                stroke="#22c55e"
                                strokeWidth="2.5"
                                fill="none"
                                className="drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                            />
                        </svg>
                    )}

                    <div className="flex items-end justify-between h-full gap-1.5 relative z-0">
                        {[30, 45, 35, 60, 50, 80, 70, 95].map((h, i) => {
                            const factor = isAuto ? (automation / 100) : 0.1;
                            const currentH = Math.min(100, (h * factor) + (isAuto ? Math.sin(growth / 10 + i) * 6 : 0));
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: `${currentH}%`,
                                        backgroundColor: isAuto ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.02)'
                                    }}
                                    className={`flex-1 rounded-t-md transition-colors duration-500`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-2xl border transition-all duration-700 flex items-center gap-3 ${isAuto ? 'bg-primary/5 border-primary/20 opacity-100' : 'bg-white/5 border-white/5 opacity-20'}`}>
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Clock className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">Ahorro</span>
                            <span className="text-[10px] font-mono font-black text-white leading-none">+{isAuto ? Math.floor(automation * 0.8) : 0}h</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-2xl border transition-all duration-700 flex items-center gap-3 ${isAuto ? 'bg-primary/5 border-primary/20 opacity-100' : 'bg-white/5 border-white/5 opacity-20'}`}>
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Euro className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">Escala</span>
                            <span className="text-[10px] font-mono font-black text-white leading-none">x{isAuto ? (1 + automation / 100).toFixed(1) : 1}</span>
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
                        <div className="absolute -bottom-40 -left-40 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full" />
                        <div className="absolute -top-40 -right-40 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlFreedomSimulator;
