import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, MessageSquare, Zap, Activity, MousePointer2 } from 'lucide-react';

const SystemBuilderSimulator = () => {
    const [connectedModules, setConnectedModules] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const modules = [
        { id: 'web', icon: Layout, label: 'WEB / OPTIMIZADA', x: -85, y: -85, color: '#3B82F6' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP AI', x: 85, y: -85, color: '#22c55e' },
        { id: 'crm', icon: Database, label: 'SISTEMA CRM', x: -85, y: 85, color: '#A855F7' },
        { id: 'ads', icon: Zap, label: 'CAPTACIÓN 24/7', x: 85, y: 85, color: '#F59E0B' },
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
            setTimeout(resetSimulation, 10000);
        }
    };

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex items-center justify-center p-12">
            {/* Background Architecture Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Connection Rays (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                {modules.map(mod => {
                    const isConnected = connectedModules.includes(mod.id);
                    if (!isConnected) return null;
                    return (
                        <g key={`line-${mod.id}`}>
                            <motion.line
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.4 }}
                                x1="50%" y1="50%"
                                x2={`calc(50% + ${mod.x}px)`} y2={`calc(50% + ${mod.y}px)`}
                                stroke={mod.color}
                                strokeWidth="2"
                                strokeDasharray="6 4"
                            />
                            {/* Energy Pulse */}
                            <motion.circle
                                r="3"
                                fill={mod.color}
                                animate={{
                                    cx: ["50%", `calc(50% + ${mod.x}px)`],
                                    cy: ["50%", `calc(50% + ${mod.y}px)`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Central Core */}
            <div className="relative z-30">
                <motion.div
                    animate={{
                        rotate: isComplete ? 360 : 0,
                        scale: isComplete ? [1, 1.15, 1] : 1,
                        borderColor: isComplete ? 'rgba(34,197,94,0.8)' : 'rgba(255,255,255,0.1)',
                        boxShadow: isComplete ? '0 0 80px rgba(34,197,94,0.4)' : '0 0 0px transparent'
                    }}
                    transition={{
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                    }}
                    className={`w-32 h-32 rounded-[3rem] bg-black border-2 flex items-center justify-center backdrop-blur-3xl transition-all duration-700 shadow-inner`}
                >
                    <div className="relative">
                        <Cpu className={`w-16 h-16 transition-colors duration-700 ${isComplete ? 'text-primary' : 'text-white/20'}`} />
                        {isComplete && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Activity className="w-10 h-10 text-primary/50" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Visual Rings */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-30px] border-2 border-primary/5 rounded-full border-dashed opacity-30"
                />
            </div>

            {/* Modules */}
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
                            left: `calc(50% + ${mod.x}px - 32px)`,
                            top: `calc(50% + ${mod.y}px - 32px)`
                        }}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className={`w-16 h-16 rounded-2xl bg-black border-2 flex items-center justify-center transition-all duration-500 backdrop-blur-md overflow-hidden relative shadow-2xl`}
                                style={{
                                    borderColor: isConnected ? mod.color : 'rgba(255,255,255,0.05)',
                                    boxShadow: isConnected ? `0 0 30px ${mod.color}30` : 'none'
                                }}
                            >
                                <mod.icon className="w-8 h-8" style={{ color: isConnected ? mod.color : 'rgba(255,255,255,0.1)' }} />

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
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all duration-500 whitespace-nowrap shadow-xl ${isConnected ? 'bg-white text-black border-white' : 'bg-black/80 text-white/30 border-white/10'}`}>
                                {mod.label}
                            </span>
                        </div>
                    </motion.button>
                );
            })}

            {/* Highlighted Instruction Banner */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-12 z-50">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-primary/20 border-2 border-primary/40 px-6 py-3 rounded-2xl backdrop-blur-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                        >
                            <div className="bg-primary/30 p-2 rounded-lg animate-pulse">
                                <MousePointer2 className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.1em]">Acción Requerida</span>
                                <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Haz clic en los módulos para integrarlos</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Arquitectura Integrada</span>
                            <div className="w-48 h-1.5 bg-primary/20 rounded-full overflow-hidden border border-primary/20">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    className="h-full bg-primary"
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
                        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                    >
                        <div className="absolute inset-0 bg-primary/5 mix-blend-screen" />
                        <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-primary/15 blur-[120px] rounded-full" />
                        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-blue-500/15 blur-[120px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SystemBuilderSimulator;
