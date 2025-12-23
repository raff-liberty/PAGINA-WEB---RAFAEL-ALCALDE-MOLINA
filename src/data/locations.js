// Location data for SEO local pages
export const locations = [
    {
        id: 'murcia',
        name: 'Murcia',
        slug: 'murcia',
        description: 'Automatización y orden para negocios en Murcia capital. Ayudamos a pequeños negocios a recuperar el control operativo.',
        metaDescription: 'Servicios de automatización de negocios en Murcia. Eliminamos el caos operativo de tu negocio con procesos claros y tecnología invisible.',
        keywords: 'automatización negocios Murcia, consultoría empresarial Murcia, optimización procesos Murcia',
        population: '460.000 habitantes',
        context: 'capital de la Región de Murcia',
        examples: [
            'Peluquerías en el centro que pierden clientes por no contestar WhatsApp',
            'Restaurantes en la zona universitaria con problemas de reservas',
            'Clínicas en Ronda Sur con gestión manual de citas'
        ]
    },
    {
        id: 'cartagena',
        name: 'Cartagena',
        slug: 'cartagena',
        description: 'Automatización y orden para negocios en Cartagena. Soluciones prácticas para pequeños negocios del puerto y la ciudad.',
        metaDescription: 'Servicios de automatización de negocios en Cartagena. Orden operativo para tu negocio sin complicaciones técnicas.',
        keywords: 'automatización negocios Cartagena, consultoría empresarial Cartagena, optimización procesos Cartagena',
        population: '218.000 habitantes',
        context: 'ciudad portuaria e industrial',
        examples: [
            'Talleres mecánicos que pierden facturas',
            'Negocios turísticos en el puerto con gestión caótica',
            'Servicios técnicos que no tienen control de stock'
        ]
    },
    {
        id: 'lorca',
        name: 'Lorca',
        slug: 'lorca',
        description: 'Automatización y orden para negocios en Lorca. Ayudamos a pequeños negocios locales a trabajar con menos estrés.',
        metaDescription: 'Servicios de automatización de negocios en Lorca. Procesos claros y tecnología que funciona para tu negocio.',
        keywords: 'automatización negocios Lorca, consultoría empresarial Lorca, optimización procesos Lorca',
        population: '95.000 habitantes',
        context: 'tercer municipio más poblado de Murcia',
        examples: [
            'Comercios del centro histórico con gestión manual',
            'Negocios agrícolas que necesitan control de inventario',
            'Servicios locales sin sistema de facturación automatizado'
        ]
    },
    {
        id: 'totana',
        name: 'Totana',
        slug: 'totana',
        description: 'Automatización y orden para negocios en Totana. Soluciones prácticas sin complicaciones para pequeños negocios.',
        metaDescription: 'Servicios de automatización de negocios en Totana. Eliminamos tareas repetitivas y recuperas tu tiempo.',
        keywords: 'automatización negocios Totana, consultoría empresarial Totana, optimización procesos Totana',
        population: '32.000 habitantes',
        context: 'municipio del Bajo Guadalentín',
        examples: [
            'Negocios familiares que necesitan orden',
            'Servicios locales sin control de clientes',
            'Pequeños comercios con gestión en papel'
        ]
    },
    {
        id: 'mazarron',
        name: 'Mazarrón',
        slug: 'mazarron',
        description: 'Automatización y orden para negocios en Mazarrón. Ayudamos a negocios turísticos y locales a organizarse mejor.',
        metaDescription: 'Servicios de automatización de negocios en Mazarrón. Orden operativo para negocios turísticos y servicios locales.',
        keywords: 'automatización negocios Mazarrón, consultoría empresarial Mazarrón, optimización procesos Mazarrón',
        population: '35.000 habitantes',
        context: 'municipio costero con actividad turística',
        examples: [
            'Restaurantes de playa con problemas de reservas',
            'Apartamentos turísticos sin gestión automatizada',
            'Servicios de mantenimiento sin control de trabajos'
        ]
    },
    {
        id: 'alhama-de-murcia',
        name: 'Alhama de Murcia',
        slug: 'alhama-de-murcia',
        description: 'Automatización y orden para negocios en Alhama de Murcia. Soluciones prácticas para pequeños negocios locales.',
        metaDescription: 'Servicios de automatización de negocios en Alhama de Murcia. Procesos claros para tu negocio sin tecnología complicada.',
        keywords: 'automatización negocios Alhama de Murcia, consultoría empresarial Alhama, optimización procesos Alhama',
        population: '22.000 habitantes',
        context: 'municipio del Bajo Guadalentín',
        examples: [
            'Comercios locales con gestión manual',
            'Negocios de servicios sin sistema de citas',
            'Pequeñas empresas familiares que necesitan orden'
        ]
    },
    {
        id: 'alcantarilla',
        name: 'Alcantarilla',
        slug: 'alcantarilla',
        description: 'Automatización y orden para negocios en Alcantarilla. Ayudamos a pequeños negocios a eliminar el caos operativo.',
        metaDescription: 'Servicios de automatización de negocios en Alcantarilla. Recupera el control de tu negocio con procesos simples.',
        keywords: 'automatización negocios Alcantarilla, consultoría empresarial Alcantarilla, optimización procesos Alcantarilla',
        population: '43.000 habitantes',
        context: 'municipio del área metropolitana de Murcia',
        examples: [
            'Talleres y servicios técnicos sin control de trabajos',
            'Comercios del centro con gestión caótica',
            'Negocios familiares que necesitan automatización simple'
        ]
    },
    {
        id: 'molina-de-segura',
        name: 'Molina de Segura',
        slug: 'molina-de-segura',
        description: 'Automatización y orden para negocios en Molina de Segura. Ayudamos a empresas locales a optimizar su operativa digital.',
        metaDescription: 'Servicios de automatización de negocios en Molina de Segura. Optimización de procesos y tecnología para tu negocio.',
        keywords: 'automatización negocios Molina de Segura, consultoría empresarial Molina, optimización procesos Molina',
        population: '75.000 habitantes',
        context: 'importante centro industrial y de servicios',
        examples: [
            'Empresas industriales con procesos manuales',
            'Comercios del centro que necesitan digitalización',
            'Servicios profesionales sin control de agenda'
        ]
    }
];

// Helper function to get location by slug
export const getLocationBySlug = (slug) => {
    return locations.find(loc => loc.slug === slug);
};

// Helper function to get all location slugs (useful for routing)
export const getAllLocationSlugs = () => {
    return locations.map(loc => loc.slug);
};
