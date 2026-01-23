import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, BarChart, TrendingUp, ShieldCheck, Settings, Play } from 'lucide-react';

const ControlFreedomSimulator = () => {
    const [isAuto, setIsAuto] = useState(false);
    const [growth, setGrowth] = useState(0);

    // Automation Toggle Cycle
    useEffect(() => {
        const cycle = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setIsAuto(true);

            // Animate growth when auto is on
            let g = 0;
            const interval = setInterval(() => {
                g += 1;
                if (g <= 100) setGrowth(g);
                else clearInterval(interval);
            }, 30);

            await new Promise(r => setTimeout(r, 5000));
            setIsAuto(false);
            setGrowth(0);
            cycle();
        };
        cycle();
    }, []);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-inner flex flex-col p-6">
            {/* Header / Brand */}
            <div className="flex items-center justify-between mb-8 relative z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] font-display font-black text-white italic tracking-tighter uppercase">Panel de Mando</span>
                    <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">S.O. Engorilate v2.1</span>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-black border flex items-center justify-center transition-all duration-700 ${isAuto ? 'border-primary shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-white/10'}`}>
                    <ShieldCheck className={`w-5 h-5 transition-colors duration-500 ${isAuto ? 'text-primary' : 'text-white/10'}`} />
                </div>
            </div>

            {/* Main Control Switch */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-20">
                <div className="relative mb-8">
                    <motion.div
                        animate={{
                            scale: isAuto ? [1, 1.05, 1] : 1,
                            borderColor: isAuto ? '#22c55e' : 'rgba(255,255,255,0.1)'
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 rounded-full bg-black border-4 flex items-center justify-center shadow-2xl relative"
                    >
                        <Power className={`w-10 h-10 transition-colors duration-700 ${isAuto ? 'text-primary' : 'text-white/10'}`} />

                        {/* Status Label on Button */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-700 ${isAuto ? 'text-primary' : 'text-white/20'}`}>
                                {isAuto ? 'PILOTO AUTO' : 'MODO MANUAL'}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Growth Chart (Mini) */}
                <div className="w-full max-w-[200px] h-20 bg-black/40 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                    <div className="flex items-end justify-between h-full gap-1">
                        {[40, 35, 45, 30, 55, 40, 65, 50, 85, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: isAuto ? `${h}%` : '10%' }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className={`flex-1 rounded-t-sm transition-colors duration-500 ${isAuto ? 'bg-primary/60' : 'bg-white/5'}`}
                            />
                        ))}
                    </div>
                    <AnimatePresence>
                        {isAuto && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-2 right-3 flex items-center gap-1"
                            >
                                <TrendingUp className="w-3 h-3 text-primary" />
                                <span className="text-[8px] font-mono font-black text-primary">+{growth}%</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Status */}
            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 opacity-40">
                <div className="flex items-center gap-2">
                    <Settings className="w-3 h-3 animate-spin-slow" />
                    <span className="text-[7px] font-black tracking-widest uppercase">Sistema Optimizado</span>
                </div>
                <div className="flex items-center gap-1">
                    <Play className="w-2 h-2 text-primary fill-primary" />
                    <span className="text-[7px] font-black tracking-widest uppercase">Activo</span>
                </div>
            </div>

            {/* Logic Aura */}
            <AnimatePresence>
                {isAuto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-primary/[0.03] animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlFreedomSimulator;
