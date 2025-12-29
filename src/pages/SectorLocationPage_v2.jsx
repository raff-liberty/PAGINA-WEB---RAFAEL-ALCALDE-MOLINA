import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, AlertTriangle, Brain, ShieldCheck, Zap, XCircle, HelpCircle, Star, ChevronDown, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

const SectorLocationPage_v2 = () => {
    const { sector: sectorSlug, location: locationSlug } = useParams();
    const [sector, setSector] = useState(null);
    const [location, setLocation] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState(null);

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
                if (contentData) {
                    setPageContent(contentData);
                } else {
                    console.log("⚡ Generating Smart Default Content...");
                    setPageContent(generateDefaultContent(finalSector, finalLocation));
                }

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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                    <MapPin className="w-3.5 h-3.5" />
                    {location.name} · {sector.name}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8 text-white">
                            {pageContent.hero_title}
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl">
                            {pageContent.hero_subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                                Auditoría Gratuita <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href="#problems" className="px-8 py-4 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center">
                                Ver Problemas
                            </a>
                        </div>
                    </div>

                    {/* Hero Visual/Card */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-[100px] rounded-full opacity-30"></div>
                        <div className="relative bg-[#1a1a1a] border border-white/10 p-8 rounded-3xl shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                                    {sector.icon || "📊"}
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">{sector.name} Elite</div>
                                    <div className="text-green-400 text-sm font-mono flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        Sistemas Activos
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 font-mono text-sm text-gray-400">
                                <div className="flex justify-between">
                                    <span>Leads hoy:</span>
                                    <span className="text-white">14 (+120%)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tiempo ahorrado:</span>
                                    <span className="text-white">4h 20m</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tareas auto:</span>
                                    <span className="text-white">1,240</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden mt-4">
                                    <div className="h-full w-[85%] bg-primary shadow-[0_0_10px_#6ee7b7]"></div>
                                </div>
                                <div className="text-center text-xs opacity-50 pt-2">Eficiencia Operativa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROBLEMS SECTION */}
            <div id="problems" className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                        El coste del <span className="text-red-500">Caos</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Si no automatizas, estás perdiendo dinero por tres vías distintas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(pageContent.problems || generateDefaultContent(sector, location).problems).map((problem, idx) => {
                        const Icon = problem.icon || AlertTriangle;
                        return (
                            <div key={idx} className="bg-[#111] border border-red-500/10 hover:border-red-500/30 p-8 rounded-2xl group transition-all hover:-translate-y-2">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-white text-xl font-bold mb-4">{problem.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {problem.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* METHODOLOGIES (The 1-2-3) */}
            <div className="bg-[#111] py-32 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20">
                        <span className="text-primary font-mono text-sm tracking-widest uppercase">El Metodo Engorilate</span>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-4">
                            De Caos a <span className="text-primary">Imperio</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                        {(pageContent.method || generateDefaultContent(sector, location).method).map((step, idx) => {
                            const Icon = step.icon || CheckCircle;
                            return (
                                <div key={idx} className="relative z-10">
                                    <div className="w-24 h-24 bg-[#0a0a0a] border border-primary/30 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-8 mx-auto shadow-[0_0_30px_rgba(110,231,183,0.1)]">
                                        {idx + 1}
                                    </div>
                                    <div className="text-center px-4">
                                        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-3xl mx-auto px-6 py-32">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    {(pageContent.faqs || generateDefaultContent(sector, location).faqs).map((faq, idx) => (
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
