import React, { useState } from 'react';
import { Upload, File, X, Loader } from 'lucide-react';

const DocumentUploader = ({ onUpload, accept = "*/*", maxSize = 10 * 1024 * 1024, category, description, setDescription }) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.size > maxSize) {
            alert(`El archivo es demasiado grande. Máximo ${maxSize / 1024 / 1024}MB`);
            return;
        }
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        await onUpload(selectedFile, category, description);
        setUploading(false);
        setSelectedFile(null);
        if (setDescription) setDescription('');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-3">
            {/* Drag & Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${dragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleChange}
                    accept={accept}
                />

                {!selectedFile ? (
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                    >
                        <Upload className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-white mb-1">
                            Arrastra un archivo o <span className="text-primary font-medium">haz click para seleccionar</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Máximo {maxSize / 1024 / 1024}MB
                        </p>
                    </label>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <File className="w-8 h-8 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                                <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedFile(null)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                )}
            </div>

            {/* Description Input */}
            {selectedFile && setDescription && (
                <input
                    type="text"
                    placeholder="Descripción del archivo (opcional)"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
            )}

            {/* Upload Button */}
            {selectedFile && (
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {uploading ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Subiendo...
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" />
                            Subir Archivo
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default DocumentUploader;
