import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowRight, MessageSquare, Send, Instagram, Linkedin, MapPin, Zap, Globe, Laptop, ChevronLeft, CheckCircle2, Clock } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';

const socialLinks = [
    { name: 'WhatsApp', icon: MessageSquare, color: 'hover:bg-green-500/20 hover:text-green-500', link: '#' },
    { name: 'Instagram', icon: Instagram, color: 'hover:bg-pink-500/20 hover:text-pink-500', link: '#' },
    { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-600/20 hover:text-blue-600', link: '#' }
];

const services = [
    { id: 'web', title: "Web Operativa", desc: "Interfaces que gestionan tu negocio", icon: Globe, color: "text-blue-400" },
    { id: 'automation', title: "Automatización", desc: "Flujos que trabajan por ti", icon: Zap, color: "text-yellow-400" },
    { id: 'dashboard', title: "Dashboards", desc: "Toma decisiones con datos", icon: Laptop, color: "text-primary" },
    { id: 'other', title: "Otro", desc: "Cuéntanos tu cuello de botella", icon: ArrowRight, color: "text-gray-400" }
];

const Contact = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: null,
        name: '',
        email: '',
        phone: '',
        location: '',
        companyName: '',
        sector: '',
        activity: '',
        entityType: '',
        employees: '',
        // Test fields
        projectGoal: '',
        webState: '',
        techStack: '',
        manualHours: '',
        dataLocation: '',
        decisionRisk: '',
        impact: '',
        valuePriority: '', // Filter: Price vs Value
        // Branching
        wantMeeting: null,
        booking: null,
        privacyAccepted: false
    });

    const location = useLocation();

    // Handle service pre-selection from query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const serviceId = params.get('service');
        if (serviceId && services.find(s => s.id === serviceId)) {
            setFormData(prev => ({ ...prev, service: serviceId }));
            setStep(2);
        }
    }, [location.search]);

    const handleServiceSelect = (serviceId) => {
        setFormData(prev => ({ ...prev, service: serviceId }));
        setStep(2);
    };

    const handleBookingSelect = (bookingData) => {
        setFormData(prev => ({ ...prev, booking: bookingData }));
        setStep(6); // Go to Summary instead of immediate submit
    };

    const handleBranch = (decision) => {
        setFormData(prev => ({ ...prev, wantMeeting: decision }));
        if (decision) {
            setStep(5); // Go to calendar
        } else {
            setStep(6); // Go to Summary for submission without booking
        }
    };

    const handleSubmitData = (data) => {
        console.log('Sending Lead Data to n8n:', data || formData);
        // Aquí iría el fetch al webhook de n8n
        setStep(7); // Show success message
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const isStep2Valid = (
        (formData.service === 'web' && formData.projectGoal && formData.webState) ||
        (formData.service === 'automation' && formData.techStack && formData.manualHours) ||
        (formData.service === 'dashboard' && formData.dataLocation && formData.decisionRisk) ||
        (formData.service === 'other' && formData.impact)
    ) && formData.valuePriority;

    const isStep3Valid = formData.name && formData.email && formData.phone && formData.location && formData.companyName && formData.sector && formData.activity && formData.entityType && formData.privacyAccepted;

    return (
        <div className="relative pt-24 pb-16 min-h-screen">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none h-[50vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-12 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Diagnóstico Estratégico
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6 text-white text-balance">
                        {step === 7 ? "¡Todo listo!" : "15 minutos para ver si encajamos"}
                    </h1>
                    <div className="max-w-2xl">
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-6">
                            {step === 7
                                ? "Hemos recibido tu solicitud. Te confirmaremos los siguientes pasos en menos de 2 horas (en horario laboral)."
                                : "Un diagnóstico directo para identificar si estás interesado en una transformación real o si solo estás curioseando."}
                        </p>
                    </div>

                    {step < 7 && (
                        <div className="inline-block px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl max-w-xl">
                            <p className="text-orange-400 text-sm leading-relaxed">
                                <span className="font-semibold border-b border-orange-400/30 pb-0.5 mb-2 inline-block">Plazas limitadas</span><br />
                                <span className="font-bold">Solo trabajo con 3 nuevos socios al mes</span> para garantizar una implicación total en cada arquitectura. No soy una agencia; trabajo directamente en tu negocio para asegurar que cada automatización sea una solución real, no un parche genérico.
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Left: Interactive Booking Flow */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 h-full"
                    >
                        <div className="bg-[#222222]/50 border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-md h-full flex flex-col min-h-[550px]">
                            {/* Step Indicator */}
                            {step < 7 && (
                                <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar">
                                    {[1, 2, 3, 4, 5, 6].map((s) => (
                                        <div key={s} className="flex items-center gap-2 flex-shrink-0">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 ${step >= s ? 'bg-primary text-gray-900 border-primary' : 'bg-white/5 text-gray-500 border-white/10 border'}`}>
                                                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                                            </div>
                                            {s < 6 && <div className={`w-4 md:w-8 h-[1px] ${step > s ? 'bg-primary' : 'bg-white/10'}`}></div>}
                                        </div>
                                    ))}
                                    <span className="ml-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest whitespace-nowrap">
                                        {step === 1 && "Servicio"}
                                        {step === 2 && "El Test"}
                                        {step === 3 && "Tus Datos"}
                                        {step === 4 && "¿Agendamos?"}
                                        {step === 5 && "Calendario"}
                                        {step === 6 && "Resumen"}
                                    </span>
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-2xl font-display font-bold text-white">¿En qué área necesitas orden?</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {services.map((service) => (
                                                <button
                                                    key={service.id}
                                                    onClick={() => handleServiceSelect(service.id)}
                                                    className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-primary/[0.03] hover:border-primary/30 transition-all text-left"
                                                >
                                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-primary/10 ${service.color}`}>
                                                        <service.icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                                                        <p className="text-gray-500 text-sm leading-snug">{service.desc}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setStep(1)} className="p-2 -ml-2 rounded-full hover:bg-white/5 text-gray-400">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <h2 className="text-2xl font-display font-bold text-white">Análisis de Intención</h2>
                                        </div>

                                        <div className="space-y-8">
                                            {formData.service === 'web' && (
                                                <div className="space-y-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Objetivo principal</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {["Vender más", "Automatizar ventas", "Imagen Premium"].map((opt) => (
                                                                <button key={opt} onClick={() => setFormData({ ...formData, projectGoal: opt })} className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${formData.projectGoal === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Situación actual</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {["Empiezo de cero", "Rediseño completo", "Optimizar actual"].map((opt) => (
                                                                <button key={opt} onClick={() => setFormData({ ...formData, webState: opt })} className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${formData.webState === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {formData.service === 'automation' && (
                                                <div className="space-y-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Stack tecnológico actual</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {["Sheets / Excel", "CRM / Software", "Todo Manual"].map((opt) => (
                                                                <button key={opt} onClick={() => setFormData({ ...formData, techStack: opt })} className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${formData.techStack === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Horas perdidas a la semana operando a mano</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {["< 5 horas", "5-15 horas", "+15 horas (Caos)"].map((opt) => (
                                                                <button key={opt} onClick={() => setFormData({ ...formData, manualHours: opt })} className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${formData.manualHours === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {formData.service === 'dashboard' && (
                                                <div className="space-y-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Ubicación de la información</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {["Dispersa en archivos", "Silos de software cerrados"].map((opt) => (
                                                                <button key={opt} onClick={() => setFormData({ ...formData, dataLocation: opt })} className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${formData.dataLocation === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Nivel de riesgo por falta de datos</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {["Bajo", "Pérdida de tiempo", "Pérdida de dinero"].map((opt) => (
                                                                <button key={opt} onClick={() => setFormData({ ...formData, decisionRisk: opt })} className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${formData.decisionRisk === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {formData.service === 'other' && (
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block" htmlFor="impact">¿Cómo de grave es tu cuello de botella actual?</label>
                                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none resize-none min-h-[120px]" id="impact" placeholder="Explica brevemente tu situación..." value={formData.impact} onChange={handleChange}></textarea>
                                                </div>
                                            )}

                                            <div className="space-y-4 pt-4 border-t border-white/5">
                                                <label className="text-[10px] font-mono text-primary uppercase tracking-widest block">Compromiso</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {["Busco un presupuesto rápido", "Busco un socio estratégico"].map((opt) => (
                                                        <button key={opt} onClick={() => setFormData({ ...formData, valuePriority: opt })} className={`py-4 px-4 rounded-xl border transition-all text-sm font-bold ${formData.valuePriority === opt ? 'bg-primary border-primary text-gray-900' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.05]'}`}>{opt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            disabled={!isStep2Valid}
                                            onClick={() => setStep(3)}
                                            className={`w-full font-bold py-5 rounded-xl transition-all ${isStep2Valid ? 'bg-primary hover:bg-primary-hover text-gray-900 shadow-xl shadow-primary/20' : 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'}`}
                                        >
                                            Continuar
                                        </button>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setStep(2)} className="p-2 -ml-2 rounded-full hover:bg-white/5 text-gray-400">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <h2 className="text-2xl font-display font-bold text-white">Datos de Contacto</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="name">Nombre</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="name" placeholder="Tu nombre" type="text" value={formData.name} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="email">Email Corporativo</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="email" placeholder="email@empresa.com" type="email" value={formData.email} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="phone">WhatsApp</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="phone" placeholder="+34 600 000 000" type="tel" value={formData.phone} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="location">Ubicación</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="location" placeholder="Ciudad" type="text" value={formData.location} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="companyName">Nombre de Empresa</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="companyName" placeholder="Tu empresa" type="text" value={formData.companyName} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="sector">Sector</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="sector" placeholder="Ej: Tecnología, Salud..." type="text" value={formData.sector} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="activity">Actividad</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="activity" placeholder="¿Qué hacéis?" type="text" value={formData.activity} onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="entityType">Estructura</label>
                                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none appearance-none" id="entityType" value={formData.entityType} onChange={handleChange}>
                                                    <option value="" className="bg-background-dark">Selecciona...</option>
                                                    <option value="autonomo" className="bg-background-dark">Autónomo</option>
                                                    <option value="pyme" className="bg-background-dark">Pyme (-10)</option>
                                                    <option value="empresa" className="bg-background-dark">Empresa (+10)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" htmlFor="employees">Equipo</label>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary outline-none" id="employees" placeholder="Nº personas" type="number" value={formData.employees} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                            <input
                                                type="checkbox"
                                                id="privacyAccepted"
                                                checked={formData.privacyAccepted}
                                                onChange={handleChange}
                                                className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary cursor-pointer"
                                            />
                                            <label htmlFor="privacyAccepted" className="text-xs text-gray-400 leading-relaxed cursor-pointer select-none">
                                                He leído y acepto la <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-white transition-colors">política de privacidad</a>. Consiento el tratamiento de mis datos para la gestión comercial y su uso en acciones de marketing y campañas publicitarias personalizadas.
                                            </label>
                                        </div>

                                        <button
                                            disabled={!isStep3Valid}
                                            onClick={() => setStep(4)}
                                            className={`w-full font-bold py-5 rounded-xl transition-all ${isStep3Valid ? 'bg-primary hover:bg-primary-hover text-gray-900 shadow-xl shadow-primary/20' : 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'}`}
                                        >
                                            Ver disponibilidad
                                        </button>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                            <Clock className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-3">
                                            <h2 className="text-3xl font-display font-bold text-white leading-tight">¿Prefieres agendar el diagnóstico ahora?</h2>
                                            <p className="text-gray-400 max-w-sm mx-auto leading-relaxed text-balance">
                                                Elegir un hueco ahora nos ahorra días de emails. <br />
                                                <span className="text-primary font-medium italic underline decoration-primary/30 underline-offset-4 font-mono text-sm uppercase tracking-wider">15 minutos para ver si podemos trabajar juntos.</span>
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                                            <button onClick={() => handleBranch(true)} className="bg-primary hover:bg-primary-hover text-gray-900 font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/10">
                                                Sí, elegir fecha <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button onClick={() => handleBranch(false)} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 py-5 rounded-xl transition-all">
                                                No agendar, enviar info
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setStep(4)} className="p-2 -ml-2 rounded-full hover:bg-white/5 text-gray-400">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <h2 className="text-2xl font-display font-bold text-white">Reserva Estratégica</h2>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-4">
                                            <BookingCalendar onSelect={handleBookingSelect} />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 6 && (
                                    <motion.div
                                        key="step6"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setStep(formData.wantMeeting ? 5 : 4)} className="p-2 -ml-2 rounded-full hover:bg-white/5 text-gray-400">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <h2 className="text-2xl font-display font-bold text-white">Resumen de Diagnóstico</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                                                <div>
                                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Empresa / Contacto</p>
                                                    <p className="text-white font-medium">{formData.companyName}</p>
                                                    <p className="text-gray-400 text-sm">{formData.name} · {formData.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Sector y Actividad</p>
                                                    <p className="text-white text-sm">{formData.sector}</p>
                                                    <p className="text-gray-400 text-xs">{formData.activity}</p>
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                                                <div>
                                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Servicio Solicitado</p>
                                                    <p className="text-primary font-bold">{services.find(s => s.id === formData.service)?.title}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Cita Programada</p>
                                                    {formData.booking ? (
                                                        <p className="text-white text-sm">
                                                            📅 {formData.booking.date.toLocaleDateString('es-ES')} <br />
                                                            ⏰ {formData.booking.time}
                                                        </p>
                                                    ) : (
                                                        <p className="text-orange-400/80 text-sm italic">Sin cita (se contactará por email/WhatsApp)</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={() => handleSubmitData()}
                                                className="w-full bg-primary hover:bg-primary-hover text-gray-900 font-bold py-5 rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
                                            >
                                                Confirmar y Enviar Diagnóstico
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </button>
                                            <p className="text-center text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-4">
                                                Al confirmar, se procesará tu solicitud de automatización
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 7 && (
                                    <motion.div
                                        key="step7"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-display font-bold text-white mb-2">¡Todo registrado!</h2>
                                            <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl max-w-md mx-auto">
                                                <p className="text-gray-400 leading-relaxed text-base">
                                                    {formData.booking
                                                        ? <>Perfecto <span className="text-white font-bold">{formData.name.split(' ')[0]}</span>. He reservado el <span className="text-primary font-bold">{formData.booking.date.toLocaleDateString('es-ES')}</span> a las <span className="text-primary font-bold">{formData.booking.time}</span>. Recibirás un WhatsApp de confirmación en breve.</>
                                                        : <>Perfecto <span className="text-white font-bold">{formData.name.split(' ')[0]}</span>. He recibido tu diagnóstico. Analizaré tu caso personalmente y te contactaré por WhatsApp o Email en menos de 24 horas.</>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={() => setStep(1)} className="text-gray-500 hover:text-primary transition-colors text-xs font-mono uppercase tracking-widest mt-8 flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 rotate-180" /> Volver al diagnóstico
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Right: Social & Location */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#222222]/80 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl flex-1 flex flex-col"
                        >
                            <h3 className="font-display text-xl font-bold text-white mb-6">Canales Directos</h3>
                            <div className="space-y-3 flex-1">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 transition-all duration-300 ${social.color} group hover:border-white/10`}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-current group-hover:bg-opacity-10 transition-colors">
                                            <social.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-sm">{social.name}</span>
                                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </a>
                                ))}
                                <a href="mailto:hola@antesdehacer.com" className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-gray-900 transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-sm">hola@antesdehacer.com</span>
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
