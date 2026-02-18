import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    Linkedin,
    Download,
    Briefcase,
    GraduationCap,
    Code,
    TrendingUp,
    ShieldCheck,
    Database,
    PieChart,
    Brain,
    Target,
    Users,
    CheckCircle,
    ArrowRight,
    Zap,
    Award,
    BarChart3,
    Quote
} from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImpactAreasGrid = () => {
    const [selectedId, setSelectedId] = React.useState(null);

    React.useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [selectedId]);

    const closeModal = () => setSelectedId(null);

    const items = [
        {
            id: 1,
            icon: Target,
            title: "Dirección Estratégica",
            subtitle: "Del Caos a la Claridad",
            desc: "No busques culpables, busca la causa raíz en el dato.",
            items: ["KPIs Operativos", "Cuadros de Mando", "Control Presupuestario"],
            content: {
                problem: "El día a día devora la estrategia. Los propietarios de PYMEs suelen decidir basándose en intuición o en el saldo del banco, sin una hoja de ruta clara a 3-5 años.",
                solution: "Profesionalizamos la toma de decisiones. Definimos objetivos trimestrales (OKRs), analizamos la rentabilidad real del modelo de negocio y alineamos todas las operaciones con la visión del CEO.",
                details: [
                    "Definición de Cuadros de Mando Integrales (CMI).",
                    "Reuniones de Consejo mensual con análisis de desviaciones.",
                    "Planificación de escenarios: Pesimista, Realista, Optimista."
                ]
            }
        },
        {
            id: 2,
            icon: PieChart,
            title: "Dirección Financiera",
            subtitle: "Control Total de la Caja",
            desc: "Tu caja debe ser predecible, no una sorpresa diaria.",
            items: ["Gestión Tesorería / NOF", "Planificación Financiera", "Forecast Operativo"],
            content: {
                problem: "Morir de éxito. Crecer en ventas a menudo quema la caja (aumento de NOF) y las empresas rentables quiebran por falta de liquidez mal planificada.",
                solution: "Anticipación financiera. Transformamos la contabilidad histórica en previsión futura. Gestionamos la relación con bancos (Pool Bancario) y optimizamos el ciclo de conversión de efectivo.",
                details: [
                    "Previsiones de Tesorería a 13 semanas (Rolling Forecast).",
                    "Negociación bancaria y reestructuración de deuda.",
                    "Análisis de estados financieros mensuales (P&L, Balance)."
                ]
            }
        },
        {
            id: 3,
            icon: TrendingUp,
            title: "Contabilidad de Costes",
            subtitle: "Rentabilidad por Producto",
            desc: "Saber exactamente cuánto ganas con cada euro que vendes.",
            items: ["Costes Estándar vs Real", "Análisis Margen Producto", "Optimización"],
            content: {
                problem: "¿Qué producto es realmente rentable? Muchas empresas subvencionan pérdidas de una línea con beneficios de otra sin saberlo, erosionando el margen global.",
                solution: "Disección analítica. Implantamos contabilidad analítica para conocer el margen exacto por línea de negocio, producto, cliente o proyecto.",
                details: [
                    "Cálculo de escandallos y costes horarios reales.",
                    "Análisis de punto de equilibrio (Break-even point).",
                    "Detección y eliminación de líneas deficitarias."
                ]
            }
        },
        {
            id: 4,
            icon: Database,
            title: "Sistemas y ERP",
            subtitle: "Tecnología Escalable",
            desc: "La tecnología no es el fin, es la herramienta para escalar.",
            items: ["Implantación Odoo", "Automatización", "Integración API"],
            content: {
                problem: "Silos de información. Datos en Excel desconectados, tareas manuales y repetitivas, y errores humanos que cuestan dinero y tiempo.",
                solution: "Dato único. Implantamos ERPs modernos (Odoo) y automatizamos flujos de trabajo (n8n) para que el sistema trabaje para ti, y no al revés.",
                details: [
                    "Arquitectura de datos unificada (Single Source of Truth).",
                    "Automatización de procesos administrativos (Facturación, Cobros).",
                    "Dashboards en tiempo real conectados a operaciones."
                ]
            }
        }
    ];

    const selectedArea = items.find(item => item.id === selectedId) || null;

    return (
        <>
            {items.map((area) => (
                <div
                    key={area.id}
                    onClick={() => setSelectedId(area.id)}
                    className="cursor-pointer group p-4 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#111a14] via-[#080d0a] to-[#050a06] border border-white/10 md:border-white/15 hover:border-primary/40 transition-all hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.04)] h-full flex flex-col items-center text-center md:items-start md:text-left"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all mb-3 md:mb-8 shadow-inner shrink-0">
                        <area.icon className="w-5 h-5 md:w-7 md:h-7 text-white/70 group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="text-sm md:text-xl font-bold text-white mb-2 leading-tight">{area.title}</h3>
                    <p className="text-white/60 text-xs text-sm leading-relaxed mb-0 md:mb-6 italic md:h-12 hidden md:block">"{area.desc}"</p>

                    <ul className="space-y-3 pt-6 border-t border-white/5 w-full hidden md:block">
                        {area.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 uppercase tracking-wide">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                <span className="text-xs font-mono text-white/70">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-2 md:hidden">
                        <span className="text-[10px] text-primary/70 uppercase tracking-widest font-bold">Ver Detalles +</span>
                    </div>
                </div>
            ))}

            {selectedArea && ReactDOM.createPortal(
                <div
                    onClick={closeModal}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '42rem',
                            background: '#0a110c',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '2rem',
                            overflow: 'hidden',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.9)',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '90vh',
                        }}
                    >
                        <div style={{ position: 'relative', padding: '2rem 2rem 1.5rem', background: 'linear-gradient(135deg, #162119, #0a110c)', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                            <button
                                onClick={closeModal}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X style={{ width: '1.1rem', height: '1.1rem' }} />
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', background: 'rgba(34,197,94,0.1)', borderRadius: '0.75rem', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)', flexShrink: 0 }}>
                                    <selectedArea.icon style={{ width: '1.5rem', height: '1.5rem' }} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white', margin: 0, lineHeight: 1.2 }}>{selectedArea.title}</h3>
                                    <p style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'bold', margin: '0.25rem 0 0' }}>{selectedArea.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem 2rem 2rem', overflowY: 'auto', flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f87171', boxShadow: '0 0 8px rgba(248,113,113,0.6)', display: 'inline-block', flexShrink: 0 }}></span>
                                        El Problema
                                    </h4>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '0.9rem', margin: 0 }}>{selectedArea.content.problem}</p>
                                </div>
                                <div>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.6)', display: 'inline-block', flexShrink: 0 }}></span>
                                        La Solución
                                    </h4>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.7', fontSize: '0.9rem', fontWeight: '500', margin: 0 }}>{selectedArea.content.solution}</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <h4 style={{ fontSize: '0.65rem', fontFamily: 'monospace', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', letterSpacing: '0.15em' }}>Cómo lo hacemos</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                        {selectedArea.content.details.map((detail, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                                <CheckCircle style={{ width: '1rem', height: '1rem', color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
                                                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: '1.5' }}>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

const RafaelPortfolio = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const experiences = [
        {
            role: "Fundador",
            company: "Engorilate",
            period: "Actualidad",
            description: "Diseño e implantación de sistemas de información, automatización y herramientas digitales orientadas a estructurar el crecimiento y escalar la toma de decisiones en PYMES.",
            achievements: [
                "Desarrollo de infraestructuras de datos y automatización de procesos críticos.",
                "Integración de Inteligencia Artificial operativa aplicada a la gestión diaria.",
                "Diseño de cuadros de mando y sistemas de alertas automatizadas.",
                "Mapeo funcional de procesos para eliminar cuellos de botella."
            ]
        },
        {
            role: "Fundador",
            company: "Proyecto Formación Técnica Buceo",
            period: "Anterior",
            description: "Proyecto empresarial de formación técnica en buceo diseñado bajo un modelo de gestión integral orientado a la escalabilidad y rentabilidad (57% margen neto).",
            achievements: [
                "Dirección estratégica: diseño del modelo de negocio y arquitectura operativa.",
                "Optimización de estructura: modelo de costes variables.",
                "Estructura operativa: implantación de procedimientos estandarizados (SSI).",
                "Ciclo de cliente: estrategia digital de captación y procesos automatizados."
            ]
        },
        {
            role: "Controller de Gestión",
            company: "Empresa Sector Industrial",
            period: "Anterior",
            description: "Responsabilidad directa sobre el control de gestión integral, transformando datos operativos en información estratégica.",
            achievements: [
                "Liderazgo en la implantación de ERP Odoo v17.",
                "Diseño de modelos de costes (estándar vs reales).",
                "Planificación y control presupuestario.",
                "Auditoría interna de procesos."
            ]
        },
        {
            role: "Director Área Finanzas y Administración",
            company: "Empresa Servicios",
            period: "Anterior",
            description: "Liderazgo integral del área financiera y administrativa, garantizando la fiabilidad del dato y la eficiencia operativa.",
            achievements: [
                "Dirección financiera: tesorería, NOF, fiscalidad.",
                "Implementación de sistemas de control y cuadros de mando.",
                "Gestión del cambio hacia un modelo preventivo.",
                "Optimización de caja y forecast operativo."
            ]
        }
    ];

    return (
        <div className="relative pt-32 md:pt-44 pb-32 min-h-screen bg-[#020503] text-white selection:bg-primary selection:text-black overflow-x-hidden">
            <SEO
                title="Rafael Alcalde Molina | Diseño Web y Estrategia en Puerto de Mazarrón"
                description="Director de Estructura y Crecimiento en Puerto de Mazarrón. Especialista en creación de páginas web, Odoo y optimización de procesos para PYMES."
                keywords="Fractional CFO, Controller Gestión, Odoo, Automatización, Rafael Alcalde Molina"
            />
            <BackgroundMesh />

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 blur-[150px] rounded-full animate-pulse opacity-10" />
                <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full animate-pulse opacity-20" style={{ animationDuration: '7s' }} />
                <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full opacity-15" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 scale-100 md:scale-[0.95] origin-top">

                {/* HERO SECTION */}
                {/* HERO SECTION - FLATTENED FOR MOBILE ORDERING */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-12 md:mb-32">

                    {/* 1. TITLE (Mobile: Top, Desktop: Right) */}
                    <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 order-1 lg:order-2 text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.9] tracking-tighter text-white uppercase italic mb-6 lg:mb-0"
                        >
                            EL ORDEN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                ES RENTABLE.
                            </span>
                        </motion.h1>
                    </div>

                    {/* 2. IMAGE (Mobile: Middle, Desktop: Left) */}
                    <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-end-3 order-2 lg:order-1 flex flex-col items-center lg:items-end justify-center h-full">
                        <div className="flex flex-col gap-6 items-center lg:items-end w-full max-w-[280px] md:max-w-[420px]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden border border-white/10 group bg-gradient-to-br from-[#121a14] via-[#0a150e] to-[#050a06] shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />

                                <img
                                    src="/rafael.png"
                                    alt="Rafael Alcalde Molina - Experto en Creación de Páginas Web y Estrategia Digital en Puerto de Mazarrón"
                                    className="relative z-10 w-full h-full object-cover object-[center_15%] grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />

                                <div className="absolute bottom-6 left-6 right-6 z-30">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/30 border border-primary/50 backdrop-blur-md mb-3 shadow-lg">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white">Disponible</span>
                                    </div>
                                    <h3 className="text-white font-display font-black text-2xl leading-none drop-shadow-md">Rafael Alcalde</h3>
                                    <p className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.1em] mt-1.5 leading-tight">Director de Estructura y Crecimiento</p>
                                </div>
                            </motion.div>

                            {/* CTA BUTTONS */}
                            <div className="flex flex-row gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <a href="https://wa.me/34611469469" target="_blank" rel="noopener noreferrer" className="group relative bg-primary hover:bg-white text-black font-extrabold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-[0_15px_40px_rgba(34,197,94,0.3)] flex-1">
                                    <span className="relative z-10 text-[11px] uppercase tracking-wider whitespace-nowrap">Agendar Reunión</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a href="mailto:r.alcalde@engorilate.com" className="bg-white/5 border border-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all backdrop-blur-md shadow-lg flex-1">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-[11px] uppercase tracking-wider whitespace-nowrap">Contactar</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 3. INTRO CONTENT (Mobile: Bottom, Desktop: Right Below Title) */}
                    <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2 order-3 lg:order-3 text-center lg:text-left flex flex-col justify-start h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-base md:text-lg text-white font-medium leading-relaxed max-w-3xl mx-auto lg:mx-0 space-y-6">
                                <p>
                                    Cuando una PYME entra en fase de expansión, <strong className="text-primary font-bold">dejar de vender deja de ser el problema: el problema es estructurar.</strong>
                                </p>
                                <p>
                                    Cuando la empresa crece más rápido que su sistema interno aparecen los mismos síntomas: <span className="text-white font-medium">desorden operativo, falta de visibilidad real sobre márgenes y decisiones basadas en intuición.</span>
                                </p>
                                <div className="p-5 md:p-8 rounded-2xl bg-gradient-to-br from-[#0c1c13] to-[#050a06] border border-primary/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] text-white relative overflow-hidden group/card font-medium">
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
                                    <p className="leading-relaxed relative z-10 text-white">
                                        Trabajo como <strong className="text-primary font-bold">Director de Estructura y Crecimiento (Fractional CFO)</strong> y como consultor operativo: diagnostico, priorizo e implanto soluciones que permiten a la dirección decidir con datos fiables.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-3 pb-2">
                                {['Economista Colegiado', '+5 Años Experiencia', 'Especialista IA'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-black text-white whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* VISIÓN ESTRATÉGICA & RCC */}
                <div className="mb-20 md:mb-48">
                    <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3 p-6 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#162119] via-[#0a150e] to-[#050a06] border border-white/20 relative overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                    <div className="p-2 md:p-3 rounded-xl bg-primary/10 text-primary">
                                        <Users className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <h2 className="text-xl md:text-3xl font-display font-bold text-white">
                                        Visión Estratégica: <br /> <span className="text-primary">El Partner del CEO</span>
                                    </h2>
                                </div>
                                <p className="text-white/80 text-base md:text-xl leading-relaxed font-light mb-6">
                                    Mi objetivo es integrarme transversalmente en <strong>PYMES en expansión</strong> para trabajar de la mano de la Dirección General. Mi enfoque no es solo auditar, sino <strong>estructurar áreas funcionales</strong> para garantizar un crecimiento sostenible, escalable y bajo control absoluto.
                                </p>
                                <div className="pl-4 md:pl-6 border-l-2 border-primary/40 italic text-white/70 text-base md:text-lg">
                                    <p>
                                        <strong className="text-primary not-italic">Me especializo en ese punto crítico:</strong> transformar crecimiento en control y valor mediante <span className="text-white font-medium not-italic">Dirección Financiera, Control de Gestión</span> y tecnología.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* RCC Methodology Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="hidden md:flex lg:col-span-2 p-6 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#112a1d] to-[#050a06] border border-primary/30 flex-col justify-between relative overflow-hidden group shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Metodología RCC</h3>
                                <p className="text-primary/80 text-xs md:text-sm font-mono uppercase tracking-wider mb-6">Registro, Claridad y Crecimiento</p>

                                <ul className="space-y-3 md:space-y-4">
                                    {[
                                        "Ordenar el sistema de información para eliminar ruido",
                                        "Interpretar indicadores críticos más allá del dato contable",
                                        "Priorizar acciones estratégicas alineadas con operativa",
                                        "Mejorar rentabilidad y eficiencia desde la estructura"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm md:text-base">
                                            <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mini Illustrative Example */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex items-center justify-between text-xs font-mono text-center">
                                    <div className="opacity-50">
                                        <BarChart3 className="w-6 h-6 mx-auto mb-2 text-red-400" />
                                        <span>CAOS DE DATOS</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/20" />
                                    <div className="text-primary font-bold">
                                        <Target className="w-6 h-6 mx-auto mb-2" />
                                        <span>CONTROL TOTAL</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* SPECIALIZATION AREAS - 2 COLUMNS ON MOBILE, COMPACT */}
                <div className="mb-12 md:mb-32">
                    <div className="text-center mb-8 md:mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold"
                        >
                            Capacidades Técnicas
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-5xl font-display font-bold text-white mt-2 md:mt-4"
                        >
                            Áreas de Impacto
                        </motion.h2>
                        <p className="text-white/50 text-xs md:text-sm mt-4 max-w-2xl mx-auto hidden md:block">
                            Haz clic en cada área para ver cómo transformamos la teoría en control real.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-20">
                        {/* MODAL & CARDS LOGIC */}
                        <ImpactAreasGrid />
                    </div>
                </div>

                {/* EDUCATION & STACK (MOVED UP) */}
                <div className="grid lg:grid-cols-2 gap-8 mb-32">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#121a14] via-[#0c120e] to-[#050a06] border border-white/10 hover:border-primary/20 transition-all shadow-[0_40px_80px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <GraduationCap className="w-8 h-8 text-primary" />
                            <h3 className="text-2xl font-bold text-white">Formación</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Máster en Control de Gestión",
                                    sub: "Controlling Avanzado",
                                    details: [
                                        "Análisis de Costes para la Toma de Decisiones",
                                        "Gestión Presupuestaria y Control",
                                        "Análisis de Empresas y Gestión de Riesgos",
                                        "Habilidades Directivas y Cambio",
                                        "Control Interno y Reporting"
                                    ]
                                },
                                {
                                    title: "Máster en RRHH",
                                    sub: "Dirección de Personas",
                                    details: [
                                        "People Analytics Predictivo",
                                        "Marca Personal y Liderazgo",
                                        "PRL, Nóminas y Conflictos",
                                        "Selección por Competencias"
                                    ]
                                },
                                {
                                    title: "Grado en ADE",
                                    sub: "Administración de Empresas",
                                    details: [
                                        "Gestión Áreas Funcionales",
                                        "Análisis del Entorno Económico",
                                        "Instrumentos Técnicos Empresariales",
                                        "Espíritu Emprendedor"
                                    ]
                                },
                                {
                                    title: "Asesor Financiero (en curso)",
                                    sub: "Certificación CNMV",
                                    details: [
                                        "Mercados e Instrumentos Financieros",
                                        "Gestión de Carteras y Patrimonios",
                                        "Seguros y Jubilación",
                                        "Fiscalidad y Cumplimiento Normativo"
                                    ]
                                }
                            ].map((edu, i) => (
                                <details key={i} className="group/edu border-b border-white/5 pb-3 last:border-0">
                                    <summary className="flex items-center justify-between cursor-pointer list-none hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold text-sm">{edu.title}</span>
                                            <span className="text-white/40 text-[10px] uppercase tracking-wider">{edu.sub}</span>
                                        </div>
                                        <Zap className="w-4 h-4 text-primary group-open/edu:rotate-180 transition-transform opacity-40 group-hover/edu:opacity-100" />
                                    </summary>
                                    <div className="px-4 py-3 space-y-2 mt-1">
                                        {edu.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                                                <span className="text-[11px] text-white/60 leading-tight">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stack, Mission & Values */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#121a14] via-[#0c120e] to-[#050a06] border border-white/10 hover:border-primary/20 transition-all shadow-[0_40px_80px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col gap-10"
                    >
                        {/* MISSION */}
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <Target className="w-8 h-8 text-primary" />
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Mi Misión</h3>
                            </div>
                            <p className="text-white/80 text-lg italic leading-relaxed">
                                "Que dejes de ser el <span className="text-primary font-bold">bombero</span> de tu propio negocio. Mi misión es que recuperes tus tardes y que tu empresa funcione por fin como un reloj."
                            </p>
                        </div>

                        {/* VALORES */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Mis Valores</h3>
                            </div>
                            <div className="grid gap-6">
                                {[
                                    {
                                        title: "Honestidad Brutal",
                                        desc: "Si algo no va a funcionar o no tiene sentido automatizarlo, te lo diré de frente. Prefiero perder un proyecto que perder mi reputación.",
                                        icon: ShieldCheck
                                    },
                                    {
                                        title: "Claridad",
                                        desc: "Los números no mienten. Busco que entiendas exactamente qué pasa en tu negocio sin tecnicismos innecesarios.",
                                        icon: PieChart
                                    },
                                    {
                                        title: "Compromiso",
                                        desc: "No soy de los que 'instalan y desaparecen'. Me involucro en el resultado porque tu éxito operativo es mi mejor carta de presentación.",
                                        icon: Zap
                                    }
                                ].map((val, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                        <val.icon className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <h4 className="text-white font-bold text-sm mb-1 uppercase italic tracking-wide">{val.title}</h4>
                                            <p className="text-white/50 text-xs leading-relaxed">{val.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* STACK */}
                        <div className="mt-2">
                            <div className="flex items-center gap-4 mb-6">
                                <Code className="w-8 h-8 text-primary" />
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Tech Stack</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Odoo ERP v17", "Power BI", "Excel Avanzado",
                                    "Supabase", "n8n", "OpenAI API",
                                    "Make", "React", "PostgreSQL"
                                ].map((tech, i) => (
                                    <div key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:text-white hover:border-primary/30 transition-all cursor-default shadow-sm shadow-black/30">
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* EXPERIENCE TIMELINE - IMPROVED LEGIBILITY */}
                <div className="mb-32 max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-20 justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl font-display font-bold text-white">Trayectoria</h2>
                    </div>

                    <div className="space-y-8">
                        {experiences.map((job, idx) => (
                            <details
                                key={idx}
                                className="group p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-[#0c120e] via-[#080d0a] to-[#050a06] border border-white/5 hover:border-primary/30 transition-all open:bg-gradient-to-r open:from-[#111a14] open:to-[#0c120e] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.02)]"
                            >
                                <summary className="flex items-start md:items-center justify-between cursor-pointer list-none gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full">
                                        <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-mono font-bold w-fit whitespace-nowrap">
                                            {job.period}
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors pr-2">{job.company}</h4>
                                            <p className="text-white/60 text-sm md:text-base font-medium">{job.role}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform shrink-0 mt-1 md:mt-0">
                                        <ArrowRight className="w-4 h-4 text-white/50 rotate-90" />
                                    </div>
                                </summary>

                                <div className="mt-6 pt-6 border-t border-white/5 pl-1 md:pl-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 font-light">
                                        {job.description}
                                    </p>
                                    <div className="grid gap-3">
                                        {job.achievements.map((ach, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                                <span className="text-sm md:text-base text-white/70 font-medium leading-relaxed">{ach}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* TESTIMONIOS */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            Lo que dicen de trabajar conmigo
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                text: "Destacaría su planificación y empeño por conseguir los objetivos marcados. Resolutivo, tenaz y con una visión crítica hace que los números en papel se trasladen a logros para la empresa. Un gran compañero.",
                                author: "J. David Cánovas",
                                role: "Consultor de Marketing Digital"
                            },
                            {
                                text: "Es una persona con grandes dotes de equipo, sabe escuchar y darle solución a problemas del día a día. Buen compañero y buen profesional.",
                                author: "Natali Melgarejo",
                                role: "Técnico Superior en Administración y Finanzas"
                            }
                        ].map((review, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-gradient-to-br from-[#0e1610] via-[#080d0a] to-[#050a06] border border-white/5 relative shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.03)]"
                            >
                                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                                <p className="text-white/80 text-lg italic mb-6">"{review.text}"</p>
                                <div>
                                    <p className="text-white font-bold">{review.author}</p>
                                    <p className="text-primary text-sm">{review.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* MÁS ALLÁ DE LOS NÚMEROS - SIMPLIFIED FOR MOBILE */}
                <div className="mb-12 md:mb-32">
                    <div className="text-center mb-8 md:mb-16">
                        <h2 className="text-2xl md:text-5xl font-display font-bold text-white mb-6">
                            Más Allá de los Números
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                        {[
                            {
                                title: "Decisiones Bajo Presión",
                                subtitle: "Árbitro Nacional Rugby",
                                desc: "Gestión de conflictos y toma de decisiones críticas en tiempo real bajo máxima exigencia física y mental."
                            },
                            {
                                title: "Gestión de Riesgos",
                                subtitle: (
                                    <>
                                        Instructor de Buceo
                                        <br />
                                        Buceador Técnico de Cuevas
                                    </>
                                ),
                                desc: "Planificación meticulosa, calma absoluta y análisis de contingencias en entornos hostiles de alta complejidad."
                            },
                            {
                                title: "Impacto y Transferencia",
                                subtitle: "Vocación Docente",
                                desc: "Mi mayor satisfacción es enseñar aquello que sé, transmitiendo conocimiento para que otros ganen autonomía."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-4 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0c120e] via-[#080d0a] to-[#050a06] border border-white/5 hover:bg-gradient-to-br hover:from-[#111a14] hover:to-[#08100a] hover:border-primary/20 transition-all flex md:flex-col items-center md:items-center text-left md:text-center gap-4 shadow-sm md:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.02)]"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">{item.title}</h3>
                                    <p className="text-primary text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 md:mb-4">{item.subtitle}</p>
                                    <p className="text-white/60 text-xs md:text-sm leading-relaxed hidden md:block">"{item.desc}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* CTA FOOTER */}
                <div className="text-center pb-20 max-w-3xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-8 md:mb-12"
                    >
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
                            ¿Buscas estructurar el <br className="hidden md:block" />
                            crecimiento de tu <span className="text-primary">PYME?</span>
                        </h2>
                    </motion.div>

                    <p className="text-white/70 mb-10 md:mb-12 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                        Si necesitas un perfil con mi experiencia para profesionalizar tu gestión,
                        hablemos. Te propongo una reunión de 20 minutos para analizar tu
                        situación y trazar un plan concreto.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                        <a
                            href="https://wa.me/34611469469"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 rounded-full text-base md:text-lg transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
                        >
                            <Phone className="w-5 h-5" />
                            Agendar Reunión (WhatsApp)
                        </a>

                        <a
                            href="mailto:r.alcalde@engorilate.com"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-full text-base md:text-lg transition-all hover:bg-white/5"
                        >
                            <Mail className="w-5 h-5" />
                            Enviar Email
                        </a>
                    </div>
                </div>

            </div >
        </div >
    );
};

export default RafaelPortfolio;
