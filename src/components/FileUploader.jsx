import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadPDF } from '../lib/supabaseStorage';

const FileUploader = ({ onUploadComplete, maxSizeMB = 10, acceptedTypes = ['application/pdf'] }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const validateFile = (file) => {
        // Check file type
        if (!acceptedTypes.includes(file.type)) {
            setError(`Tipo de archivo no permitido. Solo PDF.`);
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

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleFile = async (file) => {
        setError('');
        setSuccess('');
        setUploadProgress(0);

        if (!validateFile(file)) {
            return;
        }

        setSelectedFile({
            name: file.name,
            size: formatFileSize(file.size),
            rawSize: file.size
        });

        // Upload
        setUploading(true);
        try {
            // Simulate progress (since Supabase doesn't provide real-time progress)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const publicUrl = await uploadPDF(file, 'downloads');

            clearInterval(progressInterval);
            setUploadProgress(100);

            setSuccess('✓ Archivo subido correctamente');
            if (onUploadComplete) {
                onUploadComplete({
                    url: publicUrl,
                    name: file.name,
                    size: file.size
                });
            }

            setTimeout(() => {
                setSelectedFile(null);
                setSuccess('');
                setUploadProgress(0);
            }, 2000);
        } catch (err) {
            console.error('Upload error:', err);
            setError('✗ Error al subir archivo: ' + (err.message || 'Error desconocido'));
            setUploadProgress(0);
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

    const clearFile = () => {
        setSelectedFile(null);
        setError('');
        setSuccess('');
        setUploadProgress(0);
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
                    id="pdf-upload"
                    className="hidden"
                    accept={acceptedTypes.join(',')}
                    onChange={handleFileInput}
                    disabled={uploading}
                />

                {!selectedFile ? (
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-white mb-2">
                            Arrastra un PDF o <span className="text-primary">haz click para seleccionar</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Máximo {maxSizeMB}MB • Solo archivos PDF
                        </p>
                    </label>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4 p-4 bg-white/5 rounded-lg">
                            <FileText className="w-10 h-10 text-primary" />
                            <div className="flex-1 text-left">
                                <p className="text-white font-bold text-sm truncate max-w-[300px]">
                                    {selectedFile.name}
                                </p>
                                <p className="text-gray-400 text-xs">{selectedFile.size}</p>
                            </div>
                            {!uploading && (
                                <button
                                    onClick={clearFile}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {uploading && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Subiendo...</span>
                                    <span className="text-primary font-bold">{uploadProgress}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
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

export default FileUploader;
