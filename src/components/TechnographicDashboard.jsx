import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Code, BarChart2, Settings, Sparkles } from 'lucide-react';

const TECH_STACKS = [
    { company: 'NovaTech', crm: 'Salesforce', cloud: 'AWS', marketing: 'Marketo', score: 92 },
    { company: 'DataFlow', crm: 'HubSpot', cloud: 'Azure', marketing: 'Pardot', score: 84 },
    { company: 'SkyBuild', crm: 'Zoho', cloud: 'GCP', marketing: 'ActiveCampaign', score: 77 },
    { company: 'EdgeForce', crm: 'Dynamics', cloud: 'AWS', marketing: 'HubSpot', score: 89 },
];

const TECH_CATEGORIES = [
    { name: 'CRM Platforms', count: 12, icon: Settings, color: '#6366f1', bg: '#eef2ff', items: ['Salesforce', 'HubSpot', 'Zoho', 'Dynamics'] },
    { name: 'Cloud Providers', count: 8, icon: Cloud, color: '#0ea5e9', bg: '#e0f7ff', items: ['AWS', 'Azure', 'GCP'] },
    { name: 'Marketing Tech', count: 24, icon: BarChart2, color: '#10b981', bg: '#f0fdf4', items: ['Marketo', 'Pardot', 'ActiveCampaign'] },
];

const TechnographicDashboard = () => {
    const [stacks, setStacks] = useState(TECH_STACKS);
    const [activeRow, setActiveRow] = useState(0);
    const [totalProfiles, setTotalProfiles] = useState(22847);
    const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRow(prev => (prev + 1) % TECH_STACKS.length);
            setActiveCategory(prev => (prev + 1) % TECH_CATEGORIES.length);
            setTotalProfiles(prev => prev + Math.floor(Math.random() * 3) + 1);
            setStacks(prev => prev.map(s => ({
                ...s,
                score: Math.max(70, Math.min(99, s.score + Math.floor(Math.random() * 6) - 3))
            })));
        }, 2600);
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
                    <Cpu size={10} style={{ color: '#0ea5e9' }} />
                    <span>technographics.datamarketics.com</span>
                </div>
                <div style={{ width: '35px' }} />
            </div>

            <div style={{ display: 'flex', minHeight: '280px' }}>
                {/* Sidebar */}
                <div style={{ width: '90px', background: '#f8fafc', borderRight: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 6px', marginBottom: '8px' }}>Tech Intel</div>
                    {['Overview', 'CRM', 'Cloud', 'MarTech'].map((item, i) => (
                        <button key={item} style={{ border: 'none', background: i === 0 ? '#ffffff' : 'transparent', color: i === 0 ? '#0f172a' : '#64748b', fontSize: '9px', fontWeight: i === 0 ? 800 : 600, padding: '6px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'default', borderLeft: i === 0 ? '3px solid #0ea5e9' : '3px solid transparent' }}>
                            {item}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', background: 'rgba(14, 165, 233, 0.06)', borderRadius: '10px', padding: '8px', border: '1px dashed rgba(14, 165, 233, 0.25)' }}>
                        <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>PROFILES</div>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: '#0284c7', marginTop: '1px' }}>{totalProfiles.toLocaleString()}</div>
                    </div>
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>Technographic Insights</h4>
                            <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 650, marginTop: '2px' }}>Software adoption & technology stacks</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8px', color: '#0284c7', fontWeight: 800 }}>
                            <Sparkles size={9} /> Scanning
                        </div>
                    </div>

                    {/* Tech category pills */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {TECH_CATEGORIES.map((cat, i) => (
                            <div key={cat.name} style={{
                                flex: 1,
                                background: activeCategory === i ? cat.bg : '#f8fafc',
                                border: `1px solid ${activeCategory === i ? cat.color + '50' : 'rgba(226,232,240,0.7)'}`,
                                borderRadius: '8px',
                                padding: '6px 8px',
                                transition: 'all 0.3s ease'
                            }}>
                                <cat.icon size={9} style={{ color: cat.color }} />
                                <div style={{ fontSize: '7px', fontWeight: 800, color: '#64748b', marginTop: '3px', textTransform: 'uppercase' }}>{cat.name}</div>
                                <div style={{ fontSize: '13px', fontWeight: 900, color: cat.color }}>{cat.count}+</div>
                            </div>
                        ))}
                    </div>

                    {/* Stack table */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'flex', gap: '0', padding: '0 6px' }}>
                            <span style={{ flex: 1.2 }}>Company</span>
                            <span style={{ flex: 1 }}>CRM</span>
                            <span style={{ flex: 1 }}>Cloud</span>
                            <span style={{ flex: 0.8, textAlign: 'right' }}>Score</span>
                        </div>
                        {stacks.map((stack, i) => (
                            <div
                                key={stack.company}
                                style={{
                                    background: activeRow === i ? '#f0f9ff' : '#f8fafc',
                                    border: `1px solid ${activeRow === i ? '#7dd3fc' : 'rgba(226,232,240,0.7)'}`,
                                    borderRadius: '8px',
                                    padding: '6px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span style={{ flex: 1.2, fontSize: '9px', fontWeight: 800, color: '#0f172a' }}>{stack.company}</span>
                                <span style={{ flex: 1, fontSize: '8px', color: '#6366f1', fontWeight: 700 }}>{stack.crm}</span>
                                <span style={{ flex: 1, fontSize: '8px', color: '#0ea5e9', fontWeight: 700 }}>{stack.cloud}</span>
                                <span style={{ flex: 0.8, textAlign: 'right', fontSize: '9px', fontWeight: 900, color: stack.score >= 88 ? '#10b981' : '#f59e0b' }}>{stack.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnographicDashboard;
