import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp, Target, ArrowRight, Zap, Eye, MousePointer2, BarChart, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';

const LocalSeo = () => {
    const pillars = [
        {
            icon: MapPin,
            title: "Dominancia en Maps",
            desc: "No basta con 'estar'. Tienes que ser la opción por defecto en el Local Pack de Google."
        },
        {
            icon: Target,
            title: "Tráfico de Intención",
            desc: "Captamos a quien busca tu servicio CON la tarjeta en la mano. Leads calificados, no curiosos."
        },
        {
            icon: MousePointer2,
            title: "GMB de Élite",
            desc: "Optimizamos tu ficha para que cada reseña y cada foto trabaje como un comercial 24/7."
        },
        {
            icon: BarChart,
            title: "Métricas Reales",
            desc: "Informes de llamadas, clics y rutas. El SEO local se mide en facturación, no en humo."
        }
    ];

    const faqs = [
        {
            q: "¿Cuánto tiempo se tarda en ver resultados?",
            a: "La optimización inicial surte efecto en semanas. Sin embargo, la dominancia total de una zona competitiva suele requerir una estrategia sostenida de 3 a 6 meses."
        },
        {
            q: "¿Garantizáis el primer puesto?",
            a: "Google no permite garantizar posiciones. Lo que sí garantizamos es una mejora radical en tu visibilidad y superar a tus competidores actuales mediante técnicas de autoridad local."
        },
        {
            q: "¿Sirve si tengo varias sedes?",
            a: "Absolutamente. Diseñamos estrategias multi-ubicación para que cada una de tus sedes domine su radio de influencia específico."
        },
        {
            q: "¿Cómo sabemos si está funcionando?",
            a: "Te entregamos un panel donde verás el aumento real en llamadas, solicitudes de ruta y clics a tu web directamente desde Google Maps."
        }
    ];

    return (
        <div className="bg-[#0A0A0A] text-white min-h-screen pt-40 md:pt-56 pb-12 overflow-hidden selection:bg-primary selection:text-black">
            <SEO
                title="SEO Local: Domina Google Maps y Capta Clientes en tu Ciudad | Engorilate"
                description="Si no estás en los 3 primeros de Google Maps, le estás dando dinero a tu competencia. Estrategia de SEO Local agresiva para negocios que quieren crecer."
                keywords="seo local murcia, posicionamiento maps, google my business avanzado, captacion clientes locales"
            />

            {/* HERO: BRUTAL HONESTY */}
            <section className="relative px-6 py-12 max-w-7xl mx-auto overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-widest uppercase">
                            <Target className="w-3 h-3" /> Visibilidad Radical
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-black mb-8 leading-[0.8] italic uppercase tracking-tighter">
                            Si no te <span className="text-white/20">Ven</span> <br />
                            <span className="text-primary italic">No existes</span>.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light italic">
                            El 46% de las búsquedas en Google tienen intención local. Si no sales en el <span className="text-white border-b border-primary/50">Top 3 de Maps</span>, estás trabajando para tu competencia.
                        </p>
                        <Link to="/contact" className="bg-primary text-black font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform inline-flex items-center gap-4 shadow-[0_0_50px_rgba(110,231,183,0.3)] text-lg italic uppercase">
                            DOMINAR MI CÓDIGO POSTAL <ArrowRight className="w-8 h-8 text-black" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* STATS: THE HARSH REALITY */}
            <section className="px-6 py-12 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center uppercase italic font-display">
                    <div>
                        <div className="text-7xl font-black text-primary mb-2 tracking-tighter">70%</div>
                        <div className="text-xs text-gray-500 font-bold tracking-widest">De los clics van a los 3 primeros</div>
                    </div>
                    <div>
                        <div className="text-7xl font-black text-white/20 mb-2 tracking-tighter">0%</div>
                        <div className="text-xs text-gray-500 font-bold tracking-widest">De paciencia tiene tu cliente</div>
                    </div>
                    <div>
                        <div className="text-7xl font-black text-primary mb-2 tracking-tighter">24H</div>
                        <div className="text-xs text-gray-500 font-bold tracking-widest">Tu ficha vendiendo por ti</div>
                    </div>
                </div>
            </section>

            {/* VISUAL COMPARISON: MAPS DOMINATION */}
            <section className="px-6 py-16 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-black mb-8 leading-[0.85] uppercase italic tracking-tighter">
                            Guerra <br />
                            <span className="text-primary italic">En el Mapa</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            Analizamos a tus rivales, robamos sus mejores palabras clave y optimizamos tu ficha de Google My Business para que Google te quiera más a ti que a ellos.
                        </p>
                        <div className="space-y-6">
                            {[
                                "Auditoría de Ficha Express",
                                "Estrategia de Reseñas de Valor",
                                "SEO On-Page Localizado",
                                "Linkbuilding Geográfico"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-white font-bold italic uppercase tracking-wider">
                                    <CheckCircle className="w-6 h-6 text-primary" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-12 relative z-10 shadow-2xl">
                            <div className="h-4 bg-white/10 rounded w-1/4 mb-10" />
                            <div className="space-y-6">
                                {/* Our Client */}
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    whileInView={{ scale: 1.05, opacity: 1 }}
                                    className="p-6 bg-primary/20 border-2 border-primary rounded-2xl flex justify-between items-center relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 p-2 bg-primary text-black text-[10px] font-black uppercase italic">¡TU NEGOCIO!</div>
                                    <div>
                                        <h4 className="font-black text-white text-lg mb-1 uppercase italic tracking-tight">ENGORILADOS - LÍDER LOCAL</h4>
                                        <div className="flex text-yellow-500 gap-1 text-xs mb-1">★★★★★ (100+)</div>
                                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest italic">Primer Resultado</p>
                                    </div>
                                    <div className="bg-primary text-black w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl italic">1º</div>
                                </motion.div>
                                {/* Competitors */}
                                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center opacity-40 grayscale">
                                    <div className="h-10 bg-white/10 w-2/3 rounded" />
                                    <div className="bg-white/10 w-10 h-10 rounded-xl" />
                                </div>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center opacity-20 grayscale">
                                    <div className="h-10 bg-white/10 w-2/3 rounded" />
                                    <div className="bg-white/10 w-10 h-10 rounded-xl" />
                                </div>
                            </div>
                        </div>
                        {/* Glows */}
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* PILLARS GRID */}
            <section className="px-6 py-12 bg-[#111]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((p, i) => (
                        <div key={i} className="bg-black/40 p-10 rounded-3xl border border-white/5 hover:border-primary/20 transition-all text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-primary mb-8 mx-auto group-hover:bg-primary group-hover:text-black transition-all">
                                <p.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-display font-black mb-4 uppercase italic tracking-tighter">{p.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="px-6 py-12 bg-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic text-white">Preguntas <span className="text-primary italic">Frecuentes</span></h2>
                    </div>
                    <div className="grid gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4 uppercase italic tracking-tight">{faq.q}</h3>
                                <p className="text-gray-400 leading-relaxed font-light">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA: THE FORM */}
            <DiagnosisCTA className="mb-20" />
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center bg-gradient-to-br from-[#111] to-black border border-white/10 p-8 md:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase leading-none italic mb-8 tracking-tighter text-white">
                            Análisis <br />
                            <span className="text-primary italic">De Tu Zona</span> <br />
                            Gratis
                        </h2>
                        <p className="text-gray-400 text-xl font-bold mb-8 uppercase italic leading-tight opacity-80">
                            Analizamos tu zona y tu competencia. Te diré qué estás haciendo mal y cómo podemos superarlos.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Sin compromisos
                            </div>
                            <div className="flex items-center gap-3 text-primary font-bold italic uppercase tracking-wider text-sm">
                                <CheckCircle className="w-5 h-5" /> Estrategia personalizada
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10">
                        <h3 className="text-white text-xl font-black mb-6 italic uppercase">Solicitar mi auditoría</h3>
                        <ContactForm source="Local SEO Page" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LocalSeo;
