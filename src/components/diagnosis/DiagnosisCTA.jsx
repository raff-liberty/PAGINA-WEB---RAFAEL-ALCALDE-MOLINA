import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Brain } from 'lucide-react';
import { analytics } from '../../lib/analytics';

const DiagnosisCTA = ({ className = "" }) => {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            {/* Background elements */}
            <div className="absolute inset-0 bg-[#0A0A0A]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(110,231,183,0.05)_0%,transparent_70%)]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative group">
                    {/* Decorative glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-700" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest">
                                <Sparkles className="w-4 h-4" />
                                Herramienta Exclusiva
                            </div>

                            <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-[1.1] tracking-tighter italic">
                                ¿TU NEGOCIO ES <span className="text-primary italic">AUTÓNOMO</span> O DEPENDE DE TI?
                            </h2>

                            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                                Deja de apagar fuegos. Realiza nuestro <span className="text-white font-bold">Diagnóstico de Eficiencia Operativa</span> y descubre en menos de 2 minutos exactamente dónde están los cuellos de botella que te impiden crecer.
                            </p>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <ShieldCheck className="w-5 h-5 text-primary/50" />
                                    <span>Análisis por IA</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Zap className="w-5 h-5 text-primary/50" />
                                    <span>Resultados al instante</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Brain className="w-5 h-5 text-primary/50" />
                                    <span>Hoja de ruta estratégica</span>
                                </div>
                            </div>

                            <Link
                                to="/autopsia"
                                onClick={() => analytics.trackEvent('diagnosis_cta_click')}
                                className="inline-flex items-center gap-3 bg-primary hover:bg-white text-black font-black px-10 py-5 rounded-xl text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(110,231,183,0.2)] group/btn"
                            >
                                OBTIENE TU DIAGNÓSTICO GRATIS
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="relative">
                            {/* Visual representation of the tool */}
                            <div className="relative z-20 bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                <div className="space-y-6">
                                    <div className="h-2 w-24 bg-primary/20 rounded-full" />
                                    <div className="space-y-3">
                                        <div className="h-4 w-full bg-white/5 rounded-lg" />
                                        <div className="h-4 w-5/6 bg-white/5 rounded-lg" />
                                        <div className="h-4 w-4/6 bg-white/5 rounded-lg" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="aspect-square rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center gap-2">
                                            <div className="text-2xl font-black text-primary">84%</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-bold text-center px-2">Eficiencia Actual</div>
                                        </div>
                                        <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2">
                                            <Zap className="w-6 h-6 text-primary" />
                                            <div className="text-[10px] text-gray-500 uppercase font-bold text-center px-2">Potencial de ahorro</div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                            <span>Analizando procesos...</span>
                                            <span className="text-primary italic">IA ACTIVE</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary"
                                                animate={{ width: ['20%', '80%', '60%', '100%'] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative background cards */}
                            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 border border-primary/10 rounded-3xl -rotate-3 z-10" />
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 border border-white/5 rounded-3xl -rotate-6 z-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiagnosisCTA;
