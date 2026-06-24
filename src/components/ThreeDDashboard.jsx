import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Database, 
    TrendingUp, 
    Radio, 
    CheckCircle, 
    RefreshCw, 
    SlidersHorizontal, 
    Zap, 
    Check, 
    Phone, 
    Mail, 
    Linkedin,
    Sparkles
} from 'lucide-react';

const PROFILES = [
    {
        name: "James Thornton",
        title: "Dir. Marketing",
        company: "SaaS Co",
        score: 82,
        email: 92,
        phone: 78,
        linkedin: 96,
        tags: ["Job Change", "Funding Round", "Product Launch"],
        avatarColor: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
        initials: "JT"
    },
    {
        name: "Sophia Martinez",
        title: "VP of Sales",
        company: "ScaleAI",
        score: 94,
        email: 97,
        phone: 89,
        linkedin: 98,
        tags: ["Expansion", "Hire Signal", "C-Suite Match"],
        avatarColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        initials: "SM"
    },
    {
        name: "Liam O'Connor",
        title: "CTO & Co-Founder",
        company: "Fintech Solutions",
        score: 88,
        email: 95,
        phone: 81,
        linkedin: 92,
        tags: ["Tech Update", "Series B+", "Security Match"],
        avatarColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        initials: "LO"
    },
    {
        name: "Aisha Rahman",
        title: "Head of Growth",
        company: "CyberSec Labs",
        score: 91,
        email: 94,
        phone: 85,
        linkedin: 97,
        tags: ["Intent Spike", "USA Target", "SaaS Filter"],
        avatarColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        initials: "AR"
    },
    {
        name: "Daniel Kim",
        title: "Director of HR",
        company: "AutoCorp Global",
        score: 79,
        email: 88,
        phone: 75,
        linkedin: 91,
        tags: ["New Hiring", "500+ Staff", "Scale Signal"],
        avatarColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
        initials: "DK"
    }
];

