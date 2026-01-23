import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, MessageSquare, Zap, Layers, Activity } from 'lucide-react';

const SystemBuilderSimulator = () => {
    const [connectedModules, setConnectedModules] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const modules = [
        { id: 'web', icon: Layout, label: 'WEB / OPTIMIZADA', x: -65, y: -65, color: '#3B82F6' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP AI', x: 65, y: -65, color: '#22c55e' },
        { id: 'crm', icon: Database, label: 'SISTEMA CRM', x: -65, y: 65, color: '#A855F7' },
        { id: 'ads', icon: Zap, label: 'CAPTACIÓN 24/7', x: 65, y: 65, color: '#F59E0B' },
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
            setTimeout(resetSimulation, 8000);
        }
    };

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex items-center justify-center p-8">
            {/* Background Architecture Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Connection Rays (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <defs>
                    {modules.map(mod => (
                        <linearGradient key={`grad-${mod.id}`} id={`grad-${mod.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={mod.color} stopOpacity="0" />
                            <stop offset="50%" stopColor={mod.color} stopOpacity="0.5" />
                            <stop offset="100%" stopColor={mod.color} stopOpacity="0" />
                        </linearGradient>
                    ))}
                </defs>
                {modules.map(mod => {
                    const isConnected = connectedModules.includes(mod.id);
                    if (!isConnected) return null;
                    return (
                        <g key={`line-${mod.id}`}>
                            <motion.line
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                x1="50%" y1="50%"
                                x2={`calc(50% + ${mod.x}px)`} y2={`calc(50% + ${mod.y}px)`}
                                stroke={mod.color}
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                            {/* Energy Pulse */}
                            <motion.circle
                                r="2"
                                fill={mod.color}
                                animate={{
                                    cx: ["50%", `calc(50% + ${mod.x}px)`],
                                    cy: ["50%", `calc(50% + ${mod.y}px)`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
                        scale: isComplete ? [1, 1.1, 1] : 1,
                        borderColor: isComplete ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.1)',
                        boxShadow: isComplete ? '0 0 60px rgba(34,197,94,0.3)' : '0 0 0px transparent'
                    }}
                    transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                    }}
                    className={`w-28 h-28 rounded-[2.5rem] bg-black border-2 flex items-center justify-center backdrop-blur-3xl transition-colors duration-700`}
                >
                    <div className="relative">
                        <Cpu className={`w-14 h-14 transition-colors duration-700 ${isComplete ? 'text-primary' : 'text-white/20'}`} />
                        {isComplete && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Activity className="w-8 h-8 text-primary/50" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Visual Rings */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] border border-white/5 rounded-full border-dashed opacity-20"
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleModule(mod.id)}
                        className="absolute z-40 group cursor-pointer"
                        style={{
                            left: `calc(50% + ${mod.x}px - 28px)`,
                            top: `calc(50% + ${mod.y}px - 28px)`
                        }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={`w-14 h-14 rounded-2xl bg-black/80 border-2 flex items-center justify-center transition-all duration-500 backdrop-blur-md overflow-hidden relative`}
                                style={{
                                    borderColor: isConnected ? mod.color : 'rgba(255,255,255,0.05)',
                                    boxShadow: isConnected ? `0 0 25px ${mod.color}20` : 'none'
                                }}
                            >
                                <mod.icon className="w-7 h-7" style={{ color: isConnected ? mod.color : 'rgba(255,255,255,0.1)' }} />

                                {/* Activation Glow */}
                                <AnimatePresence>
                                    {!isConnected && (
                                        <motion.div
                                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-white/5"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full border transition-all duration-500 whitespace-nowrap ${isConnected ? 'bg-white text-black border-white shadow-lg' : 'bg-black/50 text-white/20 border-white/5'}`}>
                                {mod.label}
                            </span>
                        </div>
                    </motion.button>
                );
            })}

            {/* Bottom Status Instructions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-12">
                <div className="flex flex-col items-center gap-2">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={isComplete}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 text-center"
                        >
                            {isComplete ? 'INFRAESTRUCTURA INTEGRADA' : 'HAZ CLICK PARA CONECTAR MÓDULOS'}
                        </motion.span>
                    </AnimatePresence>
                    <div className="w-full max-w-[150px] h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            animate={{ width: `${(connectedModules.length / modules.length) * 100}%`, backgroundColor: isComplete ? '#22c55e' : '#3B82F6' }}
                            className="h-full transition-colors duration-1000"
                        />
                    </div>
                </div>
            </div>

            {/* Unified Glow */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SystemBuilderSimulator;

