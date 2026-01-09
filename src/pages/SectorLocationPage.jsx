import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, AlertTriangle, Brain, ShieldCheck, Zap, XCircle, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

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

                        <div className="mt-20 text-center relative z-10">
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

                    {/* CTA Bottom (Integrated) */}
                    <div className="relative bg-gradient-to-br from-[#222222] to-[#111111] border border-white/20 p-12 md:p-20 rounded-[3rem] overflow-hidden text-center shadow-3xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-8">
                                ¿Hablamos sobre tu <span className="text-primary">{sector.name.toLowerCase().replace(/s$/, '')}</span> en {location.name}?
                            </h3>
                            <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light">
                                Si estás cansado de que el día a día te coma y quieres que tu negocio empiece a trabajar para ti, agendemos un café virtual.
                            </p>
                            <div className="flex flex-col items-center gap-6">
                                <Link
                                    to="/contact"
                                    className="group relative inline-flex items-center gap-4 bg-white text-black font-bold text-xl px-12 py-6 rounded-2xl hover:bg-primary transition-all transform hover:scale-105 shadow-2xl"
                                >
                                    <span>Agendar Diagnóstico Gratuito</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="flex items-center gap-2 text-gray-500 text-sm font-mono mt-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                    Disponible para proyectos en {location.name}
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
