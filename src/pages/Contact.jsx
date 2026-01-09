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
        <div className="relative pt-24 pb-12 min-h-screen bg-background-dark flex items-center justify-center">
            <SEO
                title="Contacto | Hablemos de tu Negocio | Engorilate"
                description="Contacta con Engorilate en Cartagena, Murcia. Sin comerciales, hablas directamente con el técnico. WhatsApp, email o redes sociales."
                keywords="contacto engorilate, automatización murcia, consultoría cartagena, whatsapp negocio"
            />
            <BackgroundMesh />

            <div className="relative z-10 w-full max-w-6xl px-6">
                <DiagnosisCTA className="mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT: Compact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-7 bg-[#222]/80 border border-white/10 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl flex flex-col justify-center"
                    >
                        <div className="mb-6">
                            <h1 className="font-display text-3xl font-bold text-white mb-2">Hablemos</h1>
                            <p className="text-gray-400 text-sm">Sin comerciales. Hablas directamente con el técnico.</p>
                        </div>
                        <ContactForm source="Contact Page" />
                    </motion.div>

                    {/* RIGHT: Quick Contact Info */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {/* Manual Contact Card */}
                        <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-[2rem] h-full flex flex-col justify-center">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" /> Vía Rápida
                            </h3>

                            <div className="space-y-4">
                                <a
                                    href={siteConfig.whatsapp_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackClick('whatsapp')}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 border border-transparent transition-all group"
                                >
                                    <MessageSquare className="w-5 h-5 text-[#25D366]" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-[#25D366] transition-colors">WhatsApp (611 469 469)</div>
                                        <div className="text-[10px] text-gray-500">Respuesta inmediata</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                                </a>

                                <a
                                    href={siteConfig.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackClick('instagram')}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 hover:border-[#E1306C]/50 border border-transparent transition-all group"
                                >
                                    <Instagram className="w-5 h-5 text-[#E1306C]" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-[#E1306C] transition-colors">Instagram</div>
                                        <div className="text-[10px] text-gray-500">Casos reales</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#E1306C] group-hover:translate-x-1 transition-all" />
                                </a>

                                <a
                                    href={siteConfig.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackClick('linkedin')}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50 border border-transparent transition-all group"
                                >
                                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-[#0077B5] transition-colors">LinkedIn</div>
                                        <div className="text-[10px] text-gray-500">Profesional</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#0077B5] group-hover:translate-x-1 transition-all" />
                                </a>

                                <a
                                    href={`mailto:${siteConfig.contact_email}`}
                                    onClick={() => trackClick('email')}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-primary/20 hover:border-primary/50 border border-transparent transition-all group"
                                >
                                    <Mail className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-primary transition-colors">Email</div>
                                        <div className="text-[10px] text-gray-500">{siteConfig.contact_email}</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </a>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <MapPin className="w-4 h-4 text-gray-600" />
                                    <span>Cartagena, Murcia (España)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
