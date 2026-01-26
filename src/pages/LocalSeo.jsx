import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Star, Phone, Navigation, Zap, CheckCircle, ArrowRight, TrendingUp, HeartPulse, Utensils, Scale as LawIcon, UserCheck, HelpCircle, Eye, MousePointer2, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import BackgroundMesh from '../components/BackgroundMesh';
import LocalSeoSimulator from '../components/LocalSeoSimulator';

const LocalSeo = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const features = [
        {
            icon: Eye,
            title: "Auditoría Express",
            desc: "Analizamos por qué tu competencia sale antes que tú y trazamos un plan para superarlos."
        },
        {
            icon: TrendingUp,
            title: "Estrategia de Reseñas",
            desc: "No solo cantidad, sino calidad. Conseguimos que los mejores clientes te recomienden."
        },
        {
            icon: CheckCircle,
            title: "SEO Técnico",
            desc: "Optimizamos el código interno para que Google te valore como el líder de tu zona."
        }
    ];

    const sectors = [
        { icon: HeartPulse, name: "Clínicas y Salud", detail: "Aparece cuando busquen médicos o especialistas en tu zona." },
        { icon: Utensils, name: "Restauración", detail: "Domina las búsquedas de 'restaurantes cerca de mí' 24/7." },
        { icon: LawIcon, name: "Despachos y Asesorías", detail: "Posiciónate como la autoridad legal de tu ciudad." },
        { icon: UserCheck, name: "Servicios Locales", detail: "Peluquerías, Taller, Reformas. Sé el primero que llamen." }
    ];

    const steps = [
        {
            num: "01",
            title: "El Análisis",
            text: "Auditamos tu ficha y la de tu competencia para encontrar los puntos ciegos."
        },
        {
            num: "02",
            title: "La Inyección",
            text: "Aplicamos SEO local agresivo, optimizamos fotos y lanzamos el sistema de reseñas."
        },
        {
            num: "03",
            title: "El Dominio",
            text: "Vigila desde tu panel cómo subes posiciones hasta capturar todo el tráfico de tu zona."
        }
    ];

    const faqs = [
        {
            icon: Search,
            q: "¿Cuándo empezaré a ver resultados?",
            a: "Los primeros cambios se notan en un par de semanas, pero para dominar tu zona por completo solemos trabajar entre 3 y 6 meses."
        },
        {
            icon: MapPin,
            q: "¿Me aseguras estar el primero?",
            a: "Nadie puede prometer el primer puesto de Google por escrito, pero lo que sí te garantizamos es una mejora radical y superar a tus competidores directos."
        },
        {
            icon: UserCheck,
            q: "¿Sirve si tengo varios locales?",
            a: "Por supuesto. Adaptamos la estrategia para que cada uno de tus locales sea el líder en su barrio o zona de influencia."
        },
        {
            icon: BarChart,
            q: "¿Cómo sé si está funcionando?",
            a: "Te damos un acceso a un panel sencillo donde verás el aumento de llamadas y de personas que piden la ruta para llegar a tu local."
        }
    ];

    return (
        <div className="relative pt-24 md:pt-40 pb-20 min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black overflow-hidden">
            <SEO
                title="SEO Local: Domina Google Maps y Capta Clientes | Engorilate"
                description="Si no estás en los 3 primeros de Google Maps, le estás dando dinero a tu competencia. Estrategia de SEO Local agresiva para negocios que quieren crecer."
            />
            <BackgroundMesh />

            {/* Ambient Atmosphere (Mirroring Home) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" />
                <div className="absolute bottom-[5%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" style={{ animationDuration: '8s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* HERO SECTION - Mirroring Home Layout but Compact */}
                <div className="flex flex-col mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-4 md:mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm self-start"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <span className="text-primary text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                                Visibilidad Radical en tu Ciudad
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1] md:leading-[0.9] tracking-tight text-white mb-6 md:mb-8 uppercase italic pr-2"
                            >
                                DOMINA <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">TU CALLE.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed italic mb-6 md:mb-10 border-l-2 lg:border-l-4 border-primary/40 pl-4 md:pl-6"
                            >
                                Si no sales en los 3 primeros de <span className="text-white font-bold">Google Maps</span>, el cliente se va a tu competencia. Inyectamos tráfico de personas que ya están buscando lo que tú vendes.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="hidden md:block"
                            >
                                <Link to="/contact" className="group/btn relative bg-primary hover:bg-white text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)] text-sm overflow-hidden inline-flex">
                                    <span className="relative z-10">ANALIZAR MI ZONA GRATIS</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-12 xl:col-span-4 flex flex-col items-center xl:items-end mt-12 xl:mt-0 px-4 md:px-0">
                            <LocalSeoSimulator />

                            {/* Subtler Mobile CTA */}
                            <motion.button
                                onClick={() => document.getElementById('contact-form-main')?.scrollIntoView({ behavior: 'smooth' })}
                                className="xl:hidden mt-8 w-full max-w-[320px] py-4 rounded-2xl border border-primary/30 bg-primary/5 text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-black transition-all"
                            >
                                Analizar Mi Zona Gratis ↓
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* SECTORES DONDE MEJOR FUNCIONA */}
                <div className="my-10 md:my-20">
                    <div className="mb-8 md:mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white">
                            Los pilares de <br />
                            <span className="text-primary italic">tu visibilidad</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {sectors.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[1.5rem] md:rounded-[2rem] p-6 overflow-hidden hover:border-primary/60 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
                            >
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-700 shrink-0">
                                        <s.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-all duration-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white uppercase italic tracking-tighter leading-tight">{s.name}</h3>
                                </div>

                                <p className="text-white/80 text-base leading-relaxed font-medium italic">{s.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* THE SYSTEM REASONING - COMPACT & CLEAR */}
                <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center my-10 md:my-20">
                    <div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white mb-6">
                            Guerra total <br />
                            <span className="text-primary italic">en el Mapa</span>.
                        </h2>
                        <div className="space-y-6">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <f.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">{f.title}</h4>
                                        <p className="text-white/80 text-base leading-relaxed font-medium italic">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#1A1A1A] border border-white/20 p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] hover:border-primary/40 transition-all duration-700 group/results">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-100" />
                        <div className="absolute -bottom-20 -right-20 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-primary/5 blur-[100px] rounded-full group-hover/results:bg-primary/20 transition-all duration-700" />

                        <h3 className="relative z-10 text-primary font-mono text-[9px] font-black tracking-[0.4em] uppercase mb-8">Auditoría de Impacto Visual</h3>

                        <div className="space-y-4">
                            {/* Comparison Example - MAX CONTRAST & COMPACT */}
                            <div className="bg-[#222222] border border-primary/40 p-5 pr-16 md:p-6 md:pr-20 rounded-2xl relative overflow-hidden group/card shadow-2xl">
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/20" />

                                <div className="absolute top-0 right-0 flex">
                                    <div className="bg-primary text-black px-3 py-1 text-[9px] font-black uppercase italic rounded-bl-xl shadow-lg relative z-10">Tú</div>
                                </div>

                                <div className="flex justify-between items-center relative z-10">
                                    <div className="space-y-2">
                                        <div className="space-y-0.5">
                                            <h4 className="text-white font-black uppercase italic text-lg tracking-tight leading-none">ENGORILADOS LOCAL</h4>
                                            <div className="flex items-center gap-2 text-[8px] text-primary font-bold uppercase italic tracking-widest">
                                                <span>Agencia de Automatización</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            <div className="flex text-yellow-500 gap-0.5">
                                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                            </div>
                                            <span className="text-[10px] text-white/50 font-mono font-black">(128 reseñas)</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-[10px]">
                                            <span className="text-primary font-bold">Abierto 24/7</span>
                                            <span className="text-white/30 font-medium italic">Murcia</span>
                                        </div>
                                    </div>

                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 group-hover/card:translate-x-0 transition-transform duration-500 flex items-center justify-center">
                                        <div className="bg-primary text-black w-14 h-14 md:w-16 md:h-16 rounded-2xl rounded-tr-none flex items-center justify-center font-black text-2xl md:text-3xl italic shadow-[0_15px_40px_rgba(34,197,94,0.6)] border-2 border-white/30">
                                            1º
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Improved Competitor Card - Compact */}
                            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl opacity-30 grayscale flex justify-between items-center">
                                <div className="space-y-2 w-2/3">
                                    <div className="h-4 bg-white/10 w-full rounded-md" />
                                    <div className="h-3 bg-white/5 w-1/2 rounded-md" />
                                </div>
                                <div className="bg-white/10 w-12 h-12 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STEPS - PREMIUM DARK THEME */}
            <section className="px-6 py-12 md:py-24 bg-[#020202] relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-20">
                        <h2 className="text-3xl md:text-6xl font-display font-black uppercase italic tracking-tighter text-white">
                            Proceso <span className="text-primary italic">Hacia el #1</span>
                        </h2>
                        <p className="text-white/70 text-[10px] md:text-base mt-3 max-w-xl mx-auto font-medium italic uppercase tracking-widest">
                            Tres fases diseñadas para dominar tu área de influencia.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {steps.map((s, i) => (
                            <div key={i} className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2rem] p-6 md:p-10 overflow-hidden hover:border-primary/40 transition-all duration-700">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                                <div className="text-6xl md:text-8xl font-display font-black text-primary/5 absolute -top-2 -right-1 transform group-hover:scale-110 transition-all duration-700">{s.num}</div>

                                <div className="relative z-10">
                                    <div className="flex flex-row items-center gap-4 mb-6 relative">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary group-hover:scale-110 transition-all shrink-0">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-display font-black uppercase italic leading-none text-white m-0 p-0">{s.title}</h3>
                                    </div>
                                    <p className="text-white/80 text-base leading-relaxed font-medium italic">{s.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION - ENHANCED VISUALS */}
            <section className="px-6 py-12 md:py-24 bg-[#020202]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                        <HelpCircle className="w-10 h-10 md:w-12 h-12 text-primary mx-auto mb-4 md:mb-6 relative z-10" />
                        <h2 className="text-3xl md:text-6xl font-display font-black uppercase italic text-white relative z-10 tracking-tighter">
                            Dudas <span className="text-primary italic">y Respuestas</span>
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`group bg-[#0a0a0a] border ${expandedFaq === i ? 'border-primary/40' : 'border-white/10'} rounded-2xl overflow-hidden transition-all duration-500`}
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${expandedFaq === i ? 'text-primary' : 'text-primary/40'} border border-white/10 transition-all`}>
                                            <faq.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white uppercase italic tracking-tight">{faq.q}</h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                                        className="text-primary/40"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="pl-14 text-gray-200 leading-relaxed font-medium italic text-base">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="contact-form-main" className="mb-10 md:mb-20">
                <section className="px-6 py-12 md:py-24 bg-[#020202]">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center border border-white/10 p-6 md:p-16 rounded-[2.5rem] md:rounded-[3rem] bg-[#0a0a0a] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-6 md:mb-8 tracking-tighter text-white">
                                Análisis <br />
                                <span className="text-primary italic">De Tu Zona</span> <br />
                                Gratis
                            </h2>
                            <p className="text-white/60 text-lg md:text-xl font-bold mb-6 md:mb-8 uppercase italic leading-tight">
                                Te diré qué fallas estás cometiendo y cómo superar a tu competencia.
                            </p>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-[11px] md:text-sm">
                                    <CheckCircle className="w-4 h-4 md:w-5 h-5" /> Sin compromisos
                                </div>
                                <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-[11px] md:text-sm">
                                    <CheckCircle className="w-4 h-4 md:w-5 h-5" /> Datos 100% reales
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 bg-white/5 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10">
                            <h3 className="text-white text-lg md:text-xl font-black mb-4 md:mb-6 italic uppercase">Cuéntanos tu caso</h3>
                            <ContactForm source="Local SEO Page" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LocalSeo;

