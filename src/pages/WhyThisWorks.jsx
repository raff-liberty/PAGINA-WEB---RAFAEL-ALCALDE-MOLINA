import React from 'react';
import { motion } from 'framer-motion';
import { Infinity as AllInclusive, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundMesh from '../components/BackgroundMesh';

const WhyThisWorks = () => {
    const principles = [
        {
            number: "01",
            title: "El problema casi nunca es técnico",
            text: "La mayoría de las veces no te falta una herramienta, te falta un proceso. Comprar software sin tener claro el 'para qué' **solo sirve para digitalizar el caos**. Primero ordenamos la casa con lápiz y papel, luego elegimos los muebles digitales."
        },
        {
            number: "02",
            title: "Ordenar es decidir, no hacer más",
            text: "Poner orden no significa añadir más tareas a tu lista interminable, sino **eliminar lo que sobra**. Es tener la valentía de decir 'esto no lo hacemos así' para poder enfocarte en lo que realmente da dinero y satisfacción a tu negocio."
        },
        {
            number: "03",
            title: "Las reglas liberan, no controlan",
            text: "Cuando no hay reglas claras, cada pequeño imprevisto es una crisis que tienes que resolver tú. Un buen protocolo no te ata; **te permite delegar y olvidarte**, sabiendo que las cosas se harán exactamente como tú quieres."
        },
        {
            number: "04",
            title: "No todo debe automatizarse",
            text: "Automatizamos lo repetitivo, lo aburrido y lo propenso a errores. Pero **la empatía y la estrategia no se tocan**. La tecnología está para servir al negocio, no para reemplazar su alma ni convertirte en un robot."
        },
        {
            number: "05",
            title: "El orden se nota en lo cotidiano",
            text: "No hablamos de métricas abstractas. Hablamos de **salir a tu hora**, de no recibir whatsapps de trabajo un domingo y de dormir tranquilo sabiendo que no se te ha olvidado enviar esa factura importante."
        },
        {
            number: "06",
            title: "No buscamos crecer a cualquier precio",
            text: "A veces, el éxito no es facturar el doble, sino **trabajar la mitad ganando lo mismo**. Buscamos la estabilidad operativa y tu tranquilidad mental antes que un escalado descontrolado que acabe quemando al dueño."
        }
    ];

    return (
        <div className="relative pt-64 pb-48 min-h-screen">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-24 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Manifiesto de Eficiencia
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white">
                        Por qué esto <span className="text-primary italic">funciona</span>
                    </h1>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">
                        No aplicamos magia. Solo lógica de negocio aplicada al caos.
                        Estos son los principios innegociables que guían nuestro trabajo contigo.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {principles.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-[#222222] border border-white/30 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.9)] hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Background glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Number badge */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <span className="text-2xl font-display font-black text-white/20">
                                    {item.number}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-lg text-gray-400 font-light leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA - Premium Integrated Box */}
                <div className="mt-24 mb-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-[#222222] to-[#181818] border border-white/30 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.9)] p-8 md:p-12"
                    >
                        {/* Background effects */}
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full opacity-40"></div>
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full opacity-30"></div>
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                            <AllInclusive className="w-64 h-64 text-primary" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-8">La Promesa Real</span>
                            <h2 className="text-3xl md:text-5xl text-white font-display font-bold leading-tight mb-8">
                                El éxito no es trabajar más duro, <br />
                                <span className="text-primary italic">es que el negocio te necesite menos.</span>
                            </h2>

                            <div className="flex flex-col md:flex-row gap-6 mt-8">
                                <Link
                                    to="/contact"
                                    className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold text-xl px-12 py-6 rounded-2xl transition-all transform hover:translate-y-[-4px] shadow-[0_0_30px_rgba(110,231,183,0.3)] hover:shadow-[0_0_50px_rgba(110,231,183,0.5)]"
                                >
                                    <span>¿Compartes esta visión? Hablemos</span>
                                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to="/como-trabajamos"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium transition-colors px-12 py-6"
                                >
                                    Ver el método exacto
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WhyThisWorks;
