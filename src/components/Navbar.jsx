import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Globe, Search, Database, Layout } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
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
        setIsServicesOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Problemas', path: '/' },
        {
            name: 'Servicios',
            path: '/servicios',
            dropdown: [
                { name: 'Vista General', path: '/servicios', icon: Layout, desc: 'Nuestra oferta completa' },
                { name: 'Reservas WhatsApp', path: '/servicios/automatizacion-whatsapp', icon: Zap, desc: 'Motor de citas automático' },
                { name: 'Web y Apps a Medida', path: '/servicios/desarrollo-web-medida', icon: Globe, desc: 'Herramientas potentes' },
                { name: 'Estrategia SEO Local', path: '/servicios/seo-local-estrategia', icon: Search, desc: 'Domina Google Maps' },
                { name: 'Sistemas Gestión / ERP', path: '/servicios/sistemas-gestion-personalizados', icon: Database, desc: 'Control total operativo' },
            ]
        },
        { name: 'Cómo Trabajamos', path: '/como-trabajamos' },
        { name: 'Blog', path: '/blog' },
        { name: 'Sobre mí', path: '/sobre-mi' },
    ];

    return (
        <nav className={`fixed w-full z-50 top-0 border-b border-white/10 transition-all duration-300 ${scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md h-16 md:h-20 shadow-2xl'
            : 'bg-[#0F0F0F]/80 backdrop-blur-sm h-20 md:h-24'
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link className="group flex items-center gap-3" to="/">
                        <img
                            src="/favicon.png"
                            alt="Engorilate Icon"
                            className="h-12 md:h-20 w-auto"
                        />
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-xl md:text-3xl tracking-tight text-primary leading-none">
                                ENGORILATE
                            </span>
                            <span className="text-gray-400 text-[10px] md:text-sm font-light tracking-wide mt-0.5">
                                Automatización de Negocios
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <div key={link.path} className="relative group/nav">
                            {link.dropdown ? (
                                <div
                                    className="flex items-center gap-1 cursor-pointer py-2"
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    <Link
                                        to={link.path}
                                        className={`text-sm font-medium tracking-wide transition-colors ${location.pathname.startsWith('/servicios') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                                    >
                                        {link.name}
                                    </Link>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-primary' : 'text-gray-500'}`} />

                                    {/* Dropdown Card */}
                                    <AnimatePresence>
                                        {isServicesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 mt-2 w-80 bg-[#0F0F0F] border border-white/10 rounded-2xl p-4 shadow-2xl"
                                            >
                                                <div className="grid gap-2">
                                                    {link.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                                                        >
                                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-black transition-all">
                                                                <subItem.icon className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">
                                                                    {subItem.name}
                                                                </div>
                                                                <div className="text-[10px] text-gray-500 mt-0.5">
                                                                    {subItem.desc}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    className={`text-sm font-medium tracking-wide transition-colors ${location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-gray-300 hover:text-white'
                                        }`}
                                    to={link.path}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 w-full h-px bg-primary" />
                                    )}
                                </Link>
                            )}
                        </div>
                    ))}
                    <span className="text-gray-600 select-none font-light">......</span>
                    <Link className="bg-primary hover:bg-primary-hover text-gray-900 font-bold px-8 py-2.5 rounded shadow-[0_0_20px_rgba(110,231,183,0.3)] transition-all transform hover:scale-105" to="/contact">
                        Hablar
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden flex items-center">
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
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="lg:hidden fixed inset-0 top-0 bg-[#0A0A0A]/98 backdrop-blur-xl z-40 pt-24"
                    >
                        <div className="flex flex-col p-8 space-y-6 overflow-y-auto h-full pb-32">
                            {navLinks.map((link) => (
                                <div key={link.path}>
                                    {link.dropdown ? (
                                        <div className="space-y-4">
                                            <div
                                                className="flex items-center justify-between text-2xl font-display font-bold text-primary"
                                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown className={`w-6 h-6 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                                            </div>
                                            <AnimatePresence>
                                                {isServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="pl-4 space-y-4 overflow-hidden"
                                                    >
                                                        {link.dropdown.map((sub) => (
                                                            <Link
                                                                key={sub.path}
                                                                to={sub.path}
                                                                className="flex items-center gap-4 text-gray-400 hover:text-white"
                                                            >
                                                                <sub.icon className="w-5 h-5 text-primary/50" />
                                                                <span className="text-lg">{sub.name}</span>
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            className={`text-2xl font-display font-bold transition-colors ${location.pathname === link.path
                                                ? 'text-primary'
                                                : 'text-white'
                                                }`}
                                            to={link.path}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <Link className="bg-primary text-gray-900 text-xl font-bold px-6 py-4 rounded-xl text-center shadow-lg mt-4" to="/contact">
                                Empezar ahora
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>

    );
};

export default Navbar;
