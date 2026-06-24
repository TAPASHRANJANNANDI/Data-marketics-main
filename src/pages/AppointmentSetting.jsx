import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../components/DancingChart';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import customIcon from '../assets/img/icons/about-page-sec-icon2.png';
import analyticsIcon from '../assets/img/icons/about-page-sec-icon3.png';

const CORP_IMG = {
    hero: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const services = [
    {
        icon: strategyIcon,
        title: 'Prospect Research & Targeting',
        desc: 'We identify prospects that align with your ideal customer profile using advanced audience intelligence. Target by industry, company size, revenue, job function, decision-maker role, and geography.',
    },
    {
        icon: customIcon,
        title: 'Multi-Channel Outreach',
        desc: 'Our appointment setting programs utilize email outreach, phone outreach, LinkedIn engagement, personalized messaging, and follow-up campaigns to improve response rates.',
    },
    {
        icon: analyticsIcon,
        title: 'Lead Qualification & Scheduling',
        desc: 'Prospects are evaluated on business need, budget alignment, decision-making authority, purchase interest, and timing before being connected with your sales team.',
    },
];

const faqs = [
    { q: 'What is appointment setting?', a: 'Appointment setting is the process of identifying qualified prospects and scheduling meetings between potential customers and sales representatives.' },
    { q: 'How do you qualify prospects?', a: 'Prospects are evaluated based on business fit, interest level, decision-making authority, and other qualification criteria.' },
    { q: 'Which industries do you support?', a: 'We support technology, healthcare, SaaS, manufacturing, finance, and many other industries.' },
    { q: 'Can appointment setting improve sales performance?', a: 'Yes. Appointment setting helps sales teams focus on qualified opportunities and improves overall productivity.' },
    { q: 'Do you provide customized appointment setting programs?', a: 'Yes. Every campaign is tailored to your business goals and target audience.' },
];

const AppointmentSetting = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Appointment Setting Services | Connect with Qualified Decision-Makers</title>
                <meta name="description" content="Generate more sales opportunities with Data Marketics Appointment Setting Services. Connect with qualified decision-makers and accelerate your sales pipeline." />
                <link rel="canonical" href="https://datamarketics.com/appointment-setting" />
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
                                <span className="services-eyebrow">Appointment Setting Services</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '48px', lineHeight: '1.1' }}>
                                    Appointment Setting Services That Drive Meaningful Sales Conversations
                                </h1>
                                <div className="space16"></div>
                                <p>Turn prospects into qualified sales meetings. Connect your sales team directly with decision-makers who match your ideal customer profile, so they can focus on closing deals — not prospecting.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Schedule More Meetings</Link>
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
                                    alt="Appointment setting services connecting sales teams with decision-makers"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is Appointment Setting */}
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
                                <h2>What is Appointment Setting?</h2>
                                <div className="space16"></div>
                                <p>Appointment setting is a strategic sales development process that involves identifying qualified prospects, engaging them through targeted outreach, and scheduling meetings between potential customers and sales representatives.</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Increase Sales Opportunities</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Improve Lead Qualification</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Accelerate Revenue Growth</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Reduce Sales Prospecting Time</li>
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
                                    <img src={CORP_IMG.section1} alt="Appointment setting sales team" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="line" label="MEETINGS BOOKED" />
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
                                <h2>Our Appointment Setting Services</h2>
                                <div className="space16"></div>
                                <p>From prospect research and multi-channel outreach to lead qualification and meeting scheduling — our end-to-end appointment setting programs are designed to fill your sales calendar with qualified opportunities.</p>
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
                                    <img src={CORP_IMG.section2} alt="Business meetings and scheduling" loading="lazy" />
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
                                <h2>Key Benefits of Appointment Setting Services</h2>
                                <div className="space16"></div>
                                <p>By delivering sales-ready opportunities, businesses can focus resources where they generate the most value.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {[
                            { icon: '📅', title: 'More Qualified Meetings', desc: 'Connect with decision-makers who have genuine interest and authority to purchase.' },
                            { icon: '⚡', title: 'Better Sales Productivity', desc: 'Free your sales team from cold prospecting to focus on high-value conversations.' },
                            { icon: '📈', title: 'Improved Conversion Rates', desc: 'Pre-qualified meetings convert at higher rates than cold outreach.' },
                            { icon: '🔄', title: 'Faster Sales Cycles', desc: 'Engage buyers earlier in the process and move deals through the pipeline faster.' },
                            { icon: '💼', title: 'Stronger Sales Pipeline', desc: 'Build a consistent flow of qualified opportunities to drive predictable revenue.' },
                            { icon: '🌍', title: 'Increased Market Reach', desc: 'Access new segments and territories through our targeted outreach capabilities.' },
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
                                <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Ready to Schedule More Qualified Sales Meetings?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics Appointment Setting Services help businesses connect with decision-makers, generate qualified opportunities, and accelerate revenue growth.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentSetting;
