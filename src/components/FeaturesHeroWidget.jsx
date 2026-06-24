import React, { useEffect, useState, useRef } from 'react';
import corporateHero from '../assets/img/about/corporate_hero.png';
import { Sparkles } from 'lucide-react';

const FeaturesHeroWidget = () => {
    const [capturedCount, setCapturedCount] = useState(14820);
    const canvasRef = useRef(null);

    // Dynamic target counts
    useEffect(() => {
        const interval = setInterval(() => {
            setCapturedCount(prev => prev + Math.floor(Math.random() * 2) + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Canvas animation for satellite data pings -> database sync
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = 370;
        let height = 110;

        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width || 370;
            height = rect.height || 110;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        let pings = [];
        let dbPulse = 0;
        let linePoints = Array(22).fill(0).map(() => Math.random() * 15 + 5);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const time = Date.now();

            const satCX = width * 0.16;
            const satCY = height * 0.45;
            
            const dbCX = width * 0.84;
            const dbCY = height * 0.45;

            // 1. Draw Satellite Source (Pulsing Concentric Rings)
            const ringPulse = (time * 0.002) % 1;
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - ringPulse})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(satCX, satCY, 8 + ringPulse * 16, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(satCX, satCY, 8, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#6366f1';
            ctx.beginPath();
            ctx.arc(satCX, satCY, 3.5, 0, Math.PI * 2);
            ctx.fill();

            // 2. Draw Database Storage Cylinder on the right
            const dbW = 16;
            const dbH = 24;
            ctx.fillStyle = '#f1f5f9';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(dbCX - dbW/2, dbCY - dbH/2, dbW, dbH, 3);
            ctx.fill(); ctx.stroke();

            // DB partition lines
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dbCX - dbW/2, dbCY - 4); ctx.lineTo(dbCX + dbW/2, dbCY - 4);
            ctx.moveTo(dbCX - dbW/2, dbCY + 4); ctx.lineTo(dbCX + dbW/2, dbCY + 4);
            ctx.stroke();

            // DB pulse indicator
            if (dbPulse > 0) {
                ctx.fillStyle = `rgba(16, 185, 129, ${dbPulse})`;
                ctx.beginPath();
                ctx.arc(dbCX, dbCY - 8, 1.8, 0, Math.PI * 2);
                ctx.fill();
                dbPulse -= 0.03;
            } else {
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(dbCX, dbCY - 8, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Spawn floating data packets
            if (Math.random() < 0.06 && pings.length < 8) {
                pings.push({
                    x: satCX,
                    y: satCY,
                    targetX: dbCX,
                    targetY: dbCY,
                    progress: 0,
                    speed: 0.012 + Math.random() * 0.01,
                    size: 2.2 + Math.random() * 1.5
                });
            }

            // 4. Update and Draw packets (Curved Bezier pathways)
            pings.forEach((p, idx) => {
                p.progress += p.speed;

                if (p.progress >= 1) {
                    dbPulse = 1.0; // trigger db indicator flash
                    pings.splice(idx, 1);
                    return;
                }

                // Bezier interpolation
                const u = 1 - p.progress;
                const midX = (p.x + p.targetX) / 2;
                const midY = (p.y + p.targetY) / 2 - 22;

                const px = u * u * p.x + 2 * u * p.progress * midX + p.progress * p.progress * p.targetX;
                const py = u * u * p.y + 2 * u * p.progress * midY + p.progress * p.progress * p.targetY;

                // Draw path trace line
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.quadraticCurveTo(midX, midY, p.targetX, p.targetY);
                ctx.stroke();

                // Draw packet particle
                ctx.fillStyle = '#6366f1';
                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 5. Draw real-time sparkline graph (Middle segment)
            const chartX = width * 0.30;
            const chartW = width * 0.40;
            const chartH = 20;
            const chartY = height * 0.40;

            if (Math.random() > 0.85) {
                linePoints.shift();
                linePoints.push(Math.random() * chartH);
            }

            ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(chartX, chartY + chartH);
            ctx.lineTo(chartX + chartW, chartY + chartH);
            ctx.stroke();

            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            const step = chartW / (linePoints.length - 1);
            for (let i = 0; i < linePoints.length; i++) {
                const lx = chartX + i * step;
                const ly = chartY + chartH - linePoints[i];
                if (i === 0) ctx.moveTo(lx, ly);
                else ctx.lineTo(lx, ly);
            }
            ctx.stroke();

            // Sourced stats label on canvas
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 7.5px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('B2B DATA INTELLIGENCE PIPELINE', width / 2, 18);

            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            
            {/* Background corporate photo: hidden on mobile viewports */}
            <div className="d-none d-md-block" style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(13, 115, 119, 0.14)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                background: '#ffffff'
            }}>
                <img 
                    src={corporateHero} 
                    alt="Corporate Business Office" 
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'cover'
                    }} 
                />
            </div>

            {/* Floating Metric Card Overlay (Inherits absolute desktop positions) */}
            <div className="pulse-metric-card">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1' }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em' }}>INTELLIGENCE DESK</span>
                    </div>
                    <span style={{ fontSize: '9px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>LIVE MATRIX</span>
                </div>

                {/* Canvas containing animation */}
                <div style={{ height: '110px', width: '100%', marginBottom: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>

                {/* Content text metrics */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>Verified B2B Contacts</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>{capturedCount.toLocaleString()}</div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3.5px' }}>
                        <Sparkles size={11} /> Real-time active
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FeaturesHeroWidget;
