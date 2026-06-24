import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, RefreshCw, CheckCircle2, Plus, Zap, Sparkles } from 'lucide-react';

const ENRICHMENT_FIELDS = [
    { label: 'Company Size', status: 'enriched', value: '501-1000 employees' },
    { label: 'Annual Revenue', status: 'enriched', value: '$50M - $100M' },
    { label: 'Industry', status: 'enriched', value: 'SaaS / Cloud' },
    { label: 'LinkedIn URL', status: 'enriched', value: 'linkedin.com/company/...' },
    { label: 'Technologies', status: 'pending', value: '—' },
    { label: 'Funding Stage', status: 'pending', value: '—' },
];

const RECORDS_POOL = [
    { name: 'Acme Corp', missing: 3, filled: 8, pct: 73 },
    { name: 'TechForge', missing: 1, filled: 10, pct: 91 },
    { name: 'CloudSprint', missing: 4, filled: 7, pct: 64 },
    { name: 'DataPulse', missing: 0, filled: 11, pct: 100 },
    { name: 'NexaBase', missing: 2, filled: 9, pct: 82 },
];

const DataEnrichmentDashboard2 = () => {
    const [fields, setFields] = useState(ENRICHMENT_FIELDS);
    const [records, setRecords] = useState(RECORDS_POOL.slice(0, 4));
    const [enrichedTotal, setEnrichedTotal] = useState(18420);
    const [activeRecord, setActiveRecord] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRecord(prev => (prev + 1) % 4);
            setEnrichedTotal(prev => prev + Math.floor(Math.random() * 4) + 1);

            // Animate enrichment of pending fields
            setFields(prev => {
                const updated = [...prev];
                const pendingIdx = updated.findIndex(f => f.status === 'pending');
                if (pendingIdx !== -1) {
                    updated[pendingIdx] = { ...updated[pendingIdx], status: 'enriching' };
                    setTimeout(() => {
                        setFields(curr => curr.map((f, i) =>
                            i === pendingIdx ? { ...f, status: 'enriched', value: pendingIdx === 4 ? 'Salesforce, HubSpot, AWS' : 'Series B · $24M raised' } : f
                        ));
                    }, 800);
                }
                return updated;
            });

            setRecords(prev => prev.map(r => ({
                ...r,
                pct: Math.min(100, r.pct + Math.floor(Math.random() * 3))
            })));

            setIsRunning(true);
            setTimeout(() => setIsRunning(false), 600);
        }, 3000);

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
                    <Database size={10} style={{ color: '#8b5cf6' }} />
                    <span>enrichment.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Enrichment</div>
                    {['Pipeline', 'Records', 'Fields', 'Exports'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #8b5cf6' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(139,92,246, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(139,92,246, 0.25)', minWidth: 0 }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ENRICHED</div>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: '#7c3aed', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{enrichedTotal.toLocaleString()}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Data Enrichment Pipeline</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Auto-filling missing fields in real-time</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RefreshCw size={9} style={{ color: '#8b5cf6' }} className={isRunning ? 'spin-anim' : ''} />
                            <span style={{ fontSize: '8px', color: '#8b5cf6', fontWeight: 800 }}>Running</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                        {/* Field enrichment status */}
                        <div style={{ flex: 1.1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Field Status</div>
                            {fields.map((field, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', borderRadius: '7px', padding: '5px 8px', border: '1px solid rgba(226,232,240,0.7)' }}>
                                    {field.status === 'enriched' ? (
                                        <CheckCircle2 size={9} style={{ color: '#10b981', flexShrink: 0 }} />
                                    ) : field.status === 'enriching' ? (
                                        <RefreshCw size={9} style={{ color: '#8b5cf6', flexShrink: 0 }} className="spin-anim" />
                                    ) : (
                                        <Plus size={9} style={{ color: '#94a3b8', flexShrink: 0 }} />
                                    )}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{field.label}</div>
                                        <div style={{ fontSize: '7px', color: field.status === 'enriched' ? '#10b981' : '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {field.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Record completeness */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Record Completeness</div>
                            {records.map((rec, i) => (
                                <div key={rec.name} style={{ background: activeRecord === i ? '#faf5ff' : '#f8fafc', border: `1px solid ${activeRecord === i ? '#c4b5fd' : 'rgba(226,232,240,0.7)'}`, borderRadius: '7px', padding: '6px 8px', transition: 'all 0.3s ease' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', gap: '4px' }}>
                                        <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{rec.name}</span>
                                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: rec.pct === 100 ? '#10b981' : '#8b5cf6', flexShrink: 0 }}>{rec.pct}%</span>
                                    </div>
                                    <div style={{ height: '3px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            animate={{ width: `${rec.pct}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                            style={{ height: '100%', background: rec.pct === 100 ? '#10b981' : 'linear-gradient(to right, #8b5cf6, #6366f1)', borderRadius: '2px' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataEnrichmentDashboard2;
