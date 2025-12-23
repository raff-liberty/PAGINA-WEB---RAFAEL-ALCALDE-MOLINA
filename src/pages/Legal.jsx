import React from 'react';
import { motion } from 'framer-motion';

const Legal = () => {
    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert max-w-none"
                >
                    <h1 className="text-4xl font-bold mb-8 text-white">Aviso Legal</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">1. Información General</h2>
                        <p className="text-gray-400">En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</p>
                        <ul className="text-gray-400 list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Titular:</strong> Rafael (Antes de Hacer)</li>
                            <li><strong>Domicilio:</strong> Av Isla de Pascua 5 Bajo E, Isla Plana, Cartagena, Murcia</li>
                            <li><strong>Email:</strong> hola@antesdehacer.com</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">2. Condiciones de Uso</h2>
                        <p className="text-gray-400">El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">3. Propiedad Intelectual</h2>
                        <p className="text-gray-400">Todos los contenidos de la web (textos, logos, imágenes, etc.) están protegidos por derechos de propiedad intelectual.</p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default Legal;
