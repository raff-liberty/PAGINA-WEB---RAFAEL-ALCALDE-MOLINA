import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { processFormSubmission } from '../lib/crm/contacts';

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
        message: '',
        privacyAccepted: false
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [siteConfig, setSiteConfig] = useState(null);

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
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        id="name"
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-500"
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
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-500"
                        placeholder="+34 WhatsApp"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div>
                <input
                    id="company"
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-500"
                    placeholder="Empresa (opcional)"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        id="email"
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors placeholder:text-gray-500"
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
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none appearance-none cursor-pointer"
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
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none resize-none placeholder:text-gray-500"
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
                        Acepto la <Link to="/privacidad" className="text-primary hover:underline">política de privacidad</Link>. (Cero SPAM, prometido).
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
    );
};

export default ContactForm;
