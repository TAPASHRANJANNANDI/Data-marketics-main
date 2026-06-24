import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ShieldAlert, Award, FileText, CheckSquare, Sparkles } from 'lucide-react';

const INITIAL_PROSPECTS = [
    { id: 'p1', name: 'Matilda Bell', company: 'Stripe', role: 'VP Sales', score: 84, action: 'Opened Email', delta: '+5', color: '#10b981' },
    { id: 'p2', name: 'Bruce Wayne', company: 'Wayne Corp', role: 'CEO', score: 68, action: 'Visited Pricing', delta: '+15', color: '#6366f1' },
    { id: 'p3', name: 'Sarah Connor', company: 'Cyberdyne', role: 'CTO', score: 72, action: 'Downloaded PDF', delta: '+20', color: '#f59e0b' }
];

const INTENT_ACTIONS = [
    { text: 'Visited Pricing Page', val: 15 },
    { text: 'Downloaded Case Study', val: 12 },
    { text: 'Clicked Email Link', val: 8 },
    { text: 'Filled Demo Request', val: 25 },
    { text: 'Attended Webinar', val: 18 }
];

const LeadScoringNurturingDashboard = () => {
    const [prospects, setProspects] = useState(INITIAL_PROSPECTS);
    const [conversionRate, setConversionRate] = useState(33.98);
    const [campaignsSent, setCampaignsSent] = useState(778);
    const [recentAlert, setRecentAlert] = useState(null);

    // Checklist tasks for nurturing
    const [tasks, setTasks] = useState([
        { text: 'Score intent signals', done: true },
        { text: 'Filter ICP criteria', done: true },
        { text: 'Auto-route hot lead', done: false },
        { text: 'Sync to CRM pipeline', done: false }
    ]);

    // Live update interval simulating active scoring updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Pick a random prospect to update
            setProspects(prev => {
                const updated = [...prev];
                const idx = Math.floor(Math.random() * updated.length);
                const actionObj = INTENT_ACTIONS[Math.floor(Math.random() * INTENT_ACTIONS.length)];
                
                let currentScore = updated[idx].score;
                let newScore = currentScore + Math.floor(Math.random() * 6) + 3;
                
                if (newScore > 100) {
                    newScore = 60 + Math.floor(Math.random() * 10); // reset score loop
                }

                updated[idx] = {
                    ...updated[idx],
                    score: newScore,
                    action: actionObj.text,
                    delta: `+${actionObj.val}`
                };

                // Trigger alerts and tasks based on score thresholds
                if (newScore >= 88) {
                    setRecentAlert({
                        name: updated[idx].name,
                        company: updated[idx].company,
                        score: newScore
                    });
                    
                    // Update checkmarks
                    setTasks(t => t.map((item, i) => i >= 2 ? { ...item, done: true } : item));
                } else if (newScore < 70) {
                    // Reset checkmarks to simulate loop
                    setTasks(t => t.map((item, i) => i >= 2 ? { ...item, done: false } : item));
                }

                return updated;
            });

            // Fluctuate dashboard conversion count
            setConversionRate(prev => {
                const diff = (Math.random() * 0.4 - 0.2);
                return parseFloat(Math.min(38, Math.max(30, prev + diff)).toFixed(2));
            });

            setCampaignsSent(prev => prev + (Math.random() > 0.7 ? 1 : 0));
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
                    <Award size={10} style={{ color: '#6366f1' }} />
                    <span>scoring.datamarketics.com</span>
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
                    <div style={{ fontSize: '7.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 8px', marginBottom: '8px' }}>CRM</div>
                    {['Overview', 'Pipeline', 'Prospects', 'Workflows'].map((menu, i) => (
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
                                borderLeft: i === 0 ? '3px solid #6366f1' : '3px solid transparent'
                            }}
                        >
                            {menu}
                        </button>
                    ))}
                    
                    {/* Hot Lead Pop Alert */}
                    <AnimatePresence>
                        {recentAlert && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                                style={{
                                    marginTop: 'auto',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '10px',
                                    padding: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '6.5px', color: '#ef4444', fontWeight: 850, textTransform: 'uppercase' }}>
                                    <ShieldAlert size={8} /> Hot Route
                                </div>
                                <div style={{ fontSize: '8.5px', fontWeight: 800, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{recentAlert.name}</div>
                                <div style={{ fontSize: '7.5px', color: '#ef4444', fontWeight: 750 }}>Score: {recentAlert.score}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Dashboard Core panel */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'hidden' }}>
                    
                    {/* Top statistics rows */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '10px 12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '8.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Conversion rate</div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{conversionRate}%</div>
                        </div>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '10px 12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '8.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Campaigns sent</div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{campaignsSent}</div>
                        </div>
                    </div>

                    {/* Split View: Left List / Right Task tracker */}
                    <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                        
                        {/* Prospects lists scoring */}
                        <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontSize: '8.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '2px' }}>Intent scoring queue</div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6.5px' }}>
                                {prospects.map(prospect => (
                                    <div
                                        key={prospect.id}
                                        style={{
                                            background: '#ffffff',
                                            border: '1px solid rgba(226, 232, 240, 0.85)',
                                            borderRadius: '10px',
                                            padding: '8px 10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.01)'
                                        }}
                                    >
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <h5 style={{ margin: 0, fontSize: '10.5px', fontWeight: 800, color: '#0f172a' }}>{prospect.name}</h5>
                                                <span style={{ fontSize: '7px', color: '#64748b', fontWeight: 650 }}>{prospect.company}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '8px', color: '#6366f1', marginTop: '3px', fontWeight: 650 }}>
                                                <Sparkles size={8} /> {prospect.action}
                                            </div>
                                        </div>

                                        {/* Score badge with custom background color */}
                                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                fontSize: '11px',
                                                fontWeight: 900,
                                                color: '#ffffff',
                                                background: prospect.score >= 88 ? '#10b981' : prospect.score >= 75 ? '#6366f1' : '#f59e0b',
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {prospect.score}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nurturing tasks checkoff panel */}
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.7)', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4.5px', borderBottom: '1px solid rgba(226, 232, 240, 0.6)', paddingBottom: '4px' }}>
                                <CheckSquare size={10} style={{ color: '#6366f1' }} />
                                <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Nurturing Tasks</span>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '2px' }}>
                                {tasks.map((task, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '3px',
                                            border: task.done ? '1px solid #10b981' : '1px solid #cbd5e1',
                                            background: task.done ? '#10b981' : '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            {task.done && (
                                                <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            )}
                                        </div>
                                        <span style={{
                                            fontSize: '8.5px',
                                            fontWeight: 650,
                                            color: task.done ? '#94a3b8' : '#334155',
                                            textDecoration: task.done ? 'line-through' : 'none'
                                        }}>
                                            {task.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default LeadScoringNurturingDashboard;
