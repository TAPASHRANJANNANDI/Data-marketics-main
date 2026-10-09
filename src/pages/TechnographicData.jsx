import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const SEO = {
    title: 'Technographic Data Solutions for B2B Sales | Datamarketics',
    description: 'Discover the technologies companies use with technographic data solutions from Datamarketics. Identify relevant accounts and improve targeted sales prospecting.',
    keywords: 'Technographic data providers, technographic data services, technographic intelligence, technology stack data, technology install data, technographic database',
    url: 'https://datamarketics.com/technographic-data',
};

const benefits = [
    { t: 'Identify Better-Fit Prospects', d: 'Use technology adoption insights to help identify companies whose existing technology environment aligns with your product or service.' },
    { t: 'Personalize Sales Outreach', d: "Develop more relevant conversations based on a prospect's potential technology needs, existing systems, and business priorities." },
    { t: 'Support Account-Based Marketing', d: 'Use technology-related insights alongside company and decision-maker information to support account research and targeted campaigns.' },
    { t: 'Discover Potential Sales Opportunities', d: 'Technology changes, new implementations, and evolving business requirements can indicate opportunities for relevant solutions. Technographic data can help inform research into these opportunities, although it does not guarantee buying intent.' },
    { t: 'Improve Prospect Prioritization', d: 'Combine technology insights with firmographic information and other qualification criteria to help your team prioritize accounts more effectively.' },
];

const dataFields = [
    { icon: '🧩', t: 'Software and applications', d: 'Business software, CRM platforms, marketing automation tools, and other applications.' },
    { icon: '☁️', t: 'Cloud and infrastructure technologies', d: 'Cloud platforms, hosting technologies, and relevant infrastructure tools.' },
    { icon: '🔒', t: 'Security technologies', d: 'Cybersecurity products and related technology categories.' },
    { icon: '🛒', t: 'E-commerce platforms', d: 'Online store platforms and supporting business technologies.' },
    { icon: '📶', t: 'Technology adoption indicators', d: 'Available signals about the technologies a company uses or has implemented.' },
    { icon: '🏢', t: 'Company information', d: 'Business name, industry, company size, and website, where available.' },
    { icon: '👤', t: 'Contact information', d: 'Relevant business contacts and professional details, where available.' },
];

const steps = [
    { t: 'Define Your Ideal Customer Profile', d: 'Determine which industries, company sizes, business models, and technology environments are most relevant to your offering.' },
    { t: 'Identify Relevant Companies', d: 'Use available technology indicators and company attributes to identify accounts that may fit your target profile.' },
    { t: 'Find the Right Decision-Makers', d: 'Combine company-level insights with relevant professional contact information to identify people involved in technology evaluation or purchasing decisions.' },
    { t: 'Personalize Your Campaigns', d: 'Adapt your messaging to the potential needs of each account instead of relying on generic outreach.' },
    { t: 'Refine Your Targeting', d: 'Review engagement and campaign results to understand which account characteristics and technology indicators are most useful for your sales process.' },
];

const audiences = [
    { icon: '☁️', t: 'SaaS companies', d: 'Identify businesses that may be relevant prospects for software products and integrations.' },
    { icon: '🛠️', t: 'IT service providers', d: 'Research company technology environments to support relevant service outreach.' },
    { icon: '🛡️', t: 'Cybersecurity vendors', d: 'Identify accounts whose technology environments align with their security offerings.' },
    { icon: '🌐', t: 'Cloud and infrastructure providers', d: 'Research businesses that may be relevant to cloud migration, hosting, or infrastructure solutions.' },
    { icon: '📣', t: 'Marketing technology companies', d: 'Find potential customers whose technology environment aligns with their marketing solutions.' },
    { icon: '👥', t: 'Sales and marketing teams', d: 'Enrich account research and develop more focused prospecting campaigns.' },
];

const comparison = [
    { type: 'Technographic data', tells: 'Technologies a company uses', example: 'CRM, cloud platform, marketing software' },
    { type: 'Firmographic data', tells: 'Characteristics of a company', example: 'Industry, company size, location' },
    { type: 'Contact data', tells: 'Information about business professionals', example: 'Job title, business email, department' },
    { type: 'Intent data', tells: 'Available indicators of potential research or buying interest', example: 'Topic research or relevant purchase-intent signals' },
];

const approach = [
    { t: 'Relevant targeting', d: 'Focus on companies that align with your ideal customer profile.' },
    { t: 'Data-informed prospecting', d: 'Use available business and technology insights to guide account research.' },
    { t: 'Connected data insights', d: 'Bring technology information together with company and contact details where available.' },
    { t: 'Sales-focused use cases', d: 'Apply prospect insights to account selection, campaign planning, and outreach.' },
];

