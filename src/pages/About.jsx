import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { History, Brain, ShieldCheck, ArrowRight, Zap, Quote, Target, Star, Linkedin, MessageCircle, Instagram, Mail } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import { supabase } from '../lib/supabaseClient';

const About = () => {
    const [siteConfig, setSiteConfig] = useState({
        linkedin_url: 'https://linkedin.com/in/engorilate',
        about_youtube_url: '',
        whatsapp_url: '',
        instagram_url: '',
        contact_email: ''
    });

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

    // Helper function to normalize YouTube URLs to embed format
    const normalizeYouTubeUrl = (url) => {
        if (!url) return '';

        try {
            // Already in embed format
            if (url.includes('/embed/')) return url;

            let videoId = '';

            // Extract video ID from various YouTube URL formats
            if (url.includes('youtu.be/')) {
                // Format: https://youtu.be/VIDEO_ID or https://youtu.be/VIDEO_ID?si=...
                videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
            } else if (url.includes('youtube.com/watch')) {
                // Format: https://www.youtube.com/watch?v=VIDEO_ID
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('v');
            } else if (url.includes('youtube.com/shorts/')) {
                // Format: https://www.youtube.com/shorts/VIDEO_ID
                videoId = url.split('/shorts/')[1].split('?')[0];
            }

            // Return embed URL if we found a video ID
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        } catch (e) {
            console.error('Error normalizing YouTube URL:', e);
            return url;
        }
    };

    // Normalize YouTube URL when config is loaded
    const normalizedYouTubeUrl = (() => {
        const baseUrl = normalizeYouTubeUrl(siteConfig.about_youtube_url);
        if (!baseUrl) return '';

        // Add quality parameters to force HD playback
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}vq=hd1080&hd=1&rel=0&modestbranding=1`;
    })();

    return (
        <div className="relative pt-64 pb-32 min-h-screen selection:bg-primary selection:text-black bg-gradient-to-br from-black via-[#0a1a0f] to-black">
            {/* Green ambient glow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(110,231,183,0.08)_0%,_transparent_50%)] pointer-events-none" />

            <SEO
                title="Sobre mí | Rafael Alcalde Molina | Engorilate"
                description="Economista y Business Controller transformado en Arquitecto de Automatización. Ayudo a pequeños negocios a poner orden operativo antes de automatizar."
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* HERO SECTION / PROFILE */}
                <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-center mb-32 lg:mb-48">
                    <div className="lg:w-2/5 relative">
                        {/* Ambient Glow behind photo */}
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-[3/4] max-w-[400px] mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl group"
                        >
                            <img
                                alt="Rafael Alcalde Molina"
                                className="w-full h-full object-cover object-[center_15%] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                src="/rafael.png"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Stats overlay */}
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-0.5">Perfil</p>
                                    <p className="text-white text-sm font-display font-bold">Economista & Controller</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Zap className="w-5 h-5 text-black" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-3/5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Economista de formación
                            </div>

                            <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] text-white tracking-tighter">
                                Engorilao por <br />
                                <span className="text-primary italic">vocación.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl italic">
                                Ayudo a poner un orden industrial donde hay caos operativo. Mi trabajo no es venderte software, sino construir el motor que te devuelva tu tiempo.
                            </p>

                            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4">
                                <div className="px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                                    <p className="text-lg md:text-2xl font-bold text-white mb-1">+5 años</p>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">En Control de Gestión</p>
                                </div>
                                <div className="px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                                    <p className="text-lg md:text-2xl font-bold text-white mb-1">Economista</p>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Colegiado & Especialista</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* THE MANIFESTO / APPROACH */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-display text-4xl font-bold text-white mb-8 tracking-tight uppercase">
                                De dónde sale <br />
                                <span className="text-primary italic">este enfoque</span>
                            </h2>
                            <Quote className="w-12 h-12 text-primary/30 mb-6" />
                            <p className="text-gray-200 text-xl font-medium leading-relaxed italic">
                                "La tecnología aplicada al desorden solo lo acelera. Primero ordenamos, luego automatizamos. No hay otro camino."
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-12">
                        {normalizedYouTubeUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                            >
                                <iframe
                                    src={normalizedYouTubeUrl}
                                    title="Sobre Rafael Alcalde"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
                            </motion.div>
                        )}

                        {/* Contact Buttons Row */}
                        <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 shadow-[0_20px_50px_rgba(110,231,183,0.1)]">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                <a
                                    href={siteConfig.whatsapp_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl bg-black/40 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 border-2 border-white/10 transition-all group backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-all">
                                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#25D366]" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white text-xs md:text-sm font-black group-hover:text-[#25D366] transition-colors uppercase">WhatsApp</div>
                                        <div className="text-[10px] md:text-xs text-gray-500 font-medium">Respuesta inmediata</div>
                                    </div>
                                </a>

                                <a
                                    href={siteConfig.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl bg-black/40 hover:bg-[#E1306C]/10 hover:border-[#E1306C]/40 border-2 border-white/10 transition-all group backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#E1306C]/20 transition-all">
                                        <Instagram className="w-5 h-5 md:w-6 md:h-6 text-[#E1306C]" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white text-xs md:text-sm font-black group-hover:text-[#E1306C] transition-colors uppercase">Instagram</div>
                                        <div className="text-[10px] md:text-xs text-gray-500 font-medium">Casos reales</div>
                                    </div>
                                </a>

                                <a
                                    href={siteConfig.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl bg-black/40 hover:bg-[#0077B5]/10 hover:border-[#0077B5]/40 border-2 border-white/10 transition-all group backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#0077B5]/20 transition-all">
                                        <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-[#0077B5]" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white text-xs md:text-sm font-black group-hover:text-[#0077B5] transition-colors uppercase">LinkedIn</div>
                                        <div className="text-[10px] md:text-xs text-gray-500 font-medium">Trayectoria profesional</div>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${siteConfig.contact_email}`}
                                    className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl bg-black/40 hover:bg-primary/10 hover:border-primary/40 border-2 border-white/10 transition-all group backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white text-xs md:text-sm font-black group-hover:text-primary transition-colors uppercase">Email</div>
                                        <div className="text-[10px] md:text-xs text-gray-500 font-medium">{siteConfig.contact_email?.split('@')[0] || 'Contacto'}</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <section className="prose prose-invert prose-2xl text-gray-200 leading-relaxed font-normal">
                            <p>
                                Vengo de los números. Durante años en el mundo del control de gestión, analicé por qué las empresas perdían dinero.
                                <span className="text-primary font-black underline decoration-primary/50"> La respuesta nunca era falta de herramientas</span>, siempre era falta de claridad operativa.
                            </p>
                            <p className="mt-8 text-gray-300">
                                He visto a dueños de negocios brillantes quemarse en tareas de copiar y pegar. He visto el techo de cristal de "no puedo crecer sin explotar". Por eso creé Engorilate: para aplicar lógica industrial a negocios que quieren ser libres.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Simplicidad Radical",
                                    text: "Si se puede hacer con un papel y un lápiz, no montemos un software complejo. Menos piezas = menos roturas.",
                                    icon: Target,
                                },
                                {
                                    title: "Cero Humo",
                                    text: "Hablamos claro. Tu negocio no necesita sinergias, necesita que los pedidos salgan y no se pierdan leads.",
                                    icon: ShieldCheck,
                                },
                                {
                                    title: "Foco Exclusivo",
                                    text: "Trabajo con proyectos limitados. Necesito entender tu negocio casi tan bien como tú para automatizarlo con éxito.",
                                    icon: Brain,
                                },
                                {
                                    title: "Garantía de Tiempo",
                                    text: "Si no veo claro un ahorro de al menos 5-10 horas semanales para ti, no acepto el proyecto. Así de simple.",
                                    icon: Star,
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="bg-gradient-to-br from-[#121212] to-[#080808] border-2 border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 hover:border-white/30 shadow-2xl group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-all duration-500 shadow-inner">
                                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors" />
                                    </div>
                                    <h4 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3 tracking-tight uppercase italic">{item.title}</h4>
                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-normal italic">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MISSION SECTION */}
                <div className="mb-10 relative">
                    <div className="absolute -inset-20 bg-primary/10 blur-[130px] rounded-full opacity-30 -z-10 animate-pulse"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto p-10 md:p-14 text-center relative"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black tracking-[0.3em] uppercase mb-8 shadow-xl">
                            <Target className="w-3.5 h-3.5" />
                            El Propósito
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">
                            Mi <span className="text-primary drop-shadow-[0_0_15px_rgba(110,231,183,0.4)]">Misión</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white font-bold leading-tight italic max-w-2xl mx-auto tracking-tight">
                            "Que dejes de ser el <span className="text-primary font-black underline decoration-white/30 underline-offset-8 decoration-4">bombero</span> de tu propio negocio. Mi misión es que recuperes tus tardes y que tu empresa funcione por fin como un reloj."
                        </p>
                    </motion.div>
                </div>

                {/* VALUES SECTION */}
                <div className="mb-10">
                    <div className="text-center mb-8">
                        <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
                            Mis <span className="text-primary italic drop-shadow-[0_0_15px_rgba(110,231,183,0.3)]">Valores</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {[
                            {
                                title: "Honestidad Brutal",
                                text: "Si algo no va a funcionar o no tiene sentido automatizarlo, te lo diré de frente. Prefiero perder un proyecto que perder mi reputación.",
                                icon: ShieldCheck
                            },
                            {
                                title: "Claridad",
                                text: "Los números no mienten. Busco que entiendas exactamente qué pasa en tu negocio sin tecnicismos innecesarios.",
                                icon: Target
                            },
                            {
                                title: "Compromiso",
                                text: "No soy de los que 'instalan y desaparecen'. Me involucro en el resultado porque tu éxito operativo es mi mejor carta de presentación.",
                                icon: Zap
                            }
                        ].map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gradient-to-b from-[#121212] to-[#080808] border-2 border-white/10 p-6 md:p-8 rounded-[2rem] text-center hover:border-primary/40 transition-all group hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-inner">
                                    <val.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(110,231,183,0.5)] transition-all" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3 uppercase tracking-tight italic leading-tight">{val.title}</h3>
                                <p className="text-gray-200 font-normal italic text-xs md:text-sm leading-relaxed">{val.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* UNIFIED CONVERSION TERMINAL */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#050505] border-2 border-white/20 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
                >
                    {/* Background effects */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-40 -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-30 -z-10"></div>

                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Left: Diagnosis Hook */}
                        <div className="p-10 md:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-white/10 bg-white/[0.02]">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8 w-fit shadow-xl">
                                <Brain className="w-4 h-4" />
                                Paso 1: El Diagnóstico
                            </div>

                            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none uppercase italic">
                                ¿TU NEGOCIO ES <br />
                                <span className="text-primary drop-shadow-[0_0_15px_rgba(110,231,183,0.4)]">AUTÓNOMO</span> <br />
                                O DEPENDE DE TI?
                            </h2>

                            <p className="text-xl text-gray-400 mb-10 font-medium italic leading-relaxed">
                                Antes de hablar, descubre exactamente dónde están tus fugas de rentabilidad con nuestra herramienta de análisis IA.
                            </p>

                            <div className="space-y-4 mb-12">
                                <div className="flex items-center gap-3 text-sm text-gray-500 font-bold uppercase tracking-wider">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(110,231,183,1)]"></div>
                                    Análisis Operativo en 2 min
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 font-bold uppercase tracking-wider">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(110,231,183,1)]"></div>
                                    Resultados Estratégicos Imediatos
                                </div>
                            </div>

                            <Link
                                to="/diagnostico"
                                className="group/btn relative inline-flex items-center justify-center gap-3 bg-primary hover:bg-white text-black font-black px-6 py-4 rounded-xl text-xs transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(110,231,183,0.3)] w-full md:w-fit"
                            >
                                OBTIENE EL DIAGNÓSTICO GRATIS
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right: Direct Contact Form */}
                        <div className="p-10 md:p-16 flex flex-col justify-center">
                            <div className="mb-10">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter uppercase italic leading-none">
                                    ¿Hablamos <br />
                                    <span className="text-primary">directamente?</span>
                                </h3>
                                <p className="text-gray-400 text-sm font-medium italic">
                                    Si ya sabes que quieres automatizar, rellena el formulario y diseñaremos tu motor de crecimiento.
                                </p>
                            </div>

                            <ContactForm
                                source="About Page - Fused Terminal"
                                className="space-y-4"
                            />

                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex flex-col items-center md:items-start gap-1">
                                    <span className="text-xs text-white font-black uppercase tracking-widest italic">Rafael Alcalde Molina</span>
                                    <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Economista & Controller</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={siteConfig.whatsapp_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all group shadow-xl"
                                    >
                                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                                        <span className="text-[10px] text-white font-black uppercase tracking-widest group-hover:underline">WhatsApp</span>
                                    </a>
                                    <a
                                        href={siteConfig.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30 transition-all group shadow-xl"
                                    >
                                        <Linkedin className="w-4 h-4 text-[#0077B5]" />
                                        <span className="text-[10px] text-white font-black uppercase tracking-widest group-hover:underline">LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
