import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, Users, Compass, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AnalyticalOverviewDashboard = () => {
    // Sparkline points that shift in real-time
    const [sparkPoints1, setSparkPoints1] = useState([14, 18, 12, 22, 16, 26, 18, 30, 24, 28]);
    const [sparkPoints2, setSparkPoints2] = useState([28, 24, 30, 20, 26, 18, 22, 14, 18, 12]);
    const [realtimeUsers, setRealtimeUsers] = useState(635);
    const [sessionTime, setSessionTime] = useState({ min: 5, sec: 8 });

    // Dancing bar graph heights
    const [barHeights, setBarHeights] = useState([38, 54, 22, 85, 42, 68, 58, 28, 48, 74]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Shift sparklines
            setSparkPoints1(prev => {
                const next = [...prev];
                next.shift();
                next.push(Math.floor(Math.random() * 20) + 10);
                return next;
            });
            setSparkPoints2(prev => {
                const next = [...prev];
                next.shift();
                next.push(Math.floor(Math.random() * 20) + 10);
                return next;
            });

            // Fluctuate users
            setRealtimeUsers(prev => prev + Math.floor(Math.random() * 5) - 2);

            // Fluctuate session seconds
            setSessionTime(prev => {
                let s = prev.sec + Math.floor(Math.random() * 4) - 2;
                let m = prev.min;
                if (s >= 60) { s = 0; m += 1; }
                if (s < 0) { s = 59; m = Math.max(1, m - 1); }
                return { min: m, sec: s };
            });

            // Make bar heights "dance" dynamically
            setBarHeights(prev => prev.map(h => {
                const delta = Math.floor(Math.random() * 20) - 10;
                return Math.max(12, Math.min(95, h + delta));
            }));

        }, 1500);

        return () => clearInterval(interval);
    }, []);

    // Helper to generate SVG path from array of heights
    const getSparklinePath = (points, width, height) => {
        const step = width / (points.length - 1);
        return points.map((p, idx) => {
            const x = idx * step;
            const y = height - p;
            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

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
            {/* Top Browser mockup header */}
            <div style={{
                background: '#f8fafc',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(226, 232, 240, 0.9)'
            }}>
                <div style={{ display: 'flex', gap: '5.5px' }}>
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    borderRadius: '8px',
                    fontSize: '9px',
                    color: '#64748b',
                    padding: '3px 32px',
                    fontWeight: 650,
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <BarChart2 size={10} style={{ color: '#14b8a6' }} />
                    <span>analytics.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            {/* Layout Grid */}
            <div style={{ display: 'flex', minHeight: '270px' }}>
                
                {/* Left Sidebar Mockup */}
                <div style={{
                    width: '95px',
                    background: '#f8fafc',
                    borderRight: '1px solid rgba(226, 232, 240, 0.8)',
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                }}>
                    <div style={{ fontSize: '7.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 8px', marginBottom: '8px' }}>Reports</div>
                    {['Overview', 'Traffic', 'Conversion', 'Campaigns'].map((menu, i) => (
                        <button
                            key={menu}
                            style={{
                                border: 'none',
                                background: i === 0 ? '#ffffff' : 'transparent',
                                color: i === 0 ? '#0f172a' : '#64748b',
                                fontSize: '9.5px',
                                fontWeight: i === 0 ? 800 : 600,
                                padding: '6px 8px',
                                borderRadius: '8px',
                                textAlign: 'left',
                                cursor: 'default',
                                borderLeft: i === 0 ? '3px solid #14b8a6' : '3px solid transparent'
                            }}
                        >
                            {menu}
                        </button>
                    ))}
                    
                    <div style={{ marginTop: 'auto', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(20, 184, 166, 0.2)', minWidth: 0 }}>
                        <div style={{ fontSize: '7px', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>LIVE REACH</div>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#0d9488', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>98.6%</div>
                    </div>
                </div>

                {/* Dashboard Main Workspace */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'hidden' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 850, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Analytical Overview</h4>
                            <div style={{ fontSize: '8.5px', color: '#64748b', fontWeight: 650, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Real-time B2B campaign stats</div>
                        </div>

                        <div style={{
                            background: '#f1f5f9',
                            borderRadius: '8px',
                            fontSize: '8px',
                            color: '#475569',
                            padding: '4px 10px',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Calendar size={10} />
                            <span>June, 2026</span>
                        </div>
                    </div>

                    {/* Sparkline cards */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        
                        {/* Realtime users */}
                        <div style={{ flex: 1, minWidth: 0, background: '#ffffff', border: '1px solid rgba(226, 232, 240, 0.85)', padding: '10px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Realtime users</div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {realtimeUsers}
                                    <span style={{ fontSize: '7.5px', color: '#10b981', display: 'flex', alignItems: 'center', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><ArrowUpRight size={8} style={{ flexShrink: 0 }} /> +21%</span>
                                </div>
                            </div>
                            {/* SVG Sparkline */}
                            <svg width="60" height="24" style={{ overflow: 'visible', flexShrink: 0 }}>
                                <path d={getSparklinePath(sparkPoints1, 60, 24)} fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Visit duration */}
                        <div style={{ flex: 1, minWidth: 0, background: '#ffffff', border: '1px solid rgba(226, 232, 240, 0.85)', padding: '10px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Visit duration</div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {sessionTime.min}m {sessionTime.sec}s
                                    <span style={{ fontSize: '7.5px', color: '#ef4444', display: 'flex', alignItems: 'center', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><ArrowDownRight size={8} style={{ flexShrink: 0 }} /> -7%</span>
                                </div>
                            </div>
                            <svg width="60" height="24" style={{ overflow: 'visible', flexShrink: 0 }}>
                                <path d={getSparklinePath(sparkPoints2, 60, 24)} fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                    </div>

                    {/* Split View: Dancing Bar Graph vs Donut usage */}
                    <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                        
                        {/* Left: Dancing Bar Graph */}
                        <div style={{ flex: 1.5, minWidth: 0, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.7)', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Online users activity</div>
                            
                            {/* Bar container */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyBetween: 'space-between', gap: '5px', flex: 1, height: '70px', paddingBottom: '4px' }}>
                                {barHeights.map((h, i) => (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                                        <motion.div
                                            animate={{ height: `${h}%` }}
                                            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                                            style={{
                                                width: '100%',
                                                background: i % 2 === 0 ? 'linear-gradient(to top, #0ea5e9, #6366f1)' : 'linear-gradient(to top, #14b8a6, #10b981)',
                                                borderRadius: '3px 3px 0 0'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Donut Chart share */}
                        <div style={{ flex: 1, minWidth: 0, background: '#ffffff', border: '1px solid rgba(226, 232, 240, 0.85)', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: '8.0px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', alignSelf: 'flex-start', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>Channel Share</div>
                            
                            {/* Simple beautiful SVG Donut */}
                            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                                <svg width="56" height="56" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.2" />
                                    {/* Segment 1: Email (39%) */}
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" strokeWidth="4.2" strokeDasharray="39 100" strokeDashoffset="0" />
                                    {/* Segment 2: Phone (26%) */}
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="4.2" strokeDasharray="26 100" strokeDashoffset="-39" />
                                    {/* Segment 3: Social (24%) */}
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0ea5e9" strokeWidth="4.2" strokeDasharray="24 100" strokeDashoffset="-65" />
                                    {/* Segment 4: Direct (11%) */}
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="4.2" strokeDasharray="11 100" strokeDashoffset="-89" />
                                </svg>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '9px', fontWeight: 900, color: '#0f172a' }}>1.05</div>
                            </div>

                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2px' }}>
                                <span style={{ fontSize: '6px', fontWeight: 800, color: '#6366f1' }}>● Mail 39%</span>
                                <span style={{ fontSize: '6px', fontWeight: 800, color: '#10b981' }}>● Phone 26%</span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default AnalyticalOverviewDashboard;
