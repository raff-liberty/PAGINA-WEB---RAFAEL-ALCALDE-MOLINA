import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    CheckCircle,
    Smartphone,
    Globe,
    Server,
    Database,
    MessageSquare,
    ArrowRight,
    Clock,
    Target,
    ShieldCheck,
    Scale,
    HelpCircle,
    Layout,
    Share2,
    Mail,
    Send,
    CheckCircle2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import { supabase } from '../lib/supabaseClient';

const Services = () => {


    const [activeService, setActiveService] = React.useState(0);
    const [direction, setDirection] = React.useState(0);
    const [siteConfig, setSiteConfig] = React.useState({
        whatsapp_url: 'https://wa.me/34600000000',
        instagram_url: 'https://instagram.com/engorilate',
        linkedin_url: 'https://linkedin.com/in/engorilate'
    });

    React.useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await supabase.from('site_config').select('key, value');
                if (data) {
                    const config = {};
                    data.forEach(item => { config[item.key] = item.value; });
                    setSiteConfig(prev => ({ ...prev, ...config }));
                }
            } catch (e) { console.error(e); }
        };
        fetchConfig();
    }, []);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setActiveService((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = starServices.length - 1;
            if (next >= starServices.length) next = 0;
            return next;
        });
    };
    // Schema selection for SEO
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Automatización de Negocios y Desarrollo Web a Medida",
        "description": "Soluciones de automatización personalizadas, diseño de aplicaciones web y gestión de infraestructura técnica para PYMES.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Engorilate"
        },
        "areaServed": "Región de Murcia",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Automatización",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Automatización de Procesos"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Desarrollo Web a Medida"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Gestión de Infraestructura"
                    }
                }
            ]
        }
    };

    const automationFeatures = [
        "Reducir trabajo manual",
        "Evitar errores",
        "Mejorar la atención al cliente",
        "Aumentar el control del negocio"
    ];

    const flows = [
        { icon: Smartphone, text: "Captación de leads desde web y redes sociales" },
        { icon: Clock, text: "Gestión automática de citas y reservas" },
        { icon: Layout, text: "Seguimiento comercial y CRM" },
        { icon: Scale, text: "Facturación y control administrativo" },
        { icon: MessageSquare, text: "Atención al cliente por WhatsApp" },
        { icon: ShieldCheck, text: "Fidelización y comunicaciones post-venta" }
    ];

    const starServices = [
        {
            title: "Reservas WhatsApp",
            desc: "Tu negocio en autopiloto 24/7. Citas confirmadas, dudas resueltas y recordatorios sin que muevas un dedo.",
            icon: MessageSquare,
            link: "/servicios/automatizacion-whatsapp",
            color: "text-primary",
            bg: "bg-primary/10",
            subItems: [
                { title: "Gestión de Citas", desc: "Reserva 24/7 sin intervención humana." },
                { title: "Recordatorios Pro", desc: "Evita el 'no-show' con avisos automáticos." },
                { title: "Dudas Frecuentes", desc: "IA que responde preguntas sobre tu servicio." },
                { title: "Pagos Integrados", desc: "Cobra señales o servicios vía WhatsApp." }
            ]
        },
        {
            title: "Web Corporativa Pro",
            desc: "Webs que son herramientas de venta, no simples folletos. Velocidad extrema y optimización total.",
            icon: Globe,
            link: "/servicios/desarrollo-web-medida",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            subItems: [
                { title: "Diseño Premium", desc: "Interfaz única pensada para convertir visitas en leads." },
                { title: "Carga Ultra-Rápida", desc: "Puntuaciones máximas en Google Core Web Vitals." },
                { title: "Auto-Gestionable", desc: "Cambia textos y precios sin depender de nadie." },
                { title: "Apps de Gestión", desc: "Controla tu operativa interna desde el móvil." }
            ]
        },
        {
            title: "SEO Local Estratégico",
            desc: "Domina Google Maps y capta clientes en tu zona. Si no estás primero, no te están llamando.",
            icon: Target,
            link: "/servicios/seo-local-estrategia",
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            subItems: [
                { title: "Google Maps", desc: "Optimización de perfil para salir en el 'Local Pack'." },
                { title: "Keywords Locales", desc: "Aparece cuando busquen tu servicio en tu ciudad." },
                { title: "Gestión de Reseñas", desc: "Estrategia para conseguir 5 estrellas reales." },
                { title: "Landing Pages", desc: "Páginas específicas para cada zona o barrio." }
            ]
        },
        {
            title: "Arquitectura CRM",
            desc: "Control total de tu operativa. Centraliza facturación, stock y CRM en un solo lugar conectado.",
            icon: Database,
            link: "/servicios/sistemas-gestion-personalizados",
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            subItems: [
                { title: "Hub de Inteligencia", desc: "Salud del negocio y KPIs en tiempo real." },
                { title: "Flujos Conectados", desc: "Automatización total de entrada de datos." },
                { title: "Integración APIs", desc: "Conectamos todas tus herramientas de trabajo." },
                { title: "Seguridad Robusta", desc: "Protección total de tus datos y backups." }
            ]
        }
    ];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    const examples = [
        {
            title: "🔹 Captación de leads automatizada",
            case: "Un formulario web capta un cliente potencial → se registra en CRM → recibe WhatsApp de confirmación → se crea tarea de seguimiento.",
            result: "Respuesta inmediata y cero leads perdidos.",
            link: "/servicios/seo-local-estrategia"
        },
        {
            title: "🔹 Reservas sin gestión manual",
            case: "El cliente reserva desde WhatsApp, cualquier red social o la web → recibe confirmación automática → recordatorio antes de la cita → el negocio ve todo centralizado.",
            result: "Menos cancelaciones y menos llamadas perdidas.",
            link: "/servicios/automatizacion-whatsapp"
        },
        {
            title: "🔹 Ventas y facturación",
            case: "Pedido realizado → factura automática → notificación al cliente → registro contable.",
            result: "Menos errores administrativos y más control financiero.",
            link: "/servicios/sistemas-gestion-personalizados"
        },
        {
            title: "🔹 WhatsApp 24/7",
            case: "El cliente escribe por WhatsApp → recibe respuesta automática → el mensaje queda registrado → el equipo responde cuando toca.",
            result: "Mejor atención sin saturar al equipo.",
            link: "/servicios/automatizacion-whatsapp"
        }
    ];

    const faqs = [
        { q: "¿Mi negocio es demasiado pequeño para automatizar?", a: "No. Precisamente los negocios pequeños son los que más se benefician, porque cada hora ahorrada cuenta." },
        { q: "¿Tengo que cambiar la forma en la que trabajo?", a: "No. Adaptamos la automatización a tu operativa actual y, si hay mejoras posibles, te las proponemos." },
        { q: "¿Necesito conocimientos técnicos?", a: "No. Nosotros nos encargamos de todo el diseño, implementación y mantenimiento." },
        { q: "¿Qué pasa si algo falla?", a: "Monitorizamos los sistemas y ofrecemos soporte. Además, trabajamos con backups y entornos controlados." },
        { q: "¿Puedo empezar poco a poco?", a: "Sí. Podemos comenzar con una automatización concreta y ampliar después." },
        { q: "¿Hay permanencia?", a: "No. El proyecto inicial es tuyo. El soporte mensual es opcional." },
        { q: "¿Dónde están mis datos?", a: "En infraestructura controlada y segura. No quedan atrapados en plataformas cerradas." }
    ];

    // This `variants` object is a duplicate and should be removed if not used differently.
    // Keeping it for now as per instruction to only make specified changes.
    // const variants = {
    // enter: (direction) => ({
    //     x: direction > 0 ? 100 : -100,
    //     opacity: 0
    // }),
    // center: {
    //     zIndex: 1,
    //     x: 0,
    //     opacity: 1
    // },
    // exit: (direction) => ({
    //     zIndex: 0,
    //     x: direction < 0 ? 100 : -100,
    //     opacity: 0
    // })
    // };

    return (
        <div className="relative pt-16 pb-12 min-h-screen selection:bg-primary selection:text-black">
            <SEO
                title="Servicios de Automatización y Desarrollo Web | Engorilate"
                description="Automatizamos procesos reales y diseñamos herramientas a medida para que tu negocio funcione sin ti. n8n, Odoo, WhatsApp API y más."
                schema={schema}
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* HERO SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-8">
                        <Zap className="w-3 h-3" />
                        Catálogo de Soluciones
                    </div>
                    <h1 className="font-display text-4xl md:text-7xl font-black leading-[0.85] mb-8 text-white uppercase italic tracking-tighter">
                        Soluciones de <span className="text-primary">automatización</span> real
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-10 italic max-w-3xl mx-auto">
                        No vendemos paquetes cerrados ni humo tecnológico. <br />
                        Diseñamos el motor que tu empresa necesita para recuperar el control.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact" className="bg-primary hover:bg-primary-hover text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(110,231,183,0.3)]">
                            Diagnóstico Gratuito
                        </Link>
                    </div>
                </motion.div>

                {/* AUTOMATION SECTION */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-display text-2xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
                                Cada negocio es distinto. <br />
                                <span className="text-primary">No trabajamos con plantillas.</span>
                            </h2>
                            <p className="text-gray-300 text-xl leading-relaxed mb-8 italic">
                                Analizamos cómo funciona tu empresa, dónde se pierde tiempo y dinero, y diseñamos
                                <strong> automatizaciones a medida</strong> que se adaptan exactamente a tu forma de trabajar.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {automationFeatures.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 text-white font-medium">
                                        <CheckCircle className="w-5 h-5 text-primary" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#1A1A1A] border-2 border-white/20 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,1)] transition-all duration-700 hover:border-primary/40 group/card">
                            {/* Intensified Ambient Glow */}
                            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary/20 blur-[130px] rounded-full opacity-60 pointer-events-none"></div>

                            <h3 className="relative z-10 text-white text-xl font-bold mb-8 flex items-center gap-3">
                                <Layout className="text-primary w-6 h-6" />
                                Cobertura del flujo operativo
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {flows.map((flow, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <flow.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-400 group-hover:text-white transition-colors">{flow.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 p-4 border-t border-white/5 text-sm text-gray-500 italic">
                                "Nada se fuerza. Nada se rompe. Todo se diseña para encajar."
                            </div>
                        </div>
                    </div>
                </section>

                {/* STAR SERVICES CAROUSEL */}
                <section className="mb-12 relative">
                    <div className="text-center max-w-3xl mx-auto mb-8">
                        <h2 className="font-display text-2xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
                            Nuestros <span className="text-primary">Productos Estrella</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light italic">
                            Soluciones de alto impacto diseñadas para escalar tu facturación de forma inmediata.
                        </p>
                    </div>

                    <div className="relative max-w-6xl mx-auto px-4 md:px-0 overflow-hidden md:overflow-visible">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeService}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="bg-[#151515] border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-2xl overflow-hidden"
                            >
                                {/* Slide Content Left */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className={`w-14 h-14 rounded-2xl ${starServices[activeService].bg} flex items-center justify-center mb-6 mx-auto lg:mx-0`}>
                                        {React.createElement(starServices[activeService].icon, { className: `w-7 h-7 ${starServices[activeService].color}` })}
                                    </div>
                                    <h3 className="text-white text-2xl md:text-3xl font-display font-black mb-4 leading-tight uppercase italic tracking-tighter">
                                        {starServices[activeService].title}
                                    </h3>
                                    <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed max-w-xl italic">
                                        "{starServices[activeService].desc}"
                                    </p>
                                    <Link
                                        to={starServices[activeService].link}
                                        className="inline-flex items-center gap-3 bg-primary text-black font-black px-6 py-3 rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(110,231,183,0.3)] group text-sm"
                                    >
                                        VER DETALLES TÉCNICOS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Slide Items Right (The Grid Info) */}
                                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {starServices[activeService].subItems.map((item, idx) => (
                                        <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors shadow-lg">
                                            <h4 className="text-primary font-black mb-2 text-xs md:text-sm uppercase italic tracking-wider">{item.title}</h4>
                                            <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="flex justify-center mt-12 gap-4">
                            <button
                                onClick={() => paginate(-1)}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-2">
                                {starServices.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setDirection(i > activeService ? 1 : -1);
                                            setActiveService(i);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all ${activeService === i ? 'w-8 bg-primary' : 'bg-white/20'}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => paginate(1)}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* INFRASTRUCTURE SECTION */}
                <DiagnosisCTA className="mb-20" />
                <section className="mb-16 bg-[#151515] border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div>
                            <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-4 uppercase italic tracking-tighter leading-tight">
                                Infraestructura propia. <br />
                                <span className="text-gray-500">Para que nada falle.</span>
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 italic">
                                Nos encargamos de toda la base técnica: hosting, dominios, mantenimiento y seguridad.
                                Trabajamos con <strong>VPS propios</strong> para darte independencia total.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <Server className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">VPS Dedicados</h4>
                                        <p className="text-gray-500 text-sm">Mayor estabilidad y control real sobre tus datos sin depender de plataformas opacas.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <Database className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Backups y Monitorización</h4>
                                        <p className="text-gray-500 text-sm">Todo está centralizado, documentado y protegido 24/7/365.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group/mini bg-[#1A1A1A] border-2 border-white/20 p-8 rounded-[2rem] flex flex-col h-full shadow-[0_32px_120px_rgba(0,0,0,1)] transition-all duration-700 hover:border-primary/40">
                            {/* Intensified Ambient Glow for form */}
                            <div className="absolute -top-10 -right-10 w-[250px] h-[250px] bg-primary/20 blur-[100px] rounded-full opacity-40 pointer-events-none transition-all duration-700 group-hover/mini:opacity-60"></div>

                            <h4 className="relative z-10 text-white font-black mb-6 uppercase italic tracking-widest text-xs opacity-50 text-center">Empieza el cambio hoy</h4>

                            <ContactForm source="Services Audit Form" />

                            <div className="mt-auto border-t border-white/5 pt-8">
                                <p className="text-center text-[10px] uppercase tracking-widest text-gray-500 mb-6 font-bold">O sígueme en la red</p>
                                <div className="flex justify-center gap-6">
                                    <a href={siteConfig.whatsapp_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-black transition-all group">
                                        <MessageSquare className="w-5 h-5" />
                                    </a>
                                    <a href={siteConfig.instagram_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.061 1.365-.333 2.632-1.308 3.607-.975.975-2.242 1.247-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.061-1.365.333-2.632 1.308-3.607.975-.975 2.242-1.247 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a href={siteConfig.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: 'Engorilate - Servicios de Automatización',
                                                    url: window.location.href
                                                });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert('Enlace copiado al portapapeles');
                                            }
                                        }}
                                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all group"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EXAMPLES SECTION */}
                <section className="mb-12">
                    <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-8 text-center uppercase italic tracking-tighter">
                        Casos Reales <br /> <span className="text-primary opacity-50 font-black text-lg tracking-[0.2em] mt-2 block italic">CERO HUMO</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {examples.map((ex, i) => (
                            <Link
                                key={i}
                                to={ex.link}
                                className="bg-[#151515] border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-[#1a1a1a] transition-colors relative overflow-hidden group block text-left shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-all"></div>
                                <h3 className="text-white text-xl font-bold mb-6">{ex.title}</h3>
                                <div className="space-y-4">
                                    <div className="text-gray-300 text-sm leading-relaxed mb-4">
                                        <span className="text-primary/60 font-mono block mb-2 uppercase text-[10px]">Funcionamiento:</span>
                                        {ex.case}
                                    </div>
                                    <div className="pt-4 border-t border-white/5 text-white font-medium flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            Resultado: {ex.result}
                                        </div>
                                        <div className="text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="mb-12 max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                        <h2 className="font-display text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">Preguntas Frecuentes</h2>
                    </div>
                    <div className="grid gap-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#151515] border border-white/10 p-6 rounded-2xl shadow-xl">
                                <h3 className="text-primary font-black text-lg mb-4 uppercase italic tracking-tight">{faq.q}</h3>
                                <p className="text-gray-100 leading-relaxed font-normal text-base md:text-lg italic">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="relative overflow-hidden rounded-[3rem] bg-primary p-8 md:p-12 text-center">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 contrast-150"></div>
                    <div className="relative z-10">
                        <h2 className="font-display text-2xl md:text-5xl font-black text-gray-900 mb-4 uppercase italic tracking-tighter leading-tight">
                            Empieza con una <br /> auditoría gratuita
                        </h2>
                        <p className="text-gray-900/70 text-base md:text-lg font-medium max-w-2xl mx-auto mb-8 italic">
                            Analizamos tu negocio y te decimos exactamente qué automatizar, cómo hacerlo y qué impacto tendrá. <strong>Sin compromiso.</strong>
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-4 bg-gray-900 text-primary font-black text-xl px-10 py-5 rounded-2xl hover:bg-black transition-all transform hover:scale-105 shadow-2xl"
                        >
                            SOLICITAR AUDITORÍA <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;
