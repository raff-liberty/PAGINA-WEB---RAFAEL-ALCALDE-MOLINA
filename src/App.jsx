import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkMethod from './pages/WorkMethod';
import WhyThisWorks from './pages/WhyThisWorks';
import About from './pages/About';
import Services from './pages/Services';
import WhatsAppBooking from './pages/WhatsAppBooking';
import WebDevelopment from './pages/WebDevelopment';
import LocalSeo from './pages/LocalSeo';
import CustomManagement from './pages/CustomManagement';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Locations from './pages/Locations';
import LocationPage from './pages/LocationPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SectorLocationPage from './pages/SectorLocationPage_v2';
import SectorsDirectory from './pages/SectorsDirectory';
import AdminPanel from './pages/AdminPanel';
import Diagnosis from './pages/Diagnosis';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import FloatingChat from './components/FloatingChat';
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
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/como-trabajamos" element={<WorkMethod />} />
                            <Route path="/por-que-funciona" element={<WhyThisWorks />} />
                            <Route path="/sobre-mi" element={<About />} />
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
                            <Route path="/autopsia" element={<Diagnosis />} />
                            <Route path="/:sector/:location" element={<SectorLocationPage />} />
                        </Routes>
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
