import { aboutFaqs } from '../data/aboutFaqs.js';
import React, { useState } from 'react';
import TiltCard from '../components/TiltCard';
import AboutHeroDashboard from '../components/AboutHeroDashboard';
import AboutSolutionsDashboard from '../components/AboutSolutionsDashboard';
import AboutSpecialtiesDashboard from '../components/AboutSpecialtiesDashboard';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Target,
    Megaphone,
    Search,
    FileText,
    Calendar,
    Database,
    ShieldCheck,
    Globe,
    Sparkles,
    Users,
    Award,
    Check,
    ChevronDown,
    Monitor,
    HeartPulse,
    Cpu,
    Factory,
    Landmark,
    ClipboardList,
    Rocket,
    LineChart,
    Star,
    BadgeCheck,
    UserCheck,
} from 'lucide-react';
import { pageSchema } from '../data/schema';

/* ─── Design tokens ─────────────────────────────────────────── */
const GRAD_PRIMARY  = 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)';
const GRAD_ACCENT   = 'linear-gradient(135deg, #2dd4bf 0%, #5eead4 100%)';
const GRAD_HEADING  = 'linear-gradient(90deg, #042f2e 0%, #064e4a 18%, #0d7377 42%, #14b8a6 70%, #2dd4bf 100%)';
const GRAD_TEXT     = 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)';
const INK           = '#0b2727';
const INK_SOFT      = '#2c4a4a';
const MUTED         = '#4f6b6b';

