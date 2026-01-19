export const sectors = [
    // CITAS Y AGENDA
    {
        id: 'peluquerias',
        name: 'Peluquerías',
        slug: 'peluquerias',
        icon: 'Scissors',
        description: 'Gestión de citas y tiempos para peluquerías y barberías',
        segmentId: 'citas-agenda',
        // ... rest of the sectors precisely updated
        problems: [
            {
                problem: "Te escriben por WhatsApp a deshoras y se te olvida agendar entre tinte y tinte.",
                solution: "Reserva automática vinculada a tu calendario. Se agenda solo, tú solo cortas el pelo.",
                result: "Agenda llena sin tocar el móvil durante el servicio."
            },
            {
                problem: "Un cliente no aparece y pierdes la hora. No has cobrado nada y ese hueco se queda vacío.",
                solution: "Cobro de una pequeña señal al reservar. Si no vienen, al menos cobras tu tiempo.",
                result: "Adiós a los plantones que te hacen perder dinero."
            }
        ],
        solutions: ['Reservas online 24/7', 'Recordatorios automáticos', 'Cobro de señal preventa', 'Historial de cliente'],
        keywords: 'peluqueria, barberia, gestion citas'
    },
    {
        id: 'estetica',
        name: 'Centros de Estética',
        slug: 'estetica',
        icon: 'Sparkles',
        description: 'Control de tratamientos y citas para centros de belleza',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "Gestión manual de cabinas y profesionales. A veces se solapan las citas.",
                solution: "Asignación automática de recursos (cabina + esteticista) al reservar.",
                result: "Cero errores de organización. Todo fluye solo."
            }
        ],
        solutions: ['Gestión de cabinas', 'Bonos de sesiones', 'Recordatorios WhatsApp'],
        keywords: 'estetica, centro belleza, tratamientos'
    },
    {
        id: 'clinicas',
        name: 'Clínicas Privadas',
        slug: 'clinicas',
        icon: 'Stethoscope',
        description: 'Organización profesional de pacientes y consultas',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "El teléfono no para de sonar para preguntar horarios, interrumpiendo la consulta.",
                solution: "Un asistente que responde dudas básicas y da citas por WhatsApp automáticamente.",
                result: "Silencio en recepción. Calma para atender al paciente."
            }
        ],
        solutions: ['Gestión de pacientes', 'Recordatorios de salud', 'Facturación inmediata'],
        keywords: 'clinica, consulta medica, gestion pacientes'
    },
    {
        id: 'fisioterapia',
        name: 'Fisioterapia',
        slug: 'fisioterapia',
        icon: 'Activity',
        description: 'Gestión de sesiones y seguimiento de pacientes',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "Pacientes que cancelan a última hora y pierdes el hueco del especialista.",
                solution: "Sistema de confirmación obligatoria 24h antes. Si cancelan, se ofrece el hueco a la lista de espera.",
                result: "Sala siempre llena y facturando."
            }
        ],
        solutions: ['Listas de espera automáticas', 'Bonos de fisioterapia', 'Fichas de seguimiento'],
        keywords: 'fisioterapeuta, fisio, rehabilitacion'
    },
    {
        id: 'psicologia',
        name: 'Psicología',
        slug: 'psicologia',
        icon: 'Brain',
        description: 'Privacidad y organización para consultas de psicología',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "Mucho tiempo perdido cuadrando sesiones y confirmando asistencias por email.",
                solution: "Autogestión de citas para el paciente con total privacidad.",
                result: "Más tiempo para tus sesiones y menos para el Excel."
            }
        ],
        solutions: ['Privacidad blindada', 'Pagos online', 'Recordatorios discretos'],
        keywords: 'psicologo, terapia, consulta psicologia'
    },
    {
        id: 'bienestar',
        name: 'Centros de Bienestar',
        slug: 'bienestar',
        icon: 'Sun',
        description: 'Gestión de espacios y clases para centros wellness',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "Controlar quién ha pagado el bono y cuántas sesiones le quedan es un lío de papeles.",
                solution: "Control digital de bonos. Se descuentan solos al entrar.",
                result: "Control total de ingresos y asistencia."
            }
        ],
        solutions: ['Control de aforo', 'Gestión de bonos', 'Reservas de clases'],
        keywords: 'wellness, yoga, pilates, bienestar'
    },
    {
        id: 'academias',
        name: 'Academias Pequeñas',
        slug: 'academias',
        icon: 'GraduationCap',
        description: 'Control de grupos, cobros y asistencia para centros de formación',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "Pasar recibos todos los meses y perseguir a los que no pagan es agotador.",
                solution: "Cobro automático por tarjeta o domiciliación cada mes.",
                result: "Cobras el día 1 sin mover un dedo."
            }
        ],
        solutions: ['Pagos recurrentes', 'Control de asistencia', 'Comunicación con alumnos'],
        keywords: 'academia, clases particulares, cursos'
    },
    {
        id: 'entrenadores',
        name: 'Entrenadores Personales',
        slug: 'entrenadores',
        icon: 'Dumbbell',
        description: 'Optimización de tiempo y entrenamientos para coaches',
        segmentId: 'citas-agenda',
        problems: [
            {
                problem: "Pasas más tiempo enviando PDFs por WhatsApp que entrenando.",
                solution: "Área de cliente con entrenamientos y citas centralizadas.",
                result: "Orden profesional que te permite cobrar más caro."
            }
        ],
        solutions: ['Reserva de sesiones', 'Pagos por objetivos', 'App de entrenamiento'],
        keywords: 'coach, fitness, entrenamiento personal'
    },

    // ATENCIÓN PRESENCIAL
    {
        id: 'restaurantes',
        name: 'Restaurantes',
        slug: 'restaurantes',
        icon: 'Utensils',
        description: 'Control de reservas y flujo de sala para hostelería',
        segmentId: 'atencion-presencial',
        problems: [
            {
                problem: "Teléfono sonando en mitad del servicio. Camareros estresados anotando mal las mesas.",
                solution: "Módulo de reserva web que solo deja mesa si realmente hay sitio.",
                result: "Camareros centrados en servir, no en coger el teléfono."
            }
        ],
        solutions: ['Reservas inteligentes', 'Gestión de mesas', 'Recordatorios SMS'],
        keywords: 'restaurante, comer, cenas, reservas'
    },
    {
        id: 'hosteleria-org',
        name: 'Hostelería Organizada',
        slug: 'hosteleria-org',
        icon: 'Layers',
        description: 'Estandarización de procesos para cadenas y grupos',
        segmentId: 'atencion-presencial',
        problems: [
            {
                problem: "Cada local funciona de una manera. Imposible saber la rentabilidad real de cada uno.",
                solution: "Sistema centralizado de procesos y KPIs en tiempo real.",
                result: "Control total de tu negocio desde una pantalla."
            }
        ],
        solutions: ['Control multi-local', 'Estandarización', 'Métricas avanzadas'],
        keywords: 'franquicia, cadena restaurantes, grupos hosteleros'
    },
    {
        id: 'cafeterias',
        name: 'Cafeterías con Reservas',
        slug: 'cafeterias',
        icon: 'Coffee',
        description: 'Gestión de desayunos y meriendas grupales',
        segmentId: 'atencion-presencial',
        problems: [
            {
                problem: "Llegan grupos sin avisar y tienes que decir que no porque no tienes sitio montado.",
                solution: "Fomentar la reserva online para grupos grandes con pre-pago si es necesario.",
                result: "Ventas aseguradas y local bien organizado."
            }
        ],
        solutions: ['Reservas de grupos', 'Venta anticipada', 'Control de rotación'],
        keywords: 'cafeteria, brunch, meriendas'
    },
    {
        id: 'bares-aforo',
        name: 'Bares con Control de Aforo',
        slug: 'bares-aforo',
        icon: 'GlassWater',
        description: 'Gestión de listas y entradas para locales nocturnos',
        segmentId: 'atencion-presencial',
        problems: [
            {
                problem: "Colas interminables en la puerta y líos con las listas VIP.",
                solution: "Códigos QR de entrada y control de aforo en tiempo real desde el móvil.",
                result: "Puerta rápida y control total de quién entra."
            }
        ],
        solutions: ['Control QR', 'Listas online', 'Preventa de entradas'],
        keywords: 'pub, discoteca, bar copas'
    },

    // SERVICIOS TÉCNICOS
    {
        id: 'talleres',
        name: 'Talleres Mecánicos',
        slug: 'talleres',
        icon: 'Wrench',
        description: 'Control de reparaciones y recambios para automoción',
        segmentId: 'servicios-tecnicos',
        problems: [
            {
                problem: "Coches que se quedan semanas porque falta una pieza que no pediste a tiempo.",
                solution: "Control de stock crítico. El sistema pide la pieza al proveedor en cuanto abres la orden.",
                result: "Reparaciones más rápidas y coches fuera del taller antes."
            }
        ],
        solutions: ['Orden de trabajo digital', 'Control de stock', 'Facturación inmediata'],
        keywords: 'taller, mecanico, coches, reparacion'
    },
    {
        id: 'servicios-tec',
        name: 'Servicios Técnicos',
        slug: 'servicios-tec',
        icon: 'Cable',
        description: 'Organización de avisos y reparaciones a domicilio',
        segmentId: 'servicios-tecnicos',
        problems: [
            {
                problem: "Técnicos que pierden los papeles de los avisos o no anotan bien los materiales.",
                solution: "App donde el técnico anota todo en el momento. El cliente firma en el móvil.",
                result: "Cero papeles perdidos y facturas sin errores."
            }
        ],
        solutions: ['Gestión de partes', 'Firma digital', 'Geolocalización'],
        keywords: 'reparaciones, sat, servicio tecnico'
    },
    {
        id: 'instaladores',
        name: 'Instaladores',
        slug: 'instaladores',
        icon: 'HardHat',
        description: 'Control de obras y mantenimientos para aire, luz o agua',
        segmentId: 'servicios-tecnicos',
        problems: [
            {
                problem: "Terminas la obra y tardas 1 semana en hacer la factura. El cliente se enfría y tarda en pagar.",
                solution: "Factura enviada en cuanto el instalador sale de la casa del cliente.",
                result: "Mejora brutal del flujo de caja."
            }
        ],
        solutions: ['Presupuestos express', 'Control de obra', 'Certificados digitales'],
        keywords: 'aire acondicionado, electricista, fontanero'
    },
    {
        id: 'mantenimiento',
        name: 'Empresas de Mantenimiento',
        slug: 'mantenimiento',
        icon: 'Hammer',
        description: 'Sistemas preventivos para edificios y empresas',
        segmentId: 'servicios-tecnicos',
        problems: [
            {
                problem: "Se te olvidan las revisiones obligatorias. Riesgo de multas y mal servicio.",
                solution: "Calendario de preventivos que avisa solo y genera la orden de trabajo.",
                result: "Cumplimiento legal 100% sin esfuerzo."
            }
        ],
        solutions: ['Mantenimiento preventivo', 'Contratos recurrentes', 'Gestión de activos'],
        keywords: 'comunidades, mantenimiento industrial, revisiones'
    },

    // VENTA DE PRODUCTO
    {
        id: 'comercios',
        name: 'Comercios Locales',
        slug: 'comercios',
        icon: 'Store',
        description: 'Digitalización del comercio de proximidad',
        segmentId: 'venta-producto',
        problems: [
            {
                problem: "No sabes qué productos te dejan dinero y cuáles solo ocupan sitio.",
                solution: "Informes de rentabilidad por producto. Compra solo lo que vendes.",
                result: "Estanterías productivas y caja con dinero."
            }
        ],
        solutions: ['TPV inteligente', 'Gestión de stock', 'Fidelización'],
        keywords: 'tienda barrio, comercio, retail'
    },
    {
        id: 'tiendas-esp',
        name: 'Tiendas Especializadas',
        slug: 'tiendas-esp',
        icon: 'ShoppingBag',
        description: 'Gestión de catálogo complejo y nicho',
        segmentId: 'venta-producto',
        problems: [
            {
                problem: "Vender en tienda y en web a la vez es un lío de stock. Vendes lo que no tienes.",
                solution: "Stock único sincronizado. Si se vende en tienda, desaparece de la web.",
                result: "Cero problemas con clientes online."
            }
        ],
        solutions: ['Sincronización web', 'Atributos de producto', 'Gestión de envíos'],
        keywords: 'musica, deportes, hobby'
    },
    {
        id: 'negocios-fisicos',
        name: 'Negocios Físicos de Producto',
        slug: 'negocios-fisicos',
        icon: 'Box',
        description: 'Control de almacén y venta para distribuidores locales',
        segmentId: 'venta-producto',
        problems: [
            {
                problem: "El almacén es un caos. Tardas más en encontrar el producto que en venderlo.",
                solution: "Organización por ubicaciones digitalizada. Escaneas y encuentras.",
                result: "Operativa rápida y sin fallos de envío."
            }
        ],
        solutions: ['Control de almacén', 'Picking por móvil', 'Logística local'],
        keywords: 'almacen, distribucion, suministros'
    },

    // SERVICIOS PROFESIONALES
    {
        id: 'agencias',
        name: 'Agencias Creativas',
        slug: 'agencias',
        icon: 'Rocket',
        description: 'Estandarización de entregas para marketing y diseño',
        segmentId: 'servicios-profesionales',
        problems: [
            {
                problem: "Proyectos que no terminan nunca. El cliente pide y pide cambios.",
                solution: "Hitos de proyecto cerrados y firmados digitalmente antes de seguir.",
                result: "Proyectos rentables que se cierran a tiempo."
            }
        ],
        solutions: ['Gestión de proyectos', 'Hitos de cobro', 'Comunicación cliente'],
        keywords: 'marketing, publicidad, social media'
    },
    {
        id: 'estudios-diseno',
        name: 'Estudios de Diseño',
        slug: 'estudios-diseno',
        icon: 'Palette',
        description: 'Flujo de trabajo creativo optimizado',
        segmentId: 'servicios-profesionales',
        problems: [
            {
                problem: "Persiguiendo al cliente para que te envíe el logo o los textos.",
                solution: "Onboarding automático. Si no envían el material, el proyecto no arranca.",
                result: "Tú diseñas, el sistema gestiona los archivos."
            }
        ],
        solutions: ['Recogida de archivos', 'Aprobaciones online', 'Control de horas'],
        keywords: 'branding, diseño grafico, web'
    },
    {
        id: 'arquitectos',
        name: 'Arquitectos',
        slug: 'arquitectos',
        icon: 'Ruler',
        description: 'Control de fases y visados para estudios de arquitectura',
        segmentId: 'servicios-profesionales',
        problems: [
            {
                problem: "Lío con las versiones de los planos y la documentación técnica.",
                solution: "Repositorio único por proyecto con control de versiones.",
                result: "Seguridad total en lo que se entrega al visado."
            }
        ],
        solutions: ['Gestión documental', 'Hitos de obra', 'Presupuestos técnicos'],
        keywords: 'arquitectura, proyectos, planos'
    },
    {
        id: 'interiorismo',
        name: 'Interiorismo',
        slug: 'interiorismo',
        icon: 'Armchair',
        description: 'Gestión de compras y proveedores para proyectos de interior',
        segmentId: 'servicios-profesionales',
        problems: [
            {
                problem: "Controlar presupuestos de 10 proveedores distintos para una sola reforma.",
                solution: "Consolidador de presupuestos por proyecto técnico.",
                result: "Margen controlado al céntimo."
            }
        ],
        solutions: ['Lista de la compra', 'Presupuestos cliente', 'Control de montajes'],
        keywords: 'decoracion, reformas, muebles'
    },
    {
        id: 'consultores',
        name: 'Consultores Locales',
        slug: 'consultores',
        icon: 'Briefcase',
        description: 'Venta de conocimiento y servicios de asesoría',
        segmentId: 'servicios-profesionales',
        problems: [
            {
                problem: "Mucho tiempo en reuniones gratuitas que no llegan a nada.",
                solution: "Sistema de pago previo para consultorías estratégicas.",
                result: "Solo hablas con quien valora tu tiempo."
            }
        ],
        solutions: ['Venta de sesiones', 'Portal de cliente', 'Automatización legal'],
        keywords: 'asesoria, abogado, consultoria'
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
