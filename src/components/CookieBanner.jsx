import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50"
                >
                    <div className="bg-surface-dark border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-white font-bold">Cookies y Privacidad</h3>
                            <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{' '}
                            <Link to="/cookies" className="text-primary hover:underline">política de cookies</Link>.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={acceptCookies}
                                className="flex-1 bg-primary hover:bg-primary-hover text-gray-900 font-bold py-2 px-4 rounded-lg transition-all text-sm"
                            >
                                Aceptar
                            </button>
                            <Link
                                to="/cookies"
                                onClick={() => setIsVisible(false)}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2 px-4 rounded-lg border border-white/10 transition-all text-sm text-center"
                                aria-label="Leer nuestra política de cookies completa"
                            >
                                Política de cookies
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
