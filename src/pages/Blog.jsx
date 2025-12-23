import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Blog = () => {
    const categories = [
        "Pierdo tiempo",
        "Pierdo dinero",
        "Pierdo clientes",
        "Casos Reales",
        "Automatización",
        "Gestión"
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
        : posts.filter(post => post.category === selectedCategory || post.pain_point === selectedCategory);

    return (
        <div className="relative pt-64 pb-48 min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none h-[50vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-40 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(110,231,183,0.1)]">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Blog del Gorila
                    </div>
                    <h1 className="font-display text-5xl md:text-8xl font-black leading-tight mb-8 text-white tracking-tighter uppercase italic">
                        Automatización <br />
                        <span className="text-primary drop-shadow-[0_0_30px_rgba(110,231,183,0.3)]">Sin Humo</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed italic border-l-4 border-primary/30 pl-6">
                        "Si el artículo no te ahorra al menos 10 horas al mes, no lo publicamos. Aquí venimos a facturar, no a leer cuentos de hadas."
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
                                            className="group relative block bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(110,231,183,0.15)] h-full flex flex-col"
                                        >
                                            {/* Top indicators */}
                                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                                <div className="px-2 py-1 rounded bg-primary text-gray-900 text-[10px] font-black uppercase tracking-tighter shadow-[0_0_10px_rgba(110,231,183,0.5)]">
                                                    Zero Humo
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8 pb-4 relative z-10">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="h-px w-8 bg-primary/30"></div>
                                                    <span className="text-primary text-[10px] font-mono uppercase tracking-[0.2em]">
                                                        {post.category}
                                                    </span>
                                                </div>

                                                <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-primary transition-colors leading-[1.1] tracking-tight">
                                                    {post.title}
                                                </h2>

                                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light italic">
                                                    "{post.excerpt}"
                                                </p>

                                                {/* Potential Savings Indicator */}
                                                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-primary/20 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Ahorro Estimado</span>
                                                        <span className="text-primary font-bold text-sm">~{post.savings || '10h/mes'}</span>
                                                    </div>
                                                    <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: '70%' }}
                                                            className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-1000"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-auto p-8 pt-0 flex items-center justify-between text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                                <div className="flex items-center gap-6">
                                                    <span className="flex items-center gap-2">
                                                        <Clock className="w-3 h-3 text-primary" />
                                                        {post.read_time}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Calendar className="w-3 h-3 text-primary" />
                                                        {new Date(post.publish_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                                                    <span>LEER</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>

                                            {/* Hover Glow */}
                                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
