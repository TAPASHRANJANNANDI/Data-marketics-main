import React, { useEffect, useRef } from 'react';

const AboutSolutionsAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = canvas.width = 460;
        let height = canvas.height = 340;

        // Active particles flowing down the funnel
        let particles = [];
        let completedProfiles = [];
        let floatTexts = [];

        const layers = [
            { y: 100, label: "Identity Match (Email/Phone)", color: '#0ea5e9' },
            { y: 180, label: "Intent Classification", color: '#8b5cf6' },
            { y: 260, label: "Firmographics & Segmenting", color: '#10b981' }
        ];

        const spawnParticle = () => {
            particles.push({
                x: width / 2 + (Math.random() * 80 - 40),
                y: 20,
                speed: 1.2 + Math.random() * 0.8,
                radius: 4 + Math.random() * 3,
                currentLayer: 0,
                color: 'rgba(148, 163, 184, 0.6)',
                pulse: 0
            });
        };

        const drawFunnel = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw guidelines/funnel walls
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(width / 2 - 120, 20);
            ctx.lineTo(width / 2 - 60, 310);
            ctx.moveTo(width / 2 + 120, 20);
            ctx.lineTo(width / 2 + 60, 310);
            ctx.stroke();
            ctx.setLineDash([]); // reset

            // Spawn particles periodically
            if (Math.random() < 0.035 && particles.length < 20) {
                spawnParticle();
            }

            // Draw horizontal validation layers
            layers.forEach((layer) => {
                // Layer line
                ctx.strokeStyle = `rgba(226, 232, 240, 0.95)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                const inset = (layer.y / height) * 60; // funnel narrowing
                ctx.moveTo(width / 2 - 120 + inset, layer.y);
                ctx.lineTo(width / 2 + 120 - inset, layer.y);
                ctx.stroke();

                // Glowing layer tags
                ctx.fillStyle = layer.color;
                ctx.beginPath();
                ctx.arc(width / 2, layer.y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Labels
                ctx.fillStyle = '#64748b';
                ctx.font = 'bold 8.5px monospace';
                ctx.textAlign = 'left';
                ctx.fillText(layer.label, width / 2 + 10, layer.y - 6);
            });

            // --- Update and Draw Particles ---
            particles.forEach((p, index) => {
                p.y += p.speed;

                // Adjust X coordinate toward funnel center as they descend
                const funnelCenter = width / 2;
                p.x += (funnelCenter - p.x) * 0.015;

                // Check collision with validation layers
                layers.forEach((layer, lIdx) => {
                    if (p.currentLayer === lIdx && p.y >= layer.y) {
                        p.currentLayer += 1;
                        p.color = layer.color;
                        p.speed += 0.2; // accelerates as it becomes lighter/optimized

                        // Trigger text float
                        const tags = ["✔ VALIDATED", "✔ INTENT MATCH", "✔ ENRICHED"];
                        floatTexts.push({
                            text: tags[lIdx],
                            x: p.x + (Math.random() * 20 - 10),
                            y: p.y - 10,
                            opacity: 1,
                            color: layer.color
                        });
                    }
                });

                // Completed at funnel bottom
                if (p.y >= 310) {
                    particles.splice(index, 1);
                    
                    // Create floating completed node indicators at the bottom
                    completedProfiles.push({
                        x: p.x,
                        y: p.y,
                        opacity: 1.0,
                        radius: p.radius,
                        color: p.color
                    });

                    // Caps profiles array
                    if (completedProfiles.length > 8) {
                        completedProfiles.shift();
                    }
                }

                // Draw falling particle
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // --- Draw Completed Profile ripples at the bottom ---
            completedProfiles.forEach((cp, index) => {
                cp.opacity -= 0.01;
                cp.y += 0.3;

                ctx.strokeStyle = cp.color;
                ctx.globalAlpha = cp.opacity;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cp.x, cp.y, cp.radius * (1.5 + (1 - cp.opacity) * 3), 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;

                if (cp.opacity <= 0) {
                    completedProfiles.splice(index, 1);
                }
            });

            // --- Draw Floating Status Texts ---
            floatTexts.forEach((ft, index) => {
                ft.y -= 0.7;
                ft.opacity -= 0.018;

                ctx.fillStyle = ft.color;
                ctx.globalAlpha = ft.opacity;
                ctx.font = 'bold 8px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(ft.text, ft.x, ft.y);
                ctx.globalAlpha = 1.0;

                if (ft.opacity <= 0) {
                    floatTexts.splice(index, 1);
                }
            });

            // Funnel Inflow source header label
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('INCOMING LEADS PIPELINE', width / 2, 12);

            animId = requestAnimationFrame(drawFunnel);
        };
        drawFunnel();

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

export default AboutSolutionsAnimation;
