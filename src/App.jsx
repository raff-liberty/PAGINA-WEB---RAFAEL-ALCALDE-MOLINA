import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CustomManagement from './pages/CustomManagement';
import Contact from './pages/Contact';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import FloatingChat from './components/FloatingChat';

// Lazy load non-critical routes
const WorkMethod = lazy(() => import('./pages/WorkMethod'));
const WhyThisWorks = lazy(() => import('./pages/WhyThisWorks'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const WhatsAppBooking = lazy(() => import('./pages/WhatsAppBooking'));
const WebDevelopment = lazy(() => import('./pages/WebDevelopment'));
const LocalSeo = lazy(() => import('./pages/LocalSeo'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Locations = lazy(() => import('./pages/Locations'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SectorLocationPage = lazy(() => import('./pages/SectorLocationPage_v2'));
const SectorsDirectory = lazy(() => import('./pages/SectorsDirectory'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Diagnosis = lazy(() => import('./pages/Diagnosis'));
const ChaosLanding = lazy(() => import('./pages/ChaosLanding'));
const SegmentLanding = lazy(() => import('./pages/SegmentLanding'));
const RafaelPortfolio = lazy(() => import('./pages/RafaelPortfolio'));
import { supabase } from './lib/supabaseClient';

import { useAnalytics } from './lib/useAnalytics';

console.log('Supabase Client Initialized:', !!supabase);

const AnalyticsTracker = () => {
    useAnalytics();
    return null;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AnalyticsTracker />
                <ScrollToTop />
                <div className="min-h-screen bg-background-dark">
                    <Navbar />
                    <main>
                        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/como-trabajamos" element={<WorkMethod />} />
                                <Route path="/por-que-funciona" element={<WhyThisWorks />} />
                                <Route path="/sobre-mi" element={<RafaelPortfolio />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/legal" element={<Legal />} />
                                <Route path="/privacidad" element={<Privacy />} />
                                <Route path="/cookies" element={<Cookies />} />
                                <Route path="/servicios" element={<Services />} />
                                <Route path="/servicios/automatizacion-whatsapp" element={<WhatsAppBooking />} />
                                <Route path="/servicios/desarrollo-web-medida" element={<WebDevelopment />} />
                                <Route path="/servicios/seo-local-estrategia" element={<LocalSeo />} />
                                <Route path="/servicios/sistemas-gestion-personalizados" element={<CustomManagement />} />
                                <Route path="/donde-trabajamos" element={<Locations />} />
                                <Route path="/servicios/:location" element={<LocationPage />} />
                                <Route path="/sectores" element={<SectorsDirectory />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:slug" element={<BlogPost />} />
                                <Route path="/admin" element={<AdminPanel />} />
                                <Route path="/diagnostico" element={<Diagnosis />} />
                                <Route path="/caos-operativo" element={<ChaosLanding />} />
                                <Route path="/segmentos/:segmentId" element={<SegmentLanding />} />
                                <Route path="/rafael-alcalde-molina" element={<RafaelPortfolio />} />
                                <Route path="/:sector" element={<SectorLocationPage />} />
                                <Route path="/:sector/:location" element={<SectorLocationPage />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                    <CookieBanner />
                    <FloatingChat />
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-full w-full">
                        <div className="scanline"></div>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
