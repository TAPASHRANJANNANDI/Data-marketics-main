import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../../components/DancingChart';
import { pageSchema } from '../../data/schema';

const IMGS = {
    hero:     '/assets/industries/manufacturing-hero.webp',
    section1: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const challenges = [
    'Long Sales Cycles',
    'Multiple Stakeholders in Buying Decisions',
    'Global Competition',
    'Supply Chain Complexity',
    'Evolving Technology Adoption',
    'Market Expansion Challenges',
];

const organizations = [
    { icon: '🏗️', title: 'Industrial Equipment Manufacturers', desc: 'Connect with businesses seeking machinery, equipment, and industrial solutions.' },
    { icon: '🚗', title: 'Automotive Manufacturers & Suppliers', desc: 'Reach procurement teams, operational leaders, and supply chain decision-makers.' },
    { icon: '⚡', title: 'Electronics Manufacturers', desc: 'Generate opportunities among technology buyers and industrial customers.' },
    { icon: '⚙️', title: 'Engineering & Industrial Service Providers', desc: 'Promote specialized services to manufacturing organizations and industrial businesses.' },
    { icon: '🤖', title: 'Industrial Automation Companies', desc: 'Reach organizations investing in smart manufacturing and Industry 4.0 technologies.' },
    { icon: '📦', title: 'Packaging & Materials Manufacturers', desc: 'Engage businesses seeking innovative packaging and material solutions.' },
];

const solutions = [
    { icon: '📈', title: 'Demand Generation', desc: 'Create awareness and generate demand among manufacturing buyers and decision-makers.' },
    { icon: '🎯', title: 'B2B Lead Generation', desc: 'Generate qualified manufacturing leads that match your ideal customer profile.' },
    { icon: '🔍', title: 'Intent Data Solutions', desc: 'Identify companies actively researching manufacturing products and industrial solutions.' },
    { icon: '📄', title: 'Content Syndication', desc: 'Distribute valuable content to manufacturing professionals and industry decision-makers.' },
    { icon: '📅', title: 'Appointment Setting', desc: 'Connect your sales team with qualified manufacturing prospects and buyers.' },
    { icon: '🗃️', title: 'Data Enrichment', desc: 'Improve customer intelligence with accurate manufacturing company and contact data.' },
];

const decisionMakers = [
    { group: 'Executive Leadership', items: ['CEOs', 'Managing Directors', 'Plant Owners', 'Business Leaders'] },
    { group: 'Operations & Production', items: ['Plant Managers', 'Operations Directors', 'Production Managers', 'Manufacturing Engineers'] },
    { group: 'Procurement & Supply Chain', items: ['Procurement Managers', 'Purchasing Directors', 'Supply Chain Executives', 'Vendor Management Teams'] },
    { group: 'Technical & Engineering', items: ['Engineering Directors', 'Product Development Leaders', 'Industrial Technology Specialists', 'Automation Managers'] },
];

const subIndustries = [
    'Automotive Manufacturing', 'Aerospace & Defense', 'Electronics Manufacturing',
    'Industrial Machinery', 'Chemicals & Materials', 'Food & Beverage Manufacturing',
    'Packaging & Printing', 'Industrial Automation', 'Construction Materials', 'Energy & Utilities Equipment',
];

const faqs = [
    { q: 'Which manufacturing sectors do you support?', a: 'We support industrial equipment, automotive, electronics, engineering, automation, packaging, chemicals, and many other manufacturing sectors.' },
    { q: 'Can you target specific manufacturing buyers?', a: 'Yes. Campaigns can be customized based on industry, company size, job title, revenue, and geographic location.' },
    { q: 'How does intent data help manufacturers?', a: 'Intent data helps identify organizations actively researching manufacturing products and solutions, improving lead quality and sales effectiveness.' },
    { q: 'Do you support international manufacturing campaigns?', a: 'Yes. We help manufacturers connect with buyers across multiple regions and global markets.' },
    { q: 'What services do you provide for manufacturing companies?', a: 'Demand Generation, B2B Lead Generation, Intent Data, Content Syndication, Appointment Setting, and Data Enrichment.' },
];

const ManufacturingIndustry = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Manufacturing Leads and Company Data | Data Marketics</title>
                <meta name="description" content="Find manufacturing companies and decision-makers using company data, contact information and targeted prospecting solutions for effective sales outreach." />
                <meta name="keywords" content="manufacturing leads, manufacturing database, manufacturing contact list, B2B contact database, B2B prospecting data" />
                <link rel="canonical" href="https://datamarketics.com/industries/manufacturing" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Manufacturing Lead Generation & B2B Data Solutions" />
                <meta property="og:description" content="Connect with manufacturing decision-makers through verified B2B data and targeted lead generation." />
                <meta property="og:url" content="https://datamarketics.com/industries/manufacturing" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Manufacturing Lead Generation & B2B Data Solutions" />
                <meta name="twitter:description" content="Connect with manufacturing decision-makers through verified B2B data and targeted lead generation." />
                <script type="application/ld+json">{pageSchema('/industries/manufacturing', { faqs })}</script>
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="main-headding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <span className="services-eyebrow">Manufacturing Industry Solutions</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>Manufacturing Marketing Solutions for Sustainable Business Growth</h1>
                                <div className="space16"></div>
                                <p>Helping Manufacturing Companies Reach the Right Buyers. Targeted B2B marketing for industrial, automotive, electronics, and engineering sectors.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Get Manufacturing Solutions</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="hero-image hero-image-static" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <img className="img-fluid" src={IMGS.hero} alt="Manufacturing industry marketing solutions" style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13,115,119,0.22)', width: '100%', height: '420px', objectFit: 'cover' }} loading="eager" fetchPriority="high" />
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
                                <h2>Manufacturing Industry Challenges</h2>
                                <div className="space16"></div>
                                <p>Manufacturing businesses face unique challenges. Our marketing strategies help businesses overcome these obstacles and generate measurable results.</p>
                                <ul className="list">
                                    {challenges.map((c, i) => <li key={i}><span><i className="fa-solid fa-check"></i></span>{c}</li>)}
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Solve Manufacturing Challenges</Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section1} alt="Manufacturing industry challenges" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="bars" label="MANUFACTURING LEADS" />
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
                                <h2>Manufacturing Companies We Support</h2>
                                <div className="space16"></div>
                                <p>We deliver targeted marketing programs for a wide range of manufacturing sectors and industrial organizations.</p>
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
                                <h2>Our Manufacturing Marketing Solutions</h2>
                                <div className="space16"></div>
                                <p>Comprehensive marketing solutions tailored for manufacturing organizations to reach industrial buyers and accelerate growth.</p>
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
                                <h2>Manufacturing Decision-Makers We Help You Reach</h2>
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

            {/* Sub Industries */}
            <div className="about-page-area1 sp" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #ccfbf1 100%)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Industries Within Manufacturing We Support</h2>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-3 justify-content-center">
                        {subIndustries.map((ind, i) => (
                            <div className="col-auto" key={i}>
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ background: '#fff', borderRadius: '999px', padding: '10px 22px', fontSize: '13px', fontWeight: 600, color: 'var(--dm-teal-700)', border: '1px solid rgba(45,212,191,0.3)', boxShadow: '0 4px 12px rgba(13,115,119,0.08)' }}>
                                    {ind}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose */}
            <div className="about-page-area2 _relative sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: -20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section2} alt="Manufacturing marketing expertise" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="line" label="PIPELINE GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Why Choose Data Marketics for Manufacturing Marketing?</h2>
                                <div className="space16"></div>
                                {[
                                    { t: 'Manufacturing Industry Expertise', d: 'Deep understanding of industrial buying processes and manufacturing markets.' },
                                    { t: 'Accurate Business Data', d: 'Verified manufacturing company information and decision-maker contacts.' },
                                    { t: 'Customized Marketing Programs', d: 'Solutions tailored to your products, target audience, and business goals.' },
                                    { t: 'Global Market Reach', d: 'Access manufacturing buyers across local and international markets.' },
                                    { t: 'Results-Oriented Approach', d: 'Focused on generating qualified leads and measurable business outcomes.' },
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
                                <Link to="/contact" className="theme-btn2">Contact Manufacturing Experts</Link>
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
                                <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: 800, marginBottom: '16px' }}>Ready to Grow Your Manufacturing Business?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics helps manufacturing companies generate qualified leads, engage industrial decision-makers, and accelerate business growth.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManufacturingIndustry;
