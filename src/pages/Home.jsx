import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import ThreeDHeroWidget from '../components/ThreeDHeroWidget';
import ThreeDIndustryWidget from '../components/ThreeDIndustryWidget';
import ThreeDDashboard from '../components/ThreeDDashboard';
import { 
    Database, 
    Target, 
    TrendingUp, 
    Activity, 
    ShieldCheck, 
    ArrowRight, 
    Cpu, 
    Globe, 
    Users, 
    Sparkles, 
    Check,
    BarChart2,
    FileText,
    Calendar,
    RefreshCw,
    Star,
    Zap,
    Award,
    ChevronDown,
    ChevronUp,
    Search,
    CheckCircle2,
    Building2,
    HeartPulse,
    Monitor,
    Factory,
    Landmark,
    ClipboardList,
    Rocket,
    LineChart,
    Megaphone,
    UserCheck,
    BadgeCheck
} from 'lucide-react';
import { pageSchema } from '../data/schema';

const GRAD_PRIMARY = 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)';
const GRAD_ACCENT = 'linear-gradient(135deg, #2dd4bf 0%, #5eead4 100%)';
const GRAD_TEXT = 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)';
const GRAD_HEADING = 'linear-gradient(90deg, #042f2e 0%, #064e4a 18%, #0d7377 42%, #14b8a6 70%, #2dd4bf 100%)';
const INK = '#0b2727';
const INK_SOFT = '#2c4a4a';
const MUTED = '#4f6b6b';

const gradientText = {
    background: GRAD_TEXT,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
};

const gradientHeading = {
    background: GRAD_HEADING,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'inline-block',
};

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
};

// Shown in the FAQ section below and mirrored in the FAQPage structured data.
const homeFaqs = [
    { q: 'What is B2B Lead Generation?', a: 'B2B lead generation is the process of identifying and attracting potential business customers who may be interested in your products or services. It involves targeted outreach, data intelligence, and strategic engagement to convert prospects into qualified sales opportunities.' },
    { q: 'What is Demand Generation?', a: 'Demand generation focuses on creating awareness and interest among potential buyers through strategic marketing initiatives. It encompasses the full funnel — from brand awareness to lead nurturing — to build a sustainable pipeline of engaged prospects.' },
    { q: 'How Accurate Is Your Data?', a: 'Our data undergoes rigorous validation processes to maintain high levels of accuracy and reliability. We maintain a 98%+ accuracy rate through monthly verification cycles, AI-powered checks, and human validation to ensure low bounce rates and high deliverability.' },
    { q: 'What Industries Do You Serve?', a: 'We serve technology, SaaS, healthcare, manufacturing, finance, education, retail, and other industries. Our industry-specific databases are tailored to the unique targeting requirements of each sector.' },
    { q: 'Is Your Data GDPR Compliant?', a: 'Yes. We follow industry best practices and compliance standards for data management and usage. Our data collection and processing methods adhere to GDPR, CCPA, and other relevant privacy regulations.' },
    { q: 'What does a marketing data provider do?', a: 'A marketing data provider supplies accurate B2B contact lists, firmographic data, technographic profiles, and insights to help sales & marketing teams reach key decision makers with the right message at the right time.' },
];

// --- FAQ Item Component ---
const FaqItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            key={index}
            variants={fadeInUp}
            style={{
                background: 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(8px)',
                marginBottom: '16px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: `1px solid ${open ? '#2dd4bf' : 'rgba(45, 212, 191, 0.22)'}`,
                boxShadow: '0 4px 14px rgba(13, 115, 119, 0.05)',
                transition: 'border-color 0.3s ease'
            }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%',
                    padding: '22px 28px',
                    fontSize: '17px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    outline: 'none',
                    color: INK,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                }}
            >
                <span>{faq.q}</span>
                <span style={{
                    flexShrink: 0,
                    marginLeft: '15px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: GRAD_PRIMARY,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                    <ChevronDown size={16} color="#ffffff" strokeWidth={2.8} />
                </span>
            </button>
            {open && (
                <div style={{ padding: '0 28px 24px', color: MUTED, lineHeight: 1.8, fontSize: '15.5px' }}>
                    <p style={{ margin: 0 }}>{faq.a}</p>
                </div>
            )}
        </motion.div>
    );
};

