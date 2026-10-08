import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../../components/DancingChart';

const IMGS = {
    hero:     'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const challenges = [
    'High Customer Acquisition Costs (CAC)',
    'Long B2B Sales Cycles',
    'Competitive Software Markets',
    'Customer Retention Pressure',
    'Complex Buying Committees',
    'Demand for Personalized Engagement',
];

const organizations = [
    { icon: '👥', title: 'CRM Software Providers', desc: 'Reach businesses seeking customer relationship management solutions.' },
    { icon: '📈', title: 'Marketing Automation Platforms', desc: 'Connect with marketing leaders and digital transformation teams.' },
    { icon: '🧑‍💼', title: 'HR & Payroll Software Companies', desc: 'Generate opportunities among HR professionals and business owners.' },
    { icon: '🔒', title: 'Cybersecurity SaaS Providers', desc: 'Engage IT security leaders and technology decision-makers.' },
    { icon: '⚙️', title: 'ERP & Business Management Software Vendors', desc: 'Reach organizations looking to improve operations and productivity.' },
    { icon: '🤖', title: 'AI & Analytics Platforms', desc: 'Connect with companies investing in data-driven decision-making and automation.' },
];

const solutions = [
    { icon: '📢', title: 'Demand Generation', desc: 'Build awareness and create demand among businesses actively looking for software solutions.' },
    { icon: '🎯', title: 'B2B Lead Generation', desc: 'Generate qualified opportunities by connecting with software buyers and decision-makers.' },
    { icon: '🔍', title: 'Intent Data Solutions', desc: 'Identify organizations actively researching software solutions and SaaS platforms.' },
    { icon: '📄', title: 'Content Syndication', desc: 'Promote valuable content to targeted SaaS buyers and decision-makers.' },
    { icon: '📅', title: 'Appointment Setting', desc: 'Schedule meetings with qualified software buyers and business decision-makers.' },
    { icon: '🗃️', title: 'Data Enrichment', desc: 'Improve customer intelligence and enhance CRM performance.' },
];

const decisionMakers = [
    { group: 'Executive Leadership', items: ['CEOs', 'Founders', 'Managing Directors', 'Business Owners'] },
    { group: 'Technology Leaders', items: ['CIOs', 'CTOs', 'IT Directors', 'Technology Managers'] },
    { group: 'Business Operations', items: ['Operations Managers', 'Procurement Leaders', 'Digital Transformation Teams'] },
    { group: 'Marketing & Sales', items: ['CMOs', 'Marketing Directors', 'Sales Directors', 'Revenue Operations Leaders'] },
];

const faqs = [
    { q: 'Which SaaS companies do you support?', a: 'We work with CRM providers, marketing automation platforms, HR software companies, ERP vendors, cybersecurity providers, AI platforms, and other SaaS businesses.' },
    { q: 'Can you target specific software buyers?', a: 'Yes. Campaigns can be customized based on industry, company size, job title, technology usage, and geographic location.' },
    { q: 'How does intent data help SaaS companies?', a: 'Intent data identifies organizations actively researching software solutions, helping sales teams focus on high-potential opportunities.' },
    { q: 'Do you support global SaaS marketing campaigns?', a: 'Yes. We help SaaS companies engage prospects across multiple regions and international markets.' },
    { q: 'What services are available for SaaS companies?', a: 'Demand Generation, B2B Lead Generation, Intent Data, Content Syndication, Appointment Setting, and Data Enrichment.' },
];

const SaaSIndustry = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>SaaS Leads &amp; Contact Data | Datamarketics</title>
                <meta name="description" content="Connect with SaaS companies and decision-makers using targeted contact data, business email lists and prospecting solutions designed for sales growth." />
                <meta name="keywords" content="SaaS leads, SaaS database, B2B contact database, B2B email list, business email list" />
                <link rel="canonical" href="https://datamarketics.com/industries/saas" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="SaaS Demand Generation & B2B Lead Generation Services" />
                <meta property="og:description" content="Grow your SaaS pipeline with verified B2B data, demand generation, and intent-based marketing." />
                <meta property="og:url" content="https://datamarketics.com/industries/saas" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="SaaS Demand Generation & B2B Lead Generation Services" />
                <meta name="twitter:description" content="Grow your SaaS pipeline with verified B2B data, demand generation, and intent-based marketing." />
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="main-headding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <span className="services-eyebrow">SaaS Industry Solutions</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>SaaS Marketing Solutions for Scalable Growth</h1>
                                <div className="space16"></div>
                                <p>Helping SaaS Companies Generate More Qualified Leads and Customers. Accelerate growth through targeted demand generation and intent data.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Scale Your SaaS Business</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="hero-image hero-image-static" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <img className="img-fluid" src={IMGS.hero} alt="SaaS industry marketing solutions" style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13,115,119,0.22)', width: '100%', height: '420px', objectFit: 'cover' }} loading="eager" />
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
                                <h2>SaaS Industry Challenges</h2>
                                <div className="space16"></div>
                                <p>SaaS companies face unique challenges. Our marketing solutions are designed to address these and drive measurable business outcomes.</p>
                                <ul className="list">
                                    {challenges.map((c, i) => <li key={i}><span><i className="fa-solid fa-check"></i></span>{c}</li>)}
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Solve SaaS Challenges</Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section1} alt="SaaS industry challenges" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="line" label="SAAS GROWTH" />
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
                                <h2>SaaS Companies We Support</h2>
                                <div className="space16"></div>
                                <p>Whether you're a startup or an enterprise vendor, our solutions help you scale customer acquisition.</p>
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
                                <h2>Our SaaS Marketing Solutions</h2>
                                <div className="space16"></div>
                                <p>Data-driven approaches that enable SaaS companies to reach decision-makers and build predictable revenue pipelines.</p>
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
                                <h2>SaaS Decision-Makers We Help You Reach</h2>
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
                                <div className="image1"><img src={IMGS.section2} alt="SaaS marketing expertise" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="bars" label="PIPELINE GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Why Choose Data Marketics for SaaS Marketing?</h2>
                                <div className="space16"></div>
                                {[
                                    { t: 'SaaS Industry Expertise', d: 'Deep understanding of SaaS customer acquisition and growth strategies.' },
                                    { t: 'Verified Business Intelligence', d: 'Reliable data that helps reach the right prospects.' },
                                    { t: 'Customized Campaigns', d: 'Solutions tailored to your product, audience, and business goals.' },
                                    { t: 'Scalable Growth Programs', d: 'Support SaaS businesses at every stage of growth.' },
                                    { t: 'Performance-Focused Approach', d: 'Designed to generate measurable marketing and sales results.' },
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
                                <Link to="/contact" className="theme-btn2">Contact SaaS Experts</Link>
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
                                <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: 800, marginBottom: '16px' }}>Ready to Scale Your SaaS Business?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics helps SaaS companies generate qualified leads, engage software buyers, and accelerate revenue growth through data-driven marketing solutions.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaaSIndustry;
