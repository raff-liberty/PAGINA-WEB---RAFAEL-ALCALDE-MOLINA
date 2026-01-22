import React from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, MessageSquare, Briefcase, Zap, Share2 } from 'lucide-react';

const CrmArchitectureSimulator = () => {
    const nodes = [
        { id: 'web', icon: Globe, label: 'WEB / E-COMMERCE', x: '10%', y: '10%' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP API', x: '90%', y: '10%' },
        { id: 'crm', icon: Briefcase, label: 'HOLDED / CRM', x: '10%', y: '90%' },
        { id: 'bank', icon: Zap, label: 'STRIPE / BANCO', x: '90%', y: '90%' },
    ];

    return (
        <div className="w-full max-w-[500px] aspect-square mx-auto bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 p-8 relative overflow-hidden group/arch">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Central Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        borderColor: ['rgba(34,197,94,0.2)', 'rgba(34,197,94,0.6)', 'rgba(34,197,94,0.2)']
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-black border-2 border-primary/40 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(34,197,94,0.2)]"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-[2rem] animate-pulse" />
                    <Database className="w-8 h-8 md:w-10 md:h-10 text-primary mb-2" />
                    <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest text-center px-2">Cerebro Central</span>

                    {/* Ring animations */}
                    <div className="absolute inset-[-10px] border border-primary/10 rounded-[2.5rem] animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-[-20px] border border-white/5 rounded-[3rem] animate-[spin_15s_linear_infinite_reverse]" />
                </motion.div>
            </div>

            {/* Peripheral Nodes & Connections */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                {nodes.map((node) => (
                    <g key={node.id}>
                        {/* Connecting Line */}
                        <motion.line
                            x1="50%" y1="50%"
                            x2={node.x} y2={node.y}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="2"
                        />
                        {/* Data Pulse */}
                        <motion.circle
                            r="3"
                            fill="#22c55e"
                            initial={{ offsetDistance: "0%" }}
                            animate={{
                                cx: ["50%", node.x],
                                cy: ["50%", node.y],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.circle
                            r="3"
                            fill="#22c55e"
                            animate={{
                                cx: [node.x, "50%"],
                                cy: [node.y, "50%"],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                            }}
                        />
                    </g>
                ))}
            </svg>

            {/* Peripheral Nodes Labels/Icons */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className="absolute z-20"
                    style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-white/40 group-arch:border-primary/20 group-arch:text-primary transition-all duration-500 shadow-xl">
                            <node.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="text-[7px] md:text-[9px] font-bold text-white/40 uppercase tracking-tighter whitespace-nowrap bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                            {node.label}
                        </span>
                    </motion.div>
                </div>
            ))}

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center px-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                    <Share2 className="w-3 h-3 text-primary animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest">Sincronización Total</span>
                </div>
            </div>
        </div>
    );
};

export default CrmArchitectureSimulator;
