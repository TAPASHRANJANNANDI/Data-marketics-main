import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../../components/DancingChart';

const IMGS = {
    hero:     'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1531297172864-fd15d50f1532?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const challenges = [
    'Long Sales Cycles',
    'Complex Buying Committees',
    'Highly Competitive Markets',
    'Rapid Technology Changes',
    'Increasing Customer Expectations',
    'Difficulty Reaching Decision-Makers',
];

const organizations = [
    { icon: '💻', title: 'Software Companies', desc: 'Promote software solutions and engage potential buyers actively seeking technology products.' },
    { icon: '☁️', title: 'SaaS Providers', desc: 'Generate qualified opportunities and accelerate customer acquisition.' },
    { icon: '🔒', title: 'Cybersecurity Companies', desc: 'Reach IT security leaders and decision-makers responsible for protecting business infrastructure.' },
    { icon: '🌐', title: 'Cloud Service Providers', desc: 'Connect with organizations evaluating cloud migration and digital transformation initiatives.' },
    { icon: '🤝', title: 'IT Services & Consulting Firms', desc: 'Generate awareness and identify businesses looking for technology expertise and support.' },
    { icon: '🧠', title: 'AI & Data Analytics Companies', desc: 'Reach organizations investing in artificial intelligence, machine learning, and business intelligence solutions.' },
];

const solutions = [
    { icon: '📢', title: 'Demand Generation', desc: 'Build awareness and generate interest among technology buyers through targeted campaigns and audience engagement strategies.' },
    { icon: '🎯', title: 'B2B Lead Generation', desc: 'Connect with decision-makers actively exploring technology solutions and business transformation initiatives.' },
    { icon: '🔍', title: 'Intent Data Solutions', desc: 'Identify organizations actively researching software, cloud services, cybersecurity solutions, and other technology products.' },
    { icon: '📄', title: 'Content Syndication', desc: 'Expand the reach of technology-focused content and generate qualified leads.' },
    { icon: '📅', title: 'Appointment Setting', desc: 'Connect your sales team directly with technology decision-makers and qualified prospects.' },
    { icon: '🗃️', title: 'Data Enrichment', desc: 'Improve customer intelligence with updated technology buyer information and business data.' },
];

const decisionMakers = [
    { group: 'Executive Leadership', items: ['Chief Information Officers (CIOs)', 'Chief Technology Officers (CTOs)', 'Chief Digital Officers (CDOs)'] },
    { group: 'IT Leadership', items: ['IT Directors', 'Infrastructure Managers', 'Network Administrators', 'Security Managers'] },
    { group: 'Business Decision-Makers', items: ['Operations Managers', 'Procurement Leaders', 'Digital Transformation Teams', 'Innovation Leaders'] },
];

const faqs = [
    { q: 'Which technology companies do you work with?', a: 'We support software providers, SaaS companies, cloud service providers, cybersecurity firms, IT consultants, and technology vendors.' },
    { q: 'Can you help target specific technology buyers?', a: 'Yes. Campaigns can be customized based on job role, industry, company size, technology usage, and geographic location.' },
    { q: 'How does intent data help technology companies?', a: 'Intent data identifies organizations actively researching technology solutions, helping sales teams focus on high-potential opportunities.' },
    { q: 'Do you support global technology campaigns?', a: 'Yes. We help organizations target technology buyers across multiple regions and international markets.' },
    { q: 'What services are available for technology companies?', a: 'Demand Generation, B2B Lead Generation, Intent Data, Content Syndication, Appointment Setting, and Data Enrichment.' },
];

const TechnologyIndustry = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Technology Industry Marketing Solutions | B2B Lead Generation for Tech Companies</title>
                <meta name="description" content="Accelerate growth with Data Marketics Technology Industry Solutions. Generate qualified leads, engage IT decision-makers, and drive demand for technology products and services." />
                <link rel="canonical" href="https://datamarketics.com/industries/technology" />
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="main-headding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <span className="services-eyebrow">Technology Industry Solutions</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>Technology Industry Marketing Solutions</h1>
                                <div className="space16"></div>
                                <p>Helping Technology Companies Generate Qualified Leads and Accelerate Growth. Connect with IT buyers, decision-makers, and business leaders.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Get Technology Solutions</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="hero-image hero-image-static" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <img className="img-fluid" src={IMGS.hero} alt="Technology industry marketing solutions" style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13,115,119,0.22)', width: '100%', height: '420px', objectFit: 'cover' }} loading="eager" />
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
                                <h2>Technology Marketing Challenges</h2>
                                <div className="space16"></div>
                                <p>Technology companies face unique marketing and sales challenges. Our solutions help overcome these challenges through targeted campaigns and accurate business intelligence.</p>
                                <ul className="list">
                                    {challenges.map((c, i) => <li key={i}><span><i className="fa-solid fa-check"></i></span>{c}</li>)}
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Overcome Tech Challenges</Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section1} alt="Technology industry challenges" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="line" label="TECH GROWTH" />
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
                                <h2>Technology Companies We Support</h2>
                                <div className="space16"></div>
                                <p>We work with organizations across the technology ecosystem to generate demand and improve lead quality.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
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
                                <h2>Our Technology Industry Solutions</h2>
                                <div className="space16"></div>
                                <p>Data-driven marketing solutions that generate demand, improve lead quality, and accelerate revenue growth.</p>
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
                                <h2>Technology Decision-Makers We Help You Reach</h2>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4 justify-content-center">
                        {decisionMakers.map((dm, i) => (
                            <div className="col-md-6 col-lg-4" key={i}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(45,212,191,0.2)', boxShadow: '0 8px 24px rgba(13,115,119,0.08)', height: '100%' }}>
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
                                <div className="image1"><img src={IMGS.section2} alt="Technology marketing expertise" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="bars" label="PIPELINE GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Why Choose Data Marketics for Technology Marketing?</h2>
                                <div className="space16"></div>
                                {[
                                    { t: 'Technology Industry Expertise', d: 'Deep understanding of technology markets and buyer behavior.' },
                                    { t: 'Verified Business Data', d: 'Reliable contact information and business intelligence.' },
                                    { t: 'Global Reach', d: 'Access technology buyers across local and international markets.' },
                                    { t: 'Customized Strategies', d: 'Tailored solutions aligned with your products, audience, and goals.' },
                                    { t: 'Measurable Results', d: 'Focused on generating qualified leads and improving marketing performance.' },
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
                                <Link to="/contact" className="theme-btn2">Contact Technology Experts</Link>
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
                                <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: 800, marginBottom: '16px' }}>Ready to Accelerate Technology Business Growth?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Partner with Data Marketics to connect with technology decision-makers, generate qualified opportunities, and drive measurable business results through data-driven marketing solutions.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TechnologyIndustry;
