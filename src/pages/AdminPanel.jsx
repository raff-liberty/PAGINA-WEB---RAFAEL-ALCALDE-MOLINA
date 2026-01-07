import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Eye, Edit, Plus, Trash2, Lock, Search, Filter, BookOpen, BarChart3, Copy, Upload, Download, Globe, MapPin, Briefcase, CheckCircle, AlertCircle, ExternalLink, Target, Bold, Quote, List, ListOrdered, CheckSquare, Table, Users, Mail, FileText, Send, Calendar, Tag, MoreHorizontal } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import StrategicRoadmap from '../components/StrategicRoadmap';
import SEOPreview from '../components/SEOPreview';
import ImageUploader from '../components/ImageUploader';
import ImageGallery from '../components/ImageGallery';
import BlogPostPreview from '../components/BlogPostPreview';
import { useAuth } from '../contexts/AuthContext';
import ContactList from '../components/crm/ContactList';
import ContactDetail from '../components/crm/ContactDetail';
import ProjectList from '../components/crm/ProjectList';
import ProjectDetail from '../components/crm/ProjectDetail';

const AdminPanel = () => {
    const navigationTabs = [
        { id: 'editor', label: 'Blog', icon: Edit },
        { id: 'growth', label: 'Estrategia', icon: Target },
        { id: 'landings', label: 'Landings SEO', icon: Globe },
        { id: 'guidelines', label: 'Línea Editorial', icon: BookOpen },
        { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
        { id: 'sectors', label: 'Sectores', icon: Briefcase },
        { id: 'locations', label: 'Localizaciones', icon: MapPin },
        { id: 'crm', label: 'CRM', icon: Users },
        { id: 'config', label: 'Configuración', icon: Save },
    ];

    const { user, loading: authLoading, signIn, signOut } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Blog State
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    // SEO / Landings State
    const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'landings', 'guidelines', 'stats', 'config'
    const [sectors, setSectors] = useState([]);
    const [locations, setLocations] = useState([]);
    const [landingPages, setLandingPages] = useState([]);
    const [selectedLanding, setSelectedLanding] = useState(null);

    const [siteConfig, setSiteConfig] = useState({
        whatsapp_url: '',
        instagram_url: '',
        linkedin_url: '',
        contact_email: '',
        n8n_webhook_url: '',
        og_image_url: 'https://engorilate.com/og-image.jpg',
        twitter_handle: '@engorilate',
        default_meta_title: 'Engorilate | Destruimos la Burocracia con Automatización Inteligente',
        default_meta_description: 'Si tu negocio depende de procesos manuales, estás perdiendo dinero. En Engorilate diseñamos ecosistemas de automatización que trabajan por ti. Recupera tu tiempo ahora.',
        default_keywords: 'automatización de negocios, eficiencia operativa, digitalización pymes, ahorro tiempo murcia, sistemas inteligentes',
        chat_embed_url: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const [sitemapStatus, setSitemapStatus] = useState('');
    const [showSEOPreview, setShowSEOPreview] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordChangeStatus, setPasswordChangeStatus] = useState('');
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [showImageGallery, setShowImageGallery] = useState(false);
    const [showBlogPreview, setShowBlogPreview] = useState(false);
    const [selectedPostsForExport, setSelectedPostsForExport] = useState([]);
    const [crmTab, setCrmTab] = useState('contacts'); // 'contacts', 'templates', 'campaigns'
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    // Sectors & Locations state
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingSector, setEditingSector] = useState(false);
    const [editingLocation, setEditingLocation] = useState(false);

    // Editable fields
    const [editedTitle, setEditedTitle] = useState('');
    const [editedSlug, setEditedSlug] = useState('');
    const [editedExcerpt, setEditedExcerpt] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedReadTime, setEditedReadTime] = useState('');
    const [editedSavings, setEditedSavings] = useState('');
    const [editedPublishDate, setEditedPublishDate] = useState('');
    const [editedMetaDescription, setEditedMetaDescription] = useState('');

    // Removed hardcoded password - now using Supabase Auth

    const categories = [
        "Pierdo tiempo",
        "Pierdo dinero",
        "Pierdo clientes",
        "Casos Reales",
        "Automatización",
        "Gestión"
    ];

    const editorialGuidelines = `# Línea Editorial Engorilate - Framework \"Autoridad PAS\"
1. **Directo a la Yugular**: El lector no viene a aprender teoría, viene a dejar de sufrir. Identifica el dolor (Problema) y clávale el aguijón (Agitación).
2. **Autoridad Técnica**: Explica *por qué* técnicamente lo que hacen hoy es una basura (Webhooks vs Manual, APIs vs CSVs). Demuestra que sabes de lo que hablas.
3. **Misión del Gorila**: Automatizar no es una opción, es una necesidad de supervivencia. Menos clics, más facturación.

## El Framework PAS (Problem-Agitation-Solution)
- **Problema**: Identifica la tarea manual específica que les roba vida.
- **Agitación**: Traduce esa pérdida a euros y horas semanales. Haz que duela.
- **Autoridad**: Explica la solución técnica (infraestructura, conectores, flujos).
- **Solución Engorilada**: Cómo lo hacemos nosotros de forma ágil y rentable.

## Reglas de Oro \"Zero Humo\"
- **Prohibido alucinar**: Cero estadísticas inventadas. Si no hay dato real, usa \"Según nuestra experiencia en el sector\".
- **Markdown Obligatorio**: Usa tablas para comparar el \"Antes (Caos)\" vs \"Después (Orden)\". Usa blockquotes para frases de impacto.
- **CTA Agresivo**: No pedimos \"por favor\". Ofrecemos una salida del bucle infinito de la burocracia.

## Ejemplos de Títulos Engorilaos
✅ \"La Trampa del ERP de 5.000€\"
✅ \"El Robo Silencioso de tus Mañanas\"
✅ \"Tu CRM es un Zombi (y te está costando dinero)\"`;

    // CRM Data Fetching Logic
    useEffect(() => {
        if (user) {
            fetchPosts();
            fetchSiteConfig();
            fetchSEOData();
            if (activeTab === 'sectors') {
                fetchSectors();
            }
            if (activeTab === 'locations') {
                fetchLocations();
            }
        }
    }, [user, activeTab]);

    const fetchSectors = async () => {
        try {
            const { data, error } = await supabase
                .from('sectors')
                .select('*')
                .order('name');
            if (error) throw error;
            setSectors(data || []);
        } catch (error) {
            console.error('Error fetching sectors:', error);
        }
    };

    const fetchLocations = async () => {
        try {
            const { data, error } = await supabase
                .from('locations')
                .select('*')
                .order('name');
            if (error) throw error;
            setLocations(data || []);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleSaveSector = async () => {
        if (!selectedSector) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('sectors')
                .upsert({
                    id: selectedSector.id,
                    name: selectedSector.name,
                    slug: selectedSector.slug,
                    description: selectedSector.description
                });
            if (error) throw error;
            setEditingSector(false);
            fetchSectors();
            fetchSEOData();
        } catch (error) {
            console.error('Error saving sector:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSector = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este sector? Esto puede afectar a las landings asociadas.')) return;
        try {
            const { error } = await supabase
                .from('sectors')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchSectors();
            fetchSEOData();
        } catch (error) {
            console.error('Error deleting sector:', error);
        }
    };

    const handleSaveLocation = async () => {
        if (!selectedLocation) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('locations')
                .upsert({
                    id: selectedLocation.id,
                    name: selectedLocation.name,
                    slug: selectedLocation.slug,
                    province: selectedLocation.province,
                    region: selectedLocation.region
                });
            if (error) throw error;
            setEditingLocation(false);
            fetchLocations();
            fetchSEOData();
        } catch (error) {
            console.error('Error saving location:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLocation = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta localización? Esto puede afectar a las landings asociadas.')) return;
        try {
            const { error } = await supabase
                .from('locations')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchLocations();
            fetchSEOData();
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };


    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('publish_date', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSEOData = async () => {
        try {
            // Fetch Sectors
            const { data: sectorsData } = await supabase.from('sectors').select('*');
            if (sectorsData) setSectors(sectorsData);

            // Fetch Locations
            const { data: locationsData } = await supabase.from('locations').select('*');
            if (locationsData) setLocations(locationsData);

            // Fetch Existing Content
            const { data: contentData } = await supabase.from('sector_location_content').select('*');
            if (contentData) setLandingPages(contentData);

        } catch (error) {
            console.error('Error fetching SEO data:', error);
        }
    };

    const getLandingStatus = (sectorSlug, locationSlug) => {
        return landingPages.find(p => p.sector_slug === sectorSlug && p.location_slug === locationSlug);
    };

    const handleSelectLanding = (sector, location) => {
        const existing = getLandingStatus(sector.slug, location.slug);

        if (existing) {
            setSelectedLanding(existing);
        } else {
            // SMART TEMPLATES: High-conversion keywords per sector
            const templates = {
                'peluquerias': {
                    metaTitle: `Software para Peluquerías en ${location.name} (Citas WhatsApp) | Engorilate`,
                    metaDesc: `Agenda automática, recordatorios por WhatsApp y 0 ausencias. El software para peluquerías en ${location.name} que funciona solo.`,
                    heroTitle: `Tu Peluquería en ${location.name} funcionando en Autopiloto`,
                    heroSub: `Olvídate del teléfono. Citas por WhatsApp, agenda llena y cobros automáticos.`
                },
                'restaurantes': {
                    metaTitle: `Sistema de Reservas Restaurantes ${location.name} (Sin Comisiones) | Engorilate`,
                    metaDesc: `Automatiza reservas y llena tu restaurante en ${location.name}. Sin TheFork ni comisiones. Carta digital y gestión de mesas.`,
                    heroTitle: `Llena tu Restaurante en ${location.name} sin depender del Teléfono`,
                    heroSub: `Reservas automáticas, cero plantones y carta digital. Todo el control para ti.`
                },
                'clinicas': {
                    metaTitle: `Software de Citas Médicas en ${location.name} (Recordatorios SMS) | Engorilate`,
                    metaDesc: `Software para clínicas en ${location.name}. Reduce el absentismo con recordatorios automáticos y gestiona historiales fácilmente.`,
                    heroTitle: `Más Pacientes en tu Clínica de ${location.name}, Menos Burocracia`,
                    heroSub: `Gestión de citas, historiales y recordatorios automáticos. El tiempo es para curar.`
                },
                'talleres': {
                    metaTitle: `Programa Taller Mecánico ${location.name} (Facturas y Presupuestos) | Engorilate`,
                    metaDesc: `Software taller mecánico en ${location.name}. Crea presupuestos, envía facturas por WhatsApp y avisa cuando el coche está listo.`,
                    heroTitle: `Control Total para tu Taller en ${location.name}`,
                    heroSub: `Presupuestos al vuelo, facturas por WhatsApp y clientes avisados automáticamente.`
                },
                'tatuajes': {
                    metaTitle: `Software Estudio Tatuajes ${location.name} (Citas y Depósitos) | Engorilate`,
                    metaDesc: `Gestiona citas, cobros de señal y consentimientos digitales. El software para tatuadores en ${location.name}.`,
                    heroTitle: `Tatúa más, Gestiona menos en ${location.name}`,
                    heroSub: `Agenda, depósitos y consentimientos digitales. Todo desde el móvil.`
                },
                'agencias': {
                    metaTitle: `Gestión de Proyectos Agencia en ${location.name} (CRM + Facturas) | Engorilate`,
                    metaDesc: `Optimiza tu agencia en ${location.name}. Onboarding de clientes, facturación recurrente y gestión de proyectos unificada.`,
                    heroTitle: `Escala tu Agencia en ${location.name} sin morir de éxito`,
                    heroSub: `Deja de hacer de administrativo y empieza a hacer de estratega. Automatizamos tu onboarding, CRM y facturación.`
                },
                'comercios': {
                    metaTitle: `TPV y Software Tienda ${location.name} (Stock Real) | Engorilate`,
                    metaDesc: `Software TPV para tiendas en ${location.name}. Control de stock en tiempo real, ventas y facturación simplificada.`,
                    heroTitle: `Tu Tienda en ${location.name}, bajo control total`,
                    heroSub: `No más "creo que queda". Inventario sincronizado y ventas bajo control total cada segundo.`
                }
            };

            const t = templates[sector.slug] || {
                metaTitle: `Software para ${sector.name} en ${location.name} | Engorilate`,
                metaDesc: `Automatiza tu negocio de ${sector.name.toLowerCase()} en ${location.name}. Deja de perder tiempo en gestión y céntrate en lo importante.`,
                heroTitle: `Automatización para ${sector.name} en ${location.name}`,
                heroSub: `Recupera tu tiempo y escala tu negocio de ${sector.name.toLowerCase()}.`
            };

            // Template for new landing content
            setSelectedLanding({
                sector_slug: sector.slug,
                location_slug: location.slug,
                meta_title: t.metaTitle,
                meta_description: t.metaDesc,
                hero_title: t.heroTitle,
                hero_subtitle: t.heroSub,
                problems: [],
                solutions: [],
                local_context: ''
            });
        }
        setActiveTab('landings');
    };

    const handleSaveLanding = async () => {
        if (!selectedLanding) return;
        setLoading(true);
        setSaveStatus('Guardando Landing...');

        try {
            // Ensure ID is set correctly (sector-location)
            const id = selectedLanding.id || `${selectedLanding.sector_slug}-${selectedLanding.location_slug}`;
            const dataToSave = { ...selectedLanding, id };

            const { error } = await supabase
                .from('sector_location_content')
                .upsert(dataToSave, { onConflict: 'id' });

            if (error) throw error;

            setSaveStatus('✓ Landing guardada');
            fetchSEOData(); // Refresh data to update list status
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving landing:', error);
            setSaveStatus('✗ Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    const fetchSiteConfig = async () => {
        try {
            const { data, error } = await supabase
                .from('site_config')
                .select('key, value');

            if (error) throw error;

            const config = {};
            data?.forEach(item => {
                config[item.key] = item.value || '';
            });
            setSiteConfig(prev => ({ ...prev, ...config }));
        } catch (error) {
            console.error('Error fetching site config:', error);
        }
    };

    const saveSiteConfig = async () => {
        setLoading(true);
        setSaveStatus('Guardando configuración...');

        try {
            const updates = Object.entries(siteConfig).map(([key, value]) => ({
                key,
                value,
                updated_at: new Date().toISOString()
            }));

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_config')
                    .upsert(update, { onConflict: 'key' });

                if (error) throw error;
            }

            setSaveStatus('✓ Configuración guardada correctamente');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving site config:', error);
            setSaveStatus('✗ Error al guardar configuración');
        } finally {
            setLoading(false);
        }
    };

    const regenerateSitemap = async () => {
        setLoading(true);
        setSitemapStatus('Generando sitemap...');

        try {
            // Fetch all necessary data
            const [sectorsRes, locationsRes, postsRes] = await Promise.all([
                supabase.from('sectors').select('slug'),
                supabase.from('locations').select('slug'),
                supabase.from('blog_posts').select('slug, publish_date')
            ]);

            const sectorsData = sectorsRes.data || [];
            const locationsData = locationsRes.data || [];
            const postsData = postsRes.data || [];

            // Static routes
            const staticRoutes = [
                { path: '', priority: '1.0', changefreq: 'weekly' },
                { path: '/servicios', priority: '1.0', changefreq: 'weekly' },
                { path: '/servicios/automatizacion-whatsapp', priority: '0.9', changefreq: 'monthly' },
                { path: '/servicios/desarrollo-web-medida', priority: '0.9', changefreq: 'monthly' },
                { path: '/servicios/seo-local-estrategia', priority: '0.9', changefreq: 'monthly' },
                { path: '/servicios/sistemas-gestion-personalizados', priority: '0.9', changefreq: 'monthly' },
                { path: '/donde-trabajamos', priority: '0.8', changefreq: 'monthly' },
                { path: '/como-trabajamos', priority: '0.9', changefreq: 'monthly' },
                { path: '/por-que-funciona', priority: '0.9', changefreq: 'monthly' },
                { path: '/sobre-mi', priority: '0.8', changefreq: 'monthly' },
                { path: '/contact', priority: '0.9', changefreq: 'monthly' },
                { path: '/sectores', priority: '0.8', changefreq: 'monthly' },
                { path: '/blog', priority: '0.7', changefreq: 'weekly' },
                { path: '/legal', priority: '0.3', changefreq: 'yearly' },
                { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
                { path: '/cookies', priority: '0.3', changefreq: 'yearly' }
            ];

            const BASE_URL = 'https://engorilate.com';
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

            // Add location pages
            locationsData.forEach(loc => {
                xml += `  <url>\n`;
                xml += `    <loc>${BASE_URL}/servicios/${loc.slug}</loc>\n`;
                xml += `    <lastmod>${today}</lastmod>\n`;
                xml += `    <changefreq>monthly</changefreq>\n`;
                xml += `    <priority>0.7</priority>\n`;
                xml += `  </url>\n`;
            });

            // Add sector-location pages
            sectorsData.forEach(sector => {
                locationsData.forEach(loc => {
                    xml += `  <url>\n`;
                    xml += `    <loc>${BASE_URL}/${sector.slug}/${loc.slug}</loc>\n`;
                    xml += `    <lastmod>${today}</lastmod>\n`;
                    xml += `    <changefreq>monthly</changefreq>\n`;
                    xml += `    <priority>0.8</priority>\n`;
                    xml += `  </url>\n`;
                });
            });

            // Add blog posts
            postsData.forEach(post => {
                xml += `  <url>\n`;
                xml += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
                xml += `    <lastmod>${post.publish_date}</lastmod>\n`;
                xml += `    <changefreq>monthly</changefreq>\n`;
                xml += `    <priority>0.6</priority>\n`;
                xml += `  </url>\n`;
            });

            xml += '</urlset>';

            // Create and download the sitemap
            const blob = new Blob([xml], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'sitemap.xml';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            const totalUrls = staticRoutes.length + locationsData.length + (sectorsData.length * locationsData.length) + postsData.length;
            setSitemapStatus(`✓ Sitemap generado: ${totalUrls} URLs. Archivo descargado. Súbelo a /public/`);
            setTimeout(() => setSitemapStatus(''), 8000);
        } catch (error) {
            console.error('Error generating sitemap:', error);
            setSitemapStatus('✗ Error al generar sitemap');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        const { error } = await signIn(email, password);

        if (error) {
            setLoginError('Email o contraseña incorrectos');
            console.error('Login error:', error);
        }
    };

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            setPasswordChangeStatus('✗ Por favor completa ambos campos');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordChangeStatus('✗ Las contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 8) {
            setPasswordChangeStatus('✗ La contraseña debe tener al menos 8 caracteres');
            return;
        }

        setLoading(true);
        setPasswordChangeStatus('Cambiando contraseña...');

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setPasswordChangeStatus('✓ Contraseña cambiada correctamente');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setPasswordChangeStatus(''), 3000);
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordChangeStatus('✗ Error al cambiar contraseña');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPost = (post) => {
        setSelectedPost(post);
        setEditedTitle(post.title || '');
        setEditedSlug(post.slug || '');
        setEditedExcerpt(post.excerpt || '');
        setEditedCategory(post.category || '');
        setEditedContent(post.content || '');
        setEditedReadTime(post.read_time || '');
        setEditedSavings(post.savings || '');
        setEditedPublishDate(post.publish_date || '');
        setEditedMetaDescription(post.meta_description || post.metaDescription || '');
        setShowPreview(false);
        setActiveTab('editor');
    };

    const handleCreateNew = () => {
        const newPost = {
            id: 'new-' + Date.now(),
            title: 'Nuevo Post',
            slug: 'nuevo-post-' + Date.now(),
            excerpt: '',
            category: categories[0],
            content: '## Introducción\n\nEscribe tu contenido aquí...',
            read_time: '5 min',
            savings: '10h/mes',
            publish_date: new Date().toISOString().split('T')[0],
            meta_description: ''
        };
        handleSelectPost(newPost);
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (newTitle) => {
        setEditedTitle(newTitle);
        if (selectedPost?.id?.toString().startsWith('new-')) {
            setEditedSlug(generateSlug(newTitle));
        }
    };

    const handleSave = async () => {
        if (!selectedPost) return;

        setLoading(true);
        setSaveStatus('Guardando...');

        try {
            const postData = {
                title: editedTitle,
                slug: editedSlug,
                excerpt: editedExcerpt,
                category: editedCategory,
                content: editedContent,
                read_time: editedReadTime,
                savings: editedSavings,
                publish_date: editedPublishDate,
                meta_description: editedMetaDescription
            };

            if (selectedPost.id.toString().startsWith('new-')) {
                // Create new post
                const { error } = await supabase
                    .from('blog_posts')
                    .insert([postData]);

                if (error) throw error;
                setSaveStatus('✓ Post creado correctamente');
            } else {
                // Update existing post
                const { error } = await supabase
                    .from('blog_posts')
                    .update(postData)
                    .eq('id', selectedPost.id);

                if (error) throw error;
                setSaveStatus('✓ Guardado correctamente');
            }

            fetchPosts();
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving post:', error);
            setSaveStatus('✗ Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;

            if (selectedPost?.id === postId) {
                setSelectedPost(null);
            }
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleDuplicate = () => {
        if (!selectedPost) return;

        const duplicatedPost = {
            ...selectedPost,
            id: 'new-' + Date.now(),
            title: selectedPost.title + ' (Copia)',
            slug: selectedPost.slug + '-copia-' + Date.now()
        };
        handleSelectPost(duplicatedPost);
    };

    const insertMarkdown = (before, after = '') => {
        const textarea = document.getElementById('content-editor');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = editedContent.substring(start, end);
        const newText = editedContent.substring(0, start) + before + selectedText + after + editedContent.substring(end);
        setEditedContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    const handleExportCSV = () => {
        const postsToExport = selectedPostsForExport.length > 0
            ? posts.filter(p => selectedPostsForExport.includes(p.id))
            : posts;

        if (postsToExport.length === 0) {
            alert('No hay posts para exportar');
            return;
        }

        // Create CSV content
        const headers = ['title', 'slug', 'excerpt', 'category', 'content', 'read_time', 'savings', 'publish_date', 'meta_description'];
        const csvRows = [headers.join(',')];

        postsToExport.forEach(post => {
            const row = headers.map(header => {
                const value = post[header] || '';
                // Escape quotes and wrap in quotes if contains comma or newline
                const escaped = String(value).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `blog_posts_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clear selection after export
        setSelectedPostsForExport([]);
    };

    const togglePostSelection = (postId) => {
        setSelectedPostsForExport(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedPostsForExport.length === filteredPosts.length) {
            setSelectedPostsForExport([]);
        } else {
            setSelectedPostsForExport(filteredPosts.map(p => p.id));
        }
    };

    const handleImportCSV = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const text = e.target.result;
                const lines = text.split('\n');
                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

                const postsToImport = [];

                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;

                    // Parse CSV line (handle quoted values with commas)
                    const values = [];
                    let current = '';
                    let inQuotes = false;

                    for (let char of lines[i]) {
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            values.push(current.replace(/^"|"$/g, '').replace(/""/g, '"'));
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    values.push(current.replace(/^"|"$/g, '').replace(/""/g, '"'));

                    const post = {};
                    headers.forEach((header, index) => {
                        post[header] = values[index] || '';
                    });

                    postsToImport.push(post);
                }

                if (postsToImport.length === 0) {
                    alert('No se encontraron posts válidos en el archivo CSV');
                    return;
                }

                if (!confirm(`¿Importar ${postsToImport.length} posts? Esto creará nuevos posts en la base de datos.`)) {
                    return;
                }

                setLoading(true);
                setSaveStatus('Importando posts...');

                const { error } = await supabase
                    .from('blog_posts')
                    .insert(postsToImport);

                if (error) throw error;

                setSaveStatus(`✓ ${postsToImport.length} posts importados correctamente`);
                fetchPosts();
                setTimeout(() => setSaveStatus(''), 3000);
            } catch (error) {
                console.error('Error importing CSV:', error);
                setSaveStatus('✗ Error al importar CSV');
                alert('Error al importar CSV: ' + error.message);
            } finally {
                setLoading(false);
                event.target.value = ''; // Reset file input
            }
        };

        reader.readAsText(file);
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const stats = {
        total: posts.length,
        byCategory: categories.map(cat => ({
            name: cat,
            count: posts.filter(p => p.category === cat).length
        }))
    };

    if (authLoading) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <BackgroundMesh />
                <div className="relative z-10">
                    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <BackgroundMesh />
                <div className="relative z-10 max-w-md w-full mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#222222] border border-white/30 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-6 h-6 text-primary" />
                            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@engorilate.com"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Contraseña</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    required
                                />
                            </div>
                            {loginError && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {loginError}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3 rounded-lg transition-all"
                            >
                                Entrar
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pt-32 pb-12">
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Admin Panel & SEO</h1>
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
                        {navigationTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all min-w-[90px] h-20 ${activeTab === tab.id
                                        ? 'bg-primary text-gray-900 border-primary shadow-[0_0_20px_rgba(224,255,0,0.3)]'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">{tab.label}</span>
                                </button>
                            );
                        })}
                        <button
                            onClick={signOut}
                            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all min-w-[90px] h-20"
                        >
                            <Lock className="w-5 h-5 flex-shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">Cerrar sesión</span>
                        </button>
                    </div>
                </div>

                {activeTab === 'guidelines' && (
                    <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                        <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                {editorialGuidelines}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="space-y-6">
                        {/* Export/Import Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all"
                            >
                                <Download className="w-5 h-5" />
                                Exportar {selectedPostsForExport.length > 0 ? `${selectedPostsForExport.length} Posts` : 'Todos los Posts'} (CSV)
                            </button>
                            <label className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all cursor-pointer border border-white/20">
                                <Upload className="w-5 h-5" />
                                Importar Posts (CSV)
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleImportCSV}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <h2 className="text-2xl font-bold text-white mb-6">Resumen General</h2>
                                <div className="text-6xl font-bold text-primary mb-2">{stats.total}</div>
                                <p className="text-gray-400">Posts totales</p>
                            </div>
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <h2 className="text-2xl font-bold text-white mb-6">Por Categoría</h2>
                                <div className="space-y-3">
                                    {stats.byCategory.map((cat, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-gray-300">{cat.name}</span>
                                            <span className="text-primary font-bold">{cat.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sectors' && (
                    <div className="space-y-6">
                        <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Briefcase className="w-6 h-6 text-primary" />
                                    Gestión de Sectores
                                </h2>
                                <button
                                    onClick={() => {
                                        setSelectedSector({ name: '', slug: '', description: '' });
                                        setEditingSector(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-white text-gray-900 font-bold rounded-lg transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nuevo Sector
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sectors.map(sector => (
                                    <div key={sector.id} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-primary/20 p-2 rounded-lg">
                                                <Briefcase className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedSector(sector);
                                                        setEditingSector(true);
                                                    }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSector(sector.id)}
                                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold mb-1">{sector.name}</h3>
                                        <p className="text-xs text-primary mb-3">{sector.slug}</p>
                                        <p className="text-sm text-gray-400 line-clamp-2">{sector.description || 'Sin descripción'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sector Edit Modal */}
                        {editingSector && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                                <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl">
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        {selectedSector.id ? 'Editar Sector' : 'Nuevo Sector'}
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                                            <input
                                                type="text"
                                                value={selectedSector.name}
                                                onChange={(e) => setSelectedSector({ ...selectedSector, name: e.target.value })}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                                placeholder="Ej: Peluquerías"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Slug</label>
                                            <input
                                                type="text"
                                                value={selectedSector.slug}
                                                onChange={(e) => setSelectedSector({ ...selectedSector, slug: e.target.value })}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                                placeholder="ej: peluquerias"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                                            <textarea
                                                value={selectedSector.description}
                                                onChange={(e) => setSelectedSector({ ...selectedSector, description: e.target.value })}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none resize-none"
                                                rows={3}
                                                placeholder="Breve descripción del sector..."
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setEditingSector(false)}
                                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSaveSector}
                                            className="flex-1 px-6 py-3 bg-primary hover:bg-white text-gray-900 font-bold rounded-lg transition-all shadow-[0_4px_15px_rgba(255,184,0,0.3)]"
                                        >
                                            {selectedSector.id ? 'Actualizar' : 'Crear'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'locations' && (
                    <div className="space-y-6">
                        <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-primary" />
                                    Gestión de Localizaciones
                                </h2>
                                <button
                                    onClick={() => {
                                        setSelectedLocation({ name: '', slug: '', province: '', region: '' });
                                        setEditingLocation(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-white text-gray-900 font-bold rounded-lg transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nueva Localización
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {locations.map(location => (
                                    <div key={location.id} className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-primary/20 p-2 rounded-lg">
                                                <MapPin className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedLocation(location);
                                                        setEditingLocation(true);
                                                    }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLocation(location.id)}
                                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold mb-1">{location.name}</h3>
                                        <p className="text-xs text-primary mb-2">{location.slug}</p>
                                        <p className="text-xs text-gray-500">{location.province}, {location.region}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Edit Modal */}
                        {editingLocation && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                                <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 max-w-xl w-full shadow-2xl">
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        {selectedLocation.id ? 'Editar Localización' : 'Nueva Localización'}
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                                                <input
                                                    type="text"
                                                    value={selectedLocation.name}
                                                    onChange={(e) => setSelectedLocation({ ...selectedLocation, name: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="Ej: Murcia"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Slug</label>
                                                <input
                                                    type="text"
                                                    value={selectedLocation.slug}
                                                    onChange={(e) => setSelectedLocation({ ...selectedLocation, slug: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="ej: murcia"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Provincia</label>
                                                <input
                                                    type="text"
                                                    value={selectedLocation.province}
                                                    onChange={(e) => setSelectedLocation({ ...selectedLocation, province: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="Ej: Murcia"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Comunidad Autónoma</label>
                                                <input
                                                    type="text"
                                                    value={selectedLocation.region}
                                                    onChange={(e) => setSelectedLocation({ ...selectedLocation, region: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="Ej: Región de Murcia"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setEditingLocation(false)}
                                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSaveLocation}
                                            className="flex-1 px-6 py-3 bg-primary hover:bg-white text-gray-900 font-bold rounded-lg transition-all shadow-[0_4px_15px_rgba(255,184,0,0.3)]"
                                        >
                                            {selectedLocation.id ? 'Actualizar' : 'Crear'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'crm' && (
                    <div className="space-y-6">
                        {/* CRM Sub-tabs */}
                        <div className="flex bg-[#222222]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 w-fit">
                            {[
                                { id: 'contacts', label: 'Contactos', icon: Users },
                                { id: 'projects', label: 'Proyectos', icon: Briefcase },
                                { id: 'templates', label: 'Plantillas', icon: Mail },
                                { id: 'campaigns', label: 'Campañas', icon: Calendar }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setCrmTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${crmTab === tab.id
                                        ? 'bg-primary text-gray-900 font-bold'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {crmTab === 'contacts' && (
                            <>
                                <ContactList
                                    onSelectContact={(contact) => setSelectedContact(contact)}
                                    onCreateContact={() => setSelectedContact('new')}
                                />

                                {selectedContact && (
                                    <ContactDetail
                                        contactId={selectedContact === 'new' ? 'new' : selectedContact.id}
                                        onClose={() => setSelectedContact(null)}
                                        onUpdate={() => setSelectedContact(null)}
                                    />
                                )}
                            </>
                        )}

                        {crmTab === 'projects' && (
                            <>
                                <ProjectList
                                    onSelectProject={(project) => setSelectedProject(project)}
                                    onCreateProject={() => setSelectedProject('new')}
                                />

                                {selectedProject && (
                                    <ProjectDetail
                                        projectId={selectedProject === 'new' ? 'new' : selectedProject.id}
                                        onClose={() => setSelectedProject(null)}
                                        onUpdate={() => setSelectedProject(null)}
                                    />
                                )}
                            </>
                        )}

                        {crmTab === 'templates' && (
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                                <h2 className="text-2xl font-bold text-white mb-4">Plantillas de Email</h2>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Esta sección está en desarrollo. Pronto podrás crear y gestionar plantillas de email con variables dinámicas.
                                </p>
                            </div>
                        )}

                        {crmTab === 'campaigns' && (
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                                <h2 className="text-2xl font-bold text-white mb-4">Campañas de Email</h2>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Aquí podrás gestionar los envíos masivos y ver las estadísticas de apertura y clicks. Próximamente disponible.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'config' && (
                    <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Configuración del Sitio</h2>
                            {saveStatus && (
                                <span className="text-sm text-primary">{saveStatus}</span>
                            )}
                        </div>

                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp URL</label>
                                <input
                                    type="text"
                                    value={siteConfig.whatsapp_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp_url: e.target.value })}
                                    placeholder="https://wa.me/34600000000"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL para el botón de WhatsApp en la página de contacto</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                                <input
                                    type="text"
                                    value={siteConfig.instagram_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, instagram_url: e.target.value })}
                                    placeholder="https://instagram.com/tu_usuario"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL de tu perfil de Instagram</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                                <input
                                    type="text"
                                    value={siteConfig.linkedin_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, linkedin_url: e.target.value })}
                                    placeholder="https://linkedin.com/in/tu_perfil"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL de tu perfil de LinkedIn</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email de Contacto</label>
                                <input
                                    type="email"
                                    value={siteConfig.contact_email}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, contact_email: e.target.value })}
                                    placeholder="hola@tuempresa.com"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email que aparecerá en la página de contacto</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">N8N Webhook URL</label>
                                <input
                                    type="text"
                                    value={siteConfig.n8n_webhook_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, n8n_webhook_url: e.target.value })}
                                    placeholder="https://tu-n8n.com/webhook/..."
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Webhook de N8N para recibir los formularios de contacto</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">n8n Chat Embed URL</label>
                                <input
                                    type="text"
                                    value={siteConfig.chat_embed_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, chat_embed_url: e.target.value })}
                                    placeholder="https://tu-n8n.com/webhook/chat-id..."
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL pública del chat envevido de n8n</p>
                            </div>

                            {/* SEO Meta Tags Section */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Search className="w-5 h-5 text-primary" />
                                    SEO Global
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Open Graph Image URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={siteConfig.og_image_url}
                                                onChange={(e) => setSiteConfig({ ...siteConfig, og_image_url: e.target.value })}
                                                placeholder="https://engorilate.com/og-image.jpg"
                                                className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            />
                                            <button
                                                onClick={() => setShowImageGallery(true)}
                                                className="px-4 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-lg transition-all flex items-center gap-2"
                                                title="Seleccionar de galería"
                                            >
                                                <Eye className="w-5 h-5" />
                                                Galería
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Imagen que se muestra al compartir en redes sociales (1200x630px)</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Twitter Handle</label>
                                        <input
                                            type="text"
                                            value={siteConfig.twitter_handle}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, twitter_handle: e.target.value })}
                                            placeholder="@engorilate"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Usuario de Twitter/X para Twitter Cards</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Meta Title por Defecto</label>
                                        <input
                                            type="text"
                                            value={siteConfig.default_meta_title}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, default_meta_title: e.target.value })}
                                            placeholder="Engorilate | Automatización de Negocios en Murcia"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Título que aparece en Google y pestañas del navegador</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Meta Description por Defecto</label>
                                        <textarea
                                            value={siteConfig.default_meta_description}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, default_meta_description: e.target.value })}
                                            placeholder="Automatiza los procesos repetitivos de tu empresa..."
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none h-20"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Descripción que aparece en resultados de Google</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Keywords por Defecto</label>
                                        <input
                                            type="text"
                                            value={siteConfig.default_keywords}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, default_keywords: e.target.value })}
                                            placeholder="automatización, negocios, murcia"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Palabras clave separadas por comas</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={saveSiteConfig}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                Guardar Configuración
                            </button>

                            {/* Sitemap Section */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Sitemap SEO
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Genera un nuevo sitemap.xml con todas las páginas actuales (estáticas, sector-ciudad, blog posts).
                                </p>
                                {sitemapStatus && (
                                    <div className={`mb-4 p-3 rounded-lg text-sm ${sitemapStatus.startsWith('✓') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : sitemapStatus.startsWith('✗') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                        {sitemapStatus}
                                    </div>
                                )}
                                <button
                                    onClick={regenerateSitemap}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                                >
                                    <Download className="w-5 h-5" />
                                    Regenerar Sitemap
                                </button>
                                <p className="text-xs text-gray-500 mt-2">
                                    El archivo se descargará automáticamente. Luego súbelo manualmente a <code className="bg-black/30 px-1 rounded">/public/sitemap.xml</code>
                                </p>
                            </div>

                            {/* Password Change Section */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-primary" />
                                    Cambiar Contraseña
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Cambia tu contraseña de acceso al panel de administración.
                                </p>
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Mínimo 8 caracteres"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirmar Contraseña</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Repite la contraseña"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    {passwordChangeStatus && (
                                        <div className={`p-3 rounded-lg text-sm ${passwordChangeStatus.startsWith('✓') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                            {passwordChangeStatus}
                                        </div>
                                    )}
                                    <button
                                        onClick={handleChangePassword}
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                                    >
                                        <Lock className="w-5 h-5" />
                                        Cambiar Contraseña
                                    </button>
                                </div>
                            </div>

                            {/* Image Management Section */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-primary" />
                                    Gestión de Imágenes
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Sube y gestiona imágenes para usar en meta tags, blog posts, etc.
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setShowImageUploader(!showImageUploader)}
                                        className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-lg transition-all"
                                    >
                                        <Upload className="w-5 h-5" />
                                        {showImageUploader ? 'Ocultar Subida' : 'Subir Nueva Imagen'}
                                    </button>

                                    {showImageUploader && (
                                        <div className="p-4 bg-black/30 border border-white/10 rounded-lg">
                                            <ImageUploader
                                                onUploadComplete={(url) => {
                                                    console.log('Image uploaded:', url);
                                                    setShowImageUploader(false);
                                                }}
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setShowImageGallery(true)}
                                        className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary font-bold py-3 rounded-lg transition-all"
                                    >
                                        <Eye className="w-5 h-5" />
                                        Ver Galería de Imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'growth' && (
                    <StrategicRoadmap />
                )}

                {activeTab === 'landings' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Sidebar: List of Pages */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)] h-[80vh] flex flex-col">
                                <h2 className="text-xl font-bold text-white mb-4">Páginas de Aterrizaje</h2>
                                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                    {sectors.map(sector => (
                                        <div key={sector.id} className="mb-4">
                                            <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-wider">{sector.name}</h3>
                                            <div className="space-y-1">
                                                {locations.map(location => {
                                                    const hasContent = getLandingStatus(sector.slug, location.slug);
                                                    const isSelected = selectedLanding?.sector_slug === sector.slug && selectedLanding?.location_slug === location.slug;

                                                    return (
                                                        <button
                                                            key={location.id}
                                                            onClick={() => handleSelectLanding(sector, location)}
                                                            className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-all ${isSelected ? 'bg-primary/20 text-white border border-primary/50' : 'text-gray-400 hover:bg-white/5'
                                                                }`}
                                                        >
                                                            <span>{location.name}</span>
                                                            {hasContent ? (
                                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                            ) : (
                                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Editor: Form */}
                        <div className="lg:col-span-2">
                            {selectedLanding ? (
                                <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)] h-[80vh] overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#222222] z-10 py-2 border-b border-white/10">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-1">
                                                Editando: {selectedLanding.sector_slug} en {selectedLanding.location_slug}
                                            </h2>
                                            <a
                                                href={`/${selectedLanding.sector_slug}/${selectedLanding.location_slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                            >
                                                Ver página en vivo <Globe className="w-3 h-3" />
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {saveStatus && <span className="text-sm text-primary">{saveStatus}</span>}
                                            <button
                                                onClick={() => setShowSEOPreview(true)}
                                                className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Preview SEO
                                            </button>
                                            <button
                                                onClick={handleSaveLanding}
                                                disabled={loading}
                                                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all disabled:opacity-50"
                                            >
                                                <Save className="w-4 h-4" />
                                                Guardar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* SEO Section */}
                                        <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <Search className="w-4 h-4 text-primary" />
                                                SEO & Meta Tags
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="block text-sm font-medium text-gray-400">Meta Title (Google)</label>
                                                        {selectedLanding.meta_title && (
                                                            <a
                                                                href={`https://www.google.com/search?q=${encodeURIComponent(selectedLanding.meta_title.replace(' | Engorilate', ''))}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                                            >
                                                                Ver competencia en Google <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={selectedLanding.meta_title || ''}
                                                        onChange={(e) => setSelectedLanding({ ...selectedLanding, meta_title: e.target.value })}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                        placeholder="Ej: Automatización de Peluquerías en Murcia | Engorilate"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Meta Description</label>
                                                    <textarea
                                                        value={selectedLanding.meta_description || ''}
                                                        onChange={(e) => setSelectedLanding({ ...selectedLanding, meta_description: e.target.value })}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-20"
                                                        placeholder="Descripción corta para los resultados de búsqueda..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hero Section */}
                                        <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-primary" />
                                                Sección Hero
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Título Principal (H1)</label>
                                                    <input
                                                        type="text"
                                                        value={selectedLanding.hero_title || ''}
                                                        onChange={(e) => setSelectedLanding({ ...selectedLanding, hero_title: e.target.value })}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Subtítulo</label>
                                                    <textarea
                                                        value={selectedLanding.hero_subtitle || ''}
                                                        onChange={(e) => setSelectedLanding({ ...selectedLanding, hero_subtitle: e.target.value })}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-20"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Local Context */}
                                        <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                Contexto Local
                                            </h3>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Texto Específico de la Zona</label>
                                                <textarea
                                                    value={selectedLanding.local_context || ''}
                                                    onChange={(e) => setSelectedLanding({ ...selectedLanding, local_context: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-32"
                                                    placeholder="Menciona barrios, problemas específicos de la ciudad, etc..."
                                                />
                                            </div>
                                        </div>

                                        {/* Visual Editor for Problems & Solutions */}
                                        <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 text-primary" />
                                                Problemas y Soluciones
                                            </h3>

                                            {/* Problems Editor */}
                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Problemas</label>
                                                <div className="space-y-2">
                                                    {(selectedLanding.problems || []).map((problem, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={problem}
                                                                onChange={(e) => {
                                                                    const newProblems = [...(selectedLanding.problems || [])];
                                                                    newProblems[index] = e.target.value;
                                                                    setSelectedLanding({ ...selectedLanding, problems: newProblems });
                                                                }}
                                                                className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                                placeholder="Describe un problema..."
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newProblems = selectedLanding.problems.filter((_, i) => i !== index);
                                                                    setSelectedLanding({ ...selectedLanding, problems: newProblems });
                                                                }}
                                                                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 rounded-lg transition-all"
                                                                title="Eliminar"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => {
                                                            const newProblems = [...(selectedLanding.problems || []), ''];
                                                            setSelectedLanding({ ...selectedLanding, problems: newProblems });
                                                        }}
                                                        className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded-lg transition-all"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Añadir Problema
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Solutions Editor */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Soluciones</label>
                                                <div className="space-y-2">
                                                    {(selectedLanding.solutions || []).map((solution, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={solution}
                                                                onChange={(e) => {
                                                                    const newSolutions = [...(selectedLanding.solutions || [])];
                                                                    newSolutions[index] = e.target.value;
                                                                    setSelectedLanding({ ...selectedLanding, solutions: newSolutions });
                                                                }}
                                                                className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                                placeholder="Describe una solución..."
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newSolutions = selectedLanding.solutions.filter((_, i) => i !== index);
                                                                    setSelectedLanding({ ...selectedLanding, solutions: newSolutions });
                                                                }}
                                                                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 rounded-lg transition-all"
                                                                title="Eliminar"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => {
                                                            const newSolutions = [...(selectedLanding.solutions || []), ''];
                                                            setSelectedLanding({ ...selectedLanding, solutions: newSolutions });
                                                        }}
                                                        className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded-lg transition-all"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Añadir Solución
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500 bg-[#222222] border border-white/30 rounded-2xl">
                                    Selecciona una página del menú para editarla
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Posts List */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                <div className="mb-4">
                                    <button
                                        onClick={handleCreateNew}
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3 rounded-lg transition-all mb-4"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Nuevo Post
                                    </button>

                                    <div className="relative mb-3">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Buscar..."
                                            className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                        />
                                    </div>

                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-primary focus:outline-none mb-3"
                                    >
                                        <option value="all">Todas las categorías</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>

                                    <div className="flex items-center justify-between mb-2">
                                        <button
                                            onClick={toggleSelectAll}
                                            className="text-xs text-primary hover:text-primary-hover transition-colors"
                                        >
                                            {selectedPostsForExport.length === filteredPosts.length && filteredPosts.length > 0
                                                ? 'Deseleccionar todos'
                                                : 'Seleccionar todos'}
                                        </button>
                                        {selectedPostsForExport.length > 0 && (
                                            <span className="text-xs text-gray-400">
                                                {selectedPostsForExport.length} seleccionados
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="max-h-[60vh] overflow-y-auto space-y-2">
                                    {loading && posts.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                                        </div>
                                    ) : (
                                        filteredPosts.map((post) => (
                                            <div
                                                key={post.id}
                                                className={`p-4 rounded-lg cursor-pointer transition-all ${selectedPost?.id === post.id
                                                    ? 'bg-primary/20 border border-primary/50'
                                                    : 'bg-black/30 border border-white/10 hover:border-white/30'
                                                    }`}
                                                onClick={() => handleSelectPost(post)}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedPostsForExport.includes(post.id)}
                                                            onChange={(e) => {
                                                                e.stopPropagation();
                                                                togglePostSelection(post.id);
                                                            }}
                                                            className="mt-1 w-4 h-4 rounded border-white/20 bg-black/30 text-primary focus:ring-primary focus:ring-offset-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-bold text-white truncate">{post.title}</h3>
                                                            <p className="text-xs text-gray-400 mt-1">{post.category}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(post.id);
                                                        }}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="lg:col-span-2">
                            {selectedPost ? (
                                <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-white">
                                            {selectedPost.id.toString().startsWith('new-') ? 'Crear Nuevo Post' : 'Editar Post'}
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            {saveStatus && (
                                                <span className="text-sm text-primary">{saveStatus}</span>
                                            )}
                                            {!selectedPost.id.toString().startsWith('new-') && (
                                                <button
                                                    onClick={handleDuplicate}
                                                    className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white hover:border-primary/50 transition-all"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                    Duplicar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setShowPreview(!showPreview)}
                                                className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white hover:border-primary/50 transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                                {showPreview ? 'Ocultar' : 'Ver'} Markdown
                                            </button>
                                            <button
                                                onClick={() => setShowBlogPreview(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Preview en Vivo
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                disabled={loading}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold rounded-lg transition-all disabled:opacity-50"
                                            >
                                                <Save className="w-4 h-4" />
                                                Guardar
                                            </button>
                                        </div>
                                    </div>

                                    {!showPreview ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                                                    <input
                                                        type="text"
                                                        value={editedTitle}
                                                        onChange={(e) => handleTitleChange(e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Slug</label>
                                                    <input
                                                        type="text"
                                                        value={editedSlug}
                                                        onChange={(e) => setEditedSlug(e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Categoría</label>
                                                    <select
                                                        value={editedCategory}
                                                        onChange={(e) => setEditedCategory(e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    >
                                                        {categories.map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Tiempo Lectura</label>
                                                    <input
                                                        type="text"
                                                        value={editedReadTime}
                                                        onChange={(e) => setEditedReadTime(e.target.value)}
                                                        placeholder="5 min"
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Ahorro</label>
                                                    <input
                                                        type="text"
                                                        value={editedSavings}
                                                        onChange={(e) => setEditedSavings(e.target.value)}
                                                        placeholder="10h/mes"
                                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Fecha Publicación</label>
                                                <input
                                                    type="date"
                                                    value={editedPublishDate}
                                                    onChange={(e) => setEditedPublishDate(e.target.value)}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                                                <textarea
                                                    value={editedExcerpt}
                                                    onChange={(e) => setEditedExcerpt(e.target.value)}
                                                    rows={2}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Meta Description (SEO)</label>
                                                <textarea
                                                    value={editedMetaDescription}
                                                    onChange={(e) => setEditedMetaDescription(e.target.value)}
                                                    rows={2}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Markdown Helpers</label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <button onClick={() => insertMarkdown('## ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50">H2</button>
                                                    <button onClick={() => insertMarkdown('### ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50">H3</button>
                                                    <button onClick={() => insertMarkdown('**', '**')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><Bold className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('> ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><Quote className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('- ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><List className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('1. ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><ListOrdered className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('[ ] ', '')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><CheckSquare className="w-4 h-4" /></button>
                                                    <button onClick={() => insertMarkdown('| Columna 1 | Columna 2 |\n|---|---|\n| ', ' |  |')} className="px-3 py-1 bg-black/30 border border-white/20 rounded text-white text-sm hover:border-primary/50"><Table className="w-4 h-4" /></button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Contenido (Markdown)</label>
                                                <textarea
                                                    id="content-editor"
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                    rows={18}
                                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm resize-none"
                                                    placeholder="Escribe tu contenido en Markdown..."
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-black/30 border border-white/20 rounded-lg p-6 max-h-[70vh] overflow-y-auto">
                                            <div className="mb-4 flex gap-2">
                                                <span className="px-3 py-1 bg-primary text-gray-900 text-xs font-bold rounded">Zero Humo</span>
                                                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded">{editedCategory}</span>
                                                <span className="px-3 py-1 bg-white/10 text-gray-400 text-xs rounded">{editedSavings}</span>
                                            </div>
                                            <h1 className="text-3xl font-bold text-white mb-4">{editedTitle}</h1>
                                            <p className="text-gray-400 italic mb-6">"{editedExcerpt}"</p>
                                            <div className="text-sm text-gray-500 mb-6">
                                                {editedReadTime} • {editedPublishDate}
                                            </div>
                                            <div className="prose prose-invert max-w-none">
                                                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                    {editedContent}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-[#222222] border border-white/30 rounded-2xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.9)] text-center">
                                    <Edit className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">Selecciona un post para editar o crea uno nuevo</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>



            {/* Live Blog Preview Modal */}
            <BlogPostPreview
                isOpen={showBlogPreview}
                onClose={() => setShowBlogPreview(false)}
                title={editedTitle}
                content={editedContent}
                category={editedCategory}
                publishDate={editedPublishDate}
                readTime={editedReadTime}
                savings={editedSavings}
            />
        </div >
    );
};

export default AdminPanel;
