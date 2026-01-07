import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import BlogRenderer from '../components/BlogRenderer';
import { supabase } from '../lib/supabaseClient';
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
                // Fetch from Supabase directly
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
                    <BlogRenderer post={post} />
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
                                    className="group block bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
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
