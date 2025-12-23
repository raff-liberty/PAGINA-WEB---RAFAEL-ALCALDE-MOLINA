import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkMethod from './pages/WorkMethod';
import WhyThisWorks from './pages/WhyThisWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Locations from './pages/Locations';
import LocationPage from './pages/LocationPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SectorLocationPage from './pages/SectorLocationPage';
import SectorsDirectory from './pages/SectorsDirectory';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
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
                        <Route path="/servicios" element={<Locations />} />
                        <Route path="/servicios/:location" element={<LocationPage />} />
                        <Route path="/sectores" element={<SectorsDirectory />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/:sector/:location" element={<SectorLocationPage />} />
                    </Routes>
                </main>
                <Footer />
                <CookieBanner />
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-full w-full">
                    <div className="scanline"></div>
                </div>
            </div>
        </Router>
    );
}

export default App;
