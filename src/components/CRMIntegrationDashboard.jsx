import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, CheckCircle2, RefreshCw, Zap, Sparkles, ArrowRight } from 'lucide-react';

const PLATFORMS = [
    { name: 'Salesforce', color: '#00A1E0', logo: 'SF', status: 'synced', records: '12,450' },
    { name: 'HubSpot', color: '#FF7A59', logo: 'HS', status: 'synced', records: '8,230' },
    { name: 'Zoho CRM', color: '#E42527', logo: 'ZO', status: 'syncing', records: '5,100' },
    { name: 'MS Dynamics', color: '#00BCF2', logo: 'MD', status: 'synced', records: '3,780' },
    { name: 'Marketo', color: '#5C4EE5', logo: 'MK', status: 'connected', records: '6,920' },
];

const SYNC_EVENTS = [
    'Pushed 248 new contacts to Salesforce',
    'Updated 67 company records in HubSpot',
    'Enriched 134 leads in Zoho CRM',
    'Synced intent data to MS Dynamics',
    'Triggered Marketo workflow for hot leads',
];

const CRMIntegrationDashboard = () => {
    const [platforms, setPlatforms] = useState(PLATFORMS);
    const [activePlatform, setActivePlatform] = useState(0);
    const [syncLog, setSyncLog] = useState([SYNC_EVENTS[0], SYNC_EVENTS[1]]);
    const [totalSynced, setTotalSynced] = useState(36480);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePlatform(prev => (prev + 1) % PLATFORMS.length);
            setTotalSynced(prev => prev + Math.floor(Math.random() * 12) + 3);

            setSyncLog(prev => {
                const newEvent = SYNC_EVENTS[Math.floor(Math.random() * SYNC_EVENTS.length)];
                return [newEvent, prev[0]];
            });

            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 800);

            setPlatforms(prev => prev.map((p, i) => ({
                ...p,
                records: i === activePlatform
                    ? (parseInt(p.records.replace(/,/g, '')) + Math.floor(Math.random() * 10) + 1).toLocaleString()
                    : p.records
            })));
        }, 2800);

        return () => clearInterval(interval);
    }, [activePlatform]);

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
                    <Link2 size={10} style={{ color: '#6366f1' }} />
                    <span>integrations.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>CRM Hub</div>
                    {['Integrations', 'Sync Logs', 'Webhooks', 'API Keys'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #6366f1' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(99,102,241, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(99,102,241, 0.25)' }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>SYNCED</div>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: '#4f46e5', marginTop: '1px' }}>{totalSynced.toLocaleString()}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>CRM & Platform Integrations</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>Seamless data sync to your tools</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RefreshCw size={9} style={{ color: '#6366f1' }} className={isSyncing ? 'spin-anim' : ''} />
                            <span style={{ fontSize: '8px', color: '#6366f1', fontWeight: 800 }}>Auto-sync</span>
                        </div>
                    </div>

                    {/* Platform grid */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {platforms.map((platform, i) => (
                            <div
                                key={platform.name}
                                style={{
                                    flex: '1 0 calc(33% - 6px)',
                                    minWidth: '80px',
                                    background: activePlatform === i ? `${platform.color}10` : '#f8fafc',
                                    border: `1.5px solid ${activePlatform === i ? platform.color + '60' : 'rgba(226,232,240,0.8)'}`,
                                    borderRadius: '10px',
                                    padding: '8px',
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: platform.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                                        {platform.logo}
                                    </div>
                                    <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#0f172a' }}>{platform.name}</span>
                                </div>
                                <div style={{ fontSize: '9.5px', fontWeight: 900, color: platform.color }}>{platform.records}</div>
                                <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                                    {platform.status === 'synced' ? (
                                        <CheckCircle2 size={9} style={{ color: '#10b981' }} />
                                    ) : platform.status === 'syncing' ? (
                                        <RefreshCw size={9} style={{ color: platform.color }} className="spin-anim" />
                                    ) : (
                                        <Zap size={9} style={{ color: '#f59e0b' }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sync log */}
                    <div style={{ flex: 1, background: '#f8fafc', borderRadius: '10px', border: '1px solid rgba(226,232,240,0.7)', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Live Sync Log</div>
                        <AnimatePresence mode="popLayout">
                            {syncLog.map((event, i) => (
                                <motion.div
                                    key={event + i}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '8px', color: i === 0 ? '#0f172a' : '#94a3b8', fontWeight: i === 0 ? 700 : 600 }}
                                >
                                    <ArrowRight size={8} style={{ color: '#6366f1', flexShrink: 0 }} />
                                    {event}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMIntegrationDashboard;
