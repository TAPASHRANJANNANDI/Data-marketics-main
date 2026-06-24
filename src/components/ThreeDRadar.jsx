import React, { useEffect, useRef, useState } from 'react';
import { Target, Server, Search } from 'lucide-react';

const ThreeDRadar = () => {
    const canvasRef = useRef(null);
    const [scannedCount, setScannedCount] = useState(2591);

    useEffect(() => {
        const interval = setInterval(() => {
            setScannedCount(prev => prev + Math.floor(Math.random() * 4) + 2);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId;
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', handleResize);

        // Nodes on the radar
        const targets = [
            { name: 'FinCorp', r: 0.35, angle: 0.8, size: 6, color: '#2dd4bf', label: 'Financial Services' },
            { name: 'SaaSify', r: 0.65, angle: 2.2, size: 5, color: '#2dd4bf', label: 'SaaS Platform' },
            { name: 'MedLabs', r: 0.45, angle: 3.8, size: 5.5, color: '#14b8a6', label: 'Healthcare' },
            { name: 'LogiTech', r: 0.75, angle: 5.1, size: 5, color: '#6366f1', label: 'Manufacturing' },
            { name: 'ApexRetail', r: 0.55, angle: 1.5, size: 6, color: '#14b8a6', label: 'E-commerce' }
        ];

        let sweepAngle = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            const centerX = width / 2;
            const centerY = height / 2;
            const maxRadius = Math.min(width, height) * 0.44;

            // Increment sweep angle
            sweepAngle = (sweepAngle + 0.012) % (Math.PI * 2);

            // Draw radial grid lines
            ctx.strokeStyle = 'rgba(20, 184, 166, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX - maxRadius, centerY);
            ctx.lineTo(centerX + maxRadius, centerY);
            ctx.moveTo(centerX, centerY - maxRadius);
            ctx.lineTo(centerX, centerY + maxRadius);
            ctx.stroke();

            // Draw concentric circular grid rings
            const rings = 4;
            for (let i = 1; i <= rings; i++) {
                const r = maxRadius * (i / rings);
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(20, 184, 166, ${0.12 - i * 0.02})`;
                ctx.stroke();

                // Draw distance indicators
                ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
                ctx.font = '8px monospace';
                ctx.fillText(`${i * 25}%`, centerX + r - 12, centerY - 4);
            }

            // Draw target matching nodes (glowing data coordinates)
            targets.forEach(t => {
                const tr = maxRadius * t.r;
                const tx = centerX + tr * Math.cos(t.angle);
                const ty = centerY + tr * Math.sin(t.angle);

                // Check distance between sweep angle and target angle
                let angleDiff = sweepAngle - t.angle;
                // Normalize angle diff
                while (angleDiff < 0) angleDiff += Math.PI * 2;
                while (angleDiff > Math.PI * 2) angleDiff -= Math.PI * 2;

                // sweep lighting overlay
                let intensity = 0;
                if (angleDiff < 0.8) {
                    intensity = (1 - angleDiff / 0.8) * 0.8;
                }

                // Draw pulsing node glow
                ctx.beginPath();
                ctx.arc(tx, ty, t.size + intensity * 6, 0, Math.PI * 2);
                ctx.fillStyle = t.color;
                ctx.globalAlpha = 0.2 + intensity * 0.7;
                ctx.fill();
                ctx.globalAlpha = 1.0;

                // Draw core node
                ctx.beginPath();
                ctx.arc(tx, ty, t.size - 1, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.strokeStyle = t.color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw connection target label line
                if (intensity > 0.15) {
                    ctx.strokeStyle = 'rgba(20, 184, 166, 0.3)';
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.lineTo(tx + 18, ty - 14);
                    ctx.lineTo(tx + 64, ty - 14);
                    ctx.stroke();

                    // Text
                    ctx.fillStyle = '#2dd4bf';
                    ctx.font = 'bold 9px Inter, sans-serif';
                    ctx.fillText(t.name, tx + 22, ty - 20);
                    ctx.fillStyle = '#e2e8f0';
                    ctx.font = '8px Inter, sans-serif';
                    ctx.fillText(t.label, tx + 22, ty - 4);
                }
            });

            // Draw sweep ray (radar rotation line with gradient sweep trail)
            const rayX = centerX + maxRadius * Math.cos(sweepAngle);
            const rayY = centerY + maxRadius * Math.sin(sweepAngle);

            // Draw gradient trail sweep slice
            const trailSliceCount = 45;
            for (let i = 0; i < trailSliceCount; i++) {
                const sliceAngle = sweepAngle - (i * 0.008);
                const sliceOpacity = (1 - i / trailSliceCount) * 0.14;
                ctx.fillStyle = `rgba(20, 184, 166, ${sliceOpacity})`;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + maxRadius * Math.cos(sliceAngle), centerY + maxRadius * Math.sin(sliceAngle));
                ctx.lineTo(centerX + maxRadius * Math.cos(sliceAngle - 0.008), centerY + maxRadius * Math.sin(sliceAngle - 0.008));
                ctx.closePath();
                ctx.fill();
            }

            // Draw main sweep ray line
            ctx.strokeStyle = 'rgba(45, 212, 191, 0.65)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(rayX, rayY);
            ctx.stroke();

            // Draw radar central pulse
            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#2dd4bf';
            ctx.fill();

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div style={{
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(45, 212, 191, 0.35)',
            borderRadius: '24px',
            padding: '24px',
            color: '#e2e8f0',
            boxShadow: '0 25px 65px -15px rgba(6, 78, 74, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
            width: '100%',
            fontFamily: 'Inter, sans-serif',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={15} color="#2dd4bf" />
                    <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94a3b8' }}>Target Matrix Radar</span>
                </div>
                <span style={{ fontSize: '10px', background: 'rgba(45, 212, 191, 0.1)', color: '#2dd4bf', padding: '3px 8px', borderRadius: '20px', fontWeight: 700 }}>Scanning Active</span>
            </div>

            {/* Radar Panel */}
            <div style={{ position: 'relative', background: 'rgba(0, 0, 0, 0.22)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', height: '240px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '18px' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>

            {/* Data Feed info */}
            <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Server size={18} color="#14b8a6" />
                    <div>
                        <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>Database size</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>54.2M Accounts</div>
                    </div>
                </div>
                <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Target size={18} color="#8b5cf6" />
                    <div>
                        <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, lineHeight: 1 }}>ICP Matched</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{scannedCount.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreeDRadar;
