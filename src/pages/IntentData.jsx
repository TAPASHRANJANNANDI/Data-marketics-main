import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../components/DancingChart';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import customIcon from '../assets/img/icons/about-page-sec-icon2.png';
import analyticsIcon from '../assets/img/icons/about-page-sec-icon3.png';
import { pageSchema } from '../data/schema';
import { RelatedPosts } from '../components/RelatedLinks';

const CORP_IMG = {
    hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const services = [
    {
        icon: strategyIcon,
        title: 'Buyer Intent Identification',
        desc: 'Identify organizations demonstrating active interest in specific topics, products, and services. Track research activity, content engagement, topic interest, and buying signals.',
    },
    {
        icon: customIcon,
        title: 'Account-Based Marketing Support',
        desc: 'Intent data enhances ABM initiatives by identifying accounts showing purchase intent, enabling better account prioritization, improved personalization, and higher engagement rates.',
    },
    {
        icon: analyticsIcon,
        title: 'Lead Scoring & Prioritization',
        desc: 'Intent signals help rank opportunities based on content consumption, website activity, research frequency, product interest, and engagement trends to maximize conversion potential.',
    },
];

const faqs = [
    { q: 'What is intent data?', a: 'Intent data is information that indicates a prospect\'s interest in specific products, services, or business topics based on online behavior and engagement patterns.' },
    { q: 'How does intent data improve lead generation?', a: 'Intent data helps identify prospects actively researching solutions, enabling more targeted and effective outreach.' },
    { q: 'Which industries benefit from intent data?', a: 'Technology, healthcare, SaaS, manufacturing, finance, and many other industries can benefit from intent-driven targeting.' },
    { q: 'Can intent data support account-based marketing?', a: 'Yes. Intent data helps prioritize target accounts and improve personalization within ABM programs.' },
    { q: 'How does intent data help sales teams?', a: 'Sales teams can focus on prospects showing buying intent, resulting in improved efficiency and higher conversion rates.' },
];

const IntentData = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Intent Data &amp; Buyer Insights | Data Marketics</title>
                <meta name="description" content="Identify businesses showing buying interest with intent data and buyer insights that help sales and marketing teams prioritize high-potential prospects." />
                <meta name="keywords" content="B2B intent data, intent data services, buyer intent data, B2B prospecting data, targeted B2B leads" />
                <link rel="canonical" href="https://datamarketics.com/intent-data" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Intent Data Solutions | Identify High-Intent B2B Buyers" />
                <meta property="og:description" content="Find prospects actively researching your solutions using Data Marketics' intent data services." />
                <meta property="og:url" content="https://datamarketics.com/intent-data" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Intent Data Solutions | Identify High-Intent B2B Buyers" />
                <meta name="twitter:description" content="Find prospects actively researching your solutions using Data Marketics' intent data services." />
                <script type="application/ld+json">{pageSchema('/intent-data', { faqs })}</script>
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
                                <span className="services-eyebrow">Intent Data Solutions</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '48px', lineHeight: '1.1' }}>
                                    Intent Data Solutions for Smarter B2B Prospecting
                                </h1>
                                <div className="space16"></div>
                                <p>Identify buyers before your competitors do. Uncover buyer intent signals that reveal which prospects are actively researching solutions and preparing to make purchasing decisions.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Discover In-Market Buyers</Link>
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
                                    alt="Intent data solutions identifying in-market B2B buyers"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is Intent Data */}
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
                                <h2>What is Intent Data?</h2>
                                <div className="space16"></div>
                                <p>Intent data is information that indicates a prospect's interest in specific products, services, or business solutions. It is gathered through online activities such as content consumption, research behavior, website visits, and engagement patterns.</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Discover Active Buyers</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Prioritize Sales Opportunities</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Improve Campaign Targeting</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Accelerate Revenue Growth</li>
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Get Started</Link>
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
                                    <img src={CORP_IMG.section1} alt="Intent data buyer signals analytics" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="line" label="BUYER INTENT" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Solutions */}
            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Our Intent Data Solutions</h2>
                                <div className="space16"></div>
                                <p>From identifying in-market buyers and supporting ABM programs to advanced lead scoring — our intent data solutions provide the intelligence needed to engage prospects at the perfect moment.</p>
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
                                    <img src={CORP_IMG.section2} alt="Intent data campaign targeting" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="bars" label="CONVERSION RATE" />
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
                                        <div className="icon"><img src={s.icon} alt={s.title} loading="lazy" /></div>
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
                                <h2>Key Benefits of Intent Data Solutions</h2>
                                <div className="space16"></div>
                                <p>Organizations that leverage intent data can gain a competitive advantage by engaging prospects before competitors establish relationships.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {[
                            { icon: '🔮', title: 'Identify In-Market Buyers', desc: 'Spot buyers actively researching your products before they contact competitors.' },
                            { icon: '⚡', title: 'Improve Sales Efficiency', desc: 'Focus time and resources on prospects with the highest purchase intent.' },
                            { icon: '📈', title: 'Increase Conversion Rates', desc: 'Engage buyers at the right time with the right message for higher conversions.' },
                            { icon: '🎯', title: 'Enhance Lead Quality', desc: 'Prioritize leads based on actual buying signals rather than just demographics.' },
                            { icon: '⏰', title: 'Shorten Sales Cycles', desc: 'Engage buyers earlier in their research phase to reduce time-to-close.' },
                            { icon: '💰', title: 'Improve Marketing ROI', desc: 'Allocate budget toward audiences actively looking for solutions like yours.' },
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
                                <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Ready to Discover Your Next Best Customers?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics Intent Data Solutions help businesses uncover buyer intent signals and engage decision-makers at the right time.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts that cover this service, so the blog and the
                service pages link to each other in both directions. */}
            <RelatedPosts service="/intent-data" />
        </>
    );
};

export default IntentData;
