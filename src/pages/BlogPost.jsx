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
            document.title = `${post.title} | Antes De Hacer`;

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
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-primary text-xs font-mono mb-6">
                                {post.category}
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.publish_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.read_time} de lectura
                                </span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="bg-[#222222] border border-white/10 p-8 md:p-12 rounded-2xl">
                                <div className="text-gray-300 leading-relaxed space-y-6 blog-content">
                                    {(post.content || post.excerpt).split('\n').map((line, idx) => {
                                        // Headers
                                        if (line.startsWith('## ')) {
                                            return <h2 key={idx} className="text-2xl font-display font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
                                        }
                                        // Horizontal rule
                                        if (line === '---') {
                                            return <hr key={idx} className="border-white/10 my-8" />;
                                        }
                                        // Empty line
                                        if (line.trim() === '') {
                                            return <div key={idx} className="h-2" />;
                                        }
                                        // Bold text with **
                                        if (line.includes('**')) {
                                            const parts = line.split('**');
                                            return (
                                                <p key={idx} className="leading-relaxed">
                                                    {parts.map((part, i) =>
                                                        i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                                                    )}
                                                </p>
                                            );
                                        }
                                        // List items
                                        if (line.startsWith('- ')) {
                                            return <li key={idx} className="ml-6 leading-relaxed">{line.replace('- ', '')}</li>;
                                        }
                                        // Links
                                        if (line.includes('[') && line.includes('](')) {
                                            const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
                                            if (linkMatch) {
                                                const [full, text, url] = linkMatch;
                                                return (
                                                    <p key={idx} className="leading-relaxed">
                                                        {line.split(full)[0]}
                                                        <a href={url} className="text-primary hover:text-primary-hover underline">{text}</a>
                                                        {line.split(full)[1]}
                                                    </p>
                                                );
                                            }
                                        }
                                        // Regular paragraph
                                        return <p key={idx} className="leading-relaxed">{line}</p>;
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-8 md:p-10 rounded-2xl text-center">
                            <h3 className="font-display text-2xl font-bold text-white mb-4">
                                ¿Te identificas con este problema?
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Si este artículo describe tu situación, podemos ayudarte a solucionarlo. Sin complicaciones técnicas, solo resultados.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-8 py-4 rounded transition-all transform hover:translate-y-[-2px]"
                            >
                                <span>Hablar antes de hacer</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </article>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <h3 className="font-display text-2xl font-bold text-white mb-8">
                            Artículos relacionados
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group block bg-[#222222] border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all"
                                >
                                    <div className="text-xs text-primary mb-2">{relatedPost.category}</div>
                                    <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 line-clamp-2">{relatedPost.excerpt}</p>
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
