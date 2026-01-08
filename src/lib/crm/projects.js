import { supabase } from '../supabaseClient';

/**
 * Obtener proyectos de un contacto
 */
export const fetchProjectsByContact = async (contactId) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*, quotes(id, version, status, total)')
            .eq('contact_id', contactId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { data: [], error };
    }
};

/**
 * Obtener proyecto por ID con presupuestos
 */
export const fetchProjectById = async (projectId) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                contact:contacts(id, full_name, email, contact_type),
                quotes(*)
            `)
            .eq('id', projectId)
            .single();

        if (error) throw error;

        // Ordenar quotes por versión descendente
        if (data?.quotes) {
            data.quotes.sort((a, b) => b.version - a.version);
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching project:', error);
        return { data: null, error };
    }
};

/**
 * Crear nuevo proyecto
 */
export const createProject = async (contactId, projectData) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert({
                contact_id: contactId,
                name: projectData.name || 'Nuevo Proyecto',
                description: projectData.description || null,
                responsible: projectData.responsible || null,
                status: 'propuesta'
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating project:', error);
        return { data: null, error };
    }
};

/**
 * Actualizar proyecto
 */
export const updateProject = async (projectId, updates) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', projectId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating project:', error);
        return { data: null, error };
    }
};

/**
 * Cambiar estado del proyecto
 */
export const changeProjectStatus = async (projectId, newStatus) => {
    return updateProject(projectId, { status: newStatus });
};

/**
 * Eliminar proyecto
 */
export const deleteProject = async (projectId) => {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', projectId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting project:', error);
        return { error };
    }
};

/**
 * Obtener estadísticas de proyectos
 */
export const getProjectStats = async () => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('status');

        if (error) throw error;

        const stats = {
            total: data.length,
            propuesta: data.filter(p => p.status === 'propuesta').length,
            presupuestado: data.filter(p => p.status === 'presupuestado').length,
            aceptado: data.filter(p => p.status === 'aceptado').length,
            en_ejecucion: data.filter(p => p.status === 'en_ejecucion').length,
            cerrado: data.filter(p => p.status === 'cerrado').length,
            cancelado: data.filter(p => p.status === 'cancelado').length
        };

        return { data: stats, error: null };
    } catch (error) {
        console.error('Error fetching project stats:', error);
        return { data: null, error };
    }
};
