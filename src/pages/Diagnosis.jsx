import React, { useRef } from 'react';
import DiagnosisForm from '../components/diagnosis/DiagnosisForm';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, ArrowDown, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const Diagnosis = () => {
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
            <SEO
                title="Diagnóstico de Eficiencia Operativa | Engorilate"
                description="Descubre los cuellos de botella de tu negocio en 7 minutos. Recibe un informe personalizado analizado por IA para eliminar el caos."
            />

            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full grid-pattern opacity-10"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase"
                    >
                        <Zap className="w-3 h-3" /> Exclusivo para Dueños de Negocio
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight"
                    >
                        Diagnóstico de <br />
                        <span className="text-primary italic">Eficiencia Operativa</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        Deja de adivinar por qué tu negocio no escala. <br className="hidden md:block" />
                        Obtén un <span className="text-white font-medium">diagnóstico clínico</span> de tus procesos analizado por nuestra IA en menos de 7 minutos.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <button
                            onClick={scrollToForm}
                            className="group relative px-10 py-5 bg-primary text-background-dark rounded-full text-xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-[0_20px_50px_rgba(110,231,183,0.3)]"
                        >
                            Empezar Diagnóstico Gratis
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-12 flex flex-col items-center gap-4 text-gray-500"
                    >
                        <p className="text-sm font-medium uppercase tracking-widest">Haz scroll para ver qué analizamos</p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowDown className="w-5 h-5 text-primary" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* BENEFITS SECTION */}
            <section className="relative z-10 py-24 px-6 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: Brain,
                            title: "Análisis por IA",
                            desc: "Nuestra IA procesa tus respuestas comparándolas con patrones de éxito en tu sector para detectar fugas de dinero."
                        },
                        {
                            icon: Clock,
                            title: "Informe Instantáneo",
                            desc: "Recibe tu 'Hoja de Ruta Anti-Caos' en tu WhatsApp o Email segundos después de finalizar."
                        },
                        {
                            icon: ShieldCheck,
                            title: "100% Privado",
                            desc: "Tus datos operativos son tratados con máxima confidencialidad. Los usamos solo para tu diagnóstico."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-colors group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-display font-bold text-gray-500 mb-12 uppercase tracking-widest text-sm">Lo que revelará tu diagnóstico:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
                        <div className="flex flex-col items-center gap-2">
                            <TrendingUp className="w-8 h-8 text-white" />
                            <span className="text-[10px] font-bold uppercase">Potencial de Escala</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Zap className="w-8 h-8 text-white" />
                            <span className="text-[10px] font-bold uppercase">Fugas de Tiempo</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Brain className="w-8 h-8 text-white" />
                            <span className="text-[10px] font-bold uppercase">Nivel Tecnológico</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Target className="w-8 h-8 text-white" />
                            <span className="text-[10px] font-bold uppercase">Mapa de Acción</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section ref={formRef} className="relative z-10 py-24 px-6 mb-20">
                <div className="max-w-4xl mx-auto bg-[#111] border border-white/20 rounded-[3rem] p-8 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
                    {/* Background glow for form */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>

                    <DiagnosisForm />
                </div>
            </section>

            {/* Floating decoration */}
            <motion.div
                className="fixed bottom-10 right-10 z-0 opacity-10 hidden lg:block"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="text-[15rem] font-display font-black text-white/5 select-none pointer-events-none">
                    DIAGNÓSTICO
                </div>
            </motion.div>
        </div>
    );
};

export default Diagnosis;
