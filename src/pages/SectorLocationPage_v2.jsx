import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, ArrowRight, CheckCircle, AlertTriangle, Brain, ShieldCheck, Zap,
    XCircle, HelpCircle, Star, ChevronDown, Check, AlertCircle, Info,
    TrendingDown, Clock, UserMinus, DollarSign,
    Scissors, Sparkles, Stethoscope, Activity, Sun, GraduationCap,
    Dumbbell, Utensils, Layers, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase, Settings,
    Flame, Sword, Trophy
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import { getSectorLandingContent } from '../data/sectorLandings';
import { getHeroJourneyStories } from '../data/heroJourneyStories';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

const IconMap = {
    Scissors, Sparkles, Stethoscope, Activity, Brain, Sun, GraduationCap,
    Dumbbell, Utensils, Layers, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase, Settings
};

// Helper function to get YouTube URL based on sector's macrosegmento
const getYouTubeUrlForSector = (sectorSlug, siteConfig) => {
    // Map sector slugs to their macrosegmento YouTube URL field
    const sectorToYouTubeField = {
        // Peluquerías y Estética
        'peluquerias': 'youtube_peluquerias',
        'estetica': 'youtube_peluquerias',

        // Clínicas y Salud
        'clinicas': 'youtube_clinicas',
        'fisioterapia': 'youtube_clinicas',
        'psicologia': 'youtube_clinicas',
        'bienestar': 'youtube_clinicas',

        // Academias y Formación
        'academias': 'youtube_academias',
        'entrenadores': 'youtube_academias',

        // Hostelería y Restauración
        'restaurantes': 'youtube_hosteleria',
        'hosteleria-org': 'youtube_hosteleria',
        'cafeterias': 'youtube_hosteleria',
        'bares-aforo': 'youtube_hosteleria',

        // Servicios Técnicos
        'talleres': 'youtube_servicios_tecnicos',
        'servicios-tec': 'youtube_servicios_tecnicos',
        'instaladores': 'youtube_servicios_tecnicos',
        'mantenimiento': 'youtube_servicios_tecnicos',

        // Retail y Comercio
        'comercios': 'youtube_retail',
        'tiendas-esp': 'youtube_retail',
        'negocios-fisicos': 'youtube_retail',

        // Servicios Profesionales
        'agencias': 'youtube_servicios_profesionales',
        'estudios-diseno': 'youtube_servicios_profesionales',
        'arquitectos': 'youtube_servicios_profesionales',
        'interiorismo': 'youtube_servicios_profesionales',
        'consultores': 'youtube_servicios_profesionales'
    };

    const fieldName = sectorToYouTubeField[sectorSlug];
    return fieldName ? siteConfig[fieldName] : null;
};

