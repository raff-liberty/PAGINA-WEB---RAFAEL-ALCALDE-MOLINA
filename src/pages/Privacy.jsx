import React from 'react';
import { motion } from 'framer-motion';
import BackgroundMesh from '../components/BackgroundMesh';

const Privacy = () => {
    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            <BackgroundMesh />
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert max-w-none"
                >
                    <h1 className="text-4xl font-bold mb-8 text-white font-display">Política de Privacidad</h1>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">1. Identificación del Responsable</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-400 border-collapse">
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 font-bold text-white w-1/3">Responsable:</td>
                                        <td className="py-2">Rafael Alcalde Molina (Autónomo)</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 font-bold text-white">NIF:</td>
                                        <td className="py-2">48822622Q</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 font-bold text-white">Dirección:</td>
                                        <td className="py-2">Av Isla de Pascua 5 Bajo E, Isla Plana, 30868, Cartagena, Murcia</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 font-bold text-white">Email:</td>
                                        <td className="py-2">r.alcalde@engorilate.com</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 font-bold text-white">Actividad:</td>
                                        <td className="py-2">Automatización y Sistemas de Negocio</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">2. Finalidad del Tratamiento</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Los datos proporcionados serán tratados con las siguientes finalidades:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li>Gestión y respuesta a su solicitud de diagnóstico estratégico y contacto comercial.</li>
                            <li>Envío de comunicaciones comerciales, newsletters y actualizaciones sobre nuestros servicios y soluciones operativas.</li>
                            <li><strong>Acciones de Marketing y Publicidad:</strong> Sus datos podrán ser utilizados para la creación de audiencias personalizadas y modelos de "lookalike" en plataformas publicitarias (tales como Meta Ads, Google Ads, LinkedIn Ads, etc.) con el fin de ofrecerle contenido publicitario altamente relevante y adaptado a su perfil profesional y necesidades de negocio.</li>
                        </ul>
                    </section>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">3. Legitimación y Conservación</h2>
                        <p className="text-gray-400 leading-relaxed">
                            La base legal para el tratamiento de sus datos es su consentimiento explícito manifestado al enviar el formulario. Los datos se conservarán mientras exista un interés mutuo para mantener el fin del tratamiento o hasta que usted ejerza su derecho de supresión o revocación del consentimiento.
                        </p>
                    </section>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">4. Derechos del Interesado</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Usted tiene derecho a acceder, rectificar y suprimir sus datos, así como a la limitación u oposición a su tratamiento, portabilidad y a presentar una reclamación ante la autoridad de control (AEPD). Para ejercer estos derechos, puede dirigirse por escrito a: <span className="text-white font-mono">r.alcalde@engorilate.com</span>.
                        </p>
                    </section>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">5. Responsable</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Rafael Alcalde Molina (Engorilate), con ubicación operativa en Cartagena, Murcia, España.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
