import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true);
            try {
                // Fetch current post
                const { data: postData, error: postError } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (postError) throw postError;
                setPost(postData);

                // Fetch related posts (same category, different slug)
                if (postData) {
                    const { data: relatedData } = await supabase
                        .from('blog_posts')
                        .select('id, slug, title, category, excerpt')
                        .eq('category', postData.category)
                        .neq('slug', slug)
                        .limit(3);

                    setRelatedPosts(relatedData || []);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [slug]);

    // Redirect if post doesn't exist (after loading)
    if (!loading && !post) {
        return <Navigate to="/blog" replace />;
    }

    // Set page title and meta
    useEffect(() => {
        if (post) {
            document.title = `${post.title} | Engorilate`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', post.meta_description || post.metaDescription);
            }
        }
    }, [post]);

    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none h-[60vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Back to Blog */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al blog
                </Link>

                {/* Article Header */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-mono text-sm animate-pulse tracking-widest">CARGANDO ARTÍCULO...</p>
                    </div>
                ) : (
                    <article>
                        <div className="mb-12 border-b border-white/5 pb-12">
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary text-gray-900 text-xs font-black uppercase tracking-tighter shadow-[0_0_15px_rgba(110,231,183,0.3)]">
                                    Zero Humo
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
                                    {post.category}
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5 text-gray-400 text-xs font-mono uppercase tracking-widest">
                                    Ahorro: {post.savings || '10h/mes'}
                                </div>
                            </div>

                            <h1 className="font-display text-4xl md:text-7xl font-black leading-[1.05] mb-8 text-white tracking-tighter uppercase italic">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-mono uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                    {new Date(post.publish_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    {post.read_time} de lectura
                                </span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-invert prose-lg max-w-none mb-20">
                            <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden">
                                {/* Subtle industrial accent */}
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <div className="w-32 h-32 border-8 border-primary rounded-full"></div>
                                </div>

                                <div className="relative z-10 text-gray-300 leading-relaxed space-y-8 blog-content text-lg font-light">
                                    {(post.content || post.excerpt || '').split('\n').map((line, idx) => {
                                        // Headers
                                        if (line.startsWith('## ')) {
                                            return <h2 key={idx} className="text-3xl font-display font-black text-white mt-12 mb-6 uppercase tracking-tight italic border-b border-primary/20 pb-4">{line.replace('## ', '')}</h2>;
                                        }
                                        // Horizontal rule
                                        if (line === '---') {
                                            return <hr key={idx} className="border-white/5 my-12" />;
                                        }
                                        // Empty line
                                        if (line.trim() === '') {
                                            return <div key={idx} className="h-4" />;
                                        }
                                        // Bold text with **
                                        if (line.includes('**')) {
                                            const parts = line.split('**');
                                            return (
                                                <p key={idx} className="leading-relaxed">
                                                    {parts.map((part, i) =>
                                                        i % 2 === 1 ? <strong key={i} className="text-white font-bold bg-primary/10 px-1 rounded">{part}</strong> : part
                                                    )}
                                                </p>
                                            );
                                        }
                                        // List items
                                        if (line.startsWith('- ')) {
                                            return (
                                                <div key={idx} className="flex items-start gap-4 ml-2">
                                                    <span className="text-primary font-bold mt-1">▸</span>
                                                    <span className="leading-relaxed">{line.replace('- ', '')}</span>
                                                </div>
                                            );
                                        }
                                        // Regular paragraph
                                        return <p key={idx} className="leading-relaxed">{line}</p>;
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Paso a paso Engorilao */}
                        <div className="mt-16 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-hover rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-[#0f0f0f] border border-primary/20 p-10 md:p-14 rounded-3xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/20 rounded-xl text-primary font-bold animate-pulse">
                                        PLAN DE ACCIÓN
                                    </div>
                                    <h3 className="font-display text-3xl font-black text-white uppercase italic tracking-tighter">
                                        Paso a paso <span className="text-primary italic underline decoration-wavy">Engorilao</span>
                                    </h3>
                                </div>

                                <div className="space-y-6 text-left mb-10">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">1</div>
                                        <p className="text-gray-300"><strong>Identifica el dolor:</strong> Relee este post y confirma si de verdad te está pasando esto. Si no, no pierdas el tiempo.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">2</div>
                                        <p className="text-gray-300"><strong>Mide el coste:</strong> Calcula cuántas horas reales estás tirando a la basura a la semana por este proceso.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">3</div>
                                        <p className="text-gray-300"><strong>Pega el grito:</strong> Si el coste es alto, escríbeme. No te voy a vender un software, te voy a dar libertad.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-black px-10 py-5 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(110,231,183,0.2)] uppercase tracking-tighter"
                                    >
                                        <span>Quiero mi tiempo de vuelta</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to="/sobre-mi"
                                        className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-xl border border-white/10 transition-all uppercase tracking-tighter"
                                    >
                                        ¿Quién es este tío?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-32">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px w-12 bg-primary/30"></div>
                            <h3 className="font-display text-2xl font-black text-white uppercase italic tracking-tighter">
                                Más munición <span className="text-primary italic">Sin Humo</span>
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group block bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1f1f1f]"
                                >
                                    <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary"></div>
                                        {relatedPost.category}
                                    </div>
                                    <h4 className="font-display text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        {relatedPost.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono group-hover:gap-4 transition-all">
                                        <span>LEER</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
