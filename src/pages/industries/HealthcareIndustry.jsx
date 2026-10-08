import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../../components/DancingChart';

const IMGS = {
    hero:     '/assets/industries/healthcare-hero.jpg',
    section1: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
    section2: '/assets/industries/healthcare-expertise.jpg',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const challenges = [
    'Complex Buying Processes',
    'Regulatory Requirements',
    'Long Sales Cycles',
    'Multiple Decision-Makers',
    'Increasing Competition',
    'Rapid Technology Adoption',
];

const organizations = [
    { icon: '💻', title: 'Healthcare Technology Companies', desc: 'Promote healthcare software, digital health platforms, and medical technology solutions.' },
    { icon: '🩺', title: 'Medical Device Manufacturers', desc: 'Connect with healthcare providers and procurement decision-makers.' },
    { icon: '🏥', title: 'Healthcare Service Providers', desc: 'Reach hospitals, clinics, healthcare networks, and medical professionals.' },
    { icon: '💊', title: 'Pharmaceutical Companies', desc: 'Engage healthcare organizations and professionals through targeted marketing programs.' },
    { icon: '📋', title: 'Healthcare Consulting Firms', desc: 'Generate opportunities among healthcare executives and operational leaders.' },
];

const solutions = [
    { icon: '📢', title: 'Demand Generation', desc: 'Create awareness and generate interest among healthcare professionals and decision-makers.' },
    { icon: '🎯', title: 'B2B Lead Generation', desc: 'Identify and engage healthcare prospects that match your ideal customer profile.' },
    { icon: '🔍', title: 'Intent Data Solutions', desc: 'Identify healthcare organizations actively researching products, services, and healthcare technologies.' },
    { icon: '📄', title: 'Content Syndication', desc: 'Distribute healthcare-focused content to targeted professional audiences.' },
    { icon: '📅', title: 'Appointment Setting', desc: 'Connect directly with healthcare decision-makers through qualified appointments and meetings.' },
    { icon: '🗃️', title: 'Data Enrichment', desc: 'Enhance healthcare databases with accurate organizational and contact information.' },
];

const decisionMakers = [
    { group: 'Executive Leadership', items: ['Hospital CEOs', 'Healthcare Executives', 'Medical Directors', 'Chief Medical Officers'] },
    { group: 'Operational Leadership', items: ['Healthcare Administrators', 'Practice Managers', 'Operations Directors', 'Department Heads'] },
    { group: 'Clinical Leadership', items: ['Physicians', 'Specialists', 'Nursing Directors', 'Clinical Managers'] },
    { group: 'Procurement & Technology', items: ['Procurement Officers', 'Healthcare IT Managers', 'Digital Transformation Leaders', 'Technology Buyers'] },
];

const faqs = [
    { q: 'Which healthcare organizations do you support?', a: 'We work with healthcare technology providers, medical device companies, healthcare services firms, pharmaceutical organizations, and healthcare consultants.' },
    { q: 'Can you target specific healthcare professionals?', a: 'Yes. Campaigns can be customized based on job role, specialty, organization type, and geographic location.' },
    { q: 'How does intent data benefit healthcare marketing?', a: 'Intent data helps identify healthcare organizations actively researching products and services, improving lead quality and targeting.' },
    { q: 'Do you support healthcare lead generation campaigns globally?', a: 'Yes. We help organizations engage healthcare audiences across local and international markets.' },
    { q: 'What healthcare marketing services do you provide?', a: 'Demand Generation, B2B Lead Generation, Intent Data, Content Syndication, Appointment Setting, and Data Enrichment.' },
];

const HealthcareIndustry = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Healthcare B2B Data &amp; Lead Generation Solutions</title>
                <meta name="description" content="Drive healthcare marketing success using accurate B2B data, intent insights, and demand generation." />
                <link rel="canonical" href="https://datamarketics.com/industries/healthcare" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Healthcare B2B Data & Lead Generation Solutions" />
                <meta property="og:description" content="Drive healthcare marketing success using accurate B2B data, intent insights, and demand generation." />
                <meta property="og:url" content="https://datamarketics.com/industries/healthcare" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Healthcare B2B Data & Lead Generation Solutions" />
                <meta name="twitter:description" content="Drive healthcare marketing success using accurate B2B data, intent insights, and demand generation." />
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="main-headding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <span className="services-eyebrow">Healthcare Industry Solutions</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>Healthcare Industry Marketing Solutions</h1>
                                <div className="space16"></div>
                                <p>Connecting Healthcare Organizations with the Right Decision-Makers. Generate qualified leads, build awareness, and engage healthcare professionals.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Get Healthcare Solutions</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="hero-image hero-image-static" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <img className="img-fluid" src={IMGS.hero} alt="Healthcare industry marketing solutions" style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13,115,119,0.22)', width: '100%', height: '420px', objectFit: 'cover' }} loading="eager" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Challenges */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} variants={fadeUp}>
                                <h2>Healthcare Industry Challenges</h2>
                                <div className="space16"></div>
                                <p>Healthcare organizations face several marketing and business development challenges. Our healthcare marketing solutions help overcome these.</p>
                                <ul className="list">
                                    {challenges.map((c, i) => <li key={i}><span><i className="fa-solid fa-check"></i></span>{c}</li>)}
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Solve Healthcare Challenges</Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section1} alt="Healthcare industry challenges" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="line" label="HEALTHCARE REACH" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Organizations */}
            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Healthcare Organizations We Support</h2>
                                <div className="space16"></div>
                                <p>We support a variety of healthcare organizations to reach their target audience.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4 justify-content-center">
                        {organizations.map((org, i) => (
                            <div className="col-md-6 col-lg-4" key={i}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ background: '#fff', borderRadius: '16px', padding: '28px 24px', border: '1px solid rgba(45,212,191,0.2)', boxShadow: '0 8px 24px rgba(13,115,119,0.08)', height: '100%' }}>
                                    <div style={{ fontSize: '36px', marginBottom: '14px' }}>{org.icon}</div>
                                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--dm-ink)' }}>{org.title}</h4>
                                    <p style={{ fontSize: '14px', color: 'var(--dm-muted)', margin: 0, lineHeight: 1.6 }}>{org.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Solutions */}
            <div className="about-page-area1 sp" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #ccfbf1 100%)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Our Healthcare Marketing Solutions</h2>
                                <div className="space16"></div>
                                <p>Data-driven strategies and verified business intelligence to help organizations reach the right audience.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {solutions.map((s, i) => (
                            <div className="col-md-6 col-lg-4" key={i}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ background: '#fff', borderRadius: '16px', padding: '28px 24px', border: '1px solid rgba(45,212,191,0.2)', boxShadow: '0 8px 24px rgba(13,115,119,0.08)', height: '100%' }}>
                                    <div style={{ fontSize: '36px', marginBottom: '14px' }}>{s.icon}</div>
                                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--dm-ink)' }}>{s.title}</h4>
                                    <p style={{ fontSize: '14px', color: 'var(--dm-muted)', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decision Makers */}
            <div className="about-page-area2 _relative sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Healthcare Decision-Makers We Help You Reach</h2>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {decisionMakers.map((dm, i) => (
                            <div className="col-md-6 col-lg-3" key={i}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(45,212,191,0.2)', boxShadow: '0 8px 24px rgba(13,115,119,0.08)' }}>
                                    <h5 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--dm-teal-700)', marginBottom: '14px' }}>{dm.group}</h5>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {dm.items.map((item, j) => (
                                            <li key={j} style={{ fontSize: '13px', color: 'var(--dm-ink-soft)', padding: '4px 0', borderBottom: j < dm.items.length - 1 ? '1px solid rgba(45,212,191,0.12)' : 'none' }}>
                                                <span style={{ color: 'var(--dm-teal-600)', marginRight: '8px' }}>✓</span>{item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: -20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section2} alt="Healthcare marketing expertise" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="bars" label="PIPELINE GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Why Choose Data Marketics for Healthcare Marketing?</h2>
                                <div className="space16"></div>
                                {[
                                    { t: 'Healthcare Industry Expertise', d: 'Understanding of healthcare buying processes and decision-making structures.' },
                                    { t: 'Accurate Business Intelligence', d: 'Verified healthcare data and decision-maker information.' },
                                    { t: 'Customized Campaigns', d: 'Marketing strategies tailored to healthcare audiences and objectives.' },
                                    { t: 'Multi-Channel Engagement', d: 'Reach healthcare professionals through multiple communication channels.' },
                                    { t: 'Results-Driven Approach', d: 'Focused on generating measurable business outcomes and qualified opportunities.' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--dm-grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: '14px', color: 'var(--dm-ink)', display: 'block' }}>{item.t}</strong>
                                            <span style={{ fontSize: '13px', color: 'var(--dm-muted)' }}>{item.d}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="space20"></div>
                                <Link to="/contact" className="theme-btn2">Contact Healthcare Experts</Link>
                            </motion.div>
                        </div>
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
                                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} style={{ background: '#fff', borderRadius: '14px', border: '1px solid rgba(45,212,191,0.18)', marginBottom: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(13,115,119,0.06)' }}>
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 700, fontSize: '15px', color: 'var(--dm-ink)', textAlign: 'left' }}>
                                        {faq.q}
                                        <span style={{ fontSize: '20px', color: 'var(--dm-teal-600)', flexShrink: 0, marginLeft: '12px', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                                    </button>
                                    {openFaq === i && <div style={{ padding: '0 20px 18px', fontSize: '14px', color: 'var(--dm-muted)', lineHeight: 1.7 }}>{faq.a}</div>}
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
                                <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: 800, marginBottom: '16px' }}>Ready to Grow Your Healthcare Business?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics helps healthcare organizations generate qualified leads, engage healthcare decision-makers, and accelerate growth through targeted marketing solutions and accurate business intelligence.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthcareIndustry;
