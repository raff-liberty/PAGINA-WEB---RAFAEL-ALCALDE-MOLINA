import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, Bot, CreditCard, BarChart,
    CheckCircle, ArrowRight, X, Zap,
    MessageSquare, Shield, TrendingUp, Cpu
} from 'lucide-react';

const Simulators = {
    gohighlevel: () => (
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Pipeline de Leads</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                    <div className="w-2 h-2 rounded-full bg-green-500/20" />
                </div>
            </div>
            <div className="flex-1 space-y-3">
                {[
                    { name: 'Juan Pérez', status: 'Cualificado', value: '1.200€', color: 'bg-primary' },
                    { name: 'María García', status: 'Esperando Pago', value: '850€', color: 'bg-blue-500' },
                    { name: 'Carlos Ruiz', status: 'Nuevo Lead', value: '2.500€', color: 'bg-yellow-500' }
                ].map((lead, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between"
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">{lead.name}</span>
                            <span className="text-[9px] text-white/40 uppercase tracking-tighter">{lead.status}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-primary">{lead.value}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${lead.color} animate-pulse`} />
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Sincronización Total</span>
                <span className="text-[10px] text-primary font-mono">100% OK</span>
            </div>
        </div>
    ),
    claude: () => (
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-5 h-full flex flex-col font-mono">
            <div className="flex items-center gap-2 mb-4">
                <Bot className="w-4 h-4 text-white/40" />
                <span className="text-[10px] text-white/30 uppercase tracking-widest">Cognitive Logic Flow</span>
            </div>
            <div className="flex-1 space-y-4 text-[10px]">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/60">
                    <span className="text-primary">INPUT:</span> "Quiero agendar cita pero solo por la mañana"
                </div>
                <div className="flex justify-center">
                    <motion.div
                        animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Cpu className="w-5 h-5 text-primary" />
                    </motion.div>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary italic">
                    <span className="text-white/60 not-italic">OUTPUT:</span> "Entiendo perfectamente. Mañana a las 10:00 tengo un hueco libre. ¿Te va bien?"
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="p-2 border border-white/5 rounded text-[8px] text-white/20">SENTIMENT: POSITIVE</div>
                    <div className="p-2 border border-white/5 rounded text-[8px] text-white/20">CONFIDENCE: 99.8%</div>
                </div>
            </div>
        </div>
    ),
    stripe: () => {
        const [status, setStatus] = useState('pending');
        useEffect(() => {
            const timer = setTimeout(() => setStatus('success'), 2000);
            return () => clearTimeout(timer);
        }, []);
        return (
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 h-full flex flex-col items-center justify-center">
                <div className="w-full h-40 relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {status === 'pending' ? (
                            <motion.div
                                key="pending"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                                <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Procesando Pago Seguro...</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-4 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h5 className="text-white font-black uppercase italic tracking-tighter text-xl">PAGO COMPLETADO</h5>
                                    <p className="text-[10px] text-white/40 font-mono uppercase mt-1">Suscripción Activada • 0.4s</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="w-full mt-6 flex justify-between px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Facturación Auto</span>
                    <CreditCard className="w-3.5 h-3.5 text-primary opacity-50" />
                </div>
            </div>
        );
    },
    metabusiness: () => (
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">Campaña: LeadGen_HighValue</span>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[8px] text-primary/80 font-mono">LIVE</span>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <span className="text-[8px] text-white/40 uppercase font-black">Impresiones</span>
                        <div className="text-xl font-display font-black text-white italic">45.2k</div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[8px] text-white/40 uppercase font-black">CTR</span>
                        <div className="text-xl font-display font-black text-primary italic">3.4%</div>
                    </div>
                </div>
                <div className="h-24 relative flex items-end gap-1.5">
                    {[35, 45, 60, 55, 75, 90, 85].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 rounded-t-sm border-x border-white/5"
                        />
                    ))}
                    <div className="absolute top-0 right-0 p-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-black text-primary">+21%</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <BarChart className="w-3 h-3 text-white/20" />
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Segmentación IA Activa</span>
            </div>
        </div>
    )
};

const TechWalkthroughModal = ({ isOpen, onClose, tech }) => {
    if (!tech) return null;

    const Simulator = Simulators[tech.id.toLowerCase().replace(' ', '')] || (() => null);

    const vslContent = {
        gohighlevel: {
            title: "Cerebro Central de Leads",
            hook: "Deja de perder clientes por falta de seguimiento.",
            problem: "Leads que desaparecen en el olvido porque nadie les llama o escribe en los primeros 5 minutos.",
            solution: "Implementamos un CRM avanzado como un muro inquebrantable que captura, clasifica y calienta cada lead automáticamente.",
            metrics: ["+70% Tasa de Conversión", "Atención 24/7/365", "Cero Leads Olvidados"]
        },
        claude: {
            title: "Lógica de IA Generativa",
            hook: "Respuestas humanas a velocidad de máquina.",
            problem: "Los bots mediocres espantan a tus clientes. Necesitas inteligencia que de verdad aporte valor.",
            solution: "Configuramos modelos de IA avanzada para que entiendan el contexto de tu negocio y hablen como tu mejor comercial.",
            metrics: ["99% Acierto en Ventas", "Tono de Marca Premium", "Ahorro de 40h/mes"]
        },
        stripe: {
            title: "Infraestructura de Pagos",
            hook: "Convierte tu facturación en un proceso invisible.",
            problem: "Perseguir clientes para cobrar o mandar facturas manuales es una pérdida de tiempo industrial.",
            solution: "Integramos pasarelas de pago globales para que el dinero entre solo. Facturación, suscripciones y recobros en piloto automático.",
            metrics: ["Conversión +15%", "95% Menos Admin", "Cobros Instantáneos"]
        },
        metabusiness: {
            title: "Máquina de Captación",
            hook: "Filtra a los curiosos, atrae a los compradores.",
            problem: "Anuncios que traen gente sin dinero o sin interés real, quemando tu presupuesto cada mes.",
            solution: "Usamos algoritmos de captación avanzada para segmentar por comportamiento de compra, no solo por intereses genéricos.",
            metrics: ["CPL Reducido 40%", "Leads Cualificados", "Escala Predecible"]
        }
    }[tech.id.toLowerCase().replace(' ', '')];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-5xl bg-[#050505] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(34,197,94,0.15)] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row h-auto max-h-[92vh] md:max-h-[700px]"
                    >
                        {/* Static Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content Wrapper for unified scroll/layout */}
                        <div className="flex-1 flex flex-col md:flex-row min-h-0">
                            {/* Left Column (Content) */}
                            <div className="flex-1 p-8 md:p-12 md:overflow-y-auto">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                                        <tech.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] font-mono leading-none mb-1">Tecnología Industrial</h4>
                                        <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">{vslContent.title}</h3>
                                    </div>
                                </div>

                                {/* Simulator - POSITIONED BELOW TITLE ON MOBILE */}
                                <div className="block md:hidden mb-8 w-full max-w-[340px] aspect-square mx-auto relative z-10">
                                    <Simulator />
                                </div>

                                {/* Body Content */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
                                        {vslContent.hook}
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 border-l-primary border-l-2">
                                            <p className="text-white/60 text-sm italic font-light leading-relaxed">
                                                "{vslContent.problem}"
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 py-4">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            <Zap className="w-4 h-4 text-primary animate-pulse" />
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        </div>

                                        <p className="text-white/90 text-lg font-medium leading-relaxed">
                                            {vslContent.solution}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 pb-12 md:pb-0">
                                        {vslContent.metrics.map((metric, i) => (
                                            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                                <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-tight">{metric}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Simulator Desktop / CTA Both) */}
                            <div className="w-full md:w-[450px] bg-black/50 md:border-l border-white/5 p-8 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                                {/* Simulator - DESKTOP ONLY */}
                                <div className="hidden md:block relative z-10 w-full max-w-[340px] aspect-square">
                                    <Simulator />
                                </div>

                                {/* CTA Area */}
                                <div className="mt-0 md:mt-12 w-full max-w-[340px] space-y-3 relative z-10">
                                    <button className="w-full bg-primary hover:bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                                        Desplegar en mi negocio <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <p className="text-[9px] text-white/30 text-center font-mono uppercase tracking-widest">Configuración Técnica en menos de 14 días</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TechWalkthroughModal;
