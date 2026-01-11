import { supabase } from './supabaseClient';

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder path (default: 'og-images')
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export const uploadImage = async (file, folder = 'og-images') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    return publicUrl;
};

/**
 * List all images in a folder
 * @param {string} folder - Folder path (default: '')
 * @returns {Promise<Array>} - Array of file objects
 */
export const listImages = async (folder = '') => {
    const { data, error } = await supabase.storage
        .from('images')
        .list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' }
        });

    if (error) {
        throw error;
    }

    // Add public URLs to each file
    const filesWithUrls = data.map(file => {
        const filePath = folder ? `${folder}/${file.name}` : file.name;
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return {
            ...file,
            publicUrl,
            path: filePath
        };
    });

    return filesWithUrls;
};

/**
 * Delete an image from storage
 * @param {string} filePath - Full path to the file
 * @returns {Promise<void>}
 */
export const deleteImage = async (filePath) => {
    const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

    if (error) {
        throw error;
    }
};

/**
 * Get public URL for an image
 * @param {string} filePath - Full path to the file
 * @returns {string} - Public URL
 */
export const getImageUrl = (filePath) => {
    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

/**
 * Upload a PDF file to Supabase Storage
 * @param {File} file - The PDF file to upload
 * @param {string} folder - Optional folder path (default: 'downloads')
 * @returns {Promise<string>} - Public URL of uploaded PDF
 */
export const uploadPDF = async (file, folder = 'downloads') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
        .from('pdfs')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(filePath);

    return publicUrl;
};

/**
 * Delete a PDF from storage
 * @param {string} filePath - Full path to the file
 * @returns {Promise<void>}
 */
export const deletePDF = async (filePath) => {
    const { error } = await supabase.storage
        .from('pdfs')
        .remove([filePath]);

    if (error) {
        throw error;
    }
};

/**
 * Get public URL for a PDF
 * @param {string} filePath - Full path to the file
 * @returns {string} - Public URL
 */
export const getPDFUrl = (filePath) => {
    const { data } = supabase.storage
        .from('pdfs')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

/**
 * List all PDFs in a folder
 * @param {string} folder - Folder path (default: '')
 * @returns {Promise<Array>} - Array of file objects
 */
export const listPDFs = async (folder = '') => {
    const { data, error } = await supabase.storage
        .from('pdfs')
        .list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' }
        });

    if (error) {
        throw error;
    }

    // Add public URLs to each file
    const filesWithUrls = data.map(file => {
        const filePath = folder ? `${folder}/${file.name}` : file.name;
        const { data: { publicUrl } } = supabase.storage
            .from('pdfs')
            .getPublicUrl(filePath);

        return {
            ...file,
            publicUrl,
            path: filePath
        };
    });

    return filesWithUrls;
};
