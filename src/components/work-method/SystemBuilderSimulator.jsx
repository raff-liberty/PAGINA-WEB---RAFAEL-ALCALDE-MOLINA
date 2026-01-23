import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, MessageSquare, Zap, Layers } from 'lucide-react';

const SystemBuilderSimulator = () => {
    const [connectedModules, setConnectedModules] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const modules = [
        { id: 'web', icon: Layout, label: 'FRONTEND PRO', x: -60, y: -60, color: '#3B82F6' },
        { id: 'wa', icon: MessageSquare, label: 'WHATSAPP API', x: 60, y: -60, color: '#22c55e' },
        { id: 'crm', icon: Database, label: 'SISTEMA CRM', x: -60, y: 60, color: '#A855F7' },
        { id: 'ads', icon: Zap, label: 'AD ENGINE', x: 60, y: 60, color: '#F59E0B' },
    ];

    useEffect(() => {
        const sequence = async () => {
            setConnectedModules([]);
            setIsComplete(false);

            await new Promise(r => setTimeout(r, 1000));
            for (const mod of modules) {
                setConnectedModules(prev => [...prev, mod.id]);
                await new Promise(r => setTimeout(r, 600));
            }

            await new Promise(r => setTimeout(r, 800));
            setIsComplete(true);

            await new Promise(r => setTimeout(r, 3000));
            sequence();
        };

        sequence();
    }, []);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-inner flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Central Core */}
            <div className="relative z-20">
                <motion.div
                    animate={{
                        rotate: isComplete ? 360 : 0,
                        scale: isComplete ? [1, 1.05, 1] : 1,
                        boxShadow: isComplete ? '0 0 50px rgba(34,197,94,0.3)' : '0 0 0px rgba(0,0,0,0)'
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                    }}
                    className={`w-24 h-24 rounded-[2rem] bg-black border-2 flex items-center justify-center backdrop-blur-3xl transition-colors duration-500 ${isComplete ? 'border-primary' : 'border-white/10'}`}
                >
                    <Cpu className={`w-12 h-12 transition-colors duration-500 ${isComplete ? 'text-primary' : 'text-white/20'}`} />
                </motion.div>

                {/* Orbital Path */}
                <div className="absolute inset-[-40px] border border-white/5 rounded-full border-dashed animate-spin-slow opacity-30" />
            </div>

            {/* Modules */}
            {modules.map((mod) => {
                const isConnected = connectedModules.includes(mod.id);
                return (
                    <div key={mod.id} className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ x: mod.x * 2, y: mod.y * 2, opacity: 0, scale: 0.5 }}
                            animate={isConnected ? {
                                x: mod.x,
                                y: mod.y,
                                opacity: 1,
                                scale: 1
                            } : {}}
                            className="absolute"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-black/80 border flex items-center justify-center transition-all duration-500 shadow-2xl ${isConnected ? 'border-opacity-100' : 'border-opacity-20'}`}
                                    style={{ borderColor: mod.color, boxShadow: isConnected ? `0 0 20px ${mod.color}30` : 'none' }}
                                >
                                    <mod.icon className="w-6 h-6" style={{ color: isConnected ? mod.color : 'rgba(255,255,255,0.1)' }} />
                                </div>
                                <span className={`text-[6px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border backdrop-blur-md transition-all duration-500 ${isConnected ? 'bg-white text-black border-white' : 'bg-black text-white/10 border-white/10'}`}>
                                    {mod.label}
                                </span>
                            </div>

                            {/* Connection Line to Center */}
                            <AnimatePresence>
                                {isConnected && (
                                    <svg className="absolute inset-0 pointer-events-none overflow-visible" style={{ width: 0, height: 0 }}>
                                        <motion.line
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            x1="24" y1="24"
                                            x2={-mod.x + 48} y2={-mod.y + 48}
                                            stroke={mod.color}
                                            strokeWidth="1"
                                            strokeDasharray="4 2"
                                            className="opacity-20"
                                        />
                                    </svg>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                );
            })}

            {/* Progress Status */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.3em] text-white/40">
                        {isComplete ? 'INFRAESTRUCTURA LISTA' : 'CONSTRUYENDO MOTOR'}
                    </span>
                    <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${(connectedModules.length / modules.length) * 100}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Logic Aura */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isComplete ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full" />
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full" />
            </div>
        </div>
    );
};

export default SystemBuilderSimulator;
