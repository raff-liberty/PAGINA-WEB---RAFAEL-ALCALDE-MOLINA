import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { locations } from '../data/locations';
import BackgroundMesh from '../components/BackgroundMesh';

const Locations = () => {
    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-20 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <MapPin className="w-3 h-3" />
                        Región de Murcia
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                        Dónde <span className="text-primary">Trabajamos</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Ayudamos a pequeños negocios en toda la Región de Murcia a recuperar el control operativo.
                        Selecciona tu localidad para ver cómo podemos ayudarte.
                    </p>
                </div>

                {/* Location Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {locations.map((location, idx) => (
                        <motion.div
                            key={location.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link
                                to={`/servicios/${location.slug}`}
                                className="group block bg-[#222222] border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:bg-[#2a2a2a] relative overflow-hidden"
                            >
                                {/* Top border glow */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-gray-900 transition-all">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                </div>

                                <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                    {location.name}
                                </h2>

                                <p className="text-sm text-gray-500 mb-4 font-mono uppercase tracking-wider">
                                    {location.population}
                                </p>

                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {location.description}
                                </p>

                                {/* Bottom highlight */}
                                <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-0 group-hover:w-full transition-all duration-700"></div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center max-w-3xl mx-auto bg-[#222222] border border-white/10 p-12 rounded-2xl">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                        ¿No encuentras tu localidad?
                    </h3>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                        Trabajamos con negocios en toda la Región de Murcia. Si tu localidad no aparece en la lista,
                        no te preocupes, podemos ayudarte igualmente.
                    </p>
                    <Link
                        to="/contact"
                        className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold text-lg px-8 py-4 rounded transition-all transform hover:translate-y-[-2px] shadow-[0_0_20px_rgba(110,231,183,0.2)]"
                    >
                        <span>Hablar con nosotros</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Locations;
