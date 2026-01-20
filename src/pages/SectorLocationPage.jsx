import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, AlertTriangle, Brain, ShieldCheck, Zap, XCircle, HelpCircle, Flame, Sword, Trophy, Sparkles, User, Info } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

const HeroJourney = () => {
    const stories = [
        {
            id: 'burnout',
            title: "El Esclavo del Tinte",
            tag: "GESTIÓN DE TIEMPO",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Atado al móvil mientras aplicaba un tinte. Un mensaje de WhatsApp mal leído. Una cita solapada. El estrés de no saber si hoy comería a su hora por el caos de la agenda.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Engorilate entró en la peluquería. No traía tijeras, traía lógica. El móvil se guardó en el cajón. Las citas empezaron a entrar solas, filtradas por un motor que no duerme.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Hoy, corta el pelo con música de fondo. Su única preocupación es el degradado perfecto. Su tiempo vuelve a ser suyo. El negocio factura más, trabajando él menos.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'ghost',
            title: "El Fantasma de los Sábados",
            tag: "ANTI-PLANTONES",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Sábado, 11:00 AM. Una mañana perdida. El cliente 'VIP' que nunca llegó. 50€ menos en caja. La impotencia de mirar una silla vacía mientras fuera llueven peticiones de cita.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Inyectamos el blindaje anti-plantones. El sistema exige compromiso: si no hay señal, no hay silla. Si no confirman, el hueco se subasta al siguiente de la lista automáticamente.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ya no hay sillas vacías por descuido. Solo clientes que valoran cada minuto del profesional. La caja cuadra al céntimo antes de abrir la puerta cada mañana.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'stock',
            title: "El Alquimista Ciego",
            tag: "CONTROL DE STOCK",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Abrió el armario y el bote estaba vacío. No había tinte #5. Tuvo que improvisar una mezcla que no era la suya. El miedo a perder la confianza del cliente por falta de previsión.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Digitalizamos cada gota. El sistema predice el gasto basado en servicios reales. El pedido al proveedor se genera solo antes de que el estante se quede vacío.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Control total. Nunca falta, nunca sobra. El margen de beneficios subió un 12% solo por eliminar el desperdicio y las compras de pánico de última hora.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'tech',
            title: "El Muro de Cristal",
            tag: "DIGITALIZACIÓN",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Creyó que la tecnología era para 'grandes cadenas'. Que su libreta azul era sagrada. Hasta que la libreta se mojó y los nombres se borraron. El pánico de perder 10 años de contactos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "No le obligamos a programar. Le entregamos un tablero de mando humano. Tan simple como pulsar un icono. Tan potente como un ejército de secretarias trabajando 24/7.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ahora su Peluquería es el referente tecnológico del barrio. No volvió a comprar una libreta. Su mente está libre para crear, no para recordar nombres y horas.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'empire',
            title: "El Imperio de la Calma",
            tag: "ESCALABILIDAD",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Tenía 3 locales y 3 mil problemas. Cada día era un incendio que apagar. Estaba a punto de cerrar uno por puro agotamiento mental y falta de control real.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Centralizamos la inteligencia. Reglas de oro aplicadas a cada local por igual. Paneles de control que le dicen la verdad del negocio desde su propia casa.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Hoy factura el triple con la mitad de personal de gestión. Está buscando local para el cuarto negocio. Dejó de ser el bombero para ser el arquitecto de su empresa.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ];

    const [activeStory, setActiveStory] = useState(0);

    return (
        <div className="mb-32">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" /> Historias de Transformación
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                    Del Caos a la <span className="text-primary italic">Maestría Operativa</span>
                </h2>
                <p className="text-gray-400 text-xl font-light max-w-3xl mx-auto">
                    Cinco historias reales (aunque con nombres cambiados) de cómo la automatización salvó negocios que estaban al borde del colapso.
                </p>
            </div>

            {/* Selector de historias */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {stories.map((story, idx) => (
                    <button
                        key={story.id}
                        onClick={() => setActiveStory(idx)}
                        className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${activeStory === idx
                            ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(110,231,183,0.3)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-primary/40'
                            }`}
                    >
                        {story.title}
                    </button>
                ))}
            </div>

            {/* Caja del Viaje del Héroe */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] overflow-hidden"
                >
                    {stories[activeStory].stages.map((stage, sIdx) => (
                        <div
                            key={sIdx}
                            className="relative bg-[#0a0a0a] p-10 md:p-12 h-full flex flex-col group"
                        >
                            {/* Connector line for desktop */}
                            {sIdx < 2 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-primary/30 to-transparent z-20"></div>
                            )}

                            <div className={`w-14 h-14 rounded-2xl ${stage.bg} ${stage.color} flex items-center justify-center mb-8 shadow-inner`}>
                                <stage.icon className="w-7 h-7" />
                            </div>

                            <div className="mb-4">
                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${stage.color}`}>
                                    Etapa 0{sIdx + 1}
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1">{stage.title}</h3>
                            </div>

                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                {stage.text}
                            </p>

                            {/* Corner indicator */}
                            <div className={`absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity`}>
                                <stage.icon className="w-16 h-16" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <div className="mt-12 text-center">
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                    Misión Actual: <span className="text-primary">{stories[activeStory].tag}</span>
                </p>
            </div>
        </div>
    );
};

const SectorLocationPage = () => {
    const { sector: sectorSlug, location: locationSlug } = useParams();
    const [sector, setSector] = useState(null);
    const [location, setLocation] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch sector
                const { data: sectorData } = await supabase
                    .from('sectors')
                    .select('*')
                    .eq('slug', sectorSlug)
                    .single();

                // Fetch location
                const { data: locationData } = await supabase
                    .from('locations')
                    .select('*')
                    .eq('slug', locationSlug)
                    .single();

                if (!sectorData || !locationData) {
                    setLoading(false);
                    return;
                }

                setSector(sectorData);
                setLocation(locationData);

                // Fetch content
                const contentKey = `${sectorSlug}-${locationSlug}`;
                const { data: contentData } = await supabase
                    .from('sector_location_content')
                    .select('*')
                    .eq('id', contentKey)
                    .single();

                if (contentData) {
                    // Check if landing is active
                    if (contentData.is_active === false) {
                        setLoading(false);
                        return; // Will trigger 404 redirect below
                    }
                    setPageContent(contentData);
                } else {
                    // Fallback content strategy
                    setPageContent({
                        hero_title: `Automatización para ${sectorData.name} en ${locationData.name}`,
                        hero_subtitle: `Optimizamos la operativa de tu ${sectorData.name.toLowerCase().replace(/s$/, '')} en ${locationData.name} para que dejes de perder tiempo en tareas manuales.`,
                        problems: [
                            { title: "Caos en la gestión", description: `Tu ${sectorData.name.toLowerCase().replace(/s$/, '')} en ${locationData.name} pierde clientes por no tener procesos claros.` },
                            { title: "Fugas de dinero", description: "Tareas que podrías automatizar te están robando horas de facturación real." }
                        ],
                        solutions: [
                            { title: "Sistemas Inteligentes", description: "Configuramos herramientas que trabajan por ti.", benefit: "Recupera tu tiempo" },
                            { title: "Control Total", description: "Mide lo que pasa en tu negocio sin estar físicamente ahí.", benefit: "Escalabilidad real" }
                        ],
                        local_context: `${locationData.name} es un mercado competitivo. Los negocios de ${sectorData.name.toLowerCase()} que no se digitalizan hoy, se quedan atrás mañana.`,
                        meta_title: `${sectorData.name} en ${locationData.name} | Automatización y Control | Engorilate`,
                        meta_description: `¿Tienes ${sectorData.name.toLowerCase()} en ${locationData.name}? Eliminamos el caos operativo y automatizamos tus procesos para que recuperes el control de tu negocio.`
                    });
                }

            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sectorSlug, locationSlug]);

    // Redirect if core data is missing OR if landing is inactive
    if (!loading && (!sector || !location || !pageContent)) {
        return <Navigate to="/404" replace />;
    }

    // Build schema and SEO props
    const schemaData = (pageContent && location && sector) ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Engorilate - ${sector.name} en ${location.name}`,
        "description": pageContent.meta_description,
        "url": window.location.href,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": location.name,
            "addressRegion": "Murcia",
            "addressCountry": "ES"
        },
        "service": {
            "@type": "Service",
            "serviceType": `Automatización para ${sector.name}`,
            "areaServed": location.name
        }
    } : null;

    const seoTitle = (pageContent && sector && location)
        ? (pageContent.meta_title || `${sector.name} en ${location.name} | Engorilate`)
        : 'Automatización de Negocios | Engorilate';

    const seoDescription = (pageContent)
        ? (pageContent.meta_description || pageContent.metaDescription)
        : '';

    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            {pageContent && (
                <SEO
                    title={seoTitle}
                    description={seoDescription}
                    schema={schemaData}
                />
            )}
            <BackgroundMesh />

            {/* Hero Section */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-mono text-sm animate-pulse tracking-widest">CARGANDO PÁGINA...</p>
                </div>
            ) : (
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 text-sm">
                        <ol className="flex items-center gap-2 text-gray-500">
                            <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                            <li>/</li>
                            <li><Link to="/sectores" className="hover:text-primary transition-colors">Sectores</Link></li>
                            <li>/</li>
                            <li className="text-primary">{sector.name} en {location.name}</li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <div className="mb-20 max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(110,231,183,0.1)]">
                                <MapPin className="w-3.5 h-3.5" />
                                {location.name}
                            </div>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-4xl shadow-xl">{sector.icon}</div>
                        </div>
                        <h1 className="font-display text-4xl md:text-7xl font-bold leading-tight mb-8 text-white text-balance">
                            {pageContent.hero_title || pageContent.hero?.title}
                        </h1>
                        <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                            {pageContent.hero_subtitle || pageContent.hero?.subtitle}
                        </p>
                    </div>

                    {/* Critical Scenarios Section */}
                    <div className="mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                            <AlertTriangle className="w-3 h-3" /> Realidad en {location.name}
                        </div>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-10">
                            Escenarios críticos que <span className="text-primary italic">frenan tu negocio</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(pageContent.problems || []).map((problem, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02, translateY: -5 }}
                                    className="bg-[#1a1a1a] border border-white/10 p-8 rounded-3xl relative overflow-hidden group shadow-2xl transition-all duration-300"
                                >
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                                    <div className="text-primary/40 mb-6 font-mono text-sm tracking-tighter">CASO_SECTOR_{String(idx + 1).padStart(2, '0')}</div>
                                    <h3 className="text-white text-xl font-bold mb-4">{problem.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-light mb-6">{problem.description}</p>
                                    <div className="flex items-center gap-2 text-red-500/80 text-[10px] font-bold uppercase tracking-widest">
                                        <XCircle className="w-3.5 h-3.5" /> Fuga operativa detectada
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Epic Hero's Journey Section */}
                    {sector && sector.slug === 'peluquerias' && <HeroJourney />}

                    {/* The Engorilate Methodology Redesign */}
                    <div className="relative mb-32 overflow-hidden rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-10 md:p-24 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                        {/* Background decoration */}
                        <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-primary/10 blur-[180px] rounded-full opacity-60"></div>
                        <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-primary/5 blur-[180px] rounded-full opacity-40"></div>

                        <div className="relative z-10 text-center max-w-4xl mx-auto mb-20">
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-10">
                                Tu {sector.name.toLowerCase().replace(/s$/, '')} en <span className="text-primary italic">Piloto Automático</span>
                            </h2>
                            <p className="text-gray-400 text-xl font-light leading-relaxed">
                                No instalamos parches. Construimos el <strong className="text-white">Motor de Gestión</strong> que permite que tu {sector.name.toLowerCase().replace(/s$/, '')} facture mientras tú recuperas tu vida.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                            {[
                                {
                                    title: "Auditoría de Procesos",
                                    desc: `Analizamos paso a paso cómo entra un cliente en tu ${sector.name.toLowerCase().replace(/s$/, '')} y dónde se pierde el rastro de la información.`,
                                    benefit: "Claridad Total",
                                    icon: Brain,
                                    color: "text-blue-400"
                                },
                                {
                                    title: "Blindaje de Reglas",
                                    desc: "Definimos protocolos automáticos: avisos de cita, reclamación de pagos y altas de clientes. Sin errores humanos.",
                                    benefit: "Cero Fallos",
                                    icon: ShieldCheck,
                                    color: "text-primary"
                                },
                                {
                                    title: "Escalado Inteligente",
                                    desc: "Dejamos operativas las herramientas (CRM, WhatsApp, n8n) para que el negocio crezca sin que tú trabajes más horas.",
                                    benefit: "Libertad Real",
                                    icon: Zap,
                                    color: "text-yellow-400"
                                }
                            ].map((step, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:border-primary/40 transition-all group relative overflow-hidden backdrop-blur-sm">
                                    <div className={`w-16 h-16 rounded-[1.25rem] bg-white/5 flex items-center justify-center mb-8 ${step.color} group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-lg`}>
                                        <step.icon className="w-9 h-9" />
                                    </div>
                                    <div className="absolute top-8 right-10 px-4 py-1 rounded-full bg-white/5 text-[10px] font-bold text-primary/60 uppercase tracking-widest border border-primary/10">
                                        {step.benefit}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 text-center relative z-10 max-w-2xl mx-auto">
                            <div className="mb-10 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest font-bold">Solución Estructural</p>
                                <h4 className="text-white text-xl font-bold mb-4">
                                    Este sector pertenece al modelo de <span className="text-primary tracking-tight">Negocio basado en {sector.name.includes('Peluquerías') || sector.name.includes('Clínicas') || sector.name.includes('Tatuajes') ? 'Citas y Agenda' : sector.name.includes('Restaurantes') ? 'Atención Presencial' : sector.name.includes('Talleres') ? 'Servicios Técnicos' : sector.name.includes('Agencias') ? 'Proyectos' : 'Venta de Producto'}</span>.
                                </h4>
                                <Link
                                    to={`/segmentos/${sector.slug === 'peluquerias' || sector.slug === 'clinicas' || sector.slug === 'tatuajes' ? 'citas-agenda' : sector.slug === 'restaurantes' ? 'atencion-presencial' : sector.slug === 'talleres' ? 'servicios-tecnicos' : sector.slug === 'agencias' ? 'servicios-profesionales' : 'venta-producto'}`}
                                    className="text-primary hover:text-white transition-colors inline-flex items-center gap-2 font-bold"
                                >
                                    Descubre por qué tu problema es estructural →
                                </Link>
                            </div>

                            <Link
                                to="/contact"
                                className="group relative inline-flex items-center gap-4 bg-primary text-black font-bold text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-all shadow-[0_15px_40px_rgba(110,231,183,0.4)]"
                            >
                                <span>Pedir Diagnóstico de {sector.name}</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="mt-8 text-white/40 text-sm italic">"El mejor momento para automatizar fue ayer. El segundo mejor es hoy."</p>
                        </div>
                    </div>

                    {/* Local Context Brief */}
                    <div className="max-w-4xl mb-32">
                        <div className="flex items-center gap-4 mb-8">
                            <HelpCircle className="w-8 h-8 text-primary/50" />
                            <h3 className="font-display text-3xl font-bold text-white">
                                ¿Por qué esto es vital en {location.name}?
                            </h3>
                        </div>
                        <p className="text-gray-400 text-xl font-light leading-relaxed border-l-2 border-primary/20 pl-8 italic">
                            {pageContent.local_context || pageContent.localContext}
                        </p>
                    </div>

                    {/* Related Links */}
                    <div className="mb-20">
                        <h3 className="font-display text-2xl font-bold text-white mb-6">
                            También trabajamos con
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Otros sectores en {location.name}</h4>
                                <div className="flex flex-col gap-2">
                                    {(pageContent.related_sectors || pageContent.relatedSectors || []).map((relatedSlug) => {
                                        const rSectorSlug = relatedSlug.replace(`-${locationSlug}`, '');
                                        return (
                                            <Link
                                                key={relatedSlug}
                                                to={`/${rSectorSlug}/${locationSlug}`}
                                                className="text-gray-400 hover:text-primary transition-colors text-sm"
                                            >
                                                → {rSectorSlug.charAt(0).toUpperCase() + rSectorSlug.slice(1).replace(/-/g, ' ')} en {location.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">{sector.name} en otras localidades</h4>
                                <div className="flex flex-col gap-2">
                                    {(pageContent.related_locations || pageContent.relatedLocations || []).map((relatedSlug) => {
                                        const rLocationSlug = relatedSlug.replace(`${sectorSlug}-`, '');
                                        const locName = rLocationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                                        return (
                                            <Link
                                                key={relatedSlug}
                                                to={`/${sectorSlug}/${rLocationSlug}`}
                                                className="text-gray-400 hover:text-primary transition-colors text-sm"
                                            >
                                                → {sector.name} en {locName}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Bottom with Contact Form */}
                    <div className="relative bg-gradient-to-br from-[#222222] to-[#111111] border border-white/20 p-12 md:p-20 rounded-[3rem] overflow-hidden shadow-3xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 text-center">
                                ¿Hablamos sobre tu <span className="text-primary">{sector.name.toLowerCase().replace(/s$/, '')}</span> en {location.name}?
                            </h3>
                            <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light text-center">
                                Si estás cansado de que el día a día te coma y quieres que tu negocio empiece a trabajar para ti, déjanos tus datos.
                            </p>

                            {/* Contact Form */}
                            <form
                                action="https://formspree.io/f/xwpkqbvz"
                                method="POST"
                                className="space-y-6 mb-12"
                            >
                                <input type="hidden" name="_subject" value={`Contacto desde ${sector.name} en ${location.name}`} />
                                <input type="hidden" name="sector" value={sector.name} />
                                <input type="hidden" name="location" value={location.name} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-primary mb-2">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-primary mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-primary mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="+34 600 000 000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-primary mb-2">
                                        Cuéntanos tu situación *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        placeholder="Describe brevemente qué problemas tienes en tu negocio..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full group relative inline-flex items-center justify-center gap-4 bg-primary text-black font-bold text-xl px-12 py-6 rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_15px_40px_rgba(110,231,183,0.4)]"
                                >
                                    <span>Solicitar Diagnóstico Gratuito</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-center text-gray-500 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block mr-2"></span>
                                    Respuesta en menos de 24h · Disponible para proyectos en {location.name}
                                </p>
                            </form>

                            {/* Social Media Links */}
                            <div className="text-center pt-8 border-t border-white/10">
                                <p className="text-gray-400 font-bold mb-6 uppercase tracking-widest text-sm">
                                    O síguenos en redes sociales
                                </p>
                                <div className="flex justify-center gap-4">
                                    <a
                                        href="https://www.linkedin.com/company/engorilate"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-primary hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com/engorilate"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-primary hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                                        aria-label="Twitter/X"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/engorilate"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-primary hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="mailto:contacto@engorilate.com"
                                        className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-primary hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                                        aria-label="Email"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectorLocationPage;
