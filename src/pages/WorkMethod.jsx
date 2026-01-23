import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    CheckCircle,
    ArrowRight,
    TrendingUp,
    Shield,
    Bot,
    Clock,
    Target,
    Layout,
    Cpu,
    Database,
    CreditCard,
    BarChart,
    ChevronDown,
    Laptop,
    Mail,
    Instagram,
    Linkedin,
    MapPin,
    MessageSquare,
    Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabaseClient';
import ContactForm from '../components/ContactForm';
import { analytics } from '../lib/analytics';

// VLS Simulators
// VLS Simulators - Lazy Loaded
const LeakDetectionSimulator = React.lazy(() => import('../components/work-method/LeakDetectionSimulator'));
const SystemBuilderSimulator = React.lazy(() => import('../components/work-method/SystemBuilderSimulator'));
const LeadAttractionSimulator = React.lazy(() => import('../components/work-method/LeadAttractionSimulator'));
const ControlFreedomSimulator = React.lazy(() => import('../components/work-method/ControlFreedomSimulator'));
const TechWalkthroughModal = React.lazy(() => import('../components/work-method/TechWalkthroughModal'));

const WorkMethod = () => {
    const [siteConfig, setSiteConfig] = useState({
        work_method_youtube_url: '',
        whatsapp_url: 'https://wa.me/34600000000',
        instagram_url: 'https://instagram.com/engorilate',
        linkedin_url: 'https://linkedin.com/in/engorilate',
        contact_email: 'r.alcalde@engorilate.com'
    });
    const [selectedTech, setSelectedTech] = useState(null);
    const [isTechModalOpen, setIsTechModalOpen] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await supabase.from('site_config').select('key, value');
                if (data) {
                    const config = {};
                    data.forEach(item => { config[item.key] = item.value || ''; });
                    setSiteConfig(prev => ({ ...prev, ...config }));
                }
            } catch (e) { console.error(e); }
        };
        fetchConfig();
    }, []);

    const normalizeYouTubeUrl = (url) => {
        if (!url) return '';
        try {
            if (url.includes('/embed/')) return url;
            let videoId = '';
            if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
            } else if (url.includes('youtube.com/watch')) {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('v');
            } else if (url.includes('youtube.com/shorts/')) {
                videoId = url.split('/shorts/')[1].split('?')[0];
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        } catch (e) { return url; }
    };

    const normalizedYouTubeUrl = (() => {
        const baseUrl = normalizeYouTubeUrl(siteConfig.work_method_youtube_url);
        if (!baseUrl) return '';
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}vq=hd1080&hd=1&rel=0&modestbranding=1`;
    })();

    const timelinePhases = [
        {
            title: "Detectar Fugas de Dinero",
            week: "Fase 1",
            process: "Analizamos dónde estás perdiendo clientes y tiempo hoy mismo para tapar esos huecos desde el minuto uno.",
            objective: "Crear una oferta que tus clientes no puedan rechazar.",
            result: "Hoja de ruta clara para tu negocio.",
            icon: Target,
            simulator: LeakDetectionSimulator
        },
        {
            title: "Construir tu Sistema Automático",
            week: "Fase 2",
            process: "Montamos toda la tecnología que trabajará por ti: desde tu nueva web hasta la gestión automática de tus clientes.",
            objective: "Que todo funcione solo. Nosotros lo montamos todo; tú no tienes que tocar el código.",
            result: "Tu nueva máquina de ventas lista.",
            icon: Layout,
            simulator: SystemBuilderSimulator
        },
        {
            title: "Atraer Clientes que Sí PAGAN",
            week: "Fase 3",
            process: "Ponemos anuncios que atraen a la gente adecuada. Filtramos a los curiosos para que solo hables con quien de verdad quiere comprar.",
            objective: "Llenar tu agenda. Personas interesadas llamando a tu puerta cada día.",
            result: "Agenda llena de prospectos reales.",
            icon: Zap,
            simulator: LeadAttractionSimulator
        },
        {
            title: "Control Total y Libertad",
            week: "Fase 4",
            process: "Ajustamos los últimos detalles y te entregamos las llaves de un sistema que ya está trayendo dinero.",
            objective: "Que seas libre. Te enseñamos a manejar el mando de control para que el negocio no dependa de ti.",
            result: "Sistema funcionando al 100%.",
            icon: TrendingUp,
            simulator: ControlFreedomSimulator
        }
    ];

    const techStack = [
        { id: "gohighlevel", name: "Cerebro CRM", desc: "Gestión centralizada de leads y CRM.", icon: Database, color: "#2563eb" },
        { id: "claude", name: "IA Generativa", desc: "IA avanzada para copywriting y flujos lógicos.", icon: Bot, color: "#d4d4d8" },
        { id: "stripe", name: "Pasarela Pagos", desc: "Infraestructura de pagos automatizada.", icon: CreditCard, color: "#f59e0b" },
        { id: "metabusiness", name: "Ads Manager", desc: "Motor de captación ultra-segmentado.", icon: BarChart, color: "#0ea5e9" }
    ];

    const trackClick = (method) => {
        analytics.trackEvent('contact_click', { method });
    };

    return (
        <div className="relative pt-32 md:pt-48 pb-24 min-h-screen selection:bg-primary selection:text-black bg-[#020202] text-white">
            <SEO
                title="Cómo Trabajamos | Ingeniería de Ventas | Engorilate"
                description="Descubre nuestro sistema operativo de crecimiento profesionalizado con ingeniería de precisión."
            />

            {/* Ambient Background Elements - High Intensity Atmosphere */}
            <BackgroundMesh />
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Fixed atmospheric glows that feel "alive" */}
                <div className="absolute top-[5%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" />
                <div className="absolute bottom-[5%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" style={{ animationDuration: '8s' }} />

                {/* Central gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.05] opacity-50" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* HERO SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-24 text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-mono tracking-widest uppercase mb-8 backdrop-blur-sm"
                    >
                        <Cpu className="w-3.5 h-3.5 animate-pulse" />
                        Sistema Operativo de Negocios
                    </motion.div>

                    <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black leading-none mb-8 tracking-tighter uppercase italic">
                        SISTEMAS QUE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 drop-shadow-[0_0_20px_rgba(110,231,183,0.5)]">VENDEN POR TI.</span>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-3xl leading-relaxed italic mb-10 border-l-2 lg:border-l-4 border-primary/40 pl-4 md:pl-6">
                        Creamos sistemas automáticos que llenan tu agenda de clientes cada mañana.
                        Profesionalizamos tu forma de vender para que <span className="text-white font-bold">recuperes tu tiempo</span>.
                    </p>
                </motion.div>

                {/* VIDEO SECTION (VSL) WITH PREMIUM FRAME - REDUCED SIZE */}
                <div className="mb-40 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10 w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-black/40 backdrop-blur-xl group"
                    >
                        {normalizedYouTubeUrl ? (
                            <iframe
                                src={normalizedYouTubeUrl}
                                title="Sistema Operativo de Crecimiento - Engorilate"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-black to-[#050505] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                                <div className="absolute inset-0 opacity-10 scale-110 group-hover:scale-100 transition-transform duration-1000">
                                    <img src="/hero-gorilla-engine.png" className="w-full h-full object-cover grayscale" alt="" />
                                </div>
                                <div className="relative z-20">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 border border-primary/40 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                                        <Zap className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">PLAY SYSTEM REVEAL</h3>
                                    <p className="text-white/80 text-sm max-w-sm mx-auto italic font-light">
                                        Descubre la infraestructura técnica que escala negocios de servicios.
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg pointer-events-none" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg pointer-events-none" />
                    </motion.div>
                </div>

                {/* THE SYSTEMPHASES: THE 4 WEEKS JOURNEY */}
                <div className="mb-40">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div className="max-w-2xl">
                            <div className="inline-block px-3 py-1 bg-primary/5 border border-primary/20 rounded-md text-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-4">
                                PROTOCOLO DE DESPLIEGUE
                            </div>
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white uppercase italic tracking-tighter leading-none mb-6">
                                DE LA AUDITORÍA <span className="text-primary italic">A LA ESCALA</span>
                            </h2>
                            <p className="text-white/80 text-lg font-light italic leading-relaxed">
                                No creemos en soluciones genéricas. Hemos diseñado un proceso de cuatro etapas diseñado para transformar el caos manual en un sistema de ventas predecible y eficiente.
                            </p>
                        </div>
                        <p className="text-white/40 font-mono text-xs uppercase tracking-widest hidden md:block border border-white/10 px-4 py-2 rounded-lg">
                            Estándar Industrial v2.1
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {timelinePhases.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative bg-[#0d0d0d] border border-white/[0.2] rounded-[2.5rem] p-8 md:p-12 overflow-hidden hover:border-primary/60 transition-all duration-700 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)_inset] group">

                                    {/* Reactive Background Glow for this specific box */}
                                    <div className="absolute inset-0 bg-primary/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                                    {/* High Intensity Rim Light */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80" />
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-40" />

                                    {/* Glass Overlay Effect - Dynamic Blob */}
                                    <div className="absolute -left-20 -top-20 w-[400px] h-[400px] bg-primary/[0.2] blur-[100px] rounded-full opacity-20 transition-opacity duration-1000" />

                                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                                        <div className="lg:col-span-1 border-r border-white/10 pr-8 hidden lg:block">
                                            <span className="text-7xl font-black text-white/10 font-mono leading-none">
                                                0{i + 1}
                                            </span>
                                        </div>

                                        <div className="lg:col-span-11 relative">
                                            {/* Mobile Phase Number Overlay */}
                                            <div className="absolute -top-4 -right-4 text-6xl font-black text-white/[0.05] font-mono leading-none lg:hidden pointer-events-none">
                                                0{i + 1}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                                                <div className="space-y-6 relative z-10">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded border border-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                                            {phase.week}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase italic leading-tight">
                                                        {phase.title}
                                                    </h3>

                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-primary font-black mb-3 flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                                                QUÉ HACEMOS
                                                            </h4>
                                                            <p className="text-white/80 text-base font-normal leading-relaxed pr-4">
                                                                {phase.process}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-primary font-black mb-3 flex items-center gap-2">
                                                                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                                                                TU BENEFICIO
                                                            </h4>
                                                            <div className="relative p-5 rounded-2xl bg-primary/[0.07] border border-primary/20 shadow-inner overflow-hidden group/benefit">
                                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/benefit:opacity-100 transition-opacity" />
                                                                <p className="relative z-10 text-white text-base font-semibold italic leading-relaxed">
                                                                    {phase.objective}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t border-white/5">
                                                        <div className="inline-flex items-start gap-4 bg-black/40 p-4 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-all shadow-inner">
                                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                                                                <CheckCircle className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest leading-none mb-2">Entregable Final</p>
                                                                <p className="text-sm text-white font-bold uppercase tracking-tight leading-none">{phase.result}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <phase.simulator />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* TECH STACK: TRANSPARENCIA TOTAL */}
                <div className="mb-40">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
                            MOTOR <span className="text-primary italic">TECNOLÓGICO</span>
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-light italic leading-relaxed">
                            No experimentamos con herramientas. Instalamos tecnología de nivel industrial validada para la estabilidad de tu sistema.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {techStack.map((item, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => {
                                    setSelectedTech(item);
                                    setIsTechModalOpen(true);
                                }}
                                className="relative bg-[#111111] border border-white/[0.08] p-4 md:p-10 rounded-2xl md:rounded-[2.5rem] text-center group hover:bg-[#161616] hover:border-white/20 transition-all duration-500 shadow-2xl overflow-hidden cursor-pointer"
                            >
                                {/* Brand Glow Background */}
                                <div
                                    className="absolute -bottom-20 -right-20 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                                    style={{ backgroundColor: item.color }}
                                />

                                <div className="flex flex-col md:block items-center">
                                    <div
                                        className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl flex items-center justify-center mx-auto mb-3 md:mb-8 border transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                                        style={{
                                            backgroundColor: `${item.color}10`, // 10% opacity
                                            borderColor: `${item.color}30`, // 30% opacity
                                            boxShadow: `0 0 30px ${item.color}15`
                                        }}
                                    >
                                        <item.icon
                                            className="w-6 h-6 md:w-10 md:h-10 transition-colors duration-500"
                                            style={{ color: item.color }}
                                        />
                                    </div>
                                    <h4 className="text-[10px] md:text-xl font-bold text-white mb-1 md:mb-4 uppercase italic tracking-tighter">{item.name}</h4>
                                    <p className="hidden md:block text-white/70 text-sm font-light italic leading-relaxed px-2 group-hover:text-white/90 transition-colors">{item.desc}</p>

                                    {/* Action Label */}
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Ver Tecnología</span>
                                        <ArrowRight className="w-2.5 h-2.5 text-primary group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 group-hover:w-1/2 transition-all duration-700 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* FINAL SECTION: STRATEGY SESSION */}
                <div className="pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
                        {/* LEFT: Compact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7 bg-gradient-to-br from-[#121212] to-[#080808] border-2 border-white/20 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex flex-col justify-center relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                <Laptop className="w-32 h-32 text-white" />
                            </div>

                            <div className="relative z-10 mb-8">
                                <h2 className="font-display text-3xl font-black text-white mb-3 uppercase tracking-tight">Sesión de Estrategia</h2>
                                <p className="text-gray-400 text-sm font-medium">Cuéntanos tu cuello de botella actual. Seremos breves y directos.</p>
                            </div>
                            <ContactForm source="Work Method Page" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 flex flex-col gap-4"
                        >
                            {/* Manual Contact Card */}
                            <div className="bg-gradient-to-br from-[#121212] to-[#080808] border-2 border-white/20 p-8 md:p-10 rounded-[2.5rem] h-full flex flex-col justify-center shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-white text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-primary" /> Vía Rápida
                                    </h3>
                                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                                        Detección Instantánea
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={siteConfig.whatsapp_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackClick('whatsapp')}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 border-2 border-transparent transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-all">
                                            <MessageSquare className="w-6 h-6 text-[#25D366]" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-black group-hover:text-[#25D366] transition-colors uppercase">WhatsApp</div>
                                            <div className="text-xs text-gray-500 font-medium">Respuesta inmediata</div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-700 ml-auto group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                                    </a>

                                    <a
                                        href={siteConfig.instagram_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackClick('instagram')}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-[#E1306C]/10 hover:border-[#E1306C]/40 border-2 border-transparent transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#E1306C]/20 transition-all">
                                            <Instagram className="w-6 h-6 text-[#E1306C]" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-black group-hover:text-[#E1306C] transition-colors uppercase">Instagram</div>
                                            <div className="text-xs text-gray-500 font-medium">Casos reales</div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-700 ml-auto group-hover:text-[#E1306C] group-hover:translate-x-1 transition-all" />
                                    </a>

                                    <a
                                        href={siteConfig.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackClick('linkedin')}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-[#0077B5]/10 hover:border-[#0077B5]/40 border-2 border-transparent transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#0077B5]/20 transition-all">
                                            <Linkedin className="w-6 h-6 text-[#0077B5]" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-black group-hover:text-[#0077B5] transition-colors uppercase">LinkedIn</div>
                                            <div className="text-xs text-gray-500 font-medium">Trayectoria profesional</div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-700 ml-auto group-hover:text-[#0077B5] group-hover:translate-x-1 transition-all" />
                                    </a>

                                    <button
                                        onClick={() => {
                                            trackClick('email');
                                            const mailtoUrl = `mailto:${siteConfig.contact_email}?subject=${encodeURIComponent('Sesión de Estrategia Operativa - Engorilate')}`;
                                            const link = document.createElement('a');
                                            link.href = mailtoUrl;
                                            link.target = '_self';
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-white/20 border-2 border-transparent transition-all group cursor-pointer text-left"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all text-white/40 group-hover:text-primary">
                                            <Mail className="w-6 h-6 transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-black transition-colors uppercase">Email</div>
                                            <div className="text-xs text-gray-500 font-medium group-hover:text-primary/70 transition-colors">{siteConfig.contact_email}</div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-700 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </button>
                                </div>

                                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>Cartagena, Murcia (España)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Atención Activa</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* REFINED BRAND SIGNATURE */}
                <div className="text-center py-10 opacity-20 hover:opacity-100 transition-opacity duration-700">
                    <p className="text-[10px] font-mono uppercase tracking-[1em] text-white pr-[1em]">
                        NO TE ENGORILES, INSTALA SISTEMAS
                    </p>
                </div>
            </div>

            <React.Suspense fallback={null}>
                {isTechModalOpen && (
                    <TechWalkthroughModal
                        isOpen={isTechModalOpen}
                        onClose={() => setIsTechModalOpen(false)}
                        tech={selectedTech}
                    />
                )}
            </React.Suspense>
        </div>
    );
};

export default WorkMethod;
