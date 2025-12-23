import React from 'react';
import { Link } from 'react-router-dom';
import { locations } from '../data/locations';

const Footer = () => {
    return (
        <footer className="py-16 border-t border-white/5 bg-background-light dark:bg-background-dark relative z-10">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6EE7B7 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-display font-bold text-lg text-white mb-4">Antes De Hacer</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Automatización y orden para pequeños negocios. Sin complicaciones técnicas.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Enlaces</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/como-trabajamos">Cómo Trabajamos</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/sobre-mi">Sobre mí</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/contact">Contacto</Link>
                        </div>
                    </div>

                    {/* Recursos - NUEVO PARA SEO */}
                    <div>
                        <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Recursos</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/blog">Blog</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/peluquerias/murcia">Peluquerías</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/restaurantes/murcia">Restaurantes</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/clinicas/murcia">Clínicas</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/talleres/murcia">Talleres</Link>
                            <Link className="text-primary hover:text-primary-hover transition-colors font-medium" to="/sectores">
                                Ver todos los sectores →
                            </Link>
                        </div>
                    </div>

                    {/* Locations */}
                    <div>
                        <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Dónde Trabajamos</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            {locations.slice(0, 5).map((location) => (
                                <Link
                                    key={location.id}
                                    className="text-gray-500 hover:text-primary transition-colors"
                                    to={`/servicios/${location.slug}`}
                                >
                                    {location.name}
                                </Link>
                            ))}
                            <Link className="text-primary hover:text-primary-hover transition-colors font-medium" to="/servicios">
                                Ver todas las localidades →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="mb-4 md:mb-0">
                        <p>© {new Date().getFullYear()} Antes De Hacer. Todos los derechos reservados.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link className="hover:text-primary transition-colors" to="/legal">Aviso Legal</Link>
                        <Link className="hover:text-primary transition-colors" to="/privacidad">Privacidad</Link>
                        <Link className="hover:text-primary transition-colors" to="/cookies">Cookies</Link>
                        <Link className="hover:text-primary transition-colors" to="/contact">Contacto</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
