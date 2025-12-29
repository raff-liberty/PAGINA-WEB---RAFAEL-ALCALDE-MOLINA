import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, MessageSquare, Send, Instagram, Linkedin, MapPin, Globe, Zap, Laptop, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';

const Contact = () => {
    const [formData, setFormData] = useState({
        service: 'automation', // Default
        name: '',
        email: '',
        phone: '',
        message: '',
        privacyAccepted: false
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [siteConfig, setSiteConfig] = useState({
        whatsapp_url: 'https://wa.me/34600000000',
        instagram_url: 'https://instagram.com/engorilate',
        linkedin_url: 'https://linkedin.com/in/engorilate',
        contact_email: 'hola@antesdehacer.com',
        n8n_webhook_url: ''
    });

    // Simple service options for dropdown
    const serviceOptions = [
        { value: 'automation', label: 'Automatización (n8n, Make)' },
        { value: 'web', label: 'Web Operativa / SEO' },
        { value: 'dashboard', label: 'Dashboards de Control' },
        { value: 'other', label: 'Otro / Consulta General' }
    ];

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

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare Payload for n8n
            const payload = {
                ...formData,
                submittedAt: new Date().toISOString(),
                source: 'Contact Page',
                adminEmail: siteConfig.contact_email // Sending this so n8n knows where to forward/notify
            };

            // 1. Send to N8N (The Brain)
            if (siteConfig.n8n_webhook_url) {
                await fetch(siteConfig.n8n_webhook_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                console.warn('No N8N Webhook configured. Data logged:', payload);
            }

            setSubmitted(true);
        } catch (error) {
            console.error('Submission Error:', error);
            alert('Error al enviar. Inténtalo por WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.name && formData.email && formData.phone && formData.message && formData.privacyAccepted;

    return (
        <div className="relative pt-24 pb-12 min-h-screen bg-background-dark flex items-center justify-center">
            <BackgroundMesh />

            <div className="relative z-10 w-full max-w-6xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT: Compact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-7 bg-[#222]/80 border border-white/10 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl flex flex-col justify-center"
                    >
                        {!submitted ? (
                            <>
                                <div className="mb-6">
                                    <h1 className="font-display text-3xl font-bold text-white mb-2">Hablemos</h1>
                                    <p className="text-gray-400 text-sm">Sin comerciales. Hablas directamente con el técnico.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                id="name"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-600"
                                                placeholder="Tu Nombre"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                id="phone"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-600"
                                                placeholder="+34 WhatsApp"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                id="email"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-600"
                                                placeholder="tu@email.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <select
                                                    id="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none appearance-none cursor-pointer"
                                                >
                                                    {serviceOptions.map(opt => (
                                                        <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            id="message"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none resize-none placeholder:text-gray-600"
                                            placeholder="¿Qué quieres automatizar? Sé breve y directo."
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="pt-2 flex flex-col md:flex-row items-center gap-4 justify-between">
                                        <div className="flex items-start gap-2 max-w-xs">
                                            <input
                                                type="checkbox"
                                                id="privacyAccepted"
                                                checked={formData.privacyAccepted}
                                                onChange={handleChange}
                                                className="mt-1 w-3 h-3 rounded border-white/20 bg-white/5 text-primary cursor-pointer accent-primary"
                                                required
                                            />
                                            <label htmlFor="privacyAccepted" className="text-[10px] text-gray-500 cursor-pointer">
                                                Acepto la <a href="/privacidad" className="text-primary hover:underline">política de privacidad</a>. (Cero SPAM, prometido).
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isFormValid || loading}
                                            className={`w-full md:w-auto px-8 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${isFormValid && !loading ? 'bg-primary text-black hover:bg-white' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
                                        >
                                            {loading ? '...' : 'Enviar'} <Send className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white">¡Recibido!</h3>
                                <p className="text-gray-400 text-sm mt-2 mb-6">Revisa tu WhatsApp/Email en unas horas.</p>
                                <button onClick={() => setSubmitted(false)} className="text-primary text-xs hover:underline">Enviar otro</button>
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT: Quick Contact Info */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {/* Manual Contact Card */}
                        <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-[2rem] h-full flex flex-col justify-center">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" /> Vía Rápida
                            </h3>

                            <div className="space-y-4">
                                <a href={siteConfig.whatsapp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 border border-transparent transition-all group">
                                    <MessageSquare className="w-5 h-5 text-[#25D366]" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-[#25D366] transition-colors">WhatsApp</div>
                                        <div className="text-[10px] text-gray-500">Respuesta inmediata</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                                </a>

                                <a href={siteConfig.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 hover:border-[#E1306C]/50 border border-transparent transition-all group">
                                    <Instagram className="w-5 h-5 text-[#E1306C]" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-[#E1306C] transition-colors">Instagram</div>
                                        <div className="text-[10px] text-gray-500">Casos reales</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#E1306C] group-hover:translate-x-1 transition-all" />
                                </a>

                                <a href={siteConfig.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50 border border-transparent transition-all group">
                                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                                    <div>
                                        <div className="text-white text-sm font-bold group-hover:text-[#0077B5] transition-colors">LinkedIn</div>
                                        <div className="text-[10px] text-gray-500">Profesional</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#0077B5] group-hover:translate-x-1 transition-all" />
                                </a>

                                <a href={`mailto:${siteConfig.contact_email}`} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-primary/20 hover:border-primary/50 border border-transparent transition-all group">
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