const HeroJourney = ({ sectorSlug }) => {
    const stories = getHeroJourneyStories(sectorSlug);
    const [activeStory, setActiveStory] = useState(0);

    return (
        <div className="mb-32">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" /> Historias de Transformación
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase italic tracking-tighter">
                    <span className="text-gray-100">Del Caos a la</span> <span className="text-primary italic">Maestría Operativa</span>
                </h2>
                <p className="text-white text-xl md:text-2xl font-normal max-w-3xl mx-auto italic leading-relaxed">
                    Cinco historias reales (aunque con nombres cambiados) de cómo la automatización salvó negocios que estaban al borde del colapso.
                </p>
            </div>

            {/* Selector de historias */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {stories.map((story, idx) => (
                    <button
                        key={story.id}
                        onClick={() => setActiveStory(idx)}
                        className={`px-6 py-3 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 border uppercase italic tracking-tight ${activeStory === idx
                            ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(110,231,183,0.3)]'
                            : 'bg-white/5 text-gray-300 border-white/20 hover:border-primary/40 hover:text-white'
                            }`}
                    >
                        {story.title}
                    </button>
                ))}
            </div>

            {/* Caja del Viaje del Héroe - Horizontal scroll en móvil */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Desktop: Grid normal */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-8 p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] overflow-hidden">
                        {stories[activeStory].stages.map((stage, sIdx) => (
                            <div
                                key={sIdx}
                                className="relative bg-[#0a0a0a] p-10 md:p-12 h-full flex flex-col group border border-white/5"
                            >
                                {/* Connector line for desktop */}
                                {sIdx < 2 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-primary/30 to-transparent z-20"></div>
                                )}

                                <div className={`w-16 h-16 rounded-2xl ${stage.bg} ${stage.color} flex items-center justify-center mb-8 shadow-inner border ${stage.color.replace('text-', 'border-')}/20`}>
                                    <stage.icon className="w-8 h-8" />
                                </div>

                                <div className="mb-6">
                                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${stage.color}`}>
                                        Etapa 0{sIdx + 1}
                                    </span>
                                    <h3 className="text-3xl font-black text-white mt-2 uppercase italic tracking-tighter leading-tight">{stage.title}</h3>
                                </div>

                                <p className="text-gray-300 font-light leading-relaxed text-xl italic">
                                    {stage.text}
                                </p>

                                {/* Corner indicator */}
                                <div className={`absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity`}>
                                    <stage.icon className="w-16 h-16" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Horizontal scroll */}
                    <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
                        <div className="flex gap-6 pb-4">
                            {stories[activeStory].stages.map((stage, sIdx) => (
                                <div
                                    key={sIdx}
                                    className="relative bg-[#0a0a0a] p-8 min-w-[85vw] sm:min-w-[400px] flex flex-col border border-white/10 rounded-3xl snap-center"
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${stage.bg} ${stage.color} flex items-center justify-center mb-6 shadow-inner border ${stage.color.replace('text-', 'border-')}/20`}>
                                        <stage.icon className="w-8 h-8" />
                                    </div>

                                    <div className="mb-6">
                                        <span className={`text-xs font-black uppercase tracking-[0.2em] ${stage.color}`}>
                                            Etapa 0{sIdx + 1}
                                        </span>
                                        <h3 className="text-2xl font-black text-white mt-2 uppercase italic tracking-tighter leading-tight">{stage.title}</h3>
                                    </div>

                                    <p className="text-gray-300 font-normal leading-relaxed text-lg italic">
                                        {stage.text}
                                    </p>

                                    {/* Corner indicator */}
                                    <div className={`absolute bottom-6 right-6 opacity-5`}>
                                        <stage.icon className="w-12 h-12" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator for mobile */}
                    <div className="lg:hidden flex justify-center gap-2 mt-6">
                        {stories[activeStory].stages.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === 0 ? 'w-8 bg-primary' : 'w-1.5 bg-white/20'}`}></div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="mt-12 text-center">
                <p className="text-gray-300 font-mono text-sm uppercase tracking-widest">
                    Misión Actual: <span className="text-primary font-bold">{stories[activeStory].tag}</span>
                </p>
            </div>
        </div>
    );
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
    const [siteConfig, setSiteConfig] = useState({
        whatsapp_url: 'https://wa.me/34600000000',
        instagram_url: 'https://instagram.com/engorilate',
        linkedin_url: 'https://linkedin.com/in/engorilate',
        contact_email: 'r.alcalde@engorilate.com'
    });
    const [loadTimestamp] = useState(Date.now());
    const [hpot, setHpot] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    // --- SMART DEFAULT GENERATOR ---
    // This is the magic sauce. If DB is empty, this builds a perfect landing page instantly.
    const generateDefaultContent = (sectorData, locationData) => {
        const sName = sectorData.name;
        const lName = locationData.name;
        const sNameLower = sName.toLowerCase().replace(/s$/, ''); // Singular-ish

        // Localized phrases for different cities
        const localContext = {
            'murcia': 'en la capital del Segura',
            'cartagena': 'en la ciudad portuaria',
            'lorca': 'en la ciudad del sol',
            'molina-de-segura': 'en la vega del Segura',
            'alcantarilla': 'en el corazón industrial',
            'mazarron': 'en la costa mazarronera',
            'totana': 'bajo Sierra Espuña'
        };

        const contextPhrase = localContext[locationData.slug] || `en ${lName}`;

        return {
            hero_title: `Automatización para ${sName} en ${lName}`,
            hero_subtitle: `Tu negocio de ${sNameLower} ${contextPhrase} está perdiendo dinero cada vez que haces una tarea repetitiva. Profesionalizamos tu operativa.`,
            meta_title: `${sName} en ${lName} | Expertos en Automatización`,
            meta_description: `¿Buscas automatizar tu ${sNameLower} en ${lName}? Ayudamos a pymes de la zona de ${lName} a eliminar el caos operativo y recuperar su tiempo con tecnología.`,

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
                // 1. Fetch Sector, Location & Site Config concurrently
                const [sectorRes, locationRes, configRes] = await Promise.all([
                    supabase.from('sectors').select('*').eq('slug', sectorSlug).single(),
                    supabase.from('locations').select('*').eq('slug', locationSlug).single(),
                    supabase.from('site_config').select('key, value')
                ]);

                // Process site config
                if (configRes.data) {
                    const config = {};
                    configRes.data.forEach(item => { config[item.key] = item.value || ''; });
                    setSiteConfig(prev => ({ ...prev, ...config }));
                }

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

    // Get YouTube URL for this sector's macrosegmento
    const youtubeUrl = getYouTubeUrlForSector(sector.slug, siteConfig);

    const handleFormSubmit = async (e) => {
        // 1. Anti-spam: Honeypot check
        if (hpot) {
            e.preventDefault();
            console.warn('Spam detected: Honeypot filled');
            setFormSubmitted(true);
            return;
        }

        // 2. Anti-spam: Timing check
        const timeDiff = Date.now() - loadTimestamp;
        if (timeDiff < 4000) {
            e.preventDefault();
            console.warn('Spam detected: Submission too fast');
            setFormSubmitted(true);
            return;
        }

        // 3. Anti-spam: Phone validation (finding phone input by name in the form)
        const formData = new FormData(e.target);
        const phone = formData.get('phone') || '';
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length > 0 && phoneDigits.length < 5) {
            e.preventDefault();
            alert('Por favor, introduce un número de teléfono válido.');
            return;
        }

        // Let it proceed to Formspree if everything is okay
    };

    if (formSubmitted) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">¡Mensaje Recibido!</h2>
                <p className="text-gray-400 max-w-md mx-auto">He recibido tu solicitud. Te contactaré en las próximas horas para agendar tu diagnóstico.</p>
                <button onClick={() => window.location.reload()} className="mt-8 text-primary hover:underline">Volver</button>
            </div>
        );
    }

    // --- RENDER ---
    return (
        <div className="relative pt-32 pb-24 min-h-screen bg-[#0a0a0a] overflow-x-hidden">
            <BackgroundMesh />

            {/* BREADCRUMBS SCHEMA */}
            <SEO
                title={pageContent.meta_title}
                description={pageContent.meta_description}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://engorilate.com/" },
                        { "@type": "ListItem", "position": 2, "name": "Sectores", "item": "https://engorilate.com/sectores" },
                        { "@type": "ListItem", "position": 3, "name": sector.name, "item": `https://engorilate.com/sectores#${sector.id}` },
                        { "@type": "ListItem", "position": 4, "name": location.name, "item": `https://engorilate.com/${sector.slug}/${location.slug}` }
                    ]
                }}
            />

            {/* BREADCRUMBS UI */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8 mt-8">
                <nav className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
                    <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <HomeIcon className="w-3 h-3" /> Inicio
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link to="/sectores" className="hover:text-primary transition-colors">Sectores</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white/60">{sector.name}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">{location.name}</span>
                </nav>
            </div>

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
                        <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-xl italic">
                            {pageContent.hero_subtitle}
                        </p>

                        {/* YouTube Video Embed - Mobile Only (above buttons) */}
                        <div className="relative lg:hidden mb-8">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-[100px] rounded-full opacity-30"></div>
                            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white/10">
                                {youtubeUrl ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${youtubeUrl.includes('watch?v=')
                                            ? youtubeUrl.split('watch?v=')[1].split('&')[0]
                                            : youtubeUrl.split('/').pop()}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&quality=hd1080`}
                                        title="Video de transformación"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full bg-black/30 flex items-center justify-center text-gray-500 text-sm">
                                        <p>Video no configurado para este sector</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-5 bg-primary text-black font-black uppercase italic text-sm rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(110,231,183,0.3)]">
                                Auditoría Gratuita <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* YouTube Video Embed - Desktop Only (right side) */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-[100px] rounded-full opacity-30"></div>
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/10">
                            {youtubeUrl ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${youtubeUrl.includes('watch?v=')
                                        ? youtubeUrl.split('watch?v=')[1].split('&')[0]
                                        : youtubeUrl.split('/').pop()}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&quality=hd1080`}
                                    title="Video de transformación"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full h-full bg-black/30 flex items-center justify-center text-gray-500 text-sm">
                                    <p>Video no configurado para este sector</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* HERO'S JOURNEY TRANSFORMATION STORIES */}
            <div className="max-w-7xl mx-auto px-6 mb-32">
                <HeroJourney sectorSlug={sector.slug} />
            </div>


            {/* UPDATED: PROBLEMS SECTION (DOLORES REALES) */}
            <div id="problems" className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">
                        Dolores que te <br />
                        <span className="text-red-500">quitan el sueño</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light italic">
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
                                <p className="text-gray-300 leading-relaxed text-base italic font-light">
                                    {problem.d}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* UPDATED: LA SOLUCIÓN COMPLETA - 4 Service Blocks */}
            <div className="bg-[#080808] py-32 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="mb-24 text-center">
                        <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">La Solución Completa</span>
                        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 uppercase italic tracking-tighter">
                            No vendemos <span className="text-primary">herramientas</span>.<br />
                            Construimos <span className="text-primary">sistemas completos</span>.
                        </h2>
                        <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto font-normal leading-relaxed">
                            Cuatro pilares que transforman tu negocio de {sector.name.toLowerCase()} en {location.name} en una máquina de generar ingresos predecibles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bloque 1: Captación */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 p-10 rounded-[2rem] hover:border-primary/30 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                <Rocket className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                                Captar Clientes<br />Mientras Duermes
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Lead magnets que convierten visitantes en clientes potenciales. Formularios inteligentes que cualifican automáticamente. Seguimiento que nunca olvida un prospecto.
                            </p>
                        </div>

                        {/* Bloque 2: Gestión Operativa */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 p-10 rounded-[2rem] hover:border-primary/30 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                <Settings className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                                Operaciones que<br />se Gestionan Solas
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Agendas automáticas que eliminan el teléfono. Recordatorios que reducen ausencias a cero. Gestión de recursos sin hojas de cálculo.
                            </p>
                        </div>

                        {/* Bloque 3: Facturación */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 p-10 rounded-[2rem] hover:border-primary/30 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                <DollarSign className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                                Cobra sin<br />Perseguir a Nadie
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Presupuestos generados en segundos. Facturas que se envían solas. Cobros automáticos y recordatorios inteligentes de pago.
                            </p>
                        </div>

                        {/* Bloque 4: Fidelización */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 p-10 rounded-[2rem] hover:border-primary/30 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                <Star className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                                Clientes que<br />Vuelven Solos
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Campañas de reactivación automáticas. Programas de fidelización que funcionan. Análisis que te dicen qué hacer antes de que lo pienses.
                            </p>
                        </div>
                    </div>

                    {/* CTA Final */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-black uppercase italic text-base rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(110,231,183,0.4)] group"
                        >
                            ¿Quieres ver cómo funciona en tu sector?
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>


            {/* PREMIUM FAQ & CONTACT SECTION */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

                        {/* FAQ Side */}
                        <div className="space-y-12">
                            <div>
                                <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Resolviendo Dudas</span>
                                <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                                    Preguntas <br />
                                    <span className="text-primary">Frecuentes</span>
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {(strategicContent?.faqs || pageContent.faqs || generateDefaultContent(sector, location).faqs).map((faq, idx) => (
                                    <div
                                        key={idx}
                                        className={`group border rounded-3xl transition-all duration-500 overflow-hidden ${activeAccordion === idx
                                            ? 'bg-white/[0.03] border-primary/30 shadow-[0_0_30px_rgba(110,231,183,0.05)]'
                                            : 'bg-transparent border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-7 text-left transition-colors"
                                        >
                                            <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${activeAccordion === idx ? 'text-primary' : 'text-white group-hover:text-gray-200'
                                                }`}>
                                                {faq.q}
                                            </span>
                                            <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${activeAccordion === idx
                                                ? 'bg-primary border-primary text-black rotate-180'
                                                : 'border-white/10 text-white group-hover:border-primary/50'
                                                }`}>
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </button>
                                        <AnimatePresence>
                                            {activeAccordion === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: "circOut" }}
                                                >
                                                    <div className="px-7 pb-7 text-gray-300 leading-relaxed text-lg font-light italic border-t border-white/5 pt-4">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form Side */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

                                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32" />

                                    <div className="relative z-10">
                                        <div className="mb-10 text-center lg:text-left">
                                            <h3 className="font-display text-3xl md:text-4xl font-black text-white mb-4 uppercase italic tracking-tighter leading-tight">
                                                ¿Listo para <br />
                                                <span className="text-primary tracking-tighter">recuperar tu vida</span>?
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed text-lg font-light italic">
                                                Deja que los robots hagan el trabajo sucio. Tú dedícate a facturar y a vivir.
                                            </p>
                                        </div>

                                        {/* Contact Form */}
                                        <form
                                            action="https://formspree.io/f/xwpkqbvz"
                                            method="POST"
                                            onSubmit={handleFormSubmit}
                                            className="space-y-6"
                                        >
                                            <input type="hidden" name="_subject" value={`Contacto desde ${sector.name} en ${location.name}`} />
                                            <input type="hidden" name="sector" value={sector.name} />
                                            <input type="hidden" name="location" value={location.name} />

                                            {/* Honeypot field */}
                                            <div className="hidden pointer-events-none opacity-0 h-0 overflow-hidden" aria-hidden="true">
                                                <input
                                                    type="text"
                                                    name="_gotcha"
                                                    tabIndex="-1"
                                                    autoComplete="off"
                                                    value={hpot}
                                                    onChange={(e) => setHpot(e.target.value)}
                                                    placeholder="Dejar en blanco"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="w-full px-5 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm shadow-inner"
                                                    placeholder="Nombre completo *"
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    className="w-full px-5 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm shadow-inner"
                                                    placeholder="Email corporativo *"
                                                />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    className="w-full px-5 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-sm shadow-inner"
                                                    placeholder="WhatsApp *"
                                                />
                                                <textarea
                                                    name="message"
                                                    required
                                                    rows="3"
                                                    className="w-full px-5 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all resize-none text-sm shadow-inner"
                                                    placeholder="¿Qué procesos quieres automatizar? *"
                                                ></textarea>
                                            </div>

                                            <div className="flex items-start gap-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    id="privacy"
                                                    name="privacy"
                                                    required
                                                    className="mt-1.5 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20 accent-primary"
                                                />
                                                <label htmlFor="privacy" className="text-xs text-gray-500 leading-relaxed font-medium">
                                                    He leído y acepto la <a href="/privacidad" target="_blank" className="text-primary hover:underline transition-colors">política de privacidad</a>.
                                                </label>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full relative group/btn overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                                                <div className="relative flex items-center justify-center gap-3 bg-primary group-hover:bg-transparent text-black font-black uppercase italic text-base px-8 py-5 rounded-2xl transition-all duration-500 border-2 border-primary">
                                                    Solicitar Diagnóstico
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </button>

                                            <div className="flex items-center justify-center gap-6 pt-8 mt-8 border-t border-white/5">
                                                <a href={siteConfig.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all hover:scale-110">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                </a>
                                                <a href={siteConfig.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all hover:scale-110">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                                </a>
                                                <a href={siteConfig.whatsapp_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all hover:scale-110">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SectorLocationPage_v2;
