import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, XCircle, AlertCircle, RefreshCw, Inbox, Sparkles } from 'lucide-react';

const EMAIL_BATCH = [
    { email: 'ceo@techventures.io', status: 'valid', score: 99 },
    { email: 'marketing@cloudbase.net', status: 'valid', score: 97 },
    { email: 'info@old-domain.biz', status: 'invalid', score: 12 },
    { email: 'sales@rapidgrowth.co', status: 'valid', score: 94 },
    { email: 'noreply@webhost2010.com', status: 'risky', score: 45 },
    { email: 'director@prismatic.ai', status: 'valid', score: 98 },
];

const EmailVerificationDashboard = () => {
    const [emails, setEmails] = useState(EMAIL_BATCH);
    const [scanning, setScanning] = useState(0); // index being scanned
    const [deliverability, setDeliverability] = useState(94.2);
    const [bounceRate, setBounceRate] = useState(1.8);
    const [verified, setVerified] = useState(41820);
    const [scanPulse, setScanPulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanning(prev => (prev + 1) % EMAIL_BATCH.length);
            setScanPulse(true);
            setTimeout(() => setScanPulse(false), 400);

            setDeliverability(prev => parseFloat(Math.min(98, Math.max(91, prev + (Math.random() * 0.3 - 0.1))).toFixed(1)));
            setBounceRate(prev => parseFloat(Math.max(0.8, Math.min(3, prev + (Math.random() * 0.2 - 0.1))).toFixed(1)));
            setVerified(prev => prev + Math.floor(Math.random() * 5) + 2);

            setEmails(prev => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * next.length);
                const scores = [92, 96, 14, 88, 51, 97, 99, 23];
                const statuses = ['valid', 'valid', 'invalid', 'valid', 'risky', 'valid'];
                const s = scores[Math.floor(Math.random() * scores.length)];
                next[idx] = { ...next[idx], score: s, status: s >= 80 ? 'valid' : s >= 40 ? 'risky' : 'invalid' };
                return next;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const getStatusIcon = (status) => {
        if (status === 'valid') return <CheckCircle2 size={10} style={{ color: '#10b981' }} />;
        if (status === 'risky') return <AlertCircle size={10} style={{ color: '#f59e0b' }} />;
        return <XCircle size={10} style={{ color: '#ef4444' }} />;
    };

    const getStatusBg = (status) => {
        if (status === 'valid') return { bg: '#f0fdf4', border: '#6ee7b7' };
        if (status === 'risky') return { bg: '#fffbeb', border: '#fde68a' };
        return { bg: '#fef2f2', border: '#fca5a5' };
    };

    const validCount = emails.filter(e => e.status === 'valid').length;
    const invalidCount = emails.filter(e => e.status === 'invalid').length;
    const riskyCount = emails.filter(e => e.status === 'risky').length;

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.95)',
            borderRadius: '24px',
            boxShadow: '0 20px 45px rgba(13, 115, 119, 0.08)',
            width: '100%',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif',
            color: '#1e293b'
        }}>
            {/* Browser bar */}
            <div style={{ background: '#f8fafc', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <div style={{ display: 'flex', gap: '5.5px' }}>
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <div style={{ background: '#ffffff', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '8px', fontSize: '9px', color: '#64748b', padding: '3px 28px', fontWeight: 650, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={10} style={{ color: '#10b981' }} />
                    <span>verify.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Email</div>
                    {['Verifier', 'Bulk Upload', 'Reports', 'Settings'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #10b981' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(16,185,129, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(16,185,129, 0.25)' }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>VERIFIED</div>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: '#059669', marginTop: '1px' }}>{verified.toLocaleString()}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>Email Verification</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>Real-time deliverability validation</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <motion.div
                                animate={scanPulse ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                                transition={{ duration: 0.35 }}
                                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}
                            />
                            <span style={{ fontSize: '8px', color: '#10b981', fontWeight: 800 }}>Scanning</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <div style={{ flex: 1, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '7px 8px' }}>
                            <div style={{ fontSize: '7px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>Deliverability</div>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{deliverability}%</div>
                        </div>
                        <div style={{ flex: 1, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '7px 8px' }}>
                            <div style={{ fontSize: '7px', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase' }}>Bounce Rate</div>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{bounceRate}%</div>
                        </div>
                        <div style={{ flex: 0.8, background: '#f8fafc', border: '1px solid rgba(226,232,240,0.8)', borderRadius: '8px', padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <div style={{ fontSize: '6.5px', color: '#10b981', fontWeight: 800 }}>✓ Valid: {validCount}</div>
                            <div style={{ fontSize: '6.5px', color: '#f59e0b', fontWeight: 800 }}>⚠ Risky: {riskyCount}</div>
                            <div style={{ fontSize: '6.5px', color: '#ef4444', fontWeight: 800 }}>✗ Invalid: {invalidCount}</div>
                        </div>
                    </div>

                    {/* Email list */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {emails.map((email, i) => {
                            const { bg, border } = getStatusBg(email.status);
                            return (
                                <div
                                    key={email.email}
                                    style={{
                                        background: scanning === i ? bg : '#f8fafc',
                                        border: `1px solid ${scanning === i ? border : 'rgba(226,232,240,0.7)'}`,
                                        borderRadius: '7px',
                                        padding: '5px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        {scanning === i ? (
                                            <RefreshCw size={9} style={{ color: '#6366f1' }} className="spin-anim" />
                                        ) : (
                                            getStatusIcon(email.status)
                                        )}
                                        <span style={{ fontSize: '8px', fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>{email.email}</span>
                                    </div>
                                    <span style={{ fontSize: '8.5px', fontWeight: 900, color: email.score >= 80 ? '#10b981' : email.score >= 40 ? '#f59e0b' : '#ef4444' }}>{email.score}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationDashboard;
