// =====================================================
// CRM - Funciones Helper para Proyectos
// =====================================================

import { supabase } from '../supabaseClient';

/**
 * Obtener todos los proyectos con filtros
 */
export const fetchProjects = async (filters = {}) => {
    try {
        let query = supabase
            .from('projects')
            .select('*, contacts(full_name, company)')
            .order('created_at', { ascending: false });

        // Aplicar filtros
        if (filters.status && filters.status !== 'all') {
            query = query.eq('status', filters.status);
        }
        if (filters.contact_id) {
            query = query.eq('contact_id', filters.contact_id);
        }
        if (filters.search) {
            query = query.ilike('title', `%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { data: null, error };
    }
};

/**
 * Obtener un proyecto por ID con sus items (partidas)
 */
export const fetchProjectById = async (projectId) => {
    try {
        // Obtener proyecto con datos del contacto
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .select('*, contacts(full_name, email, company, phone)')
            .eq('id', projectId)
            .single();

        if (projectError) throw projectError;

        // Obtener partidas del proyecto (si existen tabla project_items)
        // Por ahora asumimos que existen o verificaremos error
        const { data: items, error: itemsError } = await supabase
            .from('project_items')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: true });

        // Si no existe la tabla items, no fallamos crítico, devolvemos array vacío
        const projectItems = itemsError ? [] : items;

        return {
            data: { ...project, items: projectItems },
            error: null
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return { data: null, error };
    }
};

/**
 * Crear o actualizar proyecto
 */
export const upsertProject = async (projectData) => {
    try {
        // Si tiene id, es una actualización
        if (projectData.id) {
            const { data, error } = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', projectData.id)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } else {
            // Si no tiene id, es una creación
            const { data, error } = await supabase
                .from('projects')
                .insert(projectData)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        }
    } catch (error) {
        console.error('Error upserting project:', error);
        return { data: null, error };
    }
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
        const { data: projects, error } = await supabase
            .from('projects')
            .select('status, budget');

        if (error) throw error;

        const stats = {
            total: projects.length,
            active: projects.filter(p => p.status === 'active' || p.status === 'in_progress').length,
            completed: projects.filter(p => p.status === 'completed').length,
            total_budget: projects.reduce((acc, curr) => acc + (curr.budget || 0), 0)
        };

        return { data: stats, error: null };
    } catch (error) {
        console.error('Error getting project stats:', error);
        return { data: null, error };
    }
};
