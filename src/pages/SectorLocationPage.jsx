import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { getSectorBySlug } from '../data/sectors';
import { getLocationBySlug } from '../data/locations';
import { sectorLocationContent } from '../data/sectorLocationContent';

const SectorLocationPage = () => {
    const { sector: sectorSlug, location: locationSlug } = useParams();
    const sector = getSectorBySlug(sectorSlug);
    const location = getLocationBySlug(locationSlug);

    // Get specific content for this combination
    const contentKey = `${sectorSlug}-${locationSlug}`;
    const pageContent = sectorLocationContent[contentKey];

    // Redirect if invalid
    if (!sector || !location || !pageContent) {
        return <Navigate to="/" replace />;
    }

    // Set page title and meta
    useEffect(() => {
        document.title = pageContent.metaTitle;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', pageContent.metaDescription);
        }
    }, [pageContent]);

    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none h-[60vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
            </div>

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
                    <div className="flex items-center gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase">
                            <MapPin className="w-3 h-3" />
                            {location.name}
                        </div>
                        <div className="text-3xl">{sector.icon}</div>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                        {pageContent.hero.title}
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {pageContent.hero.subtitle}
                    </p>
                </div>

                {/* Problems Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <AlertTriangle className="w-8 h-8 text-orange-400" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                            Problemas Reales
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pageContent.problems.map((problem, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl hover:border-orange-400/30 transition-all"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-orange-400/50 mt-1 flex-shrink-0" />
                                        <h3 className="text-white font-semibold">{problem.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed ml-8">{problem.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Solutions Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <CheckCircle className="w-8 h-8 text-primary" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                            Cómo lo Solucionamos
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pageContent.solutions.map((solution, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#222222] border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all group"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                        <h3 className="text-white font-semibold">{solution.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed ml-8">{solution.description}</p>
                                    <div className="ml-8 mt-2">
                                        <span className="text-primary text-xs font-medium">→ {solution.benefit}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Local Context */}
                <div className="bg-[#1a1a1a] border border-white/5 p-8 rounded-xl mb-20">
                    <h3 className="font-display text-2xl font-bold text-white mb-4">
                        Por qué en {location.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        {pageContent.localContext}
                    </p>
                </div>

                {/* How We Work */}
                <div className="bg-[#222222] border border-white/10 p-10 md:p-16 rounded-2xl mb-20">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                        Cómo Trabajamos
                    </h2>
                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>
                            No vendemos software. No te complicamos con tecnicismos. Nuestro trabajo es simple:
                        </p>
                        <ul className="space-y-4 ml-6">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span><strong className="text-white">Entendemos</strong> cómo funciona tu negocio hoy (sin juzgar)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span><strong className="text-white">Decidimos reglas claras</strong> para eliminar la fatiga de decisión diaria</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span><strong className="text-white">Automatizamos lo que sobra</strong> con tecnología invisible que funciona sola</span>
                            </li>
                        </ul>
                        <p className="pt-4">
                            <strong className="text-white">Resultado:</strong> Recuperas tu tiempo, reduces el estrés, y tu negocio funciona sin que tengas que estar encima de todo.
                        </p>
                    </div>
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
                                {pageContent.relatedSectors.map((relatedSlug) => (
                                    <Link
                                        key={relatedSlug}
                                        to={`/${relatedSlug}`}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        → {relatedSlug.split('-')[0].charAt(0).toUpperCase() + relatedSlug.split('-')[0].slice(1)} en {location.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">{sector.name} en otras localidades</h4>
                            <div className="flex flex-col gap-2">
                                {pageContent.relatedLocations.map((relatedSlug) => {
                                    const relatedLocation = getLocationBySlug(relatedSlug.split('-')[1]);
                                    return (
                                        <Link
                                            key={relatedSlug}
                                            to={`/${relatedSlug}`}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm"
                                        >
                                            → {sector.name} en {relatedLocation?.name || relatedSlug.split('-')[1]}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                        ¿Tienes {sector.slug === 'peluquerias' ? 'una peluquería' : sector.slug === 'restaurantes' ? 'un restaurante' : sector.slug === 'clinicas' ? 'una clínica' : sector.slug === 'talleres' ? 'un taller' : 'un comercio'} en {location.name}?
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

export default SectorLocationPage;
