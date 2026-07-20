import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../components/DancingChart';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import customIcon from '../assets/img/icons/about-page-sec-icon2.png';
import analyticsIcon from '../assets/img/icons/about-page-sec-icon3.png';

const CORP_IMG = {
    hero: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const services = [
    {
        icon: strategyIcon,
        title: 'Target Audience Identification',
        desc: 'We help define your Ideal Customer Profile (ICP) by analyzing industry, company size, revenue, job title, and geographic location — ensuring outreach focuses on the most relevant prospects.',
    },
    {
        icon: customIcon,
        title: 'Verified Business Contact Data',
        desc: 'Access business email addresses, executive contact information, direct decision-maker contacts, company intelligence, and industry insights to reach the right audience with confidence.',
    },
    {
        icon: analyticsIcon,
        title: 'Multi-Channel Lead Generation',
        desc: 'Leverage email marketing, content marketing, social outreach, digital campaigns, intent-based targeting, and lead nurturing programs across multiple channels to maximize engagement.',
    },
];

const faqs = [
    { q: 'What is B2B lead generation?', a: 'B2B lead generation is the process of identifying and attracting businesses that may be interested in your products or services.' },
    { q: 'How do you qualify leads?', a: 'Leads are evaluated based on audience fit, engagement, business relevance, and buying intent.' },
    { q: 'Which industries do you support?', a: 'We support technology, healthcare, SaaS, manufacturing, finance, and many other industries.' },
    { q: 'Can campaigns be customized?', a: 'Yes. Every lead generation strategy is tailored to your business objectives and target audience.' },
    { q: 'How can lead generation improve sales performance?', a: 'Lead generation helps businesses connect with qualified prospects, improve conversion rates, and build a stronger sales pipeline.' },
];

const B2BLeadGeneration = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>B2B Lead Generation Services | Verified Sales Leads</title>
                <meta name="description" content="Reach verified decision-makers with targeted B2B lead generation services designed to improve sales conversions." />
                <link rel="canonical" href="https://datamarketics.com/b2b-lead-generation" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="B2B Lead Generation Services | Verified Sales Leads" />
                <meta property="og:description" content="Reach verified decision-makers with targeted B2B lead generation services designed to improve sales conversions." />
                <meta property="og:url" content="https://datamarketics.com/b2b-lead-generation" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="B2B Lead Generation Services | Verified Sales Leads" />
                <meta name="twitter:description" content="Reach verified decision-makers with targeted B2B lead generation services designed to improve sales conversions." />
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
                                <span className="services-eyebrow">B2B Lead Generation Services</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '48px', lineHeight: '1.1' }}>
                                    B2B Lead Generation Services That Drive Qualified Sales Opportunities
                                </h1>
                                <div className="space16"></div>
                                <p>Generate more qualified leads and accelerate revenue growth. Our data-driven approach connects businesses with decision-makers who are most likely to convert, building a predictable and scalable sales pipeline.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Generate More Leads</Link>
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
                                    alt="B2B lead generation services connecting decision-makers"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is B2B Lead Generation */}
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
                                <h2>What is B2B Lead Generation?</h2>
                                <div className="space16"></div>
                                <p>B2B lead generation is the process of identifying and attracting businesses that may be interested in your products or services. It involves finding potential customers, gathering relevant contact information, and nurturing relationships until prospects are ready to engage.</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Build a Stronger Sales Pipeline</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Improve Marketing Performance</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Increase Conversion Rates</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Reach Decision-Makers Faster</li>
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Start Generating Leads</Link>
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
                                    <img src={CORP_IMG.section1} alt="B2B lead generation strategy team" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="line" label="LEAD QUALITY" />
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
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Our B2B Lead Generation Services</h2>
                                <div className="space16"></div>
                                <p>From audience identification and verified contact data to multi-channel outreach and MQL delivery — our lead generation services are built to connect you with decision-makers who convert.</p>
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
                                    <img src={CORP_IMG.section2} alt="B2B lead generation outreach" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="bars" label="PIPELINE GROWTH" />
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
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Key Benefits of B2B Lead Generation</h2>
                                <div className="space16"></div>
                                <p>Organizations that invest in strategic lead generation are better positioned to identify opportunities and convert prospects into loyal customers.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {[
                            { icon: '🏆', title: 'Higher Quality Leads', desc: 'Connect with prospects that match your ideal customer criteria and are ready to engage.' },
                            { icon: '⚡', title: 'Improved Sales Productivity', desc: 'Reduce time spent on prospecting so your team can focus on closing deals.' },
                            { icon: '📈', title: 'Better Marketing ROI', desc: 'Target the right audience at the right time to maximize every marketing dollar.' },
                            { icon: '🚀', title: 'Faster Pipeline Growth', desc: 'Generate more opportunities and accelerate your path to revenue goals.' },
                            { icon: '🌍', title: 'Global Reach', desc: 'Access prospects across local, national, and international markets.' },
                            { icon: '🔄', title: 'Scalable Growth', desc: 'Support expansion into new markets and audience segments as you grow.' },
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
                                <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Ready to Generate More Qualified Leads?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Partner with Data Marketics and discover how our B2B lead generation services can help your organization reach decision-makers and accelerate revenue growth.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Experts Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default B2BLeadGeneration;
