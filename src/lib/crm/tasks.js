import { supabase } from '../supabaseClient';

/**
 * Obtener todas las tareas de un proyecto
 */
export const fetchTasksByProject = async (projectId) => {
    try {
        const { data, error } = await supabase
            .from('project_tasks')
            .select('*')
            .eq('project_id', projectId)
            .order('position', { ascending: true });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return { data: [], error };
    }
};

/**
 * Crear nueva tarea
 */
export const createTask = async (projectId, taskData) => {
    try {
        const { data, error } = await supabase
            .from('project_tasks')
            .insert({
                project_id: projectId,
                title: taskData.title,
                description: taskData.description || null,
                assigned_to: taskData.assigned_to || null,
                status: 'pending',
                priority: taskData.priority || 'media',
                due_date: taskData.due_date || null,
                is_milestone: taskData.is_milestone || false,
                position: taskData.position || 0
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating task:', error);
        return { data: null, error };
    }
};

/**
 * Actualizar tarea
 */
export const updateTask = async (taskId, updates) => {
    try {
        const { data, error } = await supabase
            .from('project_tasks')
            .update(updates)
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating task:', error);
        return { data: null, error };
    }
};

/**
 * Cambiar estado de tarea
 */
export const changeTaskStatus = async (taskId, newStatus) => {
    return updateTask(taskId, { status: newStatus });
};

/**
 * Marcar tarea como completada
 */
export const completeTask = async (taskId) => {
    return changeTaskStatus(taskId, 'completed');
};

/**
 * Eliminar tarea
 */
export const deleteTask = async (taskId) => {
    try {
        const { error } = await supabase
            .from('project_tasks')
            .delete()
            .eq('id', taskId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting task:', error);
        return { error };
    }
};

/**
 * Reordenar tareas
 */
export const reorderTasks = async (tasks) => {
    try {
        const updates = tasks.map((task, index) =>
            supabase
                .from('project_tasks')
                .update({ position: index })
                .eq('id', task.id)
        );

        await Promise.all(updates);
        return { error: null };
    } catch (error) {
        console.error('Error reordering tasks:', error);
        return { error };
    }
};

/**
 * Obtener estadísticas de tareas del proyecto
 */
export const getTaskStats = async (projectId) => {
    try {
        const { data, error } = await supabase
            .from('project_tasks')
            .select('status, is_milestone')
            .eq('project_id', projectId);

        if (error) throw error;

        const stats = {
            total: data.length,
            pending: data.filter(t => t.status === 'pending').length,
            in_progress: data.filter(t => t.status === 'in_progress').length,
            completed: data.filter(t => t.status === 'completed').length,
            blocked: data.filter(t => t.status === 'blocked').length,
            milestones: data.filter(t => t.is_milestone).length,
            completion_rate: data.length > 0
                ? (data.filter(t => t.status === 'completed').length / data.length * 100).toFixed(1)
                : 0
        };

        return { data: stats, error: null };
    } catch (error) {
        console.error('Error fetching task stats:', error);
        return { data: null, error };
    }
};
