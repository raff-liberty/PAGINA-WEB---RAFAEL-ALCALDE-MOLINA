import React from 'react';
import { X, Search, Share2, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SEOPreview = ({ isOpen, onClose, metaTitle, metaDescription, ogImage, url }) => {
    if (!isOpen) return null;

    const displayUrl = url || 'engorilate.com';
    const displayTitle = metaTitle || 'Título de la página';
    const displayDescription = metaDescription || 'Descripción de la página para SEO';
    const displayImage = ogImage || 'https://engorilate.com/og-image.jpg';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">Preview SEO</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Google Search Preview */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Search className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-white">Google Search</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                    E
                                </div>
                                <span className="text-sm text-gray-600">{displayUrl}</span>
                            </div>
                            <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1">
                                {displayTitle}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {displayDescription}
                            </p>
                        </div>
                    </div>

                    {/* Facebook/LinkedIn Preview */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Share2 className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-white">Facebook / LinkedIn</h3>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={displayImage}
                                alt="OG Preview"
                                className="w-full h-64 object-cover bg-gray-100"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"%3E%3Crect fill="%23ddd" width="1200" height="630"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="48" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                                }}
                            />
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="text-xs text-gray-500 uppercase mb-1">{displayUrl}</div>
                                <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                                    {displayTitle}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {displayDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Twitter Card Preview */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Twitter className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-white">Twitter Card</h3>
                        </div>
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 max-w-lg">
                            <img
                                src={displayImage}
                                alt="Twitter Card Preview"
                                className="w-full h-64 object-cover bg-gray-100"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"%3E%3Crect fill="%23ddd" width="1200" height="630"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="48" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                                }}
                            />
                            <div className="p-4">
                                <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                                    {displayTitle}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                    {displayDescription}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <span>🔗</span>
                                    <span>{displayUrl}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SEOPreview;
