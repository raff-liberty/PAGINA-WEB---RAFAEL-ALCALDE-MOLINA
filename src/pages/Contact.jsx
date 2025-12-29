import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, MessageSquare, Send, Instagram, Linkedin, MapPin, Globe, Zap, Laptop, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';

const services = [
    { id: 'web', title: "Web Operativa", desc: "Interfaces que gestionan tu negocio", icon: Globe, color: "text-blue-400" },
    { id: 'automation', title: "Automatización", desc: "Flujos que trabajan por ti", icon: Zap, color: "text-yellow-400" },
    { id: 'dashboard', title: "Dashboards", desc: "Toma decisiones con datos", icon: Laptop, color: "text-primary" },
    { id: 'other', title: "Otro", desc: "Cuéntanos tu cuello de botella", icon: ArrowRight, color: "text-gray-400" }
];

const Contact = () => {
    const [formData, setFormData] = useState({
        service: '',
        name: '',
        email: '',
        phone: '',
        company: '',
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

    const location = useLocation();

    useEffect(() => {
        fetchSiteConfig();

        // Handle service pre-selection from query params
        const params = new URLSearchParams(location.search);
        const serviceId = params.get('service');
        if (serviceId && services.find(s => s.id === serviceId)) {
            setFormData(prev => ({ ...prev, service: serviceId }));
        }
    }, [location.search]);

    const fetchSiteConfig = async () => {
        try {
            const { data, error } = await supabase
                .from('site_config')
                .select('key, value');

            if (error) throw error;

            const config = {};
            data?.forEach(item => {
                config[item.key] = item.value || '';
            });
            setSiteConfig(prev => ({ ...prev, ...config }));
        } catch (error) {
            console.error('Error fetching site config:', error);
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send to N8N webhook if configured
            if (siteConfig.n8n_webhook_url) {
                await fetch(siteConfig.n8n_webhook_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const socialLinks = [
        { name: 'WhatsApp', icon: MessageSquare, color: 'hover:bg-green-500/20 hover:text-green-500', link: siteConfig.whatsapp_url },
        { name: 'Instagram', icon: Instagram, color: 'hover:bg-pink-500/20 hover:text-pink-500', link: siteConfig.instagram_url },
        { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-600/20 hover:text-blue-600', link: siteConfig.linkedin_url }
    ];

    const isFormValid = formData.name && formData.email && formData.phone && formData.company && formData.service && formData.message && formData.privacyAccepted;

    return (
        <div className="relative pt-24 pb-16 min-h-screen">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-12 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Contacto Directo
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6 text-white text-balance">
                        {submitted ? "¡Mensaje enviado!" : "Hablemos de tu proyecto"}
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        {submitted
                            ? "Gracias por contactar. Te responderé en menos de 24 horas."
                            : "Cuéntame qué necesitas y te responderé con una propuesta personalizada."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        {!submitted ? (
                            <div className="bg-[#222222]/50 border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl backdrop-blur-md">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Service Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-3">¿Qué necesitas?</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {services.map((service) => (
                                                <button
                                                    key={service.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, service: service.id })}
                                                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${formData.service === service.id
                                                            ? 'bg-primary/10 border-primary text-white'
                                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${service.color}`}>
                                                        <service.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-sm">{service.title}</h3>
                                                        <p className="text-xs text-gray-500">{service.desc}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="name">Nombre *</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                                                id="name"
                                                placeholder="Tu nombre"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="email">Email *</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                                                id="email"
                                                placeholder="email@empresa.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="phone">WhatsApp *</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                                                id="phone"
                                                placeholder="+34 600 000 000"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="company">Empresa *</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                                                id="company"
                                                placeholder="Tu empresa"
                                                type="text"
                                                value={formData.company}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="message">Cuéntame tu proyecto *</label>
                                        <textarea
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none resize-none"
                                            id="message"
                                            placeholder="Describe brevemente qué necesitas automatizar o mejorar en tu negocio..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Privacy */}
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                        <input
                                            type="checkbox"
                                            id="privacyAccepted"
                                            checked={formData.privacyAccepted}
                                            onChange={handleChange}
                                            className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="privacyAccepted" className="text-xs text-gray-400 leading-relaxed cursor-pointer select-none">
                                            He leído y acepto la <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-white transition-colors">política de privacidad</a>. Consiento el tratamiento de mis datos para la gestión comercial.
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 group ${isFormValid && !loading
                                                ? 'bg-primary hover:bg-primary-hover text-gray-900 shadow-xl shadow-primary/20'
                                                : 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
                                            }`}
                                    >
                                        {loading ? 'Enviando...' : 'Enviar Consulta'}
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-[#222222]/50 border border-white/10 p-12 rounded-[2rem] shadow-2xl backdrop-blur-md text-center">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 mx-auto">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">¡Gracias por contactar!</h2>
                                <p className="text-gray-400 mb-6">
                                    He recibido tu mensaje. Te responderé personalmente en menos de 24 horas.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-primary hover:text-primary-hover transition-colors text-sm font-medium"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Social & Location */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#222222]/80 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl"
                        >
                            <h3 className="font-display text-xl font-bold text-white mb-6">Canales Directos</h3>
                            <div className="space-y-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 transition-all duration-300 ${social.color} group hover:border-white/10`}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-current group-hover:bg-opacity-10 transition-colors">
                                            <social.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-sm">{social.name}</span>
                                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </a>
                                ))}
                                <a href={`mailto:${siteConfig.contact_email}`} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-gray-900 transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-sm">{siteConfig.contact_email}</span>
                                </a>
                            </div>

                            <div className="mt-8 p-6 rounded-2xl bg-primary/[0.03] border border-primary/10">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/60 font-mono mb-3">Filosofía</p>
                                <p className="text-xs text-gray-500 leading-relaxed italic">
                                    "No construyo por construir. Busco socios que valoren su tiempo y quieran automatizar el caos para recuperar su libertad operativa."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#222222]/80 border border-white/10 p-8 rounded-[2rem] text-center backdrop-blur-md"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/5">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <p className="text-white font-medium mb-1">Av Isla de Pascua 5 Bajo E</p>
                            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">Cartagena, Murcia</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
