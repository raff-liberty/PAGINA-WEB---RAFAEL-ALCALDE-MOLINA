import fs from 'fs';
import { locations } from '../src/data/locations.js';
import { sectors } from '../src/data/sectors.js';
import { blogPosts } from '../src/data/blogPosts.js';

// Define base URL
const BASE_URL = 'https://engorilate.com';

// Define core static routes with priorities
const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/como-trabajamos', priority: '0.9', changefreq: 'monthly' },
    { path: '/por-que-funciona', priority: '0.9', changefreq: 'monthly' },
    { path: '/sobre-mi', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/servicios', priority: '0.8', changefreq: 'monthly' },
    { path: '/sectores', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/legal', priority: '0.3', changefreq: 'yearly' },
    { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
    { path: '/cookies', priority: '0.3', changefreq: 'yearly' }
];

// Generate XML content
const generateSitemap = () => {
    const today = new Date().toISOString().split('T')[0];
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    staticRoutes.forEach(route => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Location Pages (/servicios/:location)
    locations.forEach(loc => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/servicios/${loc.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Sector-Location Pages (/:sector/:location) - THE MONEY PAGES
    sectors.forEach(sector => {
        locations.forEach(loc => {
            xml += `  <url>\n`;
            xml += `    <loc>${BASE_URL}/${sector.slug}/${loc.slug}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            xml += `  </url>\n`;
        });
    });

    // Add Blog Posts
    blogPosts.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.publish_date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += '</urlset>';
    return xml;
};

// Write to file
const sitemapContent = generateSitemap();
fs.writeFileSync('public/sitemap.xml', sitemapContent);

// Calculate totals
const totalUrls = sitemapContent.split('<url>').length - 1;
const sectorLocationPages = sectors.length * locations.length;

console.log('✅ Sitemap generated successfully!');
console.log(`📍 Location: public/sitemap.xml`);
console.log(`📊 Total URLs: ${totalUrls}`);
console.log(`   - Static pages: ${staticRoutes.length}`);
console.log(`   - Location pages: ${locations.length}`);
console.log(`   - Sector-Location pages: ${sectorLocationPages}`);
console.log(`   - Blog posts: ${blogPosts.length}`);
