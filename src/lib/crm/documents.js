import { supabase } from '../supabaseClient';

/**
 * ========================================
 * PROJECT DOCUMENTS
 * ========================================
 */

/**
 * Subir documento a un proyecto
 */
export const uploadProjectDocument = async (projectId, file, category = 'general', description = '') => {
    try {
        // 1. Subir archivo a Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `projects/${projectId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('project-documents')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Crear registro en la base de datos
        const { data, error } = await supabase
            .from('project_documents')
            .insert({
                project_id: projectId,
                file_name: file.name,
                file_path: filePath,
                file_size: file.size,
                file_type: file.type,
                category: category,
                description: description,
                uploaded_by: 'admin' // TODO: obtener usuario actual
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error uploading project document:', error);
        return { data: null, error };
    }
};

/**
 * Obtener documentos de un proyecto
 */
export const fetchProjectDocuments = async (projectId) => {
    try {
        const { data, error } = await supabase
            .from('project_documents')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching project documents:', error);
        return { data: [], error };
    }
};

/**
 * Descargar documento de proyecto
 */
export const downloadProjectDocument = async (filePath) => {
    try {
        const { data, error } = await supabase.storage
            .from('project-documents')
            .download(filePath);

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error downloading document:', error);
        return { data: null, error };
    }
};

/**
 * Eliminar documento de proyecto
 */
export const deleteProjectDocument = async (documentId, filePath) => {
    try {
        // 1. Eliminar archivo de Storage
        const { error: storageError } = await supabase.storage
            .from('project-documents')
            .remove([filePath]);

        if (storageError) throw storageError;

        // 2. Eliminar registro de la base de datos
        const { error } = await supabase
            .from('project_documents')
            .delete()
            .eq('id', documentId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting project document:', error);
        return { error };
    }
};

/**
 * ========================================
 * TASK DOCUMENTS
 * ========================================
 */

/**
 * Subir documento a una tarea
 */
export const uploadTaskDocument = async (taskId, file, description = '') => {
    try {
        // 1. Subir archivo a Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `tasks/${taskId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('project-documents')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Crear registro en la base de datos
        const { data, error } = await supabase
            .from('task_documents')
            .insert({
                task_id: taskId,
                file_name: file.name,
                file_path: filePath,
                file_size: file.size,
                file_type: file.type,
                description: description,
                uploaded_by: 'admin' // TODO: obtener usuario actual
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error uploading task document:', error);
        return { data: null, error };
    }
};

/**
 * Obtener documentos de una tarea
 */
export const fetchTaskDocuments = async (taskId) => {
    try {
        const { data, error } = await supabase
            .from('task_documents')
            .select('*')
            .eq('task_id', taskId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching task documents:', error);
        return { data: [], error };
    }
};

/**
 * Eliminar documento de tarea
 */
export const deleteTaskDocument = async (documentId, filePath) => {
    try {
        // 1. Eliminar archivo de Storage
        const { error: storageError } = await supabase.storage
            .from('project-documents')
            .remove([filePath]);

        if (storageError) throw storageError;

        // 2. Eliminar registro de la base de datos
        const { error } = await supabase
            .from('task_documents')
            .delete()
            .eq('id', documentId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting task document:', error);
        return { error };
    }
};

/**
 * ========================================
 * TASK NOTES
 * ========================================
 */

/**
 * Crear nota en una tarea
 */
export const createTaskNote = async (taskId, content, author = 'admin') => {
    try {
        const { data, error } = await supabase
            .from('task_notes')
            .insert({
                task_id: taskId,
                content: content,
                author: author
            })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating task note:', error);
        return { data: null, error };
    }
};

/**
 * Obtener notas de una tarea
 */
export const fetchTaskNotes = async (taskId) => {
    try {
        const { data, error } = await supabase
            .from('task_notes')
            .select('*')
            .eq('task_id', taskId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching task notes:', error);
        return { data: [], error };
    }
};

/**
 * Actualizar nota de tarea
 */
export const updateTaskNote = async (noteId, content) => {
    try {
        const { data, error } = await supabase
            .from('task_notes')
            .update({ content })
            .eq('id', noteId)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating task note:', error);
        return { data: null, error };
    }
};

/**
 * Eliminar nota de tarea
 */
export const deleteTaskNote = async (noteId) => {
    try {
        const { error } = await supabase
            .from('task_notes')
            .delete()
            .eq('id', noteId);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting task note:', error);
        return { error };
    }
};

/**
 * Obtener URL pública temporal para descargar documento
 */
export const getDocumentDownloadUrl = async (filePath) => {
    try {
        const { data, error } = await supabase.storage
            .from('project-documents')
            .createSignedUrl(filePath, 3600); // URL válida por 1 hora

        if (error) throw error;
        return { url: data.signedUrl, error: null };
    } catch (error) {
        console.error('Error getting download URL:', error);
        return { url: null, error };
    }
};
