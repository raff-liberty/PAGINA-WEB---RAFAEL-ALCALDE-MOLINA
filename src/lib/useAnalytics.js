import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../lib/analytics';

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Defer analytics until after page is interactive (improves FCP/LCP)
        const trackPageView = () => {
            analytics.trackPageView(location.pathname);
        };

        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
            requestIdleCallback(trackPageView);
        } else {
            setTimeout(trackPageView, 1000);
        }
    }, [location.pathname]);

    return analytics;
};
