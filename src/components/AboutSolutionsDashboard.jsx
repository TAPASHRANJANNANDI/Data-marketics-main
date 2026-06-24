import React, { useState, useEffect, useRef } from 'react';
import { Layers, Check, Zap } from 'lucide-react';

const NAMES = ['Sarah C.', 'Alex M.', 'David R.', 'Jane D.', 'John K.', 'Robert L.', 'Emily W.', 'Michael B.', 'Jessica T.', 'Marcus A.', 'Sophia H.', 'Chris P.'];

const AboutSolutionsDashboard = () => {
    const canvasRef = useRef(null);
    const [enrichedCount, setEnrichedCount] = useState(14820);

    const [toggles, setToggles] = useState({
        emails: true,
        phones: true,
        revenues: false,
        technologies: true,
        staff: false
    });

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setEnrichedCount(prev => prev + Math.floor(Math.random() * 2) + 1);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    // High fidelity responsive data pipeline canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = 280;
        let height = 180;

        let particles = [];
        let floatTexts = [];
        let coreRotation = 0;
        let corePulseRadius = 0;

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

        const activeLabels = () => {
            const l = [];
            if (toggles.emails) l.push('✔ EMAIL');
            if (toggles.phones) l.push('✔ PHONE');
            if (toggles.revenues) l.push('✔ REVENUE');
            if (toggles.technologies) l.push('✔ STACK');
            if (toggles.staff) l.push('✔ EMPLOYEES');
            if (l.length === 0) l.push('✔ MATCHED');
            return l;
        };

        const activeColor = () => {
            if (toggles.emails) return '#0ea5e9';
            if (toggles.phones) return '#10b981';
            if (toggles.technologies) return '#14b8a6';
            return '#6366f1';
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

        const drawCard = (ctx, x, y, isEnriched, name, color) => {
            const w = 48;
            const h = 26;
            const rx = x - w / 2;
            const ry = y - h / 2;

            // Draw shadow
            ctx.fillStyle = 'rgba(15, 23, 42, 0.04)';
            ctx.beginPath();
            ctx.roundRect(rx + 1, ry + 1, w, h, 5);
            ctx.fill();

            if (!isEnriched) {
                // Locked raw anonymous card
                ctx.fillStyle = '#f8fafc';
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(rx, ry, w, h, 5);
                ctx.fill();
                ctx.stroke();

                // Avatar circle placeholder
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.arc(rx + 7, ry + h / 2, 3.5, 0, Math.PI * 2);
                ctx.fill();

                // Dotted locked text lines
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(rx + 15, ry + 9);
                ctx.lineTo(rx + 34, ry + 9);
                ctx.moveTo(rx + 15, ry + 16);
                ctx.lineTo(rx + 26, ry + 16);
                ctx.stroke();

                // Red Lock icon dot
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(rx + w - 7, ry + h / 2, 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Enriched verified contact card
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(rx, ry, w, h, 5);
                ctx.fill();
                ctx.stroke();

                // Avatar circle with active brand color
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(rx + 7, ry + h / 2, 3.5, 0, Math.PI * 2);
                ctx.fill();

                // Mini checkmark inside avatar
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(rx + 5.5, ry + h / 2);
                ctx.lineTo(rx + 7, ry + h / 2 + 1);
                ctx.lineTo(rx + 8.5, ry + h / 2 - 1);
                ctx.stroke();

                // Shortened contact name
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 6px Inter';
                ctx.textAlign = 'left';
                ctx.fillText(name, rx + 14, ry + 10);

                // Verification details label
                ctx.fillStyle = '#10b981';
                ctx.font = '800 4.5px Inter';
                ctx.fillText('VERIFIED', rx + 14, ry + 18);
            }
        };

        const drawPipeline = () => {
            ctx.clearRect(0, 0, width, height);

            coreRotation += 0.02;

            // Crisp horizontal guidelines for telemetry view
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
            ctx.lineWidth = 1;
            for (let y = 12; y < height; y += 22) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            const sourceNode = { x: 32, y: height / 2 };
            const coreNode = { x: width / 2, y: height / 2 };
            const destNode = { x: width - 32, y: height / 2 };

            // Curved tracks (adapt relative to container dimensions)
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.bezierCurveTo(sourceNode.x + width * 0.15, height/2 - height * 0.22, coreNode.x - width * 0.15, height/2 - height * 0.22, coreNode.x, coreNode.y);
            ctx.bezierCurveTo(coreNode.x + width * 0.15, height/2 + height * 0.22, destNode.x - width * 0.15, height/2 + height * 0.22, destNode.x, destNode.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.bezierCurveTo(sourceNode.x + width * 0.15, height/2 + height * 0.22, coreNode.x - width * 0.15, height/2 + height * 0.22, coreNode.x, coreNode.y);
            ctx.bezierCurveTo(coreNode.x + width * 0.15, height/2 - height * 0.22, destNode.x - width * 0.15, height/2 - height * 0.22, destNode.x, destNode.y);
            ctx.stroke();

            // Endpoints
            ctx.fillStyle = '#f1f5f9';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(sourceNode.x, sourceNode.y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.arc(destNode.x, destNode.y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

            // Center Scanner Chamber (the de-anonymization laser core)
            ctx.fillStyle = 'rgba(248, 250, 252, 0.9)';
            ctx.strokeStyle = '#14b8a6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(coreNode.x - 22, coreNode.y - 25, 44, 50, 8);
            ctx.fill();
            ctx.stroke();

            // Vertical scanning laser
            const laserY = coreNode.y - 20 + Math.abs(Math.sin(Date.now() * 0.0035)) * 40;
            ctx.strokeStyle = 'rgba(20, 184, 166, 0.7)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#14b8a6';
            ctx.beginPath();
            ctx.moveTo(coreNode.x - 18, laserY);
            ctx.lineTo(coreNode.x + 18, laserY);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Core pulse ring
            if (corePulseRadius > 0) {
                ctx.strokeStyle = `rgba(20, 184, 166, ${1 - corePulseRadius / 30})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath(); ctx.arc(coreNode.x, coreNode.y, 22 + corePulseRadius, 0, Math.PI * 2); ctx.stroke();
                corePulseRadius += 0.8;
                if (corePulseRadius > 30) corePulseRadius = 0;
            }

            // Spawn sliding lead cards
            const spawnChance = 0.02 + (Object.values(toggles).filter(Boolean).length * 0.005);
            if (Math.random() < spawnChance && particles.length < 5) {
                const pathId = Math.random() > 0.5 ? 1 : 2;
                particles.push({
                    t: 0,
                    speed: 0.004 + Math.random() * 0.003,
                    pathId: pathId,
                    name: NAMES[Math.floor(Math.random() * NAMES.length)],
                    enriched: false
                });
            }

            // Update & Draw sliding lead cards
            particles.forEach((p, idx) => {
                p.t += p.speed;

                let pt;
                const cY1 = p.pathId === 1 ? height/2 - height * 0.22 : height/2 + height * 0.22;
                const cY2 = p.pathId === 1 ? height/2 + height * 0.22 : height/2 - height * 0.22;

                if (p.t < 0.5) {
                    const localT = p.t * 2;
                    pt = getBezierPoint(localT, sourceNode, { x: sourceNode.x + width * 0.15, y: cY1 }, { x: coreNode.x - width * 0.15, y: cY2 }, coreNode);
                } else {
                    const localT = (p.t - 0.5) * 2;
                    pt = getBezierPoint(localT, coreNode, { x: coreNode.x + width * 0.15, y: cY2 }, { x: destNode.x - width * 0.15, y: cY1 }, destNode);

                    if (!p.enriched) {
                        p.enriched = true;
                        corePulseRadius = 3;

                        // Float text badge of attributes found
                        const labels = activeLabels();
                        const chosen = labels[Math.floor(Math.random() * labels.length)];
                        floatTexts.push({
                            text: chosen,
                            x: coreNode.x,
                            y: coreNode.y - 28,
                            opacity: 1
                        });
                    }
                }

                // Draw literal Lead Cards sliding
                drawCard(ctx, pt.x, pt.y, p.enriched, p.name, activeColor());

                if (p.t >= 1) {
                    particles.splice(idx, 1);
                }
            });

            // Update & Draw floating tags
            floatTexts.forEach((ft, idx) => {
                ft.y -= 0.65;
                ft.opacity -= 0.016;

                // Tiny rounded pill container
                ctx.fillStyle = `rgba(20, 184, 166, ${ft.opacity * 0.08})`;
                ctx.strokeStyle = `rgba(20, 184, 166, ${ft.opacity * 0.35})`;
                ctx.lineWidth = 1;
                
                ctx.font = 'bold 8px monospace';
                const textWidth = ctx.measureText(ft.text).width + 6;
                ctx.beginPath();
                ctx.roundRect(ft.x - textWidth/2, ft.y - 8, textWidth, 11, 3);
                ctx.fill(); ctx.stroke();

                // Draw text inside pill
                ctx.fillStyle = `rgba(13, 148, 136, ${ft.opacity})`;
                ctx.textAlign = 'center';
                ctx.fillText(ft.text, ft.x, ft.y);

                if (ft.opacity <= 0) {
                    floatTexts.splice(idx, 1);
                }
            });

            // Clean technical label markers
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 8.5px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('RAW LEADS', sourceNode.x, sourceNode.y + 24);
            ctx.fillText('ENRICHED CRM', destNode.x, destNode.y + 24);

            animId = requestAnimationFrame(drawPipeline);
        };
        drawPipeline();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, [toggles]);

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
                    <Layers size={15} style={{ color: '#14b8a6' }} />
                    <span style={{ fontSize: '11.5px', fontWeight: 850, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0f172a' }}>Enrichment pipeline</span>
                </div>
                <span style={{ fontSize: '9px', background: 'rgba(20, 184, 166, 0.1)', color: '#0d9488', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>LIVE SCAN</span>
            </div>

            {/* Content Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Visual canvas */}
                <div style={{ position: 'relative', background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', height: '180px', overflow: 'hidden' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>

                {/* Enrichment configuration & Stats */}
                <div>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em', marginBottom: '8px' }}>Select Attributes</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6.5px', marginBottom: '16px' }}>
                        <div className={`db-filter-pill ${toggles.emails ? 'active' : ''}`} style={{ fontSize: '10.5px', padding: '4.5px 10px' }} onClick={() => handleToggle('emails')}>
                            {toggles.emails && <Check size={9} />} Direct Emails
                        </div>
                        <div className={`db-filter-pill ${toggles.phones ? 'active' : ''}`} style={{ fontSize: '10.5px', padding: '4.5px 10px' }} onClick={() => handleToggle('phones')}>
                            {toggles.phones && <Check size={9} />} Mobile Phone
                        </div>
                        <div className={`db-filter-pill ${toggles.technologies ? 'active' : ''}`} style={{ fontSize: '10.5px', padding: '4.5px 10px' }} onClick={() => handleToggle('technologies')}>
                            {toggles.technologies && <Check size={9} />} Tech Stack
                        </div>
                        <div className={`db-filter-pill ${toggles.revenues ? 'active' : ''}`} style={{ fontSize: '10.5px', padding: '4.5px 10px' }} onClick={() => handleToggle('revenues')}>
                            {toggles.revenues && <Check size={9} />} Revenue
                        </div>
                        <div className={`db-filter-pill ${toggles.staff ? 'active' : ''}`} style={{ fontSize: '10.5px', padding: '4.5px 10px' }} onClick={() => handleToggle('staff')}>
                            {toggles.staff && <Check size={9} />} Staff size
                        </div>
                    </div>

                    {/* Stats card */}
                    <div style={{ background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '9px', fontWeight: 750, color: '#64748b', textTransform: 'uppercase' }}>Records Enriched Today</div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{enrichedCount.toLocaleString()}</div>
                        </div>
                        <div style={{ fontSize: '10px', background: 'rgba(20, 184, 166, 0.08)', color: '#0d9488', padding: '3.5px 8px', borderRadius: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Zap size={10} /> 99.2% Sync rate
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutSolutionsDashboard;
