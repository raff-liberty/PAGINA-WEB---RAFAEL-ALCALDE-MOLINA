import React from 'react';
import { motion } from 'framer-motion';
import { MemoryStick as Memory, CheckCircle, AlertTriangle, ArrowRight, XCircle, ShieldCheck, Zap, Globe, Laptop, MessageSquare, Database, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundMesh from '../components/BackgroundMesh';

const WorkMethod = () => {
    return (
        <div className="relative pt-64 pb-48 min-h-screen">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-40 max-w-4xl"
                >
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                        Cómo Trabajamos <br />
                        <span className="text-primary">Orden antes que tecnología</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Una metodología diseñada para pequeños negocios. Sin humo. Nos centramos en que recuperes horas de tu vida, no en venderte software.
                    </p>
                </motion.div>

                {/* Before/After Section */}
                <div className="mb-40 relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-transparent rounded-full opacity-50"></div>
                    <div className="pl-8 md:pl-12 py-2">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
                            Lo que te ahorramos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
                            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-2xl">
                                <h3 className="text-red-400 font-bold mb-6 flex items-center gap-3 text-xl">
                                    <XCircle className="w-6 h-6" /> Tu situación actual
                                </h3>
                                <ul className="space-y-4 text-gray-400 text-base">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500/50 mt-1">❌</span>
                                        <span>Interrupciones constantes en WhatsApp</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500/50 mt-1">❌</span>
                                        <span>Perdiendo tardes enviando facturas</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500/50 mt-1">❌</span>
                                        <span>"No me da la vida para más clientes"</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500/50 mt-1">❌</span>
                                        <span>Inventario y pedidos hechos "a ojo"</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full"></div>
                                <h3 className="text-primary font-bold mb-6 flex items-center gap-3 text-xl relative z-10">
                                    <CheckCircle className="w-6 h-6" /> Después de 4 semanas
                                </h3>
                                <ul className="space-y-4 text-gray-300 text-base relative z-10">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary/50 mt-1">✅</span>
                                        <span>Citas y pagos automáticos 24/7</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary/50 mt-1">✅</span>
                                        <span>Facturación en 1 clic desde el móvil</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary/50 mt-1">✅</span>
                                        <span>Sistema que escala sin robarte tiempo</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary/50 mt-1">✅</span>
                                        <span>Stock controlado y alertas automáticas</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 1 & 2 remain the same for methodology */}
                <div className="space-y-32 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/30 before:to-transparent before:-z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row gap-12 items-start relative">
                        <div className="md:w-1/2 flex justify-start md:justify-end md:pr-16 md:text-right">
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="bg-[#252525] border border-white/20 p-10 rounded-2xl shadow-2xl max-w-lg w-full relative group hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Paso 1 — Auditoría Real</h3>
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-8">Entender, no suponer</p>
                                <p className="text-gray-400 leading-relaxed text-lg font-light italic mb-8">
                                    "Vemos cómo trabajas hoy. Sin juzgar. Identificamos dónde se te va el dinero y el tiempo."
                                </p>
                                <div className="bg-black/30 p-6 rounded-xl border border-white/5 text-left">
                                    <strong className="text-primary text-xs uppercase tracking-wider block mb-3">Recibes:</strong>
                                    <ul className="text-sm text-gray-300 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
                                            Mapa de tus 'fugas de tiempo'
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                        <div className="absolute left-[10px] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background-dark border-2 border-primary z-10 mt-12 shadow-[0_0_15px_rgba(110,231,183,0.5)]"></div>
                        <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row gap-12 items-start relative">
                        <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
                        <div className="absolute left-[10px] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background-dark border-2 border-white z-10 mt-12 shadow-[0_0_15px_rgba(100,100,100,0.5)] bg-white"></div>
                        <div className="md:w-1/2 flex justify-start md:pl-16">
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="bg-[#252525] border border-white/20 p-10 rounded-2xl shadow-2xl max-w-lg w-full relative group hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Paso 2 — Reglas del Juego</h3>
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-8">Diseño del flujo</p>
                                <p className="text-gray-400 leading-relaxed text-lg font-light italic mb-8">
                                    "Antes de automatizar, simplificamos. Definimos qué pasa si un cliente cancela."
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* THE CUSTOMER JOURNEY INFOGRAPHIC (Replacement for former Simple Quote) */}
                <div className="mt-64 mb-40 relative">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
                            Tu Viaje hacia la <span className="text-primary italic">Libertad Operativa</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Diseñamos una experiencia de usuario impecable que alimenta tu Hub centralizado y ejecuta procesos sin que tú muevas un dedo.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Path Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block -z-10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    stage: "01. Impresión",
                                    title: "Web Impecable",
                                    desc: "Tu cliente llega a una web rápida, bonita y profesional (como esta). Generas confianza instantánea.",
                                    icon: Globe,
                                    color: "bg-blue-500/10 text-blue-400"
                                },
                                {
                                    stage: "02. Filtro",
                                    title: "Cualificación IA",
                                    desc: "Un agente virtual o formulario inteligente detecta qué necesita el cliente y filtra a los curiosos del resto.",
                                    icon: MessageSquare,
                                    color: "bg-purple-500/10 text-purple-400"
                                },
                                {
                                    stage: "03. El Corazón",
                                    title: "Smart Hub (n8n)",
                                    desc: "Se cruzan datos en tu panel: disponibilidad, pagos, facturación y avisos. Todo sucede solo.",
                                    icon: Memory,
                                    color: "bg-primary/10 text-primary"
                                },
                                {
                                    stage: "04. Resultado",
                                    title: "Cierre & Pago",
                                    desc: "Cita agendada, señal cobrada y factura enviada. Tú solo tienes que aparecer a trabajar.",
                                    icon: CreditCard,
                                    color: "bg-green-500/10 text-green-400"
                                }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-[#151515] border border-white/5 p-8 rounded-3xl relative flex flex-col items-center text-center group"
                                >
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                        {step.stage}
                                    </div>
                                    <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                <div className="mt-40 mb-40 relative">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                            Qué construimos (cuando hace falta)
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Automatización de Flujos",
                                desc: "Conectamos tus herramientas actuales (CRM, WhatsApp, Email, Calendario) para que hablen entre sí sin que tengas que mover un dedo.",
                                icon: Zap,
                                color: "text-yellow-400"
                            },
                            {
                                title: "Webs & Hubs Operativos",
                                desc: "Creamos interfaces impecables (como esta que estás viendo) que no solo son 'bonitas', sino que están de verdad diseñadas para gestionar tu operación.",
                                icon: Globe,
                                color: "text-blue-400"
                            },
                            {
                                title: "Dashboards de Control",
                                desc: "Un panel visual donde ves en tiempo real lo que importa: conversiones, cuellos de botella y ROI. Deja de adivinar y empieza a decidir con datos.",
                                icon: Laptop,
                                color: "text-primary"
                            },
                            {
                                title: "Apps & Herramientas Internas",
                                desc: "Si lo que necesitas no existe, lo construimos. Herramientas a medida que resuelven problemas específicos de tu equipo.",
                                icon: ArrowRight, // Using ArrowRight as a fallback or distinct icon
                                color: "text-green-400"
                            }
                        ]
                            .map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-[#1a1a1a] border border-white/5 p-10 rounded-2xl relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full group-hover:bg-primary/10 transition-colors"></div>
                                    <div className={`p-4 rounded-xl bg-white/5 inline-block mb-6 ${service.color}`}>
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {service.desc}
                                    </p>
                                </motion.div>
                            ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center pb-12 mt-40">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 border border-primary/20">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Solo aceptamos 3 proyectos nuevos en Febrero
                    </div>

                    <h2 className="text-4xl md:text-6xl text-white font-bold mb-8">
                        ¿Hablamos 15 minutos?
                    </h2>

                    <div className="flex flex-col items-center gap-6 mt-12">
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center gap-4 bg-primary hover:bg-primary-hover text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:translate-y-[-4px] shadow-[0_0_30px_rgba(110,231,183,0.3)] hover:shadow-[0_0_50px_rgba(110,231,183,0.5)]"
                        >
                            <span>Agendar Diagnóstico (Gratis)</span>
                            <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <span className="text-base text-gray-500 font-medium">
                            Garantía: Si no podemos ayudarte, te lo diremos en el minuto 1.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkMethod;
