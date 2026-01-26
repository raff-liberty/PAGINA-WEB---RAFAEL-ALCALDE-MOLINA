import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { processFormSubmission } from '../lib/crm/contacts';
import { analytics } from '../lib/analytics';

/**
 * Captura automática de datos de origen
 */
const captureOriginData = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        entry_channel: 'web_form',
        entry_url: window.location.href,
        utm_source: params.get('utm_source') || null,
        utm_medium: params.get('utm_medium') || null,
        utm_campaign: params.get('utm_campaign') || null
    };
};

const ContactForm = ({ className = "", source = "Contact Page" }) => {
    const [formData, setFormData] = useState({
        service: 'automation',
        name: '',
        email: '',
        phone: '',
        company: '',
        privacyAccepted: false,
        website_url: '' // Honeypot field
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [siteConfig, setSiteConfig] = useState(null);
    const [loadTimestamp] = useState(Date.now());

    const serviceOptions = [
        { value: 'automation', label: 'Automatización (n8n, Make)' },
        { value: 'web', label: 'Web Operativa / SEO' },
        { value: 'dashboard', label: 'Dashboards de Control' },
        { value: 'other', label: 'Otro / Consulta General' }
    ];

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data, error } = await supabase.from('site_config').select('key, value');
                if (error) throw error;
                const config = {};
                data?.forEach(item => { config[item.key] = item.value || ''; });
                setSiteConfig(config);
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Anti-spam: Honeypot check
            if (formData.website_url) {
                console.warn('Spam detected: Honeypot filled');
                setSubmitted(true); // Silent discard
                return;
            }

            // 2. Anti-spam: Timing check (Bots submit too fast)
            const timeDiff = Date.now() - loadTimestamp;
            if (timeDiff < 3000) { // Less than 3 seconds
                console.warn('Spam detected: Submission too fast');
                setSubmitted(true); // Silent discard
                return;
            }

            // 3. Anti-spam: Basic Phone Validation (Must contain digits)
            const phoneDigits = formData.phone.replace(/\D/g, '');
            if (phoneDigits.length < 5) {
                alert('Por favor, introduce un número de teléfono válido.');
                setLoading(false);
                return;
            }

            // Capturar datos de origen automáticamente
            const originData = captureOriginData();

            // Procesar envío del formulario (gestiona duplicados automáticamente)
            const { data: contact, error: contactError } = await processFormSubmission({
                email: formData.email,
                full_name: formData.name,
                phone: formData.phone,
                company: formData.company,
                message: formData.message,
                service_interest: formData.service,
                source: source,
                ...originData
            });

            if (contactError) {
                console.error('Contact save error:', contactError);
                throw contactError;
            }

            if (!contact) {
                throw new Error('No se pudo guardar el contacto. Inténtalo de nuevo.');
            }

            // Enviar notificación a n8n si está configurado
            if (siteConfig?.n8n_webhook_url) {
                await fetch(siteConfig.n8n_webhook_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'new_contact',
                        contact_id: contact.id,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        service: formData.service,
                        message: formData.message,
                        source: source,
                        submittedAt: new Date().toISOString(),
                        adminEmail: siteConfig?.contact_email,
                        // Datos de origen
                        entry_url: originData.entry_url,
                        utm_source: originData.utm_source,
                        utm_medium: originData.utm_medium,
                        utm_campaign: originData.utm_campaign
                    })
                });
            } else {
                console.warn('No N8N Webhook configured. Contact saved in Supabase.');
            }

            // Rastrear evento de conversión
            analytics.trackEvent('form_submission', {
                source,
                service: formData.service,
                path: window.location.pathname
            });

            setSubmitted(true);
        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Error al enviar: ${error.message || 'Error desconocido'}. Inténtalo por WhatsApp.`);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.name && formData.email && formData.phone && formData.message && formData.privacyAccepted;

    if (submitted) {
        return (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">¡Recibido!</h3>
                <p className="text-gray-400 text-sm mt-2 mb-6">Revisa tu WhatsApp/Email en unas horas.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary text-xs hover:underline">Enviar otro</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-2 md:space-y-3 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="group/input relative">
                    <input
                        id="name"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02),0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                        placeholder="Tu Nombre"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="group/input relative">
                    <input
                        id="phone"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02),0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                        placeholder="+34 WhatsApp"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
                </div>
            </div>

            <div className="group/input relative">
                <input
                    id="company"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02),0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                    placeholder="Empresa (opcional)"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                />
                <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Honeypot field - Invisible to humans, trap for bots */}
            <div className="hidden pointer-events-none opacity-0 h-0 overflow-hidden" aria-hidden="true">
                <input
                    id="website_url"
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.website_url}
                    onChange={handleChange}
                    placeholder="Tu sitio web (dejar en blanco)"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="group/input relative">
                    <input
                        id="email"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02),0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                        placeholder="tu@email.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="group/input relative">
                    <div className="relative">
                        <label htmlFor="service" className="sr-only">Servicio de interés</label>
                        <select
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 focus:bg-white/[0.08] outline-none appearance-none cursor-pointer transition-all shadow-[0_0_20px_rgba(255,255,255,0.02),0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                        >
                            {serviceOptions.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-[#0a0a0a] text-white">{opt.label}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-focus-within/input:text-primary/50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="group/input relative">
                <textarea
                    id="message"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 focus:bg-white/[0.08] outline-none resize-none transition-all placeholder:text-white/20 shadow-[0_0_20px_rgba(255,255,255,0.02),0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                    placeholder="¿Qué quieres automatizar? Sé breve y directo."
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="pt-4 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-start gap-3 max-w-xs">
                    <input
                        type="checkbox"
                        id="privacyAccepted"
                        checked={formData.privacyAccepted}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary cursor-pointer accent-primary"
                        required
                    />
                    <label htmlFor="privacyAccepted" className="text-[10px] text-white/30 leading-tight cursor-pointer hover:text-white/50 transition-colors">
                        Acepto la <Link to="/privacidad" className="text-primary/60 hover:text-primary transition-colors underline underline-offset-2">política de privacidad</Link>. (Cero SPAM, prometido).
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`relative group/btn w-full md:w-auto px-12 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all transform overflow-hidden ${isFormValid && !loading ? 'bg-primary text-black hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}`}
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-3">
                        {loading ? 'Sincronizando...' : 'Enviar mensaje'} <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </span>
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
