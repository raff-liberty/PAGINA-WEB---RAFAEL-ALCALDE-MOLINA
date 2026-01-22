import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp, Target, ArrowRight, Zap, Eye, MousePointer2, BarChart, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import BackgroundMesh from '../components/BackgroundMesh';

const LocalSeo = () => {
    const pillars = [
        {
            icon: MapPin,
            title: "Dominio de Google Maps",
            desc: "Hacemos que tu ficha sea la opción por la que Google más apuesta en tu ciudad."
        },
        {
            icon: Target,
            title: "Tráfico Directo",
            desc: "Ponemos tu negocio delante de quien ya está buscando tus servicios ahora mismo."
        },
        {
            icon: MousePointer2,
            title: "Ficha Optimizada",
            desc: "Convertimos tu perfil de Google en una herramienta que genera llamadas y visitas a diario."
        },
        {
            icon: BarChart,
            title: "Resultados Reales",
            desc: "Nada de humo. Verás exactamente cuántas llamadas y clientes nuevos te trae el sistema."
        }
    ];

    const faqs = [
        {
            q: "¿Cuándo empezaré a ver resultados?",
            a: "Los primeros cambios se notan en un par de semanas, pero para dominar tu zona por completo solemos trabajar entre 3 y 6 meses."
        },
        {
            q: "¿Me aseguras estar el primero?",
            a: "Nadie puede prometer el primer puesto de Google por escrito, pero lo que sí te garantizamos es una mejora radical y superar a tus competidores directos."
        },
        {
            q: "¿Sirve si tengo varios locales?",
            a: "Por supuesto. Adaptamos la estrategia para que cada uno de tus locales sea el líder en su barrio o zona de influencia."
        },
        {
            q: "¿Cómo sé si está funcionando?",
            a: "Te damos un acceso a un panel sencillo donde verás el aumento de llamadas y de personas que piden la ruta para llegar a tu local."
        }
    ];

    return (
        <div className="relative pt-32 md:pt-40 pb-20 min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black overflow-hidden">
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
                <div className="flex flex-col mb-16 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm self-center lg:self-start"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <span className="text-primary text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                                Visibilidad Radical en tu Ciudad
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white mb-8 uppercase italic pr-2"
                            >
                                DOMINA <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">TU CALLE.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed italic mb-10 border-l-2 lg:border-l-4 border-primary/40 pl-4 md:pl-6 mx-auto lg:mx-0"
                            >
                                Si no sales en los 3 primeros de <span className="text-white font-bold">Google Maps</span>, el cliente se va a tu competencia. Inyectamos tráfico de personas que ya están buscando lo que tú vendes.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link to="/contact" className="group/btn relative bg-primary hover:bg-white text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)] text-sm overflow-hidden inline-flex">
                                    <span className="relative z-10">ANALIZAR MI ZONA GRATIS</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-4 hidden lg:block">
                            <div className="bg-[#0a0a0a] border border-white/[0.15] rounded-[2.5rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] relative overflow-hidden group">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

                                <div className="relative z-10 space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white uppercase italic">LA REALIDAD:</h3>
                                    <p className="text-white/60 text-sm italic leading-relaxed">
                                        El 70% de las ventas locales se las llevan los 3 primeros negocios de Maps. Si no estás ahí, no existes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PILLARS - Mirroring Home Grids Style */}
                <div className="my-20">
                    <div className="mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white">
                            Los pilares de <br />
                            <span className="text-primary italic">tu visibilidad</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2rem] p-8 overflow-hidden hover:border-primary/60 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
                            >
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-700 mb-6">
                                    <p.icon className="w-6 h-6 text-white/40 group-hover:text-primary transition-all duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-4">{p.title}</h3>
                                <p className="text-white/80 text-base leading-relaxed font-medium italic">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* THE SYSTEM REASONING - COMPACT & CLEAR */}
                <div className="grid lg:grid-cols-2 gap-12 items-center my-20">
                    <div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight uppercase italic tracking-tighter text-white mb-6">
                            Guerra total <br />
                            <span className="text-primary italic">en el Mapa</span>.
                        </h2>
                        <div className="space-y-6">
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">Auditoría Express</h4>
                                        <p className="text-white/80 text-base leading-relaxed font-medium italic">Analizamos por qué tu competencia sale antes que tú y trazamos un plan para superarlos.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">Estrategia de Reseñas</h4>
                                        <p className="text-white/80 text-base leading-relaxed font-medium italic">No solo cantidad, sino calidad. Conseguimos que los mejores clientes te recomienden.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base mb-1 uppercase italic tracking-tighter">SEO Técnico</h4>
                                        <p className="text-white/80 text-base leading-relaxed font-medium italic">Optimizamos el código interno para que Google te valore como el líder de tu zona.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/[0.15] p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:border-primary/40 transition-all duration-700 group/results">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full group-hover/results:bg-primary/20 transition-all duration-700" />

                        <h3 className="relative z-10 text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-8">Impacto Visual</h3>

                        <div className="space-y-6">
                            {/* Comparison Example */}
                            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 bg-primary text-black text-[9px] font-black uppercase italic">Tú</div>
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <div className="text-white font-bold uppercase italic text-sm">ENGORILADOS LOCAL</div>
                                        <div className="flex text-yellow-500 text-[10px]">★★★★★ (100+)</div>
                                    </div>
                                    <div className="bg-primary text-black w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl italic">1º</div>
                                </div>
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl opacity-40 grayscale flex justify-between items-center">
                                <div className="h-4 bg-white/10 w-2/3 rounded" />
                                <div className="bg-white/10 w-10 h-10 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic text-white tracking-tighter">Dudas <span className="text-primary italic">y Respuestas</span></h2>
                </div>
                <div className="grid gap-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl font-bold text-white mb-4 uppercase italic tracking-tight">{faq.q}</h3>
                            <p className="text-gray-200 leading-relaxed font-medium italic text-base">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FINAL CTA: THE FORM */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <DiagnosisCTA className="mb-20" />

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center border border-white/10 p-8 md:p-16 rounded-[3rem] bg-[#0a0a0a] relative overflow-hidden shadow-2xl mb-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-8 tracking-tighter text-white">
                            Análisis <br />
                            <span className="text-primary italic">De Tu Zona</span> <br />
                            Gratis
                        </h2>
                        <p className="text-white/60 text-xl font-bold mb-8 uppercase italic leading-tight">
                            Te diré qué fallas estás cometiendo y cómo superar a tu competencia.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Sin compromisos
                            </div>
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Datos 100% reales
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                        <h3 className="text-white text-xl font-black mb-6 italic uppercase">Cuéntanos tu caso</h3>
                        <ContactForm source="Local SEO Page" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalSeo;