const gradientText    = { background: GRAD_TEXT,    WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' };
const gradientHeading = { background: GRAD_HEADING, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', display: 'inline-block' };

/* ─── Animation variants ────────────────────────────────────── */
const fadeInUp = {
    hidden:  { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const scaleIn = {
    hidden:  { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── FAQ accordion item ────────────────────────────────────── */
const FaqItem = ({ faq }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            variants={fadeInUp}
            style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(8px)',
                marginBottom: '16px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: `1px solid ${open ? '#2dd4bf' : 'rgba(45,212,191,0.22)'}`,
                boxShadow: '0 4px 14px rgba(13,115,119,0.05)',
                transition: 'border-color 0.3s ease',
            }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', padding: '22px 28px', fontSize: '17px', fontWeight: 700,
                    cursor: 'pointer', outline: 'none', color: INK,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', textAlign: 'left',
                }}
            >
                <span>{faq.q}</span>
                <span style={{
                    flexShrink: 0, marginLeft: '15px', width: '32px', height: '32px',
                    borderRadius: '50%', background: GRAD_PRIMARY,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
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

/* ─── Schema JSON-LD ─────────────────────────────────────────── */
// Shown in the FAQ section below and mirrored in the FAQPage structured data.


/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════════ */
const About = () => (
    <>
        {/* ── SEO HEAD ─────────────────────────────────────────── */}
        <Helmet>
            <title>About Data Marketics | Business Data &amp; Lead Generation</title>
            <meta name="description" content="Learn about Data Marketics and how we help businesses access quality data, prospect information and lead generation solutions to build stronger sales pipelines." />
            <meta name="keywords" content="B2B data provider, B2B database provider, B2B data services, B2B Company profile, lead generation company" />
            <link rel="canonical" href="https://datamarketics.com/about-us" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="About Data Marketics | Trusted B2B Data & Demand Generation Company" />
            <meta property="og:description" content="Learn how Data Marketics helps businesses achieve growth through verified B2B data, lead generation, demand generation, and intelligent marketing solutions." />
            <meta property="og:url" content="https://datamarketics.com/about-us" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="About Data Marketics | Trusted B2B Data & Demand Generation Company" />
            <meta name="twitter:description" content="Learn how Data Marketics helps businesses achieve growth through verified B2B data, lead generation, demand generation, and intelligent marketing solutions." />
            <script type="application/ld+json">{pageSchema('/about-us', { faqs: aboutFaqs })}</script>
        </Helmet>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="pages-hero" style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }} aria-label="About Data Marketics Hero Section">
            <div className="tech-grid-overlay" />
            <div className="ambient-glow-orb" style={{ top: '10%', right: '12%', width: '320px', height: '320px', background: 'rgba(45,212,191,0.22)' }} />
            <div className="ambient-glow-orb" style={{ bottom: '10%', left: '8%',  width: '280px', height: '280px', background: 'rgba(94,234,212,0.18)' }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <motion.div className="main-headding" initial="hidden" animate="visible" variants={staggerContainer}>

                            {/* Eyebrow */}
                            <motion.div variants={fadeInUp} style={{ marginBottom: '18px' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: 'linear-gradient(135deg,#ecfdf5,#ccfbf1)',
                                    border: '1px solid rgba(45,212,191,0.35)', borderRadius: '999px',
                                    padding: '8px 18px', fontSize: '13px', fontWeight: 700,
                                    color: '#0d7377', letterSpacing: '0.04em', textTransform: 'uppercase',
                                }}>
                                    <Sparkles size={14} color="#14b8a6" /> B2B Data &amp; Demand Generation Company
                                </span>
                            </motion.div>

                            {/* H1 — ONLY ONE on this page */}
                            <motion.h1
                                variants={fadeInUp}
                                className="dm-hero-h1"
                                style={{ fontSize: '54px', lineHeight: '1.1', fontWeight: 900, color: INK, letterSpacing: '-0.025em', marginTop: 0 }}
                            >
                                About <span style={gradientText}>Data Marketics</span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} style={{ fontSize: '18px', lineHeight: '1.8', color: INK_SOFT, marginTop: '20px', textAlign: 'justify' }}>
                                Data Marketics is a trusted B2B marketing data and demand generation company dedicated to
                                helping organizations connect with the right audience, generate qualified leads, and
                                accelerate business growth. We specialize in providing high-quality business intelligence,
                                verified contact data, and strategic{' '}
                                <b><Link to="/services" style={{ color: '#0d7377', textDecoration: 'none', borderBottom: '1px dashed #0d7377' }}>marketing solutions</Link></b>{' '}
                                that enable sales and marketing teams to make informed decisions and achieve measurable results.
                            </motion.p>

                            <motion.p variants={fadeInUp} style={{ fontSize: '17px', lineHeight: '1.8', color: MUTED, marginTop: '14px', textAlign: 'justify' }}>
                                In today's competitive marketplace, reaching decision-makers requires more than just data.
                                It requires accurate insights, targeted strategies, and a deep understanding of buyer behavior.
                                At Data Marketics, we combine advanced data solutions with marketing expertise to help businesses
                                build stronger pipelines, improve campaign performance, and drive sustainable revenue growth.
                            </motion.p>

                            <div className="space30"></div>
                            <motion.div variants={fadeInUp} className="hero-btns d-flex flex-wrap gap-3">
                                <Link to="/contact" className="theme-btn2 d-flex align-items-center gap-2">
                                    Get In Touch <ArrowRight size={18} />
                                </Link>
                                <Link to="/services" className="theme-btn3">Our Services</Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="col-lg-6">
                        <motion.div initial="hidden" animate="visible" variants={scaleIn} style={{ padding: '10px' }}>
                            <TiltCard maxRotate={2}>
                                <AboutHeroDashboard />
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

        {/* ── WHO WE ARE ───────────────────────────────────────── */}
        <div className="who-we-are-area sp" style={{ background: 'transparent', position: 'relative' }}>
            <div className="ambient-glow-orb" style={{ top: '20%', right: '5%', width: '300px', height: '300px', background: 'rgba(20,184,166,0.12)' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} style={{ padding: '10px' }}>
                            <TiltCard maxRotate={2}>
                                <AboutSolutionsDashboard />
                            </TiltCard>
                        </motion.div>
                    </div>
                    <div className="col-lg-6">
                        <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} variants={staggerContainer}>
                            <motion.h2 variants={fadeInUp} style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1.2 }}>
                                <span style={gradientHeading}>Who We Are</span>
                            </motion.h2>
                            <div className="space16"></div>
                            <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8 }}>
                                Data Marketics was established with a vision to transform the way businesses identify,
                                engage, and convert prospects. We understand the challenges organizations face when trying
                                to reach the right decision-makers and generate quality leads.
                            </motion.p>
                            <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8, marginTop: '14px' }}>
                                Our team works closely with clients to provide tailored solutions that align with their
                                business objectives and market requirements. With a strong focus on data quality, customer
                                success, and innovation, we help businesses across multiple industries achieve their sales
                                and marketing goals through reliable business intelligence and targeted{' '}
                                <Link to="/demand-generation" style={{ color: '#0d7377', fontWeight: 600, textDecoration: 'none', borderBottom: '1px dashed #0d7377' }}>demand generation</Link>{' '}
                                strategies.
                            </motion.p>
                            <div className="space20"></div>
                            <motion.div variants={fadeInUp} className="d-flex flex-wrap gap-3">
                                {[
                                    { icon: <Users size={16} color="#0d7377" />, label: 'Expert Team' },
                                    { icon: <Globe size={16} color="#0d7377" />,  label: 'Global Reach' },
                                    { icon: <Award size={16} color="#0d7377" />, label: 'Proven Results' },
                                    { icon: <ShieldCheck size={16} color="#0d7377" />, label: 'GDPR Compliant' },
                                ].map((badge, i) => (
                                    <span key={i} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '7px',
                                        background: 'linear-gradient(135deg,#f0fdfa,#ecfdf5)',
                                        border: '1px solid rgba(45,212,191,0.28)', borderRadius: '999px',
                                        padding: '8px 16px', fontSize: '13.5px', fontWeight: 700, color: INK,
                                    }}>
                                        {badge.icon} {badge.label}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

        {/* ── MISSION & VISION ─────────────────────────────────── */}
        <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
            <div className="tech-grid-overlay" style={{ opacity: 0.4 }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    className="row g-4"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }}
                    variants={staggerContainer}
                >
                    {/* Mission */}
                    <motion.div className="col-lg-6" variants={fadeInUp}>
                        <TiltCard maxRotate={4}>
                            <div className="glass-card" style={{
                                padding: '48px 40px', height: '100%',
                                border: '1px solid rgba(45,212,191,0.22)', borderRadius: '24px',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', top: '-12px', right: '20px',
                                    fontSize: '80px', fontWeight: 900, color: 'rgba(45,212,191,0.07)',
                                    lineHeight: 1, userSelect: 'none',
                                }}>M</div>
                                <div style={{
                                    background: GRAD_PRIMARY, borderRadius: '18px',
                                    width: '64px', height: '64px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '24px', boxShadow: '0 12px 28px rgba(20,184,166,0.35)',
                                }}>
                                    <Target size={28} color="#ffffff" />
                                </div>
                                <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '18px', color: INK }}>
                                    <span style={gradientHeading}>Our Mission</span>
                                </h2>
                                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, margin: 0 }}>
                                    Our mission is to empower organizations with accurate B2B data, actionable insights, and innovative
                                    marketing solutions that help them connect with the right prospects, improve engagement, and accelerate growth.
                                </p>
                                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginTop: '14px' }}>
                                    We are committed to delivering reliable data solutions that support better decision-making and create
                                    meaningful business opportunities for our clients.
                                </p>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Vision */}
                    <motion.div className="col-lg-6" variants={fadeInUp}>
                        <TiltCard maxRotate={4}>
                            <div className="glass-card" style={{
                                padding: '48px 40px', height: '100%',
                                border: '1px solid rgba(45,212,191,0.22)', borderRadius: '24px',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', top: '-12px', right: '20px',
                                    fontSize: '80px', fontWeight: 900, color: 'rgba(45,212,191,0.07)',
                                    lineHeight: 1, userSelect: 'none',
                                }}>V</div>
                                <div style={{
                                    background: GRAD_ACCENT, borderRadius: '18px',
                                    width: '64px', height: '64px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '24px', boxShadow: '0 12px 28px rgba(45,212,191,0.35)',
                                }}>
                                    <Star size={28} color="#ffffff" />
                                </div>
                                <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '18px', color: INK }}>
                                    <span style={gradientHeading}>Our Vision</span>
                                </h2>
                                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, margin: 0 }}>
                                    Our vision is to become a leading global provider of B2B marketing intelligence and demand generation solutions.
                                    We aim to help organizations unlock new growth opportunities through data-driven strategies, advanced targeting
                                    capabilities, and measurable marketing outcomes.
                                </p>
                                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginTop: '14px' }}>
                                    By continuously enhancing our solutions and maintaining the highest standards of data quality, we strive
                                    to be the preferred partner for businesses seeking sustainable growth and competitive advantage.
                                </p>
                            </div>
                        </TiltCard>
                    </motion.div>
                </motion.div>
            </div>
        </div>

        {/* ── WHAT WE DO ───────────────────────────────────────── */}
        <div className="about-page-area1 sp" style={{ position: 'relative' }}>
            <div className="ambient-glow-orb" style={{ bottom: '10%', left: '5%', width: '340px', height: '340px', background: 'rgba(20,184,166,0.12)' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    className="headding2 text-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                        <span style={gradientHeading}>What We Do</span>
                    </h2>
                    <p style={{ fontSize: '18px', color: MUTED, maxWidth: '760px', margin: '16px auto 0', lineHeight: 1.8 }}>
                        At Data Marketics, we provide a comprehensive range of B2B marketing and data solutions designed to support every stage of the buyer journey.
                    </p>
                    <div className="space40"></div>
                </motion.div>

                <motion.div
                    className="row g-4"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }}
                    variants={staggerContainer}
                >
                    {[
                        {
                            icon: <Megaphone size={26} color="#fff" />,
                            title: 'Demand Generation',
                            desc: 'Our demand generation services help businesses create awareness, build engagement, and generate interest among potential buyers through targeted campaigns and strategic outreach.',
                            link: '/demand-generation',
                            linkLabel: 'Demand Generation Services',
                        },
                        {
                            icon: <Target size={26} color="#fff" />,
                            title: 'B2B Lead Generation',
                            desc: 'We help businesses identify and connect with decision-makers who are actively seeking products and services, delivering qualified opportunities that contribute to pipeline growth.',
                            link: '/services',
                            linkLabel: 'B2B Lead Generation',
                        },
                        {
                            icon: <Search size={26} color="#fff" />,
                            title: 'Intent Data Solutions',
                            desc: 'Our intent data services provide valuable insights into buyer behavior, helping sales and marketing teams identify prospects actively researching relevant solutions.',
                            link: '/services',
                            linkLabel: 'Intent Data Solutions',
                        },
                        {
                            icon: <FileText size={26} color="#fff" />,
                            title: 'Content Syndication',
                            desc: 'We help organizations expand their content reach, improve brand visibility, and generate high-quality leads through targeted content syndication programs.',
                            link: '/services',
                            linkLabel: 'Content Syndication',
                        },
                        {
                            icon: <Calendar size={26} color="#fff" />,
                            title: 'Appointment Setting',
                            desc: 'Our appointment setting services connect businesses with key decision-makers, helping sales teams focus on meaningful conversations and opportunities.',
                            link: '/services',
                            linkLabel: 'Appointment Setting',
                        },
                        {
                            icon: <Database size={26} color="#fff" />,
                            title: 'Data Enrichment',
                            desc: 'We enhance existing databases with accurate and updated information, improving targeting accuracy and campaign effectiveness.',
                            link: '/services',
                            linkLabel: 'Data Enrichment',
                        },
                    ].map((service, i) => (
                        <motion.div key={i} className="col-lg-4 col-md-6" variants={fadeInUp}>
                            <TiltCard maxRotate={5}>
                                <div className="glass-card" style={{
                                    padding: '36px 28px', height: '100%',
                                    display: 'flex', flexDirection: 'column',
                                    border: '1px solid rgba(45,212,191,0.22)', minHeight: '270px',
                                }}>
                                    <div style={{
                                        background: i % 2 === 0 ? GRAD_PRIMARY : GRAD_ACCENT,
                                        borderRadius: '18px', width: '60px', height: '60px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '20px', boxShadow: '0 12px 28px rgba(20,184,166,0.35)', flexShrink: 0,
                                    }}>
                                        {service.icon}
                                    </div>
                                    <h3 style={{ margin: '0 0 12px', fontSize: '19px', color: INK, fontWeight: 700, lineHeight: 1.35 }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ margin: '0 0 18px', fontSize: '14.5px', color: INK_SOFT, lineHeight: 1.7, flexGrow: 1 }}>
                                        {service.desc}
                                    </p>
                                    <Link to={service.link} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        color: '#0d7377', fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                                    }}>
                                        Learn more about our {service.linkLabel} <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* ── WHY CHOOSE DATA MARKETICS ────────────────────────── */}
        <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
            <div className="tech-grid-overlay" style={{ opacity: 0.4 }} />
            <div className="ambient-glow-orb" style={{ top: '15%', right: '5%', width: '320px', height: '320px', background: 'rgba(45,212,191,0.12)' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    className="headding2 text-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                        <span style={gradientHeading}>Why Choose Data Marketics</span>
                    </h2>
                    <p style={{ fontSize: '18px', color: MUTED, maxWidth: '750px', margin: '16px auto 0', lineHeight: 1.8 }}>
                        Data accuracy is at the core of everything we do. Our rigorous verification processes help ensure
                        that clients receive reliable and actionable business information.
                    </p>
                    <div className="space40"></div>
                </motion.div>

                <motion.div
                    className="row g-4 justify-content-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                >
                    {[
                        { icon: <ShieldCheck size={26} color="#fff" />,  title: 'High-Quality Data',           desc: 'Our rigorous verification processes ensure clients receive reliable, accurate, and actionable business information.' },
                        { icon: <Award size={26} color="#fff" />,        title: 'Industry Expertise',          desc: 'Our team understands unique challenges across various industries, enabling us to develop targeted solutions that deliver results.' },
                        { icon: <Globe size={26} color="#fff" />,        title: 'Global Coverage',             desc: 'Access business intelligence and contact data across multiple regions and markets, expanding your reach internationally.' },
                        { icon: <Sparkles size={26} color="#fff" />,     title: 'Customized Solutions',        desc: 'Every business has unique goals. Our solutions are tailored to meet specific requirements and support long-term growth objectives.' },
                        { icon: <UserCheck size={26} color="#fff" />,    title: 'Customer-Centric Approach',   desc: 'We prioritize client success and work closely with organizations to develop strategies aligned with their marketing initiatives.' },
                        { icon: <BadgeCheck size={26} color="#fff" />,   title: 'Proven Lead Generation Expertise', desc: 'Years of experience generating high-quality leads across technology, healthcare, SaaS, finance, and more.' },
                    ].map((item, i) => (
                        <motion.div key={i} className="col-lg-4 col-md-6" variants={fadeInUp}>
                            <TiltCard maxRotate={5}>
                                <div className="glass-card" style={{
                                    padding: '40px 28px', height: '100%',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                                    border: '1px solid rgba(45,212,191,0.22)',
                                }}>
                                    <div style={{
                                        background: GRAD_PRIMARY, borderRadius: '50%',
                                        width: '64px', height: '64px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '22px', boxShadow: '0 12px 28px rgba(20,184,166,0.32)',
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: INK, fontWeight: 700, lineHeight: 1.4 }}>{item.title}</h3>
                                    <p style={{ margin: 0, fontSize: '14.5px', color: INK_SOFT, lineHeight: 1.65 }}>{item.desc}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* ── INDUSTRIES WE SERVE ──────────────────────────────── */}
        <div className="about-page-area1 sp" style={{ position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <motion.div
                            className="headding2"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }}
                            variants={staggerContainer}
                        >
                            <motion.h2 variants={fadeInUp} style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1.2 }}>
                                <span style={gradientHeading}>Industries We Serve</span>
                            </motion.h2>
                            <div className="space16"></div>
                            <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8 }}>
                                Data Marketics supports organizations across a wide range of industries. Our industry-focused
                                approach enables us to provide targeted data solutions and marketing strategies that address
                                specific business challenges and opportunities.
                            </motion.p>
                            <div className="space30"></div>
                            <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {[
                                    { label: 'Technology',     desc: 'Reach IT leaders, technology buyers, and decision-makers with precise lead generation.',      icon: <Monitor    size={20} color="#fff" /> },
                                    { label: 'Healthcare',     desc: 'Connect with healthcare providers, executives, and administrators through verified contact data.',  icon: <HeartPulse size={20} color="#fff" /> },
                                    { label: 'SaaS',          desc: 'Drive customer acquisition with demand generation and intent data tailored for software companies.', icon: <Cpu        size={20} color="#fff" /> },
                                    { label: 'Manufacturing',  desc: 'Engage procurement leaders and operational executives across global manufacturing markets.',      icon: <Factory    size={20} color="#fff" /> },
                                    { label: 'Finance',       desc: 'Reach financial professionals, investment firms, and insurance organizations with verified data.',  icon: <Landmark   size={20} color="#fff" /> },
                                ].map((industry, i) => (
                                    <motion.li key={i} variants={fadeInUp} style={{ marginBottom: '14px' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'flex-start',
                                            background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)',
                                            padding: '18px 22px', borderRadius: '16px',
                                            boxShadow: '0 4px 14px rgba(13,115,119,0.05)',
                                            border: '1px solid rgba(45,212,191,0.22)',
                                            transition: 'transform 0.25s ease, border-color 0.25s ease',
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.borderColor = '#2dd4bf'; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)';   e.currentTarget.style.borderColor = 'rgba(45,212,191,0.22)'; }}>
                                            <div style={{
                                                background: GRAD_PRIMARY, borderRadius: '12px',
                                                width: '42px', height: '42px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginRight: '16px', flexShrink: 0,
                                                boxShadow: '0 8px 20px rgba(20,184,166,0.3)',
                                            }}>
                                                {industry.icon}
                                            </div>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: INK, marginBottom: '3px' }}>{industry.label}</span>
                                                <span style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.6 }}>{industry.desc}</span>
                                            </div>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </div>

                    <div className="col-lg-6">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} style={{ padding: '10px' }}>
                            <TiltCard maxRotate={2}>
                                <AboutSpecialtiesDashboard />
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

        {/* ── OUR PROCESS ──────────────────────────────────────── */}
        <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
            <div className="tech-grid-overlay" style={{ opacity: 0.4 }} />
            <div className="ambient-glow-orb" style={{ bottom: '10%', right: '5%', width: '360px', height: '360px', background: 'rgba(94,234,212,0.13)' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    className="headding2 text-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                        <span style={gradientHeading}>Our Process</span>
                    </h2>
                    <p style={{ fontSize: '18px', color: MUTED, maxWidth: '700px', margin: '16px auto 0', lineHeight: 1.8 }}>
                        A structured, results-driven approach that transforms your business objectives into measurable growth outcomes.
                    </p>
                    <div className="space40"></div>
                </motion.div>

                <motion.div
                    className="row g-4 justify-content-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }}
                    variants={staggerContainer}
                >
                    {[
                        { step: '01', icon: <ClipboardList size={24} color="#fff" />, title: 'Understand Business Objectives', desc: 'We begin by understanding your target audience, business goals, and market challenges to shape the right strategy.' },
                        { step: '02', icon: <Users         size={24} color="#fff" />, title: 'Build Ideal Customer Profiles',   desc: 'Our team develops detailed customer profiles to identify the right prospects and decision-makers for your campaigns.' },
                        { step: '03', icon: <ShieldCheck   size={24} color="#fff" />, title: 'Data Verification & Enrichment',  desc: 'We validate and enhance business data to ensure maximum accuracy, reliability, and campaign usability.' },
                        { step: '04', icon: <Rocket        size={24} color="#fff" />, title: 'Campaign Execution',              desc: 'We implement targeted demand generation and lead generation strategies designed to engage qualified prospects.' },
                        { step: '05', icon: <LineChart     size={24} color="#fff" />, title: 'Performance Optimization',        desc: 'Continuous analysis and optimization help improve campaign effectiveness and maximize return on investment.' },
                    ].map((step, i) => (
                        <motion.div key={i} className="col-lg-4 col-md-6" variants={fadeInUp}>
                            <TiltCard maxRotate={4}>
                                <div className="glass-card" style={{
                                    padding: '36px 28px', height: '100%', display: 'flex', flexDirection: 'column',
                                    border: '1px solid rgba(45,212,191,0.22)', position: 'relative', overflow: 'hidden',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '-8px', right: '20px',
                                        fontSize: '72px', fontWeight: 900, color: 'rgba(45,212,191,0.07)',
                                        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                                    }}>{step.step}</div>
                                    <div style={{
                                        background: GRAD_PRIMARY, borderRadius: '18px',
                                        width: '58px', height: '58px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '18px', boxShadow: '0 12px 28px rgba(20,184,166,0.35)', flexShrink: 0,
                                    }}>
                                        {step.icon}
                                    </div>
                                    <span style={{
                                        display: 'inline-block', background: 'linear-gradient(135deg,#ecfdf5,#ccfbf1)',
                                        border: '1px solid rgba(45,212,191,0.3)', borderRadius: '999px',
                                        padding: '3px 12px', fontSize: '12px', fontWeight: 700, color: '#0d7377',
                                        marginBottom: '12px', alignSelf: 'flex-start',
                                    }}>Step {step.step}</span>
                                    <h3 style={{ margin: '0 0 10px', fontSize: '18px', color: INK, fontWeight: 700, lineHeight: 1.35 }}>{step.title}</h3>
                                    <p style={{ margin: 0, fontSize: '14.5px', color: INK_SOFT, lineHeight: 1.7 }}>{step.desc}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* ── OUR COMMITMENT ───────────────────────────────────── */}
        <div className="about-page-area1 sp" style={{ position: 'relative' }}>
            <div className="ambient-glow-orb" style={{ top: '20%', left: '5%', width: '320px', height: '320px', background: 'rgba(20,184,166,0.12)' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} variants={staggerContainer}>
                            <motion.h2 variants={fadeInUp} style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1.2 }}>
                                <span style={gradientHeading}>Our Commitment to Excellence</span>
                            </motion.h2>
                            <div className="space16"></div>
                            <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8 }}>
                                At Data Marketics, we are committed to helping businesses succeed through accurate data, innovative marketing
                                strategies, and exceptional customer support. We believe that reliable information and strategic engagement
                                are the foundation of successful sales and marketing initiatives.
                            </motion.p>
                            <motion.p variants={fadeInUp} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.8, marginTop: '14px' }}>
                                Our goal is to help organizations generate more opportunities, improve customer acquisition, and achieve
                                sustainable business growth. As your strategic partner, we are invested in your success from day one.
                            </motion.p>
                            <div className="space24"></div>
                            <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {[
                                    'Verified and up-to-date contact data',
                                    'Data-driven decision making',
                                    'Customized marketing strategies tailored to your goals',
                                    'Proven performance and measurable results',
                                    'Dedicated focus on long-term client success',
                                    'Ongoing campaign optimization and reporting',
                                ].map((item, i) => (
                                    <motion.li key={i} variants={fadeInUp} style={{
                                        display: 'flex', alignItems: 'center', gap: '14px',
                                        marginBottom: '12px',
                                    }}>
                                        <div style={{
                                            background: GRAD_PRIMARY, borderRadius: '50%',
                                            width: '30px', height: '30px', flexShrink: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 6px 14px rgba(20,184,166,0.3)',
                                        }}>
                                            <Check size={14} color="#fff" strokeWidth={3} />
                                        </div>
                                        <span style={{ fontSize: '16px', fontWeight: 600, color: INK }}>{item}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                            <div className="space30"></div>
                            <motion.div variants={fadeInUp}>
                                <Link to="/contact" className="theme-btn2 d-inline-flex align-items-center gap-2">
                                    Contact Us Today <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Stats panel */}
                    <div className="col-lg-6">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
                            <div style={{
                                background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)',
                                borderRadius: '24px', border: '1px solid rgba(45,212,191,0.22)',
                                boxShadow: '0 20px 50px rgba(13,115,119,0.1)', padding: '40px 36px',
                            }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, color: INK, marginBottom: '28px' }}>Data Marketics at a Glance</h3>
                                <div className="row g-3">
                                    {[
                                        { number: '98%+',  label: 'Data Accuracy Rate' },
                                        { number: '40+',   label: 'Segmentation Attributes' },
                                        { number: '500+',  label: 'Clients Served' },
                                        { number: '20+',   label: 'Industries Covered' },
                                        { number: '100M+', label: 'B2B Contacts Available' },
                                        { number: 'GDPR',  label: 'Compliant Data Practices' },
                                    ].map((stat, i) => (
                                        <div key={i} className="col-12 col-sm-6">
                                            <div style={{
                                                background: 'linear-gradient(135deg,#f0fdfa,#ecfdf5)',
                                                border: '1px solid rgba(45,212,191,0.22)',
                                                borderRadius: '16px', padding: '20px 18px', textAlign: 'center',
                                                height: '100%'
                                            }}>
                                            <div style={{
                                                fontSize: '28px', fontWeight: 900,
                                                background: GRAD_TEXT,
                                                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent', color: 'transparent',
                                                lineHeight: 1, marginBottom: '6px',
                                            }}>{stat.number}</div>
                                            <div style={{ fontSize: '12.5px', fontWeight: 600, color: MUTED, lineHeight: 1.4 }}>{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <div className="about-page-area1 sp" style={{ background: 'transparent', position: 'relative' }}>
            <div className="ambient-glow-orb" style={{ top: '10%', left: '8%', width: '360px', height: '360px', background: 'rgba(20,184,166,0.1)' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    className="headding2 text-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25 }}>
                        <span style={gradientHeading}>Frequently Asked Questions</span>
                    </h2>
                    <div className="space40"></div>
                </motion.div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {aboutFaqs.map((faq, i) => (
                                <FaqItem key={i} faq={faq} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="cta-area sp text-center" style={{ position: 'relative', overflow: 'hidden', background: '#0b2727' }}>
            <div className="tech-grid-overlay" style={{ opacity: 0.15 }} />
            <div className="ambient-glow-orb" style={{ top: '-10%', left: '30%', width: '400px', height: '400px', background: 'rgba(45,212,191,0.18)' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.6 }}
                            style={{ fontSize: '42px', fontWeight: 800, marginBottom: '22px', color: '#ffffff' }}
                        >
                            Ready to Accelerate Your Growth?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ fontSize: '18px', marginBottom: '36px', lineHeight: 1.8, color: '#ccfbf1', opacity: 0.9 }}
                        >
                            Partner with Data Marketics and discover how accurate business data, strategic{' '}
                            <Link to="/demand-generation" style={{ color: '#5eead4', textDecoration: 'none', fontWeight: 600, borderBottom: '1px dashed #5eead4' }}>demand generation</Link>,
                            and targeted marketing solutions can help your organization achieve measurable results.
                            Contact our team today to learn more about our services and start building a stronger sales pipeline.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            className="hero-btns d-flex flex-wrap justify-content-center gap-3 mt-4"
                        >
                            <Link to="/contact" className="theme-btn2 d-flex align-items-center gap-2">
                                Contact Us Today <ArrowRight size={18} />
                            </Link>
                            <Link to="/services" className="theme-btn3" style={{
                                background: 'rgba(255,255,255,0.08)', color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.2)', backgroundImage: 'none',
                            }}>
                                View Our Services
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default About;
