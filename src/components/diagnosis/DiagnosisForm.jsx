import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { diagnosisQuestions } from '../../data/diagnosisQuestions';
import { submitDiagnosis } from '../../lib/diagnoses';
import { Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { analytics } from '../../lib/analytics';

const DiagnosisForm = () => {
    const [step, setStep] = useState(1); // Start directly at questions
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [responses, setResponses] = useState({});
    const [branch, setBranch] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [contactInfo, setContactInfo] = useState({
        full_name: '',
        email: '',
        phone: '',
        website_url: '' // Honeypot field
    });
    const [loadTimestamp] = useState(Date.now());

    useEffect(() => {
        if (step === 1 && currentQuestionIdx === 0) {
            analytics.trackEvent('diagnosis_start');
        }
    }, []);

    useEffect(() => {
        if (step === 4) {
            analytics.trackEvent('diagnosis_leads_view');
        }
    }, [step]);

    const currentQuestions =
        step === 1 ? diagnosisQuestions.common :
            step === 2 ? diagnosisQuestions.branches[branch] :
                step === 3 ? diagnosisQuestions.final : [];

    const totalStepsInModule = currentQuestions.length;
    const progress = (currentQuestionIdx / totalStepsInModule) * 100;

    const handleOptionSelect = (value, option) => {
        const questionId = currentQuestions[currentQuestionIdx].id;
        setResponses(prev => ({ ...prev, [questionId]: value }));

        // Lógica de ramificación específica
        if (questionId === 'branch_selector') {
            setBranch(value);
        }

        // Avanzar a la siguiente pregunta o módulo
        if (currentQuestionIdx < totalStepsInModule - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            handleModuleComplete();
        }
    };

    const handleModuleComplete = () => {
        analytics.trackEvent('diagnosis_module_complete', { module: step });
        setCurrentQuestionIdx(0);
        setStep(prev => prev + 1);
    };

    const handleOpenResponseChange = (e) => {
        const questionId = currentQuestions[currentQuestionIdx].id;
        setResponses(prev => ({ ...prev, [questionId]: e.target.value }));
    };

    const handleNextOpen = () => {
        if (currentQuestionIdx < totalStepsInModule - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            handleModuleComplete();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Anti-spam: Honeypot check
        if (contactInfo.website_url) {
            console.warn('Spam detected: Honeypot filled');
            setStep(5); // Silent success
            return;
        }

        // 2. Anti-spam: Timing check (Bots submit too fast)
        // Since it's a multi-step quiz, standard users take at least 15-20s
        const timeDiff = Date.now() - loadTimestamp;
        if (timeDiff < 10000) { // Less than 10 seconds for the whole quiz is suspicious
            console.warn('Spam detected: Submission too fast');
            setStep(5); // Silent success
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const { data, error } = await submitDiagnosis({
            ...contactInfo,
            responses,
            detected_branch: branch
        });

        if (error) {
            setError('Hubo un problema al procesar tu diagnóstico. Por favor, inténtalo de nuevo.');
            setIsSubmitting(false);
        } else {
            analytics.trackEvent('diagnosis_complete', { branch });
            setStep(5); // Show result/confirmation
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (q) => (
        <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Category Badge */}
            {q.category && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {q.category}
                    </span>
                </div>
            )}

            {/* Description */}
            {q.description && (
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {q.description}
                </p>
            )}

            {/* Question */}
            <h3 className="text-2xl md:text-3xl font-display font-medium leading-tight">
                {q.question}
            </h3>

            {q.type === 'open' ? (
                <div className="space-y-4">
                    <textarea
                        className="w-full bg-[#1E1E1E] border border-white/30 rounded-xl p-4 text-lg focus:border-primary/50 focus:outline-none transition-colors min-h-[120px] text-white placeholder-gray-500 shadow-inner"
                        placeholder="Escribe aquí tu respuesta..."
                        value={responses[q.id] || ''}
                        onChange={handleOpenResponseChange}
                    />
                    <button
                        onClick={handleNextOpen}
                        disabled={!responses[q.id]}
                        className="group flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-full font-medium hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continuar
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            ) : (
                <div className="grid gap-3">
                    {q.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleOptionSelect(opt.value, opt)}
                            className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group
                                ${responses[q.id] === opt.value
                                    ? 'bg-primary/30 border-primary text-primary shadow-[0_0_30px_rgba(110,231,183,0.25)]'
                                    : 'bg-[#1E1E1E] bg-gradient-to-br from-primary/[0.04] to-transparent border-white/30 hover:bg-white/10 hover:border-white/50 shadow-xl'}`}
                        >
                            <span className="text-lg md:text-xl font-medium">{opt.label}</span>
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
                                ${responses[q.id] === opt.value ? 'bg-primary border-primary' : 'border-white/30 group-hover:border-white/50'}`}>
                                {responses[q.id] === opt.value && <Check className="w-4 h-4 text-background-dark" />}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </motion.div>
    );

    return (
        <div className="max-w-2xl mx-auto w-full px-4">
            <AnimatePresence mode="wait">

                {(step >= 1 && step <= 3) && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-8 py-8"
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-text-muted uppercase tracking-widest">
                                <span>Módulo {step} / 3</span>
                                <span>{Math.round(progress)}% completado</span>
                            </div>
                            <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden border border-white/5 shadow-inner">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        {renderQuestion(currentQuestions[currentQuestionIdx])}
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8 py-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-display font-bold">Casi hemos terminado</h2>
                            <p className="text-text-muted">Necesitamos estos datos para enviarte tu informe completo analizado por nuestra IA.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted ml-1">Nombre Completo</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-[#1E1E1E] border border-white/30 rounded-xl p-4 focus:border-primary/50 focus:outline-none transition-colors text-white placeholder-gray-500 shadow-inner"
                                    placeholder="Juan Pérez"
                                    value={contactInfo.full_name}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, full_name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted ml-1">Email Corporativo</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-[#1E1E1E] border border-white/30 rounded-xl p-4 focus:border-primary/50 focus:outline-none transition-colors text-white placeholder-gray-500 shadow-inner"
                                    placeholder="juan@tuempresa.com"
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted ml-1">WhatsApp (opcional)</label>
                                <input
                                    type="tel"
                                    className="w-full bg-[#1E1E1E] border border-white/30 rounded-xl p-4 focus:border-primary/50 focus:outline-none transition-colors text-white placeholder-gray-500 shadow-inner"
                                    placeholder="+34 600 000 000"
                                    value={contactInfo.phone}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>

                            {/* Honeypot field - Invisible to humans */}
                            <div className="hidden pointer-events-none opacity-0 h-0 overflow-hidden" aria-hidden="true">
                                <input
                                    type="text"
                                    tabIndex="-1"
                                    autoComplete="off"
                                    value={contactInfo.website_url}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, website_url: e.target.value }))}
                                    placeholder="Tu sitio web (dejar en blanco)"
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary text-background-dark rounded-full text-lg font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Procesando Diagnóstico...
                                    </>
                                ) : (
                                    'Obtener mis resultados'
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 5 && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-12"
                    >
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-display font-bold">¡Diagnóstico Completado!</h2>
                            <p className="text-xl text-text-muted">
                                Tus respuestas han sido enviadas para el análisis por IA.
                                <br /> En breve recibirás un WhatsApp o Email con tu diagnóstico detallado.
                            </p>
                        </div>
                        <div className="p-6 premium-box rounded-2xl space-y-4 inline-block text-left max-w-md">
                            <h4 className="font-bold text-primary">Siguiente paso:</h4>
                            <p className="text-sm text-text-muted">
                                Estamos procesando tus datos a través de n8n y nuestra IA especializada en procesos operativos. Esto suele tardar menos de 2 minutos.
                            </p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="text-primary hover:underline font-medium block pt-2"
                            >
                                Volver a la Home
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DiagnosisForm;
