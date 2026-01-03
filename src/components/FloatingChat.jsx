import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState(null);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data, error } = await supabase.from('site_config').select('key, value');
                if (error) throw error;
                const siteConfig = {};
                data?.forEach(item => { siteConfig[item.key] = item.value || ''; });
                setConfig(siteConfig);
            } catch (error) {
                console.error('Error fetching chat config:', error);
            }
        };
        fetchConfig();
    }, []);

    // If no chat URL is configured, we can either hide it or show an alert (as requested earlier)
    const chatUrl = config?.chat_embed_url;

    const toggleChat = () => {
        if (!chatUrl) {
            alert('Configura el "n8n Chat Embed URL" en el Panel de Administración para activar el chat.');
            return;
        }
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100, transformOrigin: 'bottom right' }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? '60px' : '600px',
                            width: isMinimized ? '200px' : '400px'
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mb-4 max-w-[calc(100vw-2rem)]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-gray-900">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-bold text-sm">Asistente Virtual</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1 hover:bg-black/10 rounded transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-black/10 rounded transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Loading State or Content */}
                        {!isMinimized && (
                            <div className="flex-1 bg-white relative">
                                <iframe
                                    src={chatUrl}
                                    className="w-full h-full border-none"
                                    title="n8n Chat"
                                    allow="clipboard-write"
                                ></iframe>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip / Bubble Label (Only if not open) */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-2xl relative mr-2 mb-2 hidden md:block"
                >
                    ¿Hablamos?
                    <div className="absolute top-full right-4 w-2 h-2 bg-white rotate-45 -translate-y-1"></div>
                </motion.div>
            )}

            {/* Chat Button */}
            <motion.button
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 ${isOpen ? 'bg-white text-gray-900' : 'bg-primary text-gray-900'} rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,184,0,0.4)] relative group overflow-hidden transition-colors`}
                onClick={toggleChat}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isOpen ? <X className="w-8 h-8 relative z-10" /> : <MessageCircle className="w-8 h-8 relative z-10" />}

                {/* Pulse Animation (Only if not open) */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-25"></div>
                )}
            </motion.button>
        </div>
    );
};

export default FloatingChat;
