import React from 'react';
import { motion } from 'framer-motion';
import {
    MemoryStick as Memory,
    CheckCircle,
    XCircle,
    ArrowRight,
    Zap,
    Globe,
    MessageSquare,
    Target,
    Layout,
    Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';

const WorkMethod = () => {
    return (
        <div className="relative pt-64 pb-48 min-h-screen selection:bg-primary selection:text-black">
            <SEO
                title="Cómo Trabajamos | Metodología de Automatización | Engorilate"
                description="Nuestra metodología de automatización para pequeños negocios. Orden antes que tecnología. Recupera horas de tu vida sin humo."
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* HERO SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-32 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <Zap className="w-3 h-3" />
                        Metodología Única
                    </div>
                    <h1 className="font-display text-5xl md:text-8xl font-bold leading-tight mb-8 text-white tracking-tight">
                        Primero el <span className="text-primary italic">orden</span>, <br />
                        luego la <span className="text-white/40">tecnología</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed italic">
                        No colecciones software. Diseña el motor que tu negocio necesita para recuperar el control de tu tiempo y tu vida.
                    </p>
                </motion.div>

                {/* BEFORE / AFTER COMPARISON */}
                <div className="mb-48">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Current Situation (X) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#1a1a1a] border border-red-500/20 p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-red-500/40 transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full group-hover:bg-red-500/10 transition-all"></div>
                            <h3 className="text-red-400 font-display text-3xl font-bold mb-8 flex items-center gap-4 italic tracking-tight">
                                <XCircle className="w-8 h-8" /> Tu situación actual
                            </h3>
                            <ul className="space-y-6 text-gray-400 text-lg font-light italic">
                                <li className="flex items-start gap-4">
                                    <span className="text-red-500/50 mt-1 font-bold text-2xl">×</span>
                                    <span>Interrupciones constantes en WhatsApp que fragmentan tu día.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-red-500/50 mt-1 font-bold text-2xl">×</span>
                                    <span>Tardes robadas por la facturación y los recordatorios manuales.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-red-500/50 mt-1 font-bold text-2xl">×</span>
                                    <span>Techo de crecimiento: "Si entran más clientes, exploto".</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-red-500/50 mt-1 font-bold text-2xl">×</span>
                                    <span>Gestión reactiva, sin datos reales para tomar decisiones.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Engorilate Method (Check) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#1a1a1a] border border-primary/20 p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-primary/40 transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all"></div>
                            <h3 className="text-primary font-display text-3xl font-bold mb-8 flex items-center gap-4 italic tracking-tight">
                                <CheckCircle className="w-8 h-8" /> El Método Engorilate
                            </h3>
                            <ul className="space-y-6 text-gray-300 text-lg font-medium">
                                <li className="flex items-start gap-4">
                                    <span className="text-primary mt-1 text-2xl">✓</span>
                                    <span>Atención y captación automática 24/7 sin tu intervención.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-primary mt-1 text-2xl">✓</span>
                                    <span>Facturación instantánea y cobros automatizados.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-primary mt-1 text-2xl">✓</span>
                                    <span>Escalabilidad técnica: haz el doble de trabajo con el mismo equipo.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-primary mt-1 text-2xl">✓</span>
                                    <span>Paz mental absoluta. Tu negocio no depende de tu memoria.</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* STEPS GRID */}
                <div className="mb-48">
                    <div className="text-center mb-24">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight italic">
                            Tu hoja de <span className="text-primary">ruta al control</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 hidden md:block"></div>
                        <div className="absolute left-1/2 top-0 h-full w-px bg-white/5 -z-10 hidden md:block"></div>

                        {/* Step 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/40 transition-all duration-700 shadow-[0_32px_120px_rgba(0,0,0,1)]"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
                            <div className="relative z-10 text-primary font-mono text-xs uppercase tracking-[3px] mb-6 font-bold flex items-center gap-2">
                                <span className="w-8 h-px bg-primary/30"></span> 01. Auditoría Real
                            </div>
                            <h3 className="relative z-10 font-display text-2xl font-bold text-white mb-4 tracking-tight">Analizar antes de tocar</h3>
                            <p className="relative z-10 text-gray-400 font-light italic leading-relaxed mb-8">
                                "Identificamos dónde se te escapa el tiempo hoy. No suponemos, medimos fugas reales en tu operativa diaria."
                            </p>
                            <div className="relative z-10 bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner">
                                <p className="text-primary text-xs uppercase font-black tracking-widest mb-3 italic">Impacto Inmediato:</p>
                                <ul className="text-sm text-gray-300 space-y-2 italic font-light">
                                    <li>• Mapa de 'fugas industriales'</li>
                                    <li>• Checklist prioritario de ahorro</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-[2rem] relative overflow-hidden group hover:border-blue-400/40 transition-all duration-700 shadow-[0_32px_120px_rgba(0,0,0,1)]"
                        >
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400/10 blur-[100px] rounded-full group-hover:bg-blue-400/20 transition-all duration-700"></div>
                            <div className="relative z-10 text-blue-400 font-mono text-xs uppercase tracking-[3px] mb-6 font-bold flex items-center gap-2">
                                <span className="w-8 h-px bg-blue-400/30"></span> 02. Simplificación
                            </div>
                            <h3 className="relative z-10 font-display text-2xl font-bold text-white mb-4 tracking-tight">Las Reglas del Juego</h3>
                            <p className="relative z-10 text-gray-400 font-light italic leading-relaxed mb-8">
                                "Simplificamos tus procesos antes de meter tecnología. Si el proceso está roto, automatizarlo solo lo acelera."
                            </p>
                            <div className="relative z-10 bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner">
                                <p className="text-blue-400 text-xs uppercase font-black tracking-widest mb-3 italic">Entregable:</p>
                                <ul className="text-sm text-gray-300 space-y-2 italic font-light">
                                    <li>• Workflow operativo documentado</li>
                                    <li>• Lógica de negocio blindada</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-[2rem] relative overflow-hidden group hover:border-purple-400/40 transition-all duration-700 shadow-[0_32px_120px_rgba(0,0,0,1)]"
                        >
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-400/10 blur-[100px] rounded-full group-hover:bg-purple-400/20 transition-all duration-700"></div>
                            <div className="relative z-10 text-purple-400 font-mono text-xs uppercase tracking-[3px] mb-6 font-bold flex items-center gap-2">
                                <span className="w-8 h-px bg-purple-400/30"></span> 03. Construcción
                            </div>
                            <h3 className="relative z-10 font-display text-2xl font-bold text-white mb-4 tracking-tight">El Smart Hub Central</h3>
                            <p className="relative z-10 text-gray-400 font-light italic leading-relaxed mb-8">
                                "Conectamos tus sistemas y construimos el motor (CRM/API) que ejecuta el trabajo sucio por ti."
                            </p>
                            <div className="relative z-10 bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner">
                                <p className="text-purple-400 text-xs uppercase font-black tracking-widest mb-3 italic">Corazón Técnico:</p>
                                <ul className="text-sm text-gray-300 space-y-2 italic font-light">
                                    <li>• Arquitectura CRM conectada</li>
                                    <li>• Agente Virtual configurado</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Step 4 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/40 transition-all duration-700 shadow-[0_32px_120px_rgba(0,0,0,1)]"
                        >
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
                            <div className="relative z-10 text-primary font-mono text-xs uppercase tracking-[3px] mb-6 font-bold flex items-center gap-2">
                                <span className="w-8 h-px bg-primary/30"></span> 04. Escala Real
                            </div>
                            <h3 className="relative z-10 font-display text-2xl font-bold text-white mb-4 tracking-tight">Despegue y Seguimiento</h3>
                            <p className="relative z-10 text-gray-400 font-light italic leading-relaxed mb-8">
                                "Lanzamos al mundo, probamos al límite y te acompañamos durante el primer mes de vida real del sistema."
                            </p>
                            <div className="relative z-10 bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner">
                                <p className="text-primary text-xs uppercase font-black tracking-widest mb-3 italic">Seguridad:</p>
                                <ul className="text-sm text-gray-300 space-y-2 italic font-light">
                                    <li>• 100% Autopiloto verificado</li>
                                    <li>• 30 días de soporte preferente</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ECOSISTEMA WRAPPER */}
                <div className="mb-48 relative">
                    <div className="text-center mb-24">
                        <h2 className="font-display text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight italic">
                            Ecosistema de <span className="text-primary text-shadow-glow">Soluciones</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light italic">
                            Diseñamos una experiencia de usuario impecable que alimenta tu Hub centralizado y ejecuta procesos en la sombra.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                stage: "01. Impresión",
                                title: "Web Corporativa Pro",
                                desc: "Web rápida, impacto premium y enfocada al lead.",
                                icon: Globe,
                                color: "text-blue-400",
                                shadow: "shadow-blue-500/10",
                                link: "/servicios/desarrollo-web-medida"
                            },
                            {
                                stage: "02. Filtro",
                                title: "Agente Virtual 24/7",
                                desc: "IA por WhatsApp que filtra y cualifica clientes.",
                                icon: MessageSquare,
                                color: "text-purple-400",
                                shadow: "shadow-purple-500/10",
                                link: "/servicios/automatizacion-whatsapp"
                            },
                            {
                                stage: "03. El Corazón",
                                title: "Arquitectura CRM / API",
                                desc: "El Smart Hub que ejecuta la lógica de negocio.",
                                icon: Memory,
                                color: "text-primary",
                                shadow: "shadow-primary/10",
                                link: "/servicios/sistemas-gestion-personalizados"
                            },
                            {
                                stage: "04. Resultado",
                                title: "SEO Local Estratégico",
                                desc: "Captación constante donde están tus clientes.",
                                icon: Target,
                                color: "text-green-400",
                                shadow: "shadow-green-500/10",
                                link: "/servicios/seo-local-estrategia"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-[#1a1a1a] border border-white/5 p-8 rounded-[2rem] flex flex-col items-center text-center group hover:border-white/20 transition-all ${item.shadow}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                                <p className="text-gray-500 text-sm italic font-light leading-relaxed mb-6">{item.desc}</p>
                                <Link
                                    to={item.link}
                                    className={`mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${item.color} hover:opacity-70 transition-opacity`}
                                >
                                    Saber más <ArrowRight className="w-3 h-3" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FINAL CTA */}
                <DiagnosisCTA className="mb-20" />
                <div className="mt-32 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-3xl text-center"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full opacity-30"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-10 border border-primary/20">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Solo aceptamos 3 proyectos nuevos en Febrero
                            </div>
                            <h2 className="text-4xl md:text-6xl text-white font-bold mb-10 tracking-tight leading-[1.1]">
                                ¿Hablamos y vemos <br />
                                <span className="text-primary italic">dónde está tu fuga?</span>
                            </h2>
                            <ContactForm source="WorkMethod Page" className="bg-[#111] p-8 rounded-3xl border border-white/5 shadow-2xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WorkMethod;
