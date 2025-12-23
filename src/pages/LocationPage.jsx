import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, Building2, Users, TrendingUp } from 'lucide-react';
import { getLocationBySlug } from '../data/locations';
import { sectors } from '../data/sectors';

const LocationPage = () => {
    const { location } = useParams();
    const locationData = getLocationBySlug(location);

    // Redirect to 404 if location doesn't exist
    if (!locationData) {
        return <Navigate to="/" replace />;
    }

    // Set page title and meta description
    useEffect(() => {
        document.title = `Automatización de Negocios en ${locationData.name} | Engorilao`;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', locationData.metaDescription);
        }
    }, [locationData]);

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
                    <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                        Automatización y Orden para <br />
                        Negocios en <span className="text-primary">{locationData.name}</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {locationData.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#222222] border border-white/10 p-6 rounded-xl"
                    >
                        <Users className="w-8 h-8 text-primary mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">{locationData.population}</div>
                        <div className="text-sm text-gray-500">Población</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#222222] border border-white/10 p-6 rounded-xl"
                    >
                        <Building2 className="w-8 h-8 text-primary mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">Pequeños Negocios</div>
                        <div className="text-sm text-gray-500">Nuestro enfoque</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#222222] border border-white/10 p-6 rounded-xl"
                    >
                        <TrendingUp className="w-8 h-8 text-primary mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">Orden Real</div>
                        <div className="text-sm text-gray-500">Resultados medibles</div>
                    </motion.div>
                </div>

                {/* Local Examples */}
                <div className="mb-20">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Problemas comunes en <span className="text-primary">{locationData.name}</span>
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-2xl">
                        Estos son algunos ejemplos de situaciones que vemos habitualmente en negocios de {locationData.name}:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {locationData.examples.map((example, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-all"
                            >
                                <CheckCircle className="w-6 h-6 text-primary/50 mb-4" />
                                <p className="text-gray-300 leading-relaxed">{example}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* How We Help */}
                <div className="bg-[#222222] border border-white/10 p-10 md:p-16 rounded-2xl mb-20">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                        Cómo ayudamos a negocios en {locationData.name}
                    </h2>
                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>
                            No importa si tienes una peluquería, un restaurante, un taller o una clínica en {locationData.name}.
                            El problema es siempre el mismo: <strong className="text-white">caos operativo</strong>.
                        </p>
                        <p>
                            Nuestro trabajo consiste en:
                        </p>
                        <ul className="space-y-4 ml-6">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span><strong className="text-white">Entender</strong> cómo funciona tu negocio hoy (sin juzgar)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span><strong className="text-white">Decidir reglas claras</strong> para eliminar la fatiga de decisión diaria</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span><strong className="text-white">Automatizar lo que sobra</strong> con tecnología invisible que funciona sola</span>
                            </li>
                        </ul>
                        <p className="pt-4">
                            El resultado: recuperas tu tiempo, reduces el estrés y tu negocio funciona sin que tengas que estar encima de todo.
                        </p>
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
