import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { landingContent } from '../data/landings';
import Navbar from '../components/Navbar';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, AlertCircle, ArrowRight, Layers, BarChart, Settings, Quote,
    Scissors, Sparkles, Stethoscope, Activity, Brain, Sun, GraduationCap,
    Dumbbell, Utensils, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase,
    Plus, Minus
} from 'lucide-react';
import { sectors } from '../data/sectors';

const IconMap = {
    Scissors, Sparkles, Stethoscope, Activity, Brain, Sun, GraduationCap,
    Dumbbell, Utensils, Layers, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase
};

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const SegmentLanding = () => {
    const { segmentId } = useParams();
    const [activeFaq, setActiveFaq] = useState(null);
    const content = landingContent[segmentId];

    // Filter sectors belonging to this segment
    const relevantSectors = sectors.filter(s => s.segmentId === segmentId);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [segmentId]);

    if (!content) {
        return (
            <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Segmento no encontrado</h1>
                    <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen selection:bg-primary selection:text-black bg-gradient-to-br from-black via-[#0a1a0f] to-black">
            <SEO
                title={`${content.hero_title} | Engorilate`}
                description={content.hero_id_phrase}
            />

            {/* Ambient glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-40 translate-x-1/4 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-30 -translate-x-1/4 translate-y-1/4" />
            </div>

            <BackgroundMesh />

            <main className="relative z-10 pt-40 pb-20">

                {/* 1. HERO */}
                <section className="px-6 max-w-7xl mx-auto mb-24 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {/* High-Impact Tag */}
                        <div className="mb-10 inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(110,231,183,0.1)]">
                            <span className="text-primary font-mono text-xs font-black tracking-[0.3em] uppercase">
                                Auditoría de Modelo Operativo
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8 text-white tracking-tighter uppercase">
                            {content.hero_title.split(':').map((part, i) => (
                                <span key={i} className={i === 1 ? "text-primary block mt-2 italic drop-shadow-[0_0_15px_rgba(110,231,183,0.3)]" : "block"}>
                                    {part}{i === 0 && content.hero_title.includes(':') ? ':' : ''}
                                </span>
                            ))}
                        </h1>

                        <div className="mb-20">
                            <span className="text-primary/50 font-black uppercase text-[10px] tracking-[0.3em] mb-6 block">Diseñado especialmente para:</span>
                            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                                {relevantSectors.map((sector) => {
                                    const IconComponent = IconMap[sector.icon] || Settings;
                                    return (
                                        <Link
                                            key={sector.id}
                                            to={`/${sector.slug}/`}
                                            className="px-8 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5 text-gray-400 hover:border-primary/40 hover:bg-primary/5 hover:text-white transition-all text-sm font-bold flex items-center gap-3 group"
                                        >
                                            <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                            {sector.name}
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-4xl mx-auto mb-16 italic border-l-4 border-primary pl-8 py-5 bg-white/5 backdrop-blur-md rounded-r-3xl leading-relaxed shadow-xl">
                            "{content.hero_id_phrase}"
                        </p>

                        {/* Analysis Grid (Fixed Bullets Redesign) */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
                            {[
                                { t: "Flujo Ciego", s: "Mucho movimiento, poco control real" },
                                { t: "Dependencia Total", s: "Todo funciona mientras el dueño está encima" },
                                { t: "Gestión Intuitiva", s: "Decisiones basadas en sensaciones" },
                                { t: "Modo Bombero", s: "Sensación constante de ir apagando fuegos" }
                            ].map((bullet, idx) => (
                                <div key={idx} className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm group hover:border-red-500/30 transition-all duration-500">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2 italic">{bullet.t}</h4>
                                    <p className="text-gray-400 text-sm leading-snug">{bullet.s}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>


                {/* 2. REFRAMING BLOCK (Strategic) */}
                <section className="px-6 max-w-5xl mx-auto mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="relative group"
                    >
                        <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-black p-10 md:p-16 rounded-[3rem] border-2 border-primary/20 shadow-2xl text-center">
                            <Quote className="w-16 h-16 text-primary/10 absolute -top-2 -left-2 rotate-12" />
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] font-black italic">El Cambio de Paradigma Operativo</h3>
                                <p className="text-2xl md:text-4xl font-display font-black leading-tight text-white italic tracking-tighter">
                                    "{content.reframing}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 3. CONCEPTUAL BLOCK (Redesign) */}
                <section className="px-6 max-w-4xl mx-auto mb-32 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter leading-tight uppercase">
                            No es un problema de tu sector. <br />
                            <span className="text-primary italic">Es tu ADN operativo.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 font-light italic leading-relaxed max-w-3xl mx-auto">
                            "El caos no es una señal de que necesitas más clientes, es el síntoma de que tu estructura está colapsando bajo su propio peso."
                        </p>
                    </motion.div>
                </section>

                {/* 4. AUTHORITY BLOCK (Technical Redesign) */}
                <section className="px-6 max-w-6xl mx-auto mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                    >
                        <div className="lg:col-span-12 xl:col-span-7">
                            <div className="w-12 h-1 bg-primary mb-8" />
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9] text-white tracking-tighter uppercase italic">
                                El desorden <br />
                                <span className="text-primary">no es gratis.</span>
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-light mb-8 max-w-2xl">
                                Siempre surge en los mismos puntos críticos. El caos operativo es la etapa previa a la pérdida de rentabilidad irreversible. Ponemos orden industrial donde otros solo ven "lío".
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono uppercase tracking-[0.2em] text-gray-400">Detección_Cuellos_Botella</div>
                                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono uppercase tracking-[0.2em] text-gray-400">Mapeo_Procesos_IA</div>
                            </div>
                        </div>
                        <div className="lg:col-span-12 xl:col-span-5 relative group">
                            <div className="absolute -inset-1 bg-primary/20 rounded-3xl blur-[40px] opacity-20 group-hover:opacity-40 transition duration-1000" />
                            <div className="relative bg-[#0d0d0d] p-8 md:p-10 rounded-3xl border-2 border-white/10 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lo que te está costando hoy</div>
                                        <div className="text-[10px] font-black text-red-500 animate-pulse uppercase italic">Agotamiento: Máximo</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm font-bold text-white/80 uppercase">
                                            <span>Estrés por desorden</span>
                                            <span className="text-red-500">Crítico</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "95%" }}
                                                transition={{ duration: 2, ease: "circOut" }}
                                                className="h-full bg-gradient-to-r from-red-500/50 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center">
                                            <span className="text-[9px] font-black text-gray-500 uppercase mb-2">Ventas Perdidas</span>
                                            <span className="text-2xl font-black text-white italic tracking-tighter">1 de cada 3</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center">
                                            <span className="text-[9px] font-black text-gray-500 uppercase mb-2">Tiempo Familiar Robado</span>
                                            <span className="text-2xl font-black text-white italic tracking-tighter">50h / mes</span>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 text-center">
                                        <div className="text-primary font-black text-[9px] tracking-[0.2em] uppercase mb-2">Acción Necesaria</div>
                                        <div className="text-white text-xs font-black uppercase tracking-widest italic leading-tight">Reparar el motor de tu negocio</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 5. METHOD BLOCK (Redesign) */}
                <section className="px-6 max-w-6xl mx-auto mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white tracking-tighter italic uppercase">
                            No instalamos software. <br />
                            <span className="text-primary">Construimos el motor.</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-light italic max-w-3xl mx-auto leading-relaxed">
                            Nuestro proceso industrial garantiza orden, claridad y escalabilidad real.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: <BarChart />, title: "Análisis", text: "Mapeo exhaustivo de los cuellos de botella reales." },
                            { icon: <Settings />, title: "Ingeniería", text: "Diseño del sistema estructural mínimo necesario." },
                            { icon: <CheckCircle />, title: "Puesta en Marcha", text: "Implantación acompañada y KPIs." }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:border-primary/40 transition-all duration-500 group shadow-xl relative overflow-hidden"
                            >
                                <div className="mb-8 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-all duration-500">
                                    {React.cloneElement(step.icon, { size: 32 })}
                                </div>
                                <h4 className="text-2xl font-black mb-3 text-white uppercase italic tracking-tighter">{step.title}</h4>
                                <p className="text-gray-400 text-base leading-relaxed font-light italic">{step.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* 6. CHAOS SCANNER (Modern Redesign) */}
                <section className="px-6 max-w-6xl mx-auto mb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6 italic">
                                <AlertCircle className="w-3 h-3" />
                                Diagnóstico de Riesgos Críticos
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight uppercase italic">
                                La realidad de <br />
                                <span className="text-primary drop-shadow-[0_0_20px_rgba(110,231,183,0.4)]">tu día a día</span>
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed italic border-l-2 border-white/10 pl-6">
                                Ponemos nombre a lo que te pasa cada mañana cuando abres la persiana.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Column: Problem Definition & Symptoms */}
                        <div className="lg:col-span-12 xl:col-span-7 space-y-10">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="relative p-8 md:p-12 bg-white/[0.02] backdrop-blur-3xl border-l-4 border-primary/60 rounded-r-3xl overflow-hidden group shadow-xl"
                            >
                                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic">Situación del Negocio</h3>
                                <p className="text-white text-2xl md:text-3xl leading-tight font-black tracking-tighter italic">
                                    {content.model_def}
                                </p>
                            </motion.div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] flex items-center gap-4 italic">
                                    <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" /> Puntos donde pierdes dinero <span className="h-px bg-red-500/20 flex-grow" />
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {content.symptoms.split('·').map((symptom, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                                            className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl group hover:border-red-500/40 transition-all duration-500 relative overflow-hidden"
                                        >
                                            <div className="w-8 h-8 rounded-lg border border-red-500/30 flex items-center justify-center shrink-0 group-hover:bg-red-500 transition-all duration-500">
                                                <div className="w-2 h-2 bg-red-500 rounded-sm group-hover:bg-black transition-colors" />
                                            </div>
                                            <span className="text-gray-300 text-base font-bold italic tracking-tight group-hover:text-white transition-colors">{symptom.trim()}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Consequences & Solution */}
                        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-[#121212] to-black rounded-3xl p-8 md:p-12 border border-red-500/20 relative overflow-hidden shadow-xl group hover:border-red-500/40 transition-all duration-700"
                            >
                                <h3 className="text-2xl font-black text-white mb-8 flex flex-col gap-1 tracking-tighter uppercase italic leading-none">
                                    <span className="text-red-500 text-[9px] font-mono tracking-[0.4em] not-italic mb-2">Coste_Inacción</span>
                                    El precio de no <br />reparar el motor
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 italic">
                                    {content.consequences}
                                </p>
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-[9px] font-black font-mono tracking-widest flex items-center justify-between">
                                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" /> REPORTE_PÉRDIDA</span>
                                    <span className="bg-red-500/20 px-2 py-0.5 rounded text-[8px]">CRÍTICO</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-[#0a0a0a] to-black rounded-3xl p-8 md:p-12 border border-primary/20 relative overflow-hidden shadow-xl group hover:border-primary/40 transition-all duration-700"
                            >
                                <h3 className="text-2xl font-black text-primary mb-8 flex flex-col gap-1 tracking-tighter uppercase italic leading-none">
                                    <span className="text-primary/60 text-[10px] font-black tracking-[0.4em] not-italic mb-2">La Solución</span>
                                    Lo que <br />conseguiremos
                                </h3>
                                <p className="text-white text-2xl leading-tight font-black italic tracking-tighter">
                                    {content.solution}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                {content.faqs && (
                    <section className="px-6 max-w-4xl mx-auto mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
                                Preguntas <span className="text-primary italic">Frecuentes</span>
                            </h2>
                            <p className="text-gray-400 font-light italic text-lg">
                                Resolvemos las dudas habituales sobre este modelo operativo.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {content.faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/30 shadow-xl"
                                >
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                        className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
                                    >
                                        <span className={`text-lg md:text-xl font-bold italic tracking-tight transition-colors ${activeFaq === idx ? 'text-primary' : 'text-white'}`}>
                                            {faq.q}
                                        </span>
                                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${activeFaq === idx ? 'bg-primary border-primary text-black scale-110' : 'border-white/10 text-primary group-hover:border-primary/50'}`}>
                                            {activeFaq === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {activeFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                            >
                                                <div className="px-8 pb-8 text-gray-400 text-lg font-light leading-relaxed italic border-t border-white/5 pt-6">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 7. CTA + REASEGURO + CIERRE (Modern Redesign) */}
                <section className="px-6 py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Who is this NOT for (Aggressive Filter) */}
                        <div className="mb-12 inline-block px-8 py-4 bg-red-500/5 border border-red-500/20 rounded-2xl backdrop-blur-xl">
                            <p className="text-red-200 text-lg font-black italic tracking-tight flex items-center justify-center gap-3">
                                <AlertCircle className="w-6 h-6 flex-shrink-0 animate-pulse" />
                                Este enfoque NO es para negocios que solo buscan "parches"
                            </p>
                        </div>

                        {/* CTA Copy */}
                        <h2 className="font-display text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter leading-tight uppercase italic">
                            ¿Tu negocio es <br />
                            <span className="text-primary drop-shadow-[0_0_20px_rgba(110,231,183,0.4)]">autónomo</span> o depende de ti?
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 font-light italic max-w-2xl mx-auto leading-relaxed">
                            "Analizamos si tu estructura operativa actual es la responsable de devorar tus márgenes y tu tiempo."
                        </p>

                        {/* Button with High Impact */}
                        <div className="relative inline-block mb-10 group">
                            <div className="absolute -inset-3 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition duration-1000" />
                            <Link
                                to="/diagnostico"
                                className="relative inline-flex items-center justify-center bg-primary text-black font-black text-xl px-12 py-5 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-xl uppercase italic tracking-tighter"
                            >
                                Escaneo Gratuito <ArrowRight className="ml-2 w-6 h-6" />
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 mb-24 opacity-60">
                            <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-[0.4em]">Análisis_IA_Incluido</span>
                            <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-[0.4em]">Sin_Presión_Comercial</span>
                            <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-[0.4em]">Resultados_Inmediatos</span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left max-w-4xl mx-auto mb-20">
                            {[
                                "Sin plantillas genéricas",
                                "Sin compromiso inicial",
                                "Enfoque en rentabilidad",
                                "Garantía de sistema"
                            ].map((text, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-2 group hover:bg-white/[0.05] transition-all">
                                    <CheckCircle className="w-4 h-4 text-primary opacity-50" />
                                    <p className="text-gray-300 text-[10px] font-bold uppercase italic tracking-tight">{text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cierre de Impacto */}
                        <div className="max-w-2xl mx-auto p-8 bg-white/[0.01] rounded-[3rem] border border-white/5 backdrop-blur-3xl">
                            <p className="text-xl md:text-2xl font-light text-white mb-4 italic leading-tight">
                                "El primer paso para recuperar tu libertad <br className="hidden md:block" />
                                <span className="font-black text-primary underline underline-offset-4">no es trabajar más horas.</span>"
                            </p>
                            <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                                Es reprogramar <br />tu modelo de negocio.
                            </p>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};

export default SegmentLanding;
