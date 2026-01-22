import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Package, CheckCircle2, Activity, DollarSign } from 'lucide-react';

const CustomManagementSimulator = () => {
    const [activeView, setActiveView] = useState(0); // 0 = revenue, 1 = stock, 2 = tasks
    const [revenue, setRevenue] = useState(0);
    const [stockLevel, setStockLevel] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);

    const views = [
        { id: 0, label: 'Ingresos', icon: DollarSign },
        { id: 1, label: 'Stock', icon: Package },
        { id: 2, label: 'Tareas', icon: CheckCircle2 }
    ];

    // Auto-cycle through views
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveView(prev => (prev + 1) % 3);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // Animate numbers when view changes
    useEffect(() => {
        // Reset and animate
        setRevenue(0);
        setStockLevel(0);
        setTasksCompleted(0);

        const timer = setTimeout(() => {
            if (activeView === 0) {
                animateValue(setRevenue, 0, 24567, 1000);
            } else if (activeView === 1) {
                animateValue(setStockLevel, 0, 94, 800);
            } else {
                animateValue(setTasksCompleted, 0, 18, 600);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [activeView]);

    const animateValue = (setter, start, end, duration) => {
        const startTime = Date.now();
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(start + (end - start) * easeOutQuad);
            setter(current);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

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
                            Panel de Control
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[8px] text-white/60 font-bold uppercase tracking-wider">
                                En Vivo
                            </span>
                        </div>
                    </div>
                    <div className="text-lg font-display font-black text-white italic uppercase tracking-tighter">
                        Dashboard Ejecutivo
                    </div>
                </div>

                {/* View Tabs */}
                <div className="relative z-10 flex gap-2 mb-6">
                    {views.map((view) => (
                        <button
                            key={view.id}
                            onClick={() => setActiveView(view.id)}
                            className={`flex-1 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeView === view.id
                                    ? 'bg-primary text-black'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                                }`}
                        >
                            <view.icon className="w-3 h-3 mx-auto mb-1" />
                            {view.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="relative z-10 min-h-[280px]">
                    <AnimatePresence mode="wait">
                        {/* Revenue View */}
                        {activeView === 0 && (
                            <motion.div
                                key="revenue"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {/* Big Number */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                            Ingresos Hoy
                                        </span>
                                    </div>
                                    <div className="text-5xl font-display font-black text-white italic mb-1">
                                        €{revenue.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-1 text-primary text-sm font-bold">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        <span>+24% vs ayer</span>
                                    </div>
                                </div>

                                {/* Mini Chart */}
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-3">
                                        Últimos 7 días
                                    </div>
                                    <div className="flex items-end justify-between gap-2 h-24">
                                        {[65, 72, 58, 81, 77, 89, 94].map((height, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                                className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t-lg relative group"
                                            >
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-primary font-bold whitespace-nowrap">
                                                    €{Math.floor(24567 * (height / 100))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Stock View */}
                        {activeView === 1 && (
                            <motion.div
                                key="stock"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {/* Stock Level */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                            Nivel de Stock
                                        </span>
                                    </div>
                                    <div className="text-5xl font-display font-black text-white italic mb-3">
                                        {stockLevel}%
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stockLevel}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-primary to-primary/60 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                        />
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className="space-y-2">
                                    {[
                                        { name: 'Producto A', stock: 94, status: 'ok' },
                                        { name: 'Producto B', stock: 67, status: 'ok' },
                                        { name: 'Producto C', stock: 23, status: 'low' },
                                        { name: 'Producto D', stock: 88, status: 'ok' }
                                    ].map((product, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`p-3 rounded-xl border ${product.status === 'low'
                                                    ? 'bg-red-500/5 border-red-500/20'
                                                    : 'bg-white/[0.02] border-white/5'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-white/80 font-medium">
                                                    {product.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-xs font-bold text-white/60">
                                                        {product.stock}%
                                                    </div>
                                                    <div className={`w-2 h-2 rounded-full ${product.status === 'low' ? 'bg-red-500' : 'bg-primary'
                                                        }`} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tasks View */}
                        {activeView === 2 && (
                            <motion.div
                                key="tasks"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {/* Tasks Completed */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                                            Tareas Completadas
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-5xl font-display font-black text-white italic">
                                            {tasksCompleted}
                                        </div>
                                        <div className="text-2xl font-display font-black text-white/40 italic">
                                            /22
                                        </div>
                                    </div>
                                    <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(tasksCompleted / 22) * 100}%` }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>

                                {/* Task List */}
                                <div className="space-y-2">
                                    {[
                                        { task: 'Revisar inventario', done: true },
                                        { task: 'Enviar facturas', done: true },
                                        { task: 'Actualizar precios', done: true },
                                        { task: 'Contactar proveedores', done: false },
                                        { task: 'Generar informe semanal', done: false }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className={`p-3 rounded-xl border flex items-center gap-3 ${item.done
                                                    ? 'bg-primary/5 border-primary/20'
                                                    : 'bg-white/[0.02] border-white/5'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${item.done
                                                    ? 'border-primary bg-primary'
                                                    : 'border-white/20'
                                                }`}>
                                                {item.done && (
                                                    <CheckCircle2 className="w-3 h-3 text-black" />
                                                )}
                                            </div>
                                            <span className={`text-xs font-medium ${item.done ? 'text-white/80 line-through' : 'text-white/60'
                                                }`}>
                                                {item.task}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none rounded-[2.5rem]" />
        </div>
    );
};

export default CustomManagementSimulator;
