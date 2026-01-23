import React from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, MessageSquare, Briefcase, Zap, Share2 } from 'lucide-react';

const CrmArchitectureSimulator = () => {
    const nodes = [
        { id: 'web', icon: Globe, label: 'WEB / E-COMMERCE', x: '12%', y: '12%', color: '#3B82F6' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP API', x: '88%', y: '12%', color: '#22c55e' },
        { id: 'crm', icon: Briefcase, label: 'HOLDED / CRM', x: '12%', y: '88%', color: '#A855F7' },
        { id: 'bank', icon: Zap, label: 'STRIPE / BANCO', x: '88%', y: '88%', color: '#F59E0B' },
    ];

    return (
        <div className="w-full max-w-[600px] aspect-square mx-auto bg-[#0a0a0a] rounded-[3rem] border border-white/10 p-4 md:p-12 relative overflow-hidden group/arch shadow-[0_0_100px_rgba(34,197,94,0.05)]">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Central Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                    animate={{
                        scale: [1, 1.03, 1],
                        boxShadow: [
                            '0 0 40px rgba(34,197,94,0.2)',
                            '0 0 70px rgba(34,197,94,0.4)',
                            '0 0 40px rgba(34,197,94,0.2)'
                        ]
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-28 h-28 md:w-40 md:h-40 rounded-[2.5rem] bg-black border-2 border-primary/50 flex flex-col items-center justify-center relative z-10"
                >
                    <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl animate-pulse" />
                    <Database className="w-10 h-10 md:w-16 md:h-16 text-primary mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] md:text-xs font-black text-white uppercase tracking-[0.2em] text-center px-4 leading-tight">Cerebro Central</span>

                    {/* Ring animations */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-15px] border border-primary/20 rounded-[3rem] border-dashed"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-30px] border border-white/5 rounded-[3.5rem]"
                    />
                </motion.div>
            </div>

            {/* Peripheral Nodes & Connections */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
                {nodes.map((node) => (
                    <g key={node.id}>
                        {/* Connecting Line with Glow */}
                        <line
                            x1="50%" y1="50%"
                            x2={node.x} y2={node.y}
                            stroke={node.color}
                            strokeWidth="1.5"
                            strokeOpacity="0.15"
                        />

                        {/* Data Pulses */}
                        {[0, 1].map((i) => (
                            <motion.circle
                                key={i}
                                r="4"
                                fill={node.color}
                                initial={{ opacity: 0 }}
                                animate={{
                                    cx: i === 0 ? ["50%", node.x] : [node.x, "50%"],
                                    cy: i === 0 ? ["50%", node.y] : [node.y, "50%"],
                                    opacity: [0, 1, 1, 0],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2.5,
                                    delay: i * 1.25 + Math.random(),
                                    ease: "easeInOut"
                                }}
                                style={{ filter: `drop-shadow(0 0 5px ${node.color})` }}
                            />
                        ))}
                    </g>
                ))}
            </svg>

            {/* Peripheral Nodes Labels/Icons */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className="absolute z-40"
                    style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                >
                    <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div
                            className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-black border-2 flex items-center justify-center shadow-2xl transition-all duration-500"
                            style={{
                                borderColor: `${node.color}40`,
                                color: node.color,
                                boxShadow: `0 0 30px ${node.color}15`
                            }}
                        >
                            <node.icon className="w-7 h-7 md:w-10 md:h-10" />
                        </div>
                        <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap bg-black/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                            {node.label}
                        </span>
                    </motion.div>
                </div>
            ))}

            {/* Overlay Info */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center px-6 z-50">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2.5 rounded-full backdrop-blur-xl shadow-2xl"
                >
                    <Share2 className="w-3.5 h-3.5 text-primary animate-pulse" />
                    <span className="text-[10px] md:text-xs font-mono font-bold text-primary uppercase tracking-[0.3em]">Sincronización Total</span>
                </motion.div>
            </div>
        </div>
    );
};

export default CrmArchitectureSimulator;
