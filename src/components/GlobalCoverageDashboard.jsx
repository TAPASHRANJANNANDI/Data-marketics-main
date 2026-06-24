import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, TrendingUp, Sparkles } from 'lucide-react';

const REGIONS = [
    { name: 'North America', companies: '18.4M', growth: '+12%', color: '#6366f1', pct: 38 },
    { name: 'Europe', companies: '14.2M', growth: '+9%', color: '#10b981', pct: 29 },
    { name: 'Asia-Pacific', companies: '11.8M', growth: '+22%', color: '#f59e0b', pct: 24 },
    { name: 'Middle East', companies: '2.9M', growth: '+18%', color: '#0ea5e9', pct: 6 },
    { name: 'Emerging', companies: '1.5M', growth: '+31%', color: '#ec4899', pct: 3 },
];

const MARKET_ACTIVITY = [
    { label: 'NA', value: 82 },
    { label: 'EU', value: 67 },
    { label: 'APAC', value: 74 },
    { label: 'ME', value: 45 },
    { label: 'EM', value: 38 },
];

const GlobalCoverageDashboard = () => {
    const [regions, setRegions] = useState(REGIONS);
    const [activeRegion, setActiveRegion] = useState(0);
    const [totalRecords, setTotalRecords] = useState(48800000);
    const [marketActivity, setMarketActivity] = useState(MARKET_ACTIVITY);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRegion(prev => (prev + 1) % REGIONS.length);
            setTotalRecords(prev => prev + Math.floor(Math.random() * 200) + 50);
            setMarketActivity(prev => prev.map(m => ({
                ...m,
                value: Math.max(30, Math.min(99, m.value + Math.floor(Math.random() * 10) - 5))
            })));
        }, 2400);
        return () => clearInterval(interval);
    }, []);

    const formatTotal = (n) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
        return n.toLocaleString();
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
            {/* Browser bar */}
            <div style={{ background: '#f8fafc', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <div style={{ display: 'flex', gap: '5.5px' }}>
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <div style={{ background: '#ffffff', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '8px', fontSize: '9px', color: '#64748b', padding: '3px 28px', fontWeight: 650, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={10} style={{ color: '#10b981' }} />
                    <span>global.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Coverage</div>
                    {['Global', 'Americas', 'EMEA', 'APAC'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #10b981' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(16,185,129, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(16,185,129, 0.25)' }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>RECORDS</div>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#059669', marginTop: '1px' }}>{formatTotal(totalRecords)}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>Global Business Coverage</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>50+ countries · 5 major regions</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8px', color: '#10b981', fontWeight: 800 }}>
                            <Sparkles size={9} /> Live
                        </div>
                    </div>

                    {/* Region activity bars */}
                    <div style={{ background: '#f8fafc', border: '1px solid rgba(226,232,240,0.7)', borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Market Activity Index</div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '50px' }}>
                            {marketActivity.map((m, i) => (
                                <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', height: '100%', justifyContent: 'flex-end' }}>
                                    <motion.div
                                        animate={{ height: `${m.value}%` }}
                                        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                                        style={{
                                            width: '100%',
                                            background: REGIONS[i]?.color || '#6366f1',
                                            borderRadius: '3px 3px 0 0',
                                            opacity: activeRegion === i ? 1 : 0.6
                                        }}
                                    />
                                    <span style={{ fontSize: '6.5px', fontWeight: 800, color: activeRegion === i ? REGIONS[i]?.color : '#94a3b8' }}>{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Region list */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {regions.map((region, i) => (
                            <div
                                key={region.name}
                                style={{
                                    background: activeRegion === i ? `${region.color}08` : '#f8fafc',
                                    border: `1px solid ${activeRegion === i ? region.color + '40' : 'rgba(226,232,240,0.7)'}`,
                                    borderRadius: '8px',
                                    padding: '6px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MapPin size={9} style={{ color: region.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#0f172a' }}>{region.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#334155' }}>{region.companies}</span>
                                    <span style={{ fontSize: '7.5px', color: '#10b981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                        <TrendingUp size={8} />{region.growth}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalCoverageDashboard;
