import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Blog = () => {
    const categories = [
        "Automatización",
        "Gestión",
        "Business Intelligence",
        "Productividad",
        "Facturación",
        "Inventario",
        "Restaurantes"
    ];

    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                console.error('Error fetching posts:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = selectedCategory === 'Todos'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className="relative pt-64 pb-48 min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none h-[50vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-40 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Blog
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                        Automatización <span className="text-primary">Sin Humo</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Guías prácticas, casos reales y soluciones honestas para pequeños negocios. Sin jerga técnica, solo resultados.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-24">
                    <button
                        onClick={() => setSelectedCategory('Todos')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedCategory === 'Todos'
                            ? 'bg-primary text-gray-900 shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                            : 'bg-surface-dark/40 border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === category
                                ? 'bg-primary text-gray-900 font-medium shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                                : 'bg-surface-dark/40 border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-mono text-sm animate-pulse tracking-widest">CARGANDO ARTÍCULOS...</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <motion.article
                                        layout
                                        key={post.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="group block bg-[#222222] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:bg-[#2a2a2a] h-full flex flex-col"
                                        >
                                            {/* Category Badge */}
                                            <div className="p-6 pb-4">
                                                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono mb-4">
                                                    {post.category}
                                                </div>

                                                <h2 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h2>

                                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-auto p-6 pt-0 flex items-center justify-between text-xs text-gray-500">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.read_time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.publish_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                            </div>

                                            {/* Bottom highlight */}
                                            <div className="h-1 bg-primary/30 w-0 group-hover:w-full transition-all duration-700"></div>
                                        </Link>
                                    </motion.article>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center"
                                >
                                    <p className="text-gray-400 text-lg">No hay artículos en esta categoría todavía.</p>
                                    <button
                                        onClick={() => setSelectedCategory('Todos')}
                                        className="mt-4 text-primary hover:underline font-mono text-sm"
                                    >
                                        Ver todos los artículos
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Blog;