const faqs = [
    { q: 'What is a technographic database?', a: 'A technographic database organizes information about the technologies companies use. Depending on its coverage, it may include software, cloud infrastructure, security tools, and other business applications.' },
    { q: 'How do businesses use technographic data for sales prospecting?', a: 'Sales teams can use technology-related insights to identify potentially relevant accounts, research technology environments, tailor outreach, and prioritize prospects based on their ideal customer profile.' },
    { q: 'What is the difference between technographic and intent data?', a: 'Technographic data describes the technologies a company uses or is associated with. Intent data provides indicators that a company may be researching a topic, solution, or purchase. Neither type of data alone guarantees that a company is ready to buy.' },
    { q: 'Can technographic data be combined with contact data?', a: 'Yes. Where suitable data is available, technology insights can be combined with company profiles and professional contact information to support more targeted prospecting and account research.' },
    { q: 'How can I get started with Datamarketics?', a: 'Contact Datamarketics to discuss your target industries, technology categories, markets, and prospecting objectives. Our team can help clarify which data options are relevant to your requirements.' },
];

// Shared inline styles, matching the cards used on the industry pages.
const card = { background: '#fff', borderRadius: '16px', padding: '26px 24px', border: '1px solid rgba(45,212,191,0.2)', boxShadow: '0 8px 24px rgba(13,115,119,0.08)', height: '100%' };
const cardTitle = { fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--dm-ink)' };
const cardText = { fontSize: '14px', color: 'var(--dm-muted)', margin: 0, lineHeight: 1.6 };
const bodyText = { fontSize: '16px', color: 'var(--dm-muted)', lineHeight: 1.75, marginBottom: '16px' };
const inlineLink = { color: 'var(--dm-teal-800)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' };

const CheckIcon = ({ size = 28 }) => (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--dm-grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size / 2} height={size / 2} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
);

// Numbered circle shown before each section heading, as in the visual reference.
const SectionNumber = ({ n }) => (
    <span aria-hidden="true" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--dm-grad-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', marginBottom: '14px', boxShadow: '0 8px 20px rgba(13,115,119,0.25)' }}>{n}</span>
);

// Decorative technology-stack illustration for the hero (no data, names or figures).
const HeroIllustration = () => {
    const pill = (label, style) => (
        <span style={{ position: 'absolute', background: '#fff', color: 'var(--dm-ink)', fontWeight: 700, fontSize: '13px', padding: '8px 14px', borderRadius: '12px', boxShadow: '0 10px 24px rgba(13,115,119,0.16)', border: '1px solid rgba(45,212,191,0.25)', whiteSpace: 'nowrap', ...style }}>{label}</span>
    );
    return (
        <div style={{ position: 'relative', maxWidth: '540px', margin: '0 auto', padding: '30px 10px' }}>
            <svg viewBox="0 0 520 360" width="100%" role="img" aria-label="Illustration of a company technology stack: software, cloud, data and security tools">
                <defs>
                    <linearGradient id="tg-screen" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ecfdf5" />
                        <stop offset="100%" stopColor="#ccfbf1" />
                    </linearGradient>
                    <linearGradient id="tg-teal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0d7377" />
                        <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                </defs>
                {/* soft backdrop */}
                <ellipse cx="260" cy="320" rx="220" ry="26" fill="#99f6e4" opacity="0.35" />
                <circle cx="260" cy="170" r="150" fill="#ccfbf1" opacity="0.45" />
                {/* cloud */}
                <g transform="translate(330 30)">
                    <path d="M30 70 h90 a28 28 0 0 0 0-56 a40 40 0 0 0-76-6 a30 30 0 0 0-14 62z" fill="url(#tg-teal)" opacity="0.9" />
                    <path d="M62 52 v-22 m0 0 l-9 9 m9-9 l9 9" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                {/* database */}
                <g transform="translate(420 150)">
                    <ellipse cx="40" cy="12" rx="40" ry="12" fill="#5eead4" />
                    <path d="M0 12 v96 a40 12 0 0 0 80 0 v-96" fill="url(#tg-teal)" />
                    <path d="M0 44 a40 12 0 0 0 80 0 M0 76 a40 12 0 0 0 80 0" stroke="#ccfbf1" strokeWidth="3" fill="none" />
                </g>
                {/* laptop */}
                <g transform="translate(110 110)">
                    <rect x="0" y="0" width="290" height="180" rx="14" fill="#0b2727" />
                    <rect x="12" y="12" width="266" height="156" rx="8" fill="url(#tg-screen)" />
                    <rect x="24" y="24" width="64" height="132" rx="6" fill="#ffffff" opacity="0.85" />
                    <rect x="34" y="38" width="44" height="8" rx="4" fill="#99f6e4" />
                    <rect x="34" y="56" width="36" height="8" rx="4" fill="#ccfbf1" />
                    <rect x="34" y="74" width="40" height="8" rx="4" fill="#ccfbf1" />
                    <rect x="34" y="92" width="30" height="8" rx="4" fill="#ccfbf1" />
                    <rect x="104" y="96" width="18" height="52" rx="4" fill="#14b8a6" />
                    <rect x="130" y="72" width="18" height="76" rx="4" fill="#0d9488" />
                    <rect x="156" y="110" width="18" height="38" rx="4" fill="#2dd4bf" />
                    <rect x="182" y="58" width="18" height="90" rx="4" fill="#0d7377" />
                    <circle cx="240" cy="70" r="24" fill="none" stroke="#ccfbf1" strokeWidth="10" />
                    <path d="M240 46 a24 24 0 1 1 -22 34" fill="none" stroke="#14b8a6" strokeWidth="10" strokeLinecap="round" />
                    <path d="M-24 180 h338 l-18 18 h-302z" fill="#134e4a" />
                </g>
            </svg>
            {pill('SaaS', { top: '6%', left: '30%' })}
            {pill('CRM', { top: '30%', left: '0%' })}
            {pill('Security', { top: '56%', left: '2%' })}
            {pill('Cloud', { top: '2%', right: '4%' })}
            {pill('Marketing Tools', { bottom: '10%', right: '0%' })}
        </div>
    );
};

