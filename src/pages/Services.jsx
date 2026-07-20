import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DancingChart from '../components/DancingChart';
import corporateIndustry from '../assets/img/about/corporate_industry.png';
import icon1 from '../assets/img/icons/work5-icon1.png';
import icon2 from '../assets/img/icons/work5-icon2.png';
import icon3 from '../assets/img/icons/work5-icon3.png';
import icon4 from '../assets/img/icons/work5-icon4.png';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';

// Corporate stock imagery (Unsplash CDN) — used in the service tabs to show
// real business / data-team / analytics scenes instead of cartoon illustrations.
const CORPORATE_IMG = {
    hero: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',           // Team collaborating on a marketing strategy
    abmMain: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80',         // Team strategy / target accounts
    abmSub:  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',         // Analytics dashboard close-up
    contactMain: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=80',  // Business contact / handshake
    contactSub:  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',     // Office team collaborating
    demandMain: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',   // Laptop analytics charts
    demandSub:  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',      // Team reviewing marketing data
    eventMain: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80',    // Conference / trade-show floor
    eventSub:  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',    // Audience at event
};
const Services = () => {
    const [activeTab, setActiveTab] = useState('abm');

    const tabs = [
        { id: 'abm', name: 'Account-Based Marketing', icon: icon1 },
        { id: 'contact', name: 'Verified B2B Contact', icon: icon2 },
        { id: 'demand', name: 'Demand Generation', icon: icon3 },
        { id: 'event', name: 'Event & Exhibitor', icon: icon4 },
    ];

    const content = {
        abm: {
            title: 'Account-Based Marketing (ABM) Data Solutions',
            text: 'Target high-value accounts with precision using our Account-Based Marketing data services.',
            description: 'Our ABM solutions help businesses identify and engage decision-makers within their Ideal Customer Profile (ICP) using:',
            list: [
                'Firmographic targeting',
                'Technographic insights',
                'Buyer intent data',
                'Job-role-based contact lists',
                'Custom account segmentation'
            ],
            footer: 'Perfect for outbound sales teams focused on quality over quantity and personalized outreach strategies.',
            img1: CORPORATE_IMG.abmMain,
            chart: 'bars',
            chartLabel: 'ACCOUNT REACH'
        },
        contact: {
            title: 'Verified B2B Contact Intelligence',
            text: 'Fuel your sales pipeline with accurate and verified B2B contact data.',
            description: 'We provide:',
            list: [
                'Verified decision-maker contacts',
                'Industry-specific databases',
                'Email & phone verification',
                'GDPR-compliant data sourcing',
                'Updated business intelligence'
            ],
            footer: 'Our data enables businesses to reach prospects confidently and improve conversion rates.',
            img1: CORPORATE_IMG.contactMain,
            chart: 'donut',
            chartLabel: 'CONTACT QUALITY'
        },
        demand: {
            title: 'Demand Generation Support',
            text: 'Boost your marketing ROI with strategic demand generation solutions.',
            description: 'Our services include:',
            list: [
                'Lead nurturing support',
                'Audience targeting strategies',
                'Campaign data support',
                'Marketing-qualified lead (MQL) generation',
                'Performance-driven outreach planning'
            ],
            footer: 'We help businesses create predictable pipelines and scalable growth opportunities.',
            img1: CORPORATE_IMG.demandMain,
            chart: 'line',
            chartLabel: 'PIPELINE FLOW'
        },
        event: {
            title: 'Event & Exhibitor Intelligence',
            text: 'Maximize event marketing success with targeted event and exhibitor data.',
            description: 'We help you:',
            list: [
                'Identify relevant industry events',
                'Access exhibitor and attendee insights',
                'Target decision-makers before events',
                'Improve event outreach campaigns',
                'Generate qualified opportunities faster'
            ],
            footer: '',
            img1: CORPORATE_IMG.eventMain,
            chart: 'pulse',
            chartLabel: 'EVENT PULSE'
        }
    };

    return (
        <>
         <Helmet>
            <title>B2B Marketing Services | Demand Generation &amp; Lead Generation</title>
            <meta name="description" content="Discover Data Marketics' services including demand generation, lead generation, intent data, data enrichment, appointment setting, and content syndication." />
            <link rel="canonical" href="https://datamarketics.com/services" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="B2B Marketing Services | Demand Generation & Lead Generation" />
            <meta property="og:description" content="Discover Data Marketics' services including demand generation, lead generation, intent data, data enrichment, appointment setting, and content syndication." />
            <meta property="og:url" content="https://datamarketics.com/services" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="B2B Marketing Services | Demand Generation & Lead Generation" />
            <meta name="twitter:description" content="Discover Data Marketics' services including demand generation, lead generation, intent data, data enrichment, appointment setting, and content syndication." />
         </Helmet>
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1' }}>Our Core Services <br />Data-Driven B2B Marketing Solutions</h1>
                                <p>Fuel your revenue engine with precision-targeted data and demand-generation strategies. Data Marketics helps B2B organizations accelerate growth through insight-driven outreach, verified business intelligence, and performance-focused marketing solutions.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image hero-image-static">
                                <img
                                    className="img-fluid"
                                    src={CORPORATE_IMG.hero}
                                    alt="Corporate B2B data marketing services team"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="work5 sp services-white-area">
                <div className="services-bg-deco" aria-hidden="true">
                    <span className="bg-blob bg-blob-a"></span>
                    <span className="bg-blob bg-blob-b"></span>
                    <span className="bg-grid"></span>
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        className="row"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="col-lg-9 m-auto text-center">
                            <div className="headding4 pbmit-heading-subheading">
                                <span className="services-eyebrow">Our Services</span>
                                <h2>Data-Driven Solutions for B2B Growth</h2>
                                <p>We provide advanced data and marketing solutions designed to help sales and marketing teams connect with the right decision-makers, improve campaign performance, and generate high-quality leads.</p>
                                <div className="space16"></div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="space60"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="work5-tabs-all services-tabs-card">
                                <motion.ul
                                    className="nav nav-pills mb-3 services-tab-pill-row"
                                    role="tablist"
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    {tabs.map((tab, i) => (
                                        <motion.li
                                            className="nav-item"
                                            key={tab.id}
                                            role="presentation"
                                            initial={{ opacity: 0, y: 14 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                                        >
                                            <button
                                                className={`nav-link svc-tab ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => setActiveTab(tab.id)}
                                                type="button"
                                            >
                                                <span className="svc-tab-icon">
                                                    <img src={tab.icon} alt={tab.name} />
                                                </span>
                                                <span className="svc-tab-label">{tab.name}</span>
                                            </button>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                                <div className="tab-content">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            className="tab-pane show active"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="work-tab-body">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-6">
                                                        <motion.div
                                                            className="headding4"
                                                            initial={{ opacity: 0, x: -24 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                                        >
                                                            <h3>{content[activeTab].title}</h3>
                                                            <div className="space16"></div>
                                                            <p style={{ fontWeight: 'bold' }}>{content[activeTab].text}</p>
                                                            <div className="space16"></div>
                                                            <p>{content[activeTab].description}</p>
                                                            <ul className="list mt-3 mb-3">
                                                                {content[activeTab].list.map((item, idx) => (
                                                                    <motion.li
                                                                        key={idx}
                                                                        initial={{ opacity: 0, x: -16 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: 0.12 + idx * 0.08, duration: 0.4 }}
                                                                    >
                                                                        <i className="fa-regular fa-check"></i> {item}
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                            {content[activeTab].footer && <p>{content[activeTab].footer}</p>}
                                                        </motion.div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <motion.div
                                                            className="work4-images service-corporate-images"
                                                            initial={{ opacity: 0, scale: 0.92, x: 30 }}
                                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                        >
                                                            <div className="image1">
                                                                <img
                                                                    src={content[activeTab].img1}
                                                                    alt={`${content[activeTab].title} — corporate scene`}
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <motion.div
                                                                className="image2 image2-chart"
                                                                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                            >
                                                                <DancingChart
                                                                    variant={content[activeTab].chart}
                                                                    label={content[activeTab].chartLabel}
                                                                />
                                                            </motion.div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="why-choose-area sp" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="headding2 text-center">
                        <h2>Why Choose Data Marketics</h2>
                        <div className="space16"></div>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', color: '#555' }}>
                            Data Marketics is a trusted provider of data-driven marketing solutions helping businesses grow faster through actionable insights and reliable data.
                        </p>
                        <div className="space30"></div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-5 mb-4 mb-lg-0">
                            <img
                                src={corporateIndustry}
                                alt="Data Marketics corporate team driving B2B growth"
                                className="img-fluid"
                                style={{ borderRadius: '20px', boxShadow: '0 20px 50px rgba(13, 115, 119, 0.2)' }}
                                loading="lazy"
                            />
                        </div>
                        <div className="col-lg-7">
                            <ul className="custom-bullet-list" style={{ listStyleType: 'none', padding: 0 }}>
                                {[
                                    'High-quality verified data',
                                    'Customized targeting solutions',
                                    'Industry-focused intelligence',
                                    'Improved campaign performance',
                                    'Scalable B2B growth strategies'
                                ].map((feature, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        padding: '15px 25px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                        marginBottom: '12px',
                                        border: '1px solid #eaeaea'
                                    }}>
                                        <div style={{ backgroundColor: '#10b981', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', flexShrink: 0 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <span style={{ margin: 0, fontSize: '18px', color: '#1a1a1a', fontWeight: '600' }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="space30"></div>
                            <div className="text-center">
                                <p style={{ fontSize: '18px', fontWeight: '500', color: '#007bff', padding: '15px', backgroundColor: '#eef5ff', borderRadius: '8px', display: 'inline-block' }}>
                                    Founded six years ago, we continue helping companies expand their customer base and increase revenue with accurate, up-to-date business data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
