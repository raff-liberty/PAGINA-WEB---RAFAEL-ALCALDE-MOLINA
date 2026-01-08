import { supabase } from './supabaseClient';

/**
 * Obtiene un valor de configuración por su clave
 */
export const getConfigValue = async (key, defaultValue = '') => {
    try {
        const { data, error } = await supabase
            .from('site_config')
            .select('value')
            .eq('key', key)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return defaultValue; // Not found
            throw error;
        }

        return data.value || defaultValue;
    } catch (error) {
        console.error(`Error fetching config ${key}:`, error);
        return defaultValue;
    }
};

/**
 * Obtiene toda la configuración del sitio
 */
export const fetchFullConfig = async () => {
    try {
        const { data, error } = await supabase
            .from('site_config')
            .select('key, value');

        if (error) throw error;

        const config = {};
        data?.forEach(item => {
            config[item.key] = item.value || '';
        });
        return config;
    } catch (error) {
        console.error('Error fetching full site config:', error);
        return {};
    }
};
