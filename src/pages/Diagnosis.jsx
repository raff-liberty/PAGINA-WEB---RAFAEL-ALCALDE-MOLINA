import React, { useRef, useState, useEffect } from 'react';
import DiagnosisForm from '../components/diagnosis/DiagnosisForm';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, ArrowDown, ShieldCheck, TrendingUp, Clock, LayoutGrid, Flame, UserMinus, Dice5, GitMerge, EyeOff, AlertCircle, MessageSquare, ShoppingCart, Star, PenTool } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchFullConfig } from '../lib/siteConfig';

const Diagnosis = () => {
    const formRef = useRef(null);
    const [pillarIndex, setPillarIndex] = useState(0);
    const [chaosIndex, setChaosIndex] = useState(0);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [whatsappUrl, setWhatsappUrl] = useState('');

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchFullConfig();
            console.log('Config loaded:', config);
            console.log('YouTube URL:', config?.diagnosis_youtube_url);
            if (config?.diagnosis_youtube_url) {
                setYoutubeUrl(config.diagnosis_youtube_url);
            }
            if (config?.whatsapp_url) {
                setWhatsappUrl(config.whatsapp_url);
            }
        };
        loadConfig();
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = (e, setter) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth / 2;
        const index = Math.round(scrollLeft / width);
        setter(index);
    };

    const VerticalConnector = ({ height = "h-24", opacity = "opacity-30 md:opacity-50" }) => (
        <div className={`flex flex-col items-center w-full ${height} ${opacity} relative z-0`}>
            <div className="w-[1px] md:w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(110,231,183,0.3)]" />
        </div>
    );

    const BracketConnector = ({ type = "down", height = 80 }) => (
        <div className="hidden md:block relative w-full overflow-visible z-0" style={{ height }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={type === "down"
                        ? "M 500 0 L 500 40 M 500 40 L 125 40 L 125 100 M 500 40 L 375 40 L 375 100 M 500 40 L 625 40 L 625 100 M 500 40 L 875 40 L 875 100"
                        : "M 125 0 L 125 60 L 500 60 L 500 100 M 375 0 L 375 60 M 625 0 L 625 60 M 875 0 L 875 60 L 500 60"
                    }
                    stroke="#6ee7b7"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                />
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={type === "down"
                        ? "M 500 0 L 500 40 M 500 40 L 125 40 L 125 100 M 500 40 L 375 40 L 375 100 M 500 40 L 625 40 L 625 100 M 500 40 L 875 40 L 875 100"
                        : "M 125 0 L 125 60 L 500 60 L 500 100 M 375 0 L 375 60 M 625 0 L 625 60 M 875 0 L 875 60 L 500 60"
                    }
                    stroke="#6ee7b7"
                    strokeWidth="6"
                    strokeOpacity="0.2"
                    className="blur-[4px]"
                />
            </svg>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
            <style>
                {`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>
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

            {/* BLOQUE 1 — IMPACTO INICIAL */}
            <section className="relative z-10 pt-40 md:pt-56 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4"
                    >
                        <Zap className="w-3 h-3" /> Solo para dueños de negocio
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight"
                    >
                        Si tu negocio depende de ti para funcionar, <br className="hidden md:block" />
                        <span className="text-primary italic">no tienes un sistema.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <p className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-light leading-relaxed">
                            Tienes un problema de control que te está costando <span className="text-white font-medium">tiempo, dinero y tranquilidad.</span>
                        </p>
                        <p className="text-base md:text-xl lg:text-2xl text-gray-500 italic">
                            El síntoma cambia según el negocio. El caos es siempre el mismo.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-8 flex flex-col items-center gap-4 text-primary"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowDown className="w-5 h-5" />
                        </motion.div>
                    </motion.div>
                </div>

                <VerticalConnector height="h-32" />

                {/* AJUSTE 1 — CONSECUENCIA TEMPRANA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto mt-16 px-6"
                >
                    <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-red-500/20 via-transparent to-red-500/10">
                        <div className="bg-[#0D0D0D] backdrop-blur-xl rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden group">
                            {/* Decorative glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full group-hover:bg-red-500/20 transition-colors" />

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                {/* Left Column - Text Content */}
                                <div className="space-y-4 order-2 md:order-1">
                                    <div className="inline-flex items-center gap-2 text-red-400 mb-2">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Advertencia</span>
                                    </div>
                                    <p className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
                                        Cada semana que el negocio funciona sin sistema, <br />
                                        <span className="text-red-500 font-medium italic">se pierde tiempo, dinero y capacidad de decisión.</span>
                                    </p>
                                    <p className="text-xl md:text-2xl text-gray-400 font-light italic">
                                        Pero no tienes que resolverlo tú solo. Mi trabajo es diseñar el sistema que trabaje por ti para que recuperes el control y la paz mental.
                                    </p>
                                </div>

                                {/* Right Column - YouTube Video */}
                                {youtubeUrl && (
                                    <div className="relative w-full order-1 md:order-2">
                                        <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(239,68,68,0.3)] border border-red-500/20">
                                            <iframe
                                                src={(youtubeUrl.includes('watch?v=')
                                                    ? youtubeUrl.replace('watch?v=', 'embed/')
                                                    : youtubeUrl.includes('youtu.be/')
                                                        ? youtubeUrl.replace('youtu.be/', 'youtube.com/embed/')
                                                        : youtubeUrl) + "?modestbranding=1&rel=0&controls=1"}
                                                title="Video de Diagnóstico"
                                                className="absolute top-0 left-0 w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact Buttons - Inside Module */}
                            <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {/* WhatsApp Button */}
                                <a
                                    href={whatsappUrl || "https://wa.me/34600000000"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-black rounded-full font-bold text-lg transition-all duration-300 shadow-[0_10px_40px_rgba(110,231,183,0.3)] hover:shadow-[0_15px_50px_rgba(110,231,183,0.5)] hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Contactar por WhatsApp
                                </a>

                                {/* Contact Form Button */}
                                <button
                                    onClick={scrollToForm}
                                    className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-black rounded-full font-bold text-lg transition-all duration-300 shadow-[0_10px_40px_rgba(110,231,183,0.3)] hover:shadow-[0_15px_50px_rgba(110,231,183,0.5)] hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Solicitar Diagnóstico
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <VerticalConnector height="h-32" />
            </section>

            {/* BLOQUE 2 — ESPEJO DEL DUEÑO (DOLOR REAL) */}
            <section className="relative z-10 py-24 px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-16"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                                Si eres dueño de un pequeño negocio, <br className="hidden md:block" />
                                <span className="text-gray-500">es probable que te pase esto:</span>
                            </h2>
                        </div>

                        <BracketConnector type="down" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    text: "Si hoy no estás, el negocio se resiente.",
                                    icon: UserMinus,
                                    color: "text-blue-400"
                                },
                                {
                                    text: "Tienes la sensación constante de apagar fuegos.",
                                    icon: Flame,
                                    color: "text-orange-400"
                                },
                                {
                                    text: "Tomas decisiones más por intuición que por datos.",
                                    icon: Dice5,
                                    color: "text-purple-400"
                                },
                                {
                                    text: "Todo acaba pasando por ti.",
                                    icon: GitMerge,
                                    color: "text-green-400"
                                },
                                {
                                    text: "Trabajas mucho, pero no tienes claridad real sobre qué funciona.",
                                    icon: EyeOff,
                                    color: "text-red-400"
                                }
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative p-8 rounded-[2rem] bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-500 ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

                                    <div className="relative z-10 space-y-6">
                                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 ${point.color}`}>
                                            <point.icon className="w-6 h-6" />
                                        </div>
                                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed group-hover:text-white transition-colors">
                                            {point.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <BracketConnector type="up" />

                        <div className="pt-12 text-center space-y-4">
                            <p className="text-2xl md:text-3xl text-gray-400 font-light italic">
                                Esto no es falta de ganas ni de capacidad.
                            </p>
                            <motion.p
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-4xl md:text-6xl font-display font-black text-primary uppercase tracking-tighter"
                            >
                                Es falta de sistema
                            </motion.p>
                        </div>

                        {/* DIAGRAMA DE PILARES */}
                        <div className="relative mt-12 md:mt-0">
                            {/* Desktop SVG Connectors */}
                            <div className="hidden md:block relative h-24 w-full mb-8">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                                    {/* Outer glow path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.3 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 500 0 L 500 40 M 500 40 L 125 40 L 125 100 M 500 40 L 375 40 L 375 100 M 500 40 L 625 40 L 625 100 M 500 40 L 875 40 L 875 100"
                                        stroke="#6ee7b7"
                                        strokeWidth="6"
                                        className="blur-[4px]"
                                    />
                                    {/* Main solid path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 500 0 L 500 40 M 500 40 L 125 40 L 125 100 M 500 40 L 375 40 L 375 100 M 500 40 L 625 40 L 625 100 M 500 40 L 875 40 L 875 100"
                                        stroke="#6ee7b7"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>

                            {/* Pillars Grid - Mobile Horizontal Scroll (Show 2 boxes) */}
                            <div className="relative">
                                <div
                                    onScroll={(e) => handleScroll(e, setPillarIndex)}
                                    className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-4 -mx-4 md:mx-0 md:px-0 scroll-smooth"
                                >
                                    {[
                                        {
                                            title: "Comunicación",
                                            desc: "Usas WhatsApp como si fuera un sistema.",
                                            icon: MessageSquare,
                                            color: "from-blue-500/20"
                                        },
                                        {
                                            title: "Ventas",
                                            desc: "Haces acciones sin un plan claro.",
                                            icon: ShoppingCart,
                                            color: "from-emerald-500/20"
                                        },
                                        {
                                            title: "Autoridad",
                                            desc: "Te ven como uno más.",
                                            icon: Star,
                                            color: "from-amber-500/20"
                                        },
                                        {
                                            title: "Diseño",
                                            desc: "Tu diseño actual no ayuda a vender.",
                                            icon: PenTool,
                                            color: "from-purple-500/20"
                                        }
                                    ].map((pillar, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 + (i * 0.1) }}
                                            className="relative group p-6 md:p-8 rounded-[2rem] bg-white/[0.05] border border-white/10 hover:border-primary/50 transition-all duration-500 text-center overflow-hidden flex flex-col h-full min-w-[calc(50%-1rem)] md:min-w-0 snap-center"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                            <div className="relative z-10 space-y-4 flex flex-col h-full">
                                                <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 shrink-0">
                                                    <pillar.icon className="w-6 h-6" />
                                                </div>
                                                <div className="space-y-2 flex-grow flex flex-col justify-center">
                                                    <p className="text-xs md:text-sm text-primary font-bold uppercase tracking-[0.2em] ml-[0.2em]">
                                                        {pillar.title}
                                                    </p>
                                                    <p className="text-sm md:text-lg lg:text-xl text-gray-300 font-light leading-snug md:leading-relaxed px-2">
                                                        {pillar.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Mobile Indicators */}
                                <div className="flex md:hidden justify-center gap-1.5 mt-2">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${pillarIndex === i ? 'bg-primary w-4' : 'bg-white/20 w-1.5'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Inverse Desktop SVG Connectors */}
                            <div className="hidden md:block relative h-40 w-full mt-8">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 160" fill="none" preserveAspectRatio="none">
                                    {/* Outer glow path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.3 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 125 0 L 125 60 L 500 60 L 500 160 M 375 0 L 375 60 M 625 0 L 625 60 M 875 0 L 875 60 L 500 60"
                                        stroke="#6ee7b7"
                                        strokeWidth="6"
                                        className="blur-[4px]"
                                    />
                                    {/* Main solid path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 125 0 L 125 60 L 500 60 L 500 160 M 375 0 L 375 60 M 625 0 L 625 60 M 875 0 L 875 60 L 500 60"
                                        stroke="#6ee7b7"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >

            <VerticalConnector height="h-32" />

            {/* BLOQUE 3 — NORMALIZACIÓN (AUTORIDAD) */}
            <section className="relative z-10 pt-0 pb-24 px-6 md:-mt-8">
                <div className="max-w-4xl mx-auto text-center border-b border-white/5 pb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl md:text-2xl font-display font-medium text-primary uppercase tracking-[0.2em]">
                            Esto no te pasa solo a ti.
                        </h2>
                        <p className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-snug">
                            La mayoría de pequeños negocios no fallan por falta de clientes, sino porque <span className="text-primary italic font-medium">crecen sobre procesos frágiles o inexistentes.</span>
                        </p>
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-500 max-w-2xl mx-auto">
                            Antes de pensar en herramientas, hay que entender el problema.
                        </p>
                    </motion.div>
                </div>

                <VerticalConnector height="h-24" />
            </section>

            {/* AJUSTE 2 — EL COSTE VISIBLE */}
            <section className="relative z-10 py-12 px-6">
                <div className="max-w-4xl mx-auto relative p-[1px] rounded-[3rem] bg-gradient-to-br from-white/20 via-primary/20 to-primary/40 shadow-[0_0_50px_-12px_rgba(110,231,183,0.3)]">
                    <div className="bg-[#0A0A0A] bg-gradient-to-br from-primary/[0.03] to-transparent backdrop-blur-3xl rounded-[2.9rem] p-6 md:p-16 relative overflow-hidden group">
                        {/* Internal glow */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/[0.05] blur-[120px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />

                        <div className="relative z-10 space-y-10">
                            <div className="text-center md:text-left space-y-4">
                                <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-tight">
                                    El problema no es solo el desorden. <br />
                                    <span className="text-primary italic">El problema es que ese desorden tiene un coste real:</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: "Horas que no se recuperan", icon: Clock, desc: "Tiempo que podrías dedicar a crecer o a tu vida." },
                                    { title: "Decisiones erróneas", icon: Brain, desc: "Basadas en intuición en lugar de datos reales." },
                                    { title: "Oportunidades perdidas", icon: Zap, desc: "Clientes que se escapan por falta de seguimiento." },
                                    { title: "Cansancio acumulado", icon: Target, desc: "El agotamiento de estar siempre en modo supervivencia." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-5 group/item p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 group-hover/item:bg-primary group-hover/item:text-background-dark transition-all duration-500 shrink-0">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xl text-white font-medium mb-1">{item.title}</p>
                                            <p className="text-gray-400 font-light text-base md:text-lg">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOQUE 4 & 5 — IDENTIFICACIÓN DEL CAOS */}
            <section className="relative z-10 py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                            El caos no se manifiesta igual en todos los negocios
                        </h2>
                        <p className="text-xl text-gray-400 font-light">
                            Aunque el problema de fondo es el mismo, en cada sector aparece de una forma distinta.
                        </p>

                        <BracketConnector type="down" className="hidden md:block" />
                    </motion.div>

                    <div className="relative">
                        <div
                            onScroll={(e) => handleScroll(e, setChaosIndex)}
                            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
                        >
                            {[
                                {
                                    title: "Citas o Reservas",
                                    icon: Clock,
                                    pain: [
                                        "Cancelaciones que no se recuperan",
                                        "Huecos muertos que nadie paga",
                                        "Cambios constantes que te interrumpen",
                                        "Un negocio que depende solo de ti"
                                    ],
                                    color: "from-blue-500/20"
                                },
                                {
                                    title: "Trabajos y Encargos",
                                    icon: Zap,
                                    pain: [
                                        "Órdenes que se olvidan o malinterpretan",
                                        "Facturas que se retrasan meses",
                                        "Clientes preguntando por su estado",
                                        "Caja que nunca termina de cuadrar"
                                    ],
                                    color: "from-yellow-500/20"
                                },
                                {
                                    title: "Stock y Productos",
                                    icon: LayoutGrid,
                                    pain: [
                                        "Dinero quemándose en inventario parado",
                                        "Compras reactivas por falta de previsión",
                                        "Márgenes que se evaporan sin control",
                                        "Decisiones a ciegas sobre qué vender"
                                    ],
                                    color: "from-green-500/20"
                                },
                                {
                                    title: "Proyectos y Servicios",
                                    icon: Brain,
                                    pain: [
                                        "Todo vive y muere en tu cabeza",
                                        "Seguimientos caóticos de tareas",
                                        "Cobros desordenados y mal gestionados",
                                        "Saturación mental al borde del burn-out"
                                    ],
                                    color: "from-purple-500/20"
                                }
                            ].map((type, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col h-full min-w-[85%] md:min-w-0 snap-center`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${type.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]`} />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-background-dark transition-all duration-500">
                                            <type.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-white mb-6">{type.title}</h3>
                                        <ul className="space-y-4 mb-8">
                                            {type.pain.map((p, j) => (
                                                <li key={j} className="flex items-start gap-3 text-gray-400 text-base md:text-lg lg:text-xl font-light leading-relaxed">
                                                    <div className="w-1 h-1 rounded-full bg-red-500/50 mt-1.5 shrink-0" />
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={scrollToForm}
                                        className="relative z-10 mt-auto w-full py-3 rounded-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all"
                                    >
                                        Esto se parece a mi negocio
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                        {/* Mobile Indicators */}
                        <div className="flex md:hidden justify-center gap-1.5 mt-2">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${chaosIndex === i ? 'bg-primary w-4' : 'bg-white/20 w-1.5'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <VerticalConnector height="h-32" />
            </section>

            {/* BLOQUE 6 — TU DIFERENCIAL (ENFOQUE ENGORILATE) */}
            <section className="relative z-10 py-24 px-6 bg-primary/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                                No empiezo instalando <span className="text-primary italic">herramientas.</span>
                            </h2>
                            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
                                No empiezo automatizando procesos sin sentido.
                            </p>
                            <div className="space-y-4 pt-4">
                                {[
                                    "Primero se identifica el problema.",
                                    "Luego se diseña el sistema.",
                                    "Solo después se elige la tecnología."
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                            {i + 1}
                                        </div>
                                        <p className="text-xl md:text-2xl text-white font-medium">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-black/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 space-y-6"
                        >
                            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
                                "Mi enfoque es entender cómo funciona realmente tu negocio <span className="text-primary font-medium italic text-3xl block mt-2">cuando tú no estás encima."</span>
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <img
                                    src="/rafael_profile.png"
                                    alt="Rafael Alcalde"
                                    className="w-12 h-12 rounded-full object-cover border border-primary/20"
                                />
                                <div>
                                    <p className="text-white font-bold">Rafael Alcalde</p>
                                    <p className="text-gray-500 text-sm italic">Estratega de Eficiencia Operativa</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <VerticalConnector height="h-32" />
            </section>

            {/* BLOQUE 7 — PUENTE AL DIAGNÓSTICO */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
                            ¿Listo para recuperar el control?
                        </h2>
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-2xl mx-auto">
                            He creado un Diagnóstico de Eficiencia Operativa para detectar exactamente dónde estás perdiendo tiempo y dinero.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {[
                            { title: "Precisión Clínica", desc: "Detecta si tu negocio tiene un problema de sistema o de ejecución." },
                            { title: "Fugas de Control", desc: "Identifica dónde se pierde el rastro de las ventas o los clientes." },
                            { title: "Hoja de Ruta", desc: "Te da una visión clara de por dónde empezar (y por dónde no)." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                            >
                                <h4 className="text-primary font-bold mb-2 uppercase tracking-widest text-xs">{item.title}</h4>
                                <p className="text-gray-400 font-light text-base md:text-lg">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="pt-8"
                    >
                        <button
                            onClick={scrollToForm}
                            className="group relative px-12 py-6 bg-primary text-background-dark rounded-full text-xl md:text-2xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-[0_20px_50px_rgba(110,231,183,0.3)]"
                        >
                            Ver el diagnóstico de mi negocio
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                        <p className="mt-4 text-gray-500 text-sm uppercase tracking-[0.2em] font-medium">
                            7 minutos · Confidencial · Sin compromiso
                        </p>
                    </motion.div>
                </div>

                <VerticalConnector height="h-32" />
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
        </div >
    );
};

export default Diagnosis;
