import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Download,
    Edit,
    Trash2,
    Plus,
    X,
    Save,
    Eye,
    EyeOff,
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import {
    getAllLandingFiles,
    upsertLandingFile,
    deleteLandingFile,
    toggleLandingFileStatus
} from '../lib/landingFiles';
import { deletePDF } from '../lib/supabaseStorage';
import FileUploader from './FileUploader';

const LandingFileManager = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingFile, setEditingFile] = useState(null);
    const [showUploader, setShowUploader] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        const { data, error } = await getAllLandingFiles();
        if (!error && data) {
            setFiles(data);
        }
        setLoading(false);
    };

    const handleCreateNew = () => {
        setEditingFile({
            landing_key: '',
            title: '',
            description: '',
            file_url: '',
            file_name: '',
            file_size: null,
            version: '1.0',
            is_active: true
        });
        setShowUploader(true);
    };

    const handleEdit = (file) => {
        setEditingFile({ ...file });
        setShowUploader(false);
    };

    const handleSave = async () => {
        if (!editingFile.landing_key || !editingFile.title || !editingFile.file_url) {
            setSaveStatus('✗ Por favor completa todos los campos requeridos');
            setTimeout(() => setSaveStatus(''), 3000);
            return;
        }

        setSaveStatus('Guardando...');
        const { data, error } = await upsertLandingFile(editingFile);

        if (error) {
            setSaveStatus('✗ Error al guardar');
            console.error('Save error:', error);
        } else {
            setSaveStatus('✓ Guardado correctamente');
            fetchFiles();
            setTimeout(() => {
                setEditingFile(null);
                setSaveStatus('');
            }, 1500);
        }
    };

    const handleDelete = async (file) => {
        if (!confirm(`¿Estás seguro de eliminar "${file.title}"? Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            // Extract file path from URL if it's from our storage
            if (file.file_url.includes('supabase')) {
                const urlParts = file.file_url.split('/pdfs/');
                if (urlParts[1]) {
                    await deletePDF(urlParts[1]);
                }
            }

            await deleteLandingFile(file.id);
            fetchFiles();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error al eliminar el archivo');
        }
    };

    const handleToggleStatus = async (file) => {
        const { error } = await toggleLandingFileStatus(file.id, !file.is_active);
        if (!error) {
            fetchFiles();
        }
    };

    const handleFileUpload = (uploadedFile) => {
        setEditingFile(prev => ({
            ...prev,
            file_url: uploadedFile.url,
            file_name: uploadedFile.name,
            file_size: uploadedFile.size
        }));
        setShowUploader(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FileText className="w-6 h-6 text-primary" />
                            Archivos Descargables
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">
                            Gestiona los PDFs y archivos disponibles para descarga en las landing pages
                        </p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-white text-gray-900 font-bold rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo Archivo
                    </button>
                </div>

                {/* Files List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No hay archivos descargables aún</p>
                        </div>
                    ) : (
                        files.map(file => (
                            <div
                                key={file.id}
                                className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-primary/20 p-2 rounded-lg">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(file)}
                                            className={`p-2 rounded-lg transition-all ${file.is_active
                                                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                    : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                }`}
                                            title={file.is_active ? 'Desactivar' : 'Activar'}
                                        >
                                            {file.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(file)}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                        >
                                            <Edit className="w-4 h-4 text-white" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(file)}
                                            className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-white font-bold mb-1 truncate">{file.title}</h3>
                                <p className="text-xs text-primary mb-2 font-mono">{file.landing_key}</p>
                                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{file.description}</p>

                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Download className="w-3 h-3 text-gray-500" />
                                        <span className="text-xs text-gray-400">{file.download_count || 0} descargas</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded">
                                        v{file.version}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingFile && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingFile(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">
                                        {editingFile.id ? 'Editar Archivo' : 'Nuevo Archivo'}
                                    </h3>
                                    <button
                                        onClick={() => setEditingFile(null)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Landing Key */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Clave de Landing * <span className="text-xs text-gray-600">(ej: caos-operativo)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={editingFile.landing_key}
                                            onChange={(e) => setEditingFile({ ...editingFile, landing_key: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono"
                                            placeholder="caos-operativo"
                                        />
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Título *</label>
                                        <input
                                            type="text"
                                            value={editingFile.title}
                                            onChange={(e) => setEditingFile({ ...editingFile, title: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="El Caos Operativo Invisible"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                                        <textarea
                                            value={editingFile.description || ''}
                                            onChange={(e) => setEditingFile({ ...editingFile, description: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none h-20"
                                            placeholder="Breve descripción del contenido..."
                                        />
                                    </div>

                                    {/* Version */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Versión</label>
                                        <input
                                            type="text"
                                            value={editingFile.version}
                                            onChange={(e) => setEditingFile({ ...editingFile, version: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="1.0"
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Archivo PDF *
                                        </label>
                                        {editingFile.file_url && !showUploader ? (
                                            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                                                <FileText className="w-8 h-8 text-primary" />
                                                <div className="flex-1">
                                                    <p className="text-white text-sm font-bold">{editingFile.file_name}</p>
                                                    <a
                                                        href={editingFile.file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-primary hover:underline flex items-center gap-1"
                                                    >
                                                        Ver archivo <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                                <button
                                                    onClick={() => setShowUploader(true)}
                                                    className="px-3 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-lg transition-all text-sm font-bold"
                                                >
                                                    Reemplazar
                                                </button>
                                            </div>
                                        ) : (
                                            <FileUploader onUploadComplete={handleFileUpload} />
                                        )}
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={editingFile.is_active}
                                            onChange={(e) => setEditingFile({ ...editingFile, is_active: e.target.checked })}
                                            className="w-5 h-5 accent-primary rounded cursor-pointer"
                                        />
                                        <label htmlFor="is_active" className="text-white cursor-pointer">
                                            Archivo activo (visible para descarga)
                                        </label>
                                    </div>

                                    {/* Status Message */}
                                    {saveStatus && (
                                        <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${saveStatus.startsWith('✓')
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : saveStatus.startsWith('✗')
                                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    : 'bg-primary/10 text-primary border border-primary/20'
                                            }`}>
                                            {saveStatus.startsWith('✗') && <AlertCircle className="w-4 h-4" />}
                                            {saveStatus}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={() => setEditingFile(null)}
                                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 px-6 py-3 bg-primary hover:bg-white text-gray-900 font-bold rounded-lg transition-all shadow-[0_4px_15px_rgba(255,184,0,0.3)] flex items-center justify-center gap-2"
                                        >
                                            <Save className="w-5 h-5" />
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LandingFileManager;
