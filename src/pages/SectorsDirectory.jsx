import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, Scissors, Sparkles, Stethoscope, Activity, Brain, Sun,
    GraduationCap, Dumbbell, Utensils, Layers, Coffee, GlassWater,
    Wrench, Cable, HardHat, Hammer, Store, ShoppingBag, Box, Rocket,
    Palette, Ruler, Armchair, Briefcase, Settings
} from 'lucide-react';
import { sectors } from '../data/sectors';
import { locations } from '../data/locations';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

const IconMap = {
    Scissors, Sparkles, Stethoscope, Activity, Brain, Sun, GraduationCap,
    Dumbbell, Utensils, Layers, Coffee, GlassWater, Wrench, Cable, HardHat,
    Hammer, Store, ShoppingBag, Box, Rocket, Palette, Ruler, Armchair, Briefcase, Settings
};

const SectorsDirectory = () => {
    return (
        <div className="relative pt-64 pb-32 min-h-screen selection:bg-primary selection:text-black bg-gradient-to-br from-black via-[#0a1a0f] to-black">
            <SEO
                title="Directorio de Soluciones por Sector | Engorilate"
                description="Encuentra soluciones de automatización específicas para tu sector: Peluquerías, Restaurantes, Clínicas, Talleres y pequeña empresa en Murcia."
            />

            {/* Ambient glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-40 translate-x-1/4 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-30 -translate-x-1/4 translate-y-1/4" />
            </div>

            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-32 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
                    >
                        <span className="text-primary font-mono text-[10px] font-black tracking-[0.4em] uppercase">
                            Catálogo de Especialización
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-10 text-white tracking-tighter uppercase italic"
                    >
                        El problema no es lo que haces. <br />
                        <span className="text-primary drop-shadow-[0_0_15px_rgba(110,231,183,0.3)]">Es cómo funcionas.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl text-white font-light max-w-2xl leading-relaxed mb-8 italic"
                    >
                        "Cuando no entiendes el modelo operativo de tu negocio, cualquier solución externa es solo dinero tirado."
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-gray-400 font-light max-w-3xl leading-relaxed border-l-2 border-white/10 pl-8"
                    >
                        Negocios de sectores distintos comparten exactamente los mismos errores sistémicos cuando crecen sin estructura industrial. Identifica el motor operativo detrás de tu sector.
                    </motion.p>
                </div>

                <div className="mb-24">
                    <h2 className="font-display text-3xl font-black text-white mb-10 uppercase italic tracking-tighter">
                        I. Identifica tu <span className="text-primary">Estructura Base</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { id: 'citas-agenda', label: 'Negocios de Citas y Agenda', icon: '📅' },
                            { id: 'atencion-presencial', label: 'Atención Presencial y Picos', icon: '👥' },
                            { id: 'servicios-tecnicos', label: 'Servicios Técnicos y Órdenes', icon: '🔧' },
                            { id: 'venta-producto', label: 'Venta de Producto y Stock', icon: '📦' },
                            { id: 'servicios-profesionales', label: 'Servicios Profesionales', icon: '💼' }
                        ].map((item) => (
                            <Link
                                key={item.id}
                                to={`/segmentos/${item.id}`}
                                className="bg-white/5 backdrop-blur-xl border-2 border-white/5 p-8 rounded-[2.5rem] hover:border-primary/40 transition-all duration-500 hover:bg-white/[0.08] flex items-center gap-6 group shadow-2xl"
                            >
                                <span className="text-4xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">{item.icon}</span>
                                <span className="font-black text-xl text-white group-hover:text-primary transition-colors tracking-tight italic uppercase">{item.label}</span>
                                <ArrowRight className="ml-auto w-6 h-6 opacity-0 group-hover:opacity-100 transition-all text-primary translate-x-4 group-hover:translate-x-0" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="font-display text-4xl font-black text-white mb-8 uppercase italic tracking-tighter">
                        II. Automatización <span className="text-primary text-2xl not-italic">(Entornos Locales)</span>
                    </h2>
                </div>

                {/* Sectors Grid */}
                {sectors.map((sector, idx) => (
                    <div key={sector.id} id={sector.id} className="mb-16 pt-16 -mt-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-500">
                                    {(() => {
                                        const IconComponent = IconMap[sector.icon] || Settings;
                                        return <IconComponent className="w-8 h-8" />;
                                    })()}
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                    {sector.name}
                                </h2>
                            </div>
                            <Link
                                to={`/segmentos/${sector.segmentId}`}
                                className="inline-flex items-center gap-3 text-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] bg-primary/5 px-6 py-3 rounded-2xl border border-primary/20 backdrop-blur-sm group-hover:bg-primary/20"
                            >
                                Descubrir Motor Operativo <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {locations.map((location) => (
                                <Link
                                    key={`${sector.id}-${location.id}`}
                                    to={`/${sector.slug}/${location.slug}`}
                                    className="group bg-white/5 border border-white/5 p-6 rounded-3xl hover:border-primary/30 transition-all hover:bg-white/[0.08]"
                                >
                                    <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">{sector.name}</div>
                                    <div className="text-white font-black text-lg group-hover:text-primary transition-colors italic tracking-tight uppercase">
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
                            Cada sector tiene problemas específicos: las peluquerías luchan con los plantones, los restaurantes con las reservas caóticas,
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
