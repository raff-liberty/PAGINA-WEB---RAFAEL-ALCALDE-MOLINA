import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, MessageSquare, TrendingUp, FileText, Target, Database, Users, CheckCircle, PenTool as Custom, Search, Zap, DollarSign, Euro, ChevronLeft, ChevronRight, Globe, Instagram, Linkedin } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

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
            solution: "No se dan citas por chat. Un agente virtual se conecta a tu calendario y CRM para entender quién es el cliente y de manera natural responde, agenda y cobra la cita si se desea.",
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
        title: 'Ventas y Comunicación Total',
        icon: Target,
        sectors: ['hair', 'tattoo', 'plumber', 'clinic', 'restaurant'],
        serviceId: 'automation',
        badge: 'Crecimiento',
        roi: 'Alta',
        items: [
            'WhatsApp inteligente y generación de leads 24/7',
            'Gestión de citas y recordatorios sin errores',
            'Cierre de propuestas y notificaciones automáticas'
        ]
    },
    {
        title: 'Cerebro Financiero',
        icon: FileText,
        sectors: ['plumber', 'agency', 'clinic', 'restaurant'],
        serviceId: 'dashboard',
        badge: 'Control',
        roi: 'Media',
        items: [
            'Integración automática de facturas',
            'Conciliación bancaria sin Excel',
            'Radiografía de tu negocio en tiempo real'
        ]
    },
    {
        title: 'Inventario Inteligente',
        icon: Database,
        sectors: ['hair', 'tattoo', 'restaurant'],
        serviceId: 'automation',
        badge: 'Eficiencia',
        roi: 'Alta',
        items: [
            'Stock bajo control en tiempo real',
            'Pedidos a proveedores automatizados',
            'Cero roturas de stock imprevistas'
        ]
    },
    {
        title: 'Maquinaria Operativa',
        icon: Users,
        sectors: ['agency', 'clinic', 'plumber'],
        serviceId: 'automation',
        badge: 'Estructura',
        roi: 'Alta',
        items: [
            'Estandarización de procesos internos',
            'Cuadros de mando de rendimiento (KPIs)',
            'Oficina sin papeles ni caos diario'
        ]
    },
    {
        title: 'Web Diseñada y Conectada',
        icon: Globe,
        sectors: ['hair', 'tattoo', 'plumber', 'clinic', 'agency', 'restaurant'],
        serviceId: 'web',
        badge: 'Premium',
        roi: 'Inmediata',
        items: [
            'Diseño profesional de alto impacto',
            'Conectada con tus herramientas de gestión',
            'Optimizada para convertir visitas en clientes'
        ]
    }
];

