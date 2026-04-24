import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Services from './pages/Services';
import DemandGeneration from './pages/DemandGeneration';
import ExhibitorsData from './pages/ExhibitorsData';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sitemap from './pages/Sitemap';

import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Layout>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/services" element={<Services />} />
                <Route path="/demand-generation" element={<DemandGeneration />} />
                <Route path="/exhibitors-data" element={<ExhibitorsData />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/sitemap" element={<Sitemap />} />
            </Routes>
        </Layout>
    );
}

export default App;
