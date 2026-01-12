import { supabase } from './supabaseClient';

const STORAGE_KEY_VISITOR = 'engorilate_visitor_id';
const STORAGE_KEY_SESSION = 'engorilate_session_id';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutos

class Analytics {
    constructor() {
        this.visitorId = this.getOrCreateVisitorId();
        this.sessionId = null;
        this.sessionData = null;
    }

    getOrCreateVisitorId() {
        let id = localStorage.getItem(STORAGE_KEY_VISITOR);
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(STORAGE_KEY_VISITOR, id);
        }
        return id;
    }

    async initSession() {
        const now = Date.now();
        const storedSession = JSON.parse(sessionStorage.getItem(STORAGE_KEY_SESSION));

        if (storedSession && (now - storedSession.lastActivity < SESSION_TIMEOUT)) {
            this.sessionId = storedSession.id;
            this.updateSessionActivity();
            return this.sessionId;
        }

        // Crear nueva sesión
        const sessionMeta = await this.getDeviceInfo();
        const { data, error } = await supabase
            .from('analytics_sessions')
            .insert([{
                visitor_id: this.visitorId,
                ...sessionMeta,
                referrer: document.referrer || 'Directo'
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating analytics session:', error);
            return null;
        }

        this.sessionId = data.id;
        this.sessionData = data;
        this.updateSessionActivity();
        return this.sessionId;
    }

    updateSessionActivity() {
        sessionStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({
            id: this.sessionId,
            lastActivity: Date.now()
        }));
    }

    async getDeviceInfo() {
        const ua = navigator.userAgent;
        let device = 'Desktop';
        if (/tablet|ipad|playbook|silk/i.test(ua)) device = 'Tablet';
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) device = 'Mobile';

        let os = 'Unknown';
        if (ua.indexOf('Win') !== -1) os = 'Windows';
        if (ua.indexOf('Mac') !== -1) os = 'MacOS';
        if (ua.indexOf('X11') !== -1) os = 'UNIX';
        if (ua.indexOf('Linux') !== -1) os = 'Linux';
        if (/Android/.test(ua)) os = 'Android';
        if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

        let browser = 'Unknown';
        if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
        if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
        if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
        if (ua.indexOf('Edge') !== -1) browser = 'Edge';

        // OPTIMIZACIÓN CRÍTICA: No bloquear el render inicial con geolocalización
        // Los datos de geo se cargarán de forma diferida y se actualizarán después
        const geo = {
            country: 'Unknown',
            city: 'Unknown',
            region: 'Unknown',
            region_code: 'Unknown'
        };

        return {
            device,
            os,
            browser,
            user_agent: ua,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
            ...geo
        };
    }

    /**
     * Carga geolocalización de forma diferida y actualiza la sesión
     * Se llama DESPUÉS del render inicial para no bloquear la página
     */
    async loadGeoDataLazy() {
        if (!this.sessionId) return;

        try {
            // Importar lazy services solo cuando se necesita
            const { lazyServices } = await import('./lazy-services.js');
            const geo = await lazyServices.loadIPGeolocation();

            // Actualizar sesión con datos de geolocalización
            const { error } = await supabase
                .from('analytics_sessions')
                .update({
                    country: geo.country,
                    city: geo.city,
                    region: geo.region,
                    region_code: geo.region_code
                })
                .eq('id', this.sessionId);

            if (error) {
                console.warn('Failed to update session with geo data:', error);
            }
        } catch (e) {
            console.warn('Lazy geo loading failed:', e);
        }
    }

    async trackPageView(path, title = document.title) {
        if (!this.sessionId) await this.initSession();
        if (!this.sessionId) return;

        const { error } = await supabase
            .from('analytics_page_views')
            .insert([{
                session_id: this.sessionId,
                path,
                title,
                referrer: document.referrer
            }]);

        if (error) console.error('Error tracking page view:', error);
        this.updateSessionActivity();

        // Cargar geolocalización de forma diferida (no bloquea el render)
        // Solo se ejecuta en la primera página vista
        if (!this._geoLoadStarted) {
            this._geoLoadStarted = true;
            this.loadGeoDataLazy();
        }
    }

    async trackEvent(eventName, eventData = {}) {
        if (!this.sessionId) await this.initSession();
        if (!this.sessionId) return;

        const { error } = await supabase
            .from('analytics_events')
            .insert([{
                session_id: this.sessionId,
                event_name: eventName,
                event_data: eventData
            }]);

        if (error) console.error('Error tracking event:', error);
        this.updateSessionActivity();
    }
}

export const analytics = new Analytics();
