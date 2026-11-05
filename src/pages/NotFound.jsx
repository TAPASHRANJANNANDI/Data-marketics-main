import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Compass, ArrowRight, Mail, Phone } from 'lucide-react';

// Unknown URLs used to fall through to the homepage, which Google reports as
// a soft 404 and which wastes crawl budget. This page is pre-rendered to
// dist/404.html and served by the web server with a real 404 status.
const SERVICE_LINKS = [
    { to: '/b2b-lead-generation', label: 'B2B Lead Generation' },
    { to: '/demand-generation', label: 'Demand Generation' },
    { to: '/data-enrichment', label: 'Data Enrichment' },
    { to: '/intent-data', label: 'Intent Data' },
    { to: '/technographic-data', label: 'Technographic Data' },
    { to: '/appointment-setting', label: 'Appointment Setting' },
    { to: '/exhibitors-data', label: 'Exhibitors Data' },
];

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found | Data Marketics</title>
                <meta name="description" content="The page you were looking for could not be found. Browse Data Marketics B2B data and lead generation services, or get in touch with our team." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div
                style={{
                    minHeight: '75vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 20px',
                    background: 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: '360px',
                        height: '360px',
                        background: 'radial-gradient(circle, rgba(45,212,191,0.26) 0%, rgba(45,212,191,0) 70%)',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '5%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(94,234,212,0.2) 0%, rgba(94,234,212,0) 70%)',
                        pointerEvents: 'none',
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        maxWidth: '720px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                        borderRadius: '28px',
                        padding: 'clamp(40px, 6vw, 60px) clamp(24px, 5vw, 54px)',
                        textAlign: 'center',
                        boxShadow: '0 30px 80px rgba(13, 115, 119, 0.18)',
                        border: '1px solid rgba(45, 212, 191, 0.24)',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: '96px',
                            height: '96px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 28px',
                            boxShadow: '0 20px 44px rgba(20, 184, 166, 0.4), inset 0 1px 0 rgba(255,255,255,0.35)',
                        }}
                    >
                        <Compass size={52} color="#ffffff" strokeWidth={2.2} />
                    </div>

                    <p
                        style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#0d7377',
                            margin: '0 0 12px 0',
                        }}
                    >
                        Error 404
                    </p>

                    <h1
                        style={{
                            fontSize: 'clamp(30px, 5vw, 42px)',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            color: '#042f2e',
                            margin: '0 0 14px 0',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Page not found
                    </h1>

                    <p
                        style={{
                            fontSize: '15.5px',
                            color: '#4f6b6b',
                            lineHeight: 1.75,
                            margin: '0 auto 32px',
                            maxWidth: '520px',
                        }}
                    >
                        The page you were looking for has been moved, renamed, or never existed.
                        Start from the homepage, browse our B2B data and lead generation services,
                        or contact the Data Marketics team and we will point you to the right place.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3" style={{ marginBottom: '40px' }}>
                        <Link to="/" className="theme-btn2 d-inline-flex align-items-center gap-2">
                            Back to Home <ArrowRight size={16} />
                        </Link>
                        <Link to="/services" className="theme-btn3" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            Our Services
                        </Link>
                        <Link to="/contact" className="theme-btn3" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            Contact Us
                        </Link>
                    </div>

                    <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(45, 212, 191, 0.22)' }}>
                        <p
                            style={{
                                fontSize: '11.5px',
                                fontWeight: 800,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: '#0d7377',
                                margin: '0 0 16px 0',
                            }}
                        >
                            Popular pages
                        </p>
                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: '0 0 20px 0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px 14px',
                                justifyContent: 'center',
                            }}
                        >
                            {SERVICE_LINKS.map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        style={{
                                            display: 'inline-block',
                                            padding: '7px 14px',
                                            borderRadius: '999px',
                                            background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)',
                                            border: '1px solid rgba(45, 212, 191, 0.24)',
                                            color: '#0d7377',
                                            fontSize: '13.5px',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p style={{ fontSize: '13px', color: '#4f6b6b', margin: '0 0 10px 0', fontWeight: 600 }}>
                            Also try the <Link to="/blog" style={{ color: '#0d7377', fontWeight: 700 }}>blog</Link> or
                            the <Link to="/sitemap" style={{ color: '#0d7377', fontWeight: 700 }}>sitemap</Link>.
                        </p>
                        <div className="d-flex flex-wrap justify-content-center gap-4" style={{ marginTop: '14px' }}>
                            <a
                                href="mailto:sales@datamarketics.com"
                                style={{ color: '#0d7377', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                                <Mail size={15} /> sales@datamarketics.com
                            </a>
                            <a
                                href="tel:+16093222666"
                                style={{ color: '#0d7377', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                                <Phone size={15} /> +1 (609) 322-2666
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
