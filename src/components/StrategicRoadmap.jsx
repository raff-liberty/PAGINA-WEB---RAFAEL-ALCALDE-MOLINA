import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, Lock, TrendingUp, Users, Server, Globe,
    ChevronDown, ChevronRight, Award, Target, BookOpen
} from 'lucide-react';

const StrategicRoadmap = () => {
    // PERSISTENCE: Load from localStorage
    const [completedTasks, setCompletedTasks] = useState(() => {
        const saved = localStorage.getItem('engorilate_roadmap_progress');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentTier, setCurrentTier] = useState(1);
    const [expandedTask, setExpandedTask] = useState(null);

    // ROADMAP DATA: The "Brain" of the operation
    const tiers = {
        1: {
            title: "Fase 1: Cimientos (Validación)",
            requirement: 0,
            description: "El objetivo es validar la oferta y generar los primeros 1,000€ sin gastar en anuncios.",
            tasks: [
                {
                    id: 'seo_fill_3',
                    pillar: 'penetration', // Market Penetration
                    icon: <Globe className="w-5 h-5 text-blue-400" />,
                    title: "Eliminar 3 Páginas Negras",
                    desc: "Crea contenido para 3 combinaciones Sector-Localidad vacías.",
                    justification: "Cada página vacía es un cliente perdido. Llenarlas crea activos digitales permanentes que indexan en Google y traen tráfico gratis de por vida.",
                    sop: [
                        "1. Ve a la pestaña 'Landings SEO' en este panel.",
                        "2. Busca combinaciones con el punto gris (⚫).",
                        "3. Selecciona una (ej: Peluquerías en Totana).",
                        "4. Rellena el H1 con una promesa fuerte ('Tu peluquería en piloto automático').",
                        "5. Guarda y verifica que el punto se ponga verde (✅).",
                        "6. Repite 3 veces."
                    ]
                },
                {
                    id: 'comm_5_contacts',
                    pillar: 'acquisition', // Client Acquisition
                    icon: <Users className="w-5 h-5 text-green-400" />,
                    title: "Protocolo de Contacto: 5 Leads",
                    desc: "Contacta directamente a 5 negocios locales por Instagram/LinkedIn.",
                    justification: "El SEO tarda meses. Las ventas directas validan tu oferta HOY. Si no puedes venderlo cara a cara, no podrás venderlo online. Necesitas feedback real de humanos.",
                    sop: [
                        "1. Abre Google Maps y busca 'Peluquerías en [Tu Ciudad]'.",
                        "2. Filtra las que NO tengan web o tengan una muy mala.",
                        "3. Búscalas en Instagram.",
                        "4. Envía este mensaje (DMs): 'Hola [Nombre], he visto que hacéis unos cortes brutales pero vuestra web no os hace justicia. He montado una demo rápida de cómo podría quedar. ¿Te la paso sin compromiso?'",
                        "5. Objetivo: Conseguir una respuesta (Sí/No).",
                        "6. Repite 5 veces."
                    ]
                },
                {
                    id: 'tech_n8n_first',
                    pillar: 'solvency', // Technical Solvency
                    icon: <Server className="w-5 h-5 text-purple-400" />,
                    title: "Infraestructura: Primer Webhook",
                    desc: "Crea un workflow simple en n8n que reciba datos.",
                    justification: "Vender humo destruye reputaciones. Necesitas solvencia técnica demostrable. Este es el 'Hola Mundo' de la automatización profesional.",
                    sop: [
                        "1. Abre tu instancia de n8n.",
                        "2. Crea un nuevo workflow llamado 'Test Lead'.",
                        "3. Añade un nodo 'Webhook' (POST).",
                        "4. Copia la URL de prueba.",
                        "5. Usa Postman o Curl para enviar un JSON simple: { 'nombre': 'Test' }.",
                        "6. Verifica que n8n recibe los datos (Output verde)."
                    ]
                }
            ]
        },
        2: {
            title: "Fase 2: Escalado (Sistematización)",
            requirement: 3, // Needs 3 tasks from Tier 1
            description: "Sistematizar la entrada de leads y delegar la entrega técnica.",
            tasks: [
                {
                    id: 'seo_sector_domination',
                    pillar: 'penetration',
                    icon: <Target className="w-5 h-5 text-red-500" />,
                    title: "Dominación Vertical: Peluquerías",
                    desc: "Completa TODAS las localidades para el sector Peluquerías.",
                    justification: "Google premia la autoridad temática. Si cubres toda la región para un nicho, te conviertes en la referencia absoluta para el algoritmo.",
                    sop: [
                        "1. Filtra en 'Landings SEO' por sector 'Peluquerías'.",
                        "2. Rellena las 15-20 localidades disponibles.",
                        "3. Asegúrate de variar ligeramente los H1 para evitar canibalización (ej: usa el nombre del pueblo en el título).",
                        "4. Indexa las URLs en Google Search Console."
                    ]
                },
                {
                    id: 'comm_case_study',
                    pillar: 'acquisition',
                    icon: <BookOpen className="w-5 h-5 text-yellow-400" />,
                    title: "Publicar Caso de Éxito",
                    desc: "Documenta el 'antes y después' de un cliente real.",
                    justification: "La prueba social vende más que cualquier copy. Un caso de éxito bien documentado elimina la fricción de ventas para siempre.",
                    sop: [
                        "1. Elige tu mejor cliente de la Fase 1.",
                        "2. Graba un Loom rápido (3 min) mostrando lo que ahorraba antes vs. ahora.",
                        "3. Estructura el post: Problema (Dolor) -> Agitación (Coste) -> Solución (Tu sistema) -> Resultado (Beneficio).",
                        "4. Publícalo en Blog y LinkedIn."
                    ]
                }
            ]
        },
        3: {
            title: "Fase 3: Dominación (Expansión)",
            requirement: 5, // Needs tasks from previous tiers
            description: "Escalar agresivamente: Equipo, Marca Blanca y Franquicias.",
            tasks: [
                {
                    id: 'scale_team',
                    pillar: 'acquisition',
                    icon: <Users className="w-5 h-5 text-purple-400" />,
                    title: "Contratar Closer de Ventas",
                    desc: "Delega las llamadas de venta para centrarte en producto.",
                    justification: "Tu tiempo vale 500€/hora programando, no 20€/hora persiguiendo leads. Un closer a comisión te libera.",
                    sop: ["1. Define comisión (10-15%).", "2. Crea guion de ventas.", "3. Entrevista a 3 candidatos."]
                },
                {
                    id: 'scale_ads',
                    pillar: 'penetration',
                    icon: <Target className="w-5 h-5 text-red-500" />,
                    title: "Activar Meta Ads (Retargeting)",
                    desc: "Persigue a los visitantes que no convirtieron.",
                    justification: "El 98% del tráfico no compra en la primera visita. El retargeting es la forma más barata de recuperarlos.",
                    sop: ["1. Instala Pixel.", "2. Crea audiencia 'Visitantes 30 días'.", "3. Lanza anuncio de testimonio."]
                }
            ]
        }
    };

    // Calculate Progress
    const totalTasksCurrentTier = tiers[currentTier].tasks.length;
    const completedInCurrentTier = tiers[currentTier].tasks.filter(t => completedTasks.includes(t.id)).length;
    const progressPercentage = Math.round((completedInCurrentTier / totalTasksCurrentTier) * 100);

    // Persist changes
    useEffect(() => {
        localStorage.setItem('engorilate_roadmap_progress', JSON.stringify(completedTasks));

        // Check for Level Up
        if (currentTier === 1 && completedTasks.length >= tiers[2].requirement) {
            // Simple logic for MVP: if enough tasks done, unlock tier 2
            // In a real app we might want a manual "Claim Reward" button
        }
    }, [completedTasks, currentTier]);

    const toggleTask = (taskId) => {
        if (completedTasks.includes(taskId)) {
            setCompletedTasks(completedTasks.filter(id => id !== taskId));
        } else {
            setCompletedTasks([...completedTasks, taskId]);
        }
    };

    const isLocked = (tier) => {
        if (tier === 1) return false;
        return completedTasks.length < tiers[tier].requirement;
    };

    return (
        <div className="space-y-8 p-4 md:p-0">
            {/* Header / HUD */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
                                Nivel {currentTier}
                            </span>
                            <span className="text-gray-400 text-xs uppercase tracking-widest">{completedTasks.length} Objetivos Cumplidos</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{tiers[currentTier].title}</h2>
                        <p className="text-gray-400 max-w-xl">{tiers[currentTier].description}</p>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Progreso de Fase</span>
                            <span>{progressPercentage}%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-green-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tiers / Phases */}
            <div className="space-y-12">
                {[1, 2, 3].map(tierNum => {
                    const tierData = tiers[tierNum];
                    const locked = isLocked(tierNum);

                    return (
                        <div key={tierNum} className={`relative ${locked ? 'opacity-50 grayscale select-none' : ''}`}>
                            {/* Section Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold border ${tierNum === currentTier ? 'bg-primary text-black border-primary' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                                    {tierNum}
                                </div>
                                <h3 className="text-xl font-bold text-white">{tierData.title}</h3>
                                {locked && <Lock className="w-4 h-4 text-gray-500" />}
                            </div>

                            {/* Tasks Grid */}
                            <div className="grid grid-cols-1 gap-4">
                                {tierData.tasks.map(task => (
                                    <div
                                        key={task.id}
                                        className={`bg-[#222] border ${completedTasks.includes(task.id) ? 'border-green-500/30 bg-green-900/10' : 'border-white/10 hover:border-white/30'} rounded-xl transition-all overflow-hidden`}
                                    >
                                        {/* Task Header (Clickable) */}
                                        <div
                                            className="p-5 flex items-start gap-4 cursor-pointer"
                                            onClick={() => !locked && setExpandedTask(expandedTask === task.id ? null : task.id)}
                                        >
                                            {/* Checkbox Area */}
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!locked) toggleTask(task.id);
                                                }}
                                                className={`mt-1 w-6 h-6 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${completedTasks.includes(task.id)
                                                    ? 'bg-green-500 border-green-500 text-black'
                                                    : 'border-gray-600 hover:border-primary'
                                                    }`}
                                            >
                                                {completedTasks.includes(task.id) && <CheckCircle className="w-4 h-4" />}
                                            </div>

                                            {/* Content Summary */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                        {task.icon}
                                                        {task.pillar === 'penetration' && 'Penetración'}
                                                        {task.pillar === 'acquisition' && 'Adquisición'}
                                                        {task.pillar === 'solvency' && 'Solvencia'}
                                                    </span>
                                                    {completedTasks.includes(task.id) && <span className="text-green-500 text-xs font-bold">COMPLETADO</span>}
                                                </div>
                                                <h4 className={`text-lg font-bold ${completedTasks.includes(task.id) ? 'text-gray-500 line-through' : 'text-white'}`}>
                                                    {task.title}
                                                </h4>
                                                <p className="text-gray-400 text-sm mt-1">{task.desc}</p>
                                            </div>

                                            {/* Chevron */}
                                            <div className="text-gray-500">
                                                {expandedTask === task.id ? <ChevronDown /> : <ChevronRight />}
                                            </div>
                                        </div>

                                        {/* EXPANDED CONTENT: The Guide */}
                                        <AnimatePresence>
                                            {expandedTask === task.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-white/5 bg-black/20"
                                                >
                                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* LEFT: Justification (The WHY) */}
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-3 text-primary font-bold">
                                                                <Award className="w-4 h-4" />
                                                                <span>Justificación Estratégica</span>
                                                            </div>
                                                            <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-primary/30 pl-4 py-1">
                                                                "{task.justification}"
                                                            </p>
                                                        </div>

                                                        {/* RIGHT: SOP (The HOW) */}
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-3 text-green-400 font-bold">
                                                                <BookOpen className="w-4 h-4" />
                                                                <span>Guía Paso a Paso (SOP)</span>
                                                            </div>
                                                            <ul className="space-y-3">
                                                                {task.sop.map((step, idx) => (
                                                                    <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                                                        <span className="text-gray-500 font-mono select-none">{idx + 1}.</span>
                                                                        <span>{step}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StrategicRoadmap;
