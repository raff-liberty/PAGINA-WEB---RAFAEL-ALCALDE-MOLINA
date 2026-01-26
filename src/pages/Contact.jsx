import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, MessageSquare, Send, Instagram, Linkedin, MapPin, Globe, Zap, Laptop, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import SEO from '../components/SEO';
import { analytics } from '../lib/analytics';

const Contact = () => {
    const [siteConfig, setSiteConfig] = useState({
        whatsapp_url: 'https://wa.me/34600000000',
        instagram_url: 'https://instagram.com/engorilate',
        linkedin_url: 'https://linkedin.com/in/engorilate',
        contact_email: 'r.alcalde@engorilate.com'
    });

    useEffect(() => {
        fetchSiteConfig();
    }, []);

    const fetchSiteConfig = async () => {
        try {
            const { data, error } = await supabase.from('site_config').select('key, value');
            if (error) throw error;
            const config = {};
            data?.forEach(item => { config[item.key] = item.value || ''; });
            setSiteConfig(prev => ({ ...prev, ...config }));
        } catch (error) {
            console.error('Error config:', error);
        }
    };

    const trackClick = (method) => {
        analytics.trackEvent('contact_click', { method });
    };

    return (
        <div className="relative pt-20 md:pt-28 pb-8 min-h-screen bg-background-dark flex items-center justify-center">
            <SEO
                title="Sesión de Estrategia | Habla con el Arquitecto | Engorilate"
                description="Habla directamente conmigo, sin filtros comerciales. Rediseñamos tu operativa para que el negocio deje de depender de ti."
                keywords="consultoría automatización murcia, consultoría sistemas, estrategia operativa pyme"
            />

            {/* Ambient Background Elements - Unison Atmosphere */}
            <BackgroundMesh />
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" />
                <div className="absolute bottom-[5%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.05] opacity-50" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-6">
                {/* Header Authority */}
                <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono tracking-widest uppercase mb-6 backdrop-blur-sm"
                    >
                        <Zap className="w-3.5 h-3.5 animate-pulse" />
                        Comunicación Directa & Sin Filtros
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6 leading-none uppercase italic"
                    >
                        Hablemos de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 drop-shadow-[0_0_20px_rgba(110,231,183,0.5)]">tu operativa.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed italic border-l-primary/40 pl-6 border-l"
                    >
                        Olvida a los comerciales. Aquí hablas directamente con el arquitecto que diseñará e implementará tu sistema.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

                    {/* LEFT: Compact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 bg-gradient-to-br from-[#1A1A1A] to-[#121212] border-2 border-white/20 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex flex-col justify-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-100" />
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                            <Laptop className="w-20 h-20 text-white" />
                        </div>

                        <div className="relative z-10 mb-8">
                            <h2 className="font-display text-3xl font-black text-white mb-3 uppercase tracking-tight">Sesión de Estrategia</h2>
                            <p className="text-gray-400 text-sm font-medium">Cuéntanos tu cuello de botella actual. Seremos breves y directos.</p>
                        </div>
                        <ContactForm source="Contact Page" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 flex flex-col gap-4"
                    >
                        {/* Manual Contact Card */}
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] border-2 border-white/20 p-6 md:p-8 rounded-[2.5rem] h-full flex flex-col justify-center shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-100" />
                            <div className="flex items-center justify-between mb-6">
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
                                        console.log('Disparando mailto para:', siteConfig.contact_email);
                                        trackClick('email');
                                        const mailtoUrl = `mailto:${siteConfig.contact_email}?subject=${encodeURIComponent('Sesión de Estrategia Operativa - Engorilate')}`;

                                        // Crear un ancla invisible para simular un clic real del usuario
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

                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
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

                {/* Optional Pre-Diagnosis Tool */}
                <div className="mt-12 text-center">
                    <DiagnosisCTA />
                </div>
            </div>
        </div>
    );
};

export default Contact;