const Home = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hair');
    const [scrollIndex, setScrollIndex] = useState(0);
    const scrollRef = useRef(null);
    const content = contentMap[activeTab];

    const scrollToIndex = (index) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = container.offsetWidth;
            container.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            setScrollIndex(index);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const index = Math.round(container.scrollLeft / container.offsetWidth);
            if (index !== scrollIndex) {
                setScrollIndex(index);
            }
        }
    };

    // Reset scroll when tab changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0;
            setScrollIndex(0);
        }
    }, [activeTab]);

    // Get filtered solutions for the active sector
    const filteredSolutions = [
        ...solutionAreas.filter(area => area.sectors.includes(activeTab)),
        {
            title: 'Arquitectura a Medida',
            icon: Custom,
            isCustom: true,
            serviceId: 'other',
            badge: 'Premium',
            roi: 'Variable',
            items: [
                'Resolución de tu cuello de botella específico',
                'Integración profunda con tus herramientas',
                'Soporte estratégico y evolución continua'
            ]
        }
    ];

    const useCarousel = filteredSolutions.length > 3;

    return (
        <div className="relative pt-32 pb-32 min-h-screen">
            <SEO
                title="Engorilate | Automatización de Negocios"
                description="Automatiza los procesos repetitivos de tu empresa en Murcia. Recupera tu tiempo y deja de perder dinero en gestión manual."
                keywords="automatización negocios murcia, digitalización pymes, eficiencia operativa"
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center mb-20 text-center">
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
                        className="font-display text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6 relative inline-block max-w-5xl"
                    >
                        Si haces todos los días lo mismo, <br className="hidden md:block" />
                        no es trabajo. Es <span className="text-primary">castigo.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 font-medium mb-12 max-w-3xl mx-auto leading-relaxed"
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
                                highlight: 'Te tiras 5 horas diarias contestando Whatsapps de clientes curiosos'
                            },
                            {
                                title: 'AUTOMATIZACIÓN',
                                icon: Zap,
                                step: '02',
                                content: 'Diseño automatizaciones para que esas tareas funcionen solas.',
                                highlight: 'Diseñamos un embudo de automatización que responde a todos los mensajes como tu responderías de manera natural'
                            },
                            {
                                title: 'AUTONOMÍA',
                                icon: TrendingUp,
                                step: '03',
                                content: 'Consigo que el negocio no dependa de estar encima todo el día.',
                                highlight: 'Tu negocio funciona, dedica tu tiempo a aquello que da rentabilidad a la empresa.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                className="group relative bg-[#222222] backdrop-blur-md border border-white/30 p-6 rounded-xl hover:border-primary/50 transition-all duration-500 hover:bg-[#282828] flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.9)] overflow-hidden h-full"
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
                <div className="mb-20 max-w-4xl mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 inline-block px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-lg"
                    >
                        <span className="text-primary font-mono text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                            Ejemplos
                        </span>
                    </motion.div>
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

                    <div className="relative group/carousel">
                        {/* Navigation Buttons */}
                        {content.length > 1 && (
                            <>
                                <button
                                    onClick={() => scrollToIndex(Math.max(0, scrollIndex - 1))}
                                    className={`absolute -left-4 md:-left-12 top-[200px] z-20 w-10 h-10 rounded-full bg-surface-dark/80 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-gray-900 shadow-xl ${scrollIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => scrollToIndex(Math.min(content.length - 1, scrollIndex + 1))}
                                    className={`absolute -right-4 md:-right-12 top-[200px] z-20 w-10 h-10 rounded-full bg-surface-dark/80 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-gray-900 shadow-xl ${scrollIndex === content.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8"
                        >
                            {content.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-full md:min-w-[45%] lg:min-w-[100%] first:ml-0 snap-center transition-all duration-500"
                                >
                                    <div className="relative group">
                                        {/* Ambient glow on hover */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 bg-[#222222] border border-white/40 p-6 md:p-12 rounded-2xl transition-all duration-300 items-start shadow-[0_8px_32px_rgba(0,0,0,0.9)] overflow-hidden group-hover:border-primary/50">
                                            {/* Subtle glass effect border on top */}
                                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                            <div className="col-span-12 md:col-span-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] px-2 py-1 bg-white/5 rounded">Situación</span>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light italic">"{item.problem}"</p>
                                            </div>

                                            <div className="col-span-12 md:col-span-4 relative md:border-l md:border-white/10 md:pl-10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] px-2 py-1 bg-primary/5 rounded">Qué se hace</span>
                                                </div>
                                                <p className="text-white font-medium text-lg md:text-xl leading-snug">{item.solution}</p>
                                            </div>

                                            <div className="col-span-12 md:col-span-4 relative md:border-l md:border-white/10 md:pl-10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] px-2 py-1 bg-primary/10 rounded">Resultado</span>
                                                </div>
                                                <p className="text-primary font-bold text-xl md:text-2xl leading-snug group-hover:text-primary transition-colors">{item.result}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        {content.length > 1 && (
                            <div className="flex justify-center gap-3 mt-8">
                                {content.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToIndex(idx)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${scrollIndex === idx ? 'bg-primary w-8' : 'bg-white/10 hover:bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        )}
                        {/* Specific Solutions Grid - Integrated */}
                        {/* Specific Solutions Grid - Integrated as a Product Showcase */}
                        <div className="mt-16 relative">
                            {/* Visual connector line from top */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-white/0 to-primary/30"></div>

                            <div className="flex flex-col items-center text-center mb-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-6 inline-block px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-full"
                                >
                                    <span className="text-primary font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                                        Catálogo de Soluciones de Alto Impacto
                                    </span>
                                </motion.div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                    Sistemas listos para <span className="text-primary">implementar</span>
                                </h3>
                                <p className="text-gray-400 max-w-xl text-sm md:text-base">
                                    Productos diseñados para eliminar la fricción operativa y multiplicar la rentabilidad de tu pyme.
                                </p>
                            </div>

                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredSolutions.map((area, idx) => (
                                        <motion.div
                                            layout
                                            key={area.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            onClick={() => navigate(`/contact?service=${area.serviceId}`)}
                                            className={`group relative p-6 md:p-8 rounded-3xl transition-all duration-700 overflow-hidden flex flex-col cursor-pointer border shadow-[0_8px_32px_rgba(0,0,0,0.9)] ${area.isCustom
                                                ? 'bg-gradient-to-br from-primary/[0.15] to-[#222222] border-primary/60 hover:border-primary/80 hover:shadow-[0_8px_32px_rgba(110,231,183,0.3)]'
                                                : 'bg-[#222222] border-white/30 hover:border-primary/50 hover:bg-[#282828]'
                                                }`}
                                        >
                                            {/* Background glow effect */}
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                            {/* Top Glass Highlight */}
                                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                            {/* Badges Container */}
                                            <div className="flex justify-between items-start mb-8 relative z-10">
                                                <div className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest border transition-colors ${area.isCustom
                                                    ? 'bg-primary/20 border-primary/30 text-primary'
                                                    : 'bg-white/5 border-white/10 text-gray-400 group-hover:border-primary/30 group-hover:text-primary'
                                                    }`}>
                                                    {area.badge}
                                                </div>
                                                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                                    Disponibilidad limitada
                                                </div>
                                            </div>

                                            <div className="relative z-10 flex-grow">
                                                <div className="flex items-center gap-5 mb-8">
                                                    <div className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 text-gray-400 border border-white/10 transition-all duration-700 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 shadow-lg`}>
                                                        <area.icon className="w-7 h-7 md:w-8 md:h-8" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                                                            {area.title}
                                                        </h3>
                                                        <div className="mt-1 flex items-center gap-2 text-xs font-mono text-gray-500">
                                                            <span>ROI Estimado:</span>
                                                            <span className="text-primary/70">{area.roi}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <ul className="space-y-4 mb-10">
                                                    {area.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-4 text-gray-300 text-sm md:text-base group/item">
                                                            <CheckCircle className="w-5 h-5 text-primary/40 mt-0.5 flex-shrink-0 group-hover/item:text-primary group-hover/item:scale-110 transition-all" />
                                                            <span className="leading-relaxed group-hover/item:text-white transition-colors">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Price/Value Visual */}
                                                <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/[0.02] transition-all">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase">Consultoría inicial</span>
                                                        <span className="text-white font-bold font-mono">GRATUITA</span>
                                                    </div>
                                                </div>


                                            </div>

                                            {/* Bottom accent glass line */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>

                    {/* Social Proof Wall - Infinite Marquee */}
                    <div className="mt-40 mb-32 overflow-hidden">
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-6 inline-block px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-lg"
                            >
                                <span className="text-primary font-mono text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                                    Evidencia Real
                                </span>
                            </motion.div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                Pequeños negocios, <span className="text-primary">grandes resultados</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                                Recuperaron su tiempo, su cordura y su rentabilidad
                            </p>
                        </div>

                        {/* Infinite Marquee Container */}
                        <div className="relative">
                            {/* Fade gradients on edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none"></div>

                            {/* Marquee Track - duplicated for seamless loop */}
                            <div className="flex gap-6 animate-marquee">
                                {[...Array(2)].map((_, setIndex) => (
                                    <div key={setIndex} className="flex gap-6 flex-shrink-0">
                                        {[
                                            {
                                                quote: "Pasé de 30% de ausencias a menos del 5% en 2 meses.",
                                                author: "María González",
                                                business: "Peluquería, Murcia",
                                                metric: "↓ 25% pérdidas"
                                            },
                                            {
                                                quote: "Recuperé 15 horas al mes que perdía facturando.",
                                                author: "Juan Martínez",
                                                business: "Taller Mecánico",
                                                metric: "15h/mes ahorradas"
                                            },
                                            {
                                                quote: "Ya no me interrumpen mientras atiendo pacientes.",
                                                author: "Ana Ruiz",
                                                business: "Clínica Dental",
                                                metric: "↓ 80% interrupciones"
                                            },
                                            {
                                                quote: "Antes perdía 2 horas cada viernes haciendo pedidos.",
                                                author: "Pedro Sánchez",
                                                business: "Restaurante",
                                                metric: "Stock automático"
                                            },
                                            {
                                                quote: "Mis clientes reservan solos. Cero llamadas.",
                                                author: "Laura M.",
                                                business: "Estudio Tatuajes",
                                                metric: "Agenda llena sola"
                                            }
                                        ].map((testimonial, idx) => (
                                            <div
                                                key={`${setIndex}-${idx}`}
                                                className="w-[240px] flex-shrink-0 bg-[#222222] border border-white/30 p-4 rounded-lg hover:border-primary/50 transition-all group relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                                            >
                                                <div className="mb-3">
                                                    <div className="text-primary/40 mb-2 group-hover:text-primary transition-colors">
                                                        <MessageSquare className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-gray-300 leading-snug text-xs group-hover:text-white transition-colors">
                                                        "{testimonial.quote}"
                                                    </p>
                                                </div>
                                                <div className="border-t border-white/5 pt-3">
                                                    <p className="text-white font-semibold text-xs">{testimonial.author}</p>
                                                    <p className="text-gray-500 text-[10px] mb-2">{testimonial.business}</p>
                                                    <div className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-mono rounded border border-primary/20 group-hover:bg-primary group-hover:text-gray-900 transition-colors">
                                                        {testimonial.metric}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Integrated Investment & CTA Section - Split Layout */}
                    <div className="mt-24 mb-12 max-w-6xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative bg-gradient-to-br from-[#222222] to-[#181818] border border-white/30 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
                        >
                            {/* Background effects */}
                            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full opacity-40"></div>
                            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full opacity-30"></div>

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
                                {/* LEFT: Investment & ROI */}
                                <div className="p-6 md:p-8 lg:border-r border-white/10">
                                    <div className="flex items-start gap-3 mb-6">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                                            <Euro className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                                                La inversión
                                            </h3>
                                            <p className="text-gray-500 text-xs italic">
                                                (Sin letra pequeña)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                        <p className="text-gray-300 text-sm mb-1">
                                            La mayoría de proyectos:
                                        </p>
                                        <p className="text-primary font-bold text-2xl md:text-3xl">
                                            600 - 2.500€
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Depende de la complejidad y el sector
                                        </p>
                                    </div>

                                    {/* ROI Routes */}
                                    <div className="mb-5">
                                        <p className="text-white font-semibold text-base mb-3">
                                            El retorno viene por tres vías:
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2 group/item">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <TrendingUp className="w-3 h-3 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-primary font-semibold text-xs">Incremento de rotación</p>
                                                    <p className="text-gray-400 text-xs">Más clientes con el mismo equipo</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2 group/item">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-3 h-3 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-primary font-semibold text-xs">Reducción de errores</p>
                                                    <p className="text-gray-400 text-xs">Menos facturas olvidadas, stock mal gestionado</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2 group/item">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <DollarSign className="w-3 h-3 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-primary font-semibold text-xs">Mejora de márgenes</p>
                                                    <p className="text-gray-400 text-xs">Optimización de recursos y rentabilidad</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Amortization */}
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-gray-400 text-xs leading-relaxed">
                                            Amortización típica: <span className="text-primary font-bold">menos de 2 meses</span>. Después, ganancia neta.
                                        </p>
                                    </div>
                                </div>

                                {/* RIGHT: Contact Form + Social Links */}
                                <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-primary/[0.02] to-transparent">
                                    {/* Logo */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <img
                                            src="/favicon.png"
                                            alt="Engorilate Icon"
                                            className="h-12 w-auto"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-display font-bold text-xl tracking-tight text-primary leading-none">
                                                ENGORILATE
                                            </span>
                                            <span className="text-gray-400 text-[10px] font-light tracking-wide mt-0.5">
                                                Automatización de Negocios
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contact Form */}
                                    <ContactForm source="Home Investment Section" />

                                    {/* Social Links */}
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <p className="text-xs text-gray-500 mb-3">O contáctame directamente:</p>
                                        <div className="flex gap-3">
                                            <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-[#25D366]/20 border border-transparent hover:border-[#25D366]/50 transition-all group">
                                                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                                                <span className="text-xs text-gray-400 group-hover:text-[#25D366]">WhatsApp</span>
                                            </a>
                                            <a href="https://instagram.com/engorilate" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-[#E1306C]/20 border border-transparent hover:border-[#E1306C]/50 transition-all group">
                                                <Instagram className="w-4 h-4 text-[#E1306C]" />
                                                <span className="text-xs text-gray-400 group-hover:text-[#E1306C]">Instagram</span>
                                            </a>
                                            <a href="https://linkedin.com/in/engorilate" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-[#0077B5]/20 border border-transparent hover:border-[#0077B5]/50 transition-all group">
                                                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                                                <span className="text-xs text-gray-400 group-hover:text-[#0077B5]">LinkedIn</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
