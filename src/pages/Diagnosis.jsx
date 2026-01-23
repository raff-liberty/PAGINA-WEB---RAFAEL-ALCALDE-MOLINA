import React, { useRef, useState, useEffect } from 'react';
import DiagnosisForm from '../components/diagnosis/DiagnosisForm';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, ArrowDown, ShieldCheck, TrendingUp, Clock, LayoutGrid, Flame, UserMinus, Dice5, GitMerge, EyeOff, AlertCircle, MessageSquare, ShoppingCart, Star, PenTool, Rocket, ArrowRight, Linkedin } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchFullConfig } from '../lib/siteConfig';

const Diagnosis = () => {
    const formRef = useRef(null);
    const [pillarIndex, setPillarIndex] = useState(0);
    const [chaosIndex, setChaosIndex] = useState(0);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [whatsappUrl, setWhatsappUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchFullConfig();
            if (config?.diagnosis_youtube_url) {
                setYoutubeUrl(config.diagnosis_youtube_url);
            }
            if (config?.whatsapp_url) {
                setWhatsappUrl(config.whatsapp_url);
            }
            if (config?.linkedin_url) {
                setLinkedinUrl(config.linkedin_url);
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

    const VerticalConnector = ({ height = "h-16 md:h-20", opacity = "opacity-30 md:opacity-50" }) => (
        <div className={`flex flex-col items-center w-full ${height} ${opacity} relative z-0`}>
            <div className="w-[1px] md:w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(110,231,183,0.3)] animate-pulse" />
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

            {/* BLOQUE 1 — IMPACTO INICIAL (REDISEÑO PREMIUM) */}
            <section className="relative z-10 pt-24 md:pt-40 pb-12 px-4 md:px-6 overflow-hidden">
                {/* Glow Central Focalizador */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full opacity-30 animate-pulse pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10 md:space-y-14">
                    {/* Badges Glass Premium */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap justify-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-primary text-[10px] md:text-xs font-black tracking-[0.2em] uppercase shadow-xl ring-1 ring-white/10 hover:bg-white/10 transition-all cursor-default group">
                            <Brain className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">Análisis Asistido por IA</span>
                        </div>
                    </motion.div>

                    {/* Titular Titánico */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-black leading-none tracking-tighter">
                            <span className="text-white">Diagnóstico</span> <br />
                            <span className="bg-gradient-to-br from-primary via-white to-primary bg-clip-text text-transparent italic drop-shadow-[0_10px_30px_rgba(110,231,183,0.3)]">Eficiencia Operativa</span>
                        </h1>
                    </motion.div>

                    {/* Cita de Autoridad en Contenedor Glass */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden group">
                            {/* Micro shimmer efecto */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <p className="text-xl md:text-3xl text-gray-400 font-medium leading-tight tracking-tight lowercase">
                                        Si el negocio depende de ti para funcionar...
                                    </p>
                                    <p className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none bg-gradient-to-r from-primary via-[#4ADE80] to-white bg-clip-text text-transparent uppercase tracking-tighter drop-shadow-2xl">
                                        no tienes un sistema.
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-lg md:text-2xl text-gray-400 font-medium italic leading-relaxed">
                                        "Tienes un problema de control que te está costando <br className="hidden md:block" />
                                        <span className="text-primary italic">tiempo, dinero y tranquilidad.</span>"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Indicadores de Scroll */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-2 flex flex-col items-center gap-3 text-primary/50"
                    >
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll para iniciar</p>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* AJUSTE 1 — BRIEFING DE SOLUCIÓN */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto mt-8 px-2 md:px-6"
            >
                <div className="relative p-[1px] rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-white/30 via-primary/40 to-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="bg-[#0C0C0C] backdrop-blur-3xl rounded-[1.9rem] md:rounded-[2.9rem] p-4 md:p-10 relative overflow-hidden group border border-white/5">
                        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                            {/* Text Content */}
                            <div className="lg:col-span-12 xl:col-span-5 space-y-4 md:space-y-6 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[10px] md:text-xs font-black uppercase tracking-[0.25em]">
                                    <Target className="w-3.5 h-3.5 text-primary" /> Briefing de Eficiencia
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight tracking-tight">
                                    Detecta las fugas <br className="hidden md:block" />
                                    <span className="text-primary italic">que frenan tu negocio.</span>
                                </h2>
                                <p className="text-gray-400 font-normal text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    En este video te explico cómo recuperar el control y diseñar el sistema que trabaje por ti para que recuperes el control y la paz mental.
                                </p>
                            </div>

                            {/* YouTube Video */}
                            {youtubeUrl && (
                                <div className="lg:col-span-12 xl:col-span-7 relative w-full group/video">
                                    <div className="relative w-full pb-[56.25%] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 group-hover/video:border-primary/30 transition-all duration-500">
                                        <iframe
                                            src={(youtubeUrl.includes('watch?v=')
                                                ? youtubeUrl.replace('watch?v=', 'embed/')
                                                : youtubeUrl.includes('youtu.be/')
                                                    ? youtubeUrl.replace('youtu.be/', 'youtube.com/embed/')
                                                    : youtubeUrl) + "?autoplay=1&mute=0&modestbranding=1&rel=0&controls=1"}
                                            title="Briefing de Diagnóstico"
                                            className="absolute top-0 left-0 w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Contact Buttons - Inside Module */}
                            <div className="lg:col-span-12 relative z-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-2 w-full">
                                <a
                                    href={whatsappUrl || "https://wa.me/34600000000"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs md:text-base transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center gap-3 flex-1 lg:flex-none justify-center"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span className="hidden sm:inline">Hablar por WhatsApp</span>
                                    <span className="sm:hidden">WhatsApp</span>
                                </a>

                                <button
                                    onClick={scrollToForm}
                                    className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-primary hover:bg-primary-hover text-background-dark rounded-full font-black text-xs md:text-base transition-all duration-300 shadow-[0_15px_40px_rgba(110,231,183,0.3)] hover:scale-105 flex items-center gap-3 flex-1 lg:flex-none justify-center uppercase tracking-widest"
                                >
                                    <Brain className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="hidden sm:inline">Solicitar Diagnóstico</span>
                                    <span className="sm:hidden">Diagnóstico</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <VerticalConnector height="h-20 md:h-24" />

            {/* BLOQUE 2 — ESPEJO DEL DUEÑO (DOLOR REAL) */}
            <section className="relative z-10 py-12 md:py-20 px-4 md:px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 md:space-y-16"
                    >
                        <div className="text-center space-y-3 md:space-y-4">
                            <h2 className="text-3xl md:text-6xl font-display font-bold leading-tight">
                                <span className="bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent">Reconoce los síntomas:</span> <br className="hidden md:block" />
                                <span className="text-gray-400 italic font-light">¿Te suena familiar alguno de estos?</span>
                            </h2>
                        </div>

                        <BracketConnector type="down" height={60} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[
                                { text: "Si hoy no estás presente, tu negocio se resiente de inmediato.", icon: UserMinus, color: "text-blue-400" },
                                { text: "Vives en un incendio constante: solo apagas fuegos del día a día.", icon: Flame, color: "text-orange-400" },
                                { text: "Decisiones críticas basadas en intuición, no en datos reales.", icon: Dice5, color: "text-purple-400" },
                                { text: "El cuello de botella eres tú: todo debe pasar por tus manos.", icon: GitMerge, color: "text-green-400" },
                                { text: "Trabajas sin descanso pero no tienes claridad operativa.", icon: EyeOff, color: "text-red-400" }
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-[#121212] to-[#080808] border-2 border-white/20 hover:border-primary/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                                >
                                    {/* Subtle internal green glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 ${point.color} shrink-0 ring-1 ring-white/10 group-hover:ring-primary/40 shadow-lg`}>
                                            <point.icon className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors">
                                            {point.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <BracketConnector type="up" height={60} />

                        <div className="pt-12 md:pt-24 text-center space-y-3 md:space-y-4">
                            <p className="text-lg md:text-2xl text-gray-400 font-medium italic">
                                Esto no es falta de esfuerzo ni de talento.
                            </p>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative py-4 md:py-8"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-20 animate-pulse" />
                                <p className="relative z-10 text-3xl md:text-6xl lg:text-7xl font-display font-black text-primary uppercase tracking-tighter leading-none">
                                    Es falta de sistema
                                </p>
                            </motion.div>
                            <div className="mt-8 md:mt-12">
                                <VerticalConnector height="h-16 md:h-24" />
                            </div>
                        </div>

                        {/* DIAGRAMA DE PILARES */}
                        <div className="relative mt-8 md:mt-12">
                            {/* Desktop SVG Connectors */}
                            <div className="hidden md:block relative h-28 w-full mb-12">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 110" fill="none" preserveAspectRatio="none">
                                    {/* Outer glow path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 500 0 L 500 40 M 500 40 L 125 40 L 125 110 M 500 40 L 375 40 L 375 110 M 500 40 L 625 40 L 625 110 M 500 40 L 875 40 L 875 110"
                                        stroke="#6ee7b7"
                                        strokeWidth="8"
                                        className="blur-[6px]"
                                    />
                                    {/* Main solid path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 500 0 L 500 40 M 500 40 L 125 40 L 125 110 M 500 40 L 375 40 L 375 110 M 500 40 L 625 40 L 625 110 M 500 40 L 875 40 L 875 110"
                                        stroke="#6ee7b7"
                                        strokeWidth="2.5"
                                    />
                                </svg>
                            </div>

                            {/* Pillars Grid - Mobile Horizontal Scroll */}
                            <div className="relative">
                                <div
                                    onScroll={(e) => handleScroll(e, setPillarIndex)}
                                    className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto pb-8 md:pb-12 snap-x snap-mandatory no-scrollbar px-4 -mx-4 md:mx-0 md:px-0 scroll-smooth"
                                >
                                    {[
                                        {
                                            title: "Comunicación",
                                            desc: "WhatsApp no es un sistema de gestión.",
                                            detail: "De conversaciones infinitas a procesos que fluyen sin tu intervención.",
                                            icon: MessageSquare,
                                            color: "from-blue-500/20"
                                        },
                                        {
                                            title: "Ventas",
                                            desc: "Hacer por hacer no es una estrategia.",
                                            detail: "De captación reactiva a un embudo predecible que convierte solo.",
                                            icon: ShoppingCart,
                                            color: "from-emerald-500/20"
                                        },
                                        {
                                            title: "Autoridad",
                                            desc: "Ser uno más es el camino al olvido.",
                                            detail: "De competir por precio a ser la referencia indiscutible en tu sector.",
                                            icon: Star,
                                            color: "from-amber-500/20"
                                        },
                                        {
                                            title: "Sistemas",
                                            desc: "La tecnología sin orden es caos digital.",
                                            detail: "De herramientas sueltas a un ecosistema integrado que ahorra horas.",
                                            icon: LayoutGrid,
                                            color: "from-purple-500/20"
                                        }
                                    ].map((pillar, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="relative group p-6 md:p-8 rounded-[2rem] bg-gradient-to-t from-[#121212] to-[#0A0A0A] border-2 border-white/30 hover:border-primary/60 transition-all duration-500 text-center overflow-hidden flex flex-col h-full min-w-[85%] md:min-w-0 snap-center shadow-[0_30px_60px_rgba(0,0,0,1)]"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} to-transparent opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />

                                            <div className="relative z-10 space-y-6 flex flex-col h-full">
                                                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shrink-0">
                                                    <pillar.icon className="w-8 h-8" />
                                                </div>
                                                <div className="space-y-4 flex-grow flex flex-col">
                                                    <div>
                                                        <p className="text-xs md:text-sm text-primary font-bold uppercase tracking-[0.3em] mb-2 ml-[0.3em]">
                                                            {pillar.title}
                                                        </p>
                                                        <h4 className="text-lg md:text-xl lg:text-2xl text-white font-bold leading-tight">
                                                            {pillar.desc}
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm md:text-base text-gray-400 font-normal leading-relaxed group-hover:text-gray-200 transition-colors">
                                                        {pillar.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Mobile Indicators */}
                                <div className="flex md:hidden justify-center gap-3 mt-2">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-2 rounded-full transition-all duration-500 ${pillarIndex === i ? 'bg-primary w-10' : 'bg-white/10 w-2'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Inverse Desktop SVG Connectors */}
                            <div className="hidden md:block relative h-24 w-full mt-4">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                                    {/* Outer glow path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 125 0 L 125 40 L 500 40 L 500 100 M 375 0 L 375 40 M 625 0 L 625 40 M 875 0 L 875 40 L 500 40"
                                        stroke="#6ee7b7"
                                        strokeWidth="8"
                                        className="blur-[6px]"
                                    />
                                    {/* Main solid path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 125 0 L 125 40 L 500 40 L 500 100 M 375 0 L 375 40 M 625 0 L 625 40 M 875 0 L 875 40 L 500 40"
                                        stroke="#6ee7b7"
                                        strokeWidth="2.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >

            <VerticalConnector height="h-20" />

            {/* BLOQUE 3 — NORMALIZACIÓN (AUTORIDAD) */}
            <section className="relative z-10 pt-0 pb-16 px-6 md:-mt-8">
                <div className="max-w-4xl mx-auto text-center border-b border-white/5 pb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl md:text-2xl font-display font-medium text-primary uppercase tracking-[0.2em]">
                            Esto no te pasa solo a ti.
                        </h2>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-snug">
                            La mayoría de pequeños negocios no fallan por falta de clientes, sino porque <span className="text-primary italic font-medium">crecen sobre procesos frágiles o inexistentes.</span>
                        </p>
                    </motion.div>
                </div>

                <VerticalConnector height="h-16" />
            </section>

            {/* AJUSTE 2 — MATRIZ DE RECUPERACIÓN DE BENEFICIOS */}
            <section className="relative z-10 py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto relative p-[1px] rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-white/30 via-primary/50 to-white/10 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
                    <div className="bg-[#0A0A0A] bg-gradient-to-br from-primary/[0.12] to-transparent backdrop-blur-3xl rounded-[2.4rem] md:rounded-[3.9rem] p-6 md:p-12 relative overflow-hidden group">
                        {/* Internal glow - Intensified */}
                        <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-primary/20 blur-[150px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
                        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-white/[0.08] blur-[150px] rounded-full group-hover:bg-white/15 transition-all duration-1000" />

                        <div className="relative z-10 space-y-8 md:space-y-12 text-center">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                                    Impacto Financiero
                                </div>
                                <h3 className="text-3xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] tracking-tighter">
                                    <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">Matriz de Recuperación</span> <br className="hidden md:block" />
                                    <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">de Beneficios</span>
                                </h3>
                                <p className="text-lg md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto italic">
                                    Lo que el caos operativo le está costando <br className="hidden md:block" />
                                    <span className="text-primary italic">mes a mes a tu negocio.</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {[
                                    { title: "Capital Humano Perdido", icon: Clock, desc: "Horas de gestión que podrías invertir en estrategia o expansión." },
                                    { title: "Erosión de Márgenes", icon: TrendingUp, desc: "Decisiones reactivas que diluyen la rentabilidad de cada operación." },
                                    { title: "Ventas Sin Cerrar", icon: Zap, desc: "Fugas en el seguimiento que entregan tus clientes a la competencia." },
                                    { title: "Coste de Oportunidad", icon: Target, desc: "Nuevas líneas de negocio que no puedes abrir por falta de estructura." }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center gap-4 md:gap-6 group/item p-6 md:p-10 rounded-[2rem] bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-500 border border-white/5 hover:border-white/20 shadow-lg hover:shadow-primary/5">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover/item:scale-110 group-hover/item:bg-primary group-hover/item:text-black transition-all duration-700 shrink-0 shadow-inner border border-white/5">
                                            <item.icon className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <div className="space-y-2 md:space-y-3">
                                            <p className="text-xl md:text-3xl text-white font-bold leading-tight">{item.title}</p>
                                            <p className="text-sm md:text-base text-gray-400 font-normal leading-relaxed group-hover/item:text-gray-200 transition-colors">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOQUE 4 & 5 — IDENTIFICACIÓN DEL CAOS */}
            <section className="relative z-10 py-16 md:py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16 space-y-4 md:space-y-6"
                    >
                        <h2 className="text-3xl md:text-6xl font-display font-black leading-tight">
                            <span className="bg-gradient-to-r from-white via-white/80 to-primary bg-clip-text text-transparent">El caos no se manifiesta igual</span> <br className="hidden md:block" /> <span className="text-primary italic">en todos los negocios.</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto italic">
                            Aunque el problema de fondo es el mismo, en cada sector aparece de una forma distinta.
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div
                            onScroll={(e) => handleScroll(e, setChaosIndex)}
                            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
                        >
                            {[
                                {
                                    title: "Agendas y Reservas",
                                    icon: Clock,
                                    pain: [
                                        "Cancelaciones que desangran tu rentabilidad",
                                        "Huecos muertos imposibles de rellenar a tiempo",
                                        "Interrupciones constantes por cambios de última hora",
                                        "Un negocio que se detiene por completo sin ti"
                                    ],
                                    color: "from-blue-500/20"
                                },
                                {
                                    title: "Producción y Pedidos",
                                    icon: Zap,
                                    pain: [
                                        "Órdenes cruzadas que generan errores costosos",
                                        "Retrasos en facturación que asfixian tu caja",
                                        "Clientes preguntando por estados que desconoces",
                                        "Cero trazabilidad: no sabes dónde está el dinero"
                                    ],
                                    color: "from-yellow-500/20"
                                },
                                {
                                    title: "Stock e Inventario",
                                    icon: LayoutGrid,
                                    pain: [
                                        "Capital inmovilizado en productos sin rotación",
                                        "Compras por pánico ante la falta de previsión",
                                        "Márgenes que desaparecen en mermas o fugas",
                                        "Decisiones a ciegas que comprometen tu futuro"
                                    ],
                                    color: "from-green-500/20"
                                },
                                {
                                    title: "Proyectos y Consultoría",
                                    icon: Brain,
                                    pain: [
                                        "El conocimiento es un cuello de botella en tu cabeza",
                                        "Entregas caóticas que dañan tu reputación",
                                        "Cobros manuales que siempre se quedan atrás",
                                        "Saturación mental al borde del colapso ejecutivo"
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
                                    className={`group relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-[#121212] to-[#080808] border-2 border-white/20 hover:border-primary/70 shadow-[0_30px_60px_rgba(0,0,0,1)] transition-all duration-500 flex flex-col h-full min-w-[85%] md:min-w-0 snap-center`}
                                >
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 ring-1 ring-white/10 group-hover:ring-primary/40 shadow-xl">
                                            <type.icon className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{type.title}</h3>
                                        <ul className="space-y-4 mb-8 text-left w-full">
                                            {type.pain.map((p, j) => (
                                                <li key={j} className="flex items-start gap-2 text-gray-300 text-sm md:text-base font-normal leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={scrollToForm}
                                        className="relative z-10 mt-auto w-full py-2.5 rounded-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all"
                                    >
                                        Esto se parece a mi negocio
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <VerticalConnector height="h-20" />
            </section>

            {/* BLOQUE 6 — EL ARQUITECTO (ENFOQUE ENGORILATE) */}
            <section className="relative z-10 py-12 md:py-20 px-4 md:px-6 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6 space-y-6 md:space-y-8"
                        >
                            <div className="space-y-3 md:space-y-4">
                                <div className="inline-flex items-center gap-2 text-primary text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
                                    Metodología Engorilate
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight">
                                    No instalo <br />
                                    <span className="text-primary italic">herramientas.</span>
                                </h2>
                                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                                    Diseño el sistema que hace que la tecnología tenga sentido para tu negocio.
                                </p>
                            </div>

                            <div className="space-y-4 pt-2">
                                {[
                                    { title: "Identificación del Caos", sub: "Entender dónde se rompe el proceso actual." },
                                    { title: "Arquitectura del Sistema", sub: "Diseñar el flujo óptimo para tu rentabilidad." },
                                    { title: "Selección Tecnológica", sub: "Implementar la herramienta que mejor lo ejecute." }
                                ].map((step, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-black transition-all duration-500 shrink-0">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="text-lg md:text-xl text-white font-bold mb-0.5">{step.title}</p>
                                            <p className="text-gray-300 font-normal text-sm md:text-base">{step.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6 relative"
                        >
                            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-20" />
                            <div className="relative bg-[#0D0D0D] bg-gradient-to-br from-primary/[0.04] to-transparent backdrop-blur-3xl p-6 md:p-12 rounded-[3rem] border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.8)] text-left">
                                <div className="space-y-6">
                                    <p className="text-xl md:text-3xl lg:text-4xl text-white font-medium leading-tight italic">
                                        "Entiendo cómo funciona tu negocio <span className="text-primary block mt-2 not-italic font-black">cuando tú no estás encima."</span>
                                    </p>
                                    <div className="flex flex-col gap-8">
                                        {/* Perfil alineado a la izquierda */}
                                        <div className="flex items-center gap-5">
                                            <div className="relative group/avatar">
                                                <div className="absolute -inset-1 bg-primary/20 blur-md rounded-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                                                <img
                                                    src="/rafael_profile.png"
                                                    alt="Rafael Alcalde"
                                                    loading="lazy"
                                                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-primary/20 p-1 bg-primary/5"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-white text-xl md:text-2xl font-bold tracking-tight">Rafael Alcalde</p>
                                                <p className="text-primary/70 text-[10px] md:text-xs italic uppercase tracking-[0.3em] font-black">Arquitecto de Eficiencia</p>
                                            </div>
                                        </div>

                                        {/* Frase CTA */}
                                        <p className="text-gray-400 text-sm md:text-lg font-medium leading-relaxed max-w-lg">
                                            Ayudo a dueños de negocio a recuperar su libertad mediante sistemas y tecnología de alto rendimiento.
                                        </p>

                                        {/* Botones alineados en la misma fila */}
                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            <a
                                                href="/contact"
                                                className="relative group/btn flex items-center justify-center px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary via-[#4ADE80] to-primary text-black rounded-2xl font-black text-[10px] md:text-sm transition-all duration-300 hover:scale-[1.05] shadow-[0_15px_40px_rgba(110,231,183,0.3)] hover:shadow-[0_20px_50px_rgba(110,231,183,0.5)] uppercase tracking-[0.1em] md:tracking-[0.15em] text-center overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                                <span className="relative z-10">Conóceme</span>
                                            </a>
                                            <a
                                                href={linkedinUrl || "https://www.linkedin.com/in/alcalderafael/"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative group/btn flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-4 bg-gradient-to-br from-[#0077B5] via-[#00A0DC] to-[#0077B5] text-white rounded-2xl font-black text-[10px] md:text-sm transition-all duration-300 hover:scale-[1.05] shadow-[0_15px_40px_rgba(0,119,181,0.3)] hover:shadow-[0_20px_50px_rgba(0,119,181,0.5)] uppercase tracking-[0.1em] md:tracking-[0.15em] text-center border border-white/20 overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                                <Linkedin className="w-3 h-3 md:w-4 md:h-4 fill-white relative z-10" />
                                                <span className="relative z-10">LinkedIn</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <VerticalConnector height="h-24 md:h-32" />

            {/* SECCIÓN FINAL — AUDITORÍA Y ACCIÓN (FUSIONADA) */}
            <section className="relative z-10 py-16 md:py-24 px-4 md:px-6 overflow-hidden">
                {/* Background high-impact glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[180px] rounded-full opacity-40 animate-pulse" />

                <div className="max-w-6xl mx-auto relative px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#0D0D0D] backdrop-blur-3xl p-6 md:p-16 rounded-[3rem] md:rounded-[4rem] border-2 border-white/40 text-center space-y-10 md:space-y-16 shadow-[0_60px_120px_rgba(0,0,0,1)] relative overflow-hidden group"
                    >
                        {/* Heading Area */}
                        <div className="space-y-4 md:space-y-6 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                                Recompensa Inmediata
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tighter">
                                <span className="bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent italic">Tu Auditoría de Eficiencia</span> <br />
                                <span className="text-white">Lista en 7 Minutos.</span>
                            </h2>
                            <p className="text-lg md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed italic">
                                Tras responder 14 preguntas clave, nuestra IA procesará tu estructura para entregarte este informe técnico personalizado.
                            </p>
                        </div>

                        {/* Core Content: Mockup & Stats */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto relative z-10">
                            {/* Visual Reward (Mockup) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
                                <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-br from-white/20 to-transparent border border-white/20 shadow-2xl">
                                    <img
                                        src="/diagnosis_report_mockup.png"
                                        alt="Mockup del Informe de Eficiencia IA"
                                        loading="lazy"
                                        className="rounded-[2rem] w-full h-auto shadow-inner"
                                    />
                                    <div className="absolute -bottom-6 -right-6 bg-white p-3 md:p-4 rounded-xl shadow-2xl border border-primary/20 flex items-center gap-3">
                                        <PenTool className="w-5 h-5 text-primary" />
                                        <p className="text-black font-black text-xs uppercase tracking-tighter">Auditoría PDF</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Logic & Call to Action Area */}
                            <div className="space-y-8 md:space-y-10">
                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { text: "7 min", sub: "Tiempo", icon: Clock },
                                        { text: "Análisis IA", sub: "Motor", icon: Brain },
                                        { text: "Estrategia", sub: "Hojas ruta", icon: Target }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1.5 shadow-xl">
                                            <stat.icon className="w-5 h-5 text-primary" />
                                            <div className="text-center">
                                                <p className="text-white font-bold text-xs md:text-base leading-none mb-1">{stat.text}</p>
                                                <p className="text-gray-400 font-bold text-[8px] md:text-[10px] uppercase tracking-widest leading-none">{stat.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary Benefits */}
                                <ul className="space-y-4 text-left">
                                    {[
                                        "Cálculo de capital perdido por ineficiencias.",
                                        "Mapa de calor de tus cuellos de botella.",
                                        "Plan técnico para recuperar tus márgenes."
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-200 text-sm md:text-lg">
                                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(110,231,183,0.5)]" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Pulsing Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={scrollToForm}
                                        className="w-full group animate-pulse-slow py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] bg-gradient-to-r from-primary via-[#4ADE80] to-primary text-black font-black text-lg md:text-2xl transition-all duration-500 hover:scale-[1.03] shadow-[0_20px_60px_rgba(110,231,183,0.4)] hover:shadow-[0_25px_80px_rgba(110,231,183,0.6)] uppercase tracking-[0.2em] relative overflow-hidden"
                                    >
                                        {/* Efecto de brillo al pasar el ratón */}
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <span className="relative z-10 flex items-center justify-center gap-4 text-center">
                                            Empezar Diagnóstico
                                            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform" />
                                        </span>
                                    </button>
                                    <p className="mt-4 text-center text-gray-500 text-[10px] md:text-xs font-medium italic">
                                        Privacidad 100% garantizada. Análisis exclusivamente técnico.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FORMULARIO DE DIAGNÓSTICO */}
            <section id="diagnosis-form-section" ref={formRef} className="relative z-10 pt-16 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 bg-[#080808]">
                <div className="max-w-5xl mx-auto">
                    <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-b from-white/25 to-transparent">
                        <div className="bg-[#0F0F0F] backdrop-blur-xl rounded-[2.95rem] p-6 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden ring-1 ring-white/10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                            <DiagnosisForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinematic background text */}
            <div className="fixed bottom-10 right-10 z-0 opacity-[0.03] pointer-events-none hidden lg:block">
                <div className="text-[20rem] font-display font-black text-white select-none whitespace-nowrap">
                    EFFICIENCY
                </div>
            </div>
        </div >
    );
};

export default Diagnosis;
