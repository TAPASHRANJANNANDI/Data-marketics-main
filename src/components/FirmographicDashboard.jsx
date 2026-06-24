import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Users, DollarSign, PieChart, Sparkles } from 'lucide-react';

const INDUSTRIES = [
    { name: 'Technology', pct: 34, color: '#6366f1' },
    { name: 'Healthcare', pct: 18, color: '#10b981' },
    { name: 'Finance', pct: 22, color: '#f59e0b' },
    { name: 'Manufacturing', pct: 14, color: '#0ea5e9' },
    { name: 'Retail', pct: 12, color: '#ec4899' },
];

const SEGMENTS = [
    { label: 'Enterprise', count: '4,280', icon: Building, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Mid-Market', count: '12,450', icon: Users, color: '#10b981', bg: '#f0fdf4' },
    { label: 'SMB', count: '31,700', icon: MapPin, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Revenue $1B+', count: '980', icon: DollarSign, color: '#0ea5e9', bg: '#e0f7ff' },
];

const FirmographicDashboard = () => {
    const [segments, setSegments] = useState(SEGMENTS);
    const [industries, setIndustries] = useState(INDUSTRIES);
    const [totalCompanies, setTotalCompanies] = useState(48430);
    const [activeSlice, setActiveSlice] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalCompanies(prev => prev + Math.floor(Math.random() * 4) + 1);
            setActiveSlice(prev => (prev + 1) % INDUSTRIES.length);

            setSegments(prev => prev.map(s => ({
                ...s,
                count: (parseInt(s.count.replace(/,/g, '')) + Math.floor(Math.random() * 5)).toLocaleString()
            })));
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    // Build SVG donut
    const total = industries.reduce((a, b) => a + b.pct, 0);
    let cumulative = 0;
    const radius = 38;
    const cx = 50, cy = 50;
    const circumference = 2 * Math.PI * radius;

    const arcs = industries.map((ind, i) => {
        const dashArray = (ind.pct / total) * circumference;
        const dashOffset = -(cumulative / total) * circumference;
        cumulative += ind.pct;
        return { ...ind, dashArray, dashOffset, i };
    });

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
                    <PieChart size={10} style={{ color: '#f59e0b' }} />
                    <span>firmographics.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Firmographics</div>
                    {['Overview', 'Industries', 'Revenue', 'Headcount'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #f59e0b' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(245, 158, 11, 0.07)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(245, 158, 11, 0.3)', minWidth: 0 }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>TOTAL</div>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#d97706', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{totalCompanies.toLocaleString()}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Firmographic Intelligence</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Company segments & industry breakdown</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8px', color: '#d97706', fontWeight: 800 }}>
                            <Sparkles size={9} /> Updated
                        </div>
                    </div>

                    {/* Two-panel: Donut + Segments */}
                    <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                        {/* Donut chart */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px solid rgba(226,232,240,0.7)', padding: '10px' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', alignSelf: 'flex-start' }}>Industry Mix</div>
                            <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                                <svg viewBox="0 0 100 100" width="90" height="90">
                                    <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
                                    {arcs.map((arc, i) => (
                                        <motion.circle
                                            key={arc.name}
                                            cx={cx} cy={cy} r={radius}
                                            fill="none"
                                            stroke={arc.color}
                                            strokeWidth={activeSlice === i ? '13' : '10'}
                                            strokeDasharray={`${arc.dashArray} ${circumference}`}
                                            strokeDashoffset={arc.dashOffset}
                                            strokeLinecap="round"
                                            animate={{ strokeWidth: activeSlice === i ? 13 : 10 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                                        />
                                    ))}
                                    <text x="50" y="54" textAnchor="middle" style={{ fontSize: '10px', fontWeight: 900, fill: '#0f172a', fontFamily: 'Inter, sans-serif' }}>5</text>
                                    <text x="50" y="62" textAnchor="middle" style={{ fontSize: '6px', fill: '#64748b', fontFamily: 'Inter, sans-serif' }}>Industries</text>
                                </svg>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginTop: '6px' }}>
                                {industries.map(ind => (
                                    <span key={ind.name} style={{ fontSize: '6px', fontWeight: 800, color: ind.color }}>● {ind.name}</span>
                                ))}
                            </div>
                        </div>

                        {/* Segment cards */}
                        <div style={{ flex: 1.1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Company Segments</div>
                            {segments.map((seg, i) => (
                                <div key={seg.label} style={{ background: seg.bg, border: `1px solid ${seg.color}30`, borderRadius: '8px', padding: '7px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0, flex: 1 }}>
                                        <seg.icon size={10} style={{ color: seg.color, flexShrink: 0 }} />
                                        <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{seg.label}</span>
                                    </div>
                                    <span style={{ fontSize: '10px', fontWeight: 900, color: seg.color, flexShrink: 0 }}>{seg.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirmographicDashboard;
