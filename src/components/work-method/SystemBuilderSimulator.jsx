import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, MessageSquare, Zap, Activity, MousePointer2 } from 'lucide-react';

const SystemBuilderSimulator = () => {
    const [connectedModules, setConnectedModules] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    // Offsets increased to prevent overlap with central CPU (w-36)
    const modules = [
        { id: 'web', icon: Layout, label: 'WEB / OPTIMIZADA', x: -130, y: -130, color: '#3B82F6' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP AI', x: 130, y: -130, color: '#22c55e' },
        { id: 'crm', icon: Database, label: 'SISTEMA CRM', x: -130, y: 130, color: '#A855F7' },
        { id: 'ads', icon: Zap, label: 'CAPTACIÓN 24/7', x: 130, y: 130, color: '#F59E0B' },
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
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex items-center justify-center p-12">
            {/* Background Architecture Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            {/* Connection Rays (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                {modules.map(mod => {
                    const isConnected = connectedModules.includes(mod.id);
                    if (!isConnected) return null;
                    return (
                        <g key={`line-${mod.id}`}>
                            <motion.line
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                x1="50%" y1="50%"
                                x2={`calc(50% + ${mod.x}px)`} y2={`calc(50% + ${mod.y}px)`}
                                stroke={mod.color}
                                strokeWidth="3"
                                strokeDasharray="8 6"
                            />
                            {/* Energy Pulse - Stronger */}
                            <motion.circle
                                r="4"
                                fill={mod.color}
                                animate={{
                                    cx: ["50%", `calc(50% + ${mod.x}px)`],
                                    cy: ["50%", `calc(50% + ${mod.y}px)`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Static Glow on Connection */}
                            <circle cx={`calc(50% + ${mod.x}px)`} cy={`calc(50% + ${mod.y}px)`} r="15" fill={mod.color} opacity="0.1" />
                        </g>
                    );
                })}
            </svg>

            {/* Central Core (CPU) */}
            <div className="relative z-30">
                <motion.div
                    animate={{
                        rotate: isComplete ? 360 : 0,
                        scale: isComplete ? [1, 1.15, 1] : 1,
                        borderColor: isComplete ? 'rgba(34,197,94,0.8)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isComplete ? '0 0 100px rgba(34,197,94,0.5)' : '0 0 40px rgba(0,0,0,0.5)'
                    }}
                    transition={{
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                    }}
                    className={`w-36 h-36 rounded-[3.5rem] bg-black border-[3px] flex items-center justify-center backdrop-blur-3xl transition-all duration-700 shadow-2xl relative`}
                >
                    {/* Internal Core Glow */}
                    <div className={`absolute inset-4 rounded-full transition-all duration-1000 ${isComplete ? 'bg-primary/20 blur-xl opacity-100' : 'bg-white/5 blur-md opacity-30'}`} />

                    <div className="relative z-10">
                        <Cpu className={`w-20 h-20 transition-all duration-700 ${isComplete ? 'text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'text-white/10'}`} />
                        {isComplete && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Activity className="w-12 h-12 text-primary/40" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Orbital Rings */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-40px] border-2 border-primary/10 rounded-full border-dashed opacity-40"
                />
            </div>

            {/* Modules (repositioned to avoid central z-occlusion) */}
            {modules.map((mod) => {
                const isConnected = connectedModules.includes(mod.id);
                return (
                    <motion.button
                        key={mod.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleModule(mod.id)}
                        className="absolute z-40 group cursor-pointer"
                        style={{
                            left: `calc(50% + ${mod.x}px - 40px)`,
                            top: `calc(50% + ${mod.y}px - 40px)`
                        }}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className={`w-20 h-20 rounded-2xl bg-black border-2 flex items-center justify-center transition-all duration-500 backdrop-blur-xl overflow-hidden relative shadow-2xl`}
                                style={{
                                    borderColor: isConnected ? mod.color : 'rgba(255,255,255,0.05)',
                                    boxShadow: isConnected ? `0 0 40px ${mod.color}40` : 'none'
                                }}
                            >
                                <mod.icon className="w-10 h-10" style={{ color: isConnected ? mod.color : 'rgba(255,255,255,0.1)' }} />

                                <AnimatePresence>
                                    {!isConnected && (
                                        <motion.div
                                            animate={{ opacity: [0.1, 0.4, 0.1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-white/5"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Label integration - Integrated into the module block appearance */}
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all duration-500 whitespace-nowrap shadow-2xl ${isConnected ? 'bg-white text-black border-white' : 'bg-black/80 text-white/30 border-white/10'}`}>
                                {mod.label}
                            </span>
                        </div>
                    </motion.button>
                );
            })}

            {/* Instruction Banner - Bottom-offset to avoid covering bottom modules */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max z-50">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-primary/20 border-2 border-primary/40 px-8 py-4 rounded-3xl backdrop-blur-3xl flex items-center gap-4 shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
                        >
                            <div className="bg-primary/30 p-2.5 rounded-xl animate-pulse ring-4 ring-primary/10">
                                <MousePointer2 className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[11px] font-black text-white uppercase tracking-[0.1em]">Acción Requerida</span>
                                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Haz clic en los módulos para integrarlos</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-2 bg-black/40 px-8 py-3 rounded-full backdrop-blur-md border border-primary/20"
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic">Arquitectura Integrada</span>
                            <div className="w-56 h-2 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
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

            {/* Global Ambient Glow */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 z-0"
                    >
                        <div className="absolute inset-0 bg-primary/5 mix-blend-screen" />
                        <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full" />
                        <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SystemBuilderSimulator;
