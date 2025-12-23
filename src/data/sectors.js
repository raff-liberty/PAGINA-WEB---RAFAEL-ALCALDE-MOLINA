// Sector + Location combinations for highly targeted SEO
export const sectors = [
    {
        id: 'peluquerias',
        name: 'Peluquerías y Estética',
        slug: 'peluquerias',
        icon: '✂️',
        description: 'Automatización para peluquerías, barberías y centros de estética',
        problems: [
            'Clientes que no aparecen (ausencias)',
            'Gestión caótica de citas por WhatsApp',
            'Pérdida de tiempo confirmando citas manualmente',
            'Control de stock de productos desorganizado',
            'Facturación lenta al final del día'
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
            'Ausencias que dejan mesas vacías',
            'Gestión de reservas por teléfono que interrumpe el servicio',
            'Control de stock desorganizado (te quedas sin ingredientes)',
            'Pedidos a proveedores hechos a mano',
            'Reportes de ventas que llevan horas hacer'
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
            'Pacientes que olvidan sus citas',
            'Gestión manual de historiales',
            'Confirmaciones de cita por teléfono',
            'Facturación y cobros desorganizados',
            'Falta de seguimiento post-consulta'
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
            'Facturas que se olvidan hacer',
            'Control de trabajos pendientes en papel',
            'Presupuestos que se pierden',
            'Inventario de repuestos desorganizado',
            'Cobros que se retrasan semanas'
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
        id: 'comercios',
        name: 'Comercios y Tiendas',
        slug: 'comercios',
        icon: '🏪',
        description: 'Automatización para tiendas físicas y comercios locales',
        problems: [
            'Inventario descontrolado',
            'Ventas sin registrar correctamente',
            'Falta de datos sobre qué se vende más',
            'Pedidos a proveedores hechos a ojo',
            'No sabes cuánto ganas realmente'
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

// Generate all sector + location combinations
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

// Helper functions
export const getSectorBySlug = (slug) => {
    return sectors.find(s => s.slug === slug);
};

export const getAllSectorSlugs = () => {
    return sectors.map(s => s.slug);
};
