import React, { useRef, useState, useEffect } from 'react';
import DiagnosisForm from '../components/diagnosis/DiagnosisForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target, ArrowDown, ShieldCheck, TrendingUp, Clock, LayoutGrid, Flame, UserMinus, Dice5, GitMerge, EyeOff, AlertCircle, MessageSquare, ShoppingCart, Star, PenTool, Rocket, ArrowRight, Linkedin, ChevronLeft, ChevronRight, X, Info, Plus } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchFullConfig } from '../lib/siteConfig';

const Diagnosis = () => {
    const formRef = useRef(null);
    const [pillarIndex, setPillarIndex] = useState(0);
    const [chaosIndex, setChaosIndex] = useState(0);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [whatsappUrl, setWhatsappUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');

    // Modal & Scroll State/Refs
    const pillarsScrollRef = useRef(null);
    const chaosScrollRef = useRef(null);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const serviceDetails = {
        // Pillars
        "Comunicación": {
            title: "Sistema de Comunicación Inteligente",
            subtitle: "WhatsApp no es un sistema de gestión, es un canal.",
            description: "La mayoría de negocios mueren por una mala gestión de la comunicación: mensajes perdidos, clientes esperando y dueños esclavizados al teléfono.",
            benefits: [
                "Automatización de respuestas frecuentes con IA.",
                "Centralización de canales (WhatsApp, IG, Web).",
                "Trazabilidad total: sabe quién dijo qué y cuándo.",
                "Escalabilidad: atiende a 100 clientes con el mismo esfuerzo que a 1."
            ],
            icon: MessageSquare,
            color: "text-blue-400"
        },
        "Ventas": {
            title: "Motor de Ventas Predecible",
            subtitle: "De captación reactiva a un embudo que convierte solo.",
            description: "Vender no debe ser una cuestión de suerte. Necesitas un sistema que califique, nutra y cierre leads mientras tú te enfocas en entregar valor.",
            benefits: [
                "CRM automatizado para que ningún lead se enfríe.",
                "Estrategias de retargeting automático.",
                "Pipeline visual de ingresos futuros.",
                "Optimización de tasa de cierre basada en datos."
            ],
            icon: ShoppingCart,
            color: "text-emerald-400"
        },
        "Autoridad": {
            title: "Posicionamiento de Autoridad",
            subtitle: "Deja de competir por precio y empieza a liderar.",
            description: "La autoridad te permite elegir a tus clientes y cobrar lo que realmente vale tu trabajo. Tu sistema debe reflejar esa excelencia.",
            benefits: [
                "SEO Local de alto impacto para dominar tu zona.",
                "Gestión proactiva de reseñas y prueba social.",
                "Páginas de aterrizaje diseñadas para la conversión.",
                "Estrategia de marca que genera confianza inmediata."
            ],
            icon: Star,
            color: "text-amber-400"
        },
        "Sistemas": {
            title: "Ecosistema de Sistemas Operativos",
            subtitle: "La tecnología que trabaja para ti, no al revés.",
            description: "Un negocio sin procesos es un hobby caro. Los sistemas son los activos que te dan la libertad que buscabas cuando empezaste.",
            benefits: [
                "Integración total entre herramientas (n8n, Odoo, etc).",
                "Cuadros de mando (KPIs) en tiempo real.",
                "Eliminación de tareas repetitivas y errores humanos.",
                "Seguridad y backups automáticos de tu capital intelectual."
            ],
            icon: LayoutGrid,
            color: "text-purple-400"
        },
        // Chaos Types
        "Agendas y Reservas": {
            title: "Control Total de Agendas",
            subtitle: "Optimización máxima de tu recurso más escaso: el tiempo.",
            description: "Los huecos muertos y las cancelaciones de última hora son cáncer para la rentabilidad. Tu sistema debe prevenir esto automáticamente.",
            benefits: [
                "Reservas 24/7 sincronizadas con tu equipo.",
                "Recordatorios automáticos multi-canal (SMS/WA).",
                "Cobro de señales para garantizar el compromiso.",
                "Gestión de listas de espera inteligente."
            ],
            icon: Clock,
            color: "text-blue-400"
        },
        "Producción y Pedidos": {
            title: "Sincronización de Producción",
            subtitle: "Cero errores, máxima eficiencia operativa.",
            description: "El caos en la producción genera retrasos y devoluciones que destruyen tu margen. La visibilidad total es la solución.",
            benefits: [
                "Trazabilidad de estados en tiempo real.",
                "Generación automática de albaranes y facturas.",
                "Notificaciones automáticas de progreso al cliente.",
                "Control de tiempos y costes por cada pedido."
            ],
            icon: Zap,
            color: "text-yellow-400"
        },
        "Stock e Inventario": {
            title: "Gestión Inteligente de Inventario",
            subtitle: "Tu dinero no debe estar acumulando polvo en un estante.",
            description: "El stock inmovilizado es capital perdido. Necesitas previsión y control para comprar solo lo que vas a vender.",
            benefits: [
                "Alertas automáticas de stock mínimo.",
                "Previsión de demanda basada en historial.",
                "Gestión de proveedores centralizada.",
                "Análisis de rotación para maximizar márgenes."
            ],
            icon: LayoutGrid,
            color: "text-green-400"
        },
        "Proyectos y Consultoría": {
            title: "Escalabilidad de Conocimiento",
            subtitle: "Convierte tu know-how en un proceso repetible.",
            description: "Si el proyecto depende de tu memoria o de tu presencia constante, no puedes escalar. Necesitas procedimentar tu talento.",
            benefits: [
                "Gestión de tareas y hitos automatizada.",
                "Portales de cliente para autoservicio.",
                "Documentación interactiva y base de conocimientos.",
                "Facturación recurrente y control de horas."
            ],
            icon: Brain,
            color: "text-purple-400"
        },
        "Capital Humano Perdido": {
            title: "Recuperación de Capital Humano",
            subtitle: "Tu equipo no es un recurso, es el motor de tu negocio.",
            description: "El tiempo dedicado a tareas repetitivas y manuales no solo es dinero perdido, es talento desperdiciado que genera frustración y rotación.",
            benefits: [
                "Eliminación de la fatiga por tareas duplicadas.",
                "Redirección del personal hacia tareas de alto valor.",
                "Automatización de la gestión interna y reporting.",
                "Sistemas que permiten a tu equipo escalar sin sobreesfuerzo."
            ],
            icon: Clock,
            color: "text-blue-400"
        },
        "Erosión de Márgenes": {
            title: "Preservación de Rentabilidad",
            subtitle: "No se trata de cuánto facturas, sino de cuánto te queda.",
            description: "La falta de sistemas genera ineficiencias invisibles que van 'mordiendo' tus márgenes hasta que el crecimiento se vuelve peligroso.",
            benefits: [
                "Control de costes operativo en tiempo real.",
                "Optimización de recursos y reducción de mermas.",
                "Precios basados en datos reales de ejecución.",
                "Detección inmediata de fugas de rentabilidad."
            ],
            icon: TrendingUp,
            color: "text-emerald-400"
        },
        "Ventas Sin Cerrar": {
            title: "Cierre de Fugas de Ventas",
            subtitle: "Deja de dejar dinero sobre la mesa.",
            description: "El 80% de las ventas requieren un seguimiento constante. Sin un sistema, esos leads se pierden en el olvido o se van con la competencia.",
            benefits: [
                "Automatización de seguimiento personalizado.",
                "Scoring de leads para priorizar el esfuerzo humano.",
                "Alertas de inactividad en oportunidades clave.",
                "Análisis de motivos de pérdida para mejora continua."
            ],
            icon: Zap,
            color: "text-yellow-400"
        },
        "Coste de Oportunidad": {
            title: "Liberación de Oportunidades",
            subtitle: "El verdadero coste de no hacer nada.",
            description: "Lo más caro no es lo que gastas en sistemas, sino lo que dejas de ganar al no poder abrir nuevas líneas de negocio por falta de estructura.",
            benefits: [
                "Estructura lista para absorber nuevos mercados.",
                "Capacidad instalada para lanzar nuevos servicios.",
                "Mentalidad de dueño liberada para la estrategia.",
                "Crecimiento predecible y documentado."
            ],
            icon: Target,
            color: "text-purple-400"
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflowY = 'scroll'; // Prevent layout shift from scrollbar disappearing
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflowY = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflowY = '';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchFullConfig();
            if (config?.diagnosis_youtube_url) {
                setYoutubeUrl(config.diagnosis_youtube_url);
            }
            if (config?.whatsapp_url) {
                setWhatsappUrl(config.whatsapp_url);
            }
            if (config?.linkedin_url) {
                setLinkedinUrl(config.linkedin_url);
            }
        };
        loadConfig();
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = (e, setter) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setter(index);
    };

    const scrollContainer = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = ref.current.offsetWidth * 0.8;
            ref.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollToPoint = (ref, index) => {
        if (ref.current) {
            const cardWidth = ref.current.offsetWidth;
            ref.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
    };

    const openModal = (key) => {
        setModalData(serviceDetails[key]);
        setIsModalOpen(true);
    };

    const ServiceModal = () => (
        <AnimatePresence>
            {isModalOpen && modalData && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center md:p-4 overflow-y-auto outline-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 bg-black/95 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full min-h-screen md:min-h-0 md:h-auto md:max-w-2xl bg-[#0D0D0D] md:rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,1)] border-x md:border border-white/10 z-10"
                    >
                        {/* Close button - Fixed on mobile top */}
                        <div className="sticky top-0 z-50 flex justify-end p-6 bg-gradient-to-b from-[#0D0D0D] to-transparent">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 backdrop-blur-xl"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="px-6 pb-12 md:px-12 md:pb-12 space-y-8 -mt-4">
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-white/[0.03] flex items-center justify-center ${modalData.color} shrink-0 border border-white/10 shadow-2xl`}>
                                    <modalData.icon className="w-10 h-10 md:w-12 md:h-12" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl md:text-5xl font-display font-black text-white leading-tight uppercase italic tracking-tighter">
                                        {modalData.title}
                                    </h3>
                                    <p className="text-primary font-black text-xs md:text-sm uppercase tracking-[0.3em]">{modalData.subtitle}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium italic text-center md:text-left border-l-4 border-primary/20 pl-6 py-2 bg-primary/5 rounded-r-2xl">
                                    "{modalData.description}"
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-grow bg-white/10" />
                                        <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] whitespace-nowrap">
                                            Beneficios de Impacto
                                        </h4>
                                        <div className="h-px flex-grow bg-white/10" />
                                    </div>
                                    <div className="grid gap-3">
                                        {modalData.benefits.map((benefit, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all group/item"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(110,231,183,0.6)] group-hover/item:scale-125 transition-transform" />
                                                <p className="text-sm md:text-lg text-gray-200 font-bold leading-tight group-hover/item:text-white transition-colors">{benefit}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full py-6 rounded-2xl bg-primary text-black font-black uppercase tracking-[0.2em] hover:bg-primary-hover transition-all shadow-[0_25px_50px_rgba(110,231,183,0.25)] hover:scale-[1.02] active:scale-95 text-xs md:text-base"
                                >
                                    Entendido, continuar diagnóstico
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    const VerticalConnector = ({ height = "h-16 md:h-20", opacity = "opacity-30 md:opacity-50" }) => (
        <div className={`flex flex-col items-center w-full ${height} ${opacity} relative z-0`}>
            <div className="w-[1px] md:w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(110,231,183,0.3)] animate-pulse" />
        </div>
    );

    const BracketConnector = ({ type = "down", height = 80 }) => (
        <div className="hidden md:block relative w-full overflow-visible z-0" style={{ height }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={type === "down"
                        ? "M 500 0 L 500 40 M 500 40 L 125 40 L 125 100 M 500 40 L 375 40 L 375 100 M 500 40 L 625 40 L 625 100 M 500 40 L 875 40 L 875 100"
                        : "M 125 0 L 125 60 L 500 60 L 500 100 M 375 0 L 375 60 M 625 0 L 625 60 M 875 0 L 875 60 L 500 60"
                    }
                    stroke="#6ee7b7"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                />
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={type === "down"
                        ? "M 500 0 L 500 40 M 500 40 L 125 40 L 125 100 M 500 40 L 375 40 L 375 100 M 500 40 L 625 40 L 625 100 M 500 40 L 875 40 L 875 100"
                        : "M 125 0 L 125 60 L 500 60 L 500 100 M 375 0 L 375 60 M 625 0 L 625 60 M 875 0 L 875 60 L 500 60"
                    }
                    stroke="#6ee7b7"
                    strokeWidth="6"
                    strokeOpacity="0.2"
                    className="blur-[4px]"
                />
            </svg>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
            <style>
                {`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>
            <SEO
                title="Diagnóstico de Eficiencia Operativa"
                description="Descubre los cuellos de botella de tu negocio en 7 minutos. Recibe un informe personalizado analizado por IA para eliminar el caos."
            />

            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full grid-pattern opacity-10"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
            </div>

            {/* BLOQUE 1 — IMPACTO INICIAL (REDISEÑO PREMIUM) */}
            <section className="relative z-10 pt-24 md:pt-40 pb-12 px-4 md:px-6 overflow-hidden">
                {/* Glow Central Focalizador */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full opacity-30 animate-pulse pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10 md:space-y-14">
                    {/* Badges Glass Premium */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap justify-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-primary text-[10px] md:text-xs font-black tracking-[0.2em] uppercase shadow-xl ring-1 ring-white/10 hover:bg-white/10 transition-all cursor-default group">
                            <Brain className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">Análisis Asistido por IA</span>
                        </div>
                    </motion.div>

                    {/* Titular Titánico */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-black leading-none tracking-tighter">
                            <span className="text-white">Diagnóstico</span> <br />
                            <span className="bg-gradient-to-br from-primary via-white to-primary bg-clip-text text-transparent italic drop-shadow-[0_10px_30px_rgba(110,231,183,0.3)]">Eficiencia Operativa</span>
                        </h1>
                    </motion.div>

                    {/* Cita de Autoridad en Contenedor Glass */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden group">
                            {/* Micro shimmer efecto */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <p className="text-xl md:text-3xl text-gray-400 font-medium leading-tight tracking-tight lowercase">
                                        Si el negocio depende de ti para funcionar...
                                    </p>
                                    <p className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none bg-gradient-to-r from-primary via-[#4ADE80] to-white bg-clip-text text-transparent uppercase tracking-tighter drop-shadow-2xl">
                                        no tienes un sistema.
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-lg md:text-2xl text-gray-400 font-medium italic leading-relaxed">
                                        "Tienes un problema de control que te está costando <br className="hidden md:block" />
                                        <span className="text-primary italic">tiempo, dinero y tranquilidad.</span>"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Indicadores de Scroll */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-2 flex flex-col items-center gap-3 text-primary/50"
                    >
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll para iniciar</p>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* AJUSTE 1 — BRIEFING DE SOLUCIÓN */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto mt-8 px-2 md:px-6"
            >
                <div className="relative p-[1px] rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-white/30 via-primary/40 to-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="bg-[#0C0C0C] backdrop-blur-3xl rounded-[1.9rem] md:rounded-[2.9rem] p-4 md:p-10 relative overflow-hidden group border border-white/5">
                        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                            {/* Text Content */}
                            <div className="lg:col-span-12 xl:col-span-5 space-y-4 md:space-y-6 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[10px] md:text-xs font-black uppercase tracking-[0.25em]">
                                    <Target className="w-3.5 h-3.5 text-primary" /> Briefing de Eficiencia
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight tracking-tight">
                                    Detecta las fugas <br className="hidden md:block" />
                                    <span className="text-primary italic">que frenan tu negocio.</span>
                                </h2>
                                <p className="text-gray-400 font-normal text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    En este video te explico cómo recuperar el control y diseñar el sistema que trabaje por ti para que recuperes el control y la paz mental.
                                </p>
                            </div>

                            {/* YouTube Video */}
                            {youtubeUrl && (
                                <div className="lg:col-span-12 xl:col-span-7 relative w-full group/video">
                                    <div className="relative w-full pb-[56.25%] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 group-hover/video:border-primary/30 transition-all duration-500">
                                        <iframe
                                            src={(youtubeUrl.includes('watch?v=')
                                                ? youtubeUrl.replace('watch?v=', 'embed/')
                                                : youtubeUrl.includes('youtu.be/')
                                                    ? youtubeUrl.replace('youtu.be/', 'youtube.com/embed/')
                                                    : youtubeUrl).replace('youtube.com', 'youtube-nocookie.com') + "?autoplay=1&mute=0&modestbranding=1&rel=0&controls=1&enablejsapi=1"}
                                            title="Briefing de Diagnóstico"
                                            className="absolute top-0 left-0 w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Contact Buttons - Inside Module */}
                            <div className="lg:col-span-12 relative z-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-2 w-full">
                                <a
                                    href={whatsappUrl || "https://wa.me/34600000000"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs md:text-base transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center gap-3 flex-1 lg:flex-none justify-center"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span className="hidden sm:inline">Hablar por WhatsApp</span>
                                    <span className="sm:hidden">WhatsApp</span>
                                </a>

                                <button
                                    onClick={scrollToForm}
                                    className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-primary hover:bg-primary-hover text-background-dark rounded-full font-black text-xs md:text-base transition-all duration-300 shadow-[0_15px_40px_rgba(110,231,183,0.3)] hover:scale-105 flex items-center gap-3 flex-1 lg:flex-none justify-center uppercase tracking-widest"
                                >
                                    <Brain className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="hidden sm:inline">Solicitar Diagnóstico</span>
                                    <span className="sm:hidden">Diagnóstico</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <VerticalConnector height="h-20 md:h-24" />

            {/* BLOQUE 2 — ESPEJO DEL DUEÑO (DOLOR REAL) */}
            <section className="relative z-10 py-12 md:py-20 px-4 md:px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 md:space-y-16"
                    >
                        <div className="text-center space-y-3 md:space-y-4">
                            <h2 className="text-3xl md:text-6xl font-display font-bold leading-tight">
                                <span className="bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent">Reconoce los síntomas:</span> <br className="hidden md:block" />
                                <span className="text-gray-400 italic font-light">¿Te suena familiar alguno de estos?</span>
                            </h2>
                        </div>

                        <BracketConnector type="down" height={60} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[
                                { text: "Si hoy no estás presente, tu negocio se resiente de inmediato.", icon: UserMinus, color: "text-blue-400" },
                                { text: "Vives en un incendio constante: solo apagas fuegos del día a día.", icon: Flame, color: "text-orange-400" },
                                { text: "Decisiones críticas basadas en intuición, no en datos reales.", icon: Dice5, color: "text-purple-400" },
                                { text: "El cuello de botella eres tú: todo debe pasar por tus manos.", icon: GitMerge, color: "text-green-400" },
                                { text: "Trabajas sin descanso pero no tienes claridad operativa.", icon: EyeOff, color: "text-red-400" }
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-[#121212] to-[#080808] border-2 border-white/20 hover:border-primary/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                                >
                                    {/* Subtle internal green glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 ${point.color} shrink-0 ring-1 ring-white/10 group-hover:ring-primary/40 shadow-lg`}>
                                            <point.icon className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors">
                                            {point.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <BracketConnector type="up" height={60} />

                        <div className="pt-12 md:pt-24 text-center space-y-3 md:space-y-4">
                            <p className="text-lg md:text-2xl text-gray-400 font-medium italic">
                                Esto no es falta de esfuerzo ni de talento.
                            </p>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative py-4 md:py-8"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-20 animate-pulse" />
                                <p className="relative z-10 text-3xl md:text-6xl lg:text-7xl font-display font-black text-primary uppercase tracking-tighter leading-none">
                                    Es falta de sistema
                                </p>
                            </motion.div>
                            <div className="mt-8 md:mt-12">
                                <VerticalConnector height="h-16 md:h-24" />
                            </div>
                        </div>

                        {/* DIAGRAMA DE PILARES */}
                        <div className="relative mt-8 md:mt-12">
                            {/* Desktop SVG Connectors */}
                            <div className="hidden md:block relative h-28 w-full mb-12">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 110" fill="none" preserveAspectRatio="none">
                                    {/* Outer glow path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 500 0 L 500 40 M 500 40 L 125 40 L 125 110 M 500 40 L 375 40 L 375 110 M 500 40 L 625 40 L 625 110 M 500 40 L 875 40 L 875 110"
                                        stroke="#6ee7b7"
                                        strokeWidth="8"
                                        className="blur-[6px]"
                                    />
                                    {/* Main solid path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 500 0 L 500 40 M 500 40 L 125 40 L 125 110 M 500 40 L 375 40 L 375 110 M 500 40 L 625 40 L 625 110 M 500 40 L 875 40 L 875 110"
                                        stroke="#6ee7b7"
                                        strokeWidth="2.5"
                                    />
                                </svg>
                            </div>

                            {/* Pillars Grid - Mobile Horizontal Scroll */}
                            <div className="relative group/scroll px-0 md:px-4">
                                {/* Navigation Arrows - Desktop/Tablet */}
                                <div className="hidden md:flex absolute -left-4 -right-4 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-20">
                                    <button
                                        onClick={() => scrollContainer(pillarsScrollRef, 'left')}
                                        className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black transition-all pointer-events-auto backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 group/arrow"
                                    >
                                        <ChevronLeft className="w-5 h-5 group-hover/arrow:-translate-x-0.5 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => scrollContainer(pillarsScrollRef, 'right')}
                                        className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black transition-all pointer-events-auto backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 group/arrow"
                                    >
                                        <ChevronRight className="w-5 h-5 group-hover/arrow:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>

                                {/* Side Fades */}
                                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10 pointer-events-none md:hidden" />
                                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10 pointer-events-none md:hidden" />

                                <div
                                    ref={pillarsScrollRef}
                                    onScroll={(e) => handleScroll(e, setPillarIndex)}
                                    className="flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto pb-6 md:pb-10 snap-x snap-mandatory no-scrollbar px-4 -mx-4 md:mx-0 md:px-0 scroll-smooth items-stretch"
                                >
                                    {[
                                        {
                                            title: "Comunicación",
                                            desc: "WhatsApp no es un sistema de gestión.",
                                            detail: "De conversaciones infinitas a procesos que fluyen sin tu intervención.",
                                            icon: MessageSquare,
                                            color: "from-blue-500/20"
                                        },
                                        {
                                            title: "Ventas",
                                            desc: "Hacer por hacer no es una estrategia.",
                                            detail: "De captación reactiva a un embudo predecible que convierte solo.",
                                            icon: ShoppingCart,
                                            color: "from-emerald-500/20"
                                        },
                                        {
                                            title: "Autoridad",
                                            desc: "Ser uno más es el camino al olvido.",
                                            detail: "De competir por precio a ser la referencia indiscutible en tu sector.",
                                            icon: Star,
                                            color: "from-amber-500/20"
                                        },
                                        {
                                            title: "Sistemas",
                                            desc: "La tecnología sin orden es caos digital.",
                                            detail: "De herramientas sueltas a un ecosistema integrado que ahorra horas.",
                                            icon: LayoutGrid,
                                            color: "from-purple-500/20"
                                        }
                                    ].map((pillar, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="relative group p-8 md:p-10 rounded-[2.5rem] bg-[#0D0D0D] border border-white/10 hover:border-primary/40 transition-all duration-700 text-center flex flex-col items-center h-full min-w-full md:min-w-0 snap-center shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} to-transparent opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />

                                            <div className="relative z-10 space-y-6 flex flex-col h-full">
                                                <div className="w-20 h-20 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-700 shadow-xl group-hover:shadow-primary/20">
                                                    <pillar.icon className="w-10 h-10" />
                                                </div>
                                                <div className="space-y-4 flex-grow flex flex-col">
                                                    <div>
                                                        <p className="text-[10px] md:text-sm text-primary font-black uppercase tracking-[0.4em] mb-3 opacity-60">
                                                            Pilar {i + 1}: {pillar.title}
                                                        </p>
                                                        <h4 className="text-xl md:text-2xl lg:text-3xl text-white font-display font-bold leading-tight uppercase italic tracking-tighter">
                                                            {pillar.desc}
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm md:text-lg text-gray-400 font-normal leading-relaxed group-hover:text-gray-200 transition-colors">
                                                        {pillar.detail}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => openModal(pillar.title)}
                                                    className="inline-flex items-center gap-2 py-4 px-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 group/btn"
                                                >
                                                    <Info className="w-4 h-4" /> Ver detalles
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Custom Scroll Progress & Pagination for Pillars */}
                                <div className="flex flex-col items-center gap-6 mt-8">
                                    <div className="flex gap-4">
                                        {[0, 1, 2, 3].map((i) => (
                                            <button
                                                key={i}
                                                onClick={() => scrollToPoint(pillarsScrollRef, i)}
                                                className={`group relative h-10 w-2 flex items-center justify-center`}
                                            >
                                                <div className={`h-full w-full rounded-full transition-all duration-700 ${pillarIndex === i ? 'bg-primary' : 'bg-white/10 group-hover:bg-white/30'}`} />
                                                {pillarIndex === i && (
                                                    <div className="absolute inset-0 bg-primary/40 blur-md rounded-full animate-pulse" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden hidden md:block">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-primary"
                                            animate={{ width: `${(pillarIndex + 1) * 25}%` }}
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Inverse Desktop SVG Connectors */}
                            <div className="hidden md:block relative h-24 w-full mt-4">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                                    {/* Outer glow path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 125 0 L 125 40 L 500 40 L 500 100 M 375 0 L 375 40 M 625 0 L 625 40 M 875 0 L 875 40 L 500 40"
                                        stroke="#6ee7b7"
                                        strokeWidth="8"
                                        className="blur-[6px]"
                                    />
                                    {/* Main solid path */}
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 125 0 L 125 40 L 500 40 L 500 100 M 375 0 L 375 40 M 625 0 L 625 40 M 875 0 L 875 40 L 500 40"
                                        stroke="#6ee7b7"
                                        strokeWidth="2.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >

            <VerticalConnector height="h-20" />

            {/* BLOQUE 3 — NORMALIZACIÓN (AUTORIDAD) */}
            <section className="relative z-10 pt-0 pb-16 px-6 md:-mt-8">
                <div className="max-w-4xl mx-auto text-center border-b border-white/5 pb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl md:text-2xl font-display font-medium text-primary uppercase tracking-[0.2em]">
                            Esto no te pasa solo a ti.
                        </h2>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-snug">
                            La mayoría de pequeños negocios no fallan por falta de clientes, sino porque <span className="text-primary italic font-medium">crecen sobre procesos frágiles o inexistentes.</span>
                        </p>
                    </motion.div>
                </div>

                <VerticalConnector height="h-16" />
            </section>

            {/* AJUSTE 2 — MATRIZ DE RECUPERACIÓN DE BENEFICIOS */}
            <section className="relative z-10 py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto relative p-[1px] rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-white/30 via-primary/50 to-white/10 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
                    <div className="bg-[#0A0A0A] bg-gradient-to-br from-primary/[0.12] to-transparent backdrop-blur-3xl rounded-[2.4rem] md:rounded-[3.9rem] p-6 md:p-12 relative overflow-hidden group">
                        {/* Internal glow - Intensified */}
                        <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-primary/20 blur-[150px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
                        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-white/[0.08] blur-[150px] rounded-full group-hover:bg-white/15 transition-all duration-1000" />

                        <div className="relative z-10 space-y-4 md:space-y-8 text-center">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                                    Impacto Financiero
                                </div>
                                <h3 className="text-3xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] tracking-tighter">
                                    <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">Matriz de Recuperación</span> <br className="hidden md:block" />
                                    <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">de Beneficios</span>
                                </h3>
                                <p className="text-lg md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto italic">
                                    Lo que el caos operativo le está costando <br className="hidden md:block" />
                                    <span className="text-primary italic">mes a mes a tu negocio.</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                {[
                                    { title: "Capital Humano Perdido", icon: Clock },
                                    { title: "Erosión de Márgenes", icon: TrendingUp },
                                    { title: "Ventas Sin Cerrar", icon: Zap },
                                    { title: "Coste de Oportunidad", icon: Target }
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => openModal(item.title)}
                                        className="flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl bg-primary/[0.03] hover:bg-primary/[0.08] transition-all duration-500 border border-primary/20 hover:border-primary/50 group/item text-center shadow-[0_0_30px_rgba(110,231,183,0.05)] hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
                                    >
                                        <div className="absolute top-2 right-2 md:hidden">
                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                                <Plus className="w-3 h-3 text-primary" />
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shrink-0 border border-primary/20 shadow-inner">
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] md:text-xs lg:text-sm text-white font-black leading-tight uppercase tracking-[0.1em] group-hover:text-primary transition-colors">{item.title}</p>
                                            <div className="flex items-center justify-center gap-1.5 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-primary/80 group-hover:text-primary">Ver detalles</span>
                                                <Plus className="hidden md:block w-2.5 h-2.5 text-primary" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOQUE 4 & 5 — IDENTIFICACIÓN DEL CAOS */}
            <section className="relative z-10 py-16 md:py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16 space-y-4 md:space-y-6"
                    >
                        <h2 className="text-3xl md:text-6xl font-display font-black leading-tight">
                            <span className="bg-gradient-to-r from-white via-white/80 to-primary bg-clip-text text-transparent">El caos no se manifiesta igual</span> <br className="hidden md:block" /> <span className="text-primary italic">en todos los negocios.</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto italic">
                            Aunque el problema de fondo es el mismo, en cada sector aparece de una forma distinta.
                        </p>
                    </motion.div>

                    <div className="relative group/scroll px-0 md:px-4">
                        {/* Navigation Arrows - Desktop/Tablet */}
                        <div className="hidden md:flex absolute -left-4 -right-4 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-20">
                            <button
                                onClick={() => scrollContainer(chaosScrollRef, 'left')}
                                className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black transition-all pointer-events-auto backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 group/arrow"
                            >
                                <ChevronLeft className="w-5 h-5 group-hover/arrow:-translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={() => scrollContainer(chaosScrollRef, 'right')}
                                className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black transition-all pointer-events-auto backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 group/arrow"
                            >
                                <ChevronRight className="w-5 h-5 group-hover/arrow:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* Side Fades - More pronounced */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10 pointer-events-none md:hidden" />
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10 pointer-events-none md:hidden" />

                        <div
                            ref={chaosScrollRef}
                            onScroll={(e) => handleScroll(e, setChaosIndex)}
                            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto pb-6 md:pb-10 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth items-stretch"
                        >
                            {[
                                {
                                    title: "Agendas y Reservas",
                                    icon: Clock,
                                    pain: [
                                        "Cancelaciones que desangran tu rentabilidad",
                                        "Huecos muertos imposibles de rellenar a tiempo",
                                        "Interrupciones constantes por cambios de última hora",
                                        "Un negocio que se detiene por completo sin ti"
                                    ],
                                    color: "from-blue-500/20"
                                },
                                {
                                    title: "Producción y Pedidos",
                                    icon: Zap,
                                    pain: [
                                        "Órdenes cruzadas que generan errores costosos",
                                        "Retrasos en facturación que asfixian tu caja",
                                        "Clientes preguntando por estados que desconoces",
                                        "Cero trazabilidad: no sabes dónde está el dinero"
                                    ],
                                    color: "from-yellow-500/20"
                                },
                                {
                                    title: "Stock e Inventario",
                                    icon: LayoutGrid,
                                    pain: [
                                        "Capital inmovilizado en productos sin rotación",
                                        "Compras por pánico ante la falta de previsión",
                                        "Márgenes que desaparecen en mermas o fugas",
                                        "Decisiones a ciegas que comprometen tu futuro"
                                    ],
                                    color: "from-green-500/20"
                                },
                                {
                                    title: "Proyectos y Consultoría",
                                    icon: Brain,
                                    pain: [
                                        "El conocimiento es un cuello de botella en tu cabeza",
                                        "Entregas caóticas que dañan tu reputación",
                                        "Cobros manuales que siempre se quedan atrás",
                                        "Saturación mental al borde del colapso ejecutivo"
                                    ],
                                    color: "from-purple-500/20"
                                }
                            ].map((type, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative group p-8 md:p-10 rounded-[2.5rem] bg-[#0D0D0D] border border-white/10 hover:border-primary/40 transition-all duration-700 flex flex-col h-full min-w-full md:min-w-0 snap-center shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${type.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem]`} />

                                    <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-background-dark transition-all duration-700 shadow-xl">
                                            <type.icon className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent uppercase italic tracking-tighter">{type.title}</h3>
                                        <ul className="space-y-4 mb-10 text-left w-full flex-grow">
                                            {type.pain.map((p, j) => (
                                                <li key={j} className="flex items-start gap-3 text-gray-300 text-sm md:text-base font-normal leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-col gap-3 w-full">
                                            <button
                                                onClick={() => openModal(type.title)}
                                                className="w-full py-4 rounded-xl border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-md"
                                            >
                                                <Info className="w-4 h-4" /> Ver detalles técnicos
                                            </button>
                                            <button
                                                onClick={scrollToForm}
                                                className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                            >
                                                Esto me representa
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Custom Scroll Progress & Pagination for Chaos */}
                        <div className="flex flex-col items-center gap-6 mt-8">
                            <div className="flex gap-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <button
                                        key={i}
                                        onClick={() => scrollToPoint(chaosScrollRef, i)}
                                        className={`group relative h-10 w-2 flex items-center justify-center`}
                                    >
                                        <div className={`h-full w-full rounded-full transition-all duration-700 ${chaosIndex === i ? 'bg-primary' : 'bg-white/10 group-hover:bg-white/30'}`} />
                                        {chaosIndex === i && (
                                            <div className="absolute inset-0 bg-primary/40 blur-md rounded-full animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden hidden md:block">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-primary"
                                    animate={{ width: `${(chaosIndex + 1) * 25}%` }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN FINAL — AUDITORÍA Y ACCIÓN (FUSIONADA) - REDUCIDA */}
            <section className="relative z-10 py-8 md:py-12 px-4 md:px-6 overflow-hidden">
                {/* Background high-impact glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[180px] rounded-full opacity-40 animate-pulse" />

                <div className="max-w-5xl mx-auto relative px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#0D0D0D] backdrop-blur-3xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-2 border-white/40 text-center space-y-8 md:space-y-12 shadow-[0_60px_120px_rgba(0,0,0,1)] relative overflow-hidden group"
                    >
                        {/* Heading Area */}
                        <div className="space-y-3 md:space-y-4 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                                Recompensa Inmediata
                            </div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tighter">
                                <span className="bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent italic">Tu Auditoría de Eficiencia</span> <br />
                                <span className="text-white">Lista en 7 Minutos.</span>
                            </h2>
                            <p className="text-sm md:text-lg text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed italic">
                                Tras responder 14 preguntas clave, nuestra IA procesará tu estructura para entregarte este informe técnico personalizado.
                            </p>
                        </div>

                        {/* Core Content: Mockup & Stats */}
                        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto relative z-10">
                            {/* Visual Reward (Mockup) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative max-w-sm mx-auto lg:mx-0"
                            >
                                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
                                <div className="relative p-2 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent border border-white/20 shadow-2xl">
                                    <img
                                        src="/diagnosis_report_mockup.png"
                                        alt="Mockup del Informe de Eficiencia IA"
                                        loading="lazy"
                                        className="rounded-[1.8rem] w-full h-auto shadow-inner"
                                    />
                                    <div className="absolute -bottom-4 -right-4 bg-white p-2 md:p-3 rounded-xl shadow-2xl border border-primary/20 flex items-center gap-2">
                                        <PenTool className="w-4 h-4 text-primary" />
                                        <p className="text-black font-black text-[10px] uppercase tracking-tighter">Auditoría PDF</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Logic & Call to Action Area */}
                            <div className="space-y-6 md:space-y-8">
                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { text: "7 min", sub: "Tiempo", icon: Clock },
                                        { text: "Análisis IA", sub: "Motor", icon: Brain },
                                        { text: "Estrategia", sub: "Hojas Ruta", icon: Target }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center group/stat hover:bg-white/[0.06] transition-all">
                                            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover/stat:scale-110 transition-transform" />
                                            <p className="text-white font-black text-xs md:text-sm uppercase tracking-tighter mb-0.5">{stat.text}</p>
                                            <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.sub}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Checklist Points */}
                                <ul className="space-y-3 text-left max-w-sm mx-auto lg:mx-0">
                                    {[
                                        "Cálculo de capital perdido por ineficiencias.",
                                        "Mapa de calor de tus cuellos de botella.",
                                        "Plan técnico para recuperar tus márgenes."
                                    ].map((li, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/90 text-sm md:text-base font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(110,231,183,0.5)]" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-4 pt-4">
                                    <button
                                        onClick={scrollToForm}
                                        className="w-full group/cta relative flex items-center justify-center gap-4 px-8 py-4 md:py-6 bg-primary hover:bg-primary-hover text-background-dark rounded-2xl md:rounded-3xl font-black text-lg md:text-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(110,231,183,0.3)] hover:scale-[1.02] uppercase tracking-tighter overflow-hidden"
                                    >
                                        <span className="relative z-10">Empezar Diagnóstico</span>
                                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover/cta:translate-x-2 transition-transform" />
                                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000" />
                                    </button>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">
                                        Privacidad 100% garantizada. Análisis exclusivamente técnico.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* SECCIÓN FORMULARIO DIAGNÓSTICO */}
            < section ref={formRef} className="relative z-10 py-12 md:py-20 px-4 md:px-6" >
                <div className="max-w-4xl mx-auto">
                    <DiagnosisForm />
                </div>
            </section >

            <ServiceModal />
        </div >
    );
};


export default Diagnosis;
