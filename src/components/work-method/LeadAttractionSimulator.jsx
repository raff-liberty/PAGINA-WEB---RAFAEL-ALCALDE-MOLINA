import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Filter, ShieldCheck, Target, ArrowRight } from 'lucide-react';

const LeadAttractionSimulator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const questions = [
        {
            q: "¿Cómo evitamos atraer curiosos sin presupuesto?",
            options: [
                "Bajando los precios en el anuncio",
                "Filtros de segmentación por intereses de alto nivel",
                "Poniendo 'SOLO GENTE SERIA' en mayúsculas"
            ],
            correct: 1,
            edu: "Usamos algoritmos avanzados para impactar solo a perfiles con alto poder adquisitivo o necesidades empresariales reales."
        },
        {
            q: "¿Qué sucede cuando alguien hace clic en nuestro anuncio?",
            options: [
                "Se le envía a una página genérica",
                "Pasa por un embudo de cualificación automática",
                "Le llamamos nosotros inmediatamente"
            ],
            correct: 1,
            edu: "El sistema filtra automáticamente los leads irrelevantes mediante preguntas estratégicas antes de llegar a ti."
        },
        {
            q: "¿Cuál es el secreto de un anuncio que convierte?",
            options: [
                "Que sea muy colorido y chillón",
                "Que resuelva un dolor específico de tu cliente",
                "Que sea el más barato del sector"
            ],
            correct: 1,
            edu: "La autoridad se construye atacando problemas reales, no compitiendo solo por precio."
        },
        {
            q: "¿Por qué filtramos a los leads antes de la cita?",
            options: [
                "Para que no pierdas tiempo con perfiles que no pueden comprar",
                "Para parecer más exclusivos y caros",
                "Para tener menos trabajo administrativo"
            ],
            correct: 0,
            edu: "Tu tiempo es oro. El sistema solo entrega 'Leads Listos' que cumplen tus criterios exactos de venta."
        },
        {
            q: "¿Qué hace nuestro sistema con los leads que NO califican?",
            options: [
                "Los borra del sistema",
                "Los educa mediante contenido automático (Nurturing)",
                "Les ignora para siempre"
            ],
            correct: 1,
            edu: "Incluso los que no compran hoy son educados por el sistema para cuando estén listos en el futuro."
        }
    ];

    const handleAnswer = (index) => {
        if (feedback) return;

        const isCorrect = index === questions[currentStep].correct;
        if (isCorrect) setScore(s => s + 1);

        setFeedback(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(s => s + 1);
                setFeedback(null);
            } else {
                setShowResults(true);
            }
        }, 2500);
    };

    return (
        <div className="w-full min-h-[500px] md:aspect-square bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, #22c55e 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full flex flex-col items-center h-full"
                    >
                        {/* Quiz Header */}
                        <div className="flex items-center justify-between w-full mb-4 md:mb-6">
                            <div className="flex flex-col">
                                <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.3em]">Módulo de Educación</span>
                                <span className="text-base md:text-xl font-black text-white italic tracking-tighter uppercase">Filtro de Autoridad</span>
                            </div>
                            <div className="bg-white/5 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10">
                                <span className="text-[8px] md:text-[10px] font-mono text-white/40">{currentStep + 1} / {questions.length}</span>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 mb-3 md:mb-4">
                            <h3 className="text-[11px] md:text-xs lg:text-sm font-bold text-white text-center leading-relaxed">
                                {questions[currentStep].q}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="w-full space-y-2 flex-grow">
                            {questions[currentStep].options.map((opt, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleAnswer(i)}
                                    className={`w-full p-4 md:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${feedback === null ? 'bg-white/5 border-white/10 hover:border-primary/50 text-white/70' :
                                        i === questions[currentStep].correct ? 'bg-primary/20 border-primary text-white' :
                                            feedback === 'incorrect' && i !== questions[currentStep].correct ? 'bg-red-500/10 border-red-500/50 text-white/40' : 'bg-white/5 border-white/10 text-white/40'
                                        }`}
                                >
                                    <span className="text-[11px] font-medium leading-tight">{opt}</span>
                                    {feedback && i === questions[currentStep].correct && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                                </motion.button>
                            ))}
                        </div>

                        {/* Educational Feedback */}
                        <div className="h-24 w-full mt-4 flex items-center justify-center">
                            <AnimatePresence>
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center text-[9px] uppercase font-black tracking-widest w-full`}
                                    >
                                        <div className={`flex items-center gap-2 justify-center mb-1 ${feedback === 'correct' ? 'text-primary' : 'text-red-400'}`}>
                                            <Sparkles className="w-3 h-3" />
                                            <span>Aprendizaje Clave:</span>
                                        </div>
                                        <p className="normal-case font-medium text-white/60 tracking-normal text-[10px] leading-tight italic">
                                            "{questions[currentStep].edu}"
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center py-4"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/50 mb-4">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-black text-white italic uppercase mb-2">Educación Completada</h2>
                        <p className="text-xs text-white/60 mb-6 max-w-[240px]">
                            Has entendido cómo funciona nuestro sistema de atracción y filtrado de alta autoridad.
                        </p>

                        <div className="grid grid-cols-2 gap-3 w-full mb-6">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                <span className="block text-[8px] font-black text-white/30 uppercase mb-1">Puntuación</span>
                                <span className="text-xl font-black font-mono text-primary">{score}/{questions.length}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                <span className="block text-[8px] font-black text-white/30 uppercase mb-1">Nivel</span>
                                <span className="text-sm font-black text-white italic">ESPERTO</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setCurrentStep(0);
                                setScore(0);
                                setShowResults(false);
                                setFeedback(null);
                            }}
                            className="flex items-center gap-2 bg-primary px-6 py-2.5 rounded-full text-black font-black uppercase text-[10px] hover:scale-105 transition-transform"
                        >
                            Reiniciar Módulo
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LeadAttractionSimulator;
