import { supabase } from '../supabaseClient';

/**
 * Crear nueva interacción (inmutable - no se puede editar ni eliminar)
 * @param {Object} interaction - Datos de la interacción
 * @param {string} interaction.contact_id - UUID del contacto
 * @param {string} interaction.type - Tipo: form_submission, email, whatsapp, call, note, system
 * @param {string} interaction.channel - Canal: web_form, whatsapp, email, phone, manual
 * @param {string} interaction.content - Contenido de la interacción
 * @param {string} interaction.author - Autor: 'system' o nombre de usuario
 * @param {Object} interaction.metadata - Datos adicionales (UTMs, etc.)
 */
export const createInteraction = async (interaction) => {
    try {
        const { data, error } = await supabase
            .from('interactions')
            .insert({
                contact_id: interaction.contact_id,
                type: interaction.type,
                channel: interaction.channel || null,
                content: interaction.content,
                author: interaction.author || 'system',
                metadata: interaction.metadata || null
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating interaction:', error);
        return { data: null, error };
    }
};

/**
 * Obtener todas las interacciones de un contacto (ordenadas por fecha)
 */
export const fetchInteractionsByContact = async (contactId) => {
    try {
        const { data, error } = await supabase
            .from('interactions')
            .select('*')
            .eq('contact_id', contactId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching interactions:', error);
        return { data: [], error };
    }
};

/**
 * Crear interacción desde formulario web (tipo especial)
 */
export const createFormSubmissionInteraction = async (contactId, message, metadata = {}) => {
    return createInteraction({
        contact_id: contactId,
        type: 'form_submission',
        channel: 'web_form',
        content: message,
        author: 'system',
        metadata: metadata
    });
};

/**
 * Añadir nota interna a un contacto
 */
export const addNoteToContact = async (contactId, note, author = 'admin') => {
    return createInteraction({
        contact_id: contactId,
        type: 'note',
        channel: 'manual',
        content: note,
        author: author
    });
};

/**
 * Registrar llamada
 */
export const logCall = async (contactId, notes, author = 'admin') => {
    return createInteraction({
        contact_id: contactId,
        type: 'call',
        channel: 'phone',
        content: notes,
        author: author
    });
};

/**
 * Registrar email
 */
export const logEmail = async (contactId, subject, body, author = 'admin') => {
    return createInteraction({
        contact_id: contactId,
        type: 'email',
        channel: 'email',
        content: `${subject}\n\n${body}`,
        author: author
    });
};

/**
 * Registrar WhatsApp
 */
export const logWhatsApp = async (contactId, message, author = 'admin') => {
    return createInteraction({
        contact_id: contactId,
        type: 'whatsapp',
        channel: 'whatsapp',
        content: message,
        author: author
    });
};
