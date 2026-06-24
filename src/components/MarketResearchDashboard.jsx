import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Search, TrendingUp, PieChart, Users, CheckCircle, RefreshCw } from 'lucide-react';

const SECTOR_DATA = {
    SaaS: {
        tam: '$4.2B',
        accounts: 1842,
        penetration: 64,
        color: '#14b8a6',
        accountsList: ['Stripe Inc.', 'Notion Labs', 'Figma Design', 'Slack Tech', 'Zoom Corp', 'HubSpot Inc.']
    },
    FinTech: {
        tam: '$6.8B',
        accounts: 2450,
        penetration: 42,
        color: '#6366f1',
        accountsList: ['Adyen BV', 'Revolut Ltd', 'Plaid API', 'Wise Transfer', 'Klarna Bank', 'Brex Card']
    },
    HealthTech: {
        tam: '$3.1B',
        accounts: 984,
        penetration: 18,
        color: '#f59e0b',
        accountsList: ['Flatiron Health', 'Oscar Insurance', 'Tempus AI', 'Zocdoc Inc.', 'Clover Health', 'Ro Care']
    }
};

const MarketResearchDashboard = () => {
    const [activeSector, setActiveSector] = useState('SaaS');
    const [scrollingList, setScrollingList] = useState(SECTOR_DATA.SaaS.accountsList);
    const [liveMatches, setLiveMatches] = useState(12809);

    useEffect(() => {
        // Change scroll listing upon sector switch
        setScrollingList(SECTOR_DATA[activeSector].accountsList);
    }, [activeSector]);

    // Live incrementing matches ticker simulating active database scraping
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveMatches(prev => prev + Math.floor(Math.random() * 2) + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const sector = SECTOR_DATA[activeSector];

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
            {/* Top Browser Frame Mockup */}
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
                    <TrendingUp size={10} style={{ color: '#14b8a6' }} />
                    <span>tam.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            {/* Layout Workspace Grid */}
            <div style={{ display: 'flex', minHeight: '270px' }}>
                
                {/* Left navigation sidebar */}
                <div style={{
                    width: '95px',
                    background: '#f8fafc',
                    borderRight: '1px solid rgba(226, 232, 240, 0.8)',
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                }}>
                    <div style={{ fontSize: '7.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 8px', marginBottom: '8px' }}>Intelligence</div>
                    {['TAM Sizing', 'Penetration', 'Target List', 'Competitors'].map((menu, i) => (
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
                                borderLeft: i === 0 ? `3px solid ${sector.color}` : '3px solid transparent'
                            }}
                        >
                            {menu}
                        </button>
                    ))}

                    <div style={{ marginTop: 'auto', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(99, 102, 241, 0.2)' }}>
                        <div style={{ fontSize: '7px', color: '#64748b', fontWeight: 700 }}>DATABASE</div>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#4f46e5', marginTop: '1px' }}>{liveMatches.toLocaleString()}</div>
                    </div>
                </div>

                {/* Main panel */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 850, color: '#0f172a' }}>TAM Sizing Explorer</h4>
                            <div style={{ fontSize: '8.5px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>Total Addressable Market analytics</div>
                        </div>

                        {/* Interactive Sector Switcher */}
                        <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '2px', borderRadius: '8px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                            {Object.keys(SECTOR_DATA).map(sec => (
                                <button
                                    key={sec}
                                    onClick={() => setActiveSector(sec)}
                                    style={{
                                        border: 'none',
                                        background: activeSector === sec ? '#ffffff' : 'transparent',
                                        color: activeSector === sec ? SECTOR_DATA[sec].color : '#64748b',
                                        fontSize: '9px',
                                        fontWeight: 800,
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {sec}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats summary cards */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <PieChart size={14} style={{ color: sector.color }} />
                            <div>
                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>TAM Potential</div>
                                <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', marginTop: '1px' }}>{sector.tam}</div>
                            </div>
                        </div>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Users size={14} style={{ color: sector.color }} />
                            <div>
                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Mapped HQs</div>
                                <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', marginTop: '1px' }}>{sector.accounts}</div>
                            </div>
                        </div>
                    </div>

                    {/* Split: TAM size bar & matched listing */}
                    <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                        
                        {/* Sizing Indicator & Dial */}
                        <div style={{ flex: 1.2, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.7)', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', justifyBetween: 'center', gap: '8px' }}>
                            <div>
                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Market Penetration</div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginTop: '2px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>{sector.penetration}%</span>
                                    <span style={{ fontSize: '7.5px', color: '#10b981', fontWeight: 800 }}>sourced</span>
                                </div>
                            </div>

                            {/* Horizontal TAM scale indicator bar */}
                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: '#94a3b8', fontWeight: 800, marginBottom: '4px' }}>
                                    <span>PENETRATION</span>
                                    <span>TAM GAP</span>
                                </div>
                                <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${sector.penetration}%` }}
                                        transition={{ duration: 0.5 }}
                                        style={{ height: '100%', background: sector.color }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Scrolling Sourced Target Accounts List */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '2px' }}>Matched accounts</div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', height: '70px', overflow: 'hidden' }}>
                                <AnimatePresence mode="popLayout">
                                    {scrollingList.slice(0, 3).map((item, idx) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                background: '#ffffff',
                                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                                borderRadius: '8px',
                                                padding: '6px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#334155' }}>{item}</span>
                                            <CheckCircle size={10} style={{ color: '#10b981', flexShrink: 0 }} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default MarketResearchDashboard;
