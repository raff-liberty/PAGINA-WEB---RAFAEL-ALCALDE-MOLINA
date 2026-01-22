import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Layout, Code2, Zap, ArrowRight, Layers, Cpu, Smartphone, Database, Shield, Rocket, BarChart2, CheckCircle2, HelpCircle, Briefcase, Code, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import BackgroundMesh from '../components/BackgroundMesh';
import WebDevPerformanceSimulator from '../components/WebDevPerformanceSimulator';

const WebDevelopment = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const coreValues = [
        {
            icon: Shield,
            title: "Propiedad Total",
            desc: "Tu web es tuya al 100%. Sin cuotas mensuales de plataformas externas que te mantienen atado."
        },
        {
            icon: Rocket,
            title: "Velocidad Extrema",
            desc: "Garantizamos que tu web cargue al instante para no perder ni un solo cliente por lentitud."
        },
        {
            icon: Code2,
            title: "Código Robusto",
            desc: "Usamos la tecnología que usan los gigantes para que tu web aguante cualquier cantidad de visitas."
        },
        {
            icon: BarChart2,
            title: "Diseño para Vender",
            desc: "No solo hacemos webs bonitas; diseñamos cada rincón para que el usuario te acabe llamando."
        }
    ];

    const techStack = [
        "React JS", "Node.js", "Vite", "Supabase", "Tailwind CSS", "Framer Motion", "VPS Dedicated"
    ];

    const webTypes = [
        {
            icon: Briefcase,
            title: "Webs de Empresa Pro",
            desc: "Diseño exclusivo para diferenciarte de tu competencia y atraer clientes de calidad."
        },
        {
            icon: Code,
            title: "Herramientas a Medida",
            desc: "Creamos programas internos para digitalizar tus tareas y ahorrarte horas cada día."
        },
        {
            icon: Users,
            title: "Áreas de Clientes",
            desc: "Espacios privados donde tus clientes puedan ver sus facturas y documentos de forma segura."
        }
    ];

    const steps = [
        {
            num: "01",
            title: "Estrategia",
            text: "No picamos código sin un plan. Definimos la arquitectura pensada para que tú vendas más."
        },
        {
            num: "02",
            title: "Desarrollo",
            text: "Construimos con el stack más moderno. Código limpio, rápido y escalable desde el minuto uno."
        },
        {
            num: "03",
            title: "Lanzamiento",
            text: "Auditamos cada milisegundo antes de salir. Tu web nace optimizada al 100% para Google."
        }
    ];

    const faqs = [
        {
            icon: Shield,
            q: "¿El código será mío para siempre?",
            a: "Sí. Una vez terminamos, el código es un activo de tu empresa. No dependes de nosotros ni de cuotas fijas para que funcione."
        },
        {
            icon: Layers,
            q: "¿Podré añadir cosas en el futuro?",
            a: "Por supuesto. Al estar hecha a medida, podemos ampliarla y añadir cualquier función que necesites sin límites."
        },
        {
            icon: Code2,
            q: "¿Cómo cambio los textos o fotos?",
            a: "Te entregamos un panel de control muy fácil de usar para que tú mismo gestiones tu web sin saber de programación."
        },
        {
            icon: Zap,
            q: "¿Será rápida de verdad?",
            a: "Totalmente. Pasamos los tests de Google con la máxima puntuación. Una web rápida ayuda a salir antes en resultados."
        }
    ];

    return (
        <div className="relative pt-24 md:pt-40 pb-20 min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black overflow-hidden">
            <SEO
                title="Desarrollo Web en Propiedad: Tu Máquina de Ventas | Engorilate"
                description="No alquiles tu negocio en plataformas cerradas. Construimos herramientas digitales en propiedad: webs de alto rendimiento y apps de gestión a medida."
            />
            <BackgroundMesh />

            {/* Ambient Atmosphere (Mirroring Home) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" />
                <div className="absolute bottom-[5%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" style={{ animationDuration: '8s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* HERO SECTION - Mirroring Home Layout but Compact */}
                <div className="flex flex-col mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-4 md:mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm self-start"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <span className="text-primary text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                                Desarrollo Web en Propiedad
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1] md:leading-[0.9] tracking-tight text-white mb-6 md:mb-8 uppercase italic pr-2"
                            >
                                TU ACTIVO <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">SIN LÍMITES.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed italic mb-6 md:mb-10 border-l-2 lg:border-l-4 border-primary/40 pl-4 md:pl-6"
                            >
                                Deja de alquilar tu web en plataformas que no controlas. Construimos <span className="text-white font-bold">Herramientas Digitales</span> de alto rendimiento que son propiedad de tu negocio para siempre.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="hidden md:block"
                            >
                                <Link to="/contact" className="group/btn relative bg-primary hover:bg-white text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)] text-sm overflow-hidden inline-flex">
                                    <span className="relative z-10">DISEÑAR MI PROYECTO</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-12 xl:col-span-4 flex flex-col items-center xl:items-end mt-12 xl:mt-0 px-4 md:px-0">
                            <WebDevPerformanceSimulator />

                            {/* Subtler Mobile CTA */}
                            <motion.button
                                onClick={() => document.getElementById('contact-form-main')?.scrollIntoView({ behavior: 'smooth' })}
                                className="xl:hidden mt-8 w-full max-w-[320px] py-4 rounded-2xl border border-primary/30 bg-primary/5 text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-black transition-all"
                            >
                                Diseñar Mi Proyecto ↓
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* TECH MARQUEE */}
                <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden whitespace-nowrap mb-10 md:mb-20">
                    <div className="inline-block animate-marquee-fast opacity-30">
                        {[...techStack, ...techStack].map((tech, i) => (
                            <span key={i} className="text-white text-3xl md:text-5xl font-display font-black mx-12 uppercase italic tracking-widest">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* CORE VALUES */}
                <div className="my-10 md:my-20">
                    <div className="mb-8 md:mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white">
                            Por qué ir <br />
                            <span className="text-primary italic">a medida</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {coreValues.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[1.5rem] md:rounded-[2rem] p-6 overflow-hidden hover:border-primary/60 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
                            >
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-700 shrink-0">
                                        <v.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-all duration-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white uppercase italic tracking-tighter leading-tight">{v.title}</h3>
                                </div>

                                <p className="text-white/80 text-base leading-relaxed font-medium italic">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* THE SYSTEM REASONING - COMPACT & CLEAR */}
                <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center my-10 md:my-20">
                    <div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white mb-6">
                            Soluciones que <br />
                            <span className="text-primary italic">impulsan tu negocio</span>.
                        </h2>
                        <div className="space-y-6">
                            {webTypes.map((type, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <type.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">{type.title}</h4>
                                        <p className="text-white/80 text-base leading-relaxed font-medium italic">{type.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/[0.15] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden shadow-2xl hover:border-primary/40 transition-all duration-700 group/results">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                        <div className="absolute -bottom-20 -right-20 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-primary/10 blur-[100px] rounded-full group-hover/results:bg-primary/20 transition-all duration-700" />

                        <h3 className="relative z-10 text-primary font-mono text-[9px] font-bold tracking-[0.3em] uppercase mb-6">Rendimiento Tecnológico</h3>

                        <div className="space-y-4">
                            <div className="p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic">Puntuación Google</span>
                                    <span className="text-primary text-2xl font-black italic">99/100</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: '99%' }} className="h-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="text-2xl md:text-3xl font-display font-black text-white italic mb-1">0.4s</div>
                                    <p className="text-white/40 text-[8px] md:text-[10px] uppercase font-bold tracking-widest leading-tight">CARGA RÉCORD</p>
                                </div>
                                <div className="p-4 md:p-5 rounded-2xl bg-primary text-black">
                                    <div className="text-2xl md:text-3xl font-display font-black italic mb-1">100%</div>
                                    <p className="text-black/60 text-[8px] md:text-[10px] uppercase font-bold tracking-widest leading-tight">TU PROPIEDAD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STEPS - PREMIUM DARK THEME */}
            <section className="px-6 py-12 md:py-24 bg-[#020202] relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-20">
                        <h2 className="text-3xl md:text-6xl font-display font-black uppercase italic tracking-tighter text-white">
                            Proceso <span className="text-primary italic">Sin Límites</span>
                        </h2>
                        <p className="text-white/70 text-[10px] md:text-base mt-3 max-w-xl mx-auto font-medium italic uppercase tracking-widest">
                            Tres fases para construir tu patrimonio tecnológico.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {steps.map((s, i) => (
                            <div key={i} className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2rem] p-6 md:p-10 overflow-hidden hover:border-primary/40 transition-all duration-700">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                                <div className="text-6xl md:text-8xl font-display font-black text-primary/5 absolute -top-2 -right-1 transform group-hover:scale-110 transition-all duration-700">{s.num}</div>

                                <div className="relative z-10">
                                    <div className="flex flex-row items-center gap-4 mb-6 relative">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary group-hover:scale-110 transition-all shrink-0">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-display font-black uppercase italic leading-none text-white m-0 p-0">{s.title}</h3>
                                    </div>
                                    <p className="text-white/80 text-base leading-relaxed font-medium italic">{s.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION - ENHANCED VISUALS */}
            <section className="px-6 py-12 md:py-24 bg-[#020202]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                        <HelpCircle className="w-10 h-10 md:w-12 h-12 text-primary mx-auto mb-4 md:mb-6 relative z-10" />
                        <h2 className="text-3xl md:text-6xl font-display font-black uppercase italic text-white relative z-10 tracking-tighter">
                            Dudas <span className="text-primary italic">y Respuestas</span>
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`group bg-[#0a0a0a] border ${expandedFaq === i ? 'border-primary/40' : 'border-white/10'} rounded-2xl overflow-hidden transition-all duration-500`}
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${expandedFaq === i ? 'text-primary' : 'text-primary/40'} border border-white/10 transition-all`}>
                                            <faq.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white uppercase italic tracking-tight">{faq.q}</h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                                        className="text-primary/40"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="pl-14 text-gray-200 leading-relaxed font-medium italic text-base">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="contact-form-main" className="mb-10 md:mb-20">
                <section className="px-6 py-12 md:py-24 bg-[#020202]">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center border border-white/10 p-6 md:p-16 rounded-[2.5rem] md:rounded-[3rem] bg-[#0a0a0a] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-6 md:mb-8 tracking-tighter text-white">
                                ¿Quieres el <br />
                                <span className="text-primary italic">Mejor Activo</span> <br />
                                De tu Sector?
                            </h2>
                            <p className="text-white/60 text-lg md:text-xl font-bold mb-6 md:mb-8 uppercase italic leading-tight">
                                Deja de alquilar y empieza a construir tu patrimonio tecnológico hoy mismo.
                            </p>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-[11px] md:text-sm">
                                    <CheckCircle className="w-4 h-4 md:w-5 h-5" /> Propiedad total
                                </div>
                                <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-[11px] md:text-sm">
                                    <CheckCircle className="w-4 h-4 md:w-5 h-5" /> Rapidez garantizada
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 bg-white/5 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10">
                            <h3 className="text-white text-lg md:text-xl font-black mb-4 md:mb-6 italic uppercase">Cuéntanos tu proyecto</h3>
                            <ContactForm source="Web Development Page" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WebDevelopment;
