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

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">1. ¿Qué son las cookies?</h2>
                        <p className="text-gray-400">Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">2. Tipos de cookies utilizadas</h2>
                        <p className="text-gray-400">Este sitio utiliza cookies técnicas necesarias para el funcionamiento del sitio y cookies de análisis para mejorar nuestra oferta de servicios.</p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default Cookies;
