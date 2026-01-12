/**
 * Lazy Services Manager
 * 
 * Centraliza la carga diferida de servicios externos para evitar bloquear
 * el render inicial de la página. Implementa retry logic y usa requestIdleCallback
 * cuando está disponible.
 */

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 segundo

class LazyServicesManager {
    constructor() {
        this.loadedServices = new Set();
        this.pendingPromises = new Map();
    }

    /**
     * Ejecuta una función cuando el navegador esté inactivo
     * @param {Function} callback - Función a ejecutar
     * @param {Object} options - Opciones de timeout
     */
    runWhenIdle(callback, options = { timeout: 2000 }) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback, options);
        } else {
            // Fallback para navegadores que no soportan requestIdleCallback
            setTimeout(callback, 1);
        }
    }

    /**
     * Carga geolocalización basada en IP de forma diferida
     * @returns {Promise<Object>} Datos de geolocalización
     */
    async loadIPGeolocation() {
        const serviceKey = 'ip-geo';

        // Si ya se está cargando, retornar la promesa existente
        if (this.pendingPromises.has(serviceKey)) {
            return this.pendingPromises.get(serviceKey);
        }

        // Si ya se cargó, retornar datos cacheados
        if (this.loadedServices.has(serviceKey)) {
            return this._getCachedGeo();
        }

        const loadPromise = this._loadGeoWithRetry();
        this.pendingPromises.set(serviceKey, loadPromise);

        try {
            const result = await loadPromise;
            this.loadedServices.add(serviceKey);
            this._cacheGeo(result);
            return result;
        } finally {
            this.pendingPromises.delete(serviceKey);
        }
    }

    /**
     * Carga geolocalización con reintentos
     * @private
     */
    async _loadGeoWithRetry(attempt = 1) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const response = await fetch('https://ipapi.co/json/', {
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            return {
                country: data.country_name || 'Unknown',
                city: data.city || 'Unknown',
                region: data.region || 'Unknown',
                region_code: data.region_code || 'Unknown'
            };
        } catch (error) {
            console.warn(`Geo lookup attempt ${attempt} failed:`, error.message);

            if (attempt < RETRY_ATTEMPTS) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                return this._loadGeoWithRetry(attempt + 1);
            }

            // Después de todos los reintentos, retornar valores por defecto
            return {
                country: 'Unknown',
                city: 'Unknown',
                region: 'Unknown',
                region_code: 'Unknown'
            };
        }
    }

    /**
     * Cachea datos de geolocalización en sessionStorage
     * @private
     */
    _cacheGeo(data) {
        try {
            sessionStorage.setItem('engorilate_geo_cache', JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to cache geo data:', e);
        }
    }

    /**
     * Obtiene datos de geolocalización cacheados
     * @private
     */
    _getCachedGeo() {
        try {
            const cached = sessionStorage.getItem('engorilate_geo_cache');
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);
            const ONE_HOUR = 60 * 60 * 1000;

            // Cache válido por 1 hora
            if (Date.now() - timestamp < ONE_HOUR) {
                return data;
            }
        } catch (e) {
            console.warn('Failed to read cached geo data:', e);
        }

        return null;
    }

    /**
     * Precarga servicios de analytics de forma diferida
     * @param {Function} initCallback - Callback de inicialización
     */
    loadAnalytics(initCallback) {
        this.runWhenIdle(() => {
            if (!this.loadedServices.has('analytics')) {
                initCallback();
                this.loadedServices.add('analytics');
            }
        });
    }

    /**
     * Carga un script externo de forma asíncrona
     * @param {string} src - URL del script
     * @param {Object} attributes - Atributos adicionales del script
     * @returns {Promise<void>}
     */
    async loadExternalScript(src, attributes = {}) {
        if (this.loadedServices.has(src)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;

            Object.entries(attributes).forEach(([key, value]) => {
                script.setAttribute(key, value);
            });

            script.onload = () => {
                this.loadedServices.add(src);
                resolve();
            };

            script.onerror = () => {
                reject(new Error(`Failed to load script: ${src}`));
            };

            document.head.appendChild(script);
        });
    }
}

export const lazyServices = new LazyServicesManager();
