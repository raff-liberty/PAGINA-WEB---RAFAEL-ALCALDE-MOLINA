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

            {/* BRAND NEW MOBILE MENU - FULL SCREEN OVERLAY */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 overflow-y-auto"
                    style={{
                        backgroundColor: '#000000',
                        zIndex: 99999,
                        position: 'fixed'
                    }}
                >
                    {/* Header with close button */}
                    <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        <span className="text-primary font-bold text-xl">MENÚ</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            style={{ color: '#ffffff' }}
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="p-8 space-y-8">
                        {navLinks.map((link) => (
                            <div key={link.path}>
                                {link.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                                            className="flex items-center justify-between w-full text-left text-2xl font-bold mb-4"
                                            style={{ color: '#6EE7B7' }}
                                        >
                                            <span>{link.name}</span>
                                            <ChevronDown
                                                className={`w-6 h-6 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                                                style={{ color: '#6EE7B7' }}
                                            />
                                        </button>
                                        {isServicesOpen && (
                                            <div className="pl-4 space-y-4 mb-4">
                                                {link.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.path}
                                                        to={sub.path}
                                                        className="flex items-center gap-3 text-lg"
                                                        style={{ color: '#d1d5db' }}
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <sub.icon className="w-5 h-5" style={{ color: '#6EE7B799' }} />
                                                        <span>{sub.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className="block text-2xl font-bold"
                                        style={{ color: location.pathname === link.path ? '#6EE7B7' : '#ffffff' }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* CTA Button */}
                        <Link
                            to="/contact"
                            className="block text-center text-xl font-bold px-8 py-4 rounded-xl mt-12"
                            style={{ backgroundColor: '#6EE7B7', color: '#000000' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Empezar ahora
                        </Link>
                    </div>
                </div>
            )}
        </nav>

    );
};

export default Navbar;
