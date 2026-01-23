import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, MessageSquare, TrendingUp, FileText, Target, Database, Users, CheckCircle, PenTool as Custom, Search, Zap, DollarSign, Euro, ChevronLeft, ChevronRight, Globe, Instagram, Linkedin, X } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Simulators
// Simulators - Lazy Loaded for Performance
const LocalSeoSimulator = React.lazy(() => import('../components/LocalSeoSimulator'));
const CustomManagementSimulator = React.lazy(() => import('../components/CustomManagementSimulator'));
const WebDevPerformanceSimulator = React.lazy(() => import('../components/WebDevPerformanceSimulator'));
const WhatsAppChatSim = React.lazy(() => import('../components/WhatsAppChatSim'));
const CrmArchitectureSimulator = React.lazy(() => import('../components/CrmArchitectureSimulator'));

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
            solution: "Un agente virtual se conecta a tu calendario y CRM para entender de manera natural quién es el cliente y responde, agenda y cobra la cita si se desea.",
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

const faqCategories = [
    {
        id: 'roi',
        label: 'Rentabilidad / ROI',
        icon: TrendingUp,
        questions: [
            {
                q: "¿Esto es un gasto o una inversión real?",
                a: "Es una inversión con retorno medible. La mayoría de nuestros clientes recuperan la inversión en menos de 4 meses solo eliminando horas muertas de gestión. Hemos visto reducciones de interrupciones de hasta el 80% desde el primer mes de uso."
            },
            {
                q: "¿Para qué tamaño de negocio es esto?",
                a: "Está diseñado para pymes de 1 a 20 empleados. No necesitas ser una multinacional para tener tecnología de élite. Si pierdes más de 1 hora al día en tareas repetitivas, eres el candidato perfecto."
            }
        ]
    },
    {
        id: 'process',
        label: 'Tiempos / Proceso',
        icon: Zap,
        questions: [
            {
                q: "¿Cuánto tiempo me va a quitar a mí?",
                a: "Tu tiempo es lo que queremos salvar. Solo necesitamos una sesión inicial de diagnóstico. Nosotros nos encargamos del 90% del trabajo sucio: diseño, configuración e integración. El sistema se adapta a tu forma de trabajar, no al revés."
            },
            {
                q: "¿En cuánto tiempo está funcionando?",
                a: "Un Agente Virtual de WhatsApp puede estar captando clientes en menos de 10-12 días. Los sistemas de gestión a medida tardan entre 3 y 5 semanas dependiendo de la complejidad."
            }
        ]
    },
    {
        id: 'tech',
        label: 'Técnica / Propiedad',
        icon: ShieldCheck,
        questions: [
            {
                q: "¿El código y el sistema son míos?",
                a: "Sí. Al 100%. No creemos en el 'secuestro tecnológico'. Una vez finalizado el proyecto, tú tienes las llaves. Si mañana decides no trabajar más con nosotros, tu sistema sigue funcionando en tu propia infraestructura."
            },
            {
                q: "¿Se integra con lo que ya uso?",
                a: "Hablamos con casi cualquier cosa: Holded, Shopify, Google Calendar, CRMs propios... Si tiene una API o una forma de conectar datos, nosotros lo unificamos."
            }
        ]
    }
];

