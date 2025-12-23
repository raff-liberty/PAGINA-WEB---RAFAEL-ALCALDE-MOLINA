export const sectors = [
    {
        id: 'peluquerias',
        name: 'Peluquerías y Estética',
        slug: 'peluquerias',
        icon: '✂️',
        description: 'Automatización para peluquerías, barberías y centros de estética',
        problems: [
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
        solutions: [
            'Sistema de reservas online con recordatorios automáticos',
            'Gestión de ausencias con señales y políticas claras',
            'Control de inventario con alertas automáticas',
            'Facturación desde tablet en el momento',
            'Base de datos de clientes con historial'
        ],
        keywords: 'peluqueria, barberia, salon belleza, centro estetica, gestion citas peluqueria'
    },
    {
        id: 'restaurantes',
        name: 'Restaurantes y Hostelería',
        slug: 'restaurantes',
        icon: '🍽️',
        description: 'Soluciones para restaurantes, bares y negocios de hostelería',
        problems: [
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
        ],
        solutions: [
            'Sistema de reservas online con señal',
            'Recordatorios automáticos por WhatsApp',
            'Control de inventario en tiempo real',
            'Pedidos automáticos a proveedores',
            'Dashboard de ventas actualizado en vivo'
        ],
        keywords: 'restaurante, bar, hosteleria, reservas restaurante, gestion restaurante'
    },
    {
        id: 'clinicas',
        name: 'Clínicas y Centros Médicos',
        slug: 'clinicas',
        icon: '🏥',
        description: 'Automatización para clínicas, consultas y centros de salud',
        problems: [
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
        solutions: [
            'Sistema de citas con recordatorios automáticos',
            'Gestión digital de historiales médicos',
            'Confirmaciones automáticas por SMS/WhatsApp',
            'Facturación integrada con mutuas',
            'Seguimientos automáticos programados'
        ],
        keywords: 'clinica, centro medico, consulta, gestion pacientes, citas medicas'
    },
    {
        id: 'talleres',
        name: 'Talleres y Servicios Técnicos',
        slug: 'talleres',
        icon: '🔧',
        description: 'Soluciones para talleres mecánicos, fontaneros, electricistas',
        problems: [
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
        solutions: [
            'Facturación desde móvil en 30 segundos',
            'Sistema de gestión de trabajos pendientes',
            'Presupuestos digitales con seguimiento',
            'Control de stock de repuestos',
            'Recordatorios automáticos de pago'
        ],
        keywords: 'taller mecanico, fontanero, electricista, servicios tecnicos, reparaciones'
    },
    {
        id: 'tatuajes',
        name: 'Estudios de Tatuajes',
        slug: 'tatuajes',
        icon: '🎨',
        description: 'Gestión creativa y técnica para estudios de tatuajes y piercings',
        problems: [
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
        solutions: [
            'Gestión de depósitos y citas online',
            'Consentimientos informados digitales',
            'Galería de diseños y portafolio automático',
            'Seguimiento post-tatuaje automático',
            'Control de stock de agujas y tintas'
        ],
        keywords: 'tatuaje, tattoo studio, gestion estudio tatuajes, cita tatuaje'
    },
    {
        id: 'agencias',
        name: 'Agencias y Consultoras',
        slug: 'agencias',
        icon: '🚀',
        description: 'Automatización de procesos para agencias de marketing, desarrollo y consultoría',
        problems: [
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
        solutions: [
            'Onboarding de clientes automático',
            'Gestión de proyectos y tareas',
            'Facturación recurrente y suscripciones',
            'Pipeline de ventas automatizado',
            'Reportes de rentabilidad por proyecto'
        ],
        keywords: 'agencia marketing, consultoría, gestion proyectos, onboarding clientes'
    },
    {
        id: 'comercios',
        name: 'Comercios y Tiendas',
        slug: 'comercios',
        icon: '🏪',
        description: 'Automatización para tiendas físicas y comercios locales',
        problems: [
            {
                problem: "Inventario descontrolado y no sabes realmente cuánto ganas al final del mes.",
                solution: "Sistema de punto de venta (TPV) integrado con control de stock automático.",
                result: "Sabes exactamente qué vendes y qué tienes que reponer."
            }
        ],
        solutions: [
            'Sistema de punto de venta (TPV) integrado',
            'Control de inventario automático',
            'Dashboard de ventas en tiempo real',
            'Pedidos automáticos cuando stock es bajo',
            'Reportes de rentabilidad automáticos'
        ],
        keywords: 'tienda, comercio, punto de venta, tpv, gestion tienda'
    }
];

export const generateSectorLocationPages = (locations) => {
    const pages = [];

    sectors.forEach(sector => {
        locations.forEach(location => {
            pages.push({
                id: `${sector.id}-${location.id}`,
                sector: sector,
                location: location,
                slug: `${sector.slug}-${location.slug}`,
                title: `${sector.name} en ${location.name}`,
                metaTitle: `${sector.name} en ${location.name} | Automatización y Gestión`,
                metaDescription: `Soluciones de automatización para ${sector.slug} en ${location.name}. ${sector.description}. Sin complicaciones técnicas.`,
                keywords: `${sector.keywords}, ${sector.slug} ${location.name}, automatizacion ${sector.slug} ${location.name}`
            });
        });
    });

    return pages;
};

export const getSectorBySlug = (slug) => {
    return sectors.find(s => s.slug === slug);
};

export const getAllSectorSlugs = () => {
    return sectors.map(s => s.slug);
};

