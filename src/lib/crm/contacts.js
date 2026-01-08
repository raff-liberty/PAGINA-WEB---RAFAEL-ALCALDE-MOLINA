import { supabase } from '../supabaseClient';
import { createFormSubmissionInteraction, fetchInteractionsByContact } from './interactions';

/**
 * Obtener todos los contactos con filtros opcionales
 */
export const fetchContacts = async (filters = {}) => {
    try {
        let query = supabase
            .from('contacts')
            .select('*')
            .order('last_interaction_at', { ascending: false, nullsFirst: false });

        // Filtrar por estado operativo (nuevo modelo)
        if (filters.status && filters.status !== 'all') {
            query = query.eq('operational_status', filters.status);
        }

        // Filtrar por tipo de contacto
        if (filters.type && filters.type !== 'all') {
            query = query.eq('contact_type', filters.type);
        }

        if (filters.search) {
            query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
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
 * Obtener un contacto por ID con sus interacciones
 */
export const fetchContactById = async (contactId) => {
    try {
        // Obtener contacto
        const { data: contact, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', contactId)
            .single();

        if (error) throw error;

        // Obtener interacciones
        const { data: interactions } = await fetchInteractionsByContact(contactId);

        return {
            data: { ...contact, interactions: interactions || [] },
            error: null
        };
    } catch (error) {
        console.error('Error fetching contact:', error);
        return { data: null, error };
    }
};

/**
 * Buscar contacto por email
 */
export const findContactByEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('email', email.toLowerCase().trim())
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
        return { data, error: null };
    } catch (error) {
        console.error('Error finding contact by email:', error);
        return { data: null, error };
    }
};

/**
 * Crear nuevo contacto con datos de origen
 */
export const createContact = async (contactData) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .insert({
                email: contactData.email.toLowerCase().trim(),
                full_name: contactData.full_name,
                phone: contactData.phone || null,
                company: contactData.company || null,
                contact_type: contactData.contact_type || 'lead',
                operational_status: contactData.operational_status || 'nuevo',
                entry_channel: contactData.entry_channel || null,
                entry_url: contactData.entry_url || null,
                utm_source: contactData.utm_source || null,
                utm_medium: contactData.utm_medium || null,
                utm_campaign: contactData.utm_campaign || null,
                first_contact_at: new Date().toISOString(),
                last_interaction_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating contact:', error);
        return { data: null, error };
    }
};

/**
 * Crear o actualizar contacto desde formulario web
 * Si el email existe: añade interacción, actualiza estado si procede
 * Si no existe: crea contacto + interacción inicial
 */
export const processFormSubmission = async (formData) => {
    try {
        const email = formData.email.toLowerCase().trim();

        // Buscar contacto existente
        const { data: existingContact } = await findContactByEmail(email);

        let contact;
        let isNewContact = false;

        if (existingContact) {
            // Contacto existe: actualizar estado si estaba cerrado/descartado
            const updates = {};
            if (['cerrado', 'descartado'].includes(existingContact.operational_status)) {
                updates.operational_status = 'nuevo';
            }
            // Actualizar datos si vienen nuevos
            if (formData.full_name && formData.full_name !== existingContact.full_name) {
                updates.full_name = formData.full_name;
            }
            if (formData.phone && formData.phone !== existingContact.phone) {
                updates.phone = formData.phone;
            }

            if (Object.keys(updates).length > 0) {
                const { data: updated } = await updateContact(existingContact.id, updates);
                contact = updated || existingContact;
            } else {
                contact = existingContact;
            }
        } else {
            // Contacto nuevo: crear con datos de origen
            const { data: newContact, error } = await createContact({
                email: email,
                full_name: formData.full_name,
                phone: formData.phone,
                company: formData.company,
                contact_type: 'lead',
                operational_status: 'nuevo',
                entry_channel: formData.entry_channel || 'web_form',
                entry_url: formData.entry_url || null,
                utm_source: formData.utm_source || null,
                utm_medium: formData.utm_medium || null,
                utm_campaign: formData.utm_campaign || null
            });

            if (error) throw error;
            contact = newContact;
            isNewContact = true;
        }

        // Crear interacción con el mensaje del formulario
        await createFormSubmissionInteraction(contact.id, formData.message || 'Contacto desde formulario', {
            source: formData.source,
            service_interest: formData.service_interest,
            entry_url: formData.entry_url,
            utm_source: formData.utm_source,
            utm_medium: formData.utm_medium,
            utm_campaign: formData.utm_campaign
        });

        return { data: contact, isNewContact, error: null };
    } catch (error) {
        console.error('Error processing form submission:', error);
        return { data: null, isNewContact: false, error };
    }
};

/**
 * Actualizar contacto
 */
export const updateContact = async (contactId, updates) => {
    try {
        // No permitir editar campos de origen
        const { entry_channel, entry_url, utm_source, utm_medium, utm_campaign,
            first_contact_at, last_interaction_at, ...safeUpdates } = updates;

        const { data, error } = await supabase
            .from('contacts')
            .update(safeUpdates)
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
 * Obtener estadísticas de contactos por estado operativo
 */
export const getContactStats = async () => {
    try {
        const { data: contacts, error } = await supabase
            .from('contacts')
            .select('operational_status, contact_type');

        if (error) throw error;

        const stats = {
            total: contacts.length,
            // Por estado operativo
            nuevos: contacts.filter(c => c.operational_status === 'nuevo').length,
            en_seguimiento: contacts.filter(c => c.operational_status === 'en_seguimiento').length,
            respondidos: contacts.filter(c => c.operational_status === 'respondido').length,
            cerrados: contacts.filter(c => c.operational_status === 'cerrado').length,
            descartados: contacts.filter(c => c.operational_status === 'descartado').length,
            // Por tipo (para referencia)
            leads: contacts.filter(c => c.contact_type === 'lead').length,
            clientes: contacts.filter(c => c.contact_type === 'cliente').length
        };

        return { data: stats, error: null };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { data: { total: 0, nuevos: 0, en_seguimiento: 0, respondidos: 0, cerrados: 0, descartados: 0, leads: 0, clientes: 0 }, error };
    }
};

/**
 * Cambiar estado operativo de un contacto
 */
export const changeOperationalStatus = async (contactId, newStatus) => {
    return updateContact(contactId, { operational_status: newStatus });
};

/**
 * Cambiar tipo de contacto
 */
export const changeContactType = async (contactId, newType) => {
    return updateContact(contactId, { contact_type: newType });
};

// Legacy: mantener compatibilidad con código anterior
export const upsertContact = async (contactData) => {
    console.warn('upsertContact está deprecado. Usar processFormSubmission para formularios.');
    return processFormSubmission(contactData);
};

// Legacy: función que ya no se necesita
export const markMessagesAsRead = async () => {
    // Ya no se usa, las interacciones no tienen estado de lectura
    return { error: null };
};
