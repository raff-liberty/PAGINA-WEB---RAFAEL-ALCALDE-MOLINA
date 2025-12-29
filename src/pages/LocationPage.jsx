import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, Building2, Users, TrendingUp, AlertTriangle, HelpCircle, Brain, Euro, History, ShieldCheck, Zap, XCircle } from 'lucide-react';
import { getLocationBySlug } from '../data/locations';
import { sectors } from '../data/sectors';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

const LocationPage = () => {
    const { location } = useParams();
    const locationData = getLocationBySlug(location);

    // Redirect to 404 if location doesn't exist
    if (!locationData) {
        return <Navigate to="/" replace />;
    }

    // Build LocalBusiness format for SEO component
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Engorilate - Automatización en ${locationData.name}`,
        "description": locationData.metaDescription,
        "url": window.location.href,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": locationData.name,
            "addressRegion": "Murcia",
            "addressCountry": "ES"
        },
        "service": {
            "@type": "Service",
            "serviceType": "Automatización de Negocios",
            "areaServed": locationData.name
        }
    };

    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            <SEO
                title={`Automatización de Negocios en ${locationData.name} | Engorilate`}
                description={locationData.metaDescription}
                keywords={locationData.keywords}
                schema={schemaData}
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="mb-8 text-sm">
                    <ol className="flex items-center gap-2 text-gray-500">
                        <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                        <li>/</li>
                        <li><Link to="/servicios" className="hover:text-primary transition-colors">Servicios</Link></li>
                        <li>/</li>
                        <li className="text-primary">{locationData.name}</li>
                    </ol>
                </nav>

                {/* Hero Section */}
                <div className="mb-20 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <MapPin className="w-3 h-3" />
                        {locationData.context}
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white text-balance">
                        Soluciones de <span className="text-primary tracking-tight">Automatización</span> <br className="hidden md:block" />
                        para tu negocio en <span className="text-primary">{locationData.name}</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {locationData.description}
                    </p>
                </div>

                {/* SEO Intent Section: El Coste del Caos */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
                    <div className="lg:col-span-7">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            El coste mental y operativo de <br className="hidden md:block" />
                            gestionar <span className="underline decoration-primary/30">a ciegas</span> en {locationData.name}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-gray-400 text-lg leading-relaxed">
                                No importa si tienes una peluquería, un taller o una clínica. El problema en {locationData.name} es el mismo: <strong className="text-white">tareas que te roban la vida</strong>. Cada WhatsApp no contestado, cada reserva mal apuntada y cada hora perdida en Excel es dinero que se escapa.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl">
                                    <Brain className="w-8 h-8 text-primary/60 mb-3" />
                                    <h3 className="text-white font-bold mb-1">Cansancio Mental</h3>
                                    <p className="text-xs text-gray-500">Deja de ser el "cuello de botella" de tu propia empresa.</p>
                                </div>
                                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl">
                                    <Euro className="w-8 h-8 text-primary/60 mb-3" />
                                    <h3 className="text-white font-bold mb-1">Goteo de Dinero</h3>
                                    <p className="text-xs text-gray-500">Un negocio sin procesos claros es un negocio que pierde caja.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16"></div>
                            <HelpCircle className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-4 italic">"¿Te gustaría que tu negocio funcionara solo mientras tú descansas?"</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                En {locationData.name} ayudo a dueños de negocios a recuperar el control. Sin complicaciones, sin tecnicismos. Solo orden.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                Pedir diagnóstico gratuito <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Local Examples / Case Studies */}
                <div className="mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                        <AlertTriangle className="w-3 h-3" /> Realidad Local
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8">
                        Escenarios críticos en <span className="text-primary italic">{locationData.name}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {locationData.examples.map((example, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl relative overflow-hidden group shadow-2xl"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
                                <div className="text-primary/40 mb-6 font-mono text-sm">CASO_{String(idx + 1).padStart(2, '0')}</div>
                                <p className="text-white text-lg leading-relaxed font-medium mb-4">{example}</p>
                                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
                                    <XCircle className="w-4 h-4" /> Fuga de ingresos detectada
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* How We Help: THE SYSTEM */}
                <div className="relative mb-24 overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    {/* Background decoration */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[150px] rounded-full opacity-50"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 blur-[150px] rounded-full opacity-30"></div>

                    <div className="relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
                                El Método <span className="text-primary italic">Engorilate</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                No instalamos software. Construimos <strong className="text-white">sistemas de gestión</strong> que eliminan el error humano y recuperan tu libertad.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Entrar en el barro",
                                    desc: "Mapeamos tu negocio en {locationData.name}. Detectamos dónde se te escapa el dinero por culpa de procesos manuales y descuidos.",
                                    benefit: "Claridad Total",
                                    icon: Brain,
                                    color: "text-blue-400"
                                },
                                {
                                    title: "Procesos de acero",
                                    desc: "Diseñamos las reglas. Si un cliente no paga, el sistema reclama solo. Si hay una cita, el aviso llega solo. Sin fallos.",
                                    benefit: "Cero Errores",
                                    icon: ShieldCheck,
                                    color: "text-primary"
                                },
                                {
                                    title: "Motor Automático",
                                    desc: "Conectamos tu WhatsApp, Email y CRM en un solo centro de control que trabaja 24/7 mientras tú estás fuera.",
                                    benefit: "Libertad Real",
                                    icon: Zap,
                                    color: "text-yellow-400"
                                }
                            ].map((step, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 p-8 rounded-3xl hover:border-primary/40 transition-all group relative overflow-hidden">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${step.color} group-hover:bg-primary group-hover:text-black transition-all duration-500`}>
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <div className="absolute top-6 right-8 px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        {step.benefit}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {step.desc.replace('{locationData.name}', locationData.name)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <p className="text-white/60 mb-8 italic">El resultado: Tu negocio funciona. Tú dejas de ser un esclavo de tu WhatsApp.</p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-4 bg-primary text-black font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(110,231,183,0.3)]"
                            >
                                Quiero mi Diagnóstico Gratuito <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sectors Available */}
                <div className="mb-20">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Sectores en <span className="text-primary">{locationData.name}</span>
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-2xl">
                        Soluciones específicas para cada tipo de negocio en {locationData.name}:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sectors.map((sector, idx) => (
                            <Link
                                key={sector.id}
                                to={`/${sector.slug}/${locationData.slug}`}
                                className="group bg-[#222222] border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all hover:bg-[#2a2a2a]"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="text-3xl">{sector.icon}</div>
                                    <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
                                        {sector.name}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {sector.description}
                                </p>
                                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                                    <span>Ver soluciones</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                        ¿Tienes un negocio en {locationData.name}?
                    </h3>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        Si te ves reflejado en estos problemas, quizá tenga sentido que hablemos.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold text-lg px-8 py-4 rounded transition-all transform hover:translate-y-[-2px] shadow-[0_0_20px_rgba(110,231,183,0.2)]"
                        >
                            <span>Hablar antes de hacer</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <span className="text-sm text-gray-600 mt-2">Sin compromisos comerciales. Solo evaluar si encajamos.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationPage;