const TechnographicData = () => {
    const [openFaq, setOpenFaq] = React.useState(null);

    return (
        <>
            <Helmet>
                <title>Technographic Data Solutions for B2B Sales | Datamarketics</title>
                <meta name="description" content={SEO.description} />
                <meta name="keywords" content={SEO.keywords} />
                <link rel="canonical" href={SEO.url} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={SEO.title} />
                <meta property="og:description" content={SEO.description} />
                <meta property="og:url" content={SEO.url} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={SEO.title} />
                <meta name="twitter:description" content={SEO.description} />
            </Helmet>

            {/* 1. Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div className="main-headding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                                <span className="services-eyebrow">TECHNOGRAPHIC DATA</span>
                                <div className="space16"></div>
                                <h1 style={{ fontSize: '46px', lineHeight: '1.1' }}>Technographic Data Solutions for Smarter <span>B2B Prospecting</span></h1>
                                <div className="space16"></div>
                                <p>Understand the technologies businesses use to identify relevant prospects, personalize outreach, and make better sales and marketing decisions. Datamarketics helps businesses use company and technology insights to support more focused prospecting and account research.</p>
                                <div className="space16"></div>
                                <p>By understanding a company's technology environment, your team can better identify potential opportunities, prioritize target accounts, and develop outreach that aligns with a prospect's business needs.</p>
                                <div className="space20"></div>
                                <p style={{ display: 'inline-block', background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(45,212,191,0.35)', borderLeft: '4px solid var(--dm-teal-600)', borderRadius: '12px', padding: '12px 16px', fontWeight: 800, color: 'var(--dm-teal-900)', margin: 0 }}>
                                    Identify the Right Accounts. Understand Their Technology. Improve Your Outreach.
                                </p>
                                <div className="space30"></div>
                                <div className="hero-btns" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
                                    <Link to="/contact" className="theme-btn2">Contact Datamarketics</Link>
                                    <span style={{ fontSize: '15px', color: 'var(--dm-ink-soft)', flex: '1 1 220px' }}>to discuss your prospecting and business data requirements.</span>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <HeroIllustration />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. What Is Technographic Data? */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} variants={fadeUp}>
                                <SectionNumber n={1} />
                                <h2>What Is Technographic Data?</h2>
                                <div className="space16"></div>
                                <p style={bodyText}>Technographic data provides information about the technologies a company uses, such as software applications, cloud platforms, customer relationship management systems, marketing tools, cybersecurity solutions, and other business technologies.</p>
                                <p style={bodyText}>These insights can help sales and marketing teams understand a company's technology environment and identify potential opportunities that align with their products or services.</p>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} variants={fadeUp} style={{ ...card, background: 'var(--dm-grad-soft)', padding: '32px 30px' }}>
                                <div style={{ fontSize: '36px', marginBottom: '12px' }}>💡</div>
                                <p style={{ ...bodyText, color: 'var(--dm-ink-soft)' }}>For example, a software provider selling marketing automation solutions may use technology insights to identify businesses that use related platforms or may benefit from a different solution.</p>
                                <p style={{ ...bodyText, color: 'var(--dm-ink-soft)', marginBottom: 0 }}>When combined with relevant company and contact information, technographic insights can support more informed prospect selection and personalized sales outreach.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Why Is Technographic Data Important? */}
            <div className="about-page-area2 sp" style={{ background: 'var(--dm-grad-soft)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={2} />
                                <h2>Why Is Technographic Data Important?</h2>
                                <div className="space16"></div>
                                <p>Understanding the technology landscape of potential customers can help businesses move beyond broad prospect lists and focus on accounts that are more relevant to their offerings.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4 justify-content-center">
                        {benefits.map((b, i) => (
                            <div className="col-md-6 col-lg-4" key={b.t}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={card}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                                        <CheckIcon />
                                        <h3 style={{ ...cardTitle, margin: 0 }}>{b.t}</h3>
                                    </div>
                                    <p style={cardText}>{b.d}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. What Information Can Technographic Data Include? */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={3} />
                                <h2>What Information Can Technographic Data Include?</h2>
                                <div className="space16"></div>
                                <p>Depending on data availability and coverage, technographic datasets may include:</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4 justify-content-center">
                        {dataFields.map((f, i) => (
                            <div className="col-md-6 col-lg-3" key={f.t}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} style={card}>
                                    <div style={{ fontSize: '30px', marginBottom: '12px' }} aria-hidden="true">{f.icon}</div>
                                    <h3 style={cardTitle}>{f.t}</h3>
                                    <p style={cardText}>{f.d}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                    <div className="space30"></div>
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'var(--dm-teal-100)', border: '1px solid rgba(45,212,191,0.3)', borderRadius: '14px', padding: '18px 20px' }}>
                                <span style={{ fontSize: '20px' }} aria-hidden="true">ℹ️</span>
                                <p style={{ ...cardText, fontSize: '15px', color: 'var(--dm-ink-soft)' }}>The exact fields depend on the dataset, technology coverage, and verification process. Technology usage should be treated as an informed data point, not proof that a company is currently purchasing a solution.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. How Technographic Data Supports Lead Generation */}
            <div className="about-page-area2 sp" style={{ background: 'var(--dm-grad-soft)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={4} />
                                <h2>How Technographic Data Supports Lead Generation</h2>
                                <div className="space16"></div>
                                <p>Technographic insights can strengthen prospecting when combined with other business data.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row">
                        <div className="col-lg-9 m-auto">
                            {steps.map((s, i) => (
                                <motion.div key={s.t} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ ...card, height: 'auto', display: 'flex', gap: '18px', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <span style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--dm-grad-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>{i + 1}</span>
                                    <div>
                                        <h3 style={cardTitle}>{i + 1}. {s.t}</h3>
                                        <p style={cardText}>{s.d}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="space20"></div>
                            <p style={{ ...bodyText, textAlign: 'center', marginBottom: 0 }}>
                                For more support with prospect acquisition, explore our <Link to="/b2b-lead-generation" style={inlineLink}>B2B Lead Generation Services</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Who Can Benefit from Technographic Data? */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={5} />
                                <h2>Who Can Benefit from Technographic Data?</h2>
                                <div className="space16"></div>
                                <p>Technographic insights can be useful for businesses whose products or services depend on the technologies their customers use.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row g-4">
                        {audiences.map((a, i) => (
                            <div className="col-md-6 col-lg-4" key={a.t}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ ...card, textAlign: 'center' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'var(--dm-grad-soft)', border: '1px solid rgba(45,212,191,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 14px' }} aria-hidden="true">{a.icon}</div>
                                    <h3 style={cardTitle}>{a.t}</h3>
                                    <p style={cardText}>{a.d}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                    <div className="space30"></div>
                    <p style={{ ...bodyText, textAlign: 'center', marginBottom: 0 }}>
                        You can also explore our <Link to="/industries/technology" style={inlineLink}>Technology Industry Solutions</Link> to learn about reaching companies and decision-makers in the technology sector.
                    </p>
                </div>
            </div>

            {/* 7. Technographic Data vs. Firmographic Data */}
            <div className="about-page-area2 sp" style={{ background: 'var(--dm-grad-soft)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={6} />
                                <h2>Technographic Data vs. Firmographic Data</h2>
                                <div className="space16"></div>
                                <p>Technographic and firmographic data provide different types of company insights. Used together, they can help build a more complete picture of a potential account.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space40"></div>
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(45,212,191,0.3)', boxShadow: '0 8px 24px rgba(13,115,119,0.08)', background: '#fff' }}>
                                <table style={{ width: '100%', minWidth: '620px', borderCollapse: 'collapse', fontSize: '15px' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--dm-grad-dark)' }}>
                                            {['Data Type', 'What It Tells You', 'Example'].map(h => (
                                                <th key={h} scope="col" style={{ color: '#fff', textAlign: 'left', padding: '16px 20px', fontWeight: 700 }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.map((row, i) => (
                                            <tr key={row.type} style={{ background: i % 2 ? 'var(--dm-teal-100)' : '#fff', borderTop: '1px solid rgba(45,212,191,0.2)' }}>
                                                <th scope="row" style={{ textAlign: 'left', padding: '16px 20px', color: 'var(--dm-ink)', fontWeight: 700 }}>{row.type}</th>
                                                <td style={{ padding: '16px 20px', color: 'var(--dm-ink-soft)' }}>{row.tells}</td>
                                                <td style={{ padding: '16px 20px', color: 'var(--dm-muted)' }}>{row.example}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="space30"></div>
                            <p style={{ ...bodyText, textAlign: 'center', marginBottom: 0 }}>
                                Combining these data types can support account selection and qualification. Explore our <Link to="/intent-data" style={inlineLink}>Intent Data Solutions</Link> and <Link to="/data-enrichment" style={inlineLink}>Data Enrichment Services</Link> for related prospecting capabilities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 8. Why Choose Datamarketics? */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                            <motion.div className="headding2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={7} />
                                <h2>Why Choose Datamarketics?</h2>
                                <div className="space16"></div>
                                <p style={bodyText}>Effective prospecting begins with understanding which companies are relevant to your business and what information your team needs to engage them.</p>
                                <p style={bodyText}>Datamarketics supports business data and lead generation efforts by helping businesses focus on relevant prospects and build more targeted sales and marketing campaigns.</p>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ ...card, padding: '30px 28px' }}>
                                <p style={{ ...cardTitle, fontSize: '17px', marginBottom: '18px' }}>Our approach emphasizes:</p>
                                {approach.map(item => (
                                    <div key={item.t} style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ marginTop: '2px' }}><CheckIcon /></div>
                                        <div>
                                            <strong style={{ fontSize: '15px', color: 'var(--dm-ink)', display: 'block' }}>{item.t}</strong>
                                            <span style={{ fontSize: '14px', color: 'var(--dm-muted)' }}>{item.d}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <p style={{ ...bodyText, textAlign: 'center', marginBottom: 0 }}>Contact our team to discuss your requirements and confirm the available data coverage for your target markets and technology categories.</p>
                </div>
            </div>

            {/* 9. FAQ */}
            <div className="faq-area sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <motion.div className="headding2 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionNumber n={8} />
                                <h2>Frequently Asked Questions</h2>
                                <div className="space16"></div>
                            </motion.div>
                            {faqs.map((faq, i) => (
                                <motion.div key={faq.q} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} style={{ background: '#fff', borderRadius: '14px', border: '1px solid rgba(45,212,191,0.18)', marginBottom: '12px', overflow: 'hidden' }}>
                                    <button type="button" aria-expanded={openFaq === i} aria-controls={`tg-faq-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 700, fontSize: '15px', color: 'var(--dm-ink)', textAlign: 'left' }}>
                                        {faq.q}
                                        <span style={{ fontSize: '20px', color: 'var(--dm-teal-600)', flexShrink: 0, marginLeft: '12px', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                                    </button>
                                    {openFaq === i && <div id={`tg-faq-${i}`} style={{ padding: '0 20px 18px', fontSize: '14px', color: 'var(--dm-muted)', lineHeight: 1.7 }}>{faq.a}</div>}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 10. Final CTA */}
            <div className="cta-area" style={{ background: 'var(--dm-grad-dark)', padding: '80px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2 style={{ color: '#fff', fontSize: '38px', fontWeight: 800, marginBottom: '16px' }}>Find More Relevant Prospects with Better Data Insights</h2>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '24px' }}>Make your prospecting more focused by understanding the companies you want to reach and the technologies they use.</p>
                                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Ready to discuss your requirements?</h3>
                                <Link to="/contact" className="theme-btn2">Contact Datamarketics</Link>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginTop: '18px', marginBottom: 0 }}>to explore business data and lead generation solutions for your sales and marketing goals.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TechnographicData;
