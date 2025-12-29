import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Eye, Edit, Plus, Trash2, Lock } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';

const BlogAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedTitle, setEditedTitle] = useState('');
    const [editedExcerpt, setEditedExcerpt] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const ADMIN_PASSWORD = 'engorilate2025'; // Cambiar esto por una contraseña segura

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('publish_date', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const handleSelectPost = (post) => {
        setSelectedPost(post);
        setEditedContent(post.content || '');
        setEditedTitle(post.title || '');
        setEditedExcerpt(post.excerpt || '');
        setEditedCategory(post.category || '');
        setShowPreview(false);
    };

    const handleSave = async () => {
        if (!selectedPost) return;

        setLoading(true);
        setSaveStatus('Guardando...');

        try {
            const { error } = await supabase
                .from('blog_posts')
                .update({
                    content: editedContent,
                    title: editedTitle,
                    excerpt: editedExcerpt,
                    category: editedCategory
                })
                .eq('id', selectedPost.id);

            if (error) throw error;

            setSaveStatus('✓ Guardado correctamente');
            fetchPosts();

            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving post:', error);
            setSaveStatus('✗ Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;

            if (selectedPost?.id === postId) {
                setSelectedPost(null);
            }
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <BackgroundMesh />
                <div className="relative z-10 max-w-md w-full mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#222222] border border-white/30 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-6 h-6 text-primary" />
                            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                        </div>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:border-primary focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3 rounded-lg transition-all"
                            >
                                Entrar
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pt-24 pb-12">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-white">Blog Admin Panel</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Cerrar sesión
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Posts List */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)] max-h-[80vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-white mb-4">Posts ({posts.length})</h2>

                            {loading && posts.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {posts.map((post) => (
                                        <div
                                            key={post.id}
                                            className={`p-4 rounded-lg cursor-pointer transition-all ${selectedPost?.id === post.id
                                                    ? 'bg-primary/20 border border-primary/50'
                                                    : 'bg-black/30 border border-white/10 hover:border-white/30'
                                                }`}
                                            onClick={() => handleSelectPost(post)}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-bold text-white truncate">{post.title}</h3>
                                                    <p className="text-xs text-gray-400 mt-1">{post.category}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(post.id);
                                                    }}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="lg:col-span-2">
                        {selectedPost ? (
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Editar Post</h2>
                                    <div className="flex items-center gap-3">
                                        {saveStatus && (
                                            <span className="text-sm text-primary">{saveStatus}</span>
                                        )}
                                        <button
                                            onClick={() => setShowPreview(!showPreview)}
                                            className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white hover:border-primary/50 transition-all"
                                        >
                                            {showPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {showPreview ? 'Editar' : 'Preview'}
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            Guardar
                                        </button>
                                    </div>
                                </div>

                                {!showPreview ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                                            <input
                                                type="text"
                                                value={editedTitle}
                                                onChange={(e) => setEditedTitle(e.target.value)}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Categoría</label>
                                            <input
                                                type="text"
                                                value={editedCategory}
                                                onChange={(e) => setEditedCategory(e.target.value)}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                                            <textarea
                                                value={editedExcerpt}
                                                onChange={(e) => setEditedExcerpt(e.target.value)}
                                                rows={3}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Contenido (Markdown)</label>
                                            <textarea
                                                value={editedContent}
                                                onChange={(e) => setEditedContent(e.target.value)}
                                                rows={20}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm resize-none"
                                                placeholder="Escribe tu contenido en Markdown..."
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-black/30 border border-white/20 rounded-lg p-6 max-h-[70vh] overflow-y-auto">
                                        <h1 className="text-3xl font-bold text-white mb-4">{editedTitle}</h1>
                                        <p className="text-gray-400 italic mb-6">"{editedExcerpt}"</p>
                                        <div className="prose prose-invert max-w-none">
                                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                {editedContent}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.9)] text-center">
                                <Edit className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">Selecciona un post para editar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogAdmin;
