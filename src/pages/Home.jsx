import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, MessageSquare, TrendingUp, FileText, Target, Database, Users, CheckCircle, PenTool as Custom, Search, Zap } from 'lucide-react';

const businessTypes = [
    { id: 'hair', label: 'Peluquería / Estética' },
    { id: 'tattoo', label: 'Estudio de Tatuajes' },
    { id: 'plumber', label: 'Fontanero / Servicios' },
    { id: 'clinic', label: 'Clínica Salud' },
    { id: 'agency', label: 'Agencia Pequeña' },
    { id: 'restaurant', label: 'Restaurante' },
];

const contentMap = {
    hair: [
        {
            problem: "El cliente te escribe por WhatsApp a las 23:00 para pedir cita. Al día siguiente, entre secadores y tintes, se te olvida contestar.",
            solution: "No se dan citas por chat. Se activa un calendario online donde el cliente ve los huecos reales y reserva solo.",
            result: "Te levantas con la agenda llena. No has usado el móvil fuera de tu horario."
        },
        {
            problem: "Un cliente no aparece (ausencia total). Has perdido una hora de facturación y ya no puedes llamar a nadie para cubrirlo.",
            solution: "Recordatorio automático 24h antes por WhatsApp y cobro de señal (5€) al reservar que se descuenta después.",
            result: "Las ausencias bajan al 5%. Si fallan, al menos has cobrado tu tiempo."
        },
        {
            problem: "Te quedas sin el tinte #5 a mitad de semana. Tienes que salir corriendo a comprarlo más caro.",
            solution: "Lista de mínimos. Cuando queda 1 bote, se escanea un código y se añade a la lista de compra automática del viernes.",
            result: "Compras una vez a la semana. Nunca te falta material crítico."
        }
    ],
    tattoo: [
        {
            problem: "Pasas horas diseñando bocetos para clientes que luego cambian de idea o no pagan el depósito.",
            solution: "Regla: No se empieza ningún diseño sin un formulario de ideas previo y el pago de una señal.",
            result: "Solo diseñas para quien paga. Valoran más tu tiempo y tu arte."
        },
        {
            problem: "El consentimiento informado es un papel que a veces se pierde o se mancha de tinta.",
            solution: "Formulario digital en tablet antes de sentarse. Se guarda solo en la nube, organizado por fecha.",
            result: "Legalmente cubierto siempre. Cero papeles por el estudio."
        }
    ],
    plumber: [
        {
            problem: "Terminas la reparación y dices 'luego te paso la factura'. Llegas a casa reventado y se te olvida.",
            solution: "La factura se genera en el móvil antes de arrancar la furgoneta. Un clic y enviada.",
            result: "Cobras mucho antes. Duermes tranquilo sin 'deber' emails."
        },
        {
            problem: "Te llaman mientras estás con una tubería rota. No coges. Pierdes el trabajo.",
            solution: "Contestador automático inteligente que envía un WhatsApp: 'Estoy en una urgencia, dime qué necesitas y te llamo en 1h'.",
            result: "El cliente se siente atendido. Tú trabajas sin interrupciones."
        }
    ],
    clinic: [
        {
            problem: "Pacientes que olvidan la cita o cancelan 10 min antes. Ese hueco ya no lo llenas y pierdes dinero.",
            solution: "Sistema de confirmación por WhatsApp 48h antes. Si cancelan, el sistema avisa automáticamente a la lista de espera.",
            result: "Agenda siempre llena. Si alguien falla, el hueco se cubre solo en minutos."
        },
        {
            problem: "Llamadas constantes para cosas simples: '¿A qué hora abren?', '¿Tenéis cita para hoy?', interrumpiendo consultas.",
            solution: "Agente virtual inteligente en WhatsApp que responde dudas básicas y agenda citas sin intervención humana.",
            result: "Recepción tranquila. El personal se centra en atender al paciente que está delante."
        }
    ],
    agency: [
        {
            problem: "Persiguiendo clientes para que te envíen el logo, los textos o las claves. El proyecto se retrasa semanas.",
            solution: "Onboarding automático. Formulario con checklist que 'persigue' suavemente al cliente hasta que entrega todo.",
            result: "Proyectos que arrancan a tiempo. Tú no haces de 'policía malo', lo hace el sistema."
        },
        {
            problem: "Haces un presupuesto, lo envías y... silencio. Se te olvida hacer seguimiento entre tanto lío.",
            solution: "Pipeline de ventas. Si no responden en 3 días, email automático: '¿Pudiste revisarlo?'.",
            result: "Cierras más ventas por simple insistencia educada y automática."
        }
    ],
    restaurant: [
        {
            problem: "Viernes noche, local lleno. El teléfono no para de sonar para pedir mesa, interrumpiendo a los camareros que llevan bandejas.",
            solution: "Sistema de reservas online obligatorio. El teléfono tiene una locución que dirige educadamente a la web.",
            result: "El personal se centra en servir mesas. La agenda se llena sola, sin errores de 'te entendí mal la hora'."
        },
        {
            problem: "Se tira comida a la basura por mala previsión, pero te quedas sin pan de hamburguesa en mitad del servicio del sábado.",
            solution: "Hoja de stock digital en la cocina. Cuando se abre el último paquete, se escanea para la lista de compra automática.",
            result: "Compras lo justo y necesario. Nunca tienes que decir 'lo siento, ese plato se ha terminado'."
        }
    ]
};

