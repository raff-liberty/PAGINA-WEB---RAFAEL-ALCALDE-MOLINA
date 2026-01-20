import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Eye, Edit, Plus, Trash2, Lock, Search, Filter, BookOpen, BarChart3, Copy, Upload, Download, Globe, MapPin, Briefcase, CheckCircle, AlertCircle, ExternalLink, Target, Bold, Quote, List, ListOrdered, CheckSquare, Table, Users, User, Mail, FileText, Send, Calendar, Tag, MoreHorizontal, Bell, ClipboardList, DollarSign, Zap } from 'lucide-react';
import { fetchContacts, deleteContact, getContactStats } from '../lib/crm/contacts';
import { fetchDiagnoses } from '../lib/diagnoses';
import { fetchFullConfig } from '../lib/siteConfig';
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
import BillingDashboard from '../components/crm/BillingDashboard';
import DiagnosisList from '../components/crm/DiagnosisList';
import DiagnosisDetail from '../components/crm/DiagnosisDetail';
import LandingFileManager from '../components/LandingFileManager';

const AdminPanel = () => {
    const navigationTabs = [
        { id: 'editor', label: 'Blog', icon: Edit },
        { id: 'diagnoses', label: 'Diagnósticos', icon: ClipboardList },
        { id: 'crm', label: 'CRM', icon: Users },
        { id: 'billing', label: 'Facturación', icon: DollarSign },
        { id: 'landings', label: 'Landings SEO', icon: Globe },
        { id: 'sectors', label: 'Sectores', icon: Briefcase },
        { id: 'locations', label: 'Localizaciones', icon: MapPin },
        { id: 'images', label: 'Imágenes', icon: Upload },
        { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
        { id: 'guidelines', label: 'Línea Editorial', icon: BookOpen },
        { id: 'stats', label: 'Estadísticas', icon: ClipboardList },
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
        n8n_diagnosis_webhook: '',
        n8n_caos_webhook: '',
        n8n_email_webhook: '',
        og_image_url: 'https://engorilate.com/og-image.jpg',
        twitter_handle: '@engorilate',
        default_meta_title: 'Engorilate | Destruimos la Burocracia con Automatización Inteligente',
        default_meta_description: 'Si tu negocio depende de procesos manuales, estás perdiendo dinero. En Engorilate diseñamos ecosistemas de automatización que trabajan por ti. Recupera tu tiempo ahora.',
        default_keywords: 'automatización de negocios, eficiencia operativa, digitalización pymes, ahorro tiempo murcia, sistemas inteligentes',
        chat_embed_url: '',
        diagnosis_youtube_url: '',
        about_youtube_url: ''
    });
    const [companyConfig, setCompanyConfig] = useState({
        company_name: '',
        tax_id: '',
        fiscal_address: '',
        city: '',
        postal_code: '',
        country: 'España',
        bank_account_iban: '',
        bank_name: '',
        legal_text: '',
        payment_terms: ''
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
    const [unreadCount, setUnreadCount] = useState(0);

    // Diagnosis State
    const [diagnoses, setDiagnoses] = useState([]);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

    // Analytics State
    const [analyticsData, setAnalyticsData] = useState({
        summary: { sessions: 0, visitors: 0, views: 0, realTime: 0, conversionRate: 0, bounceRate: 0, avgPages: 0 },
        topPages: [],
        devices: [],
        browsers: [],
        countries: [],
        cities: [],
        events: [],
        trafficSources: [],
        funnelData: [],
        chartData: []
    });
    const [analyticsPeriod, setAnalyticsPeriod] = useState(7); // días
    const [analyticsFilters, setAnalyticsFilters] = useState({
        path: 'all',
        device: 'all',
        country: 'all',
        region: 'all',
        city: 'all'
    });
    const [filterOptions, setFilterOptions] = useState({
        paths: [],
        countries: [],
        regions: [],
        cities: [],
        devices: []
    });

    // Landing View State
    const [landingView, setLandingView] = useState('active'); // 'active' or 'explorer'
    const [landingTab, setLandingTab] = useState('seo'); // 'seo' or 'files'

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

    const fetchSiteConfig = async () => {
        try {
            const config = await fetchFullConfig();
            if (config) {
                setSiteConfig(prev => ({ ...prev, ...config }));
            }
        } catch (error) {
            console.error('Error fetching site config:', error);
        }
    };

    const fetchCompanyConfig = async () => {
        try {
            const { data, error } = await supabase
                .from('company_config')
                .select('*')
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data) {
                setCompanyConfig(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error('Error fetching company config:', error);
        }
    };

    // CRM Data Fetching Logic
    useEffect(() => {
        if (user) {
            fetchPosts();
            fetchSiteConfig();
            fetchCompanyConfig();
            fetchSEOData();
            fetchUnreadCount();
            if (activeTab === 'sectors') {
                fetchSectors();
            }
            if (activeTab === 'locations') {
                fetchLocations();
            }
            if (activeTab === 'diagnoses') {
                getDiagnoses();
            }
            if (activeTab === 'analytics') {
                fetchAnalytics();
            }
        }
    }, [user, activeTab, analyticsPeriod, analyticsFilters]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - analyticsPeriod);
            const startDateISO = startDate.toISOString();

            // --- 0. PRE-FETCH FILTER OPTIONS (Once or periodically) ---
            const [allPathsRes, allCountriesRes] = await Promise.all([
                supabase.from('analytics_page_views').select('path').limit(150),
                supabase.from('analytics_sessions').select('country, region, city, device').limit(150)
            ]);

            if (allPathsRes.error) console.error('Error pre-fetching paths:', allPathsRes.error);
            if (allCountriesRes.error) console.error('Error pre-fetching geo data:', allCountriesRes.error);

            const uniquePaths = [...new Set(allPathsRes.data?.map(p => p.path) || [])].filter(Boolean);
            const uniqueCountries = [...new Set(allCountriesRes.data?.map(s => s.country) || [])].filter(Boolean);
            const uniqueRegions = [...new Set(allCountriesRes.data?.map(s => s.region) || [])].filter(Boolean);
            const uniqueCities = [...new Set(allCountriesRes.data?.map(s => s.city) || [])].filter(Boolean);
            const uniqueDevices = [...new Set(allCountriesRes.data?.map(s => s.device) || [])].filter(Boolean);

            setFilterOptions({
                paths: uniquePaths,
                countries: uniqueCountries,
                regions: uniqueRegions,
                cities: uniqueCities,
                devices: uniqueDevices
            });

            // --- 1. CORE FETCHING WITH FILTERS ---
            let sessionQuery = supabase.from('analytics_sessions').select('*').gte('created_at', startDateISO);
            let viewsQuery = supabase.from('analytics_page_views').select('*, analytics_sessions(*)').gte('created_at', startDateISO);
            let eventsQuery = supabase.from('analytics_events').select('*, analytics_sessions(*)').gte('created_at', startDateISO);

            // Apply Filters to Session Query
            if (analyticsFilters.device !== 'all') sessionQuery = sessionQuery.eq('device', analyticsFilters.device);
            if (analyticsFilters.country !== 'all') sessionQuery = sessionQuery.eq('country', analyticsFilters.country);
            if (analyticsFilters.region !== 'all') sessionQuery = sessionQuery.eq('region', analyticsFilters.region);
            if (analyticsFilters.city !== 'all') sessionQuery = sessionQuery.eq('city', analyticsFilters.city);

            // If path filter is on, we first need session IDs that visited that path
            let sessionIdsForPath = null;
            if (analyticsFilters.path !== 'all') {
                const { data: pathSessions, error: pathErr } = await supabase
                    .from('analytics_page_views')
                    .select('session_id')
                    .eq('path', analyticsFilters.path)
                    .gte('created_at', startDateISO);

                if (pathErr) console.error('Error fetching path sessions:', pathErr);

                sessionIdsForPath = [...new Set(pathSessions?.map(ps => ps.session_id) || [])];
                sessionQuery = sessionQuery.in('id', sessionIdsForPath);
            }

            const { data: sessions, error: sErr } = await sessionQuery;
            if (sErr) {
                console.error('Session query error:', sErr);
                setAnalyticsData(prev => ({ ...prev, summary: { ...prev.summary, sessions: 0, error: sErr.message } }));
            }
            const currentSessionIds = sessions?.map(s => s.id) || [];

            // Apply session filter to views and events
            if (currentSessionIds.length > 0) {
                viewsQuery = viewsQuery.in('session_id', currentSessionIds);
                eventsQuery = eventsQuery.in('session_id', currentSessionIds);
            } else if (analyticsFilters.device !== 'all' || analyticsFilters.country !== 'all' || analyticsFilters.path !== 'all') {
                // If filters are active but no sessions found, views and events should be empty
                viewsQuery = viewsQuery.in('session_id', ['none']);
                eventsQuery = eventsQuery.in('session_id', ['none']);
            }

            const { data: pageViews } = await viewsQuery;
            const { data: eventsData } = await eventsQuery;

            // 1.1 Summary Calculation
            const sessionsWithViews = {};
            pageViews?.forEach(pv => {
                if (!sessionsWithViews[pv.session_id]) sessionsWithViews[pv.session_id] = 0;
                sessionsWithViews[pv.session_id]++;
            });

            const totalSessions = sessions?.length || 0;
            const bouncers = Object.values(sessionsWithViews).filter(count => count === 1).length;
            const totalViews = pageViews?.length || 0;
            const completedDiagnoses = eventsData?.filter(e => e.event_name === 'diagnosis_complete').length || 0;

            const summary = {
                sessions: totalSessions,
                visitors: [...new Set(sessions?.map(s => s.visitor_id))].length,
                views: totalViews,
                realTime: sessions?.filter(s => new Date(s.updated_at) > new Date(Date.now() - 5 * 60 * 1000)).length || 0,
                conversionRate: totalSessions > 0 ? ((completedDiagnoses / totalSessions) * 100).toFixed(1) : 0,
                bounceRate: totalSessions > 0 ? ((bouncers / totalSessions) * 100).toFixed(1) : 0,
                avgPages: totalSessions > 0 ? (totalViews / totalSessions).toFixed(1) : 0
            };

            // 1.2 Top Pages Breakdown
            const pageCounts = {};
            pageViews?.forEach(pv => {
                pageCounts[pv.path] = (pageCounts[pv.path] || 0) + 1;
            });
            const topPages = Object.entries(pageCounts)
                .map(([path, count]) => ({ path, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 15);

            // 1.3 Geo Breakdown
            const countryCounts = {};
            const cityCounts = {};
            sessions?.forEach(s => {
                if (s.country) countryCounts[s.country] = (countryCounts[s.country] || 0) + 1;
                if (s.city) cityCounts[`${s.city}, ${s.country}`] = (cityCounts[`${s.city}, ${s.country}`] || 0) + 1;
            });

            // 1.4 Device & Browser & Daily
            const deviceCounts = {};
            const browserCounts = {};
            const dailyCounts = {};

            // Initialize all dates in the period with 0
            for (let i = 0; i <= analyticsPeriod; i++) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateKey = d.toISOString().split('T')[0];
                dailyCounts[dateKey] = 0;
            }

            sessions?.forEach(s => {
                deviceCounts[s.device] = (deviceCounts[s.device] || 0) + 1;
                browserCounts[s.browser] = (browserCounts[s.browser] || 0) + 1;
                const day = s.created_at?.split('T')[0];
                if (day && dailyCounts[day] !== undefined) {
                    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
                }
            });

            // 1.5 Events Breakdown
            const eventCounts = {};
            eventsData?.forEach(e => {
                eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
            });

            // 1.6 Traffic Sources
            const sourceCounts = {};
            sessions?.forEach(s => {
                let ref = s.referrer || 'Directo';
                if (ref.includes('google')) ref = 'Google Search';
                else if (ref.includes('instagram')) ref = 'Instagram';
                else if (ref.includes('linkedin')) ref = 'LinkedIn';
                else if (ref.includes('facebook')) ref = 'Facebook';
                else if (ref.includes('t.co')) ref = 'Twitter/X';
                else if (ref !== 'Directo') {
                    try {
                        const url = new URL(ref);
                        ref = url.hostname;
                    } catch (e) { }
                }
                sourceCounts[ref] = (sourceCounts[ref] || 0) + 1;
            });

            // 1.7 Diagnosis Funnel
            const funnelSteps = [
                { id: 'cta', label: 'Click CTA', event: 'diagnosis_cta_click' },
                { id: 'start', label: 'Inicio', event: 'diagnosis_start' },
                { id: 'module1', label: 'Paso 1', event: 'diagnosis_module_complete', filter: (e) => e.event_data?.module === 1 },
                { id: 'module2', label: 'Paso 2', event: 'diagnosis_module_complete', filter: (e) => e.event_data?.module === 2 },
                { id: 'leads', label: 'Formulario', event: 'diagnosis_leads_view' },
                { id: 'complete', label: 'Completado', event: 'diagnosis_complete' }
            ];

            const funnelData = funnelSteps.map(step => ({
                label: step.label,
                count: eventsData?.filter(e =>
                    e.event_name === step.event && (step.filter ? step.filter(e) : true)
                ).length || 0
            }));

            setAnalyticsData({
                summary,
                topPages,
                devices: Object.entries(deviceCounts).map(([name, value]) => ({ name, value })),
                browsers: Object.entries(browserCounts).map(([name, value]) => ({ name, value })),
                countries: Object.entries(countryCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10),
                cities: Object.entries(cityCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10),
                events: Object.entries(eventCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
                trafficSources: Object.entries(sourceCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
                funnelData,
                chartData: Object.entries(dailyCounts)
                    .map(([date, count]) => ({ date, count }))
                    .sort((a, b) => a.date.localeCompare(b.date))
            });

        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDiagnoses = async () => {
        setLoading(true);
        const { data } = await fetchDiagnoses();
        setDiagnoses(data || []);
        setLoading(false);
    };

    const fetchUnreadCount = async () => {
        // Ya no usamos contador de mensajes no leídos (ahora son interacciones)
        setUnreadCount(0);
    };

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
            // Ensure is_active is set (default to true for new landings)
            const dataToSave = {
                ...selectedLanding,
                id,
                is_active: selectedLanding.is_active !== undefined ? selectedLanding.is_active : true
            };

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

    const handleToggleLandingStatus = async (landingId, currentStatus) => {
        try {
            const { error } = await supabase
                .from('sector_location_content')
                .update({ is_active: !currentStatus })
                .eq('id', landingId);

            if (error) throw error;

            // Update local state
            setLandingPages(prev => prev.map(page =>
                page.id === landingId ? { ...page, is_active: !currentStatus } : page
            ));

            if (selectedLanding?.id === landingId) {
                setSelectedLanding(prev => ({ ...prev, is_active: !currentStatus }));
            }
        } catch (error) {
            console.error('Error toggling landing status:', error);
            alert('Error al cambiar el estado de la landing');
        }
    };

    const saveSiteConfig = async () => {
        setLoading(true);
        setSaveStatus('Guardando configuración...');

        try {
            // 1. Save Site Config (key/value)
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

            // 2. Save Company Config
            const { error: companyError } = await supabase
                .from('company_config')
                .upsert({
                    ...companyConfig,
                    updated_at: new Date().toISOString()
                });

            if (companyError) throw companyError;

            setSaveStatus('✓ Configuración guardada correctamente');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving config:', error);
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
                        {/* Notifications Bell */}
                        <button
                            onClick={() => { setActiveTab('crm'); setCrmTab('contacts'); }}
                            className="relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all min-w-[70px] h-20 mr-2 group"
                        >
                            <Bell className={`w-5 h-5 flex-shrink-0 ${unreadCount > 0 ? 'text-yellow-400' : 'text-gray-400 group-hover:text-white'}`} />
                            <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight text-gray-400 group-hover:text-white">Avisos</span>
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
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

                {activeTab === 'images' && (
                    <div className="bg-[#222222] border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Upload className="w-6 h-6 text-primary" />
                            Gestión de Imágenes
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Sube y gestiona las imágenes para redes sociales (RRSS), Open Graph y otros usos.
                        </p>
                        <ImageGallery
                            isOpen={true}
                            embedded={true}
                            onClose={() => { }}
                            onSelectImage={(url) => {
                                navigator.clipboard.writeText(url);
                                alert('URL copiada al portapapeles: ' + url);
                            }}
                        />
                    </div>
                )}

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

                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        {/* Filters & Header */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex bg-[#222222]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 w-fit">
                                    {[
                                        { id: 1, label: 'Hoy' },
                                        { id: 7, label: '7 días' },
                                        { id: 30, label: '30 días' },
                                        { id: 90, label: '90 días' }
                                    ].map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => setAnalyticsPeriod(p.id)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${analyticsPeriod === p.id
                                                ? 'bg-primary text-gray-900'
                                                : 'text-gray-400 hover:text-white'}`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        const csvData = [
                                            ['Fecha', 'Sesiones', 'Vistas', 'Dispositivos', 'Páginas Top'].join(','),
                                            ...analyticsData.chartData.map(d => `${d.date},${d.count},${analyticsData.chartData.length > 0 ? (analyticsData.summary.views / analyticsData.chartData.length).toFixed(1) : 0},${analyticsData.devices.map(dev => dev.name).join('|')},${analyticsData.topPages.map(tp => tp.path).slice(0, 3).join('|')}`)
                                        ].join('\n');
                                        const blob = new Blob([csvData], { type: 'text/csv' });
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `analiticas-avanzadas-engorilate-${new Date().toISOString().split('T')[0]}.csv`;
                                        a.click();
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-lg transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Exportar Informe Completo
                                </button>
                            </div>

                            {/* Advanced Filters Bar */}
                            <div className="bg-[#222222] border border-white/10 p-4 rounded-xl flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mr-2">
                                    <Filter className="w-4 h-4 text-primary" /> Filtros:
                                </div>

                                <div className="flex-1 flex flex-wrap gap-4">
                                    <div className="flex flex-col gap-1 min-w-[150px]">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">Página</span>
                                        <select
                                            value={analyticsFilters.path}
                                            onChange={(e) => setAnalyticsFilters({ ...analyticsFilters, path: e.target.value })}
                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                                        >
                                            <option value="all">Todas las páginas</option>
                                            {filterOptions.paths.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-[150px]">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">País</span>
                                        <select
                                            value={analyticsFilters.country}
                                            onChange={(e) => setAnalyticsFilters({ ...analyticsFilters, country: e.target.value })}
                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                                        >
                                            <option value="all">Todos los países</option>
                                            {filterOptions.countries.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-[150px]">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">CC.AA. / Región</span>
                                        <select
                                            value={analyticsFilters.region}
                                            onChange={(e) => setAnalyticsFilters({ ...analyticsFilters, region: e.target.value })}
                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                                        >
                                            <option value="all">Todas las regiones</option>
                                            {filterOptions.regions.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-[150px]">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">Ciudad</span>
                                        <select
                                            value={analyticsFilters.city}
                                            onChange={(e) => setAnalyticsFilters({ ...analyticsFilters, city: e.target.value })}
                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                                        >
                                            <option value="all">Todas las ciudades</option>
                                            {filterOptions.cities.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-[150px]">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">Dispositivo</span>
                                        <select
                                            value={analyticsFilters.device}
                                            onChange={(e) => setAnalyticsFilters({ ...analyticsFilters, device: e.target.value })}
                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
                                        >
                                            <option value="all">Todos los dispositivos</option>
                                            {filterOptions.devices.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {(analyticsFilters.path !== 'all' || analyticsFilters.country !== 'all' || analyticsFilters.device !== 'all') && (
                                    <button
                                        onClick={() => setAnalyticsFilters({ path: 'all', country: 'all', device: 'all' })}
                                        className="text-xs text-red-400 hover:text-red-300 font-bold underline px-2"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { label: 'En Tiempo Real', value: analyticsData.summary.realTime, icon: Users, color: 'text-green-400', sub: 'Últimos 5 min' },
                                { label: 'Visitantes Únicos', value: analyticsData.summary.visitors, icon: User, color: 'text-primary' },
                                { label: 'Sesiones Totales', value: analyticsData.summary.sessions, icon: Target, color: 'text-blue-400' },
                                { label: 'Páginas Vistas', value: analyticsData.summary.views, icon: Eye, color: 'text-purple-400' },
                                { label: 'Tasa Conv.', value: `${analyticsData.summary.conversionRate}%`, icon: Zap, color: 'text-yellow-400' },
                                { label: 'Rebote', value: `${analyticsData.summary.bounceRate}%`, icon: AlertCircle, color: 'text-red-400' },
                                { label: 'Págs/Sesión', value: analyticsData.summary.avgPages, icon: FileText, color: 'text-orange-400' }
                            ].map((card, i) => (
                                <div key={i} className="bg-[#222222] border border-white/20 p-4 rounded-2xl shadow-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <card.icon className={`w-4 h-4 ${card.color}`} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{card.label}</span>
                                    </div>
                                    <div className={`text-xl font-black ${card.color}`}>{card.value}</div>
                                    {card.sub && <div className="text-[8px] text-gray-600 mt-1">{card.sub}</div>}
                                </div>
                            ))}
                        </div>

                        {/* Charts Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Traffic Chart */}
                            <div className="lg:col-span-2 bg-[#222222] border border-white/20 p-8 rounded-2xl shadow-xl">
                                <h3 className="text-white font-bold mb-8 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary" /> Evolución de Tráfico (Sesiones)
                                </h3>
                                <div className="h-48 flex items-end justify-between gap-1">
                                    {analyticsData.chartData.length > 0 ? (
                                        analyticsData.chartData.map((d, i) => {
                                            const max = Math.max(...analyticsData.chartData.map(cd => cd.count)) || 1;
                                            const height = (d.count / max) * 100;
                                            return (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                                                    <div
                                                        style={{ height: `${height}%` }}
                                                        className="w-full bg-primary/40 group-hover:bg-primary transition-all rounded-t-sm min-h-[4px]"
                                                    ></div>
                                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-bold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                        {d.date}: {d.count}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center text-gray-600 italic text-sm">Sin datos suficientes</div>
                                    )}
                                </div>
                                <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-500 uppercase">
                                    <span>{analyticsData.chartData[0]?.date || ''}</span>
                                    <span>{analyticsData.chartData[analyticsData.chartData.length - 1]?.date || ''}</span>
                                </div>
                            </div>

                            {/* Device & Events Info */}
                            <div className="space-y-6">
                                <div className="bg-[#222222] border border-white/20 p-6 rounded-2xl shadow-xl">
                                    <h3 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" /> Dispositivos
                                    </h3>
                                    <div className="space-y-3">
                                        {analyticsData.devices.map((d, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between text-xs font-bold">
                                                    <span className="text-gray-400">{d.name}</span>
                                                    <span className="text-white">{d.value}</span>
                                                </div>
                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        style={{ width: `${(d.value / (analyticsData.summary.sessions || 1)) * 100}%` }}
                                                        className="h-full bg-primary"
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Conversion Funnel */}
                                <div className="bg-[#222222] border border-white/20 p-6 rounded-2xl shadow-xl overflow-hidden">
                                    <h3 className="text-white font-bold mb-6 text-sm flex items-center gap-2">
                                        <Target className="w-4 h-4 text-primary" /> Embudo Diagnóstico
                                    </h3>
                                    <div className="space-y-4">
                                        {(analyticsData.funnelData || []).map((step, i) => {
                                            const prevCount = i > 0 ? analyticsData.funnelData[i - 1].count : step.count;
                                            const dropRate = prevCount > 0 ? ((1 - step.count / prevCount) * 100).toFixed(0) : 0;
                                            const maxCount = analyticsData.funnelData[0].count || 1;
                                            const barWidth = (step.count / maxCount) * 100;

                                            return (
                                                <div key={i} className="relative group">
                                                    <div className="flex justify-between items-center text-[10px] mb-1">
                                                        <span className="text-gray-400 font-bold uppercase tracking-tighter">{step.label}</span>
                                                        <div className="flex items-center gap-2">
                                                            {i > 0 && step.count < prevCount && (
                                                                <span className="text-red-400 text-[8px] font-bold">-{dropRate}% fuga</span>
                                                            )}
                                                            <span className="text-white font-black">{step.count}</span>
                                                        </div>
                                                    </div>
                                                    <div className="h-4 bg-white/5 rounded-sm overflow-hidden border border-white/5">
                                                        <div
                                                            style={{ width: `${barWidth}%` }}
                                                            className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-primary' : i === (analyticsData.funnelData.length - 1) ? 'bg-green-500' : 'bg-primary/40'}`}
                                                        />
                                                    </div>
                                                    {i < (analyticsData.funnelData.length - 1) && (
                                                        <div className="flex justify-center -my-1 relative z-10">
                                                            <div className="w-0.5 h-2 bg-white/10" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Traffic Sources */}
                                <div className="bg-[#222222] border border-white/20 p-6 rounded-2xl shadow-xl">
                                    <h3 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" /> Origen del Tráfico
                                    </h3>
                                    <div className="space-y-3">
                                        {(analyticsData.trafficSources || []).map((s, i) => {
                                            const percentage = ((s.value / (analyticsData.summary.sessions || 1)) * 100).toFixed(1);
                                            return (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between text-[10px] font-bold">
                                                        <span className="text-gray-400 truncate max-w-[120px]">{s.name}</span>
                                                        <span className="text-white">{s.value} <span className="text-gray-600 ml-1">({percentage}%)</span></span>
                                                    </div>
                                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            style={{ width: `${percentage}%` }}
                                                            className="h-full bg-primary/60"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Geo & Detailed Tables */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Top Pages Table */}
                            <div className="bg-[#222222] border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <h3 className="text-white font-bold flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-primary" /> Páginas con más Vistas
                                    </h3>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    <table className="w-full text-left">
                                        <thead className="sticky top-0 bg-[#222222] z-10">
                                            <tr className="bg-white/5">
                                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-tighter text-gray-400">Página / URL</th>
                                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-tighter text-gray-400 text-right">Vistas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {analyticsData.topPages.map((p, i) => (
                                                <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-mono text-gray-300 group-hover:text-primary transition-colors truncate max-w-[200px]">{p.path}</span>
                                                            <a href={p.path} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <ExternalLink className="w-3 h-3 text-gray-500 hover:text-white" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <span className="text-sm font-black text-white">{p.count}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Geo Analysis */}
                            <div className="bg-[#222222] border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <h3 className="text-white font-bold flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" /> Ubicaciones (Países y Ciudades)
                                    </h3>
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest border-b border-white/5 pb-2">Top Países</h4>
                                        <div className="space-y-3">
                                            {analyticsData.countries.map((c, i) => (
                                                <div key={i} className="flex flex-col gap-1">
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-gray-300">{c.name}</span>
                                                        <span className="text-white">{c.value}</span>
                                                    </div>
                                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            style={{ width: `${(c.value / (analyticsData.summary.sessions || 1)) * 100}%` }}
                                                            className="h-full bg-primary/60"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {analyticsData.countries.length === 0 && <p className="text-[10px] text-gray-600 italic">No hay datos geográficos</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest border-b border-white/5 pb-2">Top Ciudades</h4>
                                        <div className="space-y-2">
                                            {analyticsData.cities.map((c, i) => (
                                                <div key={i} className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-400 truncate max-w-[120px]">{c.name}</span>
                                                    <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black text-white">{c.value}</span>
                                                </div>
                                            ))}
                                            {analyticsData.cities.length === 0 && <p className="text-[10px] text-gray-600 italic">No hay datos de ciudades</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

                {activeTab === 'diagnoses' && (
                    <div className="flex gap-6 h-[calc(100vh-200px)]">
                        <div className="flex-1 min-w-0">
                            <DiagnosisList
                                diagnoses={diagnoses}
                                onSelect={(d) => setSelectedDiagnosis(d)}
                                selectedId={selectedDiagnosis?.id}
                            />
                        </div>
                        <AnimatePresence>
                            {selectedDiagnosis && (
                                <>
                                    {/* Backdrop */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setSelectedDiagnosis(null)}
                                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                                    />
                                    <div className="fixed inset-y-0 right-0 z-[100] w-full md:w-auto">
                                        <DiagnosisDetail
                                            diagnosis={selectedDiagnosis}
                                            onClose={() => setSelectedDiagnosis(null)}
                                        />
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
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
                                        onUpdate={() => {
                                            // Trigger refresh of background list if needed, but don't close
                                            setSelectedContact(selectedContact); // Just to trigger any state sync if necessary, though list handles its own refresh on mount/filters
                                        }}
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
                                        onUpdate={() => {
                                            // Keep open but allow background refresh logic if we add it later
                                        }}
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

                {activeTab === 'billing' && (
                    <BillingDashboard />
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
                                <label className="block text-sm font-medium text-gray-400 mb-2">n8n Diagnosis Webhook (Autopsia)</label>
                                <input
                                    type="text"
                                    value={siteConfig.n8n_diagnosis_webhook}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, n8n_diagnosis_webhook: e.target.value })}
                                    placeholder="https://tu-n8n.com/webhook/..."
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Webhook específico para procesar los Diagnósticos de la Autopsia con IA</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">n8n Caos Operativo Webhook</label>
                                <input
                                    type="text"
                                    value={siteConfig.n8n_caos_webhook}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, n8n_caos_webhook: e.target.value })}
                                    placeholder="https://tu-n8n.com/webhook/caos-operativo..."
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Webhook específico para la landing "El Caos Operativo Invisible" (descargas de PDF)</p>
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

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">n8n Email Webhook (Envío de Presupuestos)</label>
                                <input
                                    type="text"
                                    value={siteConfig.n8n_email_webhook}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, n8n_email_webhook: e.target.value })}
                                    placeholder="https://tu-n8n.com/webhook/send-email..."
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Webhook de n8n para enviar presupuestos por email con PDF adjunto (Gmail + Resend)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Video YouTube (Diagnóstico)</label>
                                <input
                                    type="text"
                                    value={siteConfig.diagnosis_youtube_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, diagnosis_youtube_url: e.target.value })}
                                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL del video de YouTube para mostrar en el bloque de advertencia de la página de Diagnóstico (formato embed)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Video YouTube (Sobre Mí)</label>
                                <input
                                    type="text"
                                    value={siteConfig.about_youtube_url}
                                    onChange={(e) => setSiteConfig({ ...siteConfig, about_youtube_url: e.target.value })}
                                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL del video de YouTube para mostrar en la sección "De dónde sale este enfoque" de la página Sobre Mí (formato embed)</p>
                            </div>

                            {/* YouTube URLs por Macrosegmento */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Videos YouTube por Sector (Hero Landings)
                                </h3>
                                <p className="text-sm text-gray-400 mb-6">
                                    Cada macrosegmento comparte el mismo video en todas sus landings. El video se mostrará con auto-play y máxima calidad.
                                </p>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Peluquerías y Estética</span>
                                            <span className="text-xs text-gray-600 ml-2">(peluquerías, estética)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_peluquerias || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_peluquerias: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Clínicas y Salud</span>
                                            <span className="text-xs text-gray-600 ml-2">(clínicas, fisioterapia, psicología, bienestar)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_clinicas || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_clinicas: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Academias y Formación</span>
                                            <span className="text-xs text-gray-600 ml-2">(academias, entrenadores)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_academias || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_academias: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Hostelería y Restauración</span>
                                            <span className="text-xs text-gray-600 ml-2">(restaurantes, hostelería, cafeterías, bares)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_hosteleria || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_hosteleria: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Servicios Técnicos</span>
                                            <span className="text-xs text-gray-600 ml-2">(talleres, servicios técnicos, instaladores, mantenimiento)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_servicios_tecnicos || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_servicios_tecnicos: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Retail y Comercio</span>
                                            <span className="text-xs text-gray-600 ml-2">(comercios, tiendas especializadas, negocios físicos)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_retail || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_retail: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            <span className="text-primary font-bold">Servicios Profesionales</span>
                                            <span className="text-xs text-gray-600 ml-2">(agencias, estudios diseño, arquitectos, interiorismo, consultores)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.youtube_servicios_profesionales || ''}
                                            onChange={(e) => setSiteConfig({ ...siteConfig, youtube_servicios_profesionales: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información Fiscal y de Empresa */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Información Fiscal y de Empresa (PDFs)
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Nombre Comercial / Razón Social</label>
                                        <input
                                            type="text"
                                            value={companyConfig.company_name}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, company_name: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">NIF / CIF</label>
                                        <input
                                            type="text"
                                            value={companyConfig.tax_id}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, tax_id: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Dirección Fiscal</label>
                                        <input
                                            type="text"
                                            value={companyConfig.fiscal_address}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, fiscal_address: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Ciudad</label>
                                        <input
                                            type="text"
                                            value={companyConfig.city}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, city: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Código Postal</label>
                                        <input
                                            type="text"
                                            value={companyConfig.postal_code}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, postal_code: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">IBAN (Cuenta Bancaria)</label>
                                        <input
                                            type="text"
                                            value={companyConfig.bank_account_iban}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, bank_account_iban: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Nombre del Banco</label>
                                        <input
                                            type="text"
                                            value={companyConfig.bank_name}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, bank_name: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Texto Legal / LOPD (Footer PDF)</label>
                                        <textarea
                                            value={companyConfig.legal_text}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, legal_text: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none h-24 text-xs"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Condiciones de Pago</label>
                                        <input
                                            type="text"
                                            value={companyConfig.payment_terms}
                                            onChange={(e) => setCompanyConfig({ ...companyConfig, payment_terms: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
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

                        {/* Image Gallery Modal */}
                        <ImageGallery
                            isOpen={showImageGallery}
                            onClose={() => setShowImageGallery(false)}
                            onSelectImage={(url) => {
                                setSiteConfig({ ...siteConfig, og_image_url: url });
                                setShowImageGallery(false);
                            }}
                            selectedUrl={siteConfig.og_image_url}
                        />
                    </div>
                )}

                {activeTab === 'growth' && (
                    <StrategicRoadmap />
                )}

                {activeTab === 'landings' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar: List of Pages */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#222222] border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)] h-[80vh] flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Landings</h2>
                                    <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                        <button
                                            onClick={() => setLandingView('active')}
                                            className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tighter transition-all ${landingView === 'active' ? 'bg-primary text-gray-900' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Activas
                                        </button>
                                        <button
                                            onClick={() => setLandingView('explorer')}
                                            className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tighter transition-all ${landingView === 'explorer' ? 'bg-primary text-gray-900' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Explorar
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                    {landingView === 'active' ? (
                                        <div className="space-y-2">
                                            {landingPages.length === 0 ? (
                                                <p className="text-gray-500 text-sm italic text-center py-8">No hay landings publicadas aún</p>
                                            ) : (
                                                landingPages.map(page => (
                                                    <div key={page.id} className="w-full flex items-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedLanding(page)}
                                                            className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${selectedLanding?.id === page.id ? 'bg-primary text-gray-900 border border-primary shadow-[0_4px_12px_rgba(224,255,0,0.2)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'}`}
                                                        >
                                                            <div>
                                                                <div className="text-[10px] font-black uppercase tracking-tight opacity-70 mb-0.5">
                                                                    {page.sector_slug || page.id.split('-')[0]}
                                                                </div>
                                                                <div className="text-sm font-bold truncate max-w-[120px]">
                                                                    {page.location_slug || page.id.split('-').slice(1).join('-')}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${page.is_active !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                                    }`}>
                                                                    {page.is_active !== false ? 'Activa' : 'Inactiva'}
                                                                </span>
                                                                <ExternalLink className={`w-3 h-3 ${selectedLanding?.id === page.id ? 'text-gray-900' : 'text-gray-600'}`} />
                                                            </div>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleToggleLandingStatus(page.id, page.is_active !== false);
                                                            }}
                                                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${page.is_active !== false
                                                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                                : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                                }`}
                                                            title={page.is_active !== false ? 'Desactivar' : 'Activar'}
                                                        >
                                                            {page.is_active !== false ? 'ON' : 'OFF'}
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    ) : (
                                        sectors.map(sector => (
                                            <div key={sector.id} className="mb-4">
                                                <h3 className="text-primary font-bold mb-2 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                                    <Briefcase className="w-3 h-3" />
                                                    {sector.name}
                                                </h3>
                                                <div className="space-y-1 pl-2 border-l border-white/5 ml-1">
                                                    {locations.map(location => {
                                                        const hasContent = getLandingStatus(sector.slug, location.slug);
                                                        const isSelected = selectedLanding?.sector_slug === sector.slug && selectedLanding?.location_slug === location.slug;

                                                        return (
                                                            <button
                                                                key={location.id}
                                                                onClick={() => handleSelectLanding(sector, location)}
                                                                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${isSelected ? 'bg-primary/20 text-white border border-primary/50' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                                                                    }`}
                                                            >
                                                                <span>{location.name}</span>
                                                                {hasContent ? (
                                                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                                                ) : (
                                                                    <div className="w-1 h-1 rounded-full bg-gray-700" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Editor: Form */}
                        <div className="lg:col-span-3">
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
        </div>
    );
};

export default AdminPanel;
