import React from 'react';
import { X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogRenderer from './BlogRenderer';

const BlogPostPreview = ({ isOpen, onClose, title, content, category, publishDate, readTime, savings }) => {
    if (!isOpen) return null;

    const previewPost = {
        title,
        content,
        category,
        publish_date: publishDate,
        read_time: readTime,
        savings
    };

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
                    <div className="max-w-none">
                        <BlogRenderer post={previewPost} />
                    </div>

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