const solutionAreas = [
    {
        title: 'Ventas',
        icon: Target,
        sectors: ['hair', 'tattoo', 'plumber', 'restaurant'],
        items: [
            'Generación de leads automáticos',
            'Recordatorios automatizados de seguimiento',
            'Seguimiento de propuestas comerciales'
        ]
    },
    {
        title: 'Comunicación',
        icon: MessageSquare,
        sectors: ['hair', 'tattoo', 'clinic', 'restaurant'],
        items: [
            'Automatización de mensajes y WhatsApp',
            'Gestión inteligente de citas y reservas',
            'Notificaciones proactivas a clientes'
        ]
    },
    {
        title: 'Facturación y Contabilidad',
        icon: FileText,
        sectors: ['plumber', 'agency', 'clinic', 'restaurant'],
        items: [
            'Integración automática de facturas',
            'Procesos de cobro y conciliación bancaria',
            'Reportes financieros en tiempo real'
        ]
    },
    {
        title: 'Inventario y Stock',
        icon: Database,
        sectors: ['hair', 'tattoo', 'restaurant'],
        items: [
            'Control de stock en tiempo real',
            'Pedidos automáticos a proveedores',
            'Escaneo de códigos para reposición rápida'
        ]
    },
    {
        title: 'Operaciones',
        icon: Users,
        sectors: ['agency', 'clinic', 'plumber'],
        items: [
            'Estandarización de procesos internos',
            'Cuadros de mando de rendimiento',
            'Gestión documental sin papeles'
        ]
    }
];

