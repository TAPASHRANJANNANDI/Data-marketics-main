import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, CheckCircle2, UserCheck, RefreshCw, Sparkles, Building2 } from 'lucide-react';

const CONTACT_POOL = [
    { name: 'Sarah Chen', title: 'VP of Marketing', company: 'TechNova Inc.', email: 's.chen@technova.com', phone: '+1 415 555 0182', verified: true },
    { name: 'James Kroft', title: 'Chief Revenue Officer', company: 'ScaleUp SaaS', email: 'j.kroft@scaleup.io', phone: '+1 212 555 0337', verified: true },
    { name: 'Priya Desai', title: 'Director of Sales', company: 'Horizon Labs', email: 'p.desai@horizonlabs.com', phone: '+44 20 5555 0149', verified: true },
    { name: 'Marcus Webb', title: 'CMO', company: 'Fintech Edge', email: 'm.webb@fintechedge.co', phone: '+1 650 555 0271', verified: true },
    { name: 'Lena Novak', title: 'Head of Growth', company: 'CloudBase', email: 'l.novak@cloudbase.io', phone: '+49 30 5555 0098', verified: true },
    { name: 'David Park', title: 'EVP Business Dev', company: 'OmniRetail', email: 'd.park@omniretail.com', phone: '+82 2 555 0456', verified: true },
    { name: 'Emma Wilson', title: 'VP of Sales', company: 'GlobalTech', email: 'e.wilson@globaltech.com', phone: '+1 312 555 0921', verified: true },
    { name: 'Hiroshi Tanaka', title: 'Director of Operations', company: 'NexGen Systems', email: 'h.tanaka@nexgen.co.jp', phone: '+81 3 5555 0183', verified: true },
    { name: 'Sofia Garcia', title: 'CMO', company: 'DataFlow Inc', email: 's.garcia@dataflow.es', phone: '+34 91 555 0244', verified: true },
    { name: 'Ahmed Hassan', title: 'Chief Strategy Officer', company: 'MenaCorp', email: 'a.hassan@menacorp.ae', phone: '+971 4 555 0392', verified: true },
    { name: 'Olivia Smith', title: 'Head of Analytics', company: 'InsightHub', email: 'o.smith@insighthub.co.uk', phone: '+44 161 555 0876', verified: true },
    { name: 'Chen Wei', title: 'VP Business Dev', company: 'DragonScale', email: 'c.wei@dragonscale.cn', phone: '+86 10 5555 0411', verified: true },
];

const VerifiedContactDashboard = () => {
    const [contacts, setContacts] = useState(CONTACT_POOL.slice(0, 4));
    const [activeContact, setActiveContact] = useState(0);
    const [verifiedCount, setVerifiedCount] = useState(48320);
    const [accuracy, setAccuracy] = useState(98.7);
    const [pulseIdx, setPulseIdx] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Cycle active contact
            setActiveContact(prev => (prev + 1) % 4);

            // Occasionally rotate in a new contact
            if (Math.random() > 0.6) {
                setContacts(prev => {
                    const next = [...prev];
                    const currentEmails = new Set(next.map(c => c.email));
                    const availableContacts = CONTACT_POOL.filter(c => !currentEmails.has(c.email));
                    
                    if (availableContacts.length > 0) {
                        const newContact = availableContacts[Math.floor(Math.random() * availableContacts.length)];
                        next[Math.floor(Math.random() * next.length)] = newContact;
                    }
                    return next;
                });
                setPulseIdx(Math.floor(Math.random() * 4));
                setTimeout(() => setPulseIdx(null), 800);
            }

            setVerifiedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
            setAccuracy(prev => parseFloat(Math.min(99.9, Math.max(98.0, prev + (Math.random() * 0.2 - 0.1))).toFixed(1)));
        }, 2800);

        return () => clearInterval(interval);
    }, []);

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
                    <UserCheck size={10} style={{ color: '#14b8a6' }} />
                    <span>contacts.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Database</div>
                    {['Contacts', 'Segments', 'Exports', 'Validation'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #14b8a6' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(20, 184, 166, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(20, 184, 166, 0.25)' }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>ACCURACY</div>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0d9488', marginTop: '1px' }}>{accuracy}%</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>Verified B2B Contacts</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Decision-makers · Global coverage</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8px', color: '#10b981', fontWeight: 800 }}>
                            <Sparkles size={9} /> Live updating
                        </div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ flex: 1, minWidth: 0, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '8px 4px', textAlign: 'center' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Verified</div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{verifiedCount.toLocaleString()}</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '8px 4px', textAlign: 'center' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Industries</div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>120+</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0, background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '8px 4px', textAlign: 'center' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Countries</div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>50+</div>
                        </div>
                    </div>

                    {/* Contact cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                        {contacts.map((contact, i) => (
                            <motion.div
                                key={`${contact.email}-${i}`}
                                animate={pulseIdx === i ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    background: activeContact === i ? '#f0fdf4' : '#ffffff',
                                    border: `1px solid ${activeContact === i ? '#6ee7b7' : 'rgba(226, 232, 240, 0.85)'}`,
                                    borderRadius: '10px',
                                    padding: '8px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.3s ease',
                                    boxShadow: activeContact === i ? '0 2px 8px rgba(16,185,129,0.07)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
                                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `hsl(${i * 60 + 160}, 60%, 88%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: `hsl(${i * 60 + 160}, 60%, 35%)`, flexShrink: 0 }}>
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</div>
                                        <div style={{ fontSize: '7.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <Building2 size={7} style={{ flexShrink: 0 }} />
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.company}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        <span className="d-none d-sm-flex" style={{ fontSize: '6.5px', background: '#e0f2fe', color: '#0284c7', padding: '2px 4px', borderRadius: '4px', fontWeight: 800, alignItems: 'center', gap: '2px' }}>
                                            <Mail size={6} />Email
                                        </span>
                                        <span style={{ fontSize: '6.5px', background: '#fef3c7', color: '#d97706', padding: '2px 4px', borderRadius: '4px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                            <Phone size={6} />Phone
                                        </span>
                                    </div>
                                    <CheckCircle2 size={11} style={{ color: '#10b981', flexShrink: 0 }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifiedContactDashboard;
