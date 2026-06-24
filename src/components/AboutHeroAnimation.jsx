import React, { useEffect, useRef } from 'react';

const AboutHeroAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let width = canvas.width = 460;
        let height = canvas.height = 340;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        // Create 3D points on a sphere
        const numPoints = 50;
        const points = [];
        const radius = 95;

        for (let i = 0; i < numPoints; i++) {
            const theta = Math.acos(Math.random() * 2 - 1);
            const phi = Math.random() * Math.PI * 2;

            points.push({
                x: radius * Math.sin(theta) * Math.cos(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(theta),
                // Speed offsets for internal breathing animation
                phase: Math.random() * Math.PI * 2
            });
        }

        // Particle packets traveling along lines
        const packets = Array(12).fill(0).map(() => ({
            fromIdx: Math.floor(Math.random() * numPoints),
            toIdx: Math.floor(Math.random() * numPoints),
            progress: Math.random(),
            speed: 0.006 + Math.random() * 0.008,
            color: Math.random() > 0.5 ? '#14b8a6' : '#0ea5e9'
        }));

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        let angleY = 0.004;
        let angleX = 0.002;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Ease mouse angles
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;

            const currentAngleY = angleY + mouseX;
            const currentAngleX = angleX - mouseY;

            // Rotate points in 3D space
            const cosY = Math.cos(currentAngleY);
            const sinY = Math.sin(currentAngleY);
            const cosX = Math.cos(currentAngleX);
            const sinX = Math.sin(currentAngleX);

            const rotatedPoints = points.map((p, idx) => {
                // Breathing effect
                const offset = Math.sin(Date.now() * 0.0015 + p.phase) * 3;
                const r = radius + offset;

                // Normalise coordinates
                let x = (p.x / radius) * r;
                let y = (p.y / radius) * r;
                let z = (p.z / radius) * r;

                // Rotate around Y axis
                let x1 = x * cosY - z * sinY;
                let z1 = x * sinY + z * cosY;

                // Rotate around X axis
                let y2 = y * cosX - z1 * sinX;
                let z2 = y * sinX + z1 * cosX;

                // Perspective projection factor
                const fov = 300;
                const scale = fov / (fov + z2);
                const projX = cx + x1 * scale;
                const projY = cy + y2 * scale;

                return { x: projX, y: projY, z: z2, scale: scale, index: idx };
            });

            // Draw connecting wireframe lines (only close neighbors)
            ctx.lineWidth = 0.8;
            for (let i = 0; i < numPoints; i++) {
                for (let j = i + 1; j < numPoints; j++) {
                    const p1 = rotatedPoints[i];
                    const p2 = rotatedPoints[j];
                    const distSq = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);

                    // Draw line if points are close in screen space
                    if (distSq < 3500) {
                        const alpha = (1 - Math.sqrt(distSq) / 60) * 0.16;
                        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw data packets traveling on lines
            packets.forEach(p => {
                p.progress += p.speed;
                if (p.progress >= 1) {
                    p.progress = 0;
                    p.fromIdx = p.toIdx;
                    p.toIdx = Math.floor(Math.random() * numPoints);
                }

                const p1 = rotatedPoints[p.fromIdx];
                const p2 = rotatedPoints[p.toIdx];

                const px = p1.x + (p2.x - p1.x) * p.progress;
                const py = p1.y + (p2.y - p1.y) * p.progress;
                const pz = p1.z + (p2.z - p1.z) * p.progress;

                // Size of packet relative to depth
                const pScale = 300 / (300 + pz);

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(px, py, 2.5 * pScale, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw nodes
            rotatedPoints.forEach(p => {
                // Color depth based on z value
                const opacity = Math.max(0.1, 1 - (p.z + radius) / (radius * 2));
                ctx.fillStyle = `rgba(20, 184, 166, ${opacity * 0.75})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
                ctx.fill();

                if (p.index % 8 === 0) {
                    ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            // Soft core ambient lighting (radial glow)
            const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius + 20);
            gradient.addColorStop(0, 'rgba(45, 212, 191, 0.05)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(cx, cy, radius + 30, 0, Math.PI * 2);
            ctx.fill();

            // Incremental rotation speed
            angleY += 0.002;
            angleX += 0.001;

            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            canvas.removeEventListener('mousemove', handleMouseMove);
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

export default AboutHeroAnimation;
