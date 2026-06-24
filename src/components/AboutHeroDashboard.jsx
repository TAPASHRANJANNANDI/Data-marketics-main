import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

const REGIONS = {
    USA: {
        contacts: 48501,
        matchRate: 94,
        nodes: [
            { x: -55, y: -20, z: 40, name: 'Salesforce HQ' },
            { x: -25, y: -35, z: 50, name: 'Stripe NY' },
            { x: 5, y: -25, z: 60, name: 'Tesla Giga' },
            { x: -20, y: 15, z: 55, name: 'Amazon HQ' }
        ],
        color: '#0ea5e9'
    },
    Europe: {
        contacts: 32420,
        matchRate: 91,
        nodes: [
            { x: 35, y: -45, z: 30, name: 'Unilever LDN' },
            { x: 50, y: -30, z: 45, name: 'Siemens DE' },
            { x: 40, y: -15, z: 50, name: 'Adyen HQ' },
            { x: 60, y: -25, z: 25, name: 'L\'Oreal PAR' }
        ],
        color: '#6366f1'
    },
    APAC: {
        contacts: 24890,
        matchRate: 88,
        nodes: [
            { x: 75, y: 10, z: -30, name: 'Sony Tokyo' },
            { x: 60, y: 40, z: -20, name: 'Grab SG' },
            { x: 70, y: 20, z: -40, name: 'Samsung SEL' },
            { x: 50, y: 65, z: -10, name: 'Atlassian SYD' }
        ],
        color: '#10b981'
    }
};

