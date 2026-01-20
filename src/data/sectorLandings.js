import { Scissors, Stethoscope, GraduationCap, Utensils, Wrench, Store, Briefcase } from 'lucide-react';

export const sectorLandingsContent = {
    'citas-peluqueria': {
        sectors: ['peluquerias', 'estetica'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder - actualizar en admin
        hero_phrase: "Tu agenda debería trabajar para ti, no tú para tu agenda.",
        falsas_creencias: [
            { c: "Necesito más clientes para ganar más.", r: "No necesitas más clientes, necesitas dejar de perder el margen en huecos muertos y cancelaciones." },
            { c: "Si la agenda está llena, el negocio va bien.", r: "Una agenda llena de servicios de bajo margen y plantones es una trampa que te quema." },
            { c: "Es normal estar pegado al WhatsApp todo el día.", r: "No lo es. Es el síntoma de que tu negocio depende de tu atención constante para existir." }
        ],
        dolores_reales: [
            { t: "Agenda caótica", d: "WhatsApp saturado y citas que se apuntan mal entre servicio y servicio." },
            { t: "Fugas invisibles", d: "Huecos de 15-30 minutos que se quedan vacíos y no facturan." },
            { t: "Esclavitud total", d: "Si tú no coges el teléfono, el negocio no se mueve." },
            { t: "Ingresos irregulares", d: "Semanas de locura seguidas de días con el local vacío." }
        ],
        autoridad: {
            title: "La Agenda como Sistema Operativo",
            desc: "Transformamos tu calendario en un activo industrial que decide horarios, precios y recursos por ti.",
            bullets: ["Control real de rentabilidad", "Automatización de confirmaciones", "Reserva con pre-pago"]
        },
        faqs: [
            { q: "¿Mi problema es que tengo demasiadas cancelaciones?", a: "Las cancelaciones son un síntoma. El problema real suele ser que la agenda no está diseñada como un sistema que proteja el tiempo y el ingreso." },
            { q: "¿Con una app de reservas es suficiente?", a: "Una herramienta ayuda, pero no resuelve el problema de fondo. Sin una estructura clara de agenda, precios y ocupación, el caos se mantiene." },
            { q: "¿Esto es normal en negocios como el mío?", a: "Es frecuente, pero no inevitable. Aparece cuando el negocio crece sin un sistema que ordene la demanda y el tiempo." },
            { q: "¿Necesito más clientes para solucionarlo?", a: "No necesariamente. En muchos casos, el problema no es la falta de clientes, sino cómo se gestionan los que ya tienes." },
            { q: "¿El diagnóstico implica cambiarlo todo?", a: "No. El objetivo es ordenar lo que ya existe, no rehacer el negocio desde cero." }
        ]
    },
    'clinicas-salud': {
        sectors: ['clinicas', 'fisioterapia', 'psicologia', 'bienestar'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hero_phrase: "Tu vocación es curar, no gestionar un caos administrativo.",
        falsas_creencias: [
            { c: "Necesito más personal en recepción.", r: "Necesitas procesos que no requieran que alguien descuelgue el teléfono cada 5 minutos." },
            { c: "Mi problema es solo de gestión.", r: "Tu problema es de sistema. El caos clínico destruye la calidad del servicio y tu facturación." }
        ],
        dolores_reales: [
            { t: "Saturación mental", d: "Interrupciones constantes que te impiden centrarte en el paciente." },
            { t: "Mala planificación", d: "Sesiones que se solapan o tiempos de espera que enfadan al cliente." },
            { t: "Incapacidad de delegar", d: "Sientes que si no supervisas todo, el centro se para." }
        ],
        autoridad: {
            title: "Sistema Clínico de Alto Rendimiento",
            desc: "Estructuramos tu carga asistencial para que el centro funcione solo, permitiéndote delegar sin perder calidad.",
            bullets: ["Estructura de sesiones recurrente", "Control de carga asistencial", "Sistema de delegación blindado"]
        },
        faqs: [
            { q: "¿Mi problema es que tengo demasiadas cancelaciones?", a: "Las cancelaciones son un síntoma. El problema real suele ser que la agenda no está diseñada como un sistema que proteja el tiempo y el ingreso." },
            { q: "¿Con una app de reservas es suficiente?", a: "Una herramienta ayuda, pero no resuelve el problema de fondo. Sin una estructura clara de agenda, precios y ocupación, el caos se mantiene." },
            { q: "¿Esto es normal en negocios como el mío?", a: "Es frecuente, pero no inevitable. Aparece cuando el negocio crece sin un sistema que ordene la demanda y el tiempo." },
            { q: "¿Necesito más clientes para solucionarlo?", a: "No necesariamente. En muchos casos, el problema no es la falta de clientes, sino cómo se gestionan los que ya tienes." },
            { q: "¿El diagnóstico implica cambiarlo todo?", a: "No. El objetivo es ordenar lo que ya existe, no rehacer el negocio desde cero." }
        ]
    },
    'academias-formacion': {
        sectors: ['academias', 'entrenadores'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hero_phrase: "Deja de vender horas y empieza a vender resultados escalables.",
        falsas_creencias: [
            { c: "El problema es que me faltan alumnos.", r: "El problema es que tus grupos están descompensados y pierdes dinero en cada hora." },
            { c: "Esto no se puede sistematizar.", r: "Todo lo que es repetitivo se puede (y se debe) automatizar para recuperar tu margen." }
        ],
        dolores_reales: [
            { t: "Horarios mal aprovechados", d: "Clases con pocos alumnos que te cuestan dinero a ti." },
            { t: "Dependencia del formador", d: "Si tú no das la clase, no hay ingresos." },
            { t: "Ingresos imprevisibles", d: "Bajas de última hora que descuadran tu mes." }
        ],
        autoridad: {
            title: "Optimización de Capacidad Real",
            desc: "Mapeamos tu capacidad de formación para maximizar el retorno de cada hora invertida.",
            bullets: ["Grupos equilibrados automáticamente", "Visión de capacidad 360", "Pagos recurrentes blindados"]
        },
        faqs: [
            { q: "¿Mi problema es que tengo demasiadas cancelaciones?", a: "Las cancelaciones son un síntoma. El problema real suele ser que la agenda no está diseñada como un sistema que proteja el tiempo y el ingreso." },
            { q: "¿Con una app de reservas es suficiente?", a: "Una herramienta ayuda, pero no resuelve el problema de fondo. Sin una estructura clara de agenda, precios y ocupación, el caos se mantiene." },
            { q: "¿Esto es normal en negocios como el mío?", a: "Es frecuente, pero no inevitable. Aparece cuando el negocio crece sin un sistema que ordene la demanda y el tiempo." },
            { q: "¿Necesito más clientes para solucionarlo?", a: "No necesariamente. En muchos casos, el problema no es la falta de clientes, sino cómo se gestionan los que ya tienes." },
            { q: "¿El diagnóstico implica cambiarlo todo?", a: "No. El objetivo es ordenar lo que ya existe, no rehacer el negocio desde cero." }
        ]
    },
    'hosteleria-restauracion': {
        sectors: ['restaurantes', 'hosteleria-org', 'cafeterias', 'bares-aforo'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hero_phrase: "Que tu local esté lleno no debería ser una condena al estrés.",
        falsas_creencias: [
            { c: "Me falta personal cualificado.", r: "Te falta un sistema que no dependa de la 'heroicidad' de tus empleados clave." },
            { c: "El caos es parte del oficio.", r: "El caos es el síntoma de una operativa artesanal en un mundo que exige eficiencia industrial." }
        ],
        dolores_reales: [
            { t: "Colapso en picos", d: "Cuando hay más clientes es cuando más dinero pierdes por errores operativos." },
            { t: "Estrés del equipo", d: "Rotación constante porque nadie aguanta el ritmo de un local sin orden." },
            { t: "Dependencia extrema", d: "Si el encargado falla, el local se hunde." }
        ],
        autoridad: {
            title: "Estandarización de Flujos Industriales",
            desc: "Convertimos tus turnos en procesos predecibles basados en datos históricos, no en intuiciones.",
            bullets: ["Control de turnos por datos", "Protocolos de comunicación interna", "Anticipación de demanda"]
        },
        faqs: [
            { q: "¿El caos en horas punta es inevitable?", a: "No. Los picos de demanda son previsibles. El problema aparece cuando no hay procesos claros para gestionarlos." },
            { q: "¿El problema es la falta de personal?", a: "A veces, pero muchas veces el verdadero problema es la falta de estructura operativa en los momentos críticos." },
            { q: "¿Esto se soluciona con más presión al equipo?", a: "Al contrario. Sin sistema, más presión solo aumenta errores y desgaste." },
            { q: "¿Por qué facturo mucho pero siento poco control?", a: "Porque el volumen amplifica el desorden cuando no hay procesos estandarizados." },
            { q: "¿El diagnóstico sirve aunque mi negocio funcione “más o menos bien”?", a: "Sí. Precisamente es en negocios que “funcionan” donde el desorden crece sin que se note a tiempo." }
        ]
    },
    'servicios-tecnicos': {
        sectors: ['talleres', 'servicios-tec', 'instaladores', 'mantenimiento'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hero_phrase: "Tus facturas no deberían esperar a que termines la jornada.",
        falsas_creencias: [
            { c: "Tengo que bajar precios para competir.", r: "Tienes que dejar de regalar horas y materiales que no estás facturando por desorden." },
            { c: "Necesito trabajar más horas.", r: "Necesitas facturar el 100% de lo que ya trabajas. Hoy se te escapa un 20%." }
        ],
        dolores_reales: [
            { t: "Órdenes perdidas", d: "Trabajos terminados que tardan semanas en cobrarse (o no se cobran)." },
            { t: "Trazabilidad rota", d: "No sabes cuánto material has usado realmente en cada obra." },
            { t: "Clientes pesados", d: "Llamadas constantes para preguntar 'cuándo está lo mío'." }
        ],
        autoridad: {
            title: "Ciclo de Trazabilidad Total",
            desc: "Registro inmediato de tiempos y materiales vinculado directamente a tu facturación y caja.",
            bullets: ["Orden de trabajo digital", "Control de stock en tiempo real", "Facturación al cierre de obra"]
        },
        faqs: [
            { q: "¿Por qué trabajo tanto y gano menos de lo esperado?", a: "Normalmente porque no todo el trabajo realizado se controla, registra o factura correctamente." },
            { q: "¿El problema es que cobro poco?", a: "A menudo no. El problema suele estar en fugas invisibles de tiempo, materiales y facturación." },
            { q: "¿Esto se arregla trabajando más horas?", a: "No. Trabajar más sin control suele empeorar el problema." },
            { q: "¿Necesito un software nuevo?", a: "Antes de hablar de herramientas, hay que ordenar cómo entran, se ejecutan y se cierran los trabajos." },
            { q: "¿El diagnóstico implica cambiar mi forma de trabajar?", a: "Implica entenderla primero. Solo se cambia lo que realmente genera pérdidas o desorden." }
        ]
    },
    'retail-comercio': {
        sectors: ['comercios', 'tiendas-esp', 'negocios-fisicos'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hero_phrase: "Tu stock es dinero que se quema en las estanterías.",
        falsas_creencias: [
            { c: "Vender más lo arregla todo.", r: "Si vendes productos con poco margen o mucho stock muerto, vender más solo te arruina más rápido." },
            { c: "El stock alto es seguridad.", r: "El stock alto es falta de liquidez y riesgo de obsolescencia." }
        ],
        dolores_reales: [
            { t: "Liquidez atrapada", d: "No tienes dinero en el banco porque todo está en cajas amontonadas." },
            { t: "Compras por intuición", d: "Compras lo que crees que se vende, no lo que los datos dicen." },
            { t: "Margen ciego", d: "Vendes mucho pero no sabes cuánto te queda limpio al final del mes." }
        ],
        autoridad: {
            title: "Ingeniería de Inventario",
            desc: "Sistemas de rotación inteligente que liberan flujo de caja y optimizan cada m² de tu local.",
            bullets: ["Análisis de rotación ABC", "Predicción de compras", "Control de margen neto"]
        },
        faqs: [
            { q: "¿Mi problema es que vendo poco?", a: "Muchas veces el problema no es vender poco, sino tener demasiado dinero atrapado en stock que no rota." },
            { q: "¿El stock es inevitable en este tipo de negocio?", a: "Sí, pero el desorden no. El stock debe ser una herramienta, no una carga financiera." },
            { q: "¿Comprar más barato soluciona el problema?", a: "No siempre. Sin control de rotación y margen, comprar más puede empeorar la liquidez." },
            { q: "¿Por qué no tengo claridad sobre mis márgenes?", a: "Porque no hay un sistema que relacione compras, ventas y rotación de producto." },
            { q: "¿El diagnóstico sirve para negocios pequeños?", a: "Especialmente. En negocios pequeños, el impacto del stock mal gestionado es mayor." }
        ]
    },
    'servicios-profesionales': {
        sectors: ['agencias', 'estudios-diseno', 'arquitectos', 'interiorismo', 'consultores'],
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        hero_phrase: "Tú eres el talento, no el administrativo de tus proyectos.",
        falsas_creencias: [
            { c: "El caos es el precio de crecer.", r: "El caos es el techo que te impide crecer. Sin orden, te estancas." },
            { c: "Esto depende de mí, no se puede delegar.", r: "Si no se puede delegar, no tienes una empresa, tienes una jaula de oro." }
        ],
        dolores_reales: [
            { t: "Caos mental", d: "Demasiados frentes abiertos y la sensación de no llegar a nada." },
            { t: "Proyectos infinitos", d: "Clientes que piden cambios sin parar porque no hay procesos cerrados." },
            { t: "Cobros irregulares", d: "Dificultad para saber cuándo y cuánto vas a cobrar el mes que viene." }
        ],
        autoridad: {
            title: "Estructura de Escalabilidad",
            desc: "Fases de proyecto blindadas y vinculación directa entre ejecución y facturación rápida.",
            bullets: ["Hitos de proyecto firmados", "Delegación con control total", "Gestión de carga de trabajo"]
        },
        faqs: [
            { q: "¿Es normal que todo dependa de mí?", a: "Es frecuente, pero no sostenible. Aparece cuando no hay estructura de proyectos y procesos claros." },
            { q: "¿Por qué tengo trabajo pero estoy siempre saturado?", a: "Porque el trabajo no está ordenado ni vinculado claramente a tiempo, fases y facturación." },
            { q: "¿Esto se puede sistematizar sin perder calidad?", a: "Sí. Un sistema bien diseñado libera tiempo y mejora la calidad, no la reduce." },
            { q: "¿El problema es que cobro poco?", a: "A veces, pero muchas veces el problema es cómo se gestionan los proyectos y los cobros." },
            { q: "¿El diagnóstico es solo para empresas grandes?", a: "No. De hecho, cuanto más pequeño el equipo, más crítico es tener estructura." }
        ]
    }
};

export const getSectorLandingContent = (sectorId) => {
    return Object.values(sectorLandingsContent).find(group => group.sectors.includes(sectorId));
};
