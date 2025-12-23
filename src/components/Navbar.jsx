import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Problemas', path: '/' },
        { name: 'Cómo Trabajamos', path: '/como-trabajamos' },
        { name: 'Por qué funciona', path: '/por-que-funciona' },
        { name: 'Blog', path: '/blog' },
        { name: 'Sobre mí', path: '/sobre-mi' },
    ];

    return (
        <nav className={`fixed w-full z-50 top-0 border-b border-white/10 transition-all duration-300 ${scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md h-20 md:h-20 shadow-2xl'
            : 'bg-[#0F0F0F]/80 backdrop-blur-sm h-24 md:h-24'
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link className="group flex items-center gap-3" to="/">
                        <img
                            src="/favicon.png"
                            alt="Engorilate Icon"
                            className="h-16 md:h-20 w-auto"
                        />
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight text-primary leading-none">
                                ENGORILATE
                            </span>
                            <span className="text-gray-400 text-xs md:text-sm font-light tracking-wide mt-0.5">
                                Automatización de Negocios
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            className={`text-sm font-medium tracking-wide transition-colors ${location.pathname === link.path
                                ? 'text-primary border-b-2 border-primary/70 pb-1'
                                : 'text-gray-300 hover:text-white'
                                }`}
                            to={link.path}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <span className="text-gray-600 select-none font-light">......</span>
                    <Link className="bg-primary hover:bg-primary-hover text-gray-900 font-bold px-8 py-2.5 rounded shadow-[0_0_20px_rgba(110,231,183,0.3)] transition-all transform hover:scale-105" to="/contact">
                        Hablar
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0A0A0A] border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    className={`text-lg font-medium transition-colors ${location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-gray-300'
                                        }`}
                                    to={link.path}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link className="bg-primary text-gray-900 font-bold px-6 py-3 rounded text-center shadow-lg" to="/contact">
                                Hablar
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>

    );
};

export default Navbar;
