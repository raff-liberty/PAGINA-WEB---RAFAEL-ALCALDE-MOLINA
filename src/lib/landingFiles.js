import { supabase } from './supabaseClient';

/**
 * Get landing file by key
 * @param {string} landingKey - Unique key for the landing (e.g., 'caos-operativo')
 * @returns {Promise<Object>} Landing file data
 */
export const getLandingFile = async (landingKey) => {
    const { data, error } = await supabase
        .from('landing_files')
        .select('*')
        .eq('landing_key', landingKey)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching landing file:', error);
        return { data: null, error };
    }

    return { data, error: null };
};

/**
 * Get all landing files (admin only)
 * @returns {Promise<Array>} All landing files
 */
export const getAllLandingFiles = async () => {
    const { data, error } = await supabase
        .from('landing_files')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all landing files:', error);
        return { data: null, error };
    }

    return { data, error: null };
};

/**
 * Create or update landing file
 * @param {Object} fileData - Landing file data
 * @returns {Promise<Object>} Created/updated landing file
 */
export const upsertLandingFile = async (fileData) => {
    const { data, error } = await supabase
        .from('landing_files')
        .upsert({
            ...fileData,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'landing_key'
        })
        .select()
        .single();

    if (error) {
        console.error('Error upserting landing file:', error);
        return { data: null, error };
    }

    return { data, error: null };
};

/**
 * Delete landing file
 * @param {string} id - Landing file ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteLandingFile = async (id) => {
    const { error } = await supabase
        .from('landing_files')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting landing file:', error);
        return { error };
    }

    return { error: null };
};

/**
 * Increment download count
 * @param {string} landingKey - Landing key
 * @returns {Promise<Object>} Update result
 */
export const incrementDownloadCount = async (landingKey) => {
    const { data, error } = await supabase.rpc('increment_download_count', {
        p_landing_key: landingKey
    });

    if (error) {
        // If RPC doesn't exist, fallback to manual increment
        const { data: currentFile } = await getLandingFile(landingKey);
        if (currentFile) {
            const { error: updateError } = await supabase
                .from('landing_files')
                .update({ download_count: (currentFile.download_count || 0) + 1 })
                .eq('landing_key', landingKey);

            if (updateError) {
                console.error('Error incrementing download count:', updateError);
                return { error: updateError };
            }
        }
    }

    return { data, error: null };
};

/**
 * Toggle active status
 * @param {string} id - Landing file ID
 * @param {boolean} isActive - New active status
 * @returns {Promise<Object>} Update result
 */
export const toggleLandingFileStatus = async (id, isActive) => {
    const { data, error } = await supabase
        .from('landing_files')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling landing file status:', error);
        return { data: null, error };
    }

    return { data, error: null };
};
