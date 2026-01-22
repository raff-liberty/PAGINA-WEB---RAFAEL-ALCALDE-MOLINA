import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Workflow, BarChart3, ArrowRight, Shield, Layers, Settings, ListChecks, Zap, Globe, Lock, HelpCircle, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import BackgroundMesh from '../components/BackgroundMesh';

const CustomManagement = () => {
    const modules = [
        {
            icon: BarChart3,
            title: "Control en Vivo",
            desc: "Facturación, stock y rendimiento neto en una sola pantalla. Sin sorpresas a final de trimestre."
        },
        {
            icon: Workflow,
            title: "Procesos Blindados",
            desc: "Eliminamos el error humano. Tus empleados siguen el sistema diseñado por ti, al milímetro."
        },
        {
            icon: Globe,
            title: "Omnicanal Real",
            desc: "Punto de venta, web, preventa móvil y backoffice sincronizados en milisegundos."
        },
        {
            icon: Lock,
            title: "Seguridad Militar",
            desc: "Tus datos son tu activo más valioso. Los protegemos en infraestructura propia cifrada."
        }
    ];

    const integrations = ["FacturaDirecta", "Stripe", "WhatsApp API", "Holded", "Google Cloud", "Shopify", "Instagram Shopping"];

    const faqs = [
        {
            q: "¿Se integra con las herramientas que ya uso?",
            a: "Sí. Diseñamos el sistema para que se conecte con tu banco, CRM actual, WhatsApp o cualquier plataforma con API. La meta es centralizar, no duplicar trabajo."
        },
        {
            q: "¿Es seguro tener mis datos en un sistema propio?",
            a: "Es mucho más seguro que tenerlos en nubes públicas o archivos locales. Usamos encriptación de grado bancario y servidores dedicados protegidos."
        },
        {
            q: "¿Qué pasa si mis empleados no saben usarlo?",
            a: "El sistema se diseña basándose en vuestro flujo de trabajo real, no al revés. La interfaz es tan intuitiva que la formación suele durar menos de una hora."
        },
        {
            q: "¿Puedo acceder desde fuera de la oficina?",
            a: "Totalmente. El sistema es cloud-native, lo que te permite supervisar toda la operativa desde tu móvil o tablet en cualquier lugar del mundo."
        }
    ];

    return (
        <div className="relative pt-32 md:pt-40 pb-20 min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black overflow-hidden">
            <SEO
                title="Gestión y Control Total: El Cerebro de tu Negocio | Engorilate"
                description="Deja de pelearte con Excel. Diseñamos sistemas de gestión personalizados que centralizan toda la operativa de tu negocio bajo tu control total."
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
                        className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm self-start"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <span className="text-primary text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                                Gestión y Control de Operaciones
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white mb-8 uppercase italic pr-2"
                            >
                                TU NEGOCIO <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">BAJO CONTROL.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed italic mb-10 border-l-2 lg:border-l-4 border-primary/40 pl-4 md:pl-6"
                            >
                                Creamos el <span className="text-white font-bold">Cerebro Central</span> de tu empresa. Un sistema a medida que organiza tus ventas, stock y tareas automáticamente para que dejes de perder tiempo en Excel y tareas repetitivas.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link to="/contact" className="group/btn relative bg-primary hover:bg-white text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)] text-sm overflow-hidden inline-flex">
                                    <span className="relative z-10">DISEÑAR MI SISTEMA</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-4 hidden lg:block">
                            <div className="bg-[#0a0a0a] border border-white/[0.15] rounded-[2.5rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] relative overflow-hidden group">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

                                <div className="relative z-10 space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white uppercase italic">LA CLAVE:</h3>
                                    <p className="text-white/60 text-sm italic leading-relaxed">
                                        Eliminamos el caos de papeles y hojas de cálculo. Centralizamos todo en una herramienta que cualquiera puede usar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODULAR ARCHITECTURE - Mirroring Home Grids Style */}
                <div className="my-20">
                    <div className="mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white">
                            Módulos <br />
                            <span className="text-primary italic">para tu medida</span>
                        </h2>
                        <p className="text-white/50 max-w-2xl mt-4 italic">No adaptas tu negocio a un programa cerrado. Nosotros creamos el programa que encaja con tu forma de trabajar.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {modules.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2rem] p-8 overflow-hidden hover:border-primary/60 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
                            >
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-700 mb-6">
                                    <m.icon className="w-6 h-6 text-white/40 group-hover:text-primary transition-all duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-4">{m.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed italic">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* THE SYSTEM REASONING - COMPACT & CLEAR */}
                <div className="grid lg:grid-cols-2 gap-12 items-center my-20">
                    <div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white mb-6">
                            Datos reales. <br />
                            <span className="text-primary italic">Decisiones mejores</span>.
                        </h2>
                        <div className="space-y-6">
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">Informes Automáticos</h4>
                                        <p className="text-white/50 text-xs md:text-sm leading-relaxed italic">Recibe cada semana un resumen de tus beneficios, ventas y stock sin mover un dedo.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">Control de Stock</h4>
                                        <p className="text-white/50 text-xs md:text-sm leading-relaxed italic">Avisos automáticos cuando te queda poco material para que nunca dejes de producir.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">Tareas de Empleados</h4>
                                        <p className="text-white/50 text-xs md:text-sm leading-relaxed italic">Organiza el trabajo de tu equipo y supervisa los avances desde tu propio móvil.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/[0.15] p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:border-primary/40 transition-all duration-700 group/results">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full group-hover/results:bg-primary/20 transition-all duration-700" />

                        <h3 className="relative z-10 text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-8">Estado del Negocio</h3>

                        <div className="grid gap-4">
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic">Beneficio Neto</span>
                                    <span className="text-primary text-2xl font-black italic">+24%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="text-3xl font-display font-black text-white italic mb-1">98%</div>
                                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-tight">PRECISIÓN STOCK</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-primary text-black">
                                    <div className="text-3xl font-display font-black italic mb-1">En Vivo</div>
                                    <p className="text-black/60 text-[10px] uppercase font-bold tracking-widest leading-tight">CONTROL TOTAL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* INTEGRATIONS MARQUEE */}
            <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-marquee-fast opacity-30">
                    {[...integrations, ...integrations].map((int, i) => (
                        <span key={i} className="text-white text-3xl md:text-5xl font-display font-black mx-12 uppercase italic tracking-widest">{int}</span>
                    ))}
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic text-white tracking-tighter">Dudas <span className="text-primary italic">y Respuestas</span></h2>
                </div>
                <div className="grid gap-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl font-bold text-white mb-4 uppercase italic tracking-tight">{faq.q}</h3>
                            <p className="text-white/50 leading-relaxed font-light italic">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FINAL CTA: THE FORM */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <DiagnosisCTA className="mb-20" />

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center border border-white/10 p-8 md:p-16 rounded-[3rem] bg-[#0a0a0a] relative overflow-hidden shadow-2xl mb-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-8 tracking-tighter text-white">
                            Empezar el <br />
                            <span className="text-primary italic">Control</span> <br />
                            Total
                        </h2>
                        <p className="text-white/60 text-xl font-bold mb-8 uppercase italic leading-tight">
                            El único sistema que se adapta a ti, y no al revés.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Análisis previo gratuito
                            </div>
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Propiedad 100% tuya
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                        <h3 className="text-white text-xl font-black mb-6 italic uppercase">Cuéntanos tu caso</h3>
                        <ContactForm source="Custom Management Page" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomManagement;
