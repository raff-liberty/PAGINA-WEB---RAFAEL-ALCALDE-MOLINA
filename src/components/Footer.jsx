import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { locations } from '../data/locations';

const Footer = () => {
    const location = useLocation();
    const isLandingPage = ['/rafael-alcalde-molina', '/sobre-mi'].includes(location.pathname);

    if (isLandingPage) {
        return (
            <footer className="py-8 border-t border-white/5 bg-background-light dark:bg-background-dark relative z-10">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6EE7B7 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <div className="mb-4 md:mb-0">
                            <p>© {new Date().getFullYear()} Engorilate. Rafael Alcalde Molina.</p>
                        </div>
                        <div className="flex space-x-6 text-xs">
                            <Link className="hover:text-primary transition-colors" to="/legal">Aviso Legal</Link>
                            <Link className="hover:text-primary transition-colors" to="/privacidad">Privacidad</Link>
                            <Link className="hover:text-primary transition-colors" to="/cookies">Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="py-16 border-t border-white/5 bg-background-light dark:bg-background-dark relative z-10">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6EE7B7 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-display font-bold text-lg text-white mb-4">Engorilate</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Automatización y Sistemas para Pequeñas Empresas. Ponemos orden en tu negocio para que recuperes tu tiempo.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Enlaces</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/como-trabajamos">Cómo Trabajamos</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/rafael-alcalde-molina">Sobre mí</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/contact">Contacto</Link>
                        </div>
                    </div>

                    {/* Recursos */}
                    <div>
                        <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Recursos</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/blog">Blog</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/peluquerias/murcia">Peluquerías</Link>
                            <Link className="text-gray-500 hover:text-primary transition-colors" to="/clinicas/murcia">Clínicas</Link>
                            <Link className="text-primary hover:text-primary-hover transition-colors font-medium" to="/sectores">
                                Ver todos los sectores →
                            </Link>
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div>
                        <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Hablemos</h4>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="mailto:r.alcalde@engorilate.com" className="text-gray-500 hover:text-primary transition-colors">r.alcalde@engorilate.com</a>
                            <Link className="text-primary hover:text-primary-hover transition-colors font-medium" to="/contact">
                                Pedir Diagnóstico Gratuito →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Directorio de Localidades para SEO - Elimina páginas huérfanas */}
                <div className="pt-12 mb-12 border-t border-white/5">
                    <h4 className="font-display font-semibold text-[10px] text-white/40 mb-6 uppercase tracking-[0.2em]">Automatización en la Región de Murcia</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-2 text-[9px] sm:text-[10px]">
                        {locations.map((loc) => (
                            <Link
                                key={loc.id}
                                to={`/peluquerias/${loc.slug}`}
                                className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                            >
                                {loc.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="mb-4 md:mb-0">
                        <p>© {new Date().getFullYear()} Engorilate. Rafael Alcalde Molina.</p>
                    </div>
                    <div className="flex space-x-6 text-xs">
                        <Link className="hover:text-primary transition-colors" to="/legal">Aviso Legal</Link>
                        <Link className="hover:text-primary transition-colors" to="/privacidad">Privacidad</Link>
                        <Link className="hover:text-primary transition-colors" to="/cookies">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