const AboutHeroDashboard = () => {
    const canvasRef = useRef(null);
    const [activeRegion, setActiveRegion] = useState('USA');
    const [sourcedCount, setSourcedCount] = useState(REGIONS.USA.contacts);

    useEffect(() => {
        setSourcedCount(REGIONS[activeRegion].contacts);
    }, [activeRegion]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSourcedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // High fidelity responsive canvas map
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = 280;
        let height = 180;

        let globeRotation = 0;
        let packets = [];
        let particlesPool = [];
        let shockwaves = [];
        let logs = [
            { text: 'System Matrix Initialized', color: '#64748b' },
            { text: 'Monitoring global streams...', color: '#64748b' }
        ];

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

        const project3D = (x, y, z, rot) => {
            const cos = Math.cos(rot);
            const sin = Math.sin(rot);

            const rotX = x * cos - z * sin;
            const rotZ = x * sin + z * cos;

            // Center globe in the left portion if screen is wide enough for the logs ticker
            const cx = width > 340 ? (width - 150) / 2 : width / 2;
            const cy = height / 2;
            const fov = 160;
            const scale = fov / (fov + rotZ);

            return {
                x: cx + rotX * scale,
                y: cy + y * scale,
                z: rotZ,
                scale: scale
            };
        };

        const drawMap = () => {
            const activeColor = REGIONS[activeRegion].color;
            const baseNodes = REGIONS[activeRegion].nodes;

            ctx.clearRect(0, 0, width, height);

            globeRotation += 0.007;

            // 1. Draw Dotted Tech Background Mesh (limit to globe workspace area)
            const globeCX = width > 340 ? (width - 150) / 2 : width / 2;
            const globeCY = height / 2;
            const globeRadius = Math.min(globeCX, globeCY) * 0.75;

            ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
            for (let x = 10; x < (width > 340 ? width - 150 : width); x += 16) {
                for (let y = 10; y < height; y += 16) {
                    ctx.beginPath();
                    ctx.arc(x, y, 0.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Project 3D nodes into 2D screen coords
            const projectedNodes = baseNodes.map(node => {
                const pt = project3D(node.x, node.y, node.z, globeRotation);
                return {
                    ...pt,
                    name: node.name
                };
            });

            // 2. Globe Sphere Background Gradient
            const sphereGrad = ctx.createRadialGradient(globeCX, globeCY, 10, globeCX, globeCY, globeRadius);
            sphereGrad.addColorStop(0, '#ffffff');
            sphereGrad.addColorStop(1, '#f8fafc');
            ctx.fillStyle = sphereGrad;
            ctx.beginPath();
            ctx.arc(globeCX, globeCY, globeRadius, 0, Math.PI * 2);
            ctx.fill();

            // 3. Draw wireframe latitude rings
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
            ctx.lineWidth = 1;
            for (let lat = -2; lat <= 2; lat++) {
                const r = globeRadius * Math.cos(lat * 0.4);
                const y = globeRadius * Math.sin(lat * 0.4);

                ctx.save();
                ctx.translate(globeCX, globeCY + y);
                ctx.scale(1, 0.35);
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 4. Longitudinal meridian lines
            for (let i = 0; i < 4; i++) {
                ctx.save();
                ctx.translate(globeCX, globeCY);
                ctx.rotate(i * Math.PI / 4 + globeRotation * 0.25);
                ctx.scale(0.35, 1);
                ctx.beginPath();
                ctx.arc(0, 0, globeRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 5. Outer boundary ring
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(globeCX, globeCY, globeRadius, 0, Math.PI * 2);
            ctx.stroke();

            // 6. Connecting lines between projected nodes
            ctx.lineWidth = 1.2;
            for (let i = 0; i < projectedNodes.length; i++) {
                for (let j = i + 1; j < projectedNodes.length; j++) {
                    const n1 = projectedNodes[i];
                    const n2 = projectedNodes[j];

                    const midX = (n1.x + n2.x) / 2;
                    const midY = (n1.y + n2.y) / 2 - 18;

                    ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.quadraticCurveTo(midX, midY, n2.x, n2.y);
                    ctx.stroke();
                }
            }

            // 7. Spawn active signals
            if (Math.random() < 0.08 && packets.length < 6) {
                if (projectedNodes.length >= 2) {
                    const fromIdx = Math.floor(Math.random() * projectedNodes.length);
                    let toIdx = Math.floor(Math.random() * projectedNodes.length);
                    while (toIdx === fromIdx) {
                        toIdx = Math.floor(Math.random() * projectedNodes.length);
                    }

                    packets.push({
                        from: projectedNodes[fromIdx],
                        to: projectedNodes[toIdx],
                        progress: 0,
                        speed: 0.015 + Math.random() * 0.012,
                        trail: [],
                        toName: projectedNodes[toIdx].name
                    });
                }
            }

            // 8. Update & Draw Packets with Comet Trails
            packets.forEach((p, idx) => {
                p.progress += p.speed;

                if (p.progress >= 1) {
                    // Shockwave on arrival
                    shockwaves.push({ x: p.to.x, y: p.to.y, radius: 2, opacity: 1 });
                    for (let s = 0; s < 5; s++) {
                        particlesPool.push({
                            x: p.to.x,
                            y: p.to.y,
                            vx: (Math.random() * 2 - 1) * 1.6,
                            vy: (Math.random() * 2 - 1) * 1.6,
                            radius: 1 + Math.random() * 1.5,
                            opacity: 1
                        });
                    }

                    // Append event log dynamically
                    const actions = ['Enriched Lead', 'Match Verified', 'Sourced Contact', 'Syncing CRM', 'Intent Scan'];
                    const action = actions[Math.floor(Math.random() * actions.length)];
                    logs.unshift({
                        text: `${p.toName.split(' ')[0]} - ${action}`,
                        color: activeColor
                    });
                    if (logs.length > 5) logs.pop();

                    packets.splice(idx, 1);
                    return;
                }

                const n1 = p.from;
                const n2 = p.to;
                const midX = (n1.x + n2.x) / 2;
                const midY = (n1.y + n2.y) / 2 - 18;

                const u = 1 - p.progress;
                const px = u * u * n1.x + 2 * u * p.progress * midX + p.progress * p.progress * n2.x;
                const py = u * u * n1.y + 2 * u * p.progress * midY + p.progress * p.progress * n2.y;

                // Save coordinate to trail history
                p.trail.push({ x: px, y: py });
                if (p.trail.length > 5) p.trail.shift();

                // Draw comet trail segments
                for (let i = 0; i < p.trail.length - 1; i++) {
                    ctx.strokeStyle = activeColor;
                    ctx.globalAlpha = (i / p.trail.length) * 0.45;
                    ctx.lineWidth = 1.8 * (i / p.trail.length);
                    ctx.beginPath();
                    ctx.moveTo(p.trail[i].x, p.trail[i].y);
                    ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1.0;

                // Glowing packet head
                ctx.fillStyle = activeColor;
                ctx.beginPath();
                ctx.arc(px, py, 2.8, 0, Math.PI * 2);
                ctx.fill();
            });

            // 9. Update & Draw shockwaves
            shockwaves.forEach((sw, swIdx) => {
                sw.radius += 1.4;
                sw.opacity -= 0.05;

                ctx.strokeStyle = activeColor;
                ctx.globalAlpha = sw.opacity;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;

                if (sw.opacity <= 0) {
                    shockwaves.splice(swIdx, 1);
                }
            });

            // 10. Draw sparks
            particlesPool.forEach((spark, spIdx) => {
                spark.x += spark.vx;
                spark.y += spark.vy;
                spark.opacity -= 0.04;

                ctx.fillStyle = activeColor;
                ctx.globalAlpha = spark.opacity;
                ctx.beginPath();
                ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;

                if (spark.opacity <= 0) {
                    particlesPool.splice(spIdx, 1);
                }
            });

            // 11. Draw Nodes/Hubs
            projectedNodes.forEach(node => {
                const isFront = node.z > 0;
                ctx.globalAlpha = isFront ? 1.0 : 0.25;

                // Active glow ring
                const pulse = Math.abs(Math.sin(Date.now() * 0.003 + node.x)) * 6;
                ctx.fillStyle = activeColor;
                ctx.globalAlpha = isFront ? 0.15 : 0.04;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4 + pulse, 0, Math.PI * 2);
                ctx.fill();

                // Hub core outline
                ctx.globalAlpha = isFront ? 1.0 : 0.25;
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = activeColor;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4.5, 0, Math.PI * 2);
                ctx.fill(); ctx.stroke();

                // Inner core dot
                ctx.fillStyle = activeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
                ctx.fill();

                // Text tag (only for front nodes)
                if (isFront && node.z > 20) {
                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 8px Inter';
                    ctx.textAlign = 'center';
                    ctx.fillText(node.name, node.x, node.y - 8);
                }
            });
            ctx.globalAlpha = 1.0;

            // Ambient background glow
            const glowGrad = ctx.createRadialGradient(globeCX, globeCY, 10, globeCX, globeCY, globeRadius + 30);
            glowGrad.addColorStop(0, `${activeColor}06`);
            glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(globeCX, globeCY, globeRadius + 35, 0, Math.PI * 2);
            ctx.fill();

            // 12. Draw Live scrolling log ticker on the right side if width is wide enough
            if (width > 340) {
                ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(width - 150, 0);
                ctx.lineTo(width - 150, height);
                ctx.stroke();

                // Draw header text for ticker
                ctx.fillStyle = '#64748b';
                ctx.font = 'bold 8.5px Inter';
                ctx.textAlign = 'left';
                ctx.fillText('LIVE TARGET LOGS', width - 138, 22);

                // Draw logs
                logs.forEach((log, index) => {
                    const rowY = 38 + index * 26;
                    
                    // Log background card
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                    ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(width - 140, rowY - 10, 130, 20, 6);
                    ctx.fill();
                    ctx.stroke();

                    // Active blinking signal dot
                    const blink = Math.abs(Math.sin(Date.now() * 0.005 + index)) > 0.4 ? 1.0 : 0.4;
                    ctx.fillStyle = log.color || activeColor;
                    ctx.globalAlpha = blink;
                    ctx.beginPath();
                    ctx.arc(width - 130, rowY, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1.0;

                    // Log context text
                    ctx.fillStyle = '#475569';
                    ctx.font = 'bold 7.5px Inter';
                    ctx.textAlign = 'left';
                    ctx.fillText(log.text, width - 121, rowY + 2.5);
                });
            }

            animId = requestAnimationFrame(drawMap);
        };
        drawMap();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, [activeRegion]);

    const regionData = REGIONS[activeRegion];

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
                    <span style={{ fontSize: '11px', fontWeight: 850, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0f172a' }}>Global Signal Map</span>
                </div>
                <span style={{ fontSize: '9px', background: 'rgba(148, 163, 184, 0.08)', color: '#64748b', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>ACTIVE MATRIX</span>
            </div>

            {/* Grid layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Visual canvas */}
                <div style={{ position: 'relative', background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', height: '180px', overflow: 'hidden' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                        Region: <span style={{ color: regionData.color }}>{activeRegion} HQs Online</span>
                    </div>
                </div>

                {/* Regional Controls & Stats */}
                <div>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em', marginBottom: '8px' }}>Target Regions</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        {Object.keys(REGIONS).map((reg) => (
                            <button
                                key={reg}
                                onClick={() => setActiveRegion(reg)}
                                style={{
                                    flex: 1,
                                    padding: '6px 12px',
                                    borderRadius: '10px',
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.25s',
                                    border: activeRegion === reg ? `1px solid ${REGIONS[reg].color}` : '1px solid rgba(226, 232, 240, 0.8)',
                                    background: activeRegion === reg ? `rgba(226, 232, 240, 0.15)` : 'rgba(248, 250, 252, 0.8)',
                                    color: activeRegion === reg ? REGIONS[reg].color : '#475569'
                                }}
                            >
                                {activeRegion === reg && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: REGIONS[reg].color, marginRight: '6px' }} />}
                                {reg}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '14px' }}>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 14px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '9px', fontWeight: 750, color: '#64748b', textTransform: 'uppercase' }}>Sourced Contacts</div>
                            <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{sourcedCount.toLocaleString()}</div>
                        </div>

                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '12px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* SVG mini progress */}
                            <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                                <svg width="36" height="36" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={regionData.color} strokeWidth="3" strokeDasharray={`${regionData.matchRate}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                                </svg>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '9px', fontWeight: 900, color: '#0f172a' }}>{regionData.matchRate}%</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '9px', fontWeight: 750, color: '#64748b', textTransform: 'uppercase' }}>Match Rate</div>
                                <div style={{ fontSize: '10.5px', color: '#10b981', fontWeight: 700, marginTop: '1px' }}>verified accuracy</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AboutHeroDashboard;
