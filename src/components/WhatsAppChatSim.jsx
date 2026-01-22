import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Phone, Video, Check, CheckCheck, Smile, Paperclip, Camera, Mic, Send } from 'lucide-react';

const WhatsAppChatSim = () => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [step, setStep] = useState(0);

    const script = [
        { role: 'user', text: 'Hola, me gustaría reservar una cita para mañana.', delay: 1000 },
        { role: 'ai', text: '¡Hola! Por supuesto. Tengo estos huecos disponibles: 10:00, 11:30 y 16:00. ¿Cuál te viene mejor?', delay: 2000 },
        { role: 'user', text: 'A las 11:30 está perfecto.', delay: 1500 },
        { role: 'ai', text: '¡Hecho! ✅ Cita agendada para mañana a las 11:30. Te he enviado un WhatsApp de confirmación ahora mismo.', delay: 2500 },
        { role: 'user', text: '¡Qué rápido! Muchas gracias.', delay: 1000 },
    ];

    useEffect(() => {
        if (step < script.length) {
            const current = script[step];

            if (current.role === 'ai') {
                const typingTimer = setTimeout(() => {
                    setIsTyping(true);

                    const messageTimer = setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, { ...current, id: Date.now() }]);
                        setStep(s => s + 1);
                    }, 1500);

                    return () => clearTimeout(messageTimer);
                }, 500);

                return () => clearTimeout(typingTimer);
            } else {
                const messageTimer = setTimeout(() => {
                    setMessages(prev => [...prev, { ...current, id: Date.now() }]);
                    setStep(s => s + 1);
                }, current.delay);

                return () => clearTimeout(messageTimer);
            }
        } else {
            // Loop with a pause
            const resetTimer = setTimeout(() => {
                setMessages([]);
                setStep(0);
            }, 4000);
            return () => clearTimeout(resetTimer);
        }
    }, [step]);

    return (
        <div className="w-full max-w-[400px] mx-auto bg-[#0b141a] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[550px] relative group/chat">
            {/* Header */}
            <div className="bg-[#1f2c33] px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-primary text-xs font-black uppercase italic">E</div>
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-bold">Engorilate Assist</h4>
                        <p className="text-primary text-[10px] font-medium leading-none">En línea</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                    <Video className="w-4 h-4 cursor-not-allowed opacity-50" />
                    <Phone className="w-4 h-4 cursor-not-allowed opacity-50" />
                    <MoreVertical className="w-4 h-4 cursor-not-allowed opacity-50" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a] relative scrollbar-hide">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-[13px] relative ${msg.role === 'user'
                                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                                    : 'bg-[#202c33] text-white rounded-tl-none'
                                }`}>
                                {msg.text}
                                <div className="flex items-center justify-end gap-1 mt-1">
                                    <span className="text-[9px] text-white/40">12:00</span>
                                    {msg.role === 'user' && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="bg-[#202c33] px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className="bg-[#1f2c33] px-3 py-3 flex items-center gap-3">
                <Smile className="w-6 h-6 text-white/40 cursor-not-allowed" />
                <Paperclip className="w-6 h-6 text-white/40 cursor-not-allowed" />
                <div className="flex-1 bg-[#2a3942] rounded-xl px-4 py-2 text-white/40 text-sm">
                    Escribe un mensaje
                </div>
                <Mic className="w-6 h-6 text-white/40 cursor-not-allowed" />
            </div>

            {/* Premium Glow Overlay */}
            <div className="absolute inset-0 border border-primary/0 group-hover/chat:border-primary/20 transition-all duration-700 pointer-events-none rounded-[2rem]" />
        </div>
    );
};

export default WhatsAppChatSim;
