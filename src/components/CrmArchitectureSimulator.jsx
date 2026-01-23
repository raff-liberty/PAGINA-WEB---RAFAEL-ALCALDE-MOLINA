import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Globe, MessageSquare, Briefcase, Zap, Share2, Activity, Cpu } from 'lucide-react';

const CrmArchitectureSimulator = () => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setLastSync(new Date().toLocaleTimeString());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { id: 'web', icon: Globe, label: 'WEB / E-COMMERCE', x: 15, y: 15, color: '#3B82F6', desc: 'Captación 24/7' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP API', x: 85, y: 15, color: '#22c55e', desc: 'Atención IA' },
        { id: 'crm', icon: Briefcase, label: 'HOLDED / CRM', x: 15, y: 85, color: '#A855F7', desc: 'Facturación' },
        { id: 'bank', icon: Zap, label: 'STRIPE / BANCO', x: 85, y: 85, color: '#F59E0B', desc: 'Pagos/Banco' },
    ];

    return (
        <div className="w-full max-w-[550px] aspect-square mx-auto bg-black/40 rounded-[3rem] border border-white/5 p-4 md:p-8 relative overflow-hidden group shadow-[0_0_100px_rgba(34,197,94,0.03)] backdrop-blur-xl">
            {/* High-Tech Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Animated Scanning Line */}
            <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none z-0"
            />

            {/* SVG Layer for Connections and Pulses */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
                <defs>
                    {nodes.map(node => (
                        <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`}>
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                            <stop offset="100%" stopColor={node.color} stopOpacity="0.5" />
                        </linearGradient>
                    ))}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connection Lines */}
                {nodes.map((node) => (
                    <g key={`conn-${node.id}`}>
                        <motion.line
                            x1="50%" y1="50%"
                            x2={`${node.x}%`} y2={`${node.y}%`}
                            stroke={hoveredNode === node.id || !hoveredNode ? `url(#grad-${node.id})` : 'rgba(255,255,255,0.05)'}
                            strokeWidth={hoveredNode === node.id ? "3" : "1.5"}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ filter: hoveredNode === node.id ? 'url(#glow)' : 'none' }}
                        />

                        {/* Flowing Data Particles */}
                        {[...Array(3)].map((_, i) => (
                            <motion.circle
                                key={`pulse-${node.id}-${i}`}
                                r="3"
                                fill={node.color}
                                animate={{
                                    cx: ["50%", `${node.x}%`],
                                    cy: ["50%", `${node.y}%`],
                                    opacity: [0, 1, 0],
                                    scale: [1, 1.5, 0.5]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    delay: i * 1 + (nodes.indexOf(node) * 0.5),
                                    ease: "easeInOut"
                                }}
                                style={{ filter: 'blur(1px)' }}
                            />
                        ))}
                    </g>
                ))}
            </svg>

            {/* Central Node - The Brain */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            '0 0 30px rgba(34,197,94,0.1)',
                            '0 0 60px rgba(34,197,94,0.3)',
                            '0 0 30px rgba(34,197,94,0.1)'
                        ]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-primary/30 flex flex-col items-center justify-center relative backdrop-blur-3xl group/brain"
                >
                    {/* Inner Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-1 border border-primary/10 rounded-full border-dashed"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-white/5 rounded-full"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3 rounded-2xl bg-primary/20 border border-primary/40 mb-2 group-hover/brain:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <Cpu className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse" />
                        </div>
                        <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] text-center px-4 leading-tight mb-1">
                            Cerebro Central
                        </h4>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            <span className="text-[7px] md:text-[8px] font-mono text-primary font-bold uppercase tracking-widest">Sincronizado</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Peripheral Nodes */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className="absolute z-40"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-3 cursor-help"
                    >
                        <div
                            className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-black/80 border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden shadow-2xl ${hoveredNode === node.id ? 'border-opacity-100' : 'border-opacity-20'
                                }`}
                            style={{
                                borderColor: node.color,
                                boxShadow: hoveredNode === node.id ? `0 0 30px ${node.color}40` : `0 0 20px rgba(0,0,0,0.5)`
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            <node.icon className={`w-7 h-7 md:w-10 md:h-10 transition-colors duration-500 ${hoveredNode === node.id ? 'text-white' : 'text-white/40'
                                }`} style={{ color: hoveredNode === node.id ? node.color : '' }} />

                            {/* Logic Aura */}
                            <AnimatePresence>
                                {hoveredNode === node.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1.2 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute inset-0 rounded-2xl border border-white/20 blur-sm pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded-lg border backdrop-blur-md transition-all duration-500 ${hoveredNode === node.id ? 'bg-white text-black border-white' : 'bg-black/60 text-white/40 border-white/10'
                                }`}>
                                {node.label}
                            </span>
                            {hoveredNode === node.id && (
                                <motion.span
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[7px] md:text-[8px] text-white/60 font-medium italic mt-1 uppercase"
                                >
                                    {node.desc}
                                </motion.span>
                            )}
                        </div>
                    </motion.div>
                </div>
            ))}

            {/* Bottom Status Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] z-50">
                <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Activity className="w-4 h-4 text-primary animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-white uppercase tracking-wider">Flujo de Datos</span>
                            <span className="text-[8px] font-mono text-white/40 uppercase">Latencia: 1ms</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-mono text-primary font-bold">{lastSync}</span>
                        <p className="text-[7px] font-black text-white/60 uppercase tracking-tighter">Última Sincronización</p>
                    </div>
                </div>
            </div>

            {/* Ambient Corners */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        </div>
    );
};

export default CrmArchitectureSimulator;
