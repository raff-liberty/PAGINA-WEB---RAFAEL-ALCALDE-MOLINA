// Location data for SEO local pages
export const locations = [
    {
        id: 'murcia',
        name: 'Murcia',
        slug: 'murcia',
        description: 'La capital no perdona el desorden. Si tu negocio en Murcia sigue gestionando citas por papel o perdiendo WhatsApps por el camino, estás regalando clientes a la competencia. Automatización real para negocios que quieren crecer de verdad.',
        metaDescription: '¿Tu negocio en Murcia es un caos? Automatización de procesos para peluquerías, restaurantes y clínicas. Recupera el control operativo y deja de perder dinero.',
        keywords: 'automatización negocios Murcia, optimizar procesos Murcia, gestión digital negocios Murcia, consultoría automatización Murcia',
        context: 'centro neurálgico y empresarial de la Región',
        examples: [
            'Peluquerías saturadas en Gran Vía que ignoran citas por WhatsApp',
            'Restaurantes en Santo Domingo con reservas que se apuntan mal o se olvidan',
            'Clínicas en Juan Carlos I que pierden mañanas enteras en tareas administrativas'
        ]
    },
    {
        id: 'cartagena',
        name: 'Cartagena',
        slug: 'cartagena',
        description: 'En Cartagena el tiempo es oro y el caos es plomo. Ayudo a negocios de la ciudad portuaria a digitalizar su trastienda para que dejen de ser esclavos de sus propios procesos manuales.',
        metaDescription: 'Elimina el caos de tu negocio en Cartagena. Expertos en automatización para hostelería y servicios técnicos. Orden real, sin rodeos.',
        keywords: 'automatización Cartagena, digitalizar negocio Cartagena, gestión flujos Cartagena, eficiencia operativa Cartagena',
        context: 'ciudad portuaria con fuerte pulmón industrial',
        examples: [
            'Talleres mecánicos que pierden el rastro de piezas y facturas',
            'Negocios turísticos saturados con correos de reserva nunca contestados',
            'Empresas en el Polígono Cabezo Beaza con procesos del siglo pasado'
        ]
    },
    {
        id: 'lorca',
        name: 'Lorca',
        slug: 'lorca',
        description: 'Lorca tiene una fuerza increíble, pero muchos de sus negocios están frenados por una gestión "de toda la vida" que ya no aguanta el ritmo. Ponemos orden en tu operativa para que tú te centres en vender.',
        metaDescription: 'Servicios de automatización en Lorca. Especialistas en optimizar comercios y servicios locales. Deja de trabajar más y empieza a trabajar mejor.',
        keywords: 'automatización Lorca, optimización comercios Lorca, consultoría negocios Lorca, procesos Lorca',
        context: 'el corazón comercial del Valle del Guadalentín',
        examples: [
            'Comercios del centro que se vuelven locos con el stock manual',
            'Negocios agrícolas que necesitan reportes automáticos sin Excel infinitos',
            'Servicios profesionales que entierran su rentabilidad en papeleo'
        ]
    },
    {
        id: 'totana',
        name: 'Totana',
        slug: 'totana',
        description: 'Tu negocio en Totana no debería ser tu cárcel. Si cada vez que un cliente te pide algo sientes que el caos aumenta, necesitas automatizar. Tecnología invisible para recuperar tu libertad operativa.',
        metaDescription: 'Automatiza tu negocio en Totana. Tecnología simple para eliminar tareas repetitivas. Recupera tu tiempo y multiplica tu eficiencia.',
        keywords: 'automatización Totana, gestión negocios Totana, ahorrar tiempo negocio Totana, procesos digitales Totana',
        context: 'municipio clave del Bajo Guadalentín',
        examples: [
            'Negocios familiares donde "todo está en la cabeza del dueño"',
            'Servicios locales que dependen de llamadas interminables para agendar',
            'Pequeñas industrias que pierden el control de sus costes diarios'
        ]
    },
    {
        id: 'mazarron',
        name: 'Mazarrón',
        slug: 'mazarron',
        description: 'En Mazarrón, la estacionalidad te mata si no eres eficiente. Automatiza la gestión de tus clientes y reservas para que tu negocio sea rentable y ordenado todo el año, no solo en verano.',
        metaDescription: 'Optimización para negocios en Mazarrón. Especialistas en gestión de reservas y servicios turísticos mediante automatización.',
        keywords: 'automatización Mazarrón, gestión reservas Mazarrón, optimización hostelería Mazarrón',
        context: 'localidad costera con gran potencial turístico y agrícola',
        examples: [
            'Restaurantes del Puerto colapsados que no gestionan bien las cancelaciones',
            'Alquileres vacacionales con entradas y salidas que son un dolor de cabeza manual',
            'Servicios de mantenimiento que no saben qué técnico está en cada sitio'
        ]
    },
    {
        id: 'alcantarilla',
        name: 'Alcantarilla',
        slug: 'alcantarilla',
        description: 'Alcantarilla se mueve rápido, y tu negocio no puede quedarse atrás. Eliminamos el cuello de botella de tu administración para que tu estructura sea ágil, moderna y totalmente productiva.',
        metaDescription: 'Expertos en automatización en Alcantarilla. Ayudamos a PYMES y profesionales a eliminar el ruido operativo y digitalizar su día a día.',
        keywords: 'automatización Alcantarilla, eficiencia PYME Alcantarilla, consultor procesos Alcantarilla',
        context: 'nodo logístico y comercial estratégico',
        examples: [
            'Distribuidores locales con albaranes cruzados y datos perdidos',
            'Tiendas de ropa que podrían vender por WhatsApp de forma automatizada',
            'Gestoras y servicios profesionales que duplican tareas sin sentido'
        ]
    },
    {
        id: 'molina-de-segura',
        name: 'Molina de Segura',
        slug: 'molina-de-segura',
        description: 'La industria en Molina ya sabe que la eficiencia es la clave. Llevamos esa mentalidad a tu pequeño negocio o comercio para que compitas con las mejores herramientas del mercado.',
        metaDescription: 'Servicios de optimización en Molina de Segura. Tecnología aplicada al orden de pequeños negocios y servicios industriales.',
        keywords: 'automatización Molina de Segura, procesos industriales Molina, consultoría eficiencia Molina',
        context: 'referente industrial del Levante español',
        examples: [
            'Pequeñas naves industriales que aún dependen de libretas para el control',
            'Comercios con un potencial enorme frenados por una administración lenta',
            'Servicios a domicilio que coordinan sus rutas por llamadas y audios de voz'
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
