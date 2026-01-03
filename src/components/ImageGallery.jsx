import React, { useState, useEffect } from 'react';
import { X, Trash2, Copy, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { listImages, deleteImage } from '../lib/supabaseStorage';

const ImageGallery = ({ isOpen, onClose, onSelectImage, selectedUrl }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchImages();
        }
    }, [isOpen]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const ogImages = await listImages('og-images');
            setImages(ogImages);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (filePath) => {
        if (!confirm('¿Eliminar esta imagen?')) return;

        try {
            await deleteImage(filePath);
            setImages(images.filter(img => img.path !== filePath));
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error al eliminar imagen');
        }
    };

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(''), 2000);
    };

    const handleSelect = (url) => {
        if (onSelectImage) {
            onSelectImage(url);
        }
        onClose();
    };

    if (!isOpen) return null;

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
                    className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-primary" />
                            Galería de Imágenes
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && images.length === 0 && (
                        <div className="text-center py-12">
                            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No hay imágenes subidas</p>
                            <p className="text-sm text-gray-500 mt-2">Sube tu primera imagen desde el botón de arriba</p>
                        </div>
                    )}

                    {/* Image Grid */}
                    {!loading && images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <div
                                    key={image.path}
                                    className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedUrl === image.publicUrl
                                            ? 'border-primary'
                                            : 'border-white/10 hover:border-white/30'
                                        }`}
                                    onClick={() => handleSelect(image.publicUrl)}
                                >
                                    <img
                                        src={image.publicUrl}
                                        alt={image.name}
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopyUrl(image.publicUrl);
                                            }}
                                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                            title="Copiar URL"
                                        >
                                            {copiedUrl === image.publicUrl ? (
                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                            ) : (
                                                <Copy className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(image.path);
                                            }}
                                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-5 h-5 text-red-400" />
                                        </button>
                                    </div>

                                    {/* Selected Indicator */}
                                    {selectedUrl === image.publicUrl && (
                                        <div className="absolute top-2 right-2 bg-primary text-gray-900 rounded-full p-1">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    )}

                                    {/* File Name */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                                        <p className="text-xs text-white truncate">{image.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageGallery;
