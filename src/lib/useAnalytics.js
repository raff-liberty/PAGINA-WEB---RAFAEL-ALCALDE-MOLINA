import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../lib/analytics';

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Rastrear vista de página en cada cambio de ruta
        analytics.trackPageView(location.pathname);
    }, [location.pathname]);

    return analytics;
};
