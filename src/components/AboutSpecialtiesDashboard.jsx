import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Mail, Phone, ArrowRight, TrendingUp } from 'lucide-react';

const CONTACTS = [
    {
        id: 'c1',
        name: "Sarah Chen",
        initials: "SC",
        title: "VP of Sales",
        role: "Decision Maker",
        score: 94,
        color: '#10b981',
        email: "s.chen@techscale.io",
        phone: "+1 (555) 234-9081",
        offsetY: 66,
        offsetX: 0
    },
    {
        id: 'c2',
        name: "Marcus Aurelius",
        initials: "MA",
        title: "CTO & Founder",
        role: "Approver",
        score: 78,
        color: '#6366f1',
        email: "marcus.a@techscale.io",
        phone: "+1 (555) 234-9082",
        offsetY: 136,
        offsetX: -66
    },
    {
        id: 'c3',
        name: "David Ross",
        initials: "DR",
        title: "Director of HR",
        role: "Evaluator",
        score: 82,
        color: '#f59e0b',
        email: "d.ross@techscale.io",
        phone: "+1 (555) 234-9083",
        offsetY: 136,
        offsetX: 66
    }
];

const AboutSpecialtiesDashboard = () => {
    const canvasRef = useRef(null);
    const [selectedId, setSelectedId] = useState('c1');

    // Dynamic Org Chart centering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = 280;
        let height = 180;

        let pulseAngle = 0;
        let flowingSparks = [];

        // Dynamic High-DPI Resize Handler
        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            width = rect.width || 280;
            height = rect.height || 180;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const getNodes = () => {
            return CONTACTS.map(c => ({
                ...c,
                x: width / 2 + c.offsetX,
                y: c.offsetY
            }));
        };

        const spawnSpark = (nodes, parentNode) => {
            const paths = [
                { from: parentNode, to: nodes[0] }, // Parent to Sarah
                { from: nodes[0], to: nodes[1] },  // Sarah to Marcus
                { from: nodes[0], to: nodes[2] }   // Sarah to David
            ];
            const chosen = paths[Math.floor(Math.random() * paths.length)];
            flowingSparks.push({
                fromX: chosen.from.x,
                fromY: chosen.from.y,
                toX: chosen.to.x,
                toY: chosen.to.y,
                progress: 0,
                speed: 0.012 + Math.random() * 0.012
            });
        };

        const drawOrgChart = () => {
            ctx.clearRect(0, 0, width, height);

            pulseAngle += 0.035;
            const nodes = getNodes();
            const parentNode = { x: width / 2, y: 20 };

            // Technical grid background
            ctx.fillStyle = 'rgba(148, 163, 184, 0.04)';
            for (let x = 10; x < width; x += 18) {
                for (let y = 10; y < height; y += 18) {
                    ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
                }
            }

            // Draw Account Tree lines
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.95)';
            ctx.lineWidth = 1.8;

            const c1 = nodes[0]; // Sarah
            const c2 = nodes[1]; // Marcus
            const c3 = nodes[2]; // David

            ctx.beginPath();
            // Parent to Level 1
            ctx.moveTo(parentNode.x, parentNode.y); ctx.lineTo(c1.x, c1.y);
            // Level 1 to Level 2
            ctx.moveTo(c1.x, c1.y); ctx.lineTo(c2.x, c2.y);
            ctx.moveTo(c1.x, c1.y); ctx.lineTo(c3.x, c3.y);
            ctx.stroke();

            // Spawn sparks
            if (Math.random() < 0.075 && flowingSparks.length < 8) {
                spawnSpark(nodes, parentNode);
            }

            // Update & Draw sparks
            flowingSparks.forEach((spark, idx) => {
                spark.progress += spark.speed;
                if (spark.progress >= 1) {
                    flowingSparks.splice(idx, 1);
                    return;
                }

                const sx = spark.fromX + (spark.toX - spark.fromX) * spark.progress;
                const sy = spark.fromY + (spark.toY - spark.fromY) * spark.progress;

                ctx.fillStyle = '#6366f1';
                ctx.beginPath();
                ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Account Intent Radar Sweep Ripple
            const rippleY = 15 + Math.abs(Math.sin(Date.now() * 0.0018)) * 140;
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(width / 2 - 95, rippleY);
            ctx.lineTo(width / 2 + 95, rippleY);
            ctx.stroke();

            // Draw Parent Corporate HQ Card
            const parentW = 104;
            const parentH = 22;
            const px = parentNode.x - parentW / 2;
            const py = parentNode.y - parentH / 2;

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.roundRect(px, py, parentW, parentH, 6);
            ctx.fill(); ctx.stroke();

            // Parent target text
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 8.5px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('TechScale Inc.', parentNode.x, parentNode.y);

            // Pulsing target engagement beacon
            const targetBlink = Math.abs(Math.sin(Date.now() * 0.005)) > 0.3 ? 1 : 0.3;
            ctx.fillStyle = '#ef4444';
            ctx.globalAlpha = targetBlink;
            ctx.beginPath();
            ctx.arc(px + 8, parentNode.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // Draw contact cards on canvas
            nodes.forEach(c => {
                const isSelected = selectedId === c.id;

                const cardW = 104;
                const cardH = 36;
                const rx = c.x - cardW / 2;
                const ry = c.y - cardH / 2;

                // Card Shadow
                ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
                ctx.beginPath();
                ctx.roundRect(rx + 2, ry + 2, cardW, cardH, 8);
                ctx.fill();

                // Card body background
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = isSelected ? c.color : '#e2e8f0';
                ctx.lineWidth = isSelected ? 2.5 : 1.5;
                ctx.beginPath();
                ctx.roundRect(rx, ry, cardW, cardH, 8);
                ctx.fill(); ctx.stroke();

                // Active click indicator pulse wave
                if (isSelected) {
                    const wave = Math.abs(Math.sin(pulseAngle)) * 4;
                    ctx.strokeStyle = c.color;
                    ctx.globalAlpha = 0.2;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.roundRect(rx - wave/2, ry - wave/2, cardW + wave, cardH + wave, 9);
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }

                // Avatar bubble
                const avX = rx + 14;
                const avY = ry + cardH / 2;
                const avR = 9.5;
                ctx.fillStyle = c.color;
                ctx.beginPath(); ctx.arc(avX, avY, avR, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 7.5px Inter';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(c.initials, avX, avY);

                // Info texts
                ctx.textAlign = 'left';
                ctx.textBaseline = 'alphabetic';

                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 8px Inter';
                ctx.fillText(c.name, rx + 28, ry + 15);

                ctx.fillStyle = '#64748b';
                ctx.font = '600 7px Inter';
                ctx.fillText(c.title, rx + 28, ry + 25);

                // Target scoring gauge dial
                const dialX = rx + cardW - 13;
                const dialY = ry + cardH / 2;
                const dialR = 7.5;

                ctx.strokeStyle = '#f1f5f9';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(dialX, dialY, dialR, 0, Math.PI * 2); ctx.stroke();

                ctx.strokeStyle = c.color;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.arc(dialX, dialY, dialR, -Math.PI/2, (-Math.PI/2) + (Math.PI * 2 * c.score / 100));
                ctx.stroke();

                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 6.5px Inter';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(c.score, dialX, dialY);
            });

            animId = requestAnimationFrame(drawOrgChart);
        };
        drawOrgChart();

        const handleCanvasClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const nodes = getNodes();

            nodes.forEach(c => {
                const cardW = 104;
                const cardH = 36;
                const rx = c.x - cardW / 2;
                const ry = c.y - cardH / 2;

                if (clickX >= rx && clickX <= rx + cardW && clickY >= ry && clickY <= ry + cardH) {
                    setSelectedId(c.id);
                }
            });
        };

        canvas.addEventListener('click', handleCanvasClick);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('click', handleCanvasClick);
        };
    }, [selectedId]);

    const activeContact = CONTACTS.find(c => c.id === selectedId);

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.95)',
            borderRadius: '24px',
            padding: '22px',
            boxShadow: '0 20px 45px rgba(13, 115, 119, 0.05)',
            width: '100%',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} style={{ color: '#6366f1' }} />
                    <span style={{ fontSize: '11.5px', fontWeight: 850, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0f172a' }}>Buying Committee Map</span>
                </div>
                <div style={{ fontSize: '9px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={9} /> High intent
                </div>
            </div>

            {/* Content layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Visual canvas */}
                <div style={{ position: 'relative', background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', height: '180px', overflow: 'hidden' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer' }} />
                    <div style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                        Click cards on canvas to inspect profiles
                    </div>
                </div>

                {/* Profile Inspector Panel */}
                <div style={{ minHeight: '165px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em', marginBottom: '8px' }}>Selected Lead Detail</div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeContact.id}
                            initial={{ opacity: 0, scale: 0.97, y: 3 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: -3 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                flexGrow: 1,
                                background: '#ffffff',
                                border: '1px solid rgba(226, 232, 240, 0.9)',
                                borderRadius: '14px',
                                padding: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a', fontWeight: 800 }}>{activeContact.name}</h4>
                                    <div style={{ fontSize: '11px', color: '#6366f1', fontWeight: 700, marginTop: '2px' }}>{activeContact.title}</div>
                                </div>
                                <span style={{ fontSize: '10px', background: `${activeContact.color}15`, color: activeContact.color, padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>
                                    {activeContact.score}% Score
                                </span>
                            </div>

                            {/* Contact info links */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', margin: '12px 0', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569' }}>
                                    <Mail size={11} style={{ color: activeContact.color }} />
                                    <span>{activeContact.email}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569' }}>
                                    <Phone size={11} style={{ color: activeContact.color }} />
                                    <span>{activeContact.phone}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px' }}>
                                <span style={{ color: '#10b981', fontWeight: 750 }}>✔ Verification complete</span>
                                <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 650 }}>{activeContact.role} <ArrowRight size={10} /></span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default AboutSpecialtiesDashboard;
