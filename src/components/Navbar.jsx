import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Globe, Search, Database, Layout, ArrowRight } from 'lucide-react';

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

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen]);

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
        <nav className={`fixed w-full z-[9999] top-0 border-b border-white/10 transition-all duration-300 ${scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md h-16 md:h-20 shadow-2xl'
            : 'bg-[#0F0F0F]/80 backdrop-blur-sm h-20 md:h-24'
            }`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                <div className="flex items-center overflow-hidden">
                    <Link className="group flex items-center gap-2 md:gap-3" to="/">
                        <img
                            src="/logo-136.png"
                            alt="Engorilate Icon"
                            width="136"
                            height="136"
                            fetchPriority="high"
                            className="h-10 md:h-11 lg:h-16 w-auto flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="font-display font-bold text-lg md:text-xl lg:text-3xl tracking-tight text-primary leading-none truncate">
                                ENGORILATE
                            </span>
                            <span className="text-gray-400 text-[8px] md:text-[9px] lg:text-sm font-medium tracking-wide mt-0.5 truncate">
                                Tu negocio en piloto automático
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
                <div className={`lg:hidden flex items-center relative z-[99999999] ${isMenuOpen ? 'invisible' : ''}`}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative z-[99999999] text-white focus:outline-none p-2 bg-black/50 rounded-lg border border-white/10 hover:bg-black/70 transition-all"
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* PREMIUM MOBILE MENU - FULL SCREEN OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-0 z-[9999999] bg-black"
                    >
                        {/* Subtle ambient glows */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full opacity-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full opacity-15 pointer-events-none" />

                        <div className="relative min-h-screen h-full overflow-y-auto flex flex-col bg-black">
                            {/* Premium Header with close button */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-black via-[#0a1a0f] to-black">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(110,231,183,0.5)]" />
                                    <span className="text-primary font-black text-xl tracking-wider uppercase">Menú</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 transition-all hover:rotate-90 duration-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Menu items */}
                            <div className="flex-1 p-6 space-y-2">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                                    >
                                        {link.dropdown ? (
                                            <div className="mb-2">
                                                <button
                                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                                    className={`flex items-center justify-between w-full text-left px-6 py-4 rounded-2xl border transition-all backdrop-blur-sm ${link.dropdown.some(sub => location.pathname === sub.path)
                                                        ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(110,231,183,0.2)]'
                                                        : 'bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10 hover:border-primary/30'
                                                        }`}
                                                >
                                                    <span className={`text-2xl font-black tracking-tight uppercase italic ${link.dropdown.some(sub => location.pathname === sub.path) ? 'text-primary' : 'text-white'
                                                        }`}>
                                                        {link.name}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-6 h-6 transition-transform duration-300 ${link.dropdown.some(sub => location.pathname === sub.path) ? 'text-primary' : 'text-white'
                                                            } ${isServicesOpen ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                                {isServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-4 pr-2 pt-3 space-y-2">
                                                            {link.dropdown.map((sub) => (
                                                                <Link
                                                                    key={sub.path}
                                                                    to={sub.path}
                                                                    className="flex items-center gap-4 px-4 py-3 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all"
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                                        <sub.icon className="w-5 h-5" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="text-white font-bold text-base">
                                                                            {sub.name}
                                                                        </div>
                                                                        <div className="text-gray-500 text-xs mt-0.5">
                                                                            {sub.desc}
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                to={link.path}
                                                className={`block px-6 py-4 rounded-2xl text-2xl font-black uppercase italic tracking-tight transition-all ${location.pathname === link.path
                                                    ? 'bg-primary/10 border border-primary/30 text-primary shadow-[0_0_20px_rgba(110,231,183,0.2)]'
                                                    : 'bg-gradient-to-r from-white/5 to-transparent border border-white/10 text-white hover:border-white/20'
                                                    }`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Premium CTA Button */}
                            <div className="p-6 pt-8">
                                <Link
                                    to="/contact"
                                    className="relative block overflow-hidden group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative flex items-center justify-center gap-3 bg-primary group-hover:bg-transparent text-black font-black uppercase italic text-xl px-8 py-5 rounded-2xl transition-all duration-500 border-2 border-primary shadow-[0_0_30px_rgba(110,231,183,0.3)]">
                                        Hablamos
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>

                            {/* Bottom Decoration */}
                            <div className="p-6 text-center border-t border-white/5 mt-8">
                                <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">
                                    Tu negocio en piloto automático
                                </p>
                                <p className="text-gray-600 text-[10px] font-mono tracking-wider uppercase mt-1">
                                    Región de Murcia
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>

    );
};

export default Navbar;
