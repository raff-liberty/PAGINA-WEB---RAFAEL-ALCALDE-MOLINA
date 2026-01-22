import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, CreditCard, ArrowRight } from 'lucide-react';

const FunnelSimulation = () => {
    const stages = [
        {
            id: 'phase1',
            title: 'CAPTURA',
            subtitle: 'EL GANCHO',
            desc: 'Tu cliente inicia el contacto por WhatsApp.',
            icon: MessageSquare,
            delay: 0,
            metric: '24/7'
        },
        {
            id: 'phase2',
            title: 'AGENDADO',
            subtitle: 'LA GESTIÓN',
            desc: 'Cita reservada en tu calendario real.',
            icon: Calendar,
            delay: 1.5,
            metric: 'CERO AUSENCIAS'
        },
        {
            id: 'phase3',
            title: 'CIERRE',
            subtitle: 'EL OBJETIVO',
            desc: 'Facturación confirmada y cliente feliz.',
            icon: CreditCard,
            delay: 3,
            metric: '+ VENTAS'
        }
    ];

    return (
        <div className="relative w-full max-w-4xl mx-auto p-8 rounded-[3rem] bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl group transition-all duration-700 hover:border-primary/40">
            {/* Ambient Background Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />

            {/* Header */}
            <div className="relative z-10 mb-12 flex items-center justify-between">
                <div>
                    <h3 className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Simulación de Embudo</h3>
                    <div className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">
                        De Lead <span className="text-primary">a Cliente</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">En Tiempo Real</span>
                </div>
            </div>

            {/* Funnel Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                {stages.map((stage, idx) => (
                    <React.Fragment key={stage.id}>
                        {/* Stage Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: stage.delay, duration: 0.8 }}
                            className="relative flex-1 w-full"
                        >
                            <div className="group/stage relative bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-500 overflow-hidden">
                                {/* Rim Light */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover/stage:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                                        <stage.icon className="w-7 h-7" />
                                    </div>

                                    <div>
                                        <h4 className="text-primary font-mono text-[8px] font-bold tracking-[0.4em] uppercase mb-1">{stage.subtitle}</h4>
                                        <h5 className="text-xl font-display font-black text-white italic tracking-tighter uppercase">{stage.title}</h5>
                                    </div>

                                    <p className="text-white/40 text-[10px] md:text-xs italic leading-relaxed h-8">
                                        {stage.desc}
                                    </p>

                                    <div className="pt-4 border-t border-white/5 w-full">
                                        <span className="text-[10px] font-bold text-white uppercase italic tracking-widest bg-primary/20 px-3 py-1 rounded-full">
                                            {stage.metric}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Animated Connector (Only between stages) */}
                        {idx < stages.length - 1 && (
                            <div className="relative flex items-center justify-center h-8 md:h-auto md:w-8 rotate-90 md:rotate-0">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: stage.delay + 0.5, duration: 1 }}
                                    className="w-full md:w-16 h-[1px] bg-gradient-to-r from-primary/40 to-transparent origin-left hidden md:block"
                                />
                                <motion.div
                                    animate={{
                                        x: [0, 20, 0],
                                        opacity: [0.2, 1, 0.2]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        delay: stage.delay + 0.8
                                    }}
                                    className="absolute md:-right-2"
                                >
                                    <ArrowRight className="w-4 h-4 text-primary" />
                                </motion.div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Bottom Glow */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>
    );
};

export default FunnelSimulation;
