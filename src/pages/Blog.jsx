import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, AlertTriangle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { blogPosts as localPosts } from '../data/blogPosts';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

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
    const [showManifesto, setShowManifesto] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                // Initialize with local posts first
                let combinedPosts = [...localPosts];

                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .order('publish_date', { ascending: false });

                if (!error && data && data.length > 0) {
                    // Filter out local posts if they already exist in Supabase by slug
                    const supabaseSlugs = data.map(p => p.slug);
                    const uniqueLocal = localPosts.filter(p => !supabaseSlugs.includes(p.slug));
                    combinedPosts = [...uniqueLocal, ...data];
                }

                setPosts(combinedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
                setPosts(localPosts); // Fallback to local on error
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
            <SEO
                title="Blog | El Coste del Caos"
                description="Artículos sin humo sobre automatización. Si no te ahorra tiempo o dinero, no lo escribimos."
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-40 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(110,231,183,0.1)]">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Blog del Gorila
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black leading-tight mb-8 text-white tracking-tighter uppercase italic">
                        Automatización <br />
                        <span className="text-primary drop-shadow-[0_0_30px_rgba(110,231,183,0.3)]">Sin Humo</span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed italic border-l-4 border-primary/30 pl-6 mb-8 md:mb-0">
                            "Si el artículo no te ahorra al menos 10 horas al mes, no lo publicamos. Aquí venimos a facturar, no a leer cuentos de hadas."
                        </p>

                        <button
                            onClick={() => setShowManifesto(!showManifesto)}
                            className="group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden whitespace-nowrap"
                        >
                            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <AlertTriangle className="w-5 h-5 text-primary relative z-10" />
                            <span className="font-mono text-sm tracking-widest uppercase relative z-10">
                                {showManifesto ? 'Cerrar Reglas' : 'Leer el Manifiesto'}
                            </span>
                            {showManifesto ? <ChevronUp className="w-4 h-4 text-primary relative z-10" /> : <ChevronDown className="w-4 h-4 text-primary relative z-10" />}
                        </button>
                    </div>

                    {/* Gorilla Manifesto - Gamberra Edition */}
                    <AnimatePresence>
                        {showManifesto && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-primary/30 relative overflow-hidden shadow-[0_0_50px_rgba(110,231,183,0.1)]">
                                    {/* Danger Stripes Decor */}
                                    <div className="absolute top-0 right-0 w-32 h-8 bg-primary/20 -rotate-45 translate-x-12 -translate-y-4 flex items-center justify-center">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-tighter">WARNING</span>
                                    </div>

                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="font-display text-3xl font-black text-white uppercase italic tracking-tighter mb-6">
                                                Las Reglas de <span className="text-primary">esta Casa</span>
                                            </h3>
                                            <div className="space-y-6">
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold">1</div>
                                                    <div>
                                                        <h4 className="text-white font-bold uppercase tracking-tight mb-1">Zero Humo</h4>
                                                        <p className="text-gray-400 text-sm leading-relaxed">Si te lo cuento, es porque lo he probado y funciona. Si te digo que algo es una mierda, es porque lo es. Aquí no vendemos humo de colores.</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold">2</div>
                                                    <div>
                                                        <h4 className="text-white font-bold uppercase tracking-tight mb-1">El tiempo es oro</h4>
                                                        <p className="text-gray-400 text-sm leading-relaxed">Si un post te lleva 10 minutos leerlo, es porque te va a ahorrar al menos 10 horas este mes. Si no, no lo publicamos.</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold">3</div>
                                                    <div>
                                                        <h4 className="text-white font-bold uppercase tracking-tight mb-1">Directo a la Yugular</h4>
                                                        <p className="text-gray-400 text-sm leading-relaxed">No hay azúcar. Si tu proceso está roto, te lo diré. Si estás tirando el dinero, también. Lo honesto es lo que factura.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 flex flex-col justify-center">
                                            <h3 className="font-display text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                                                Misión del <span className="text-primary text-4xl block mt-2">Gorila</span>
                                            </h3>
                                            <p className="text-gray-300 italic leading-relaxed mb-6">
                                                "Aquí no hemos venido a leer. Hemos venido a dejar de trabajar como animales para empezar a facturar como humanos."
                                            </p>
                                            <div className="flex items-center gap-4 py-4 border-t border-primary/20">
                                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                    <AlertTriangle className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.2em] leading-tight">
                                                    Lectura recomendada <br /> solo para valientes
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto md:flex-wrap gap-3 mb-24 pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    <button
                        onClick={() => setSelectedCategory('Todos')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex-shrink-0 ${selectedCategory === 'Todos'
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
                            className={`px-4 py-2 rounded-lg text-sm transition-all flex-shrink-0 ${selectedCategory === category
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
