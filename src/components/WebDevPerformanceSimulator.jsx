import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Monitor, Gauge, Code2, Shield } from 'lucide-react';

const WebDevPerformanceSimulator = () => {
    const [score, setScore] = useState(0);
    const [metrics, setMetrics] = useState({
        fcp: 0,
        lcp: 0,
        cls: 0
    });
    const [activeDevice, setActiveDevice] = useState('desktop'); // desktop, mobile, tablet

    // Animate score on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            animateValue(setScore, 0, 99, 2000);

            // Animate metrics with delays
            setTimeout(() => animateValue((val) => setMetrics(prev => ({ ...prev, fcp: val })), 0, 0.4, 800), 500);
            setTimeout(() => animateValue((val) => setMetrics(prev => ({ ...prev, lcp: val })), 0, 0.8, 800), 800);
            setTimeout(() => animateValue((val) => setMetrics(prev => ({ ...prev, cls: val })), 0, 0.02, 800), 1100);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const animateValue = (setter, start, end, duration) => {
        const startTime = Date.now();
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = progress * (2 - progress);
            const current = start + (end - start) * easeOutQuad;
            setter(end === 99 ? Math.floor(current) : parseFloat(current.toFixed(2)));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

    const devices = [
        { id: 'desktop', icon: Monitor, label: 'Desktop' },
        { id: 'mobile', icon: Smartphone, label: 'Mobile' },
    ];

    return (
        <div className="relative w-full max-w-[380px] mx-auto">
            {/* Main Container */}
            <div className="relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2.5rem] p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden group">
                {/* Rim Light */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Ambient Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

                {/* Header */}
                <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-primary font-mono text-[9px] font-bold tracking-[0.3em] uppercase">
                            Google Lighthouse
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            <Gauge className="w-3 h-3 text-primary" />
                            <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                Análisis
                            </span>
                        </div>
                    </div>
                    <div className="text-lg font-display font-black text-white italic uppercase tracking-tighter">
                        Rendimiento Web
                    </div>
                </div>

                {/* Device Selector */}
                <div className="relative z-10 flex gap-2 mb-6">
                    {devices.map((device) => (
                        <button
                            key={device.id}
                            onClick={() => setActiveDevice(device.id)}
                            className={`flex-1 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${activeDevice === device.id
                                    ? 'bg-primary text-black'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                                }`}
                        >
                            <device.icon className="w-3 h-3" />
                            {device.label}
                        </button>
                    ))}
                </div>

                {/* Main Score Circle */}
                <div className="relative z-10 flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                        {/* Background Circle */}
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Animated Progress Circle */}
                            <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="url(#scoreGradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 440" }}
                                animate={{
                                    strokeDasharray: `${(score / 100) * 440} 440`,
                                }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#22c55e" />
                                    <stop offset="100%" stopColor="#16a34a" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Score Number */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                className="text-6xl font-display font-black text-white italic"
                            >
                                {score}
                            </motion.div>
                            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                /100
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="relative z-10 space-y-3">
                    {/* FCP - First Contentful Paint */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                    First Contentful Paint
                                </span>
                            </div>
                            <span className="text-sm font-display font-black text-primary italic">
                                {metrics.fcp}s
                            </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "95%" }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-primary to-primary/60"
                            />
                        </div>
                    </motion.div>

                    {/* LCP - Largest Contentful Paint */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Code2 className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                    Largest Contentful Paint
                                </span>
                            </div>
                            <span className="text-sm font-display font-black text-primary italic">
                                {metrics.lcp}s
                            </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "92%" }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-primary to-primary/60"
                            />
                        </div>
                    </motion.div>

                    {/* CLS - Cumulative Layout Shift */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                    Cumulative Layout Shift
                                </span>
                            </div>
                            <span className="text-sm font-display font-black text-primary italic">
                                {metrics.cls}
                            </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "98%" }}
                                transition={{ delay: 1.1, duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-primary to-primary/60"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="relative z-10 mt-6 pt-4 border-t border-white/5"
                >
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
                            <div className="text-2xl font-display font-black text-primary italic mb-0.5">
                                100%
                            </div>
                            <div className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                Propiedad
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
                            <div className="text-2xl font-display font-black text-primary italic mb-0.5">
                                0.4s
                            </div>
                            <div className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                Carga Total
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none rounded-[2.5rem]" />
        </div>
    );
};

export default WebDevPerformanceSimulator;
