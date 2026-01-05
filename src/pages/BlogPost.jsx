import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import BlogRenderer from '../components/BlogRenderer';
import { supabase } from '../lib/supabaseClient';
import { blogPosts as localPosts } from '../data/blogPosts';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true);
            try {
                // Check local posts first
                const localPost = localPosts.find(p => p.slug === slug);

                if (localPost) {
                    setPost(localPost);

                    // Set related posts from local if possible
                    const related = localPosts.filter(p => p.category === localPost.category && p.slug !== slug).slice(0, 3);
                    setRelatedPosts(related);

                    // We still try to fetch related from Supabase if local is empty
                    if (related.length === 0) {
                        const { data: relatedData } = await supabase
                            .from('blog_posts')
                            .select('id, slug, title, category, excerpt')
                            .eq('category', localPost.category)
                            .neq('slug', slug)
                            .limit(3);
                        if (relatedData) setRelatedPosts(relatedData);
                    }
                } else {
                    // Fallback to Supabase
                    const { data: postData, error: postError } = await supabase
                        .from('blog_posts')
                        .select('*')
                        .eq('slug', slug)
                        .single();

                    if (postError) throw postError;
                    setPost(postData);

                    // Fetch related posts
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

    return (
        <div className="relative pt-32 pb-24 min-h-screen">
            {post && (
                <SEO
                    title={`${post.title} | Engorilate`}
                    description={post.meta_description || post.metaDescription}
                    type="article"
                    image={post.image || 'https://engorilate.com/og-image.jpg'}
                />
            )}
            <BackgroundMesh />

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
                        <div className="mb-20">
                            <BlogRenderer post={post} />
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
