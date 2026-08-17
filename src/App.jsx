import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import DataEnrichment from './pages/DataEnrichment';
import AppointmentSetting from './pages/AppointmentSetting';
import IntentData from './pages/IntentData';
import B2BLeadGeneration from './pages/B2BLeadGeneration';
import ThankYou from './pages/ThankYou';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';
import ChatBot from './pages/ChatBot';
import LeadPopup from './components/LeadPopup';

import FinanceIndustry from './pages/industries/FinanceIndustry';
import ManufacturingIndustry from './pages/industries/ManufacturingIndustry';
import SaaSIndustry from './pages/industries/SaaSIndustry';
import HealthcareIndustry from './pages/industries/HealthcareIndustry';
import TechnologyIndustry from './pages/industries/TechnologyIndustry';

function App() {
    return (
        <>
            <Layout>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/about" element={<Navigate to="/about-us" replace />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/demand-generation" element={<DemandGeneration />} />
                    <Route path="/exhibitors-data" element={<ExhibitorsData />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    {/* Service sub-pages */}
                    <Route path="/data-enrichment" element={<DataEnrichment />} />
                    <Route path="/appointment-setting" element={<AppointmentSetting />} />
                    <Route path="/intent-data" element={<IntentData />} />
                    <Route path="/b2b-lead-generation" element={<B2BLeadGeneration />} />

                    {/* Blog */}
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />

                    {/* Industry Pages */}
                    <Route path="/industries/finance" element={<FinanceIndustry />} />
                    <Route path="/industries/manufacturing" element={<ManufacturingIndustry />} />
                    <Route path="/industries/saas" element={<SaaSIndustry />} />
                    <Route path="/industries/healthcare" element={<HealthcareIndustry />} />
                    <Route path="/industries/technology" element={<TechnologyIndustry />} />

                    {/* Catch-all — anything not matched above lands here. React can't
                        return an actual HTTP 404 (SPA serves 200 for every path via the
                        nginx fallback), but this at least gives users a real page and
                        emits <meta name="prerender-status-code" content="404"> for
                        pre-render / rendertron style crawlers. */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
            {/* Rendered outside <Layout> so the chatbot's z-index isn't trapped
                inside the framer-motion stacking context that wraps <main>. */}
            <ChatBot />
            <LeadPopup />
        </>
    );
}

export default App;

