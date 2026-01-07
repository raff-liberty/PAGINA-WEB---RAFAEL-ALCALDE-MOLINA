// =====================================================
// CRM - Funciones Helper para Contactos
// =====================================================

import { supabase } from '../supabaseClient';

/**
 * Obtener todos los contactos con filtros
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
        if (filters.sector && filters.sector !== 'all') {
            query = query.eq('sector', filters.sector);
        }
        if (filters.city && filters.city !== 'all') {
            query = query.eq('city', filters.city);
        }
        if (filters.search) {
            query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return { data: null, error };
    }
};

/**
 * Obtener un contacto por ID con sus mensajes y proyectos
 */
export const fetchContactById = async (contactId) => {
    try {
        // Obtener contacto
        const { data: contact, error: contactError } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', contactId)
            .single();

        if (contactError) throw contactError;

        // Obtener mensajes del contacto
        const { data: messages, error: messagesError } = await supabase
            .from('contact_messages')
            .select('*')
            .eq('contact_id', contactId)
            .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;

        // Obtener proyectos del contacto
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('*')
            .eq('contact_id', contactId)
            .order('created_at', { ascending: false });

        if (projectsError) throw projectsError;

        return {
            data: { ...contact, messages, projects },
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
            .select()
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
            .select()
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
 * Unificar contacto por email (para formularios)
 * Si existe un contacto con ese email, lo actualiza y añade el mensaje
 * Si no existe, crea el contacto y añade el mensaje
 */
export const handleFormSubmission = async (formData) => {
    try {
        const { email, name, message, source, phone, company } = formData;

        // Buscar contacto existente por email
        const { data: existingContact } = await supabase
            .from('contacts')
            .select('*')
            .eq('email', email)
            .single();

        let contactId;

        if (existingContact) {
            // Actualizar contacto existente
            const { data: updatedContact, error: updateError } = await supabase
                .from('contacts')
                .update({
                    last_contact_date: new Date().toISOString(),
                    // Actualizar nombre si viene y no existe
                    full_name: existingContact.full_name || name,
                    phone: existingContact.phone || phone,
                    company: existingContact.company || company,
                })
                .eq('id', existingContact.id)
                .select()
                .single();

            if (updateError) throw updateError;
            contactId = updatedContact.id;
        } else {
            // Crear nuevo contacto
            const { data: newContact, error: createError } = await supabase
                .from('contacts')
                .insert({
                    email,
                    full_name: name,
                    phone,
                    company,
                    source,
                    status: 'lead',
                    last_contact_date: new Date().toISOString(),
                })
                .select()
                .single();

            if (createError) throw createError;
            contactId = newContact.id;
        }

        // Añadir mensaje
        const { error: messageError } = await supabase
            .from('contact_messages')
            .insert({
                contact_id: contactId,
                message,
                source,
            });

        if (messageError) throw messageError;

        return { success: true, contactId, error: null };
    } catch (error) {
        console.error('Error handling form submission:', error);
        return { success: false, contactId: null, error };
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
            inactivos: contacts.filter(c => c.status === 'inactivo').length,
        };

        return { data: stats, error: null };
    } catch (error) {
        console.error('Error getting contact stats:', error);
        return { data: null, error };
    }
};