const solutionAreas = [
    {
        title: 'Agente Virtual 24/7',
        icon: Target,
        sectors: ['hair', 'tattoo', 'plumber', 'clinic', 'restaurant', 'agency'],
        serviceId: 'automation',
        path: '/servicios/automatizacion-whatsapp',
        badge: 'Crecimiento',
        roi: 'Alta',
        color: '#6EE7B7',
        desc: 'Atención instantánea y captación sin fricción para tu negocio.',
        simulator: WhatsAppChatSim,
        items: [
            'Capta leads y agenda citas 24/7 por WhatsApp',
            'Cobra señales de reserva automáticamente',
            'Escala sin contratar a más personal de recepción'
        ]
    },
    {
        title: 'SEO Local Dominante',
        icon: Search,
        sectors: ['hair', 'tattoo', 'plumber', 'clinic', 'restaurant'],
        serviceId: 'seo',
        path: '/servicios/seo-local-estrategia',
        badge: 'Visibilidad',
        roi: 'Alta',
        color: '#3B82F6',
        desc: 'Domina las búsquedas locales y Google Maps en tu zona.',
        simulator: LocalSeoSimulator,
        items: [
            'Posicionamiento orgánico en Google Maps',
            'Auditoría estratégica de tu competencia local',
            'Captación recurrente sin depender de ads'
        ]
    },
    {
        title: 'Cerebro Central / ERP',
        icon: Database,
        sectors: ['plumber', 'agency', 'clinic', 'restaurant', 'hair', 'tattoo'],
        serviceId: 'dashboard',
        path: '/servicios/sistemas-gestion-personalizados',
        badge: 'Control',
        roi: 'Media',
        color: '#A855F7',
        desc: 'Control total de tu operativa desde un solo lugar.',
        simulator: CrmArchitectureSimulator,
        items: [
            'Facturación y control de stock automatizado',
            'Dashboards en tiempo real con tus KPIs críticos',
            'Elimina el caos de papeles y Excels infinitos'
        ]
    },
    {
        title: 'Web Corporativa Pro',
        icon: Globe,
        sectors: ['hair', 'tattoo', 'plumber', 'clinic', 'agency', 'restaurant'],
        serviceId: 'web',
        path: '/servicios/desarrollo-web-medida',
        badge: 'Premium',
        roi: 'Inmediata',
        color: '#F472B6',
        desc: 'Tu activo tecnológico más potente. Sin cuotas mensuales.',
        simulator: WebDevPerformanceSimulator,
        items: [
            'Diseño de alto impacto enfocado 100% a conversión',
            'Propiedad total del código y velocidad extrema',
            'Integración completa con tus sistemas y APIs'
        ]
    }
];

