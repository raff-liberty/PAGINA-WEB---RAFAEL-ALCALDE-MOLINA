import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    keywords,
    image = 'https://engorilate.com/og-image.jpg',
    type = 'website',
    schema
}) => {
    const location = useLocation();
    const cleanPath = location.pathname.endsWith('/')
        ? location.pathname.slice(0, -1)
        : location.pathname;
    const url = `https://engorilate.com${cleanPath}`;

    const defaultTitle = 'Engorilate | Automatización de Negocios';
    const defaultDescription = 'Especialistas en automatización de procesos y optimización operativa para pequeños negocios en la Región de Murcia. Recupera tu tiempo.';
    const defaultKeywords = 'automatización, negocios, murcia, eficiencia, procesos, digitalización';

    const brandSuffix = 'Engorilate';
    let finalTitle = title || defaultTitle;

    // Si hay un título personalizado y no incluye ya la marca, se la añadimos de forma limpia
    if (title && !title.includes(brandSuffix)) {
        finalTitle = `${title} | ${brandSuffix}`;
    }
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || defaultKeywords;

    useEffect(() => {
        // Update Title
        document.title = finalTitle;

        // Update Meta Tags
        const setMeta = (name, content) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.name = name;
                document.head.appendChild(element);
            }
            element.content = content;
        };

        const setOgMsg = (property, content) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.content = content;
        };

        setMeta('description', finalDescription);
        setMeta('keywords', finalKeywords);

        // Canonical
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.rel = 'canonical';
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.href = url;

        // OG Tags
        setOgMsg('og:title', finalTitle);
        setOgMsg('og:description', finalDescription);
        setOgMsg('og:url', url);
        setOgMsg('og:type', type);
        setOgMsg('og:image', image);

        // Twitter Tags
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', finalTitle);
        setMeta('twitter:description', finalDescription);
        setMeta('twitter:image', image);

        // JSON-LD Schema Injection
        if (schema) {
            let script = document.querySelector('script[id="json-ld-schema"]');
            if (!script) {
                script = document.createElement('script');
                script.id = 'json-ld-schema';
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            script.innerHTML = JSON.stringify(schema);
        }

    }, [finalTitle, finalDescription, finalKeywords, url, image, type, schema]);

    return null;
};

export default SEO;
