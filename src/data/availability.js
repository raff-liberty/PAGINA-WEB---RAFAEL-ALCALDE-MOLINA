/**
 * Configuración de disponibilidad para el calendario de citas.
 * Aquí puedes definir qué días de la semana atiendes y en qué franjas horarias.
 */

export const availabilityConfig = {
    // Días de la semana permitidos: 0 (Domingo) a 6 (Sábado)
    // Por ejemplo: [1, 2, 3, 4, 5] para Lunes a Viernes
    allowedDays: [1, 2, 3, 4, 5],

    // Horas disponibles por defecto para cualquier día permitido
    defaultTimeSlots: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "16:00",
        "17:00",
        "18:00"
    ],

    // Excepciones o franjas específicas por día (opcional)
    // Si un día no está aquí, usa los slots por defecto
    specificDayConfig: {
        // Ejemplo: Los viernes solo por la mañana
        5: ["09:00", "10:00", "11:00", "12:00"],
    },

    // Días específicos bloqueados (Vacaciones, festivos)
    // Formato: "YYYY-MM-DD"
    blockedDates: [
        "2024-12-25",
        "2025-01-01",
    ]
};
