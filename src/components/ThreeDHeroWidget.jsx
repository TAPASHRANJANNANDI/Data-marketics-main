import React, { useEffect, useState, useRef } from 'react';
import corporateHero from '../assets/img/about/corporate_hero.webp';

const ThreeDHeroWidget = () => {
    const [leadsCount, setLeadsCount] = useState(1482);
    const canvasRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeadsCount(prev => prev + Math.floor(Math.random() * 2) + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Canvas animation for Speedometer + Dancing Bar Graph
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

        // Bar graph values
        const barHeights = [44, 28, 52, 32, 46, 38];
        const barCount = barHeights.length;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const time = Date.now() * 0.0035;

            // --- 1. DRAW SPEEDOMETER DIAL (Left side) ---
            const speedCX = width * 0.16;
            const speedCY = height * 0.44;
            const speedR = height * 0.31;

            const baseValue = 0.992;
            const fluctuation = Math.sin(time) * 0.003;
            const needleValue = baseValue + fluctuation;

            ctx.strokeStyle = 'rgba(20, 184, 166, 0.12)';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(speedCX, speedCY, speedR, Math.PI * 0.85, Math.PI * 2.15);
            ctx.stroke();

            const speedGrad = ctx.createLinearGradient(speedCX - speedR, speedCY, speedCX + speedR, speedCY);
            speedGrad.addColorStop(0, '#14b8a6');
            speedGrad.addColorStop(1, '#6366f1');
            ctx.strokeStyle = speedGrad;
            ctx.lineWidth = 5.5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            const endAngle = Math.PI * 0.85 + (Math.PI * 1.3) * needleValue;
            ctx.arc(speedCX, speedCY, speedR, Math.PI * 0.85, endAngle);
            ctx.stroke();

            ctx.save();
            ctx.translate(speedCX, speedCY);
            ctx.rotate(endAngle);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(-4, 0);
            ctx.lineTo(speedR - 6, 0);
            ctx.stroke();

            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(speedR - 8, 0);
            ctx.lineTo(speedR - 5, 0);
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(speedCX, speedCY, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(speedCX, speedCY, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('ACCURACY', speedCX, speedCY + 25);

            ctx.fillStyle = '#0f172a';
            ctx.font = '900 12px Inter, sans-serif';
            ctx.fillText(`${(needleValue * 100).toFixed(1)}%`, speedCX, speedCY + 14);

            // --- 2. DRAW DANCING BARS (Right side) ---
            const barStartX = width * 0.34;
            const barStartY = height - 16;
            const remainingWidth = width - barStartX - 15;
            const maxBarWidth = (remainingWidth / barCount) - 8;
            const barSpacing = 8;

            for (let i = 0; i < barCount; i++) {
                const wave = Math.sin(time + i * 0.95) * Math.cos(time * 0.5 + i * 0.4);
                const currentH = barHeights[i] + wave * 22;
                const finalH = Math.max(currentH, 8);
                const bx = barStartX + i * (maxBarWidth + barSpacing);
                const by = barStartY - finalH;

                const barGrad = ctx.createLinearGradient(bx, by, bx, barStartY);
                barGrad.addColorStop(0, '#2dd4bf');
                barGrad.addColorStop(0.6, '#14b8a6');
                barGrad.addColorStop(1, '#0d7377');

                ctx.fillStyle = barGrad;
                ctx.beginPath();
                const r = 3;
                ctx.moveTo(bx + r, by);
                ctx.lineTo(bx + maxBarWidth - r, by);
                ctx.quadraticCurveTo(bx + maxBarWidth, by, bx + maxBarWidth, by + r);
                ctx.lineTo(bx + maxBarWidth, barStartY);
                ctx.lineTo(bx, barStartY);
                ctx.lineTo(bx, by + r);
                ctx.quadraticCurveTo(bx, by, bx + r, by);
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(bx + maxBarWidth / 2, by - 5, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#6366f1';
                ctx.fill();
            }

            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('LEAD FLOW INDICATOR', barStartX, 15);

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
                    alt="B2B platform analytics" 
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'cover'
                    }} loading="eager" fetchPriority="high" />
            </div>

            {/* Floating Metric Card Overlay - Single DOM Node positioned responsively */}
            <div className="pulse-metric-card">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em' }}>PLATFORM PULSE</span>
                    </div>
                    <span style={{ fontSize: '9px', background: '#ecfdf5', color: '#10b981', padding: '2px 6px', borderRadius: '20px', fontWeight: 800 }}>LIVE</span>
                </div>

                {/* Canvas with speedometer and dancing bars */}
                <div style={{ height: '110px', width: '100%', marginBottom: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>

                {/* Progress Metrics */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>Global Coverage</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>96.0%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>Active Leads Found</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{leadsCount.toLocaleString()}</div>
                </div>
            </div>

        </div>
    );
};

export default ThreeDHeroWidget;
