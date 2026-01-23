import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, BarChart, TrendingUp, ShieldCheck, Settings, Play, Clock, Euro } from 'lucide-react';

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
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col p-8">
            {/* Premium Header */}
            <div className="flex items-center justify-between mb-6 relative z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white italic tracking-tighter uppercase">Protocolo de Crecimiento</span>
                    <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em]">Status: {isAuto ? 'Optimized' : 'Manual'}</span>
                </div>
                <motion.div
                    animate={{
                        borderColor: isAuto ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.05)',
                        backgroundColor: isAuto ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.5)'
                    }}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center backdrop-blur-md"
                >
                    <ShieldCheck className={`w-5 h-5 transition-colors duration-500 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                </motion.div>
            </div>

            {/* Main Interactive Area */}
            <div className="flex-1 flex flex-col items-center justify-between relative z-20 py-4">
                {/* Control Hub */}
                <div className="flex flex-col items-center gap-6 w-full">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAuto(!isAuto)}
                        className="relative group"
                    >
                        <motion.div
                            animate={{
                                scale: isAuto ? [1, 1.08, 1] : 1,
                                boxShadow: isAuto ? '0 0 40px rgba(34,197,94,0.3)' : '0 0 0px transparent'
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`w-24 h-24 rounded-full bg-black border-4 flex items-center justify-center transition-all duration-700 ${isAuto ? 'border-primary' : 'border-white/10'}`}
                        >
                            <Power className={`w-10 h-10 transition-colors duration-700 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                        </motion.div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${isAuto ? 'text-primary' : 'text-white/20'}`}>
                                {isAuto ? 'AUTO PILOT ON' : 'ACTIVA EL SISTEMA'}
                            </span>
                        </div>
                    </motion.button>

                    {/* Automation Slider */}
                    <div className={`w-full max-w-[220px] bg-black/40 border border-white/5 rounded-2xl p-4 transition-opacity duration-500 ${isAuto ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Nivel de Automatización</span>
                            <span className="text-[10px] font-mono font-bold text-primary">{automation}%</span>
                        </div>
                        <input
                            type="range"
                            min="10" max="100"
                            value={automation}
                            onChange={(e) => setAutomation(parseInt(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>

                {/* Growth Chart */}
                <div className="w-full h-24 bg-black/60 border border-white/10 rounded-2xl p-4 relative overflow-hidden backdrop-blur-xl">
                    <div className="flex items-end justify-between h-full gap-1.5">
                        {[40, 35, 45, 30, 55, 40, 70, 55, 90, 100].map((h, i) => {
                            const factor = isAuto ? (automation / 100) : 0.1;
                            const currentH = Math.min(100, (h * factor) + (isAuto ? Math.sin(growth / 10 + i) * 5 : 0));
                            return (
                                <motion.div
                                    key={i}
                                    animate={{ height: `${currentH}%` }}
                                    className={`flex-1 rounded-t-lg transition-colors duration-700 ${isAuto ? 'bg-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5'}`}
                                />
                            );
                        })}
                    </div>
                    {isAuto && (
                        <div className="absolute top-3 right-4 flex flex-col items-end">
                            <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-primary" />
                                <span className="text-[9px] font-black font-mono text-white">GROWTH ENGINE</span>
                            </div>
                            <span className="text-[8px] font-bold text-primary italic uppercase tracking-tighter">Accelerating...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-3 opacity-60">
                <div className="bg-white/5 border border-white/5 rounded-xl p-2 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[7px] font-black text-white/40 uppercase">Tiempo Libre</span>
                        <span className="text-[9px] font-mono font-bold text-white">+{isAuto ? automation : 0}h/mes</span>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Euro className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[7px] font-black text-white/40 uppercase">Eficacia</span>
                        <span className="text-[9px] font-mono font-bold text-white">x{isAuto ? (1 + automation / 100).toFixed(1) : 1}</span>
                    </div>
                </div>
            </div>

            {/* Final Background Glow */}
            <AnimatePresence>
                {isAuto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none z-0"
                    >
                        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />
                        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlFreedomSimulator;

