import React, { useEffect, useState, useRef } from 'react';
import corporateIndustry from '../assets/img/about/corporate_industry.png';

const ThreeDIndustryWidget = () => {
    const [scannedCount, setScannedCount] = useState(2591);
    const canvasRef = useRef(null);

    // Dynamic target counts
    useEffect(() => {
        const interval = setInterval(() => {
            setScannedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Canvas animation for radar and real-time scrolling target sector matches
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

        // Nodes on the radar
        const targets = [
            { r: 0.35, angle: 0.8, color: '#2dd4bf' },
            { r: 0.65, angle: 2.2, color: '#2dd4bf' },
            { r: 0.45, angle: 3.8, color: '#14b8a6' },
            { r: 0.75, angle: 5.1, color: '#6366f1' }
        ];

        let sweepAngle = 0;
        const sparkPoints = Array(20).fill(0).map(() => Math.random() * 30 + 10);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // --- 1. DRAW ROTATING RADAR (Left side) ---
            const radarCX = width * 0.16;
            const radarCY = height * 0.54;
            const radarR = height * 0.35;

            sweepAngle = (sweepAngle + 0.038) % (Math.PI * 2);

            for (let i = 1; i <= 3; i++) {
                const r = radarR * (i / 3);
                ctx.beginPath();
                ctx.arc(radarCX, radarCY, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(13, 148, 136, ${0.45 - i * 0.08})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            ctx.strokeStyle = 'rgba(13, 148, 136, 0.25)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(radarCX - radarR, radarCY); ctx.lineTo(radarCX + radarR, radarCY);
            ctx.moveTo(radarCX, radarCY - radarR); ctx.lineTo(radarCX, radarCY + radarR);
            ctx.stroke();

            const trailCount = 30;
            for (let i = 0; i < trailCount; i++) {
                const sa = sweepAngle - i * 0.012;
                ctx.fillStyle = `rgba(20, 184, 166, ${(1 - i/trailCount) * 0.16})`;
                ctx.beginPath();
                ctx.moveTo(radarCX, radarCY);
                ctx.lineTo(radarCX + radarR * Math.cos(sa), radarCY + radarR * Math.sin(sa));
                ctx.lineTo(radarCX + radarR * Math.cos(sa - 0.012), radarCY + radarR * Math.sin(sa - 0.012));
                ctx.closePath();
                ctx.fill();
            }

            targets.forEach(t => {
                const tx = radarCX + radarR * t.r * Math.cos(t.angle);
                const ty = radarCY + radarR * t.r * Math.sin(t.angle);

                let diff = sweepAngle - t.angle;
                while (diff < 0) diff += Math.PI * 2;
                let intensity = 0;
                if (diff < 0.6) intensity = (1 - diff/0.6) * 0.8;

                ctx.beginPath();
                ctx.arc(tx, ty, 3.5 + intensity * 4, 0, Math.PI * 2);
                ctx.fillStyle = t.color;
                ctx.globalAlpha = 0.25 + intensity * 0.7;
                ctx.fill();
                ctx.globalAlpha = 1.0;

                ctx.beginPath();
                ctx.arc(tx, ty, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            });

            ctx.strokeStyle = 'rgba(45, 212, 191, 0.8)';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(radarCX, radarCY);
            ctx.lineTo(radarCX + radarR * Math.cos(sweepAngle), radarCY + radarR * Math.sin(sweepAngle));
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(radarCX, radarCY, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#14b8a6';
            ctx.fill();

            // --- 2. DRAW TARGET MATCHING CHART (Right side) ---
            const chartStartX = width * 0.34;
            const chartWidth = width - chartStartX - 15;
            const chartHeight = height * 0.45;
            const chartStartY = height * 0.27;

            if (Math.random() > 0.82) {
                sparkPoints.shift();
                sparkPoints.push(Math.random() * chartHeight + 10);
            }

            const areaGrad = ctx.createLinearGradient(chartStartX, chartStartY, chartStartX, chartStartY + chartHeight);
            areaGrad.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
            areaGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.fillStyle = areaGrad;
            
            ctx.beginPath();
            ctx.moveTo(chartStartX, chartStartY + chartHeight);
            const pointSpacing = chartWidth / (sparkPoints.length - 1);
            for (let i = 0; i < sparkPoints.length; i++) {
                const px = chartStartX + i * pointSpacing;
                const py = chartStartY + chartHeight - sparkPoints[i];
                ctx.lineTo(px, py);
            }
            ctx.lineTo(chartStartX + chartWidth, chartStartY + chartHeight);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            for (let i = 0; i < sparkPoints.length; i++) {
                const px = chartStartX + i * pointSpacing;
                const py = chartStartY + chartHeight - sparkPoints[i];
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();

            const endX = chartStartX + chartWidth;
            const endY = chartStartY + chartHeight - sparkPoints[sparkPoints.length - 1];
            ctx.beginPath();
            ctx.arc(endX, endY, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('TARGET SECTOR HIT RATE', chartStartX, 15);

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
                    src={corporateIndustry} 
                    alt="Target industry segmentation" 
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'cover'
                    }} 
                />
            </div>

            {/* Floating Metric Card Overlay - Single DOM Node positioned responsively */}
            <div className="radar-metric-card">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2dd4bf', boxShadow: '0 0 8px #2dd4bf' }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em' }}>TARGETING MATRIX</span>
                    </div>
                    <span style={{ fontSize: '9px', background: 'rgba(20, 184, 166, 0.1)', color: '#0d9488', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>ACTIVE SCAN</span>
                </div>

                {/* Canvas containing radar and target scrolling charts */}
                <div style={{ height: '110px', width: '100%', marginBottom: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>

                {/* Content text metadata */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>ICP Matched Profiles</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>{scannedCount.toLocaleString()}</div>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#10b981', fontWeight: 700 }}>Real-time verified</div>
                </div>
            </div>

        </div>
    );
};

export default ThreeDIndustryWidget;
