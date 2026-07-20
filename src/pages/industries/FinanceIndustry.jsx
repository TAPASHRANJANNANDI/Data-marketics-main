import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../../components/DancingChart';

const IMGS = {
    hero:     'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80',
    section1: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    section2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const challenges = [
    'Intense Market Competition',
    'Regulatory Compliance Requirements',
    'Long Buying Cycles',
    'Complex Decision-Making Processes',
    'Digital Transformation Initiatives',
    'Customer Acquisition Costs',
];

const organizations = [
    { icon: '🏦', title: 'Banking Institutions', desc: 'Generate opportunities with business banking and corporate finance decision-makers.' },
    { icon: '💳', title: 'FinTech Companies', desc: 'Reach organizations seeking innovative financial technology solutions.' },
    { icon: '🛡️', title: 'Insurance Providers', desc: 'Connect with businesses and professionals evaluating insurance products and services.' },
    { icon: '📊', title: 'Investment Firms', desc: 'Engage investors, financial advisors, and wealth management professionals.' },
    { icon: '💼', title: 'Financial Consulting Companies', desc: 'Promote advisory services to business leaders and financial executives.' },
    { icon: '💰', title: 'Payment Solution Providers', desc: 'Reach organizations looking for payment processing and financial technology services.' },
];

const solutions = [
    { icon: '📈', title: 'Demand Generation', desc: 'Build awareness and create demand among financial professionals and business decision-makers.' },
    { icon: '🎯', title: 'B2B Lead Generation', desc: 'Generate qualified financial services leads through targeted outreach and audience segmentation.' },
    { icon: '🔍', title: 'Intent Data Solutions', desc: 'Identify organizations actively researching financial products, services, and technology solutions.' },
    { icon: '📄', title: 'Content Syndication', desc: 'Distribute valuable financial content to targeted audiences and decision-makers.' },
    { icon: '📅', title: 'Appointment Setting', desc: 'Connect your sales team directly with qualified financial decision-makers.' },
    { icon: '🗃️', title: 'Data Enrichment', desc: 'Enhance customer intelligence and improve the quality of financial databases.' },
];

const decisionMakers = [
    { group: 'Executive Leadership', items: ['Chief Financial Officers (CFOs)', 'Chief Executive Officers (CEOs)', 'Managing Directors', 'Business Owners'] },
    { group: 'Banking Professionals', items: ['Banking Executives', 'Commercial Banking Managers', 'Lending Specialists', 'Financial Analysts'] },
    { group: 'Investment & Wealth', items: ['Investment Advisors', 'Portfolio Managers', 'Wealth Management Leaders', 'Financial Consultants'] },
    { group: 'Finance Operations', items: ['Finance Directors', 'Accounting Managers', 'Risk Management Teams', 'Procurement Executives'] },
];

const faqs = [
    { q: 'Which financial sectors do you support?', a: 'We support banking, fintech, insurance, investment firms, financial consulting companies, payment providers, and related industries.' },
    { q: 'Can campaigns target specific financial professionals?', a: 'Yes. Campaigns can be customized by job role, industry segment, company size, and geographic location.' },
    { q: 'How does intent data help financial organizations?', a: 'Intent data identifies organizations actively researching financial solutions, enabling better targeting and lead qualification.' },
    { q: 'Do you support global finance marketing campaigns?', a: 'Yes. We help organizations engage financial professionals across local and international markets.' },
    { q: 'What services are available for financial companies?', a: 'Demand Generation, B2B Lead Generation, Intent Data, Content Syndication, Appointment Setting, and Data Enrichment.' },
];

const FinanceIndustry = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>B2B Data Solutions for Finance Industry</title>
                <meta name="description" content="Accelerate financial services marketing with verified B2B data and demand generation solutions." />
                <link rel="canonical" href="https://datamarketics.com/industries/finance" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="B2B Data Solutions for Finance Industry" />
                <meta property="og:description" content="Accelerate financial services marketing with verified B2B data and demand generation solutions." />
                <meta property="og:url" content="https://datamarketics.com/industries/finance" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="B2B Data Solutions for Finance Industry" />
                <meta name="twitter:description" content="Accelerate financial services marketing with verified B2B data and demand generation solutions." />
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="main-headding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <span className="services-eyebrow">Finance Industry Solutions</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>Finance Marketing Solutions for Financial Services Organizations</h1>
                                <div className="space16"></div>
                                <p>Helping Financial Organizations Reach High-Value Decision-Makers. Data-driven marketing for banking, fintech, insurance, and investment sectors.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Get Finance Marketing Solutions</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="hero-image hero-image-static" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <img className="img-fluid" src={IMGS.hero} alt="Finance industry marketing solutions" style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13,115,119,0.22)', width: '100%', height: '420px', objectFit: 'cover' }} loading="eager" />
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
                                <h2>Finance Industry Challenges</h2>
                                <div className="space16"></div>
                                <p>Financial organizations face several challenges. Our marketing solutions help organizations overcome these through precise audience targeting and strategic engagement.</p>
                                <ul className="list">
                                    {challenges.map((c, i) => <li key={i}><span><i className="fa-solid fa-check"></i></span>{c}</li>)}
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Overcome Finance Challenges</Link>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <div className="image1"><img src={IMGS.section1} alt="Finance industry challenges" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="line" label="FINANCE GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Organizations We Support */}
            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Financial Organizations We Support</h2>
                                <div className="space16"></div>
                                <p>We work with a wide range of financial organizations, delivering targeted marketing programs for each sector.</p>
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
                                <h2>Our Finance Marketing Solutions</h2>
                                <div className="space16"></div>
                                <p>Data-driven solutions designed specifically for financial organizations to generate qualified leads and accelerate growth.</p>
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
                                <h2>Financial Decision-Makers We Help You Reach</h2>
                                <div className="space16"></div>
                                <p>We help you engage key financial professionals and executives who influence purchasing decisions.</p>
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
                            <motion.div className="work4-images service-corporate-images" initial={{ opacity: 0, scale: 0.92, x: -20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.7 }}>
                                <div className="image1"><img src={IMGS.section2} alt="Finance marketing expertise" loading="lazy" /></div>
                                <motion.div className="image2 image2-chart" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}>
                                    <DancingChart variant="bars" label="ROI GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2>Why Choose Data Marketics for Finance Marketing?</h2>
                                <div className="space16"></div>
                                {[
                                    { t: 'Financial Industry Expertise', d: 'Deep understanding of financial markets, buyer behavior, and decision-making processes.' },
                                    { t: 'Accurate Business Intelligence', d: 'Verified financial data and decision-maker information.' },
                                    { t: 'Customized Campaign Strategies', d: 'Marketing programs tailored to your target audience and objectives.' },
                                    { t: 'Global Reach', d: 'Access financial professionals and organizations worldwide.' },
                                    { t: 'Results-Driven Approach', d: 'Focused on generating qualified leads and measurable business growth.' },
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
                                <Link to="/contact" className="theme-btn2">Contact Our Finance Experts</Link>
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
                                <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: 800, marginBottom: '16px' }}>Ready to Grow Your Financial Services Business?</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px' }}>Data Marketics helps financial organizations generate qualified leads, engage decision-makers, and accelerate growth through data-driven marketing solutions.</p>
                                <Link to="/contact" className="theme-btn2">Contact Our Team Today</Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinanceIndustry;
