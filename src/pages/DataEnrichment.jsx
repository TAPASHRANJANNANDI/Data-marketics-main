import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../components/DancingChart';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import customIcon from '../assets/img/icons/about-page-sec-icon2.png';
import analyticsIcon from '../assets/img/icons/about-page-sec-icon3.png';
import { pageSchema } from '../data/schema';

const CORP_IMG = {
    hero: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const services = [
    {
        icon: strategyIcon, title: 'Contact Data Enrichment',
        desc: 'Enhance customer and prospect records with updated contact information including business emails, phone numbers, job titles, and decision-maker identification.',
    },
    {
        icon: customIcon, title: 'Firmographic Data Enhancement',
        desc: 'Gain deeper insights into organizations through comprehensive company information: industry, size, revenue range, employee count, and headquarters location.',
    },
    {
        icon: analyticsIcon, title: 'CRM Data Enhancement',
        desc: 'Strengthen the quality and usability of your CRM with improved record accuracy, better customer profiles, enhanced reporting, and increased sales efficiency.',
    },
];

const faqs = [
    { q: 'What is data enrichment?', a: 'Data enrichment is the process of enhancing existing records with additional business and customer information to improve accuracy and usability.' },
    { q: 'Why is data enrichment important?', a: 'Data enrichment improves targeting, personalization, customer insights, and marketing performance.' },
    { q: 'What types of data can be enriched?', a: 'Contact information, firmographic data, technographic insights, company details, and customer intelligence can all be enriched.' },
    { q: 'Can enriched data be integrated into CRM systems?', a: 'Yes. Enhanced data can be delivered in formats compatible with major CRM and marketing platforms.' },
    { q: 'Which industries benefit from data enrichment?', a: 'Technology, healthcare, SaaS, manufacturing, finance, and many other industries can benefit from enriched data solutions.' },
];

const DataEnrichment = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Data Enrichment Services | Datamarketics</title>
                <meta name="description" content="Improve company and contact records with data enrichment services that help update, complete and enhance prospect information for more effective sales outreach." />
                <meta name="keywords" content="B2B data enrichment, data enrichment services, B2B data services, B2B Company profile, company database with emails" />
                <link rel="canonical" href="https://datamarketics.com/data-enrichment" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Data Enrichment Services | Improve CRM Data Accuracy" />
                <meta property="og:description" content="Enhance your CRM with accurate and enriched B2B contact data to improve campaign performance." />
                <meta property="og:url" content="https://datamarketics.com/data-enrichment" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Data Enrichment Services | Improve CRM Data Accuracy" />
                <meta name="twitter:description" content="Enhance your CRM with accurate and enriched B2B contact data to improve campaign performance." />
                <script type="application/ld+json">{pageSchema('/data-enrichment', { faqs })}</script>
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="main-headding"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="services-eyebrow">Data Enrichment Services</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '48px', lineHeight: '1.1' }}>
                                    Data Enrichment Services for Accurate, Actionable Business Intelligence
                                </h1>
                                <div className="space16"></div>
                                <p>Transform incomplete data into business opportunities. Enhance existing records with accurate, updated, and relevant business information to improve targeting, personalize engagement, and make smarter decisions.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Get Started</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="hero-image hero-image-static"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <img
                                    className="img-fluid"
                                    src={CORP_IMG.hero}
                                    alt="Data enrichment services improving CRM data quality"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is Data Enrichment */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="headding2"
                                initial="hidden" whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={fadeUp}
                            >
                                <h2>What is Data Enrichment?</h2>
                                <div className="space16"></div>
                                <p>Data enrichment is the process of enhancing existing customer and prospect records by adding missing, updated, or additional information from trusted sources. The goal is to create a more complete and accurate view of customers, enabling businesses to make informed decisions.</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Contact Information Updates</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Firmographic & Technographic Data</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Industry, Revenue & Employee Info</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Job Titles, Roles & Geographic Data</li>
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Enrich Your Data</Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="work4-images service-corporate-images"
                                initial={{ opacity: 0, scale: 0.92, x: 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="image1">
                                    <img src={CORP_IMG.section1} alt="Data enrichment analytics dashboard" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <DancingChart variant="line" label="DATA ACCURACY" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Services */}
            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div
                                className="headding2"
                                initial="hidden" whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={fadeUp}
                            >
                                <h2>Our Data Enrichment Services</h2>
                                <div className="space16"></div>
                                <p>Comprehensive enrichment solutions designed to improve every aspect of your customer and prospect data — from contact accuracy to deep firmographic and technographic intelligence.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="work4-images service-corporate-images"
                                initial={{ opacity: 0, scale: 0.92, x: -20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="image1">
                                    <img src={CORP_IMG.section2} alt="Data enrichment process" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="bars" label="DATA QUALITY" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="about-page-boxs aligned-boxs"
                                initial="hidden" whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                            >
                                {services.map((s) => (
                                    <motion.div className="single-box" variants={fadeUp} key={s.title}>
                                        <div className="icon"><img src={s.icon} alt={s.title} /></div>
                                        <div className="space20"></div>
                                        <div className="headding2">
                                            <h3>{s.title}</h3>
                                            <div className="space10"></div>
                                            <p>{s.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits */}
            <div className="about-page-area1 sp" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #ccfbf1 100%)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div
                                className="headding2"
                                initial="hidden" whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={fadeUp}
                            >
                                <h2>Why Data Enrichment Matters</h2>
                                <div className="space16"></div>
                                <p>Businesses rely on accurate information to engage prospects and customers effectively. Incomplete or outdated data can negatively affect campaign performance, sales productivity, and customer experience.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {[
                            { icon: '🎯', title: 'Improved Data Accuracy', desc: 'Maintain clean, up-to-date records across all customer and prospect data.' },
                            { icon: '📊', title: 'Better Audience Segmentation', desc: 'Segment audiences more precisely based on enriched firmographic and behavioral data.' },
                            { icon: '✨', title: 'Enhanced Personalization', desc: 'Create highly personalized campaigns that resonate with each specific audience segment.' },
                            { icon: '🚀', title: 'Higher Lead Quality', desc: 'Focus sales efforts on leads that are more likely to convert into customers.' },
                            { icon: '💰', title: 'Increased Marketing ROI', desc: 'Reduce wasted spend by targeting the right people with the right message.' },
                            { icon: '📈', title: 'Improved CRM Performance', desc: 'Keep your CRM accurate, usable, and valuable for the entire sales team.' },
                        ].map((b, i) => (
                            <div className="col-md-6 col-lg-4" key={i}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    style={{
                                        background: '#fff',
                                        borderRadius: '16px',
                                        padding: '28px 24px',
                                        border: '1px solid rgba(45,212,191,0.2)',
                                        boxShadow: '0 8px 24px rgba(13,115,119,0.08)',
                                        height: '100%',
                                    }}
                                >
                                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{b.icon}</div>
                                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--dm-ink)' }}>{b.title}</h4>
                                    <p style={{ fontSize: '14px', color: 'var(--dm-muted)', margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="faq-area sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <motion.div className="headding2 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Frequently Asked Questions</h2>
                                <div className="space16"></div>
                            </motion.div>
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    style={{
                                        background: '#fff',
                                        borderRadius: '14px',
                                        border: '1px solid rgba(45,212,191,0.18)',
                                        marginBottom: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(13,115,119,0.06)',
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        style={{
                                            width: '100%',
                                            background: 'none',
                                            border: 'none',
                                            padding: '18px 20px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            color: 'var(--dm-ink)',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {faq.q}
                                        <span style={{ fontSize: '20px', color: 'var(--dm-teal-600)', flexShrink: 0, marginLeft: '12px', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                                    </button>
                                    {openFaq === i && (
                                        <div style={{ padding: '0 20px 18px', fontSize: '14px', color: 'var(--dm-muted)', lineHeight: 1.7 }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="cta-area" style={{ background: 'var(--dm-grad-dark)', padding: '80px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Ready to Improve Your Data Quality?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics Data Enrichment Services help businesses transform incomplete records into valuable business intelligence.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataEnrichment;
