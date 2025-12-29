import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Eye, Edit, Plus, Trash2, Lock, Search, Filter, BookOpen, BarChart3, Copy, Upload, Download, Bold, Italic, List, ListOrdered, Quote, Table, CheckSquare } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';

const BlogAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'guidelines', 'stats'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const [selectedPostsForExport, setSelectedPostsForExport] = useState([]);

    // Editable fields
    const [editedTitle, setEditedTitle] = useState('');
    const [editedSlug, setEditedSlug] = useState('');
    const [editedExcerpt, setEditedExcerpt] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedReadTime, setEditedReadTime] = useState('');
    const [editedSavings, setEditedSavings] = useState('');
    const [editedPublishDate, setEditedPublishDate] = useState('');
    const [editedMetaDescription, setEditedMetaDescription] = useState('');

    const ADMIN_PASSWORD = 'engorilate2025';

    const categories = [
        "Pierdo tiempo",
        "Pierdo dinero",
        "Pierdo clientes",
        "Casos Reales",
        "Automatización",
        "Gestión"
    ];

    const editorialGuidelines = `# Línea Editorial Engorilate - "Zero Humo"

## Tono y Voz
- **Directo y sin rodeos**: Nada de "quizás" o "podría ser". Si funciona, funciona. Si no, no.
- **Guerrilla Marketing**: Agresivo, honesto, sin azúcar. Como un gorila que te dice las verdades que nadie más te dice.
- **Orientado a resultados**: Cada artículo debe ahorrar al menos 10 horas al mes al lector.

## Estructura de Posts
1. **Hook brutal**: Primera frase que golpea el dolor del lector
2. **El problema real**: Sin eufemismos, directo a la yugular
3. **La solución práctica**: Paso a paso, sin humo
4. **Plan de acción**: Qué hacer HOY, no "algún día"

## Palabras Clave
✅ Usar: "facturar", "libertad operativa", "dejar de trabajar como animal", "tiempo de vuelta"
❌ Evitar: "quizás", "podría", "tal vez", "en el futuro", palabrería corporativa

## Formato Markdown
- Headers: ## para secciones principales, ### para subsecciones
- **Negrita** para conceptos clave y números importantes
- > Blockquotes para frases impactantes o advertencias
- Tablas para comparaciones (Antes/Después, Herramienta/Coste)
- Listas para pasos de acción

## Métricas de Éxito
- Tiempo de lectura: 5-10 minutos máximo
- Ahorro estimado: Mínimo 10h/mes
- Llamada a la acción: Siempre presente, nunca agresiva

## Ejemplos de Títulos Buenos
- "Cómo Automatizar WhatsApp para tu Negocio en 2025"
- "ERP para Pequeños Negocios: ¿Lo Necesitas o es un Gasto Innecesario?"
- "Deja de Perder 15 Horas a la Semana en Email"

## Ejemplos de Títulos Malos
- "Mejora tu productividad con estos consejos"
- "La importancia de la automatización"
- "5 trucos que cambiarán tu negocio"`;

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
        setEditedTitle(post.title || '');
        setEditedSlug(post.slug || '');
        setEditedExcerpt(post.excerpt || '');
        setEditedCategory(post.category || '');
        setEditedContent(post.content || '');
        setEditedReadTime(post.read_time || '');
        setEditedSavings(post.savings || '');
        setEditedPublishDate(post.publish_date || '');
        setEditedMetaDescription(post.meta_description || post.metaDescription || '');
        setShowPreview(false);
        setActiveTab('editor');
    };

    const handleCreateNew = () => {
        const newPost = {
            id: 'new-' + Date.now(),
            title: 'Nuevo Post',
            slug: 'nuevo-post-' + Date.now(),
            excerpt: '',
            category: categories[0],
            content: '## Introducción\n\nEscribe tu contenido aquí...',
            read_time: '5 min',
            savings: '10h/mes',
            publish_date: new Date().toISOString().split('T')[0],
            meta_description: ''
        };
        handleSelectPost(newPost);
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (newTitle) => {
        setEditedTitle(newTitle);
        if (selectedPost?.id?.toString().startsWith('new-')) {
            setEditedSlug(generateSlug(newTitle));
        }
    };

    const handleSave = async () => {
        if (!selectedPost) return;

        setLoading(true);
        setSaveStatus('Guardando...');

        try {
            const postData = {
                title: editedTitle,
                slug: editedSlug,
                excerpt: editedExcerpt,
                category: editedCategory,
                content: editedContent,
                read_time: editedReadTime,
                savings: editedSavings,
                publish_date: editedPublishDate,
                meta_description: editedMetaDescription
            };

            if (selectedPost.id.toString().startsWith('new-')) {
                // Create new post
                const { error } = await supabase
                    .from('blog_posts')
                    .insert([postData]);

                if (error) throw error;
                setSaveStatus('✓ Post creado correctamente');
            } else {
                // Update existing post
                const { error } = await supabase
                    .from('blog_posts')
                    .update(postData)
                    .eq('id', selectedPost.id);

                if (error) throw error;
                setSaveStatus('✓ Guardado correctamente');
            }

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

    const handleDuplicate = () => {
        if (!selectedPost) return;

        const duplicatedPost = {
            ...selectedPost,
            id: 'new-' + Date.now(),
            title: selectedPost.title + ' (Copia)',
            slug: selectedPost.slug + '-copia-' + Date.now()
        };
        handleSelectPost(duplicatedPost);
    };

    const insertMarkdown = (before, after = '') => {
        const textarea = document.getElementById('content-editor');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = editedContent.substring(start, end);
        const newText = editedContent.substring(0, start) + before + selectedText + after + editedContent.substring(end);
        setEditedContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    const handleExportCSV = () => {
        const postsToExport = selectedPostsForExport.length > 0
            ? posts.filter(p => selectedPostsForExport.includes(p.id))
            : posts;

        if (postsToExport.length === 0) {
            alert('No hay posts para exportar');
            return;
        }

        // Create CSV content
        const headers = ['title', 'slug', 'excerpt', 'category', 'content', 'read_time', 'savings', 'publish_date', 'meta_description'];
        const csvRows = [headers.join(',')];

        postsToExport.forEach(post => {
            const row = headers.map(header => {
                const value = post[header] || '';
                // Escape quotes and wrap in quotes if contains comma or newline
                const escaped = String(value).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `blog_posts_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clear selection after export
        setSelectedPostsForExport([]);
    };

    const togglePostSelection = (postId) => {
        setSelectedPostsForExport(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedPostsForExport.length === filteredPosts.length) {
            setSelectedPostsForExport([]);
        } else {
            setSelectedPostsForExport(filteredPosts.map(p => p.id));
        }
    };

    const handleImportCSV = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const text = e.target.result;
                const lines = text.split('\n');
                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

                const postsToImport = [];

                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;

                    // Parse CSV line (handle quoted values with commas)
                    const values = [];
                    let current = '';
                    let inQuotes = false;

                    for (let char of lines[i]) {
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            values.push(current.replace(/^"|"$/g, '').replace(/""/g, '"'));
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    values.push(current.replace(/^"|"$/g, '').replace(/""/g, '"'));

                    const post = {};
                    headers.forEach((header, index) => {
                        post[header] = values[index] || '';
                    });

                    postsToImport.push(post);
                }

                if (postsToImport.length === 0) {
                    alert('No se encontraron posts válidos en el archivo CSV');
                    return;
                }

                if (!confirm(`¿Importar ${postsToImport.length} posts? Esto creará nuevos posts en la base de datos.`)) {
                    return;
                }

                setLoading(true);
                setSaveStatus('Importando posts...');

                const { error } = await supabase
                    .from('blog_posts')
                    .insert(postsToImport);

                if (error) throw error;

                setSaveStatus(`✓ ${postsToImport.length} posts importados correctamente`);
                fetchPosts();
                setTimeout(() => setSaveStatus(''), 3000);
            } catch (error) {
                console.error('Error importing CSV:', error);
                setSaveStatus('✗ Error al importar CSV');
                alert('Error al importar CSV: ' + error.message);
            } finally {
                setLoading(false);
                event.target.value = ''; // Reset file input
            }
        };

        reader.readAsText(file);
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const stats = {
        total: posts.length,
        byCategory: categories.map(cat => ({
            name: cat,
            count: posts.filter(p => p.category === cat).length
        }))
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
        <div className="relative min-h-screen pt-32 pb-12">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-white">Blog Admin Panel</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setActiveTab('editor')}
                            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'editor' ? 'bg-primary text-gray-900' : 'bg-black/30 text-white border border-white/20'}`}
                        >
                            <Edit className="w-4 h-4 inline mr-2" />
                            Editor
                        </button>
                        <button
                            onClick={() => setActiveTab('guidelines')}
                            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'guidelines' ? 'bg-primary text-gray-900' : 'bg-black/30 text-white border border-white/20'}`}
                        >
                            <BookOpen className="w-4 h-4 inline mr-2" />
                            Línea Editorial
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-primary text-gray-900' : 'bg-black/30 text-white border border-white/20'}`}
                        >
                            <BarChart3 className="w-4 h-4 inline mr-2" />
                            Estadísticas
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>

                {activeTab === 'guidelines' && (
                    <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                        <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                {editorialGuidelines}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="space-y-6">
                        {/* Export/Import Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all"
                            >
                                <Download className="w-5 h-5" />
                                Exportar {selectedPostsForExport.length > 0 ? `${selectedPostsForExport.length} Posts` : 'Todos los Posts'} (CSV)
                            </button>
                            <label className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all cursor-pointer border border-white/20">
                                <Upload className="w-5 h-5" />
                                Importar Posts (CSV)
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleImportCSV}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <h2 className="text-2xl font-bold text-white mb-6">Resumen General</h2>
                                <div className="text-6xl font-bold text-primary mb-2">{stats.total}</div>
                                <p className="text-gray-400">Posts totales</p>
                            </div>
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <h2 className="text-2xl font-bold text-white mb-6">Por Categoría</h2>
                                <div className="space-y-3">
                                    {stats.byCategory.map((cat, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-gray-300">{cat.name}</span>
                                            <span className="text-primary font-bold">{cat.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Posts List */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <div className="mb-4">
                                    <button
                                        onClick={handleCreateNew}
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3 rounded-lg transition-all mb-4"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Nuevo Post
                                    </button>

                                    <div className="relative mb-3">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Buscar..."
                                            className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                        />
                                    </div>

                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-primary focus:outline-none mb-3"
                                    >
                                        <option value="all">Todas las categorías</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>

                                    <div className="flex items-center justify-between mb-2">
                                        <button
                                            onClick={toggleSelectAll}
                                            className="text-xs text-primary hover:text-primary-hover transition-colors"
                                        >
                                            {selectedPostsForExport.length === filteredPosts.length && filteredPosts.length > 0
                                                ? 'Deseleccionar todos'
                                                : 'Seleccionar todos'}
                                        </button>
                                        {selectedPostsForExport.length > 0 && (
                                            <span className="text-xs text-gray-400">
                                                {selectedPostsForExport.length} seleccionados
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="max-h-[60vh] overflow-y-auto space-y-2">
                                    {loading && posts.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                                        </div>
                                    ) : (
                                        filteredPosts.map((post) => (
                                            <div
                                                key={post.id}
                                                className={`p-4 rounded-lg cursor-pointer transition-all ${selectedPost?.id === post.id
                                                    ? 'bg-primary/20 border border-primary/50'
                                                    : 'bg-black/30 border border-white/10 hover:border-white/30'
                                                    }`}
                                                onClick={() => handleSelectPost(post)}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedPostsForExport.includes(post.id)}
                                                            onChange={(e) => {
                                                                e.stopPropagation();
                                                                togglePostSelection(post.id);
                                                            }}
                                                            className="mt-1 w-4 h-4 rounded border-white/20 bg-black/30 text-primary focus:ring-primary focus:ring-offset-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-bold text-white truncate">{post.title}</h3>
                                                            <p className="text-xs text-gray-400 mt-1">{post.category}</p>
                                                        </div>
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
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="lg:col-span-2">
                            {selectedPost ? (
                                <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-white">
                                            {selectedPost.id.toString().startsWith('new-') ? 'Crear Nuevo Post' : 'Editar Post'}
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            {saveStatus && (
                                                <span className="text-sm text-primary">{saveStatus}</span>
                                            )}
                                            {!selectedPost.id.toString().startsWith('new-') && (
                                                <button
                                                    onClick={handleDuplicate}
                                                    className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white hover:border-primary/50 transition-all"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                    Duplicar
                                                </button>
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
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                                                    <input
                                                        type="text"
                                                        value={editedTitle}
                                                        onChange={(e) => handleTitleChange(e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Slug</label>
                                                    <input
                                                        type="text"
                                                        value={editedSlug}
                                                        onChange={(e) => setEditedSlug(e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Categoría</label>
                                                    <select
                                                        value={editedCategory}
                                                        onChange={(e) => setEditedCategory(e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    >
                                                        {categories.map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Tiempo Lectura</label>
                                                    <input
                                                        type="text"
                                                        value={editedReadTime}
                                                        onChange={(e) => setEditedReadTime(e.target.value)}
                                                        placeholder="5 min"
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Ahorro</label>
                                                    <input
                                                        type="text"
                                                        value={editedSavings}
                                                        onChange={(e) => setEditedSavings(e.target.value)}
                                                        placeholder="10h/mes"
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Fecha Publicación</label>
                                                <input
                                                    type="date"
                                                    value={editedPublishDate}
                                                    onChange={(e) => setEditedPublishDate(e.target.value)}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                                                <textarea
                                                    value={editedExcerpt}
                                                    onChange={(e) => setEditedExcerpt(e.target.value)}
                                                    rows={2}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Meta Description (SEO)</label>
                                                <textarea
                                                    value={editedMetaDescription}
                                                    onChange={(e) => setEditedMetaDescription(e.target.value)}
                                                    rows={2}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Markdown Helpers</label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <button onClick={() => insertMarkdown('## ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50">H2</button>
                                                    <button onClick={() => insertMarkdown('### ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50">H3</button>
                                                    <button onClick={() => insertMarkdown('**', '**')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><Bold className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('> ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><Quote className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('- ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><List className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('1. ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><ListOrdered className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('[ ] ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><CheckSquare className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('| Columna 1 | Columna 2 |\n|---|---|\n| ', ' |  |')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><Table className="w-4 h-4" /></button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Contenido (Markdown)</label>
                                                <textarea
                                                    id="content-editor"
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                    rows={18}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm resize-none"
                                                    placeholder="Escribe tu contenido en Markdown..."
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-black/30 border border-white/20 rounded-lg p-6 max-h-[70vh] overflow-y-auto">
                                            <div className="mb-4 flex gap-2">
                                                <span className="px-3 py-1 bg-primary text-gray-900 text-xs font-bold rounded">Zero Humo</span>
                                                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded">{editedCategory}</span>
                                                <span className="px-3 py-1 bg-white/10 text-gray-400 text-xs rounded">{editedSavings}</span>
                                            </div>
                                            <h1 className="text-3xl font-bold text-white mb-4">{editedTitle}</h1>
                                            <p className="text-gray-400 italic mb-6">"{editedExcerpt}"</p>
                                            <div className="text-sm text-gray-500 mb-6">
                                                {editedReadTime} • {editedPublishDate}
                                            </div>
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
                                    <p className="text-gray-400">Selecciona un post para editar o crea uno nuevo</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogAdmin;