const Home = () => {
    return (
        <>
            <Helmet>
                <title>B2B Data Provider &amp; Lead Generation Solutions | Datamarketics</title>
                <meta name="description" content="Datamarketics provides reliable business data, contact databases, targeted leads and lead generation solutions to help businesses find and connect with the right prospects." />
                <meta name="keywords" content="B2B data provider, B2B database provider, B2B data services, B2B contact database, targeted B2B leads, B2B prospecting data" />
                <link rel="canonical" href="https://datamarketics.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Data Marketics | B2B Data Provider, Demand Generation & Lead Generation Services" />
                <meta property="og:description" content="Accelerate business growth with verified B2B data, demand generation, lead generation, intent data, data enrichment, and content syndication services." />
                <meta property="og:url" content="https://datamarketics.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Data Marketics | B2B Data Provider, Demand Generation & Lead Generation Services" />
                <meta name="twitter:description" content="Accelerate business growth with verified B2B data, demand generation, lead generation, intent data, data enrichment, and content syndication services." />
                <script type="application/ld+json">{pageSchema('/', { faqs: homeFaqs })}</script>
            </Helmet>

            {/* HERO */}
            <div className="pages-hero" style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }}>
                {/* Tech grid overlay */}
                <div className="tech-grid-overlay" />

                {/* Floating ambient glow orbs */}
                <div className="ambient-glow-orb" style={{ top: '10%', right: '15%', width: '320px', height: '320px', background: 'rgba(45, 212, 191, 0.25)' }} />
                <div className="ambient-glow-orb" style={{ bottom: '10%', left: '10%', width: '380px', height: '380px', background: 'rgba(94, 234, 212, 0.2)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="row align-items-start">
                        <div className="col-lg-6">
                            <motion.div 
                                className="main-headding"
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                {/* Eyebrow badge */}
                                <motion.div variants={fadeInUp} style={{ marginBottom: '18px' }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: 'linear-gradient(135deg, #ecfdf5, #ccfbf1)',
                                        border: '1px solid rgba(45,212,191,0.35)',
                                        borderRadius: '999px',
                                        padding: '8px 18px',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        color: '#0d7377',
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase'
                                    }}>
                                        <Sparkles size={14} color="#14b8a6" /> B2B Lead Generation &amp; Demand Generation Services
                                    </span>
                                </motion.div>

                                <motion.h1
                                    variants={fadeInUp}
                                    className="dm-hero-h1"
                                    style={{ fontSize: '58px', lineHeight: '1.1', fontWeight: 900, color: INK, letterSpacing: '-0.025em', marginTop: 0 }}
                                >
                                    Accelerate<br />
                                    Business Growth<br />
                                    with <span style={gradientText}>Qualified Leads</span><br />
                                    &amp; Revenue Results
                                </motion.h1>
                                <motion.p 
                                    variants={fadeInUp}
                                    style={{ fontSize: '18px', lineHeight: '1.8', color: INK_SOFT, marginTop: '20px' }}
                                >
                                    Connect with decision-makers, generate qualified leads, and drive revenue growth. Data Marketics delivers high-quality{' '}
                                    <b><Link to="/services" style={{ color: '#0d7377', textDecoration: 'none', borderBottom: '1px dashed #0d7377' }}>B2B lead generation solutions</Link></b> — from intent data and content syndication to appointment setting and data enrichment.
                                </motion.p>
                                <div className="space30"></div>
                                <motion.div 
                                    variants={fadeInUp}
                                    className="hero-btns d-flex flex-wrap gap-3"
                                >
                                    <Link to="/contact" className="theme-btn2 d-flex align-items-center gap-2">
                                        Request a Free Consultation <ArrowRight size={18} />
                                    </Link>
                                    <Link to="/services" className="theme-btn3">Our Services</Link>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="hero-image hero-image-static"
                                initial="hidden"
                                animate="visible"
                                variants={scaleIn}
                                style={{ padding: '10px' }}
                            >
                                <ThreeDHeroWidget />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TRUSTED PARTNER */}
            <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
                <div className="ambient-glow-orb" style={{ top: '10%', right: '5%', width: '340px', height: '340px', background: 'rgba(45, 212, 191, 0.12)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <motion.div
                                className="headding2"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={fadeInUp}>
                                    <span style={{
                                        display: 'inline-block',
                                        background: 'linear-gradient(135deg, #ecfdf5, #ccfbf1)',
                                        border: '1px solid rgba(45,212,191,0.3)',
                                        borderRadius: '999px',
                                        padding: '6px 16px',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        color: '#0d7377',
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase',
                                        marginBottom: '18px'
                                    }}>Your Trusted Partner</span>
                                </motion.div>
                                <motion.h2 variants={fadeInUp} style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1.2 }}>
                                    <span style={gradientHeading}>Your Trusted Partner for B2B Marketing Success</span>
                                </motion.h2>
                                <div className="space16"></div>
                                <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8 }}>
                                    In today's competitive business environment, reaching the right audience at the right time is critical. Data Marketics provides businesses with reliable marketing data and strategic lead generation solutions that help identify, engage, and convert high-value prospects.
                                </motion.p>
                                <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8, marginTop: '12px' }}>
                                    Our comprehensive approach combines accurate business data, intent-driven insights, and personalized outreach strategies to ensure every campaign delivers meaningful results.
                                </motion.p>
                                <div className="space20"></div>
                                <motion.div variants={fadeInUp}>
                                    <Link to="/contact" className="theme-btn2 d-inline-flex align-items-center gap-2">
                                        Get Started <ArrowRight size={18} />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={staggerContainer}
                            >
                                <div style={{
                                    background: 'rgba(255,255,255,0.75)',
                                    backdropFilter: 'blur(16px)',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(45,212,191,0.22)',
                                    boxShadow: '0 20px 50px rgba(13,115,119,0.1)',
                                    padding: '36px 32px'
                                }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: INK, marginBottom: '24px' }}>Why Businesses Choose Data Marketics</h3>
                                    <div className="row g-3">
                                        {[
                                            { label: 'Verified B2B Contact Data', icon: <ShieldCheck size={16} color="#0d7377" /> },
                                            { label: 'High Data Accuracy Standards', icon: <BadgeCheck size={16} color="#0d7377" /> },
                                            { label: 'Global Business Coverage', icon: <Globe size={16} color="#0d7377" /> },
                                            { label: 'Industry-Specific Targeting', icon: <Target size={16} color="#0d7377" /> },
                                            { label: 'GDPR-Compliant Solutions', icon: <CheckCircle2 size={16} color="#0d7377" /> },
                                            { label: 'Dedicated Client Support', icon: <UserCheck size={16} color="#0d7377" /> },
                                            { label: 'Customized Marketing Strategies', icon: <Sparkles size={16} color="#0d7377" /> },
                                            { label: 'Proven Lead Generation Expertise', icon: <Award size={16} color="#0d7377" /> },
                                        ].map((item, i) => (
                                            <div key={i} className="col-12 col-sm-6">
                                                <motion.div
                                                    variants={fadeInUp}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)',
                                                        border: '1px solid rgba(45,212,191,0.2)',
                                                        borderRadius: '12px',
                                                        padding: '12px 14px',
                                                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                                        cursor: 'default',
                                                        height: '100%'
                                                    }}
                                                    whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(20,184,166,0.2)' }}
                                                >
                                                    <div style={{
                                                        background: 'rgba(45,212,191,0.15)',
                                                        borderRadius: '8px',
                                                        width: '32px', height: '32px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}>
                                                        {item.icon}
                                                    </div>
                                                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: INK, lineHeight: 1.35 }}>{item.label}</span>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SOLUTIONS LIST */}
            <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>B2B Marketing Data Solutions That Deliver Results</span>
                        </h2>
                        <div className="space40"></div>
                    </motion.div>
                    
                    <motion.div 
                        className="row justify-content-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-20px' }}
                        variants={staggerContainer}
                    >
                        <div className="col-lg-9">
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                {[
                                    { name: 'B2B Email Database', desc: 'Reach verified direct inboxes of key decision makers globally.', icon: <Database size={24} color="#ffffff" /> },
                                    { name: 'Sales Leads Provider', desc: 'Identify high-intent accounts fitting your ideal customer profile (ICP).', icon: <Target size={24} color="#ffffff" /> },
                                    { name: 'Demand Generation Data', desc: 'Fuel outbound strategies with clean, hyper-targeted contact segments.', icon: <TrendingUp size={24} color="#ffffff" /> },
                                    { name: 'Sales Intelligence Platform', desc: 'Equip sales reps with deep firmographic and demographic insight details.', icon: <Activity size={24} color="#ffffff" /> },
                                    { name: 'Intent Data Solutions', desc: 'Know when companies are actively researching your product category.', icon: <ShieldCheck size={24} color="#ffffff" /> }
                                ].map((solution, index) => (
                                    <motion.li 
                                        key={index}
                                        variants={fadeInUp}
                                        style={{ marginBottom: '18px' }}
                                    >
                                        <TiltCard maxRotate={3}>
                                            <div className="glass-card" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '24px 30px',
                                                border: '1px solid rgba(45, 212, 191, 0.22)',
                                            }}>
                                                <div style={{
                                                    background: GRAD_PRIMARY,
                                                    borderRadius: '16px',
                                                    width: '56px',
                                                    height: '56px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: '24px',
                                                    flexShrink: 0,
                                                    boxShadow: '0 10px 24px rgba(20, 184, 166, 0.35)'
                                                }}>
                                                    {solution.icon}
                                                </div>
                                                <div style={{ flexGrow: 1 }}>
                                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', color: INK, fontWeight: 700 }}>{solution.name}</h3>
                                                    <p style={{ margin: 0, fontSize: '15px', color: INK_SOFT }}>{solution.desc}</p>
                                                </div>
                                                <div className="d-none d-sm-block" style={{ marginLeft: '16px', color: '#14b8a6', opacity: 0.65 }}>
                                                    <ArrowRight size={22} />
                                                </div>
                                            </div>
                                        </TiltCard>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CORE SERVICES */}
            <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
                <div className="tech-grid-overlay" style={{ opacity: 0.4 }} />
                <div className="ambient-glow-orb" style={{ top: '5%', left: '5%', width: '320px', height: '320px', background: 'rgba(45, 212, 191, 0.12)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-20px' }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>Our Core Services</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: MUTED, maxWidth: '700px', margin: '16px auto 0', lineHeight: 1.8 }}>
                            Comprehensive B2B marketing solutions designed to accelerate your sales pipeline and maximize revenue growth.
                        </p>
                        <div className="space40"></div>
                    </motion.div>

                    <motion.div
                        className="row g-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-20px' }}
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: <Target size={28} color="#ffffff" />,
                                title: 'B2B Lead Generation',
                                desc: 'Generate qualified leads and connect with decision-makers who are actively looking for solutions. Our lead generation programs help businesses increase pipeline opportunities and improve conversion rates through targeted prospect identification and engagement.',
                            },
                            {
                                icon: <Megaphone size={28} color="#ffffff" />,
                                title: 'Demand Generation',
                                desc: 'Build brand awareness, nurture prospects, and create sustainable demand with strategic demand generation campaigns designed to attract and engage potential buyers throughout the customer journey.',
                            },
                            {
                                icon: <Search size={28} color="#ffffff" />,
                                title: 'Intent Data Solutions',
                                desc: 'Identify prospects actively researching products and services related to your business. Our intent data solutions provide valuable buying signals that help prioritize sales efforts and improve targeting precision.',
                            },
                            {
                                icon: <FileText size={28} color="#ffffff" />,
                                title: 'Content Syndication',
                                desc: 'Expand your content reach and engage qualified audiences through strategic content syndication campaigns that drive awareness, generate leads, and support demand generation initiatives.',
                            },
                            {
                                icon: <Calendar size={28} color="#ffffff" />,
                                title: 'Appointment Setting',
                                desc: 'Connect your sales team with decision-makers through professional appointment-setting services designed to create meaningful sales conversations and accelerate pipeline growth.',
                            },
                            {
                                icon: <Database size={28} color="#ffffff" />,
                                title: 'Data Enrichment',
                                desc: 'Improve the quality of your existing customer and prospect databases with accurate, updated, and enriched business information that supports better targeting and personalization.',
                            },
                        ].map((service, index) => (
                            <motion.div key={index} className="col-lg-4 col-md-6" variants={fadeInUp}>
                                <TiltCard maxRotate={5}>
                                    <div className="glass-card" style={{
                                        padding: '36px 28px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(45, 212, 191, 0.22)',
                                        minHeight: '280px'
                                    }}>
                                        <div style={{
                                            background: GRAD_PRIMARY,
                                            borderRadius: '18px',
                                            width: '64px',
                                            height: '64px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '22px',
                                            boxShadow: '0 12px 28px rgba(20, 184, 166, 0.35)',
                                            flexShrink: 0
                                        }}>
                                            {service.icon}
                                        </div>
                                        <h3 style={{ margin: '0 0 14px 0', fontSize: '20px', color: INK, fontWeight: 700, lineHeight: 1.35 }}>{service.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14.5px', color: INK_SOFT, lineHeight: 1.7, flexGrow: 1 }}>{service.desc}</p>
                                        <div style={{ marginTop: '20px' }}>
                                            <Link to="/services" style={{ 
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                color: '#0d7377', fontWeight: 700, fontSize: '14px',
                                                textDecoration: 'none', transition: 'gap 0.25s ease'
                                            }}>
                                                Learn More <ArrowRight size={15} />
                                            </Link>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* LIVE PLATFORM TELEMETRY SHOWCASE */}
            <div className="sp" style={{ background: 'transparent', position: 'relative' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <motion.div 
                                className="headding2 text-center" 
                                style={{ marginBottom: '40px' }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <h2 style={{ fontSize: '38px', fontWeight: 800 }}>
                                    <span style={gradientHeading}>Experience Our Live Data Syncing Engine</span>
                                </h2>
                                <p style={{ fontSize: '17px', color: MUTED, marginTop: '10px' }}>
                                    Watch real-time B2B outbound signals and database matching sync rates in action.
                                </p>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={scaleIn}
                            >
                                <TiltCard maxRotate={2}>
                                    <ThreeDDashboard />
                                </TiltCard>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHY WE ARE LEADING */}
            <div className="about-page-area1 sp" style={{ position: 'relative' }}>
                <div className="ambient-glow-orb" style={{ top: '25%', left: '5%', width: '300px', height: '300px', background: 'rgba(20, 184, 166, 0.15)' }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>Why Data Marketics?</span>
                        </h2>
                        <div className="space16"></div>
                        <p style={{ fontSize: '18px', color: MUTED, maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
                            Accurate data is the foundation of successful sales and marketing campaigns. Our commitment to data quality ensures that clients receive reliable and actionable information that supports better business decisions.
                        </p>
                    </motion.div>

                    <div className="space50"></div>

                    <motion.div 
                        className="row justify-content-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {[
                            { title: 'Comprehensive Data Verification', icon: <ShieldCheck size={26} color="#ffffff" />, desc: 'Triple-verified records ensuring maximum inbox delivery rates.' },
                            { title: 'Regular Database Updates', icon: <RefreshCw size={26} color="#ffffff" />, desc: 'Frequent refresh cycles to keep your data current and accurate.' },
                            { title: 'Multi-Level Quality Assurance', icon: <Sparkles size={26} color="#ffffff" />, desc: '98%+ accuracy threshold backed by periodic database refreshes.' },
                            { title: 'Global Business Intelligence', icon: <Globe size={26} color="#ffffff" />, desc: 'Broad global listings mapping active decision-makers in all major markets.' },
                            { title: 'Advanced Audience Segmentation', icon: <Cpu size={26} color="#ffffff" />, desc: 'Precise segmentation across 40+ attributes and custom filters.' },
                            { title: 'Scalable Marketing Solutions', icon: <TrendingUp size={26} color="#ffffff" />, desc: 'Grow your outbound capacity as your pipeline demands increase.' }
                        ].map((feature, index) => (
                            <motion.div className="col-xl-4 col-lg-4 col-md-6 mb-4" key={index} variants={fadeInUp}>
                                <TiltCard maxRotate={5}>
                                    <div className="glass-card" style={{
                                        padding: '40px 24px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        border: '1px solid rgba(45, 212, 191, 0.22)'
                                    }}>
                                        <div style={{
                                            background: GRAD_PRIMARY,
                                            borderRadius: '50%',
                                            width: '64px',
                                            height: '64px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '24px',
                                            boxShadow: '0 12px 28px rgba(20, 184, 166, 0.32)'
                                        }}>
                                            {feature.icon}
                                        </div>
                                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: INK, fontWeight: 700, lineHeight: 1.4 }}>{feature.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14px', color: INK_SOFT, lineHeight: 1.6 }}>{feature.desc}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* INDUSTRIES */}
            <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
                <div className="tech-grid-overlay" />
                <div className="ambient-glow-orb" style={{ bottom: '15%', right: '5%', width: '350px', height: '350px', background: 'rgba(94, 234, 212, 0.15)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{ marginBottom: '50px' }}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>Industry-Specific Solutions</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: MUTED, maxWidth: '750px', margin: '16px auto 0', lineHeight: 1.8 }}>
                            Data Marketics serves organizations across a wide range of industries, delivering customized data and marketing solutions that address unique business challenges and opportunities.
                        </p>
                    </motion.div>

                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <motion.div 
                                className="about-image"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={scaleIn}
                                style={{ padding: '10px' }}
                            >
                                <TiltCard maxRotate={5}>
                                    <ThreeDIndustryWidget />
                                </TiltCard>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.ul 
                                style={{ listStyleType: 'none', padding: 0, margin: 0 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                {[
                                    { label: 'Technology', desc: 'Reach IT leaders, technology buyers, and decision-makers with accurate contact data and targeted lead generation campaigns.', icon: <Monitor size={20} color="#ffffff" /> },
                                    { label: 'Healthcare', desc: 'Connect with healthcare providers, executives, administrators, and industry professionals through specialized healthcare marketing data solutions.', icon: <HeartPulse size={20} color="#ffffff" /> },
                                    { label: 'SaaS', desc: 'Support software companies with demand generation programs, intent data, and targeted lead generation strategies designed to drive customer acquisition.', icon: <Cpu size={20} color="#ffffff" /> },
                                    { label: 'Manufacturing', desc: 'Identify and engage manufacturing decision-makers, procurement leaders, and operational executives across global markets.', icon: <Factory size={20} color="#ffffff" /> },
                                    { label: 'Finance', desc: 'Reach financial professionals, banking executives, investment firms, and insurance organizations through industry-specific data solutions.', icon: <Landmark size={20} color="#ffffff" /> },
                                ].map((industry, index) => (
                                    <motion.li 
                                        key={index} 
                                        variants={fadeInUp}
                                        style={{ marginBottom: '14px' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            background: 'rgba(255, 255, 255, 0.65)',
                                            backdropFilter: 'blur(8px)',
                                            padding: '20px 24px',
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 14px rgba(13, 115, 119, 0.05)',
                                            border: '1px solid rgba(45, 212, 191, 0.22)',
                                            transition: 'transform 0.25s ease, border-color 0.25s ease'
                                        }}
                                            className="glow-card-line"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateX(8px)';
                                                e.currentTarget.style.borderColor = '#2dd4bf';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.22)';
                                            }}>
                                            <div style={{
                                                background: GRAD_PRIMARY,
                                                borderRadius: '12px',
                                                width: '42px',
                                                height: '42px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '18px',
                                                flexShrink: 0,
                                                boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)'
                                            }}>
                                                {industry.icon}
                                            </div>
                                            <div>
                                                <span style={{ display: 'block', margin: '0 0 4px 0', fontSize: '17px', color: INK, fontWeight: 700 }}>{industry.label}</span>
                                                <span style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.6 }}>{industry.desc}</span>
                                            </div>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* OUR PROCESS */}
            <div className="about-page-area1 sp" style={{ position: 'relative', background: 'transparent' }}>
                <div className="ambient-glow-orb" style={{ bottom: '10%', left: '10%', width: '380px', height: '380px', background: 'rgba(20, 184, 166, 0.12)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>Our Process</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: MUTED, maxWidth: '700px', margin: '16px auto 0', lineHeight: 1.8 }}>
                            A proven 5-step approach that turns your business goals into measurable outcomes.
                        </p>
                        <div className="space40"></div>
                    </motion.div>

                    <motion.div
                        className="row g-4 justify-content-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-20px' }}
                        variants={staggerContainer}
                    >
                        {[
                            {
                                step: '01',
                                title: 'Understand Your Business Goals',
                                desc: 'We begin by understanding your target audience, business objectives, and ideal customer profile.',
                                icon: <ClipboardList size={26} color="#ffffff" />
                            },
                            {
                                step: '02',
                                title: 'Build Targeted Prospect Lists',
                                desc: 'Our experts identify and segment qualified prospects based on industry, company size, job role, technology usage, and buying intent.',
                                icon: <Users size={26} color="#ffffff" />
                            },
                            {
                                step: '03',
                                title: 'Verify and Enrich Data',
                                desc: 'Every dataset undergoes quality verification and enrichment to ensure maximum accuracy and campaign effectiveness.',
                                icon: <ShieldCheck size={26} color="#ffffff" />
                            },
                            {
                                step: '04',
                                title: 'Execute Marketing Campaigns',
                                desc: 'We launch targeted lead generation, content syndication, or demand generation campaigns designed to reach the right audience.',
                                icon: <Rocket size={26} color="#ffffff" />
                            },
                            {
                                step: '05',
                                title: 'Measure and Optimize Performance',
                                desc: 'Continuous monitoring and optimization help maximize campaign performance and improve ROI.',
                                icon: <LineChart size={26} color="#ffffff" />
                            },
                        ].map((step, index) => (
                            <motion.div key={index} className="col-lg-4 col-md-6" variants={fadeInUp}>
                                <TiltCard maxRotate={4}>
                                    <div className="glass-card" style={{
                                        padding: '36px 28px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(45, 212, 191, 0.22)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Step number watermark */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            right: '20px',
                                            fontSize: '72px',
                                            fontWeight: 900,
                                            color: 'rgba(45,212,191,0.08)',
                                            lineHeight: 1,
                                            userSelect: 'none',
                                            pointerEvents: 'none'
                                        }}>{step.step}</div>
                                        <div style={{
                                            background: GRAD_PRIMARY,
                                            borderRadius: '18px',
                                            width: '60px',
                                            height: '60px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '20px',
                                            boxShadow: '0 12px 28px rgba(20, 184, 166, 0.35)',
                                            flexShrink: 0
                                        }}>
                                            {step.icon}
                                        </div>
                                        <div style={{
                                            display: 'inline-block',
                                            background: 'linear-gradient(135deg, #ecfdf5, #ccfbf1)',
                                            border: '1px solid rgba(45,212,191,0.3)',
                                            borderRadius: '999px',
                                            padding: '3px 12px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#0d7377',
                                            marginBottom: '14px',
                                            alignSelf: 'flex-start'
                                        }}>Step {step.step}</div>
                                        <h3 style={{ margin: '0 0 12px 0', fontSize: '19px', color: INK, fontWeight: 700, lineHeight: 1.35 }}>{step.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14.5px', color: INK_SOFT, lineHeight: 1.7 }}>{step.desc}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* OUTCOMES / BENEFITS */}
            <div className="about-page-area1 sp" style={{ position: 'relative' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>Benefits of Partnering with Data Marketics</span>
                        </h2>
                        <div className="space40"></div>
                    </motion.div>

                    <motion.div 
                        className="row justify-content-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {[
                            { title: 'Increase Qualified Lead Volume', desc: 'Engage buyer profiles that match your ICP who are actively seeking solutions.' },
                            { title: 'Improve Marketing ROI', desc: 'Minimize bounce rates and waste by sending to hyper-clean targeted databases.' },
                            { title: 'Enhance Sales Productivity', desc: 'Equip your team with the intelligence they need to close deals faster.' },
                            { title: 'Accelerate Pipeline Growth', desc: 'Power continuous outbound flows with reliable volume of prospects.' },
                            { title: 'Reach Decision-Makers Faster', desc: 'Bypass gatekeepers with verified direct contact emails and phone numbers.' },
                            { title: 'Improve Campaign Performance', desc: 'Data-backed targeting helps every campaign hit the right audience.' },
                            { title: 'Support Revenue Growth', desc: 'Drive sustainable growth by consistently filling the top of the funnel.' },
                            { title: 'Reduce Customer Acquisition Costs', desc: 'Spend less per acquired customer with better-qualified prospect lists.' },
                        ].map((outcome, index) => (
                            <div className="col-lg-3 col-md-6 mb-4" key={index}>
                                <TiltCard maxRotate={5}>
                                    <div className="glass-card" style={{
                                        padding: '36px 22px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        border: '1px solid rgba(45, 212, 191, 0.22)'
                                    }}>
                                        <div style={{
                                            background: GRAD_ACCENT,
                                            borderRadius: '50%',
                                            width: '60px',
                                            height: '60px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '22px',
                                            boxShadow: '0 12px 28px rgba(45, 212, 191, 0.35)'
                                        }}>
                                            <TrendingUp size={26} color="#ffffff" />
                                        </div>
                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '17px', color: INK, fontWeight: 700, lineHeight: 1.4 }}>{outcome.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14px', color: INK_SOFT, lineHeight: 1.6 }}>{outcome.desc}</p>
                                    </div>
                                </TiltCard>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* FAQ */}
            <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
                <div className="ambient-glow-orb" style={{ top: '15%', left: '10%', width: '380px', height: '380px', background: 'rgba(20, 184, 166, 0.12)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                        className="headding2 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                            <span style={gradientHeading}>Frequently Asked Questions</span>
                        </h2>
                        <div className="space40"></div>
                    </motion.div>
                    
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <motion.div 
                                className="faq-accordion"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                {homeFaqs.map((faq, index) => (
                                    <FaqItem key={index} faq={faq} index={index} />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="cta-area sp text-center" style={{ position: 'relative', overflow: 'hidden', background: '#0b2727' }}>
                <div className="tech-grid-overlay" style={{ opacity: 0.15 }} />
                <div className="ambient-glow-orb" style={{ top: '-10%', left: '30%', width: '400px', height: '400px', background: 'rgba(45, 212, 191, 0.18)' }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                style={{ fontSize: '42px', fontWeight: 800, marginBottom: '22px', color: '#ffffff' }}
                            >
                                Ready to Accelerate Your Sales Pipeline?
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{ fontSize: '18px', marginBottom: '36px', lineHeight: 1.8, color: '#ccfbf1', opacity: 0.9 }}
                            >
                                Partner with Data Marketics to access reliable business intelligence, generate qualified leads, and achieve sustainable business growth. Contact our team today to discover how our B2B lead generation and demand generation solutions can help your organization reach the right audience and drive measurable results.
                            </motion.p>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="hero-btns d-flex flex-wrap justify-content-center gap-3 mt-4"
                            >
                                <Link to="/contact" className="theme-btn2 d-flex align-items-center gap-2">
                                    Request a Free Consultation <ArrowRight size={18} />
                                </Link>
                                <Link to="/contact" className="theme-btn3" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundImage: 'none' }}>
                                    Contact Us
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
