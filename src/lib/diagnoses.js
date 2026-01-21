import { supabase } from './supabaseClient';
import { processFormSubmission } from './crm/contacts';
import { getConfigValue } from './siteConfig';

const DEFAULT_N8N_WEBHOOK = import.meta.env.VITE_N8N_DIAGNOSIS_WEBHOOK || '';

/**
 * Envía los datos del diagnóstico a n8n para su procesamiento
 */
export const sendToN8n = async (diagnosisData) => {
    // Intentamos obtener el webhook desde la base de datos (dinámico)
    // Si no está, usamos el valor por defecto del .env
    const webhookUrl = await getConfigValue('n8n_diagnosis_webhook', DEFAULT_N8N_WEBHOOK);

    console.log('🔗 Webhook URL:', webhookUrl); // DEBUG

    if (!webhookUrl) {
        console.warn('n8n Webhook URL no configurada');
        return { error: 'Webhook not configured' };
    }

    try {
        const payload = {
            ...diagnosisData,
            timestamp: new Date().toISOString(),
            source: 'Diagnóstico Web'
        };

        console.log('📤 Enviando a n8n:', payload); // DEBUG

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('📥 Respuesta de n8n:', response.status, response.statusText); // DEBUG

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error response:', errorText); // DEBUG
            throw new Error(`Error al enviar a n8n: ${response.status} - ${errorText}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error in sendToN8n:', error);
        return { error: error.message };
    }
};

/**
 * Guarda el diagnóstico en Supabase y notifica a n8n
 */
export const submitDiagnosis = async (formData) => {
    try {
        // 1. Procesar el contacto (crear o actualizar)
        const { data: contact, error: contactError } = await processFormSubmission({
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            message: `Diagnóstico completado: Rama ${formData.detected_branch}`,
            source: 'diagnostico_eficiencia',
            service_interest: 'consultoria_operativa'
        });

        if (contactError) throw contactError;

        // 2. Guardar el diagnóstico en la tabla diagnoses
        const { data: diagnosis, error: diagError } = await supabase
            .from('diagnoses')
            .insert({
                contact_id: contact?.id,
                full_name: formData.full_name,
                email: formData.email,
                detected_branch: formData.detected_branch,
                responses: formData.responses,
                source: 'Web',
                status: 'nuevo'
            })
            .select()
            .single();

        if (diagError) throw diagError;

        // 3. Notificar a n8n (asíncrono, no bloqueamos el UI)
        sendToN8n({
            diagnosis_id: diagnosis.id,
            contact_id: contact?.id,
            ...formData
        });

        return { data: diagnosis, error: null };
    } catch (error) {
        console.error('Error submitting diagnosis:', error);
        return { data: null, error };
    }
};

/**
 * Obtener diagnósticos para el panel de admin
 */
export const fetchDiagnoses = async () => {
    try {
        const { data, error } = await supabase
            .from('diagnoses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching diagnoses:', error);
        return { data: [], error };
    }
};
