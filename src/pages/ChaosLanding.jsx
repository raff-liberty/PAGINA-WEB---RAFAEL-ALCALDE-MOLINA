import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    Download,
    CheckCircle2,
    XCircle,
    ArrowRight,
    UserCheck,
    Smartphone,
    RotateCcw,
    Lock,
    Mail,
    User,
    Phone,
    Building2,
    ShieldCheck
} from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import { processFormSubmission } from '../lib/crm/contacts';
import { supabase } from '../lib/supabaseClient';
import { analytics } from '../lib/analytics';
import { Link } from 'react-router-dom';
import { getLandingFile, incrementDownloadCount } from '../lib/landingFiles';

const ChaosLanding = () => {
    const [formState, setFormState] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        privacyAccepted: false
    });
    const [siteConfig, setSiteConfig] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

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

        const fetchPDFFile = async () => {
            try {
                const { data, error } = await getLandingFile('caos-operativo');
                if (!error && data) {
                    setPdfFile(data);
                }
            } catch (error) {
                console.error('Error fetching PDF file:', error);
            }
        };

        fetchConfig();
        fetchPDFFile();
    }, []);

    const signals = [
        {
            icon: UserCheck,
            title: "Todo pasa por ti",
            desc: "Sin ti, el negocio se frena. Eres el motor, pero también el cuello de botella que impide crecer.",
            status: 'visible'
        },
        {
            icon: Smartphone,
            title: "WhatsApp es el caos",
            desc: "Atención, gestión y decisiones en el mismo canal. Información fragmentada y clientes impacientes.",
            status: 'visible'
        },
        {
            icon: RotateCcw,
            title: "Repites tareas sin parar",
            desc: "Copiar, responder, confirmar, revisar. Tu tiempo se quema en lo que una máquina haría mejor.",
            status: 'visible'
        },
        { icon: Lock, title: "El coste de delegar", desc: "Bloqueado en el PDF", status: 'locked' },
        { icon: Lock, title: "Escalabilidad vs Tensión", desc: "Bloqueado en el PDF", status: 'locked' },
        { icon: Lock, title: "Gobernanza de IA", desc: "Bloqueado en el PDF", status: 'locked' },
        { icon: Lock, title: "El sistema vs el compromiso", desc: "Bloqueado en el PDF", status: 'locked' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.privacyAccepted) return;
        setFormState('loading');

        try {
            const entryData = {
                entry_channel: 'lead_magnet_pdf',
                entry_url: window.location.href,
                source: 'PDF Caos Operativo'
            };

            const { data: contact, error } = await processFormSubmission({
                email: formData.email,
                full_name: formData.name,
                phone: formData.phone,
                company: formData.company,
                message: "Descarga de PDF: El Caos Operativo Invisible",
                service_interest: 'automation',
                ...entryData
            });

            if (error) throw error;

            // Trigger n8n if configured (use specific webhook or fallback to general)
            const webhookUrl = siteConfig?.n8n_caos_webhook || siteConfig?.n8n_webhook_url;
            if (webhookUrl) {
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'pdf_download',
                        landing: 'caos-operativo',
                        contact_id: contact?.id,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        company: formData.company,
                        source: 'PDF Caos Operativo',
                        timestamp: new Date().toISOString(),
                        pdf_file: pdfFile?.title || 'El Caos Operativo Invisible'
                    })
                }).catch(err => console.error('n8n error:', err));
            }

            analytics.trackEvent('pdf_download_request', { source: 'chaos_landing' });

            // Increment download count
            if (pdfFile) {
                incrementDownloadCount('caos-operativo').catch(err =>
                    console.error('Error incrementing download count:', err)
                );
            }

            setFormState('success');
            // No longer opening PDF as it's sent via email through n8n
        } catch (error) {
            console.error('Error saving lead:', error);
            setFormState('error');
        }
    };

    return (
        <div className="relative pt-24 pb-32 min-h-screen bg-background-dark overflow-hidden">
            <SEO
                title="El Caos Operativo Invisible | Engorilate"
                description="7 señales de que tu negocio no escala porque está mal diseñado. Descarga el manual exclusivo."
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <header className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/30 text-red-400 text-xs md:text-sm font-mono font-black uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    >
                        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                        <span>Lectura solo para dueños de negocio</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-5xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-100 mb-8 leading-[1.1] tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        El caos operativo <br />
                        <span className="text-primary italic animate-pulse">invisible</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl md:text-3xl text-gray-300 font-semibold max-w-3xl mx-auto leading-relaxed"
                    >
                        7 señales de que tu negocio no escala porque <span className="text-white font-bold border-b-2 border-primary/50">está mal diseñado</span>.
                    </motion.p>
                </header>

                {/* The PAS Teaser */}
                <section className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="p-8 rounded-[2.5rem] bg-[#1A1A1A] border border-white/10 shadow-2xl relative">
                            <h2 className="text-2xl font-display font-bold text-white mb-4">Esto no es un texto cómodo.</h2>
                            <p className="text-gray-400 leading-relaxed italic">
                                "El problema de la mayoría de negocios no es la falta de esfuerzo, ni de talento. El problema es que operativamente no eres un sistema, eres una extensión del dueño. Y eso no escala."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            {signals.filter(s => s.status === 'visible').map((signal, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-primary/30 items-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(110,231,183,0.1)] hover:scale-[1.02]"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <signal.icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold text-base mb-1 group-hover:text-primary transition-colors">{signal.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{signal.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {/* Curiosity Loop */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 flex items-center justify-between group hover:shadow-[0_0_40px_rgba(110,231,183,0.2)] transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-background-dark flex items-center justify-center text-primary/70 group-hover:text-primary transition-colors">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <span className="text-primary font-black text-base italic group-hover:text-white transition-colors">+4 señales críticas bloqueadas</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-primary animate-pulse group-hover:translate-x-2 transition-transform" />
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                        style={{ perspective: "1000px" }}
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-3xl opacity-50 animate-pulse"></div>

                        {/* PDF Preview with Floating Animation */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotateZ: [0, 1, 0, -1, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="aspect-[3/4] rounded-[2.5rem] bg-gradient-to-br from-[#2a2a2a] via-[#1f1f1f] to-[#151515] border-2 border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(110,231,183,0.2)] p-8 flex flex-col justify-between overflow-hidden relative"
                        >
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-20"></div>

                            {/* Top Section */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                                        <Download className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-[11px] font-mono font-bold text-primary/80 uppercase tracking-wider px-3 py-1 bg-primary/10 rounded-full border border-primary/20">PDF Exclusivo</span>
                                </div>

                                <h3 className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white mb-8 leading-tight uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                                    Manual <br />Anti-Caos
                                </h3>

                                {/* Simulated Text Lines */}
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-gradient-to-r from-white/10 to-white/5 rounded-full"></div>
                                    <div className="h-2 w-4/5 bg-gradient-to-r from-white/10 to-white/5 rounded-full"></div>
                                    <div className="h-2 w-full bg-gradient-to-r from-white/10 to-white/5 rounded-full"></div>
                                    <div className="h-2 w-3/5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full shadow-[0_0_10px_rgba(110,231,183,0.3)]"></div>
                                </div>
                            </div>

                            {/* Bottom Badge */}
                            <div className="relative z-10 flex items-center gap-3 p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-primary font-mono text-sm font-bold">Método Engorilate</span>
                            </div>

                            {/* Floating Locked Content Badges */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 w-full px-8">
                                <motion.div
                                    animate={{ x: [0, 5, 0], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="px-5 py-3 bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-red-500/30 flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                >
                                    <Lock className="w-4 h-4 text-red-400" />
                                    <span className="text-xs font-black text-white uppercase tracking-wide">IA Sin Gobernanza</span>
                                </motion.div>

                                <motion.div
                                    animate={{ x: [0, -5, 0], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                    className="px-5 py-3 bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-orange-500/30 flex items-center gap-3 -translate-x-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                                >
                                    <Lock className="w-4 h-4 text-orange-400" />
                                    <span className="text-xs font-black text-white uppercase tracking-wide">Errores de Diseño</span>
                                </motion.div>

                                <motion.div
                                    animate={{ x: [0, 3, 0], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    className="px-5 py-3 bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-yellow-500/30 flex items-center gap-3 translate-x-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                                >
                                    <Lock className="w-4 h-4 text-yellow-400" />
                                    <span className="text-xs font-black text-white uppercase tracking-wide">Caos Oculto</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* The Tension Question */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center py-20 border-t border-white/5 mb-20"
                >
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-gray-100 mb-8 leading-snug">
                        Si mañana no estuvieras durante una semana: <br />
                        <span className="text-red-500 italic">¿qué se rompería primero?</span>
                    </h3>
                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-4">
                        Si la respuesta es "muchas cosas", el problema no es de implicación.
                    </p>
                    <p className="text-primary font-bold text-xl uppercase tracking-widest">Es de estructura.</p>
                </motion.section>

                {/* High Conversion Form */}
                <section className="max-w-2xl mx-auto" id="download-form">
                    <div className="p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-primary/10 to-secondary/5 border-2 border-primary/10 shadow-[0_0_80px_rgba(110,231,183,0.15)] relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mb-4"
                                >
                                    <Download className="w-4 h-4 text-primary" />
                                    <span className="text-primary font-bold text-xs uppercase tracking-wider">Descarga Instantánea</span>
                                </motion.div>
                                <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-3 leading-tight">Descarga el Manual</h2>
                                <p className="text-gray-400 text-base">Completa tus datos para recibir el PDF al instante.</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {formState === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-8 shadow-[0_0_40px_rgba(110,231,183,0.3)] border-2 border-primary/30">
                                            <Mail className="w-10 h-10 animate-pulse" />
                                        </div>
                                        <h3 className="text-4xl font-display font-black text-white mb-4">¡Muchas gracias!</h3>
                                        <p className="text-gray-200 text-xl font-medium mb-6 leading-relaxed">
                                            El Manual Anti-Caos ya está de camino.
                                        </p>
                                        <p className="text-gray-400 text-base mb-10">
                                            En breve recibirás un correo con el documento. <br />
                                            <span className="text-primary font-bold">¡Corre a revisar tu bandeja de entrada!</span>
                                            <br /><br />
                                            <span className="text-xs italic text-gray-600">(No olvides mirar en promociones o spam si no lo ves en 2 minutos)</span>
                                        </p>
                                        <button
                                            onClick={() => setFormState('idle')}
                                            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold"
                                        >
                                            ← Volver a la página
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="relative group">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Nombre completo"
                                                    className="w-full bg-black/50 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:bg-black/70 focus:shadow-[0_0_20px_rgba(110,231,183,0.1)] outline-none transition-all text-base"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="WhatsApp"
                                                    className="w-full bg-black/50 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:bg-black/70 focus:shadow-[0_0_20px_rgba(110,231,183,0.1)] outline-none transition-all text-base"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Tu mejor Email corporativo"
                                                className="w-full bg-black/50 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:bg-black/70 focus:shadow-[0_0_20px_rgba(110,231,183,0.1)] outline-none transition-all text-base"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Empresa (opcional)"
                                                className="w-full bg-black/50 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:bg-black/70 focus:shadow-[0_0_20px_rgba(110,231,183,0.1)] outline-none transition-all text-base"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex items-start gap-3 py-4">
                                            <input
                                                required
                                                type="checkbox"
                                                id="privacy"
                                                className="mt-1 w-4 h-4 accent-primary rounded cursor-pointer"
                                                checked={formData.privacyAccepted}
                                                onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                                            />
                                            <label htmlFor="privacy" className="text-[10px] text-gray-500 leading-tight cursor-pointer">
                                                Acepto la <Link to="/privacidad" className="text-primary hover:underline">política de privacidad</Link>. Prometo no enviarte spam, solo contenido que te haga pensar.
                                            </label>
                                        </div>

                                        <motion.button
                                            disabled={formState === 'loading'}
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gradient-to-r from-primary via-primary to-secondary hover:from-white hover:via-white hover:to-white text-black font-black py-6 rounded-2xl uppercase tracking-widest text-base transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_40px_rgba(110,231,183,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formState === 'loading' ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                                                    Descargar ANTI-CAOS
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                                </>
                                            )}
                                        </motion.button>
                                        {formState === 'error' && (
                                            <p className="text-red-500 text-center text-xs mt-4">Algo falló. Por favor, revisa los datos e inténtalo de nuevo.</p>
                                        )}
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                <footer className="mt-24 text-center">
                    <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">© Engorilate — Cero Humo. Orden antes que tecnología.</p>
                </footer>
            </div>
        </div>
    );
};

export default ChaosLanding;
