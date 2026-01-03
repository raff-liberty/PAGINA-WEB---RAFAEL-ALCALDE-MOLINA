import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage } from '../lib/supabaseStorage';

const ImageUploader = ({ onUploadComplete, maxSizeMB = 5, acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'] }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateFile = (file) => {
        // Check file type
        if (!acceptedTypes.includes(file.type)) {
            setError(`Tipo de archivo no permitido. Solo: ${acceptedTypes.join(', ')}`);
            return false;
        }

        // Check file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`Archivo muy grande. Máximo ${maxSizeMB}MB`);
            return false;
        }

        return true;
    };

    const handleFile = async (file) => {
        setError('');
        setSuccess('');

        if (!validateFile(file)) {
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);

        // Upload
        setUploading(true);
        try {
            const publicUrl = await uploadImage(file, 'og-images');
            setSuccess('✓ Imagen subida correctamente');
            if (onUploadComplete) {
                onUploadComplete(publicUrl);
            }
            setTimeout(() => {
                setPreview(null);
                setSuccess('');
            }, 2000);
        } catch (err) {
            console.error('Upload error:', err);
            setError('✗ Error al subir imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept={acceptedTypes.join(',')}
                    onChange={handleFileInput}
                    disabled={uploading}
                />

                {!preview ? (
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-white mb-2">
                            Arrastra una imagen o <span className="text-primary">haz click para seleccionar</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Máximo {maxSizeMB}MB • JPG, PNG, WEBP
                        </p>
                    </label>
                ) : (
                    <div className="space-y-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-lg"
                        />
                        {uploading && (
                            <div className="flex items-center justify-center gap-2 text-primary">
                                <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <span>Subiendo...</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span>{success}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageUploader;
