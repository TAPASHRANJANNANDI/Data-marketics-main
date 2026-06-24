import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Activity, Target, Eye, Sparkles } from 'lucide-react';

const INTENT_SIGNALS = [
    { company: 'DataSync Corp', signal: 'Visited Pricing Page', strength: 92, category: 'High Intent', color: '#10b981' },
    { company: 'NexaCloud', signal: 'Downloaded B2B Guide', strength: 78, category: 'Active Research', color: '#6366f1' },
    { company: 'VelocityAI', signal: 'Requested Demo', strength: 96, category: 'Hot Lead', color: '#ef4444' },
    { company: 'Streamline HQ', signal: 'Compared Competitors', strength: 65, category: 'Evaluating', color: '#f59e0b' },
    { company: 'PulseMetrics', signal: 'Read Case Studies', strength: 71, category: 'Researching', color: '#0ea5e9' },
];

const IntentDataDashboard = () => {
    const [signals, setSignals] = useState(INTENT_SIGNALS);
    const [buyerScore, setBuyerScore] = useState(847);
    const [activeSignals, setActiveSignals] = useState(34);
    const [highlightIdx, setHighlightIdx] = useState(0);
    const [pulseRing, setPulseRing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIdx(prev => (prev + 1) % signals.length);

            setSignals(prev => prev.map((s, i) => ({
                ...s,
                strength: Math.max(55, Math.min(99, s.strength + Math.floor(Math.random() * 8) - 4))
            })));

            setBuyerScore(prev => Math.min(999, prev + Math.floor(Math.random() * 3)));
            setActiveSignals(prev => Math.max(28, Math.min(50, prev + Math.floor(Math.random() * 4) - 1)));

            setPulseRing(true);
            setTimeout(() => setPulseRing(false), 600);
        }, 2500);

        return () => clearInterval(interval);
    }, [signals.length]);

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
                    <Activity size={10} style={{ color: '#6366f1' }} />
                    <span>intent.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Intent</div>
                    {['Signals', 'Buyers', 'Alerts', 'Reports'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #6366f1' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(99,102,241, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(99,102,241, 0.25)' }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>ACTIVE</div>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#4f46e5', marginTop: '1px' }}>{activeSignals}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>Buyer Intent Signals</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>Real-time purchase behavior tracking</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <motion.div
                                animate={pulseRing ? { scale: [1, 1.4, 1], opacity: [1, 0.3, 1] } : { scale: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }}
                            />
                            <span style={{ fontSize: '8px', color: '#ef4444', fontWeight: 800 }}>LIVE</span>
                        </div>
                    </div>

                    {/* Buyer score */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', padding: '10px 12px', color: '#fff' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase' }}>Aggregate Buyer Score</div>
                            <div style={{ fontSize: '20px', fontWeight: 900, marginTop: '2px' }}>{buyerScore}</div>
                        </div>
                        <div style={{ flex: 1, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>Conversion Lift</div>
                            <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                +38% <TrendingUp size={13} style={{ color: '#10b981' }} />
                            </div>
                        </div>
                    </div>

                    {/* Signal list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                        {signals.slice(0, 4).map((sig, i) => (
                            <div
                                key={sig.company}
                                style={{
                                    background: highlightIdx === i ? `${sig.color}08` : '#f8fafc',
                                    border: `1px solid ${highlightIdx === i ? sig.color + '40' : 'rgba(226, 232, 240, 0.7)'}`,
                                    borderRadius: '8px',
                                    padding: '7px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Eye size={9} style={{ color: sig.color, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: '9px', fontWeight: 800, color: '#0f172a' }}>{sig.company}</div>
                                        <div style={{ fontSize: '7.5px', color: '#64748b' }}>{sig.signal}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '50px' }}>
                                        <div style={{ height: '3px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${sig.strength}%`, background: sig.color, transition: 'width 0.5s ease', borderRadius: '2px' }} />
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '8.5px', fontWeight: 900, color: sig.color, minWidth: '22px', textAlign: 'right' }}>{sig.strength}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntentDataDashboard;
