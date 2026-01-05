import React from 'react';
import { motion } from 'framer-motion';
import BackgroundMesh from '../components/BackgroundMesh';

const Cookies = () => {
    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            <BackgroundMesh />
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert max-w-none"
                >
                    <h1 className="text-4xl font-bold mb-8 text-white">Política de Cookies</h1>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">1. ¿Qué son las cookies?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
                        </p>
                    </section>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">2. Cookies utilizadas en este sitio</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-400 border-collapse">
                                <thead className="text-white border-b border-white/20">
                                    <tr>
                                        <th className="py-2">Nombre</th>
                                        <th className="py-2">Propósito</th>
                                        <th className="py-2">Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2">sb-access-token</td>
                                        <td className="py-2">Necesaria para la autenticación y seguridad de Supabase.</td>
                                        <td className="py-2">Técnica</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2">_ga / _gid</td>
                                        <td className="py-2">Utilizadas por Google Analytics para distinguir usuarios de forma anónima.</td>
                                        <td className="py-2">Analítica</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">cookie-consent</td>
                                        <td className="py-2">Recuerda si el usuario ha aceptado nuestra política de cookies.</td>
                                        <td className="py-2">Personalización</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-10 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-2xl font-semibold mb-4 text-primary font-display tracking-tight">3. Gestión de cookies</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Usted puede restringir, bloquear o borrar las cookies de este sitio web utilizando su navegador. En cada navegador la operativa es diferente:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li><strong>Chrome:</strong> Configuración - Privacidad y seguridad - Cookies y otros datos de sitios.</li>
                            <li><strong>Firefox:</strong> Ajustes - Privacidad & Seguridad - Cookies y datos del sitio.</li>
                            <li><strong>Safari:</strong> Ajustes - Safari - Privacidad - Bloquear todas las cookies.</li>
                        </ul>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default Cookies;