const Home = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hair');
    const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
    const [activeFaqCategory, setActiveFaqCategory] = useState('roi');
    const [scrollIndex, setScrollIndex] = useState(0);
    const scrollRef = useRef(null);
    const solutionPreviewRef = useRef(null);
    const solutionsMenuRef = useRef(null);
    const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);
    const [showFaqOnMobile, setShowFaqOnMobile] = useState(false);
    const content = contentMap[activeTab];
    const [siteConfig, setSiteConfig] = useState({
        whatsapp_url: 'https://wa.me/34600000000',
        instagram_url: 'https://instagram.com/engorilate',
        linkedin_url: 'https://linkedin.com/in/engorilate'
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data, error } = await supabase.from('site_config').select('key, value');
                if (error) throw error;
                const config = {};
                data?.forEach(item => { config[item.key] = item.value || ''; });
                setSiteConfig(prev => ({ ...prev, ...config }));
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };
        fetchConfig();
    }, []);

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

    // Reset selected solution when tab changes
    useEffect(() => {
        setSelectedSolutionIndex(0);
    }, [activeTab]);

    // Get filtered solutions for the active sector
    const filteredSolutions = [
        ...solutionAreas.filter(area => area.sectors.includes(activeTab)),
        {
            title: 'Arquitectura CRM / API',
            icon: Custom,
            isCustom: true,
            serviceId: 'other',
            path: '/servicios/sistemas-gestion-personalizados',
            badge: 'A Medida',
            roi: 'Exponencial',
            color: '#FB923C',
            desc: 'Ingeniería sutil para resolver problemas complejos y cuellos de botella.',
            simulator: CustomManagementSimulator,
            items: [
                'Resolución de cuellos de botella mediante código',
                'Integraciones profundas (API) entre tus apps',
                'Propiedad de tu stack técnico sin terceros'
            ]
        }
    ];

    const useCarousel = filteredSolutions.length > 3;

    return (
        <div className="relative pt-32 md:pt-48 pb-32 min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black">
            <SEO
                title="Sistemas que Venden por Ti | Ingeniería de Ventas | Engorilate"
                description="Automatiza los procesos repetitivos de tu empresa. Recupera tu tiempo y deja de perder dinero en gestión manual con ingeniería de precisión."
                keywords="automatización negocios murcia, digitalización pymes, eficiencia operativa"
            />
            <BackgroundMesh />

            {/* Ambient Background Elements - High Intensity Atmosphere */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" />
                <div className="absolute bottom-[5%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full animate-pulse opacity-60" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.05] opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center mb-24 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm self-center lg:self-start"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <span className="text-primary text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                                Sistema Operativo de Negocios v2.0
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
                        <div className="lg:col-span-12 xl:col-span-8 text-center lg:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-white mb-8 uppercase italic pr-2"
                            >
                                SISTEMAS QUE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 drop-shadow-[0_0_20px_rgba(110,231,183,0.5)]">VENDEN POR TI.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-white/90 font-light max-w-3xl leading-relaxed italic mb-12 border-l-2 lg:border-l-4 border-primary/40 pl-4 md:pl-6 mx-auto lg:mx-0"
                            >
                                Creamos infraestructuras automáticas que llenan tu agenda de clientes cada mañana. Profesionalizamos tu forma de captar clientes <span className="text-white font-bold">en tiempo récord</span>.
                            </motion.p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mt-12">
                        {[
                            {
                                title: 'BUSCAR EL ATASCO',
                                icon: Search,
                                step: '01',
                                content: 'Buscamos esas tareas pesadas que te roban todo el día y que te impiden ganar más dinero.',
                                highlight: [
                                    'Identificamos lo que te roba tiempo',
                                    'Vemos qué puede hacer el móvil solo',
                                    'Ganamos tu primera hora libre'
                                ]
                            },
                            {
                                title: 'MONTAR EL SISTEMA',
                                icon: Zap,
                                step: '02',
                                content: 'Instalamos herramientas inteligentes que trabajan por ti para que las cosas sigan funcionando solas.',
                                highlight: [
                                    'Atención y citas sin que tú mires',
                                    'Un sistema que nunca duerme',
                                    'Tú descansas, el negocio factura'
                                ]
                            },
                            {
                                title: 'PILOTO AUTOMÁTICO',
                                icon: TrendingUp,
                                step: '03',
                                content: 'Tu negocio se convierte en una máquina que funciona por sí sola. Tú mandas, el sistema ejecuta.',
                                highlight: [
                                    'Control total desde tu bolsillo',
                                    'Adiós a lo aburrido y repetitivo',
                                    'Libertad para lo que de verdad importa'
                                ]
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                className="group relative bg-[#0a0a0a] border border-white/[0.15] rounded-[2.5rem] pt-6 px-8 pb-8 md:pt-8 md:px-10 md:pb-10 overflow-hidden hover:border-primary/60 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_25px_50px_-12px_rgba(34,197,94,0.25)] flex flex-col h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(34,197,94,0.2)_inset,0_35px_70px_-15px_rgba(34,197,94,0.5)]"
                            >
                                {/* Rim Light Effect */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

                                {/* Background glow on hover */}
                                <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon and Title */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-700 shadow-inner">
                                            <item.icon className="w-7 h-7 text-white/40 group-hover:text-primary transition-all duration-500" />
                                        </div>
                                        <span className="text-7xl font-black text-white/[0.03] font-mono leading-none group-hover:text-primary/[0.1] transition-colors">
                                            {item.step}
                                        </span>
                                    </div>

                                    <div className="space-y-6 flex-grow flex flex-col">
                                        <div>
                                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-primary font-black mb-4 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                                FASE {item.step}
                                            </h4>
                                            <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter uppercase italic leading-tight mb-4">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed mb-6 italic">
                                            {item.content}
                                        </p>

                                        <div className="relative p-5 rounded-2xl bg-primary/[0.07] border border-primary/20 shadow-inner overflow-hidden group/benefit mt-auto min-h-[120px] md:min-h-[140px] flex flex-col justify-center">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/benefit:opacity-100 transition-opacity" />
                                            <ul className="relative z-10 space-y-2">
                                                {item.highlight.map((line, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-white text-xs md:text-sm font-semibold italic">
                                                        <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Early DiagnosisCTA - Positioned for Maximum Impact */}
                <div className="my-24">
                    <DiagnosisCTA />
                </div>

                {/* Introduction */}
                <div className="mb-20 max-w-4xl mt-32">
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
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-white uppercase italic tracking-tighter">
                        Cómo funcionaría tu negocio <br />
                        <span className="text-primary italic">con un poco más de orden</span>
                    </h2>
                    <p className="text-xl text-white/60 font-light max-w-3xl leading-relaxed">
                        Ejemplos reales de caos operativo convertidos en tranquilidad. Sin jerga técnica, solo causa y efecto.
                    </p>
                </div>

                {/* Tabs and Content */}
                <div className="w-full">
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mb-8 border-b border-white/5 pb-6 justify-center lg:justify-start">
                        {businessTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setActiveTab(type.id)}
                                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-mono tracking-widest uppercase transition-all duration-500 border ${activeTab === type.id
                                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(110,231,183,0.2)]'
                                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
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
                                    className={`absolute -left-4 md:-left-12 top-[200px] z-20 w-10 h-10 rounded-full bg-surface-dark/80 border border-white/10 flex items-center justify-center text-gray-100 backdrop-blur-sm transition-all hover:bg-primary hover:text-gray-900 shadow-xl ${scrollIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => scrollToIndex(Math.min(content.length - 1, scrollIndex + 1))}
                                    className={`absolute -right-4 md:-right-12 top-[200px] z-20 w-10 h-10 rounded-full bg-surface-dark/80 border border-white/10 flex items-center justify-center text-gray-100 backdrop-blur-sm transition-all hover:bg-primary hover:text-gray-900 shadow-xl ${scrollIndex === content.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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

                                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0a0a0a] border border-white/[0.1] p-8 md:p-12 rounded-[2.5rem] transition-all duration-700 items-start overflow-hidden group/card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03)_inset] hover:border-primary/40 hover:shadow-[0_30px_60px_-15px_rgba(34,197,94,0.15)]">
                                            {/* Rim Light */}
                                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

                                            <div className="lg:col-span-4 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                        <Search className="w-6 h-6 text-white/40" />
                                                    </div>
                                                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-wider">SITUACIÓN ACTUAL</span>
                                                </div>
                                                <p className="text-white/70 leading-relaxed text-lg font-normal">"{item.problem}"</p>
                                            </div>

                                            <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                        <Zap className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-wider">INTERVENCIÓN TÉCNICA</span>
                                                </div>
                                                <p className="text-white font-bold text-xl md:text-2xl tracking-tight leading-snug">{item.solution}</p>
                                            </div>

                                            <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                                        <CheckCircle className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-wider">MÉTRICA DE ÉXITO</span>
                                                </div>
                                                <p className="text-primary font-bold text-lg md:text-xl leading-relaxed tracking-tight">{item.result}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        {content.length > 1 && (
                            <div className="flex justify-center gap-2 mt-3">
                                {content.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollIndex === idx ? 'bg-primary w-6' : 'bg-white/20 hover:bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        )}




                        {/* Specific Solutions Grid - Integrated */}
                        {/* Specific Solutions Grid - Integrated as a Product Showcase */}
                        {/* NEW PREMIUM SHOWCASE NAVIGATOR */}
                        <div className="mt-10 relative">
                            <div className="flex flex-col items-center text-center mb-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-6 inline-block px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-full"
                                >
                                    <span className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                                        Catálogo de Soluciones de Alto Impacto
                                    </span>
                                </motion.div>
                                <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                                    Sistemas listos para <span className="text-primary font-light">implementar</span>
                                </h3>
                                <p className="text-white/70 max-w-xl text-base font-light leading-relaxed">
                                    Abre el capó de lo que podemos construir para tu pyme hoy mismo.
                                </p>
                            </div>

                            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-start min-h-[500px]">
                                {/* LEFT MENU: TITLES */}
                                <div
                                    ref={solutionsMenuRef}
                                    className="lg:col-span-4 space-y-3"
                                >
                                    {filteredSolutions.map((area, idx) => (
                                        <button
                                            key={area.title}
                                            onClick={() => {
                                                setSelectedSolutionIndex(idx);
                                                if (window.innerWidth < 1024) {
                                                    setShowPreviewOnMobile(true);
                                                }
                                            }}
                                            className={`w-full text-left p-5 rounded-2xl transition-all duration-700 border group relative overflow-hidden ${selectedSolutionIndex === idx
                                                ? 'bg-primary/10 border-primary/50 shadow-[0_20px_40px_rgba(110,231,183,0.15)]'
                                                : 'border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            {/* Selection Bar */}
                                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full transition-all duration-700 ${selectedSolutionIndex === idx ? 'bg-primary shadow-[0_0_15px_rgba(110,231,183,1)]' : 'bg-white/10 group-hover:bg-white/30'
                                                }`} />

                                            <div className="pl-4">
                                                <h4 className={`text-xl md:text-2xl font-display font-bold tracking-tight transition-all duration-500 ${selectedSolutionIndex === idx ? 'text-white' : 'text-white/80 group-hover:text-white'}
                                                    }`}>
                                                    {area.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className={`text-xs font-mono font-bold uppercase tracking-wider transition-all duration-500 ${selectedSolutionIndex === idx ? 'text-primary' : 'text-white/50'
                                                        }`}>
                                                        {area.badge}
                                                    </span>
                                                    <div className={`w-1 h-1 rounded-full ${selectedSolutionIndex === idx ? 'bg-primary' : 'bg-white/10'}`} />
                                                    <span className={`text-xs font-mono font-bold uppercase tracking-wider transition-all duration-500 ${selectedSolutionIndex === idx ? 'text-primary' : 'text-white/50'
                                                        }`}>
                                                        ROI {area.roi}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* RIGHT: RICH PREVIEW CARD (DESKTOP) */}
                                <div className="hidden lg:block lg:col-span-8 relative" ref={solutionPreviewRef}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedSolutionIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4, ease: "circOut" }}
                                            className="relative bg-[#0a0a0a] border border-white/[0.15] p-8 md:p-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] min-h-[550px] transition-all duration-700 hover:border-primary/60 group/card"
                                        >
                                            {/* Rim Light */}
                                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

                                            {/* Dynamic Ambient Light */}
                                            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] blur-[150px] rounded-full opacity-30 transition-all duration-1000"
                                                style={{ backgroundColor: filteredSolutions[selectedSolutionIndex].color || '#6EE7B7' }} />

                                            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full">
                                                {/* Left Column: Text Content */}
                                                <div className="flex flex-col justify-center h-full">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-primary shadow-inner">
                                                            {React.createElement(filteredSolutions[selectedSolutionIndex].icon, { className: "w-8 h-8" })}
                                                        </div>
                                                        <div>
                                                            <span className="text-primary/60 font-mono text-xs uppercase tracking-wider block mb-1 font-bold">Tecnología de Élite</span>
                                                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                                                                {filteredSolutions[selectedSolutionIndex].title}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <p className="text-white/80 text-lg font-light italic leading-relaxed mb-8 border-l-2 border-primary/30 pl-6">
                                                        "{filteredSolutions[selectedSolutionIndex].desc}"
                                                    </p>

                                                    <ul className="space-y-4 mb-10">
                                                        {filteredSolutions[selectedSolutionIndex].items.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 group/item">
                                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20 group-hover/item:bg-primary group-hover/item:text-black transition-all">
                                                                    <CheckCircle className="w-4 h-4 text-primary group-hover/item:text-inherit" />
                                                                </div>
                                                                <span className="text-white/70 text-base md:text-lg font-medium group-hover/item:text-white transition-colors">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <button
                                                            onClick={() => {
                                                                const sol = filteredSolutions[selectedSolutionIndex];
                                                                sol.path ? navigate(sol.path) : navigate(`/contact?service=${sol.serviceId}`);
                                                            }}
                                                            className="group/btn relative bg-primary hover:bg-white text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(34,197,94,0.3)] text-xs overflow-hidden"
                                                        >
                                                            <span className="relative z-10">Explorar Solución</span>
                                                            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                                            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                                        </button>

                                                        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 italic">
                                                            <p className="text-white/30 text-[8px] block uppercase font-mono font-black tracking-widest">Consultoría</p>
                                                            <p className="text-white font-black text-sm uppercase tracking-tighter">GRATUITA</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column: Interactive Simulator */}
                                                <div className="relative h-full flex items-center justify-center lg:pl-6">
                                                    <div className="w-full relative">
                                                        {/* Simulator wrapper to scale slightly on desktop if needed */}
                                                        <div className="transform scale-95 xl:scale-100 transition-transform duration-700">
                                                            {filteredSolutions[selectedSolutionIndex].simulator &&
                                                                <React.Suspense fallback={<div className="w-full h-64 bg-white/5 animate-pulse rounded-2xl flex items-center justify-center text-gray-500 font-mono text-xs">CARGANDO SIMULADOR...</div>}>
                                                                    {React.createElement(filteredSolutions[selectedSolutionIndex].simulator)}
                                                                </React.Suspense>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Availability badge removed */}
                                </div>
                            </div>

                            {/* MOBILE MODAL SHOWCASE */}
                            <AnimatePresence>
                                {showPreviewOnMobile && (
                                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 lg:hidden pt-24">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setShowPreviewOnMobile(false)}
                                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-5 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[92vh]"
                                        >
                                            {/* Close Button */}
                                            <button
                                                onClick={() => setShowPreviewOnMobile(false)}
                                                className="absolute top-4 right-4 z-[30] p-2 rounded-full bg-white/5 border border-white/10 text-gray-400"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            <div className="relative z-10">
                                                {/* Compact Header */}
                                                <div className="flex items-center gap-4 mb-4 pr-10">
                                                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary flex-shrink-0">
                                                        {React.createElement(filteredSolutions[selectedSolutionIndex].icon, { className: "w-5 h-5" })}
                                                    </div>
                                                    <h3 className="text-xl font-display font-bold text-gray-100 tracking-tight leading-tight">
                                                        {filteredSolutions[selectedSolutionIndex].title}
                                                    </h3>
                                                </div>

                                                {/* Simulator on Mobile Modal */}
                                                <div className="mb-0 transform scale-95 origin-top -mt-4">
                                                    {filteredSolutions[selectedSolutionIndex].simulator &&
                                                        <React.Suspense fallback={<div className="w-full h-32 bg-white/5 animate-pulse rounded-xl" />}>
                                                            {React.createElement(filteredSolutions[selectedSolutionIndex].simulator)}
                                                        </React.Suspense>
                                                    }
                                                </div>

                                                <div className="space-y-4 -mt-2">
                                                    <p className="text-gray-100 text-base font-bold italic leading-relaxed border-l-2 border-primary/60 pl-4 py-1">
                                                        "{filteredSolutions[selectedSolutionIndex].desc}"
                                                    </p>

                                                    <ul className="grid grid-cols-1 gap-2">
                                                        {filteredSolutions[selectedSolutionIndex].items.slice(0, 3).map((item, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                                                                <span className="text-gray-300 text-[11px] font-medium leading-tight">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="flex flex-col gap-3 pt-2">
                                                        <button
                                                            onClick={() => {
                                                                const sol = filteredSolutions[selectedSolutionIndex];
                                                                sol.path ? navigate(sol.path) : navigate(`/contact?service=${sol.serviceId}`);
                                                            }}
                                                            className="w-full bg-primary text-black font-black py-3.5 rounded-xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                                                        >
                                                            Explorar Solución <ArrowRight className="w-3 h-3" />
                                                        </button>

                                                        <div className="w-full py-2.5 rounded-xl bg-white/5 border border-white/5 text-center flex items-center justify-center gap-2">
                                                            <span className="text-white/30 text-[8px] uppercase font-mono font-black tracking-widest">Consultoría</span>
                                                            <span className="text-white font-black text-xs uppercase tracking-tighter">GRATUITA</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>



                    {/* FAQ & Contact Section - Consolidated Premium Experience */}
                    <div className="mt-40 mb-32">
                        <div className="grid lg:grid-cols-12 gap-20">
                            {/* Left: FAQ Explorer */}
                            <div className="lg:col-span-12 xl:col-span-5">
                                <div className="xl:sticky xl:top-32">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="mb-8 inline-block px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-lg"
                                    >
                                        <span className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                                            FAQ - Dudas Reales
                                        </span>
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-6">
                                        <span className="italic">Lo que otros dueños</span> <br /> <span className="text-primary font-light italic">preguntaron antes.</span>
                                    </h2>
                                    <p className="text-white/70 text-lg font-light leading-relaxed mb-12">
                                        Sin filtros, sin rodeos y basándonos en resultados de clientes.
                                    </p>

                                    <div className="space-y-2">
                                        {faqCategories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => {
                                                    setActiveFaqCategory(cat.id);
                                                    if (window.innerWidth < 1024) {
                                                        setShowFaqOnMobile(true);
                                                    }
                                                }}
                                                className={`w-full flex items-center gap-3 py-3 px-4 transition-all duration-300 group border-l-2 ${activeFaqCategory === cat.id
                                                    ? 'border-primary text-primary bg-primary/5'
                                                    : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20'
                                                    }`}
                                            >
                                                <cat.icon className={`w-4 h-4 transition-colors ${activeFaqCategory === cat.id ? 'text-primary' : 'text-inherit'}`} />
                                                <span className="font-mono text-xs uppercase tracking-widest font-bold">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Answer Cards (Desktop Only) */}
                            <div className="hidden lg:block lg:col-span-12 xl:col-span-7">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeFaqCategory}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-6"
                                    >
                                        {faqCategories.find(c => c.id === activeFaqCategory)?.questions.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="group bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                                            >
                                                <h3 className="text-xl md:text-2xl font-semibold text-white/90 tracking-tight mb-4 flex items-start gap-3">
                                                    <span className="text-primary/60 font-mono text-sm mt-1 font-normal">Q{idx + 1}.</span>
                                                    {item.q}
                                                </h3>
                                                <p className="text-white/50 text-base md:text-lg leading-relaxed font-light pl-6 border-l border-white/5">
                                                    {item.a}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* MOBILE FAQ MODAL */}
                        <AnimatePresence>
                            {showFaqOnMobile && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:hidden">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setShowFaqOnMobile(false)}
                                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="relative w-full max-w-lg bg-[#111111] border-2 border-white/10 p-6 md:p-8 rounded-[2rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={() => setShowFaqOnMobile(false)}
                                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
                                                    {React.createElement(faqCategories.find(c => c.id === activeFaqCategory)?.icon || HelpCircle, { className: "w-6 h-6" })}
                                                </div>
                                                <div>
                                                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.2em] block mb-1 opacity-60">FAQ</span>
                                                    <h3 className="text-2xl font-display font-bold text-gray-100 tracking-tight">
                                                        {faqCategories.find(c => c.id === activeFaqCategory)?.label}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {faqCategories.find(c => c.id === activeFaqCategory)?.questions.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6"
                                                    >
                                                        <h4 className="text-xl font-semibold text-white/90 tracking-tight mb-4 flex items-start gap-2">
                                                            <span className="text-primary/60 font-mono text-sm mt-1">Q{idx + 1}.</span>
                                                            <span>{item.q}</span>
                                                        </h4>
                                                        <p className="text-white/80 text-base leading-relaxed font-light pl-6 border-l border-white/5">
                                                            {item.a}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>



                    {/* Final Contact Section - Fluid & Industrial */}
                    <div className="mt-24 relative overflow-hidden">
                        {/* Atmospheric Glow Elements - Floating directly in the background */}
                        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                                <div className="lg:col-span-1 space-y-10 flex flex-col">
                                    <div className="max-w-2xl space-y-10 flex-grow flex flex-col">

                                        {/* Technical Pricing Card */}
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/10">
                                                <div>
                                                    <p className="text-white/60 text-xs uppercase tracking-wider font-mono mb-2">Inversión Típica</p>
                                                    <h3 className="text-white font-black text-2xl tracking-tight">Rango de Proyecto</h3>
                                                </div>
                                            </div>

                                            <div className="flex flex-row items-end gap-2 mb-6">
                                                <span className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">600 - 2.500</span>
                                                <span className="text-2xl md:text-3xl font-black text-primary mb-1 md:mb-2">€</span>
                                            </div>

                                            <div className="bg-primary/5 border-l-2 border-primary/50 pl-4 py-3">
                                                <p className="text-white/70 text-sm font-medium leading-relaxed">
                                                    Amortización técnica estimada en <span className="text-primary font-bold text-base">menos de 2 meses</span>.
                                                </p>
                                                <p className="text-white/60 text-xs mt-1">
                                                    A partir de ahí, todo el ahorro es estructural.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Return Paths */}
                                        <div className="space-y-6 pl-6 border-l-2 border-primary/10">
                                            <div>
                                                <h4 className="text-white/50 text-xs uppercase tracking-wider font-bold mb-6">Vías de Retorno:</h4>

                                                <div className="grid gap-5">
                                                    <div className="flex gap-4 group">
                                                        <div className="mt-0.5 w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                                                            <TrendingUp className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-bold text-base mb-1 tracking-tight">Incremento de Rotación</p>
                                                            <p className="text-white/50 text-sm leading-relaxed">Escala tu capacidad sin contratar más manos.</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 group">
                                                        <div className="mt-0.5 w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-bold text-base mb-1 tracking-tight">Blindaje contra Errores</p>
                                                            <p className="text-white/50 text-sm leading-relaxed">Elimina las fugas de dinero por despistes.</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 group">
                                                        <div className="mt-0.5 w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                                                            <Zap className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-bold text-base mb-1 tracking-tight">Expansión de Margen</p>
                                                            <p className="text-white/50 text-sm leading-relaxed">Reduce el coste operativo de cada euro vendido.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                                <div className="lg:col-span-1 relative flex flex-col h-full">
                                    {/* Ambient lighting removed for cleaner look */}
                                    <div className="relative">
                                        <div className="mb-8 border-l-4 border-primary/40 pl-8 pt-2">
                                            <h4 className="text-3xl md:text-5xl font-display font-black text-white italic tracking-tighter uppercase leading-none mb-3">
                                                ¿HABLAMOS <br />
                                                <span className="text-primary not-italic">DIRECTO?</span>
                                            </h4>
                                            <p className="text-white/20 text-[11px] uppercase tracking-[0.4em] font-mono font-bold">Respuesta en menos de 24 horas</p>
                                        </div>
                                        <div className="relative">
                                            <ContactForm source="Home Bottom Section" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
