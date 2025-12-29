import fs from 'fs';
import { locations } from '../src/data/locations.js';

// Define base URL
const BASE_URL = 'https://engorilate.com';

// Define core static routes
const staticRoutes = [
    '',
    '/sobre-mi',
    '/contact',
    '/como-trabajamos',
    '/por-que-funciona',
    '/servicios',
    '/sectores',
    '/blog',
    '/legal',
    '/privacidad',
    '/cookies'
];

// Define sectors (should match DB/App, hardcoded for script simplicity for now)
const sectors = [
    'peluquerias',
    'restaurantes',
    'clinicas',
    'talleres',
    'estudios-de-tatuajes',
    'agencias',
    'comercios',
    'inmobiliarias'
];

// Generate XML content
const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    staticRoutes.forEach(route => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${route}</loc>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Location Pages (/servicios/:location)
    locations.forEach(loc => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/servicios/${loc.slug}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.9</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Sector-Location Pages (/:sector/:location)
    sectors.forEach(sector => {
        locations.forEach(loc => {
            xml += `  <url>\n`;
            xml += `    <loc>${BASE_URL}/${sector}/${loc.slug}</loc>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>0.9</priority>\n`;
            xml += `  </url>\n`;
        });
    });

    xml += '</urlset>';
    return xml;
};

// Write to file
const sitemapContent = generateSitemap();
fs.writeFileSync('public/sitemap.xml', sitemapContent);

console.log('✅ Sitemap generated successfully at public/sitemap.xml');
