export const diagnosisQuestions = {
    common: [
        {
            id: 'owner_dependence',
            question: 'Si hoy no estás, el negocio...',
            options: [
                { label: 'Funciona casi igual', value: 'bajo', signal: 'low' },
                { label: 'Funciona, pero con problemas', value: 'medio', signal: 'medium' },
                { label: 'Se ralentiza mucho', value: 'alto', signal: 'high' },
                { label: 'Prácticamente se para', value: 'critico', signal: 'critical' }
            ]
        },
        {
            id: 'interruptions',
            question: '¿Dónde se te interrumpe más durante el día?',
            options: [
                { label: 'WhatsApp / llamadas', value: 'whatsapp', signal: 'high' },
                { label: 'En el propio local', value: 'local', signal: 'medium' },
                { label: 'Por el equipo', value: 'equipo', signal: 'medium' },
                { label: 'Por todo a la vez', value: 'caos_total', signal: 'critical' }
            ]
        },
        {
            id: 'management_tools',
            question: '¿Dónde gestionas citas, pedidos, cobros o seguimientos?',
            options: [
                { label: 'Todo en la cabeza', value: 'cabeza', signal: 'critical' },
                { label: 'Papel / notas', value: 'papel', signal: 'high' },
                { label: 'Varias herramientas sueltas', value: 'sueltas', signal: 'medium' },
                { label: 'Un sistema claro', value: 'sistema', signal: 'low' }
            ]
        },
        {
            id: 'weekly_vision',
            question: '¿Tienes una visión clara de cómo va el negocio esta semana?',
            options: [
                { label: 'Sí', value: 'si', signal: 'low' },
                { label: 'Más o menos', value: 'regular', signal: 'medium' },
                { label: 'No', value: 'no', signal: 'high' }
            ]
        },
        {
            id: 'branch_selector',
            question: '¿Cómo entran la mayoría de tus clientes?',
            options: [
                { label: 'Con cita o reserva', value: 'AGENDA' },
                { label: 'Vienen directamente', value: 'DIRECTO' },
                { label: 'Piden presupuesto', value: 'PRESUPUESTOS' },
                { label: 'De muchas formas / Mixto', value: 'MIXTO' }
            ]
        }
    ],
    branches: {
        AGENDA: [
            {
                id: 'agenda_manager',
                question: '¿Quién gestiona las citas?',
                options: [
                    { label: 'Yo mismo manual', value: 'yo', signal: 'high' },
                    { label: 'Alguien del equipo', value: 'equipo', signal: 'medium' },
                    { label: 'Un software básico', value: 'software', signal: 'low' }
                ]
            },
            {
                id: 'agenda_no_shows',
                question: '¿Qué pasa con cancelaciones o no-shows?',
                options: [
                    { label: 'Pierdo el tiempo y el dinero', value: 'perdida', signal: 'high' },
                    { label: 'Intento rellenar el hueco', value: 'intento', signal: 'medium' },
                    { label: 'Están automatizados/penalizados', value: 'gestionado', signal: 'low' }
                ]
            },
            {
                id: 'agenda_confirmations',
                question: '¿Cómo se confirman las citas?',
                options: [
                    { label: 'Por WhatsApp uno a uno', value: 'manual', signal: 'high' },
                    { label: 'No se confirman', value: 'no', signal: 'critical' },
                    { label: 'Mensaje automático', value: 'auto', signal: 'low' }
                ]
            }
        ],
        DIRECTO: [
            {
                id: 'direct_interruptions',
                question: '¿Cuándo se producen más interrupciones?',
                options: [
                    { label: 'En horas punta de clientes', value: 'punta', signal: 'high' },
                    { label: 'Por proveedores o equipo', value: 'interno', signal: 'medium' },
                    { label: 'Siempre es un goteo constante', value: 'siempre', signal: 'high' }
                ]
            },
            {
                id: 'direct_stock',
                question: '¿Está claro el stock o disponibilidad?',
                options: [
                    { label: 'Tengo que mirarlo yo siempre', value: 'manual', signal: 'high' },
                    { label: 'A veces hay errores', value: 'errores', signal: 'medium' },
                    { label: 'Está sincronizado', value: 'sync', signal: 'low' }
                ]
            },
            {
                id: 'direct_registration',
                question: '¿Cómo se registran ventas y cobros?',
                options: [
                    { label: 'Tengo un TPV pero no me dice mucho', value: 'basico', signal: 'medium' },
                    { label: 'A mano o excel al final del día', value: 'mano', signal: 'high' },
                    { label: 'Sistema integrado en tiempo real', value: 'pro', signal: 'low' }
                ]
            }
        ],
        PRESUPUESTOS: [
            {
                id: 'quotes_followup',
                question: '¿Cuántos presupuestos quedan sin seguimiento?',
                options: [
                    { label: 'La mayoría, no doy abasto', value: 'caos', signal: 'high' },
                    { label: 'Algunos importantes los sigo', value: 'algunos', signal: 'medium' },
                    { label: 'Tengo un control total', value: 'control', signal: 'low' }
                ]
            },
            {
                id: 'quotes_manager',
                question: '¿Quién hace el seguimiento?',
                options: [
                    { label: 'Yo cuando me acuerdo', value: 'yo', signal: 'high' },
                    { label: 'Nadie formalmente', value: 'nadie', signal: 'critical' },
                    { label: 'Hay una persona/proceso dedicado', value: 'proceso', signal: 'low' }
                ]
            },
            {
                id: 'quotes_storage',
                question: '¿Dónde queda la información del cliente?',
                options: [
                    { label: 'Emails y carpetas sueltas', value: 'suelto', signal: 'high' },
                    { label: 'Un Excel centralizado', value: 'excel', signal: 'medium' },
                    { label: 'Un CRM conectado', value: 'crm', signal: 'low' }
                ]
            }
        ],
        MIXTO: [
            {
                id: 'mixto_routine',
                question: '¿Cada día es distinto?',
                options: [
                    { label: 'Totalmente, apago fuegos', value: 'fuegas', signal: 'critical' },
                    { label: 'Tengo rutinas pero fallan', value: 'rutinas', signal: 'medium' },
                    { label: 'Está todo procedimentado', value: 'procedimientos', signal: 'low' }
                ]
            },
            {
                id: 'mixto_growth',
                question: '¿El negocio creció sin cambiar procesos?',
                options: [
                    { label: 'Sí, heredamos lo de cuando éramos 2', value: 'herencia', signal: 'high' },
                    { label: 'Fuimos improvisando', value: 'impro', signal: 'high' },
                    { label: 'Hemos ido adaptando el sistema', value: 'adapt', signal: 'low' }
                ]
            },
            {
                id: 'mixto_feeling',
                question: '¿Con qué frase te identificas más?',
                options: [
                    { label: "El negocio me come", value: 'come', signal: 'critical' },
                    { label: "Todo depende de mi energía", value: 'energia', signal: 'high' },
                    { label: "Quiero escalar pero no sé cómo", value: 'escalar', signal: 'medium' }
                ]
            }
        ]
    },
    final: [
        {
            id: 'recovery_time',
            question: 'Si recuperaras 4 horas a la semana, ¿en qué las invertirías?',
            type: 'open'
        },
        {
            id: 'current_distress',
            question: '¿Qué es lo que más te angustia ahora mismo del día a día?',
            type: 'open'
        },
        {
            id: 'urgency_solve',
            question: '¿Cuánto te preocupa resolver esto en los próximos 3 meses?',
            options: [
                { label: 'Es mi prioridad absoluta', value: 'maxima', signal: 'critical' },
                { label: 'Me preocupa bastante', value: 'alta', signal: 'high' },
                { label: 'Me gustaría pero puedo aguantar', value: 'media', signal: 'medium' }
            ]
        }
    ]
};
