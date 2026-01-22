import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Play, MessageSquare, Instagram, Linkedin } from 'lucide-react';
import { analytics } from '../../lib/analytics';
import { supabase } from '../../lib/supabaseClient';

const DiagnosisCTA = ({ className = "" }) => {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [siteConfig, setSiteConfig] = useState({
        whatsapp_url: '',
        instagram_url: '',
        linkedin_url: ''
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await supabase.from('site_config').select('key, value');
                if (data) {
                    const config = {};
                    data.forEach(item => { config[item.key] = item.value || ''; });
                    setYoutubeUrl(config.about_youtube_url || '');
                    setSiteConfig({
                        whatsapp_url: config.whatsapp_url || '',
                        instagram_url: config.instagram_url || '',
                        linkedin_url: config.linkedin_url || ''
                    });
                }
            } catch (e) {
                console.error('Error fetching youtube config:', e);
            }
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
        } catch (e) {
            return url;
        }
    };

    const normalizedUrl = (() => {
        const baseUrl = normalizeYouTubeUrl(youtubeUrl);
        if (!baseUrl) return '';
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}vq=hd1080&hd=1&rel=0&modestbranding=1`;
    })();

    return (
        <section className={`relative pt-20 pb-20 overflow-hidden bg-transparent ${className}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* LEFT SIDE: REDESIGNED TEXT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Auditoría de Sistemas IA
                        </div>

                        <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase italic break-words">
                            ¿ERES DUEÑO <br />
                            <span className="text-primary">O ERES EL MOTOR?</span>
                        </h2>

                        <div className="space-y-8">
                            <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed">
                                Tu negocio debería ser un sistema automático, no una cárcel de tareas repetitivas.
                            </p>
                            <p className="text-sm md:text-lg text-white/70 leading-relaxed border-l-2 border-primary/30 pl-4 md:pl-6 bg-white/5 py-3">
                                Descubre en menos de 2 minutos dónde se está filtrando tu rentabilidad y cómo cerrarle el grifo al caos con ingeniería sutil.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-8 pt-8">
                            <div className="flex items-center gap-3 text-xs text-white/60 font-mono uppercase tracking-wider font-bold">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span>Diagnóstico 100% Real</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/60 font-mono uppercase tracking-wider font-bold">
                                <Zap className="w-5 h-5 text-primary" />
                                <span>Hoja de ruta estratégica</span>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                            <Link
                                to="/diagnostico"
                                onClick={() => analytics.trackEvent('diagnosis_cta_click')}
                                className="inline-flex items-center gap-4 bg-primary hover:bg-white text-black font-black px-10 py-5 rounded-xl text-sm uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)] group/btn"
                            >
                                REALIZAR DIAGNÓSTICO GRATIS
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: YOUTUBE WINDOW (Replicated from About.jsx style) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Ambient Glow */}
                        <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full opacity-40 animate-pulse" />

                        <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] group bg-black">
                            {normalizedUrl ? (
                                <iframe
                                    src={normalizedUrl}
                                    title="Diagnóstico de Sistemas"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                        <Play className="w-8 h-8 text-primary fill-current" />
                                    </div>
                                    <p className="text-white/30 font-mono text-xs uppercase tracking-widest">Cargando demostración...</p>
                                </div>
                            )}
                            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
                        </div>


                        {/* Social Buttons Below Video */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-center lg:justify-start">
                            <p className="text-xs text-white/40 uppercase tracking-wider font-mono whitespace-nowrap shrink-0 text-center sm:text-left">Conexión directa:</p>
                            <div className="flex items-center gap-2 relative z-30 flex-nowrap justify-center lg:justify-start">
                                {siteConfig.whatsapp_url && (
                                    <a href={siteConfig.whatsapp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 hover:border-primary/50 transition-all group shrink-0">
                                        <MessageSquare className="w-4 h-4 text-[#25D366] opacity-80 group-hover:opacity-100" />
                                        <span className="text-[10px] text-white/70 group-hover:text-white uppercase tracking-wide font-black">WhatsApp</span>
                                    </a>
                                )}
                                {siteConfig.instagram_url && (
                                    <a href={siteConfig.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 hover:border-primary/50 transition-all group shrink-0">
                                        <Instagram className="w-4 h-4 text-[#E1306C] opacity-80 group-hover:opacity-100" />
                                        <span className="text-[10px] text-white/70 group-hover:text-white uppercase tracking-wide font-black">Instagram</span>
                                    </a>
                                )}
                                {siteConfig.linkedin_url && (
                                    <a href={siteConfig.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 hover:border-primary/50 transition-all group shrink-0">
                                        <Linkedin className="w-4 h-4 text-[#0077B5] opacity-80 group-hover:opacity-100" />
                                        <span className="text-[10px] text-white/70 group-hover:text-white uppercase tracking-wide font-black">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DiagnosisCTA;
