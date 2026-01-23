import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, MessageSquare, Zap, Activity, MousePointer2 } from 'lucide-react';

const SystemBuilderSimulator = () => {
    const [connectedModules, setConnectedModules] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    // Mobile-optimized offsets (reduced from ±110px to ±75px for mobile, ±110px for desktop)
    const modules = [
        { id: 'web', icon: Layout, label: 'WEB / OPTIMIZADA', x: -75, y: -75, xMd: -110, yMd: -110, color: '#3B82F6' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP AI', x: 75, y: -75, xMd: 110, yMd: -110, color: '#22c55e' },
        { id: 'crm', icon: Database, label: 'SISTEMA CRM', x: -75, y: 75, xMd: -110, yMd: 110, color: '#A855F7' },
        { id: 'ads', icon: Zap, label: 'CAPTACIÓN 24/7', x: 75, y: 75, xMd: 110, yMd: 110, color: '#F59E0B' },
    ];

    const resetSimulation = useCallback(() => {
        setConnectedModules([]);
        setIsComplete(false);
    }, []);

    const toggleModule = (id) => {
        if (connectedModules.includes(id)) return;

        const newConnected = [...connectedModules, id];
        setConnectedModules(newConnected);

        if (newConnected.length === modules.length) {
            setTimeout(() => setIsComplete(true), 800);
            setTimeout(resetSimulation, 12000);
        }
    };

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex items-center justify-center p-6 md:p-8">
            {/* Background Architecture Grid - Simplified */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            {/* Connection Rays (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                {modules.map(mod => {
                    const isConnected = connectedModules.includes(mod.id);
                    if (!isConnected) return null;
                    // Use mobile coordinates by default, desktop on md+
                    return (
                        <g key={`line-${mod.id}`}>
                            <motion.line
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                x1="50%" y1="50%"
                                x2={`calc(50% + ${mod.x}px)`} y2={`calc(50% + ${mod.y}px)`}
                                stroke={mod.color}
                                strokeWidth="2"
                                strokeDasharray="8 6"
                                className="md:hidden"
                            />
                            <motion.line
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                x1="50%" y1="50%"
                                x2={`calc(50% + ${mod.xMd}px)`} y2={`calc(50% + ${mod.yMd}px)`}
                                stroke={mod.color}
                                strokeWidth="3"
                                strokeDasharray="8 6"
                                className="hidden md:block"
                            />
                            <motion.circle
                                r="3"
                                fill={mod.color}
                                animate={{
                                    cx: ["50%", `calc(50% + ${mod.x}px)`],
                                    cy: ["50%", `calc(50% + ${mod.y}px)`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                className="md:hidden"
                            />
                            <motion.circle
                                r="4"
                                fill={mod.color}
                                animate={{
                                    cx: ["50%", `calc(50% + ${mod.xMd}px)`],
                                    cy: ["50%", `calc(50% + ${mod.yMd}px)`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                className="hidden md:block"
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Central Core (CPU) - Responsive sizing */}
            <div className="relative z-30">
                <motion.div
                    animate={{
                        rotate: isComplete ? 360 : 0,
                        scale: isComplete ? [1, 1.15, 1] : 1,
                        borderColor: isComplete ? 'rgba(34,197,94,0.8)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isComplete ? '0 0 100px rgba(34,197,94,0.5)' : '0 0 40px rgba(0,0,0,0.5)'
                    }}
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] md:rounded-[3rem] bg-black border-[3px] flex items-center justify-center backdrop-blur-3xl transition-all duration-700 shadow-2xl relative`}
                >
                    <div className={`absolute inset-3 md:inset-4 rounded-full transition-all duration-1000 ${isComplete ? 'bg-primary/20 blur-xl opacity-100' : 'bg-white/5 blur-md opacity-30'}`} />

                    <div className="relative z-10">
                        <Cpu className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-700 ${isComplete ? 'text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'text-white/10'}`} />
                        {isComplete && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Activity className="w-8 h-8 md:w-10 md:h-10 text-primary/40" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Modules - Responsive positioning */}
            {modules.map((mod) => {
                const isConnected = connectedModules.includes(mod.id);
                return (
                    <React.Fragment key={mod.id}>
                        {/* Mobile positioning */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleModule(mod.id)}
                            className="absolute z-40 group cursor-pointer md:hidden"
                            style={{
                                left: `calc(50% + ${mod.x}px - 28px)`,
                                top: `calc(50% + ${mod.y}px - 28px)`
                            }}
                        >
                            <div className="flex flex-col items-center gap-1.5">
                                <div
                                    className={`w-14 h-14 rounded-xl bg-black border-2 flex items-center justify-center transition-all duration-500 backdrop-blur-xl overflow-hidden relative shadow-2xl`}
                                    style={{
                                        borderColor: isConnected ? mod.color : 'rgba(255,255,255,0.05)',
                                        boxShadow: isConnected ? `0 0 30px ${mod.color}40` : 'none'
                                    }}
                                >
                                    <mod.icon className="w-7 h-7" style={{ color: isConnected ? mod.color : 'rgba(255,255,255,0.1)' }} />
                                </div>
                                <span className={`text-[7px] font-black uppercase tracking-[0.15em] px-1.5 py-1 rounded-full border transition-all duration-500 whitespace-nowrap shadow-2xl ${isConnected ? 'bg-white text-black border-white' : 'bg-black/80 text-white/30 border-white/10'}`}>
                                    {mod.label}
                                </span>
                            </div>
                        </motion.button>

                        {/* Desktop positioning */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleModule(mod.id)}
                            className="absolute z-40 group cursor-pointer hidden md:block"
                            style={{
                                left: `calc(50% + ${mod.xMd}px - 36px)`,
                                top: `calc(50% + ${mod.yMd}px - 36px)`
                            }}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-18 h-18 rounded-2xl bg-black border-2 flex items-center justify-center transition-all duration-500 backdrop-blur-xl overflow-hidden relative shadow-2xl`}
                                    style={{
                                        borderColor: isConnected ? mod.color : 'rgba(255,255,255,0.05)',
                                        boxShadow: isConnected ? `0 0 40px ${mod.color}40` : 'none'
                                    }}
                                >
                                    <mod.icon className="w-9 h-9" style={{ color: isConnected ? mod.color : 'rgba(255,255,255,0.1)' }} />
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-full border transition-all duration-500 whitespace-nowrap shadow-2xl ${isConnected ? 'bg-white text-black border-white' : 'bg-black/80 text-white/30 border-white/10'}`}>
                                    {mod.label}
                                </span>
                            </div>
                        </motion.button>
                    </React.Fragment>
                );
            })}

            {/* Instruction Banner - More compact on mobile */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-max z-50 max-w-[90%]">
                <AnimatePresence mode="wait">
                    {!isComplete && connectedModules.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-primary/20 border-2 border-primary/40 px-4 py-2.5 md:px-8 md:py-4 rounded-2xl md:rounded-3xl backdrop-blur-3xl flex items-center gap-2 md:gap-4 shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
                        >
                            <div className="bg-primary/30 p-1.5 md:p-2.5 rounded-lg md:rounded-xl animate-pulse ring-2 md:ring-4 ring-primary/10">
                                <MousePointer2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.1em]">Acción Requerida</span>
                                <span className="text-[7px] md:text-[9px] font-bold text-primary uppercase tracking-widest">Haz clic en los módulos para integrarlos</span>
                            </div>
                        </motion.div>
                    ) : isComplete && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-2 bg-black/40 px-6 md:px-8 py-2 md:py-3 rounded-full backdrop-blur-md border border-primary/20"
                        >
                            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-primary italic">Arquitectura Integrada</span>
                            <div className="w-40 md:w-56 h-1.5 md:h-2 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-primary shadow-[0_0_15px_#22c55e]"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SystemBuilderSimulator;
