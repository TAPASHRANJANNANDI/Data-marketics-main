import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Search, CheckCircle2, RefreshCw, Lock, Sparkles, Database } from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Dashboard', active: true },
    { name: 'Enrichment', active: false },
    { name: 'Lead Lists', active: false },
    { name: 'CRM Sync', active: false },
    { name: 'Settings', active: false }
];

const MOCK_LEADS = [
    { company: 'Stripe', role: 'VP Sales', tag: 'Direct Emails', type: 'email', name: 'Sarah C.' },
    { company: 'HubSpot', role: 'CMO Lead', tag: 'Mobile Phone', type: 'phone', name: 'Alex M.' },
    { company: 'Zoom', role: 'CTO Profile', tag: 'Tech Stack', type: 'tech', name: 'Marcus A.' },
    { company: 'Tesla', role: 'Director HR', tag: 'Direct Emails', type: 'email', name: 'David R.' },
    { company: 'Notion', role: 'Product Lead', tag: 'Tech Stack', type: 'tech', name: 'Jane D.' },
    { company: 'Slack', role: 'CFO Account', tag: 'Mobile Phone', type: 'phone', name: 'John K.' }
];

const DataEnablementDashboard = () => {
    const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [cards, setCards] = useState([
        { id: '1', company: 'Stripe', role: 'VP Sales', stage: 'backlog', tag: 'Emails', name: 'Sarah C.', progress: 0 },
        { id: '2', company: 'HubSpot', role: 'CMO Lead', stage: 'todo', tag: 'Phone', name: 'Alex M.', progress: 30 },
        { id: '3', company: 'Zoom', role: 'CTO Profile', stage: 'inprocess', tag: 'Stack', name: 'Marcus A.', progress: 100 }
    ]);
    const [syncStats, setSyncStats] = useState({ sourced: 428, verified: 98 });
    const [refreshPulse, setRefreshPulse] = useState(false);

    // Automated loop to advance cards and show real-time "Data Enablement" processing
    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prevCards => {
                let updated = prevCards.map(card => {
                    if (card.stage === 'backlog') {
                        // Move to verification stage
                        return { ...card, stage: 'todo', progress: 10 };
                    } else if (card.stage === 'todo') {
                        if (card.progress < 100) {
                            return { ...card, progress: card.progress + 35 };
                        } else {
                            // Move to CRM synced stage
                            return { ...card, stage: 'inprocess' };
                        }
                    } else if (card.stage === 'inprocess') {
                        // Recycle the card: generate a new random lead in backlog
                        const pool = MOCK_LEADS[Math.floor(Math.random() * MOCK_LEADS.length)];
                        return {
                            id: String(Date.now() + Math.random()),
                            company: pool.company,
                            role: pool.role,
                            stage: 'backlog',
                            tag: pool.tag,
                            name: pool.name,
                            progress: 0
                        };
                    }
                    return card;
                });
                return updated;
            });

            // Increment count metrics
            setSyncStats(prev => ({
                sourced: prev.sourced + Math.floor(Math.random() * 2),
                verified: Math.min(100, prev.verified + (Math.random() > 0.85 ? 1 : 0))
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const triggerManualSync = () => {
        setRefreshPulse(true);
        setTimeout(() => setRefreshPulse(false), 1000);

        // Advance todo cards immediately
        setCards(prev => prev.map(c => c.stage === 'todo' ? { ...c, progress: 100 } : c));
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
            {/* Top Browser Window Header Mockup */}
            <div style={{
                background: '#f1f5f9',
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
                {/* Domain bar */}
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
                    <Database size={10} style={{ color: '#14b8a6' }} />
                    <span>enablement.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} /> {/* Spacing spacer */}
            </div>

            {/* Content Layout Grid */}
            <div style={{ display: 'flex', minHeight: '270px' }}>
                
                {/* Sidebar Navigation */}
                <div style={{
                    width: '95px',
                    background: '#f8fafc',
                    borderRight: '1px solid rgba(226, 232, 240, 0.8)',
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                }}>
                    <div style={{ fontSize: '7.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 8px', marginBottom: '8px' }}>Workspace</div>
                    {MENU_ITEMS.map(item => (
                        <button
                            key={item.name}
                            onClick={() => setActiveMenu(item.name)}
                            style={{
                                border: 'none',
                                background: activeMenu === item.name ? '#ffffff' : 'transparent',
                                color: activeMenu === item.name ? '#0f172a' : '#64748b',
                                fontSize: '9.5px',
                                fontWeight: activeMenu === item.name ? 800 : 600,
                                padding: '6px 8px',
                                borderRadius: '8px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                borderLeft: activeMenu === item.name ? '3px solid #14b8a6' : '3px solid transparent',
                                boxShadow: activeMenu === item.name ? '0 2px 6px rgba(0,0,0,0.02)' : 'none'
                            }}
                        >
                            {item.name}
                        </button>
                    ))}

                    <div style={{ marginTop: 'auto', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(20, 184, 166, 0.2)' }}>
                        <div style={{ fontSize: '7px', color: '#64748b', fontWeight: 700 }}>VERIFIED</div>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0d9488', marginTop: '1px' }}>{syncStats.verified}%</div>
                    </div>
                </div>

                {/* Dashboard Main Workspace */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'hidden' }}>
                    
                    {/* Workspace Dashboard Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 850, color: '#0f172a' }}>Data Enablement Board</h4>
                            <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>Automated Ideal Customer Profile (ICP) syncing</div>
                        </div>

                        {/* View Switchers and Refresh */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '2px', display: 'flex', gap: '2px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                                <button
                                    onClick={() => setViewMode('board')}
                                    style={{
                                        border: 'none',
                                        background: viewMode === 'board' ? '#ffffff' : 'transparent',
                                        color: viewMode === 'board' ? '#0f172a' : '#64748b',
                                        padding: '4px 6px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <LayoutGrid size={11} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    style={{
                                        border: 'none',
                                        background: viewMode === 'list' ? '#ffffff' : 'transparent',
                                        color: viewMode === 'list' ? '#0f172a' : '#64748b',
                                        padding: '4px 6px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <List size={11} />
                                </button>
                            </div>

                            <button
                                onClick={triggerManualSync}
                                style={{
                                    border: '1px solid rgba(226, 232, 240, 0.8)',
                                    background: '#ffffff',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#475569'
                                }}
                            >
                                <RefreshCw size={11} className={refreshPulse ? 'spin-anim' : ''} />
                            </button>
                        </div>
                    </div>

                    {/* View rendering */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <AnimatePresence mode="wait">
                            {viewMode === 'board' ? (
                                <motion.div
                                    key="board"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: 'flex', gap: '10px', height: '100%' }}
                                >
                                    {/* Lane 1: Backlog (Pending Verification) */}
                                    <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.7)', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(226, 232, 240, 0.5)', paddingBottom: '4px' }}>
                                            <span style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Backlog leads</span>
                                            <span style={{ fontSize: '8px', background: '#e2e8f0', color: '#475569', padding: '1px 5px', borderRadius: '10px', fontWeight: 800 }}>
                                                {cards.filter(c => c.stage === 'backlog').length}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                            {cards.filter(c => c.stage === 'backlog').map(card => (
                                                <motion.div
                                                    layoutId={card.id}
                                                    key={card.id}
                                                    style={{
                                                        background: '#ffffff',
                                                        border: '1px solid rgba(226, 232, 240, 0.8)',
                                                        borderRadius: '8px',
                                                        padding: '8px',
                                                        boxShadow: '0 2px 4px rgba(15, 23, 42, 0.02)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '7.5px', background: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '4px', fontWeight: 750 }}>{card.company}</span>
                                                        <Lock size={9} style={{ color: '#ef4444' }} />
                                                    </div>
                                                    <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#0f172a' }}>{card.role}</div>
                                                    <div style={{ fontSize: '7.5px', color: '#94a3b8', marginTop: '2px' }}>Pending data unlock</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lane 2: Verification (processing) */}
                                    <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.7)', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(226, 232, 240, 0.5)', paddingBottom: '4px' }}>
                                            <span style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Verification</span>
                                            <span style={{ fontSize: '8px', background: '#fef3c7', color: '#d97706', padding: '1px 5px', borderRadius: '10px', fontWeight: 800 }}>
                                                {cards.filter(c => c.stage === 'todo').length}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                            {cards.filter(c => c.stage === 'todo').map(card => (
                                                <motion.div
                                                    layoutId={card.id}
                                                    key={card.id}
                                                    style={{
                                                        background: '#ffffff',
                                                        border: '1px solid #fef3c7',
                                                        borderRadius: '8px',
                                                        padding: '8px',
                                                        boxShadow: '0 2px 6px rgba(217, 119, 6, 0.03)'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '7.5px', background: '#fffbeb', color: '#d97706', padding: '2px 6px', borderRadius: '4px', fontWeight: 750 }}>{card.company}</span>
                                                        <span style={{ fontSize: '7px', color: '#d97706', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                            <RefreshCw size={8} className="spin-anim" /> Enriched
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#0f172a' }}>{card.role}</div>
                                                    
                                                    {/* Verification progress bar */}
                                                    <div style={{ height: '3px', width: '100%', background: '#e2e8f0', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', background: '#f59e0b', width: `${card.progress}%`, transition: 'width 0.3s' }} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lane 3: CRM Synced */}
                                    <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.7)', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(226, 232, 240, 0.5)', paddingBottom: '4px' }}>
                                            <span style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>CRM Synced</span>
                                            <span style={{ fontSize: '8px', background: '#d1fae5', color: '#065f46', padding: '1px 5px', borderRadius: '10px', fontWeight: 800 }}>
                                                {cards.filter(c => c.stage === 'inprocess').length}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                            {cards.filter(c => c.stage === 'inprocess').map(card => (
                                                <motion.div
                                                    layoutId={card.id}
                                                    key={card.id}
                                                    style={{
                                                        background: '#ffffff',
                                                        border: '1px solid #10b981',
                                                        borderRadius: '8px',
                                                        padding: '8px',
                                                        boxShadow: '0 2px 6px rgba(16, 185, 129, 0.05)'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '7.5px', background: '#ecfdf5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: 750 }}>{card.company}</span>
                                                        <CheckCircle2 size={10} style={{ color: '#10b981' }} />
                                                    </div>
                                                    <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#0f172a' }}>{card.role}</div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                                        <span style={{ fontSize: '7.5px', color: '#64748b' }}>Profile: {card.name}</span>
                                                        <span style={{ fontSize: '7px', background: '#e0f2fe', color: '#0284c7', padding: '1px 4px', borderRadius: '3px', fontWeight: 800 }}>+{card.tag}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="list"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid rgba(226, 232, 240, 0.8)',
                                        borderRadius: '12px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '9.5px' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', color: '#64748b', fontWeight: 800 }}>
                                                <th style={{ padding: '8px 12px' }}>COMPANY</th>
                                                <th style={{ padding: '8px 12px' }}>ROLE</th>
                                                <th style={{ padding: '8px 12px' }}>VERIFIED NAME</th>
                                                <th style={{ padding: '8px 12px' }}>STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cards.map(card => (
                                                <tr key={card.id} style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>
                                                    <td style={{ padding: '8px 12px', fontWeight: 800, color: '#0f172a' }}>{card.company}</td>
                                                    <td style={{ padding: '8px 12px', color: '#475569' }}>{card.role}</td>
                                                    <td style={{ padding: '8px 12px', color: '#6366f1', fontWeight: 700 }}>
                                                        {card.stage === 'backlog' ? '🔒 Locked' : card.name}
                                                    </td>
                                                    <td style={{ padding: '8px 12px' }}>
                                                        <span style={{
                                                            fontSize: '7.5px',
                                                            padding: '2px 6px',
                                                            borderRadius: '20px',
                                                            fontWeight: 800,
                                                            background: card.stage === 'inprocess' ? '#d1fae5' : card.stage === 'todo' ? '#fef3c7' : '#f1f5f9',
                                                            color: card.stage === 'inprocess' ? '#065f46' : card.stage === 'todo' ? '#d97706' : '#475569'
                                                        }}>
                                                            {card.stage === 'inprocess' ? 'CRM Synced' : card.stage === 'todo' ? 'Verifying' : 'Pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom row metrics */}
                    <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '10px' }}>
                        <div style={{ flex: 1, background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 700 }}>TOTAL LEAD POOL</span>
                            <span style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>{syncStats.sourced.toLocaleString()}</span>
                        </div>
                        <div style={{ flex: 1, background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 700 }}>ACCURACY RATE</span>
                            <span style={{ fontSize: '11px', fontWeight: 900, color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Sparkles size={9} /> 99.8%
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DataEnablementDashboard;
