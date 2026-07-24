import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Mail,
    Phone,
    Clock,
    Target,
    UserCheck,
} from 'lucide-react';

const NEXT_STEPS = [
    {
        icon: <Clock size={20} strokeWidth={2.2} />,
        title: 'Within 24 hours',
        text: 'Our team will review your request and respond via the email you shared.',
    },
    {
        icon: <Target size={20} strokeWidth={2.2} />,
        title: 'Tailored to your ICP',
        text: 'We prepare targeted data suggestions based on your industry and geography.',
    },
    {
        icon: <UserCheck size={20} strokeWidth={2.2} />,
        title: 'A real person, not a bot',
        text: 'A dedicated account specialist will guide the next steps end-to-end.',
    },
];

export default function ThankYou() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Thank You | Data Marketics</title>
                <meta name="description" content="Thanks for reaching out — the Data Marketics team will get back to you within 24 hours." />
                <meta name="robots" content="noindex, follow" />
                <link rel="canonical" href="https://datamarketics.com/thank-you" />
            </Helmet>

            <div
                style={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 20px',
                    background: 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Ambient orbs — same visual language as other pages */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: '360px',
                        height: '360px',
                        background: 'radial-gradient(circle, rgba(45,212,191,0.28) 0%, rgba(45,212,191,0) 70%)',
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
                        background: 'radial-gradient(circle, rgba(94,234,212,0.22) 0%, rgba(94,234,212,0) 70%)',
                        pointerEvents: 'none',
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        maxWidth: '680px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.88)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                        borderRadius: '28px',
                        padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 56px)',
                        textAlign: 'center',
                        boxShadow: '0 30px 80px rgba(13, 115, 119, 0.18)',
                        border: '1px solid rgba(45, 212, 191, 0.24)',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -160 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{
                            width: '112px',
                            height: '112px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #0d7377 0%, #14b8a6 50%, #2dd4bf 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 32px',
                            boxShadow: '0 20px 44px rgba(20, 184, 166, 0.42), inset 0 1px 0 rgba(255,255,255,0.35)',
                        }}
                    >
                        <CheckCircle2 size={64} color="#ffffff" strokeWidth={2.4} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        style={{
                            fontSize: 'clamp(32px, 5vw, 44px)',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            background: 'linear-gradient(135deg, #042f2e 0%, #0d7377 50%, #14b8a6 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            margin: '0 0 14px 0',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Thank you!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                            fontSize: '18px',
                            color: '#0b2727',
                            fontWeight: 600,
                            margin: '0 0 12px 0',
                        }}
                    >
                        Your request has been received.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5 }}
                        style={{
                            fontSize: '15.5px',
                            color: '#4f6b6b',
                            lineHeight: 1.75,
                            margin: '0 auto 36px',
                            maxWidth: '520px',
                        }}
                    >
                        Our team at Data Marketics will get back to you within 24 hours with tailored insights,
                        a sample of the data you asked about, and clear next steps to accelerate your pipeline.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.5 }}
                        className="d-flex flex-wrap justify-content-center gap-3"
                        style={{ marginBottom: '48px' }}
                    >
                        <Link to="/" className="theme-btn2 d-inline-flex align-items-center gap-2">
                            Back to Home <ArrowRight size={16} />
                        </Link>
                        <Link
                            to="/services"
                            className="theme-btn3"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            Explore Our Services
                        </Link>
                    </motion.div>

                    {/* What happens next — 3 tiles */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.5 }}
                        style={{
                            paddingTop: '32px',
                            borderTop: '1px solid rgba(45, 212, 191, 0.22)',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '11.5px',
                                fontWeight: 800,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: '#0d7377',
                                margin: '0 0 20px 0',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Sparkles size={13} /> What happens next
                        </p>
                        <div className="row g-3 text-start">
                            {NEXT_STEPS.map((step, i) => (
                                <div key={i} className="col-12 col-md-4">
                                    <div
                                        style={{
                                            background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)',
                                            border: '1px solid rgba(45, 212, 191, 0.24)',
                                            borderRadius: '14px',
                                            padding: '18px 16px',
                                            height: '100%',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '10px',
                                                background: 'rgba(20, 184, 166, 0.14)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#0d7377',
                                                marginBottom: '12px',
                                            }}
                                        >
                                            {step.icon}
                                        </div>
                                        <p style={{ margin: '0 0 6px 0', fontWeight: 700, color: '#0b2727', fontSize: '14.5px' }}>
                                            {step.title}
                                        </p>
                                        <p style={{ margin: 0, color: '#4f6b6b', fontSize: '13px', lineHeight: 1.55 }}>
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Need immediate help? */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        style={{
                            marginTop: '32px',
                            paddingTop: '24px',
                            borderTop: '1px dashed rgba(45, 212, 191, 0.28)',
                        }}
                    >
                        <p style={{ fontSize: '13px', color: '#4f6b6b', margin: '0 0 12px 0', fontWeight: 600 }}>
                            Need immediate help? Reach us directly:
                        </p>
                        <div className="d-flex flex-wrap justify-content-center gap-4">
                            <a
                                href="mailto:sales@datamarketics.com"
                                style={{
                                    color: '#0d7377',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                <Mail size={15} /> sales@datamarketics.com
                            </a>
                            <a
                                href="tel:+16093222666"
                                style={{
                                    color: '#0d7377',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                <Phone size={15} /> +1 (609) 322-2666
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
