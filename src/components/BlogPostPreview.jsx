import React from 'react';
import { X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPostPreview = ({ isOpen, onClose, title, content, category, publishDate }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Eye className="w-6 h-6 text-primary" />
                            Preview del Post
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Blog Post Preview */}
                    <article className="prose prose-invert prose-lg max-w-none">
                        {/* Category Badge */}
                        {category && (
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                                    {category}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {title || 'Sin título'}
                        </h1>

                        {/* Date */}
                        {publishDate && (
                            <p className="text-gray-400 text-sm mb-8">
                                {new Date(publishDate).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        )}

                        {/* Content */}
                        <div className="blog-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mt-4 mb-2" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400 my-4" {...props} />
                                    ),
                                    code: ({ node, inline, ...props }) =>
                                        inline ? (
                                            <code className="bg-black/50 text-primary px-2 py-1 rounded text-sm" {...props} />
                                        ) : (
                                            <code className="block bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto my-4" {...props} />
                                        ),
                                    table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto my-4">
                                            <table className="min-w-full border border-white/20" {...props} />
                                        </div>
                                    ),
                                    th: ({ node, ...props }) => (
                                        <th className="border border-white/20 px-4 py-2 bg-white/5 text-white font-bold" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="border border-white/20 px-4 py-2 text-gray-300" {...props} />
                                    ),
                                    a: ({ node, ...props }) => (
                                        <a className="text-primary hover:underline" {...props} />
                                    ),
                                    strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                    em: ({ node, ...props }) => <em className="text-gray-300 italic" {...props} />,
                                }}
                            >
                                {content || '*No hay contenido para mostrar*'}
                            </ReactMarkdown>
                        </div>
                    </article>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg transition-all"
                        >
                            Cerrar Preview
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BlogPostPreview;
