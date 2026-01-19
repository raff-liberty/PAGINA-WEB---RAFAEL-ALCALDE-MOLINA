import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, ArrowRight, CheckCircle, AlertTriangle, Brain, ShieldCheck, Zap,
    XCircle, HelpCircle, Star, ChevronDown, Check, AlertCircle, Info,
    TrendingDown, Clock, UserMinus, DollarSign,
    Scissors, Sparkles, Stethoscope, Activity, Sun, GraduationCap,
    Dumbbell, Utensils, Layers, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase, Settings
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import { getSectorLandingContent } from '../data/sectorLandings';

const IconMap = {
    Scissors, Sparkles, Stethoscope, Activity, Brain, Sun, GraduationCap,
    Dumbbell, Utensils, Layers, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase, Settings
};

const SectorLocationPage_v2 = () => {
    let { sector: sectorSlug, location: locationSlug } = useParams();

    // Default to murcia if no location is provided (e.g. /peluquerias/)
    if (!locationSlug) locationSlug = 'murcia';

    const [sector, setSector] = useState(null);
    const [location, setLocation] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [strategicContent, setStrategicContent] = useState(null);

    // --- SMART DEFAULT GENERATOR ---
    // This is the magic sauce. If DB is empty, this builds a perfect landing page instantly.
    const generateDefaultContent = (sectorData, locationData) => {
        const sName = sectorData.name;
        const lName = locationData.name;
        const sNameLower = sName.toLowerCase().replace(/s$/, ''); // Singular-ish

        return {
            hero_title: `Automatización para ${sName} en ${lName}`,
            hero_subtitle: `Tu negocio de ${sNameLower} en ${lName} está perdiendo dinero cada vez que haces una tarea repetitiva. Lo solucionamos.`,
            meta_title: `${sName} en ${lName} | Automatización y Control | Engorilate`,
            meta_description: `¿Tienes un negocio de ${sNameLower} en ${lName}? Automatizamos tus ventas y operaciones para que dejes de apagar fuegos.`,

            // PROBLEM SECTION (The "Pain")
            problems: [
                {
                    title: "Caos Administrativo",
                    description: `En ${lName}, la competencia es feroz. Si sigues gestionando citas y facturas a mano, estás muerto.`,
                    icon: AlertTriangle
                },
                {
                    title: "Fugas de Clientes",
                    description: "El 60% de los leads se enfrían si no respondes en 5 minutos. Tu competencia ya usa bots.",
                    icon: XCircle
                },
                {
                    title: "Esclavitud Operativa",
                    description: "Si tu negocio depende de que tú estés presente para funcionar, no tienes un negocio, tienes un autoempleo.",
                    icon: Zap
                }
            ],

            // METHOD SECTION (The "Solution")
            method: [
                {
                    step: "01",
                    title: "Auditoría Radical",
                    desc: "Destripamos tus procesos actuales para ver dónde sangra el negocio.",
                    icon: Brain
                },
                {
                    step: "02",
                    title: "Automatización",
                    desc: "Implementamos n8n y herramientas No-Code para que los robots trabajen por ti.",
                    icon: Zap
                },
                {
                    step: "03",
                    title: "Control Total",
                    desc: "Te entregamos un Dashboard para que dirijas tu imperio desde el móvil.",
                    icon: ShieldCheck
                }
            ],

            // FAQ SECTION (Objection Handling)
            faqs: [
                {
                    q: `¿Esto funciona para ${sName} pequeños en ${lName}?`,
                    a: "Sí. De hecho, es más efectivo. Al tener menos burocracia, implementamos cambios en días que a las grandes les llevan meses."
                },
                {
                    q: "¿Es muy caro?",
                    a: "Caro es contratar a 3 personas para hacer lo que un sistema hace por 50€/mes. Esto no es un gasto, es una inversión con ROI brutal."
                },
                {
                    q: "¿Necesito saber de tecnología?",
                    a: "Cero. Nosotros somos los mecánicos. Tú solo conduces el coche."
                }
            ]
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Sector & Location concurrently
                const [sectorRes, locationRes] = await Promise.all([
                    supabase.from('sectors').select('*').eq('slug', sectorSlug).single(),
                    supabase.from('locations').select('*').eq('slug', locationSlug).single()
                ]);

                // --- SYNTHETIC ENTITIES STRATEGY ---
                // If they don't exist in DB, we manufacture them from the URL so the page NEVER breaks.

                let finalSector = sectorRes.data;
                let finalLocation = locationRes.data;

                if (!finalSector) {
                    console.warn(`Sector '${sectorSlug}' not found. Generating synthetic sector.`);
                    finalSector = {
                        name: sectorSlug.charAt(0).toUpperCase() + sectorSlug.slice(1).replace(/-/g, ' '),
                        slug: sectorSlug,
                        icon: "🚀" // Default icon
                    };
                }

                if (!finalLocation) {
                    console.warn(`Location '${locationSlug}' not found. Generating synthetic location.`);
                    finalLocation = {
                        name: locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1).replace(/-/g, ' '),
                        slug: locationSlug
                    };
                }

                setSector(finalSector);
                setLocation(finalLocation);

                // 2. Fetch Specific Page Content
                const contentKey = `${sectorSlug}-${locationSlug}`;
                const { data: contentData } = await supabase
                    .from('sector_location_content')
                    .select('*')
                    .eq('id', contentKey)
                    .single();

                // 3. Set Content (DB or Generator)
                // 3. Set Content (DB or Generator)
                if (contentData) {
                    setPageContent(contentData);
                } else {
                    console.log("⚡ Generating Smart Default Content...");
                    setPageContent(generateDefaultContent(finalSector, finalLocation));
                }

                // 4. Set Strategic Content from sectorLandings
                const sectorStrategicContent = getSectorLandingContent(sectorSlug);
                setStrategicContent(sectorStrategicContent);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Even on critical error, tries to survive if we have slugs
                if (sectorSlug && locationSlug) {
                    setSector({ name: sectorSlug, icon: '❓' });
                    setLocation({ name: locationSlug });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sectorSlug, locationSlug]);

    // Handle initial loading (Removed the strict redirect to allow synthetic)
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
                <div className="text-gray-500 font-mono tracking-widest text-sm animate-pulse">ANALIZANDO MERCADO...</div>
            </div>
        );
    }

    // Safety check just in case
    if (!sector || !location) return null;

    // --- RENDER ---
    return (
        <div className="relative pt-32 pb-24 min-h-screen bg-[#0a0a0a] overflow-x-hidden">
            <SEO
                title={pageContent.meta_title}
                description={pageContent.meta_description}
            />
            <BackgroundMesh />

            {/* HERO SECTION */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-8 backdrop-blur-md">
                    <MapPin className="w-3.5 h-3.5" />
                    {location.name} · {sector.name}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.9] mb-8 text-white tracking-tighter uppercase italic">
                            {strategicContent?.hero_phrase || pageContent.hero_title}
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl italic">
                            {pageContent.hero_subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-5 bg-primary text-black font-black uppercase italic text-sm rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(110,231,183,0.3)]">
                                Auditoría Gratuita <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="#reality" className="px-8 py-5 border border-white/10 text-white font-black uppercase italic text-sm rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center">
                                Ver la realidad
                            </a>
                        </div>
                    </div>

                    {/* Hero Visual/Card (Humanized) */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-[100px] rounded-full opacity-30"></div>
                        <div className="relative bg-[#0d0d0d] border-2 border-white/10 p-10 rounded-[2.5rem] shadow-2xl skew-y-1 hover:skew-y-0 transition-all duration-700 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                            <div className="flex items-center gap-5 mb-8 border-b border-white/5 pb-8">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center text-primary">
                                    {(() => {
                                        const IconComponent = IconMap[sector.icon] || Settings;
                                        return <IconComponent className="w-8 h-8" />;
                                    })()}
                                </div>
                                <div className="flex-grow">
                                    <div className="text-white font-black text-xl italic tracking-tighter uppercase">{sector.name}</div>
                                    <div className="text-red-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                        Fugas de rentabilidad detectadas
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Estrés Operativo</span>
                                        <span className="text-red-500 text-[10px] font-black italic">CRÍTICO</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "94%" }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                        <div className="text-white text-2xl font-black italic tracking-tighter">~35%</div>
                                        <div className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1">Margen perdido</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                        <div className="text-white text-2xl font-black italic tracking-tighter">+12h</div>
                                        <div className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1">Gestión manual / sem</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW: FALSAS CREENCIAS SECTION */}
            <section id="reality" className="max-w-7xl mx-auto px-6 mb-32">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
                        El espejismo de <br />
                        <span className="text-primary tracking-tighter uppercase italic">tu sector</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-light max-w-2xl border-l-2 border-white/10 pl-6 italic">
                        Lo que te han contado vs. la realidad de un negocio industrial y rentable.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {strategicContent?.falsas_creencias?.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 overflow-hidden hover:border-primary/40 transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Info className="w-12 h-12" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <XCircle className="w-3 h-3" /> Falsa Creencia
                                </div>
                                <h4 className="text-white text-xl font-black mb-6 italic tracking-tighter leading-tight">
                                    "{item.c}"
                                </h4>
                                <div className="h-px bg-white/10 mb-6" />
                                <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3" /> Realidad Industrial
                                </div>
                                <p className="text-gray-400 text-sm font-light leading-relaxed italic">
                                    {item.r}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* UPDATED: PROBLEMS SECTION (DOLORES REALES) */}
            <div id="problems" className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">
                        Dolores que te <br />
                        <span className="text-red-500">quitan el sueño</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light italic">
                        Si te sientes identificado con más de dos, tu negocio está en riesgo operativo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {strategicContent?.dolores_reales?.map((problem, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/[0.02] border border-white/5 hover:border-red-500/30 p-10 rounded-[2.5rem] group transition-all duration-500 flex flex-col md:flex-row gap-8 items-start"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform shrink-0 border border-red-500/10">
                                {idx === 0 ? <TrendingDown className="w-8 h-8" /> :
                                    idx === 1 ? <Clock className="w-8 h-8" /> :
                                        idx === 2 ? <UserMinus className="w-8 h-8" /> :
                                            <DollarSign className="w-8 h-8" />}
                            </div>
                            <div>
                                <h3 className="text-white text-2xl font-black mb-4 uppercase italic tracking-tighter leading-none">{problem.t}</h3>
                                <p className="text-gray-400 leading-relaxed text-base italic font-light">
                                    {problem.d}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* UPDATED: METHODOLOGIES (AUTORIDAD) */}
            <div className="bg-[#080808] py-32 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="mb-24 text-center">
                        <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">La Solución de Autoridad</span>
                        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 uppercase italic tracking-tighter">
                            {strategicContent?.autoridad.title || "Tu Nuevo Sistema Industrial"}
                        </h2>
                        <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto italic font-light">
                            {strategicContent?.autoridad.desc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {strategicContent?.autoridad?.bullets?.map((bullet, idx) => (
                            <div key={idx} className="bg-white/[0.03] border border-white/10 p-10 rounded-[2rem] text-center hover:border-primary/30 transition-all duration-500">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 mx-auto border border-primary/20">
                                    <Check className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{bullet}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-3xl mx-auto px-6 py-32">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    {(strategicContent?.faqs || pageContent.faqs || generateDefaultContent(sector, location).faqs).map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-2xl bg-[#111] overflow-hidden">
                            <button
                                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-white">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeAccordion === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeAccordion === idx && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="max-w-5xl mx-auto px-6 pb-20">
                <div className="relative bg-primary rounded-[3rem] p-12 md:p-24 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
                    <div className="relative z-10">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-black mb-8">
                            ¿Listo para recuperar tu vida?
                        </h2>
                        <p className="text-xl text-black/70 mb-12 max-w-2xl mx-auto font-medium">
                            Deja que los robots hagan el trabajo sucio. Tú dedícate a facturar y a vivir.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-black text-white font-bold text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-transform"
                        >
                            Empezar Ahora <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SectorLocationPage_v2;
