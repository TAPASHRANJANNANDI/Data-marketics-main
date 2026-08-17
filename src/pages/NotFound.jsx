import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Search, Mail } from 'lucide-react';

export default function NotFound() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <Helmet>
                <title>Page not found | Data Marketics</title>
                <meta name="description" content="The page you were looking for could not be found. Head back to the Data Marketics homepage or reach out to our team." />
                <meta name="robots" content="noindex, follow" />
                {/* Hint for pre-render services (prerender.io / rendertron / etc.) so they
                    surface this as a real 404 to search engines rather than a soft-200. */}
                <meta name="prerender-status-code" content="404" />
                <link rel="canonical" href="https://datamarketics.com/404" />
            </Helmet>

            <div style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 20px',
                background: 'transparent',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Ambient orbs */}
                <div aria-hidden="true" style={{ position: 'absolute', top: '10%', right: '8%', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(45,212,191,0.24) 0%, rgba(45,212,191,0) 70%)', pointerEvents: 'none' }} />
                <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', left: '8%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(94,234,212,0.20) 0%, rgba(94,234,212,0) 70%)', pointerEvents: 'none' }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        maxWidth: '680px', width: '100%',
                        background: 'rgba(255, 255, 255, 0.88)',
                        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
                        borderRadius: '28px', padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 56px)',
                        textAlign: 'center',
                        boxShadow: '0 30px 80px rgba(13, 115, 119, 0.16)',
                        border: '1px solid rgba(45, 212, 191, 0.24)',
                        position: 'relative', zIndex: 1,
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{
                            fontSize: 'clamp(78px, 12vw, 132px)',
                            fontWeight: 900,
                            lineHeight: 1,
                            margin: '0 0 8px 0',
                            letterSpacing: '-0.04em',
                            background: 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                        }}
                    >
                        404
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                        style={{
                            fontSize: 'clamp(20px, 2.4vw, 24px)',
                            fontWeight: 800,
                            color: '#0b2727',
                            margin: '0 0 12px 0',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        This page has moved or never existed.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.4 }}
                        style={{
                            fontSize: '15.5px',
                            color: '#4f6b6b',
                            lineHeight: 1.7,
                            margin: '0 auto 32px',
                            maxWidth: '480px',
                        }}
                    >
                        Try one of the popular destinations below, or reach out and we'll point
                        you to the right place.
                    </motion.p>

                    {/* Quick-nav tiles */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="row g-3 text-start"
                        style={{ marginBottom: '32px' }}
                    >
                        {[
                            { to: '/', label: 'Home', desc: 'Back to the top.' },
                            { to: '/services', label: 'Services', desc: 'B2B data, lead & demand gen.' },
                            { to: '/blog', label: 'Blog', desc: 'Playbooks & guides.' },
                            { to: '/contact', label: 'Contact', desc: 'Talk to our team.' },
                        ].map((tile) => (
                            <div key={tile.to} className="col-12 col-sm-6">
                                <Link to={tile.to} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)',
                                        border: '1px solid rgba(45, 212, 191, 0.24)',
                                        borderRadius: '14px',
                                        padding: '14px 16px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                                        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 12px 26px rgba(13, 115, 119, 0.12)';
                                            e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.24)';
                                        }}
                                    >
                                        <div>
                                            <p style={{ margin: '0 0 3px 0', fontWeight: 700, color: '#0b2727', fontSize: '14.5px' }}>{tile.label}</p>
                                            <p style={{ margin: 0, color: '#4f6b6b', fontSize: '13px' }}>{tile.desc}</p>
                                        </div>
                                        <ArrowRight size={16} color="#0d7377" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="d-flex flex-wrap justify-content-center gap-3"
                    >
                        <Link to="/" className="theme-btn2 d-inline-flex align-items-center gap-2">
                            <Home size={16} /> Back to Home
                        </Link>
                        <a
                            href="mailto:sales@datamarketics.com"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                color: '#0d7377', textDecoration: 'none', fontWeight: 700, fontSize: '14.5px',
                                padding: '12px 20px', border: '1.5px solid rgba(45, 212, 191, 0.55)', borderRadius: '999px',
                            }}
                        >
                            <Mail size={15} /> Email us
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
