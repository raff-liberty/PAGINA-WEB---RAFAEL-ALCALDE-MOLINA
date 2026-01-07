import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Code2, Zap, ArrowRight, Layers, Cpu, Smartphone, Database, Shield, Rocket, BarChart2, CheckCircle2, HelpCircle, Briefcase, Code, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

const WebDevelopment = () => {
    const coreValues = [
        {
            icon: Shield,
            title: "Propiedad, no Alquiler",
            desc: "Tu web es tuya. Sin cuotas mensuales de Shopify o Wix que te mantienen rehén. El código es tu activo."
        },
        {
            icon: Rocket,
            title: "Velocidad Extrema",
            desc: "Cada milisegundo es dinero. Optimizamos hasta el último byte para Google y tus usuarios."
        },
        {
            icon: Code2,
            title: "Código de Guerra",
            desc: "React + Node.js. Infraestructura robusta diseñada para aguantar tráfico real y escalar sin romperse."
        },
        {
            icon: BarChart2,
            title: "Enfoque en ROI",
            desc: "No diseñamos 'bonito'. Diseñamos para que el usuario haga scroll, lea y pulse el botón de contacto."
        }
    ];

    const techStack = [
        "React JS", "Node.js", "Vite", "Supabase", "Tailwind CSS", "Framer Motion", "VPS Dedicated"
    ];

    const webTypes = [
        {
            icon: Briefcase,
            title: "Webs Corporativas Pro",
            desc: "Diseño premium diseñado para posicionar tu marca como líder y captar leads de alto valor."
        },
        {
            icon: Code,
            title: "Aplicaciones Internas",
            desc: "Herramientas a medida para digitalizar tus procesos: CRMs, ERPs y gestores de tareas."
        },
        {
            icon: Users,
            title: "Portales de Clientes",
            desc: "Áreas privadas seguras para que tus clientes accedan a sus datos, documentos y facturas."
        }
    ];

    const faqs = [
        {
            q: "¿El código será de mi propiedad?",
            a: "Sí, al 100%. No usamos plataformas cerradas. Una vez finalizado, el código y la infraestructura son un activo de tu empresa."
        },
        {
            q: "¿Qué pasa si quiero ampliar funciones en el futuro?",
            a: "Al usar React y Node, la escalabilidad es total. Podemos añadir cualquier módulo o integración sin tener que rehacer nada."
        },
        {
            q: "¿Cómo gestionaré el contenido?",
            a: "Entregamos un panel de administración sencillo e intuitivo diseñado específicamente para tu flujo de trabajo."
        },
        {
            q: "¿La web será rápida de verdad?",
            a: "Garantizamos puntuaciones superiores a 90 en Google PageSpeed. Velocidad extrema para SEO y conversión."
        }
    ];

    return (
        <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-12 overflow-hidden selection:bg-primary selection:text-black">
            <SEO
                title="Desarrollo Web a Medida: Tu Activo Tecnológico Propio | Engorilate"
                description="No alquiles tu negocio en plataformas cerradas. Construimos herramientas digitales en propiedad: webs de alto rendimiento y apps de gestión a medida."
                keywords="desarrollo web a medida, react murcia, aplicaciones web personalizadas, programacion propia, activo digital"
            />

            {/* HERO: AUTHORITY & TECH PRIDE */}
            <section className="relative px-6 py-12 max-w-7xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-widest uppercase">
                            <Cpu className="w-3 h-3" /> Ingeniería de Alto Rendimiento
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-black mb-8 leading-[0.8] italic uppercase tracking-tighter">
                            Deja de <span className="text-white/30">Alquilar</span> <br />
                            Tu <span className="text-primary italic">Negocio</span>.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light italic">
                            Si tu negocio depende de una plantilla de WordPress lenta o de una cuota mensual de Shopify, no tienes un activo, tienes un alquiler. Nosotros construimos <strong>tu propia tecnología</strong>.
                        </p>
                        <Link to="/contact" className="bg-primary text-black font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform inline-flex items-center gap-4 shadow-[0_0_50px_rgba(110,231,183,0.3)] text-lg italic uppercase">
                            DISEÑAR MI ACTIVO DIGITAL <ArrowRight className="w-6 h-6" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* TECH STACK MARQUEE */}
            <section className="py-12 border-y border-white/5 bg-white/20 backdrop-blur-sm overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-marquee">
                    {[...techStack, ...techStack].map((tech, i) => (
                        <span key={i} className="text-white/20 text-4xl md:text-6xl font-display font-black mx-12 uppercase italic">{tech}</span>
                    ))}
                </div>
            </section>

            {/* THE "WHY CUSTOM" SECTION */}
            <section className="px-6 py-16 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-black mb-6 leading-tight uppercase italic underline decoration-primary/50 underline-offset-[12px]">
                            Por qué ir <span className="text-primary italic">A Medida</span>
                        </h2>
                        <div className="space-y-6">
                            {coreValues.map((v, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                        <v.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-black mb-3 uppercase italic tracking-tighter group-hover:text-primary transition-colors">{v.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-6 md:p-10 relative z-10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl"></div>
                            <h3 className="text-white text-2xl font-display font-black mb-6 uppercase italic text-center">Rendimiento Real</h3>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                        <span>Mobile Score</span>
                                        <span className="text-primary font-mono tracking-normal text-sm italic">99/100</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '99%' }}
                                            viewport={{ once: true }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                        <span>Time to Interactive</span>
                                        <span className="text-primary font-mono tracking-normal text-sm italic">0.4s</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                        <span>SEO Structure</span>
                                        <span className="text-primary font-mono tracking-normal text-sm italic">100/100</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                                <p className="text-gray-400 text-sm leading-relaxed text-center italic">
                                    "No construimos webs, construimos motores de prospección y eficiencia que aguantan el 'engorilamiento' de cualquier negocio."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SPECIALTIES SECTION */}
            <section className="px-6 py-12 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-black mb-4 uppercase italic">Especialidades <span className="text-primary italic">Tecnológicas</span></h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {webTypes.map((type, i) => (
                            <div key={i} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                                    <type.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-display font-black mb-4 uppercase italic tracking-tighter">{type.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{type.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE "PROCESS" SECTION */}
            <section className="px-6 py-12 bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-black uppercase italic tracking-tighter opacity-10">THE WORKFLOW</h2>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {[
                        { step: "01", title: "Auditoría Operativa", desc: "No empezamos a programar hasta que no entendemos al 100% tu negocio." },
                        { step: "02", title: "Diseño Basado en Conversión", desc: "Prototipado rápido enfocado en que el cliente compre o contacte." },
                        { step: "03", title: "Desarrollo de Élite", desc: "Programación pura sin dependencias de terceros. Limpio y rápido." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 bg-[#111] p-6 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all">
                            <span className="text-6xl font-display font-black text-white/5 group-hover:text-primary/10 transition-colors">{item.step}</span>
                            <div>
                                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
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
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center border border-white/10 p-8 md:p-16 rounded-[4rem] bg-gradient-to-br from-[#111] to-black relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-8 tracking-tighter text-white">
                            ¿Quieres el <br />
                            <span className="text-primary italic">Mejor Activo</span> <br />
                            De tu Sector?
                        </h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Propiedad total del código
                            </div>
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Velocidad extrema garantizada
                            </div>
                        </div>
                        <p className="text-gray-400 text-lg font-light italic opacity-70">
                            Deja de alquilar y empieza a construir tu patrimonio tecnológico hoy mismo.
                        </p>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10">
                        <h3 className="text-white text-xl font-black mb-6 italic uppercase">Diseñar mi proyecto</h3>
                        <ContactForm source="Web Development Page" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebDevelopment;
