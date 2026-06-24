import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShieldCheck, Award, Layers, HeartHandshake, ArrowRight } from 'lucide-react';

// Hero widget & existing dashboards
import FeaturesHeroWidget from '../components/FeaturesHeroWidget';

// New feature dashboards
import VerifiedContactDashboard from '../components/VerifiedContactDashboard';
import IntentDataDashboard from '../components/IntentDataDashboard';
import FirmographicDashboard from '../components/FirmographicDashboard';
import TechnographicDashboard from '../components/TechnographicDashboard';
import DataEnrichmentDashboard2 from '../components/DataEnrichmentDashboard2';
import EmailVerificationDashboard from '../components/EmailVerificationDashboard';
import GlobalCoverageDashboard from '../components/GlobalCoverageDashboard';
import CRMIntegrationDashboard from '../components/CRMIntegrationDashboard';

// Existing dashboards reused for innovation section
import AnalyticalOverviewDashboard from '../components/AnalyticalOverviewDashboard';
import innovationShape1 from '../assets/img/shapes/others2-shape1.png';
import innovationShape2 from '../assets/img/shapes/others2-shape2.png';

/* ─────────────────────────────────────────────
   Shared check-list item component
──────────────────────────────────────────────── */
const CheckItem = ({ children }) => (
    <li>
        <i className="fa-regular fa-check" />
        {children}
    </li>
);

