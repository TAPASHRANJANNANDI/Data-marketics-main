import React, { useEffect, useRef } from 'react';

const AboutSpecialtiesAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = canvas.width = 460;
        let height = canvas.height = 340;

        let clickPulseRadius = 0;
        let clickPulseX = 0;
        let clickPulseY = 0;

        // Define force nodes
        const nodes = [
            { id: 'core', x: width / 2, y: height / 2, r: 10, color: '#14b8a6', label: 'DATAMARKETICS', size: 10, pulse: 0 },
            
            // Sub-hubs
            { id: 'strategy', x: width / 2 - 120, y: height / 2 - 60, r: 7, color: '#6366f1', label: 'STRATEGIES', size: 7, pulse: 0 },
            { id: 'growth', x: width / 2 + 120, y: height / 2 - 60, r: 7, color: '#0ea5e9', label: 'GROWTH', size: 7, pulse: 0 },
            { id: 'leadgen', x: width / 2, y: height / 2 + 90, r: 7, color: '#10b981', label: 'LEAD GEN', size: 7, pulse: 0 },
            
            // Branch leaves
            { id: 's1', x: width / 2 - 170, y: height / 2 - 110, r: 4, color: '#6366f1', label: 'Custom', size: 4, pulse: 0 },
            { id: 's2', x: width / 2 - 160, y: height / 2 - 20, r: 4, color: '#6366f1', label: 'Analytics', size: 4, pulse: 0 },
            
            { id: 'g1', x: width / 2 + 170, y: height / 2 - 110, r: 4, color: '#0ea5e9', label: 'Scale', size: 4, pulse: 0 },
            { id: 'g2', x: width / 2 + 160, y: height / 2 - 20, r: 4, color: '#0ea5e9', label: 'Expansion', size: 4, pulse: 0 },
            
            { id: 'l1', x: width / 2 - 50, y: height / 2 + 130, r: 4, color: '#10b981', label: 'Database', size: 4, pulse: 0 },
            { id: 'l2', x: width / 2 + 50, y: height / 2 + 130, r: 4, color: '#10b981', label: 'Verification', size: 4, pulse: 0 }
        ];

        // Connections mapping
        const links = [
            { source: 'core', target: 'strategy' },
            { source: 'core', target: 'growth' },
            { source: 'core', target: 'leadgen' },
            
            { source: 'strategy', target: 's1' },
            { source: 'strategy', target: 's2' },
            
            { source: 'growth', target: 'g1' },
            { source: 'growth', target: 'g2' },
            
            { source: 'leadgen', target: 'l1' },
            { source: 'leadgen', target: 'l2' }
        ];

        // Active packets flowing along links
        const packets = Array(8).fill(0).map(() => {
            const link = links[Math.floor(Math.random() * links.length)];
            return {
                source: link.source,
                target: link.target,
                progress: Math.random(),
                speed: 0.005 + Math.random() * 0.008,
                color: Math.random() > 0.5 ? '#14b8a6' : '#6366f1'
            };
        });

        // Trigger pulse on click
        canvas.onclick = (e) => {
            const rect = canvas.getBoundingClientRect();
            clickPulseX = e.clientX - rect.left;
            clickPulseY = e.clientY - rect.top;
            clickPulseRadius = 1;
        };

        const drawNetwork = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw link connections
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
            ctx.lineWidth = 1.8;
            links.forEach(l => {
                const s = nodes.find(n => n.id === l.source);
                const t = nodes.find(n => n.id === l.target);
                if (s && t) {
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(t.x, t.y);
                    ctx.stroke();
                }
            });

            // --- Draw and Update Packets ---
            packets.forEach(p => {
                p.progress += p.speed;
                if (p.progress >= 1) {
                    p.progress = 0;
                    // Trigger pulse on target node
                    const tNode = nodes.find(n => n.id === p.target);
                    if (tNode) tNode.pulse = 12;
                    
                    const nextLink = links[Math.floor(Math.random() * links.length)];
                    p.source = nextLink.source;
                    p.target = nextLink.target;
                }

                const sNode = nodes.find(n => n.id === p.source);
                const tNode = nodes.find(n => n.id === p.target);
                if (sNode && tNode) {
                    const px = sNode.x + (tNode.x - sNode.x) * p.progress;
                    const py = sNode.y + (tNode.y - sNode.y) * p.progress;

                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(px, py, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // --- Draw Nodes ---
            nodes.forEach(n => {
                // Nodes hover pulse reduction
                if (n.pulse > 0) {
                    ctx.strokeStyle = n.color;
                    ctx.globalAlpha = n.pulse / 12;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r + (12 - n.pulse) * 1.5, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                    n.pulse -= 0.3;
                }

                // Core breathing node oscillation
                let breathe = 0;
                if (n.id === 'core') {
                    breathe = Math.sin(Date.now() * 0.002) * 1.8;
                }

                // Node card border/background
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = n.color;
                ctx.lineWidth = n.id === 'core' ? 3.2 : 2.2;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + breathe, 0, Math.PI * 2);
                ctx.fill(); ctx.stroke();

                // Inner core
                ctx.fillStyle = n.color;
                ctx.beginPath();
                ctx.arc(n.x, n.y, (n.r - (n.id === 'core' ? 5 : 2.5)) + breathe, 0, Math.PI * 2);
                ctx.fill();

                // Labels
                ctx.fillStyle = '#0f172a';
                ctx.font = n.id === 'core' ? 'bold 9px Inter' : '700 8px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(n.label, n.x, n.y - (n.r + 8));
            });

            // --- Interactive Ripple Pulse ---
            if (clickPulseRadius > 0) {
                ctx.strokeStyle = `rgba(20, 184, 166, ${1 - clickPulseRadius / 60})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(clickPulseX, clickPulseY, clickPulseRadius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Collision detection of ripple with nodes to trigger active pulse
                nodes.forEach(n => {
                    const dx = n.x - clickPulseX;
                    const dy = n.y - clickPulseY;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (Math.abs(dist - clickPulseRadius) < 5) {
                        n.pulse = 12;
                    }
                });

                clickPulseRadius += 2.2;
                if (clickPulseRadius > 60) clickPulseRadius = 0;
            }

            // Radar Scan title
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('SPECIALTIES LINK ANALYSIS', width / 2, 12);

            animId = requestAnimationFrame(drawNetwork);
        };
        drawNetwork();

        return () => {
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 20px 45px rgba(13, 115, 119, 0.05)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }} />
        </div>
    );
};

export default AboutSpecialtiesAnimation;