const ThreeDDashboard = () => {
    const radarCanvasRef = useRef(null);
    const pipelineCanvasRef = useRef(null);
    
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileIndex, setProfileIndex] = useState(0);
    const [leadsCount, setLeadsCount] = useState(1284);
    const [intentCount, setIntentCount] = useState(342);
    
    // Interactive filters state
    const [filters, setFilters] = useState({
        vpSales: true,
        cSuite: false,
        technology: true,
        usa: true,
        saas: true,
        employees: false,
        seriesB: false
    });

    const toggleFilter = (key) => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Cycle through profiles periodically, sync with lead counting
    useEffect(() => {
        const interval = setInterval(() => {
            setProfileIndex(prev => (prev + 1) % PROFILES.length);
            setLeadsCount(prev => prev + Math.floor(Math.random() * 4) + 1);
            setIntentCount(prev => prev + Math.floor(Math.random() * 2) + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Canvas 1: Left column Radar Scan Animation
    useEffect(() => {
        const canvas = radarCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = 240;
        let height = 120;
        
        let sweepAngle = 0;

        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width || 240;
            height = rect.height || 120;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Coordinates based on active filters
        const getTargets = () => {
            const list = [];
            if (filters.vpSales) list.push({ r: 0.35, angle: 1.2, color: '#6366f1' });
            if (filters.cSuite) list.push({ r: 0.7, angle: 2.8, color: '#8b5cf6' });
            if (filters.technology) list.push({ r: 0.55, angle: 0.6, color: '#14b8a6' });
            if (filters.usa) list.push({ r: 0.45, angle: 4.8, color: '#0ea5e9' });
            if (filters.saas) list.push({ r: 0.65, angle: 3.5, color: '#10b981' });
            if (filters.employees) list.push({ r: 0.8, angle: 5.4, color: '#f59e0b' });
            if (filters.seriesB) list.push({ r: 0.25, angle: 2.1, color: '#ec4899' });
            
            // Standard fallback if nothing is selected
            if (list.length === 0) {
                list.push({ r: 0.4, angle: 1.5, color: '#94a3b8' });
                list.push({ r: 0.7, angle: 4.2, color: '#94a3b8' });
            }
            return list;
        };

        const drawRadar = () => {
            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2 + 10;
            const maxR = Math.min(width, height) * 0.32;

            sweepAngle = (sweepAngle + 0.02) % (Math.PI * 2);

            // Draw concentric circles
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.85)';
            ctx.lineWidth = 1.2;
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, maxR * (i / 3), 0, Math.PI * 2);
                ctx.stroke();
            }

            // Draw crosshairs
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.5)';
            ctx.beginPath();
            ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
            ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
            ctx.stroke();

            // Draw sweeping ray gradient trail
            const trailCount = 18;
            for (let i = 0; i < trailCount; i++) {
                const sa = sweepAngle - i * 0.015;
                ctx.fillStyle = `rgba(14, 165, 233, ${(1 - i/trailCount) * 0.12})`;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + maxR * Math.cos(sa), cy + maxR * Math.sin(sa));
                ctx.lineTo(cx + maxR * Math.cos(sa - 0.015), cy + maxR * Math.sin(sa - 0.015));
                ctx.closePath();
                ctx.fill();
            }

            // Draw targets (blinking when swept)
            const targets = getTargets();
            targets.forEach(t => {
                const tx = cx + maxR * t.r * Math.cos(t.angle);
                const ty = cy + maxR * t.r * Math.sin(t.angle);

                let diff = sweepAngle - t.angle;
                while (diff < 0) diff += Math.PI * 2;
                let intensity = 0;
                if (diff < 0.8) intensity = (1 - diff/0.8) * 0.85;

                // Outer aura
                ctx.beginPath();
                ctx.arc(tx, ty, 3 + intensity * 6, 0, Math.PI * 2);
                ctx.fillStyle = t.color;
                ctx.globalAlpha = 0.2 + intensity * 0.5;
                ctx.fill();
                ctx.globalAlpha = 1.0;

                // Center dot
                ctx.beginPath();
                ctx.arc(tx, ty, 2, 0, Math.PI * 2);
                ctx.fillStyle = t.color;
                ctx.fill();
            });

            // Sweep line edge
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + maxR * Math.cos(sweepAngle), cy + maxR * Math.sin(sweepAngle));
            ctx.stroke();

            // Center pulse point
            ctx.beginPath();
            ctx.arc(cx, cy, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#14b8a6';
            ctx.fill();

            animId = requestAnimationFrame(drawRadar);
        };
        drawRadar();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, [filters]);

    // Canvas 2: Middle column Data Pipeline Flow
    useEffect(() => {
        const canvas = pipelineCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = 300;
        let height = 240;

        // Particle configuration
        let particles = [];
        let floatingTags = [];
        let corePulseRadius = 0;
        let coreRotation = 0;

        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width || 300;
            height = rect.height || 240;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Base color mapping
        const getFilterColors = () => {
            const c = [];
            if (filters.technology) c.push('#14b8a6');
            if (filters.saas) c.push('#10b981');
            if (filters.vpSales) c.push('#6366f1');
            if (filters.usa) c.push('#0ea5e9');
            if (filters.cSuite) c.push('#8b5cf6');
            if (c.length === 0) c.push('#94a3b8');
            return c;
        };

        const activeFilterLabels = () => {
            const l = [];
            if (filters.vpSales) l.push('+VP Sales');
            if (filters.cSuite) l.push('+C-Level');
            if (filters.technology) l.push('+TechStack');
            if (filters.usa) l.push('+USA Region');
            if (filters.saas) l.push('+SaaS');
            if (filters.employees) l.push('+Size:500+');
            if (filters.seriesB) l.push('+Series B');
            if (l.length === 0) l.push('+ICP Data');
            return l;
        };

        const spawnParticle = () => {
            const filterColors = getFilterColors();
            const labels = activeFilterLabels();
            const color = filterColors[Math.floor(Math.random() * filterColors.length)];
            const label = labels[Math.floor(Math.random() * labels.length)];
            
            const ctrlY1 = height / 2 + (Math.random() * (height * 0.25) - (height * 0.125));
            const ctrlY2 = height / 2 + (Math.random() * (height * 0.25) - (height * 0.125));

            particles.push({
                t: 0,
                speed: 0.005 + Math.random() * 0.004 + (Object.values(filters).filter(Boolean).length * 0.001),
                color: color,
                label: label,
                size: 2.5 + Math.random() * 2,
                ctrlY1: ctrlY1,
                ctrlY2: ctrlY2,
                phase: 1
            });
        };

        const getBezierPoint = (t, p0, p1, p2, p3) => {
            const u = 1 - t;
            const tt = t * t;
            const uu = u * u;
            const uuu = uu * u;
            const ttt = tt * t;

            const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
            const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

            return { x, y };
        };

        canvas.onclick = () => {
            corePulseRadius = 15;
            for (let i = 0; i < 8; i++) {
                setTimeout(spawnParticle, i * 60);
            }
        };

        const animatePipeline = () => {
            ctx.clearRect(0, 0, width, height);

            const sourceNode = { x: 30, y: height / 2 };
            const coreNode = { x: width / 2, y: height / 2 };
            const destNode = { x: width - 30, y: height / 2 };

            coreRotation += 0.02;

            const spawnChance = 0.04 + (Object.values(filters).filter(Boolean).length * 0.01);
            if (Math.random() < spawnChance && particles.length < 35) {
                spawnParticle();
            }

            ctx.strokeStyle = 'rgba(226, 232, 240, 0.3)';
            ctx.lineWidth = 1;
            for (let x = 10; x < width; x += 25) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }

            ctx.strokeStyle = 'rgba(20, 184, 166, 0.07)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.bezierCurveTo(sourceNode.x + width * 0.16, height/2 - height * 0.16, coreNode.x - width * 0.16, height/2 - height * 0.16, coreNode.x, coreNode.y);
            ctx.bezierCurveTo(coreNode.x + width * 0.16, height/2 - height * 0.16, destNode.x - width * 0.16, height/2 - height * 0.16, destNode.x, destNode.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.bezierCurveTo(sourceNode.x + width * 0.16, height/2 + height * 0.16, coreNode.x - width * 0.16, height/2 + height * 0.16, coreNode.x, coreNode.y);
            ctx.bezierCurveTo(coreNode.x + width * 0.16, height/2 + height * 0.16, destNode.x - width * 0.16, height/2 + height * 0.16, destNode.x, destNode.y);
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#0ea5e9';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(sourceNode.x, sourceNode.y, 8, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.arc(sourceNode.x, sourceNode.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#0ea5e9';
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(destNode.x, destNode.y, 8, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.arc(destNode.x, destNode.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.fill();

            ctx.save();
            ctx.translate(coreNode.x, coreNode.y);
            ctx.rotate(coreRotation);

            ctx.strokeStyle = 'rgba(20, 184, 166, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, 18, 0, Math.PI * 2);
            ctx.stroke();

            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2);
                ctx.beginPath();
                ctx.arc(18 * Math.cos(angle), 18 * Math.sin(angle), 2.5, 0, Math.PI * 2);
                ctx.fillStyle = '#14b8a6';
                ctx.fill();
            }

            ctx.rotate(-coreRotation * 2);
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
            ctx.beginPath();
            ctx.arc(0, 0, 26, 0, Math.PI * 2);
            ctx.stroke();
            for (let i = 0; i < 3; i++) {
                const angle = (i * Math.PI * 2 / 3);
                ctx.beginPath();
                ctx.arc(26 * Math.cos(angle), 26 * Math.sin(angle), 2, 0, Math.PI * 2);
                ctx.fillStyle = '#6366f1';
                ctx.fill();
            }
            ctx.restore();

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#14b8a6';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(coreNode.x, coreNode.y, 11, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.arc(coreNode.x, coreNode.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#14b8a6';
            ctx.fill();

            if (corePulseRadius > 0) {
                ctx.strokeStyle = `rgba(20, 184, 166, ${1 - corePulseRadius / 32})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(coreNode.x, coreNode.y, 11 + corePulseRadius, 0, Math.PI * 2);
                ctx.stroke();
                corePulseRadius += 0.8;
                if (corePulseRadius > 32) corePulseRadius = 0;
            }

            particles.forEach((p, idx) => {
                p.t += p.speed;

                let pt;
                if (p.t < 0.5) {
                    const localT = p.t * 2;
                    pt = getBezierPoint(localT, sourceNode, { x: sourceNode.x + width * 0.18, y: p.ctrlY1 }, { x: coreNode.x - width * 0.18, y: p.ctrlY2 }, coreNode);
                } else {
                    const localT = (p.t - 0.5) * 2;
                    if (p.phase === 1) {
                        p.phase = 2;
                        corePulseRadius = 4;
                        floatingTags.push({
                            text: p.label,
                            x: coreNode.x + (Math.random() * 20 - 10),
                            y: coreNode.y - 12,
                            opacity: 1,
                            scale: 0.85
                        });
                    }

                    pt = getBezierPoint(localT, coreNode, { x: coreNode.x + width * 0.18, y: p.ctrlY2 }, { x: destNode.x - width * 0.18, y: p.ctrlY1 }, destNode);
                }

                ctx.shadowBlur = 5;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                if (p.t >= 1) {
                    particles.splice(idx, 1);
                }
            });

            floatingTags.forEach((tag, idx) => {
                tag.y -= 0.6;
                tag.opacity -= 0.016;
                tag.scale += 0.004;

                ctx.fillStyle = `rgba(13, 148, 136, ${tag.opacity})`;
                ctx.font = 'bold 8.5px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(tag.text, tag.x, tag.y);

                if (tag.opacity <= 0) {
                    floatingTags.splice(idx, 1);
                }
            });

            ctx.fillStyle = '#64748b';
            ctx.font = '700 8.5px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('INGESTION', sourceNode.x, sourceNode.y + 20);
            ctx.fillText('ENRICHMENT', coreNode.x, coreNode.y + 36);
            ctx.fillText('VERIFIED', destNode.x, destNode.y + 20);

            animId = requestAnimationFrame(animatePipeline);
        };
        animatePipeline();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, [filters]);

    const activeProfile = PROFILES[profileIndex];

    return (
        <div className="db-container">
            {/* Dashboard Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', paddingBottom: '16px', marginBottom: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8.5px' }}>
                    <div style={{ width: '8.5px', height: '8.5px', borderRadius: '50%', background: '#0ea5e9', boxShadow: '0 0 10px #0ea5e9', animation: 'pulse 1.8s infinite' }} />
                    <span style={{ fontSize: '13px', fontWeight: 850, letterSpacing: '0.05em', color: '#0f172a' }}>LEAD INTELLIGENCE ENGINE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', background: '#ecfdf5', color: '#10b981', padding: '3.5px 10px', borderRadius: '20px', fontWeight: 800 }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
                    <span>● LIVE DATA SYNC</span>
                </div>
            </div>

            {/* Three-Column Grid */}
            <div className="db-grid">
                
                {/* 1. Left Column: Filters & Radar Scanner */}
                <div className="db-left-col">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6.5px', marginBottom: '14px', color: '#475569' }}>
                            <SlidersHorizontal size={14} />
                            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>FILTERS</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            <div className={`db-filter-pill ${filters.vpSales ? 'active' : ''}`} onClick={() => toggleFilter('vpSales')}>
                                {filters.vpSales && <Check size={11} />} VP Sales
                            </div>
                            <div className={`db-filter-pill ${filters.cSuite ? 'active' : ''}`} onClick={() => toggleFilter('cSuite')}>
                                {filters.cSuite && <Check size={11} />} C-Suite
                            </div>
                            <div className={`db-filter-pill ${filters.technology ? 'active' : ''}`} onClick={() => toggleFilter('technology')}>
                                {filters.technology && <Check size={11} />} Technology
                            </div>
                            <div className={`db-filter-pill ${filters.usa ? 'active' : ''}`} onClick={() => toggleFilter('usa')}>
                                {filters.usa && <Check size={11} />} USA Target
                            </div>
                            <div className={`db-filter-pill ${filters.saas ? 'active' : ''}`} onClick={() => toggleFilter('saas')}>
                                {filters.saas && <Check size={11} />} SaaS Sector
                            </div>
                            <div className={`db-filter-pill ${filters.employees ? 'active' : ''}`} onClick={() => toggleFilter('employees')}>
                                {filters.employees && <Check size={11} />} 500+ Staff
                            </div>
                            <div className={`db-filter-pill ${filters.seriesB ? 'active' : ''}`} onClick={() => toggleFilter('seriesB')}>
                                {filters.seriesB && <Check size={11} />} Series B+
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6.5px', marginBottom: '10px', color: '#475569' }}>
                            <Radio size={14} style={{ color: '#0ea5e9' }} />
                            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>RADAR SCANNER</span>
                        </div>
                        <div style={{ position: 'relative', background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', height: '120px', overflow: 'hidden' }}>
                            <canvas ref={radarCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '10px', color: '#64748b', fontWeight: 650 }}>
                            <span>Scanning: {Object.keys(filters).filter(k => filters[k]).length > 0 ? 'Targeted' : 'Global Grid'}</span>
                            <span style={{ color: '#0ea5e9' }}>{Object.keys(filters).filter(k => filters[k]).length} Nodes Active</span>
                        </div>
                    </div>
                </div>

                {/* 2. Middle Column: Unique Data Pipeline Ingestion Visualizer */}
                <div className="db-mid-col">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6.5px', color: '#475569' }}>
                            <Zap size={14} style={{ color: '#14b8a6' }} />
                            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DATA PIPELINE</span>
                        </div>
                        <button 
                            className="btn-enrich-pulse"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4.5px',
                                background: 'rgba(20, 184, 166, 0.08)',
                                border: '1px solid rgba(20, 184, 166, 0.25)',
                                color: '#0d9488',
                                fontSize: '9px',
                                fontWeight: 850,
                                textTransform: 'uppercase',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(20, 184, 166, 0.15)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(20, 184, 166, 0.08)'}
                        >
                            <Sparkles size={10} /> Enrich Pulse
                        </button>
                    </div>
                    
                    <div style={{ position: 'relative', background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '18px', height: '240px', overflow: 'hidden' }}>
                        <canvas ref={pipelineCanvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer' }} />
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
                        Click on pipeline canvas to manual-inject lead record signals
                    </div>
                </div>

                {/* 3. Right Column: Tab Switcher & Dynamic Profile Card */}
                <div className="db-right-col">
                    {/* Tab Switcher Header */}
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '3.5px', borderRadius: '10px', width: '100%' }}>
                        <button 
                            className={`db-tab-btn ${activeTab === 'Profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Profile')}
                        >
                            Profile
                        </button>
                        <button 
                            className={`db-tab-btn ${activeTab === 'Org Chart' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Org Chart')}
                        >
                            Org Chart
                        </button>
                    </div>

                    {/* Content Panel */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <AnimatePresence mode="wait">
                            {activeTab === 'Profile' ? (
                                <motion.div
                                    key={activeProfile.name}
                                    initial={{ opacity: 0, scale: 0.96, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96, y: -5 }}
                                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid rgba(226, 232, 240, 0.9)',
                                        borderRadius: '18px',
                                        padding: '18px',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {/* Main Contact Metadata Header */}
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '50%',
                                            background: activeProfile.avatarColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#ffffff',
                                            fontSize: '15px',
                                            fontWeight: 800,
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                            position: 'relative',
                                            flexShrink: 0
                                        }}>
                                            {activeProfile.initials}
                                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '9.5px', height: '9.5px', borderRadius: '50%', background: '#10b981', border: '2px solid #ffffff' }} />
                                        </div>
                                        <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ margin: 0, fontSize: '15.5px', color: '#0f172a', fontWeight: 800, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{activeProfile.name}</h4>
                                                <span style={{ fontSize: '9px', background: 'rgba(14, 165, 233, 0.08)', color: '#0ea5e9', padding: '2px 7px', borderRadius: '20px', fontWeight: 800, flexShrink: 0 }}>HIGH MATCH</span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 700, marginTop: '1px' }}>{activeProfile.title}</div>
                                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1.5px', fontWeight: 650 }}>{activeProfile.company}</div>
                                        </div>
                                    </div>

                                    {/* Scores: Gauge + Progress bars */}
                                    <div style={{ display: 'flex', gap: '16px', margin: '16px 0', alignItems: 'center', borderTop: '1px solid rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(0, 0, 0, 0.04)', padding: '14px 0' }}>
                                        {/* Radial Score Gauge */}
                                        <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                                            <svg width="64" height="64" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#f1f5f9"
                                                    strokeWidth="2.8"
                                                />
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="url(#tealGradient)"
                                                    strokeDasharray={`${activeProfile.score}, 100`}
                                                    strokeWidth="3.2"
                                                    strokeLinecap="round"
                                                />
                                                <defs>
                                                    <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#14b8a6" />
                                                        <stop offset="100%" stopColor="#6366f1" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{activeProfile.score}</span>
                                                <span style={{ fontSize: '7px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginTop: '1px' }}>Score</span>
                                            </div>
                                        </div>

                                        {/* Progress bars */}
                                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6.5px' }}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 750, color: '#475569', marginBottom: '2.5px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Mail size={9} /> Email Verification</span>
                                                    <span style={{ color: '#0ea5e9' }}>{activeProfile.email}%</span>
                                                </div>
                                                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', background: '#0ea5e9', width: `${activeProfile.email}%`, borderRadius: '10px' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 750, color: '#475569', marginBottom: '2.5px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Phone size={9} /> Direct Phone Match</span>
                                                    <span style={{ color: '#10b981' }}>{activeProfile.phone}%</span>
                                                </div>
                                                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', background: '#10b981', width: `${activeProfile.phone}%`, borderRadius: '10px' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 750, color: '#475569', marginBottom: '2.5px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Linkedin size={9} /> LinkedIn Check</span>
                                                    <span style={{ color: '#6366f1' }}>{activeProfile.linkedin}%</span>
                                                </div>
                                                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', background: '#6366f1', width: `${activeProfile.linkedin}%`, borderRadius: '10px' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Pills / Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {activeProfile.tags.map((tag, i) => (
                                            <span 
                                                key={i} 
                                                style={{ 
                                                    fontSize: '9.5px', 
                                                    background: 'rgba(99, 102, 241, 0.06)', 
                                                    border: '1px solid rgba(99, 102, 241, 0.15)',
                                                    color: '#4f46e5', 
                                                    padding: '2.5px 8px', 
                                                    borderRadius: '6px', 
                                                    fontWeight: 750 
                                                }}
                                            >
                                                ● {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="orgchart"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid rgba(226, 232, 240, 0.9)',
                                        borderRadius: '18px',
                                        padding: '20px',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#64748b'
                                    }}
                                >
                                    <Database size={28} style={{ color: '#94a3b8', marginBottom: '10px' }} />
                                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>ORGANIZATIONAL CHART</span>
                                    <p style={{ fontSize: '11px', textAlign: 'center', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                                        Buying Committee mapped for <br /><strong>{activeProfile.company}</strong> (3 contacts loaded)
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', marginTop: '14px' }}>
                                        <div style={{ background: '#f8fafc', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', display: 'flex', justifyContent: 'space-between', borderLeft: '3px solid #0ea5e9' }}>
                                            <span><strong>{activeProfile.name}</strong> ({activeProfile.title})</span>
                                            <span style={{ color: '#0ea5e9', fontWeight: 700 }}>Decision Maker</span>
                                        </div>
                                        <div style={{ background: '#f8fafc', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', display: 'flex', justifyContent: 'space-between', borderLeft: '3px solid #10b981' }}>
                                            <span><strong>Sarah Jenkins</strong> (VP Finance)</span>
                                            <span style={{ color: '#10b981', fontWeight: 700 }}>Approver</span>
                                        </div>
                                        <div style={{ background: '#f8fafc', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', display: 'flex', justifyContent: 'space-between', borderLeft: '3px solid #6366f1' }}>
                                            <span><strong>David Ross</strong> (Sales Ops Mgr)</span>
                                            <span style={{ color: '#6366f1', fontWeight: 700 }}>Influencer</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>

            {/* Bottom Statistics Row */}
            <div className="db-stats-row">
                
                {/* Stat 1 */}
                <div className="db-stats-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#0d9488', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 750, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b' }}>Sourced Today</span>
                        <Database size={15} style={{ color: '#14b8a6' }} />
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        {leadsCount.toLocaleString()}
                        <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>+36 New Leads</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#10b981', fontWeight: 700, marginTop: '2.5px' }}>✔ Real-time verified</div>
                </div>

                {/* Stat 2 */}
                <div className="db-stats-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a78bfa', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 750, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b' }}>Verified Accuracy</span>
                        <CheckCircle size={15} style={{ color: '#6366f1' }} />
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>
                        99.1%
                    </div>
                    <div style={{ display: 'inline-flex', fontSize: '9px', background: '#e0f2fe', color: '#0369a1', padding: '1.5px 7px', borderRadius: '4px', fontWeight: 800, marginTop: '4px' }}>
                        accuracy threshold
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="db-stats-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#f59e0b', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 750, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b' }}>Intent Signals</span>
                        <TrendingUp size={15} style={{ color: '#f59e0b' }} />
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        {intentCount.toLocaleString()}
                        <span style={{ fontSize: '10px', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>Active</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#f59e0b', fontWeight: 700, marginTop: '2.5px' }}>⚡ Intent Spike Triggered</div>
                </div>

            </div>
        </div>
    );
};

export default ThreeDDashboard;
