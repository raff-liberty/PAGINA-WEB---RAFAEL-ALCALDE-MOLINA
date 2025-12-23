import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sectors } from '../data/sectors';
import { locations } from '../data/locations';

const SectorsDirectory = () => {
    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none h-[50vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Directorio
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                        Soluciones por <span className="text-primary">Sector y Localidad</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Encuentra soluciones específicas para tu tipo de negocio en tu localidad.
                    </p>
                </div>

                {/* Sectors Grid */}
                {sectors.map((sector, idx) => (
                    <div key={sector.id} className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="text-4xl">{sector.icon}</div>
                            <h2 className="font-display text-3xl font-bold text-white">
                                {sector.name}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {locations.map((location) => (
                                <Link
                                    key={`${sector.id}-${location.id}`}
                                    to={`/${sector.slug}/${location.slug}`}
                                    className="group bg-[#222222] border border-white/10 p-4 rounded-lg hover:border-primary/50 transition-all hover:bg-[#2a2a2a]"
                                >
                                    <div className="text-sm text-gray-400 mb-1">{sector.name}</div>
                                    <div className="text-white font-medium group-hover:text-primary transition-colors">
                                        {location.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* SEO Text */}
                <div className="mt-20 bg-[#222222]/50 border border-white/5 p-8 rounded-xl">
                    <h3 className="font-display text-2xl font-bold text-white mb-4">
                        Automatización para Pequeños Negocios en la Región de Murcia
                    </h3>
                    <div className="text-gray-400 space-y-4 text-sm leading-relaxed">
                        <p>
                            Ofrecemos soluciones de automatización y orden operativo para pequeños negocios en toda la Región de Murcia.
                            Trabajamos con peluquerías, restaurantes, clínicas, talleres y comercios en Murcia, Cartagena, Lorca, Molina de Segura,
                            Alcantarilla, Mazarrón y Totana.
                        </p>
                        <p>
                            Cada sector tiene problemas específicos: las peluquerías luchan con los no-shows, los restaurantes con las reservas caóticas,
                            las clínicas con la gestión de pacientes, los talleres con la facturación olvidada, y los comercios con el inventario descontrolado.
                            Nuestras soluciones están diseñadas específicamente para cada tipo de negocio y adaptadas a cada localidad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectorsDirectory;