const Home = () => {
    const [activeTab, setActiveTab] = useState('hair');

    // Get filtered solutions for the active sector
    const filteredSolutions = [
        ...solutionAreas.filter(area => area.sectors.includes(activeTab)),
        {
            title: 'Personalización propia',
            icon: Custom,
            isCustom: true,
            items: [
                'Desarrollo de flujos a medida',
                'Integración con herramientas actuales',
                'Soporte técnico y formación continua'
            ]
        }
    ];

    const useCarousel = filteredSolutions.length > 3;

    return (
        <div className="relative pt-64 pb-48 min-h-screen">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden h-[70vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
                <div className="absolute inset-0 grid-pattern"></div>
                {/* Ambient light blobs for premium feel */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center mb-40 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                    >
                        <span className="text-primary text-xs md:text-sm font-mono font-bold tracking-[0.2em] uppercase">
                            Sistemas y Automatización de Negocios
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 relative inline-block max-w-5xl"
                    >
                        Si haces todos los días lo mismo, <br className="hidden md:block" />
                        no es trabajo. Es <span className="text-primary">castigo.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 font-medium mb-16 max-w-3xl mx-auto leading-relaxed"
                    >
                        Automatiza los procesos repetitivos de tu empresa
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
                        {[
                            {
                                title: 'DETECCIÓN',
                                icon: Search,
                                step: '01',
                                content: 'Identifico tareas que el dueño no debería estar haciendo.',
                                highlight: 'Para que dejes de perder tiempo en la operativa.'
                            },
                            {
                                title: 'AUTOMATIZACIÓN',
                                icon: Zap,
                                step: '02',
                                content: 'Diseño automatizaciones para que esas tareas funcionen solas.',
                                highlight: 'Tecnología trabajando por ti, no al revés.'
                            },
                            {
                                title: 'AUTONOMÍA',
                                icon: TrendingUp,
                                step: '03',
                                content: 'Consigo que el negocio no dependa de estar encima todo el día.',
                                highlight: 'Tu negocio funciona, tú recuperas tu vida.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                className="group relative bg-[#222222]/80 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all duration-500 hover:bg-[#2a2a2a] flex flex-col shadow-2xl overflow-hidden"
                            >
                                {/* Background step number */}
                                <span className="absolute -top-4 -right-4 text-8xl font-bold text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-mono">
                                    {item.step}
                                </span>

                                {/* Top gradient line */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon and Title */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 border border-primary/20">
                                            <item.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Content with strategic line breaks */}
                                    <div className="text-gray-300 text-sm leading-relaxed flex-grow space-y-3">
                                        <p className="text-lg md:text-xl font-medium text-white group-hover:text-primary transition-colors leading-snug min-h-[5.5rem] lg:min-h-[6rem]">
                                            {item.content}
                                        </p>

                                        <p className="text-sm font-bold text-primary leading-tight py-2 border-l-2 border-primary/20 pl-3 min-h-[2.5rem] flex items-center">
                                            {item.highlight}
                                        </p>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div className="h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-700 rounded-full mt-4"></div>
                                </div>

                                {/* Bottom highlight glow */}
                                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-32 max-w-4xl mt-64">
                    <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                        Cómo funcionaría tu negocio <br />
                        <span className="text-primary">con un poco más de orden</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Ejemplos reales de caos operativo convertidos en tranquilidad. Sin jerga técnica, solo causa y efecto.
                    </p>
                </div>

                {/* Tabs and Content */}
                <div className="w-full">
                    <div className="flex flex-wrap gap-4 mb-12 border-b border-white/5 pb-8">
                        {businessTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setActiveTab(type.id)}
                                className={`px-6 py-3 rounded-lg text-sm md:text-base border transition-all duration-300 select-none cursor-pointer ${activeTab === type.id
                                    ? 'bg-primary text-gray-900 border-primary font-bold shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                                    : 'bg-surface-dark/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-surface-dark/60'
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:grid grid-cols-12 gap-8 text-xs font-mono uppercase tracking-widest text-gray-500 mb-8 px-8">
                        <div className="col-span-4">Situación habitual</div>
                        <div className="col-span-4">Qué se hace para ordenar</div>
                        <div className="col-span-4">Resultado real</div>
                    </div>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {contentMap[activeTab].map((item, idx) => (
                            <div key={idx} className="relative group">
                                {/* Ambient glow on hover */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 bg-[#121212] border border-white/10 p-10 rounded-2xl transition-all duration-300 items-start shadow-2xl overflow-hidden">
                                    {/* Subtle glass effect border on top */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                    <div className="col-span-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] px-2 py-1 bg-white/5 rounded">Situación</span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-lg font-light italic">"{item.problem}"</p>
                                    </div>

                                    <div className="col-span-4 relative md:border-l md:border-white/10 md:pl-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] px-2 py-1 bg-primary/5 rounded">Qué se hace</span>
                                        </div>
                                        <p className="text-white font-medium text-lg leading-snug">{item.solution}</p>
                                    </div>

                                    <div className="col-span-4 relative md:border-l md:border-white/10 md:pl-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] px-2 py-1 bg-primary/10 rounded">Resultado</span>
                                        </div>
                                        <p className="text-primary font-bold text-xl leading-snug group-hover:text-primary transition-colors">{item.result}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>

                {/* Dynamic Solution Areas Section */}
                <div className="mt-64">
                    <div className="mb-32">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Ejemplos de soluciones concretas
                            <span className="text-primary ml-3">
                                ({businessTypes.find(t => t.id === activeTab)?.label})
                            </span>
                        </h2>
                        <div className="h-1 w-20 bg-primary/30"></div>
                    </div>


                    {useCarousel ? (
                        // Horizontal scrollable carousel for 4+ cards
                        <div className="relative">
                            {/* Left gradient fade - subtle */}
                            <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-background-dark/40 to-transparent z-10 pointer-events-none"></div>

                            {/* Right gradient fade - subtle */}
                            <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-background-dark/40 to-transparent z-10 pointer-events-none"></div>

                            <div className="overflow-x-auto pb-6 scroll-smooth" style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(110, 231, 183, 0.3) transparent'
                            }}>
                                <motion.div layout className="flex gap-6 min-w-max px-2">
                                    <AnimatePresence mode="popLayout">
                                        {filteredSolutions.map((area, idx) => (
                                            <motion.div
                                                layout
                                                key={area.title}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                                className={`group relative border p-8 rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl flex flex-col w-[340px] flex-shrink-0 ${area.isCustom
                                                    ? 'bg-primary/5 border-primary/30 hover:bg-primary/10 hover:border-primary/50'
                                                    : 'bg-[#252525] border-white/20 hover:border-primary/50 hover:bg-[#2a2a2a]'
                                                    }`}
                                            >
                                                {/* Subtle inner glow top */}
                                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                                                <div className="relative z-10 flex-grow">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className={`p-3 rounded-xl transition-all duration-300 ${area.isCustom ? 'bg-primary text-gray-900 group-hover:scale-110' : 'bg-white/5 text-primary group-hover:bg-primary/10 group-hover:scale-110'
                                                            }`}>
                                                            <area.icon className="w-6 h-6" />
                                                        </div>
                                                        <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">{area.title}</h3>
                                                    </div>
                                                    <ul className="space-y-4">
                                                        {area.items.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                                                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all flex-shrink-0 ${area.isCustom ? 'bg-primary' : 'bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(110,231,183,0.6)]'
                                                                    }`} />
                                                                <span className="text-base leading-snug">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Decoration for custom card */}
                                                {area.isCustom && (
                                                    <div className="mt-8 pt-6 border-t border-primary/10">
                                                        <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60">Diseñado para tu caos</p>
                                                    </div>
                                                )}

                                                {/* Bottom highlight line */}
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Enhanced scroll indicator */}
                            <div className="flex justify-center mt-6 gap-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                                >
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                                    <span className="text-xs text-gray-400 font-mono">Desliza para ver más</span>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        // Standard 3-column grid for 3 or fewer cards
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredSolutions.map((area, idx) => (
                                    <motion.div
                                        layout
                                        key={area.title}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        className={`group relative border p-8 rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl flex flex-col ${area.isCustom
                                            ? 'bg-primary/5 border-primary/30 hover:bg-primary/10 hover:border-primary/50'
                                            : 'bg-[#252525] border-white/20 hover:border-primary/50 hover:bg-[#2a2a2a]'
                                            }`}
                                    >
                                        {/* Subtle inner glow top */}
                                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                                        <div className="relative z-10 flex-grow">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`p-3 rounded-xl transition-all duration-300 ${area.isCustom ? 'bg-primary text-gray-900 group-hover:scale-110' : 'bg-white/5 text-primary group-hover:bg-primary/10 group-hover:scale-110'
                                                    }`}>
                                                    <area.icon className="w-6 h-6" />
                                                </div>
                                                <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">{area.title}</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {area.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all flex-shrink-0 ${area.isCustom ? 'bg-primary' : 'bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(110,231,183,0.6)]'
                                                            }`} />
                                                        <span className="text-base leading-snug">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Decoration for custom card */}
                                        {area.isCustom && (
                                            <div className="mt-8 pt-6 border-t border-primary/10">
                                                <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60">Diseñado para tu caos</p>
                                            </div>
                                        )}

                                        {/* Bottom highlight line */}
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                {/* Testimonials Section */}
                <div className="mt-64 mb-40">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Resultados Reales
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Pequeños negocios que recuperaron su tiempo y su cordura
                        </p>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="relative">
                        {/* Fade gradients for scroll indication */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none md:hidden"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none md:hidden"></div>

                        <div className="flex overflow-x-auto pb-8 gap-6 px-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
                            {[
                                {
                                    quote: "Pasé de 30% de ausencias a menos del 5% en 2 meses. Las mesas vacías me costaban dinero real.",
                                    author: "María González",
                                    business: "Peluquería en Murcia",
                                    metric: "25% menos pérdidas",
                                    link: "/blog/sistema-reservas-online"
                                },
                                {
                                    quote: "Recuperé 15 horas al mes que perdía facturando y persiguiendo pagos. Ahora lo hace todo solo.",
                                    author: "Juan Martínez",
                                    business: "Taller Mecánico, Cartagena",
                                    metric: "15h/mes ahorradas",
                                    link: "/blog/facturacion-automatica-autonomos"
                                },
                                {
                                    quote: "Ya no me llaman mientras atiendo pacientes. El sistema filtra lo urgente de lo que puede esperar.",
                                    author: "Ana Ruiz",
                                    business: "Clínica Dental, Lorca",
                                    metric: "80% menos interrupciones",
                                    link: "/blog/automatizar-whatsapp-negocio"
                                },
                                {
                                    quote: "Antes perdía 2 horas cada viernes haciendo pedidos. Ahora escaneo lo que falta y la lista se hace sola.",
                                    author: "Pedro Sánchez",
                                    business: "Restaurante, Murcia",
                                    metric: "Inventario automático",
                                    link: "/blog/control-inventario-automatico"
                                },
                                {
                                    quote: "Mis clientes ya no preguntan '¿a qué hora tienes hueco?'. Entran, ven y reservan. Cero llamadas.",
                                    author: "Laura M.",
                                    business: "Estudio Tatuajes, Molina",
                                    metric: "Agenda llena sola",
                                    link: "/blog/sistema-reservas-online"
                                }
                            ].map((testimonial, idx) => (
                                <Link
                                    key={idx}
                                    to={testimonial.link}
                                    className="min-w-[300px] md:min-w-0 snap-center"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-[#1a1a1a] border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all flex flex-col h-full group relative overflow-hidden"
                                    >
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-primary/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-6 text-center">
                                            <div>
                                                <p className="font-display font-bold text-gray-900 text-lg mb-2">
                                                    ¿Conoce la solución implantada?
                                                </p>
                                                <div className="inline-flex items-center gap-2 text-gray-800 font-medium text-sm">
                                                    <span>Leer caso práctico</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 flex-grow relative z-10">
                                            {/* Subtle icon instead of quotes */}
                                            <div className="text-primary/40 mb-3 group-hover:text-primary transition-colors">
                                                <MessageSquare className="w-5 h-5" />
                                            </div>
                                            <p className="text-gray-300 leading-relaxed italic text-sm group-hover:text-white transition-colors">
                                                {testimonial.quote}
                                            </p>
                                        </div>
                                        <div className="border-t border-white/5 pt-4 mt-auto relative z-10">
                                            <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                                            <p className="text-gray-500 text-xs">{testimonial.business}</p>
                                            <div className="mt-3 inline-block px-2 py-1 bg-primary/10 text-primary text-[10px] font-mono rounded border border-primary/10 group-hover:bg-primary group-hover:text-gray-900 transition-colors">
                                                {testimonial.metric}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pricing Transparency Section */}
                <div className="mt-40 mb-40 max-w-4xl mx-auto">
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 md:p-12 rounded-2xl">
                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                            Lo que vas a invertir <span className="text-gray-400 font-normal text-lg">(vamos de cara)</span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            La mayoría de proyectos están entre <span className="text-primary font-semibold">800-2.500€</span>
                            {' '}(depende de la complejidad y el sector).
                        </p>
                        <p className="text-gray-300 text-base leading-relaxed mb-4">
                            El ROI viene por tres vías:
                        </p>
                        <ul className="text-gray-300 text-base leading-relaxed space-y-2 mb-4 list-disc list-inside">
                            <li><span className="text-primary font-semibold">Incremento de rotación:</span> Más clientes atendidos con el mismo equipo</li>
                            <li><span className="text-primary font-semibold">Reducción de errores:</span> Menos facturas olvidadas, stock mal gestionado, o mesas vacías</li>
                            <li><span className="text-primary font-semibold">Mejora de márgenes:</span> Invertir en IA te permite optimizar recursos y aumentar rentabilidad</li>
                        </ul>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            En la mayoría de casos, la inversión se amortiza en menos de 2 meses. Después de eso, es ganancia neta.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-48 mb-16 text-center max-w-lg mx-auto px-4 md:max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Background glow for CTA */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full opacity-50"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full opacity-30"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20 shadow-[0_0_20px_rgba(110,231,183,0.1)]">
                                <Lightbulb className="w-7 h-7" />
                            </div>

                            <h3 className="text-3xl md:text-5xl text-white font-bold mb-6 tracking-tight leading-tight">
                                ¿Te ves reflejado en <br className="hidden md:block" />
                                <span className="text-primary">estos problemas?</span>
                            </h3>

                            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Hablemos 15 minutos. Sin compromiso. Solo para ver si tiene sentido trabajar juntos.
                            </p>

                            <div className="flex flex-col items-center gap-6 w-full px-4 md:px-0">
                                <Link
                                    to="/contact"
                                    className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold text-xl px-10 py-5 rounded-2xl transition-all transform hover:translate-y-[-4px] shadow-[0_10px_30px_rgba(110,231,183,0.3)] active:scale-95"
                                >
                                    <span>Diagnóstico gratuito</span>
                                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <div className="flex items-center gap-2 text-gray-500 font-medium tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></span>
                                    <span className="text-sm">Sin compromiso · Sesión estratégica rápida</span>
                                </div>

                                {/* Urgency element - Redesigned as a premium toast-like element with About Me link */}
                                <Link
                                    to="/sobre-mi"
                                    className="group/small mt-10 px-6 py-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4 text-left max-w-md hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                                >
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0"></div>
                                    <div className="flex-grow">
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                            <span className="text-white font-bold">Solo 3 clientes al mes.</span> Reservo tiempo real para darte atención personalizada, no solo vender.
                                        </p>
                                        <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mt-1 inline-flex items-center gap-1 group-hover/small:translate-x-1 transition-transform">
                                            Conoce quién está detrás <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
