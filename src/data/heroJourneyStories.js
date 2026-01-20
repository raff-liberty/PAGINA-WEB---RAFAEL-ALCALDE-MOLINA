import { Flame, Sword, Trophy } from 'lucide-react';

export const heroJourneyStories = {
    // PELUQUERÍAS Y ESTÉTICA
    'peluquerias': [
        {
            id: 'burnout',
            title: "El Esclavo del Tinte",
            tag: "GESTIÓN DE TIEMPO",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Atado al móvil mientras aplicaba un tinte. Un mensaje de WhatsApp mal leído. Una cita solapada. El estrés de no saber si hoy comería a su hora por el caos de la agenda.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Engorilate entró en la peluquería. No traía tijeras, traía lógica. El móvil se guardó en el cajón. Las citas empezaron a entrar solas, filtradas por un motor que no duerme.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Hoy, corta el pelo con música de fondo. Su única preocupación es el degradado perfecto. Su tiempo vuelve a ser suyo. El negocio factura más, trabajando él menos.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'ghost',
            title: "El Fantasma de los Sábados",
            tag: "ANTI-PLANTONES",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Sábado, 11:00 AM. Una mañana perdida. El cliente 'VIP' que nunca llegó. 50€ menos en caja. La impotencia de mirar una silla vacía mientras fuera llueven peticiones de cita.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Inyectamos el blindaje anti-plantones. El sistema exige compromiso: si no hay señal, no hay silla. Si no confirman, el hueco se subasta al siguiente de la lista automáticamente.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ya no hay sillas vacías por descuido. Solo clientes que valoran cada minuto del profesional. La caja cuadra al céntimo antes de abrir la puerta cada mañana.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'stock',
            title: "El Alquimista Ciego",
            tag: "CONTROL DE STOCK",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Abrió el armario y el bote estaba vacío. No había tinte #5. Tuvo que improvisar una mezcla que no era la suya. El miedo a perder la confianza del cliente por falta de previsión.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Digitalizamos cada gota. El sistema predice el gasto basado en servicios reales. El pedido al proveedor se genera solo antes de que el estante se quede vacío.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Control total. Nunca falta, nunca sobra. El margen de beneficios subió un 12% solo por eliminar el desperdicio y las compras de pánico de última hora.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'tech',
            title: "El Muro de Cristal",
            tag: "DIGITALIZACIÓN",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Creyó que la tecnología era para 'grandes cadenas'. Que su libreta azul era sagrada. Hasta que la libreta se mojó y los nombres se borraron. El pánico de perder 10 años de contactos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "No le obligamos a programar. Le entregamos un tablero de mando humano. Tan simple como pulsar un icono. Tan potente como un ejército de secretarias trabajando 24/7.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ahora su Peluquería es el referente tecnológico del barrio. No volvió a comprar una libreta. Su mente está libre para crear, no para recordar nombres y horas.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'empire',
            title: "El Imperio de la Calma",
            tag: "ESCALABILIDAD",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Tenía 3 locales y 3 mil problemas. Cada día era un incendio que apagar. Estaba a punto de cerrar uno por puro agotamiento mental y falta de control real.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Centralizamos la inteligencia. Reglas de oro aplicadas a cada local por igual. Paneles de control que le dicen la verdad del negocio desde su propia casa.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Hoy factura el triple con la mitad de personal de gestión. Está buscando local para el cuarto negocio. Dejó de ser el bombero para ser el arquitecto de su empresa.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ],

    // CLÍNICAS Y SALUD
    'clinicas': [
        {
            id: 'interruption',
            title: "El Médico Interrumpido",
            tag: "SATURACIÓN MENTAL",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "En plena consulta, el teléfono sonó 4 veces. La recepcionista entró dos veces a preguntar. Perdió el hilo con el paciente. La calidad asistencial se desmoronaba por el caos administrativo.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Blindamos las sesiones. Sistema de gestión que filtra urgencias reales de ruido. La recepción dejó de ser un cuello de botella. El médico recuperó su concentración.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ahora cada consulta es sagrada. Cero interrupciones innecesarias. Los pacientes notan la diferencia. Las valoraciones subieron un 40%. La vocación volvió a tener sentido.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'overlap',
            title: "La Sala de Espera Infinita",
            tag: "MALA PLANIFICACIÓN",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Tres pacientes citados a la misma hora. Uno llevaba 45 minutos esperando. Las quejas en Google empezaron a llegar. El prestigio de años se evaporaba por una agenda mal diseñada.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Ingeniería de tiempos reales. Cada tipo de consulta tiene su slot exacto. Buffers automáticos entre pacientes. El sistema predice y previene los solapamientos.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "La sala de espera está vacía. No porque no haya pacientes, sino porque entran justo a su hora. Las reseñas de 5 estrellas mencionan 'puntualidad suiza'.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'delegate',
            title: "El Centro sin Cabeza",
            tag: "INCAPACIDAD DE DELEGAR",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Si no estaba, el centro se paraba. Las auxiliares no sabían qué hacer sin preguntar. Un día de baja significaba cancelar 20 citas. El negocio dependía de una sola persona.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Protocolos clínicos digitalizados. Cada rol sabe exactamente qué hacer y cuándo. Sistema de decisiones que no requiere al fundador. La estructura se volvió autónoma.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Se fue de vacaciones 2 semanas. El centro facturó más que nunca. El equipo creció en confianza. Dejó de ser imprescindible para ser el estratega.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'recurring',
            title: "El Ciclo Roto",
            tag: "SESIONES RECURRENTES",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Pacientes de fisioterapia que necesitaban 10 sesiones. Cada semana había que recordarles, reagendar, perseguirlos. El 40% abandonaba el tratamiento a mitad. Resultados incompletos, ingresos perdidos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de sesiones recurrentes automáticas. Al agendar la primera, se bloquean las 10. Recordatorios automáticos. Prepago del pack completo. El tratamiento se completa o se completa.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Tasa de finalización del 95%. Los pacientes mejoran de verdad. Las referencias se disparan. La agenda está llena 3 semanas por adelantado. Ingresos predecibles y recurrentes.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'burnout-clinical',
            title: "El Sanador Enfermo",
            tag: "CARGA ASISTENCIAL",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "12 horas al día viendo pacientes. Sin descanso entre consultas. Comía un sándwich entre sesión y sesión. El burnout era evidente. Empezó a odiar lo que antes amaba.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis de carga asistencial real. Rediseño de agenda con bloques de recuperación. Límites automáticos de pacientes por día. El sistema protege al profesional del profesional.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Trabaja 6 horas efectivas. Gana lo mismo. La calidad de atención se disparó. Volvió a disfrutar cada consulta. El negocio creció porque él dejó de quemarse.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ],

    // ACADEMIAS Y FORMACIÓN
    'academias': [
        {
            id: 'empty-classes',
            title: "La Clase Fantasma",
            tag: "HORARIOS MAL APROVECHADOS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Clase de 18:00 con 3 alumnos de 15 posibles. Pagaba al profesor igual. Las luces, el local, todo funcionando para perder dinero. Cada hora vacía era un puñal en la caja.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de ocupación mínima. Si no se alcanza el umbral 48h antes, la clase se reagrupa automáticamente. Los alumnos reciben alternativas. Cero horas perdidas.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Todas las clases al 85% de ocupación mínima. Los profesores trabajan menos horas pero más rentables. El margen neto subió un 60%. La academia pasó de sobrevivir a prosperar.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'dependency',
            title: "El Formador Irreemplazable",
            tag: "DEPENDENCIA DEL FORMADOR",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Si él no daba la clase, no había ingresos. Enfermó una semana. Tuvo que cancelar 12 sesiones. Los alumnos se fueron a la competencia. El negocio era una jaula de oro.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Contenido modularizado y documentado. Protocolos de clase replicables. Formación de formadores con estándares claros. El conocimiento dejó de vivir en una sola cabeza.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Tiene 4 profesores dando su metodología. Se fue de vacaciones un mes. La academia facturó récord. Dejó de vender horas para vender un sistema escalable.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'dropouts',
            title: "La Sangría Silenciosa",
            tag: "INGRESOS IMPREVISIBLES",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Cada mes, 5-7 bajas sin previo aviso. Imposible planificar nada. Los gastos fijos seguían, los ingresos bailaban. Vivía con ansiedad financiera constante.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de compromiso con prepago trimestral. Bonificaciones por permanencia. Alertas tempranas de riesgo de baja. Los alumnos se quedan porque el sistema los retiene.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Tasa de retención del 92%. Ingresos predecibles con 3 meses de antelación. Puede planificar inversiones. El banco le ofreció una línea de crédito sin pedirla.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'capacity',
            title: "El Puzzle Imposible",
            tag: "GESTIÓN DE CAPACIDAD",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "No sabía cuántos alumnos más podía aceptar. Rechazaba inscripciones por miedo a saturarse. Luego descubría que tenía huecos vacíos. Perdía dinero por ambos lados.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Dashboard de capacidad real en tiempo real. Visualización de ocupación por horario, aula y profesor. El sistema le dice exactamente cuántos alumnos más puede aceptar y dónde.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Opera al 95% de capacidad óptima. Ni sobresaturado ni infrautilizado. Cada m² del local genera el máximo retorno. Sabe exactamente cuándo abrir un nuevo grupo.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'pricing',
            title: "La Trampa del Precio Bajo",
            tag: "ESTRATEGIA DE PRECIOS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Bajó precios para competir. Se llenó de alumnos que solo buscaban barato. Trabajaba el doble, ganaba menos. Los alumnos de calidad se fueron. Estaba atrapado en una espiral descendente.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis de valor real por alumno. Segmentación de servicios premium vs estándar. Precios basados en resultados, no en horas. El posicionamiento cambió de 'barato' a 'efectivo'.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Subió precios un 40%. Perdió el 30% de alumnos... pero factura un 25% más. Los que se quedaron son comprometidos. La calidad del ambiente mejoró. Todos ganan.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ],

    // HOSTELERÍA Y RESTAURACIÓN  
    'restaurantes': [
        {
            id: 'peak-chaos',
            title: "El Infierno de las 21:00",
            tag: "COLAPSO EN PICOS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Viernes noche. 40 mesas llenas. La cocina colapsada. Pedidos que se pierden. Clientes que esperan 50 minutos. Reseñas de 1 estrella al día siguiente. El éxito se convirtió en su peor enemigo.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de turnos con reserva obligatoria. Límite de mesas por franja horaria. Cocina recibe pedidos escalonados automáticamente. El caos se convirtió en flujo predecible.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Viernes noche. 40 mesas llenas. Cero estrés. La cocina fluye. Los clientes salen encantados. Las reseñas hablan de 'experiencia impecable'. Factura más trabajando menos.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'team-burnout',
            title: "La Puerta Giratoria",
            tag: "ESTRÉS DEL EQUIPO",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Cada mes, un camarero nuevo. Nadie aguantaba más de 3 meses. El estrés era insoportable. Gastaba más en formación que en ingredientes. El servicio era un desastre constante.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Protocolos claros de servicio. Sistema de comunicación cocina-sala digital. Turnos equilibrados con descansos reales. El trabajo dejó de ser heroico para ser profesional.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "El equipo lleva 2 años completo. Cero rotación. Piden trabajar más horas. El ambiente es profesional y relajado. Los clientes notan la diferencia. El servicio es una máquina aceitada.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'key-person',
            title: "El Encargado Insustituible",
            tag: "DEPENDENCIA EXTREMA",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Si el encargado faltaba, el local se hundía. Tuvo COVID. El restaurante cerró 10 días. Perdió 15.000€. El negocio dependía de una sola persona que podía irse en cualquier momento.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Documentación de todos los procesos críticos. Formación cruzada del equipo. Checklists digitales para cada turno. El conocimiento dejó de vivir en una sola cabeza.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "El encargado se fue de vacaciones 3 semanas. El local funcionó perfecto. Cualquier miembro del equipo puede cubrir cualquier posición. El negocio es un sistema, no una persona.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'waste',
            title: "El Agujero Negro de la Cocina",
            tag: "CONTROL DE MERMA",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Cada semana, 400€ de comida a la basura. No sabía qué se vendía realmente. Compraba por intuición. El margen se evaporaba en el contenedor. Trabajaba para tirar comida.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de inventario en tiempo real. Análisis de platos más vendidos. Compras basadas en datos históricos. Alertas de productos próximos a caducar. Cero intuición, solo datos.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Merma reducida al 5%. Compra exactamente lo que necesita. El margen neto subió 18 puntos. Cada ingrediente tiene un propósito. La basura dejó de ser un gasto operativo.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'demand',
            title: "La Montaña Rusa",
            tag: "ANTICIPACIÓN DE DEMANDA",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Lunes vacío, viernes colapsado. No podía planificar compras ni personal. Unos días sobraba comida, otros faltaba. Los costes fijos lo mataban en días flojos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis de patrones históricos. Predicción de demanda por día y franja. Personal ajustado a picos reales. Promociones inteligentes en días flojos. La demanda se volvió predecible.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ocupación estable del 70% todos los días. Los lunes tienen promociones que los llenan al 60%. Los viernes están controlados. Personal optimizado. Ingresos predecibles. Paz mental.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ],

    // SERVICIOS TÉCNICOS
    'talleres': [
        {
            id: 'lost-orders',
            title: "El Trabajo Fantasma",
            tag: "ÓRDENES PERDIDAS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Terminó la reparación hace 2 semanas. No facturó. El cliente no llamó. Él se olvidó. 380€ de trabajo regalado. Esto pasaba 3-4 veces al mes. Trabajaba gratis sin saberlo.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Orden de trabajo digital desde el primer contacto. Al cerrar la orden, factura automática. Recordatorios de cobro automáticos. Imposible olvidar un trabajo. Cero fugas.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "100% de trabajos facturados el mismo día de finalización. Cobro inmediato o a 7 días máximo. Recuperó 1.200€/mes que antes se perdían. El trabajo se convirtió en dinero real.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'materials',
            title: "El Ladrón Invisible",
            tag: "TRAZABILIDAD ROTA",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Facturaba 500€ por trabajo. Usaba 280€ en materiales pero solo cobraba 150€. No sabía qué había usado realmente. El margen se evaporaba. Trabajaba para perder dinero.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Registro de materiales en tiempo real desde el móvil. Cada pieza vinculada a la orden de trabajo. Cálculo automático del coste real. Facturación basada en consumo real + margen.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Sabe exactamente qué usó en cada trabajo. Factura el 100% de materiales + 40% de margen. El beneficio neto subió un 35%. Cada tornillo está contabilizado y cobrado.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'heavy-clients',
            title: "El Teléfono Ardiente",
            tag: "CLIENTES PESADOS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "15 llamadas al día preguntando '¿cuándo está lo mío?'. Interrumpía el trabajo para contestar. Perdía concentración. Los trabajos se retrasaban más. Un círculo vicioso de caos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Portal del cliente con estado en tiempo real. Notificaciones automáticas en cada fase. El cliente ve el progreso sin llamar. El teléfono dejó de ser una tortura.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Recibe 1-2 llamadas al día. Los clientes están informados automáticamente. Puede concentrarse en el trabajo. Los plazos se cumplen. Las reseñas hablan de 'comunicación perfecta'.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'time-tracking',
            title: "Las Horas Fantasma",
            tag: "CONTROL DE TIEMPOS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Trabajó 6 horas en una reparación compleja. Facturó 2 horas porque no las registró. Esto pasaba en el 60% de trabajos. Regalaba 20 horas a la semana. Era un esclavo de su desorden.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Registro de tiempo desde el móvil con un botón. Inicio/fin automático vinculado a cada orden. Facturación basada en tiempo real invertido. Imposible regalar horas.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Factura el 100% de horas trabajadas. Los ingresos subieron un 45% sin trabajar más. Sabe exactamente cuánto tiempo lleva cada tipo de trabajo. Puede cotizar con precisión.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'stock-chaos',
            title: "El Almacén del Caos",
            tag: "GESTIÓN DE STOCK",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Tenía 3 de la pieza que necesitaba... o eso creía. Buscó 40 minutos. No estaba. Tuvo que ir a comprarla. El cliente esperó 2 días más. Perdió tiempo y dinero.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Inventario digital en tiempo real. Cada pieza usada se descuenta automáticamente. Alertas de stock mínimo. Pedidos automáticos al proveedor. El almacén se volvió inteligente.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Sabe exactamente qué tiene y dónde. Nunca se queda sin piezas críticas. Nunca sobra stock muerto. Los trabajos fluyen sin interrupciones. El almacén es un activo, no un problema.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ],

    // RETAIL Y COMERCIO
    'comercios': [
        {
            id: 'dead-stock',
            title: "El Cementerio de Cajas",
            tag: "LIQUIDEZ ATRAPADA",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "12.000€ en stock que no se mueve. El banco vacío. No puede pagar al proveedor. Las cajas acumulan polvo mientras necesita liquidez desesperadamente. Su dinero está muerto en las estanterías.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis ABC de rotación. Identificación de stock muerto. Liquidación inteligente con promociones dirigidas. Compras futuras basadas en rotación real. El dinero volvió a fluir.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Stock que rota cada 45 días. Liquidez constante. Puede negociar mejores precios con proveedores. El almacén es un activo vivo, no un cementerio. Duerme tranquilo.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'blind-buying',
            title: "La Ruleta Rusa de las Compras",
            tag: "COMPRAS POR INTUICIÓN",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Compró 50 unidades de un producto 'que se iba a vender seguro'. Vendió 8 en 6 meses. 42 unidades muertas. 3.200€ tirados. Esto pasaba constantemente. Compraba con el corazón, no con datos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis de ventas históricas. Predicción de demanda basada en datos. Compras automáticas de productos que rotan. Alertas de productos de baja rotación. Cero intuición, solo matemáticas.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Compra exactamente lo que se vende. Stock muerto reducido al 2%. El margen neto subió 22 puntos. Cada euro invertido en stock genera retorno. Las compras son ciencia, no apuesta.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'margin-blind',
            title: "El Vendedor Ciego",
            tag: "MARGEN CIEGO",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Facturaba 15.000€ al mes. No sabía cuánto le quedaba limpio. Descubrió que algunos productos los vendía con pérdidas. Trabajaba 12 horas al día para ganar menos que un empleado.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Dashboard de margen por producto en tiempo real. Identificación de productos no rentables. Ajuste de precios basado en margen objetivo. Visibilidad total de rentabilidad.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Sabe exactamente cuánto gana con cada venta. Eliminó productos que no daban margen. Factura 12.000€ pero gana más que antes. Cada venta es rentable. El esfuerzo se convierte en dinero real.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'space-waste',
            title: "El M² de Oro Desperdiciado",
            tag: "OPTIMIZACIÓN DE ESPACIO",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Pagaba 2.000€/mes de alquiler. El 40% del espacio tenía productos que no se vendían. Cada m² le costaba 25€/mes. Estaba pagando para almacenar basura. Un despilfarro silencioso.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis de rentabilidad por m². Reubicación de productos según rotación. Eliminación de referencias de baja rotación. Cada metro cuadrado optimizado para máximo retorno.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Cada m² genera 150€/mes de margen. El espacio es un activo estratégico. Puede negociar un local más pequeño o abrir una segunda tienda. El espacio trabaja para él.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'pricing-chaos',
            title: "La Guerra de Precios",
            tag: "ESTRATEGIA DE PRECIOS",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Bajó precios para competir con Amazon. Se llenó de clientes que solo buscaban barato. Trabajaba más, ganaba menos. Los clientes de calidad se fueron. Estaba en una espiral de muerte.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Análisis de propuesta de valor única. Segmentación de productos premium vs commodity. Precios basados en valor, no en competencia. Posicionamiento diferenciado.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Subió precios un 30%. Perdió el 40% de clientes... pero factura un 20% más. Los que se quedaron son fieles. El margen es sano. Compite en valor, no en precio.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ],

    // SERVICIOS PROFESIONALES
    'agencias': [
        {
            id: 'mental-chaos',
            title: "El Malabarista Exhausto",
            tag: "CAOS MENTAL",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "8 proyectos abiertos. 23 tareas pendientes. No sabía por dónde empezar. Cada cliente pedía urgencias. Trabajaba 14 horas y sentía que no avanzaba nada. El burnout era inminente.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de gestión de proyectos con prioridades claras. Límite de proyectos simultáneos. Bloques de tiempo dedicados. El caos se convirtió en flujo ordenado.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Máximo 4 proyectos activos. Cada uno con fases claras. Sabe exactamente qué hacer cada día. Trabaja 8 horas efectivas. Entrega más y mejor. La claridad mental volvió.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'infinite-projects',
            title: "El Proyecto Infinito",
            tag: "PROYECTOS SIN FIN",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "El cliente pedía cambios sin parar. El proyecto que iba a durar 2 meses llevaba 6. No podía facturar más. Estaba trabajando gratis. El alcance se había evaporado.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Fases de proyecto con entregables firmados. Cambios fuera de alcance = presupuesto adicional. Límite de revisiones por fase. El alcance se volvió un contrato blindado.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Los proyectos terminan en el plazo acordado. Los cambios se facturan aparte. Los clientes respetan el proceso. Puede planificar su agenda con certeza. El tiempo es suyo otra vez.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'irregular-income',
            title: "La Montaña Rusa Financiera",
            tag: "COBROS IRREGULARES",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Un mes cobraba 8.000€, el siguiente 1.500€. Imposible planificar nada. Vivía con ansiedad financiera constante. Los proyectos terminaban pero el cobro tardaba meses. El flujo de caja era un caos.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Sistema de hitos con pagos vinculados. 30% anticipo, 40% a mitad, 30% al cierre. Facturación automática al completar cada fase. Los cobros se volvieron predecibles.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Ingresos predecibles con 2 meses de antelación. Flujo de caja estable. Puede planificar inversiones. El banco le ofreció crédito sin pedirlo. La ansiedad financiera desapareció.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'delegation-fear',
            title: "La Jaula de Oro",
            tag: "MIEDO A DELEGAR",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Todo pasaba por él. Si no lo hacía él, no estaba bien hecho. No podía crecer. No podía descansar. No podía enfermar. Tenía un trabajo, no un negocio. Era un esclavo de su propio talento.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Documentación de procesos creativos. Formación de equipo con estándares claros. Sistema de revisión en fases. El control sin la ejecución. Delegación con tranquilidad.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Tiene un equipo de 4 personas ejecutando su visión. Él solo revisa y dirige. Factura 3x más trabajando la mitad. Se fue de vacaciones un mes. El estudio facturó récord. Es libre.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        },
        {
            id: 'scope-creep',
            title: "El Síndrome del Perfeccionista",
            tag: "SOBRE-ENTREGA",
            stages: [
                {
                    title: "El Abismo",
                    icon: Flame,
                    text: "Entregaba el doble de lo acordado. Quería impresionar. El cliente estaba encantado... pero no pagaba más. Trabajaba 60 horas para cobrar 30. El perfeccionismo lo estaba arruinando.",
                    color: "text-red-400",
                    bg: "bg-red-400/10"
                },
                {
                    title: "El Despertar",
                    icon: Sword,
                    text: "Alcance definido con precisión quirúrgica. Entregables exactos por fase. Lo extra se cotiza aparte. El perfeccionismo se canaliza en lo acordado. Límites claros y respetados.",
                    color: "text-primary",
                    bg: "bg-primary/10"
                },
                {
                    title: "La Maestría",
                    icon: Trophy,
                    text: "Entrega exactamente lo acordado, con excelencia. Los extras se facturan. Los clientes pagan por el valor real. Trabaja 40 horas, factura 40 horas. El perfeccionismo es rentable.",
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10"
                }
            ]
        }
    ]
};

// Función helper para obtener las historias según el sector
export const getHeroJourneyStories = (sectorSlug) => {
    // Mapeo de sectores a grupos de historias
    const sectorMapping = {
        // Peluquerías y estética
        'peluquerias': 'peluquerias',
        'estetica': 'peluquerias',

        // Clínicas y salud
        'clinicas': 'clinicas',
        'fisioterapia': 'clinicas',
        'psicologia': 'clinicas',
        'bienestar': 'clinicas',

        // Academias y formación
        'academias': 'academias',
        'entrenadores': 'academias',

        // Hostelería
        'restaurantes': 'restaurantes',
        'hosteleria-org': 'restaurantes',
        'cafeterias': 'restaurantes',
        'bares-aforo': 'restaurantes',

        // Servicios técnicos
        'talleres': 'talleres',
        'servicios-tec': 'talleres',
        'instaladores': 'talleres',
        'mantenimiento': 'talleres',

        // Retail
        'comercios': 'comercios',
        'tiendas-esp': 'comercios',
        'negocios-fisicos': 'comercios',

        // Servicios profesionales
        'agencias': 'agencias',
        'estudios-diseno': 'agencias',
        'arquitectos': 'agencias',
        'interiorismo': 'agencias',
        'consultores': 'agencias'
    };

    const storyGroup = sectorMapping[sectorSlug] || 'peluquerias'; // Default a peluquerías
    return heroJourneyStories[storyGroup] || heroJourneyStories['peluquerias'];
};
