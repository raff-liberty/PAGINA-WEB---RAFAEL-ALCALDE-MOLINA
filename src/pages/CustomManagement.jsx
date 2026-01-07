import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Workflow, BarChart3, ArrowRight, Shield, Layers, Settings, ListChecks, Zap, Globe, Lock, HelpCircle, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

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
        <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-12 overflow-hidden selection:bg-primary selection:text-black">
            <SEO
                title="Sistemas de Gestión y ERP a Medida: Tu Infraestructura de Guerra | Engorilate"
                description="Deja de pelearte con Excel. Diseñamos sistemas de gestión personalizados que centralizan toda la operativa de tu negocio bajo tu control total."
                keywords="erp a medida murcia, crm personalizado pymes, software gestion operativa, automatizacion administracion"
            />

            {/* HERO: TACTICAL CONTROL */}
            <section className="relative px-6 py-12 max-w-7xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-widest uppercase">
                            <Cpu className="w-3 h-3" /> Arquitectura Operativa
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-black mb-8 leading-[0.8] italic uppercase tracking-tighter">
                            Toma el <br />
                            <span className="text-primary italic italic">Mando</span> Total.
                        </h1>
                        <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed font-light italic">
                            Si tu empresa depende de 15 Excels y de que alguien no se olvide de apuntar un dato, no tienes una empresa, tienes una bomba de relojería. Construimos tu <strong>Cerebro Central</strong>.
                        </p>
                        <Link to="/contact" className="bg-primary text-black font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform flex items-center gap-4 shadow-[0_0_50px_rgba(110,231,183,0.3)] text-lg italic uppercase">
                            DISEÑAR MI SISTEMA <ArrowRight className="w-8 h-8 text-black" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Data Visualization Mockup */}
                        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10 overflow-hidden backdrop-blur-xl">
                            <div className="flex justify-between items-center mb-10">
                                <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] opacity-50 italic">Estado Operacional</h4>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="p-6 bg-black/40 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                                    <div className="flex justify-between items-end mb-4">
                                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic font-display">Margen Neto</span>
                                        <span className="text-primary text-2xl font-black italic">+24.5%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-primary" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-xs text-gray-500 mb-1 uppercase font-black tracking-tighter">Pedidos Hoy</div>
                                        <div className="text-2xl font-black text-white italic">147</div>
                                    </div>
                                    <div className="p-5 bg-primary rounded-2xl">
                                        <div className="text-xs text-black/60 mb-1 uppercase font-black tracking-tighter">Eficiencia</div>
                                        <div className="text-2xl font-black text-black italic">98%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Glows */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
                    </motion.div>
                </div>
            </section>

            {/* MODULAR ARCHITECTURE */}
            <section className="px-6 py-12 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-display font-black mb-4 uppercase italic tracking-tighter">
                            Estructura <span className="text-primary italic">Modular</span>
                        </h2>
                        <p className="text-gray-500">No adaptas tu negocio a un software cerrado como SAP u Odoo. Nosotros adaptamos el código a la forma exacta en la que tú ganas dinero.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {modules.map((m, i) => (
                            <div key={i} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/40 transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                                    <m.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-display font-black mb-4 uppercase italic tracking-tighter">{m.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DASHBOARD EMPHASIS */}
            <section className="px-6 py-12 bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <Activity className="w-8 h-8 text-primary" />
                                <h3 className="text-white text-2xl font-display font-black uppercase italic">Dashboard en Tiempo Real</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {[80, 45, 95].map((h, i) => (
                                        <div key={i} className="h-32 bg-white/5 rounded-2xl relative overflow-hidden group">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                className="absolute bottom-0 left-0 right-0 bg-primary/40 group-hover:bg-primary transition-colors"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2 italic">KPI Global de Rendimiento</div>
                                    <div className="text-4xl font-display font-black text-primary italic">94.8%</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-display font-black mb-8 uppercase italic leading-tight">
                            Visualización y <br />
                            <span className="text-primary">Business Intelligence</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                            Convierte tus datos en decisiones. Diseñamos cuadros de mando personalizados que te muestran exactamente lo que necesitas saber para escalar: márgenes, cuellos de botella y oportunidades en tiempo real.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-white font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5 text-primary" /> Reportes automáticos semanales
                            </li>
                            <li className="flex items-center gap-3 text-white font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5 text-primary" /> Alertas preventivas de stock
                            </li>
                            <li className="flex items-center gap-3 text-white font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5 text-primary" /> Control de costes de personal
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* INTEGRATIONS MARQUEE */}
            <section className="py-10 overflow-hidden whitespace-nowrap opacity-30 border-y border-white/5 bg-white/5">
                <div className="inline-block animate-marquee-fast">
                    {[...integrations, ...integrations].map((int, i) => (
                        <span key={i} className="text-white text-4xl md:text-5xl font-display font-black mx-16 uppercase italic tracking-widest">{int}</span>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="px-6 py-12 bg-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic text-white">Preguntas <span className="text-primary italic">Frecuentes</span></h2>
                    </div>
                    <div className="grid gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4 uppercase italic tracking-tight">{faq.q}</h3>
                                <p className="text-gray-400 leading-relaxed font-light">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA: THE FORM */}
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center bg-gradient-to-br from-[#111] to-black border border-white/10 p-8 md:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-8 tracking-tighter text-white">
                            Empieza el <br />
                            <span className="text-primary italic">Control</span> <br />
                            Absoluto
                        </h2>
                        <p className="text-gray-400 text-xl font-bold mb-8 uppercase italic leading-tight opacity-80">
                            La automatización no es solo eficiencia, es la única forma de escalar sin morir en el intento.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Auditoría de procesos incluida
                            </div>
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Diseño escalable por módulos
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10">
                        <h3 className="text-white text-xl font-black mb-6 italic uppercase">Solicitar mi sistema</h3>
                        <ContactForm source="Custom Management Page" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomManagement;