/* ─────────────────────────────────────────────
   FAQ accordion item
──────────────────────────────────────────────── */
const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            style={{
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                padding: '20px 0',
                cursor: 'pointer',
            }}
            onClick={() => setOpen(o => !o)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{question}</h4>
                {open
                    ? <ChevronUp size={18} style={{ color: '#14b8a6', flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: '#64748b', flexShrink: 0 }} />
                }
            </div>
            {open && (
                <p style={{ margin: '14px 0 0', fontSize: '15px', color: '#475569', lineHeight: '1.7' }}>
                    {answer}
                </p>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   Feature section — text left, widget right
──────────────────────────────────────────────── */
const FeatureBlock = ({ title, intro, body, benefits, DashboardComponent, reverse = false }) => (
    <div className="stiky-single">
        <div className={`row align-items-center${reverse ? ' flex-row-reverse' : ''}`}>
            <div className="col-lg-6">
                <div className="headding">
                    <h3>{title}</h3>
                    <div className="space16" />
                    <p>{intro}</p>
                    {body && (
                        <>
                            <div className="space16" />
                            <p>{body}</p>
                        </>
                    )}
                    <div className="space16" />
                    <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Key Benefits:</div>
                    <ul className="list">
                        {benefits.map((b, i) => (
                            <CheckItem key={i}>{b}</CheckItem>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-lg-6">
                <div style={{ padding: '10px' }}>
                    <DashboardComponent />
                </div>
            </div>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Why Choose card
──────────────────────────────────────────────── */
const WhyCard = ({ Icon, title, desc, color }) => (
    <div className="col-lg-3 col-md-6">
        <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '32px 24px',
            height: '100%',
            boxShadow: '0 4px 24px rgba(13, 115, 119, 0.08)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(13, 115, 119, 0.15)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(13, 115, 119, 0.08)';
            }}
        >
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Icon size={24} style={{ color }} />
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{title}</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{desc}</p>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Features page
──────────────────────────────────────────────── */
const Features = () => {
    const faqs = [
        {
            question: 'What is B2B data intelligence?',
            answer: 'B2B data intelligence provides insights into companies, decision-makers, and buying behavior that help businesses improve targeting and lead generation. It combines verified contact data, firmographic details, and intent signals to give sales and marketing teams a competitive advantage.'
        },
        {
            question: 'How often is the data updated?',
            answer: 'Our databases undergo continuous validation and updates to maintain accuracy. Email addresses, phone numbers, and company information are verified on a rolling basis, ensuring the data you use is current and reliable.'
        },
        {
            question: 'What industries are covered?',
            answer: 'Technology, healthcare, SaaS, manufacturing, finance, retail, and many other industries. Our database spans over 120 industry categories across 50+ countries, giving you broad and deep coverage for any target market.'
        },
        {
            question: 'Can the data integrate with CRM systems?',
            answer: 'Yes. Data Marketics supports seamless integration with leading CRM and marketing platforms including Salesforce, HubSpot, Zoho CRM, Microsoft Dynamics, and Marketo. Data is pushed directly into your workflows without manual effort.'
        },
        {
            question: 'Why is data enrichment important?',
            answer: 'Data enrichment improves the quality and completeness of customer records, enabling better marketing segmentation, more personalized outreach, and stronger sales performance. Incomplete records lead to missed opportunities — enrichment closes those gaps automatically.'
        },
    ];

    return (
        <>
            <Helmet>
                <title>Features | Advanced B2B Data &amp; Marketing Solutions | Data Marketics</title>
                <meta name="description" content="Explore the powerful features of Data Marketics including verified B2B data, intent intelligence, data enrichment, CRM integration, and global business coverage." />
                <link rel="canonical" href="https://datamarketics.com/features" />
            </Helmet>

            {/* ── HERO ── */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>
                                    Advanced B2B Data Features Designed for Smarter Marketing
                                </h1>
                                <div className="space16" />
                                <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#475569' }}>
                                    Powering Business Growth with Accurate Data and Actionable Insights. Our platform combines verified business intelligence, intent-driven insights, and advanced data management capabilities to support successful marketing and lead generation initiatives.
                                </p>
                                <div className="space30" />
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div style={{ padding: '10px' }}>
                                <FeaturesHeroWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FEATURE SECTIONS ── */}
            <div className="stiky-sec sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="stiky-sec-boxs _relative">

                                {/* 1 — Verified B2B Contact Data */}
                                <FeatureBlock
                                    title="Verified B2B Contact Data"
                                    intro="Accurate contact information is essential for successful sales and marketing campaigns. Our verified B2B contact database provides access to decision-makers across multiple industries, helping businesses connect with qualified prospects and improve engagement rates."
                                    benefits={[
                                        'Verified email addresses with high deliverability',
                                        'Direct contact information for key decision-makers',
                                        'Access to C-suite, VPs, and department heads',
                                        'Continuous data validation and refresh cycles',
                                        'Global business coverage across 50+ countries',
                                    ]}
                                    DashboardComponent={VerifiedContactDashboard}
                                />

                                {/* 2 — Intent Data Intelligence */}
                                <FeatureBlock
                                    title="Intent Data Intelligence"
                                    intro="Understanding buyer intent allows organizations to focus on prospects that are actively researching products and services. Our intent data solutions help identify high-potential opportunities based on online behavior, engagement patterns, and buying signals."
                                    benefits={[
                                        'Identify active buyers before your competitors do',
                                        'Prioritize sales opportunities with intent scoring',
                                        'Improve campaign targeting using behavior data',
                                        'Increase conversion rates with timely outreach',
                                        'Reduce sales cycles by engaging ready buyers',
                                    ]}
                                    DashboardComponent={IntentDataDashboard}
                                    reverse={true}
                                />

                                {/* 3 — Firmographic Intelligence */}
                                <FeatureBlock
                                    title="Firmographic Intelligence"
                                    intro="Firmographic data helps businesses understand company characteristics and identify ideal customer profiles. Our firmographic insights support better audience segmentation and targeting across industries, company sizes, and geographies."
                                    benefits={[
                                        'Company size and employee headcount data',
                                        'Industry classification and SIC/NAICS codes',
                                        'Annual revenue and funding information',
                                        'Geographic location and regional presence',
                                        'Ideal customer profile (ICP) modeling support',
                                    ]}
                                    DashboardComponent={FirmographicDashboard}
                                />

                                {/* 4 — Technographic Insights */}
                                <FeatureBlock
                                    title="Technographic Insights"
                                    intro="Technology adoption plays a significant role in purchasing decisions. Our technographic intelligence provides visibility into the software, platforms, and tools that companies use, helping organizations target prospects with greater relevance and precision."
                                    benefits={[
                                        'Software usage and technology stack profiling',
                                        'CRM platform identification (Salesforce, HubSpot)',
                                        'Cloud adoption and infrastructure insights',
                                        'Marketing technology and automation tools',
                                        'Competitive displacement intelligence',
                                    ]}
                                    DashboardComponent={TechnographicDashboard}
                                    reverse={true}
                                />

                                {/* 5 — Data Enrichment */}
                                <FeatureBlock
                                    title="Data Enrichment Capabilities"
                                    intro="Incomplete or outdated customer data can negatively impact marketing performance. Our data enrichment services help organizations improve database quality by adding missing information and updating existing records with verified, current data."
                                    benefits={[
                                        'Better audience segmentation with complete records',
                                        'Improved personalization for higher engagement',
                                        'Enhanced CRM data accuracy and completeness',
                                        'Stronger marketing campaigns and lead quality',
                                        'Automated field completion for missing attributes',
                                    ]}
                                    DashboardComponent={DataEnrichmentDashboard2}
                                />

                                {/* 6 — Email Verification */}
                                <FeatureBlock
                                    title="Email Verification Technology"
                                    intro="Email deliverability is critical for successful outreach campaigns. Our email verification process helps businesses maintain accurate contact databases, reduce bounce rates, and protect sender reputation for stronger campaign performance."
                                    benefits={[
                                        'Improved deliverability and inbox placement rates',
                                        'Reduced hard and soft bounce rates',
                                        'Better sender reputation protection',
                                        'Higher engagement and open rates',
                                        'Real-time and bulk verification capabilities',
                                    ]}
                                    DashboardComponent={EmailVerificationDashboard}
                                    reverse={true}
                                />

                                {/* 7 — Global Coverage */}
                                <FeatureBlock
                                    title="Global Business Coverage"
                                    intro="Data Marketics supports organizations targeting local, regional, and global markets. Our database covers businesses across North America, Europe, Asia-Pacific, the Middle East, and emerging markets, enabling organizations to expand into new territories."
                                    benefits={[
                                        'Comprehensive North America and Europe coverage',
                                        'Fast-growing Asia-Pacific market access',
                                        'Middle East and emerging market intelligence',
                                        'Localized data for regional targeting campaigns',
                                        'Multi-language support for global outreach',
                                    ]}
                                    DashboardComponent={GlobalCoverageDashboard}
                                />

                                {/* 8 — CRM Integration */}
                                <FeatureBlock
                                    title="CRM &amp; Marketing Platform Integration"
                                    intro="Our solutions integrate seamlessly with leading CRM and marketing platforms including Salesforce, HubSpot, Zoho CRM, Microsoft Dynamics, and Marketo. These integrations help businesses streamline workflows and improve operational efficiency."
                                    benefits={[
                                        'Native Salesforce and HubSpot integration',
                                        'Zoho CRM and Microsoft Dynamics support',
                                        'Marketo marketing automation connectivity',
                                        'Automated data sync and workflow triggers',
                                        'No manual data exports or imports required',
                                    ]}
                                    DashboardComponent={CRMIntegrationDashboard}
                                    reverse={true}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── WHY CHOOSE DATA MARKETICS ── */}
            <div style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div className="row justify-content-center" style={{ marginBottom: '56px' }}>
                        <div className="col-lg-7 text-center">
                            <p style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#14b8a6', letterSpacing: '0.08em', marginBottom: '12px' }}>Why Choose Us</p>
                            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', lineHeight: '1.2', margin: 0 }}>
                                Why Businesses Choose Data Marketics
                            </h2>
                            <div style={{ width: '56px', height: '4px', background: 'linear-gradient(to right, #14b8a6, #6366f1)', borderRadius: '2px', margin: '20px auto 0' }} />
                        </div>
                    </div>
                    <div className="row g-4">
                        <WhyCard
                            Icon={ShieldCheck}
                            title="Reliable Data Quality"
                            desc="We focus on accuracy and consistency across every dataset, with continuous validation processes to maintain high data integrity."
                            color="#14b8a6"
                        />
                        <WhyCard
                            Icon={Award}
                            title="Industry Expertise"
                            desc="Our experience spans multiple industries and business sectors, giving us a deep understanding of diverse market dynamics and customer needs."
                            color="#6366f1"
                        />
                        <WhyCard
                            Icon={Layers}
                            title="Scalable Solutions"
                            desc="We support organizations of all sizes — from startups to large enterprises — with flexible data solutions that grow with your business."
                            color="#f59e0b"
                        />
                        <WhyCard
                            Icon={HeartHandshake}
                            title="Customer-Focused"
                            desc="Dedicated support and customized solutions aligned with your business goals. We partner with you to drive measurable outcomes."
                            color="#0ea5e9"
                        />
                    </div>
                </div>
            </div>

            {/* ── INNOVATION / ANALYTICAL OVERVIEW ── */}
            <div className="email-innovation" style={{ backgroundColor: '#25b9a3' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="headding2-w">
                                <h2>Unlocking Business Potential with Data Intelligence</h2>
                                <div className="space16" />
                                <p>Data Marketics empowers businesses with intelligent marketing tools designed to optimize engagement, enhance lead management, and increase conversions. By delivering the right message to the right audience at the right time, we help organizations build sustainable growth and long-term success.</p>
                                <div className="space16" />
                                <p style={{ fontWeight: 'bold' }}>Our features support:</p>
                                <ul className="list" style={{ color: '#fff', paddingLeft: '20px', marginTop: '15px' }}>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Precision audience targeting</li>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Improved marketing efficiency</li>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Higher lead conversion rates</li>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Scalable business growth</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="images">
                                <div className="image1" style={{ padding: '10px' }}><AnalyticalOverviewDashboard /></div>
                                <div className="image2"><img className="img-fluid" src={innovationShape1} alt="Shape" /></div>
                                <div className="image3"><img className="img-fluid" src={innovationShape2} alt="Shape" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FAQ ── */}
            <div style={{ padding: '80px 0', background: '#ffffff' }}>
                <div className="container">
                    <div className="row justify-content-center" style={{ marginBottom: '48px' }}>
                        <div className="col-lg-7 text-center">
                            <p style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#14b8a6', letterSpacing: '0.08em', marginBottom: '12px' }}>FAQ</p>
                            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', lineHeight: '1.2', margin: 0 }}>
                                Frequently Asked Questions
                            </h2>
                            <div style={{ width: '56px', height: '4px', background: 'linear-gradient(to right, #14b8a6, #6366f1)', borderRadius: '2px', margin: '20px auto 0' }} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {faqs.map((faq, i) => (
                                <FAQItem key={i} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CTA ── */}
            <div className="cta-area" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d4a4e 100%)', padding: '90px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative orbs */}
                <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(20, 184, 166, 0.12)', filter: 'blur(40px)' }} />
                <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.12)', filter: 'blur(40px)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <p style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#14b8a6', letterSpacing: '0.1em', marginBottom: '18px' }}>Get Started</p>
                            <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '20px' }}>
                                Ready to Unlock Better Business Intelligence?
                            </h2>
                            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', lineHeight: '1.7' }}>
                                Discover how Data Marketics can help your organization improve targeting, strengthen customer data, and accelerate growth through advanced B2B data solutions. Contact our team today to learn more.
                            </p>
                            <Link
                                to="/contact"
                                className="theme-btn2"
                                style={{
                                    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '18px 48px',
                                    borderRadius: '50px',
                                    fontSize: '17px',
                                    fontWeight: '700',
                                    boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'all 0.3s ease',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(20, 184, 166, 0.45)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 184, 166, 0.35)';
                                }}
                            >
                                Contact Our Team
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;
