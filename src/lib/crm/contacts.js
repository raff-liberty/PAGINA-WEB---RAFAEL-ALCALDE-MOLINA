import { supabase } from '../supabaseClient';

/**
 * Obtener todos los contactos con filtros opcionales
 */
export const fetchContacts = async (filters = {}) => {
    try {
        let query = supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        // Aplicar filtros
        if (filters.status && filters.status !== 'all') {
            query = query.eq('status', filters.status);
        }

        if (filters.search) {
            query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
        }

        if (filters.sector && filters.sector !== 'all') {
            query = query.eq('sector', filters.sector);
        }

        if (filters.city && filters.city !== 'all') {
            query = query.eq('city', filters.city);
        }

        const { data, error } = await query;

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return { data: [], error };
    }
};

/**
 * Obtener un contacto por ID
 */
export const fetchContactById = async (contactId) => {
    try {
        const { data: contact, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', contactId)
            .single();

        if (error) throw error;

        // Convertir message a array para compatibilidad
        const messages = contact.message ? [{
            message: contact.message,
            created_at: contact.created_at,
            source: contact.source
        }] : [];

        return {
            data: { ...contact, messages, projects: [] },
            error: null
        };
    } catch (error) {
        console.error('Error fetching contact:', error);
        return { data: null, error };
    }
};

/**
 * Crear o actualizar contacto
 */
export const upsertContact = async (contactData) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .upsert(contactData, { onConflict: 'email' })
            .select('*')
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error upserting contact:', error);
        return { data: null, error };
    }
};

/**
 * Actualizar contacto
 */
export const updateContact = async (contactId, updates) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .update(updates)
            .eq('id', contactId)
            .select('*')
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating contact:', error);
        return { data: null, error };
    }
};

/**
 * Eliminar contacto
 */
export const deleteContact = async (contactId) => {
    try {
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', contactId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting contact:', error);
        return { error };
    }
};

/**
 * Obtener estadísticas de contactos
 */
export const getContactStats = async () => {
    try {
        const { data: contacts, error } = await supabase
            .from('contacts')
            .select('status');

        if (error) throw error;

        const stats = {
            total: contacts.length,
            leads: contacts.filter(c => c.status === 'lead').length,
            clientes: contacts.filter(c => c.status === 'cliente').length,
            inactivos: contacts.filter(c => c.status === 'inactivo').length
        };

        return { data: stats, error: null };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { data: { total: 0, leads: 0, clientes: 0, inactivos: 0 }, error };
    }
};
