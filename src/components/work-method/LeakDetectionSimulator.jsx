import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

const LeakDetectionSimulator = () => {
    const [scanPosition, setScanPosition] = useState(0);
    const [leaksDetected, setLeaksDetected] = useState([]);
    const [isScanning, setIsScanning] = useState(true);
    const [isFixed, setIsFixed] = useState(false);

    // Simulation cycle
    useEffect(() => {
        const sequence = async () => {
            // Reset
            setIsFixed(false);
            setIsScanning(true);
            setLeaksDetected([]);

            // Wait then detect leaks one by one
            await new Promise(r => setTimeout(r, 1000));
            setLeaksDetected(prev => [...prev, { id: 1, x: '25%', y: '30%', label: 'Fuga de Leads' }]);
            await new Promise(r => setTimeout(r, 800));
            setLeaksDetected(prev => [...prev, { id: 2, x: '70%', y: '45%', label: 'Punta de Fricción' }]);
            await new Promise(r => setTimeout(r, 800));
            setLeaksDetected(prev => [...prev, { id: 3, x: '40%', y: '75%', label: 'Abandono Checkout' }]);

            await new Promise(r => setTimeout(r, 1500));
            setIsScanning(false);
            setIsFixed(true);

            await new Promise(r => setTimeout(r, 3000));
            sequence(); // Restart
        };

        sequence();
    }, []);

    return (
        <div className="w-full aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-inner flex items-center justify-center">
            {/* Radar Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            {/* Radar Animate Ring */}
            <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-64 h-64 border border-primary/20 rounded-full"
            />

            {/* Scanning Line */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ top: '-10%' }}
                        animate={{ top: '110%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/10 to-transparent z-10 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Central Icon */}
            <div className="relative z-20">
                <motion.div
                    animate={{
                        scale: isFixed ? [1, 1.1, 1] : 1,
                        color: isFixed ? '#22c55e' : '#ffffff'
                    }}
                    className="w-20 h-20 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-xl"
                >
                    {isFixed ? <ShieldAlert className="w-10 h-10 text-primary" /> : <Search className="w-10 h-10 text-white/20" />}
                </motion.div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.3em] text-white/40">
                        {isFixed ? 'SISTEMA SEGURO' : 'ANÁLISIS DE FUGAS'}
                    </span>
                </div>
            </div>

            {/* Detected Leaks (Red Alerts) */}
            <AnimatePresence>
                {!isFixed && leaksDetected.map((leak) => (
                    <motion.div
                        key={leak.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        className="absolute z-30 flex flex-col items-center gap-1"
                        style={{ left: leak.x, top: leak.y }}
                    >
                        <div className="w-6 h-6 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                        </div>
                        <span className="text-[6px] font-bold text-red-400 uppercase bg-black/80 px-1 rounded border border-red-900/50 whitespace-nowrap">
                            {leak.label}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Fixed Status */}
            <AnimatePresence>
                {isFixed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-12 z-40 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span className="text-[7px] font-black text-primary uppercase tracking-widest italic">Puntos Ciegos Sellados</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Logic Aura */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>
    );
};

export default LeakDetectionSimulator;
