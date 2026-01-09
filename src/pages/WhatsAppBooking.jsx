import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, Bell, Zap, CheckCircle, ArrowRight, Smartphone, Share2, ShieldCheck, UserCheck, Timer, TrendingUp, HeartPulse, Utensils, Scale as LawIcon, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';

const WhatsAppBooking = () => {
    const features = [
        {
            icon: Smartphone,
            title: "Omnicanalidad Real",
            desc: "WhatsApp, Instagram, Web... No importa por dónde entren. Tu agenda vive en un solo lugar."
        },
        {
            icon: Timer,
            title: "Atención Instantánea",
            desc: "Mientras tu competencia duerme, tu sistema reserva. La velocidad es la clave de la conversión."
        },
        {
            icon: Bell,
            title: "Recordatorios de Impacto",
            desc: "Recordatorios automáticos que reducen el absentismo un 40%. Recuperas dinero perdido en cada cita."
        },
        {
            icon: ShieldCheck,
            title: "Propiedad Total",
            desc: "Tus datos, tu servidor. Sin cuotas por reserva ni depender de plataformas de terceros."
        }
    ];

    const sectors = [
        { icon: HeartPulse, name: "Clínicas y Salud", detail: "Gestión de pacientes sin saturar recepción." },
        { icon: Utensils, name: "Restauración", detail: "Reservas de mesa y confirmaciones al instante." },
        { icon: LawIcon, name: "Despachos y Asesorías", detail: "Citas previas con pre-pago opcional." },
        { icon: UserCheck, name: "Servicios Personales", detail: "Peluquerías, Tatuadores, Entrenadores." }
    ];

    const steps = [
        {
            num: "01",
            title: "El Gancho",
            text: "El cliente ve tu anuncio o web y pulsa 'Reservar por WhatsApp'."
        },
        {
            num: "02",
            title: "El Cierre",
            text: "El asistente muestra huecos reales 24/7 y formaliza la cita en segundos."
        },
        {
            num: "03",
            title: "El Resultado",
            text: "Cita guardada en tu ERP, recordatorio programado y tú sigues facturando."
        }
    ];

    const faqs = [
        {
            q: "¿Es un número nuevo o el mío?",
            a: "Podemos usar tu número actual mediante la API oficial de WhatsApp o uno nuevo dedicado. Tú eliges."
        },
        {
            q: "¿Qué pasa si un cliente quiere hablar con un humano?",
            a: "El sistema detecta consultas complejas y las deriva a tu chat personal al instante. El control es tuyo."
        },
        {
            q: "¿Cumple con la RGPD?",
            a: "Al 100%. Solicitamos el consentimiento antes de iniciar la gestión para que tu negocio esté blindado legalmente."
        },
        {
            q: "¿Se integra con mi Google Calendar?",
            a: "Sí. Se sincroniza en tiempo real con Calendar, Outlook o el ERP que ya utilices."
        }
    ];

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Automatización de Reservas por WhatsApp",
        "description": "Sistema de reservas inteligente que funciona 24/7 en WhatsApp y Redes Sociales, integrado con tu gestión diaria.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Engorilate"
        },
        "areaServed": "Spain",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Automatización",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Motor de Reservas WhatsApp"
                    }
                }
            ]
        }
    };

    return (
        <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-12 overflow-hidden selection:bg-primary selection:text-black">
            <SEO
                title="Reservas por WhatsApp: Tu Negocio no duerme, pero tú sí | Engorilate"
                description="Deja de contestar mensajes a mano. Tu motor de reservas inteligente en WhatsApp cierra citas mientras tú descansas. Integración real con ERP y CRM."
                keywords="reservas whatsapp, automatizacion citas, asistente virtual whatsapp, gestor reservas automatico"
                schema={schemaData}
            />

            {/* HERO: AGGRESSIVE & DIRECT */}
            <section className="relative px-6 py-12 max-w-7xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 tracking-widest uppercase">
                            <Zap className="w-3 h-3" /> Motor de Ventas 24/7
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-[0.85] italic uppercase tracking-tighter">
                            Tu negocio <br />
                            no <span className="text-primary italic">duerme</span>,<br />
                            pero tú sí.
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed font-light">
                            Deja de perder el tiempo gestionando agendas por chat. Instalamos un sistema que <strong>convierte dudas en citas confirmadas</strong> sin que tú tengas que tocar el móvil.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact" className="bg-primary text-black font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_50px_rgba(110,231,183,0.3)] text-base uppercase italic">
                                SOLICITAR DEMO TÉCNICA <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Interactive Chat Mockup */}
                        <div className="bg-[#151515] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative z-10 backdrop-blur-xl">
                            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xl">WA</div>
                                <div>
                                    <p className="font-bold text-base text-white">Asistente Inteligente</p>
                                    <p className="text-[10px] text-primary flex items-center gap-1.5 font-bold uppercase tracking-widest">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Sistema Activo
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 }}
                                    className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed"
                                >
                                    ¡Hola! Quiero reservar una cita para mañana por la tarde.
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 2 }}
                                    className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-sm leading-relaxed text-right text-primary italic font-medium"
                                >
                                    ¡Claro! Tengo disponible a las 16:30 y 18:00. ¿Cuál prefieres?
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 3 }}
                                    className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed"
                                >
                                    Mejor a las 18:00.
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 4 }}
                                    className="bg-primary p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-sm text-right text-black font-black shadow-lg"
                                >
                                    ¡HECHO! ✅ Cita reservada. Te acabo de enviar el recordatorio. ¡Nos vemos!
                                </motion.div>
                            </div>
                        </div>
                        {/* Visual Glows */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                    </motion.div>
                </div>
            </section>

            {/* SECTORES IMBATIBLES */}
            <section className="px-6 py-12 bg-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-black mb-4 uppercase italic">Sectores <span className="text-primary italic">Imbatibles</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Si tu negocio depende de citas, cada minuto que pasas al teléfono es dinero que no estás cobrando.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sectors.map((s, i) => (
                            <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                                    <s.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 uppercase italic tracking-tighter">{s.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES: THE "WHY" */}
            <section className="px-6 py-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-black mb-8 leading-tight uppercase italic">
                            No es solo un Bot. <br />
                            Es tu <span className="text-primary">Agente Virtual</span>.
                        </h2>
                        <div className="space-y-8">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <f.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2 uppercase italic">{f.title}</h4>
                                        <p className="text-gray-500 text-sm">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#111] p-12 rounded-[3rem] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px]"></div>
                        <h3 className="text-white text-2xl font-black mb-8 italic uppercase text-center">ROI Inmediato</h3>
                        <div className="space-y-6">
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                                <div className="text-primary text-4xl font-display font-black mb-1 italic">-40%</div>
                                <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">Absentismo y Citas Fallidas</div>
                            </div>
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                                <div className="text-white text-4xl font-display font-black mb-1 italic">24/7</div>
                                <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">Respuesta instantánea día y noche</div>
                            </div>
                            <div className="p-6 bg-primary rounded-2xl">
                                <div className="text-black text-4xl font-display font-black mb-1 italic">+100%</div>
                                <div className="text-xs uppercase font-bold text-black/60 tracking-widest">Control real de tu tiempo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STEPS */}
            <section className="px-6 py-12 bg-primary text-black">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter text-black">Sin <span className="text-black/40">Fricción</span></h2>
                </div>
                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {steps.map((s, i) => (
                        <div key={i} className="relative group">
                            <div className="text-9xl font-display font-black opacity-20 absolute -top-12 -left-4 group-hover:scale-110 transition-transform text-black">{s.num}</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-display font-black mb-4 uppercase italic leading-none text-black">{s.title}</h3>
                                <p className="font-bold text-lg leading-relaxed text-black/90">{s.text}</p>
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
            <DiagnosisCTA className="mb-20" />
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center border border-white/10 p-8 md:p-16 rounded-[4rem] bg-gradient-to-br from-[#111] to-black relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-8 tracking-tighter text-white">
                            Empieza a <br />
                            <span className="text-primary italic">Facturar</span> <br />
                            Sin Estrés
                        </h2>
                        <p className="text-gray-400 text-xl font-bold mb-8 uppercase italic leading-tight opacity-80">
                            La automatización no es el futuro, es tu ventaja competitiva de hoy.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Montaje en &lt; 7 días
                            </div>
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Sin cuotas fijas ocultas
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10">
                        <h3 className="text-white text-xl font-black mb-6 italic uppercase">Solicitar mi auditoría</h3>
                        <ContactForm source="WhatsApp Booking Page" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhatsAppBooking;
