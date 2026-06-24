import React, { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Create particles on a 3D sphere
        const particleCount = 110;
        const particles = [];
        // Dynamically adjust sphere size based on viewport
        let radius = Math.min(width, height) * 0.32;

        for (let i = 0; i < particleCount; i++) {
            // Uniform distribution on a sphere surface
            const theta = Math.acos(Math.random() * 2 - 1);
            const phi = Math.random() * Math.PI * 2;

            particles.push({
                x: radius * Math.sin(theta) * Math.cos(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(theta),
                // Color scheme nodes (Teal / Mint / Cyan)
                color: Math.random() > 0.4 ? '#14b8a6' : (Math.random() > 0.5 ? '#2dd4bf' : '#0d7377'),
                size: Math.random() * 2.2 + 1.2
            });
        }

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            radius = Math.min(width, height) * 0.32;
        };

        const handleMouseMove = (e) => {
            // Center is (0,0), range from -1 to 1
            mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Rotation angles increment per frame
        let angleX = 0.0008;
        let angleY = 0.0018;

        const animate = () => {
            // Damped tracking of mouse for smooth floaty dynamics
            mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
            mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

            ctx.clearRect(0, 0, width, height);

            // Ambient background gradient
            const bgGrad = ctx.createRadialGradient(
                width / 2 + mouseRef.current.x * 150,
                height / 2 + mouseRef.current.y * 150,
                50,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.95
            );
            // Light, luxurious tech gradient
            bgGrad.addColorStop(0, '#f0fdf4');
            bgGrad.addColorStop(0.4, '#f0fdfa');
            bgGrad.addColorStop(0.8, '#ecfdf5');
            bgGrad.addColorStop(1, '#ccfbf1');

            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            // Draw clean background dot-grid pattern representing business data matrix
            ctx.fillStyle = 'rgba(20, 184, 166, 0.045)';
            const gridSpacing = 48;
            for (let x = 0; x < width; x += gridSpacing) {
                for (let y = 0; y < height; y += gridSpacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, 0.85, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Adjust rotation speeds relative to mouse offsets
            const currentAngleX = angleX + mouseRef.current.y * 0.0015;
            const currentAngleY = angleY + mouseRef.current.x * 0.0015;

            const cosX = Math.cos(currentAngleX);
            const sinX = Math.sin(currentAngleX);
            const cosY = Math.cos(currentAngleY);
            const sinY = Math.sin(currentAngleY);

            const projected = [];

            // Project 3D points
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Y rotation
                let x1 = p.x * cosY - p.z * sinY;
                let z1 = p.x * sinY + p.z * cosY;

                // X rotation
                let y2 = p.y * cosX - z1 * sinX;
                let z2 = p.y * sinX + z1 * cosX;

                // Mutate original point to rotate the actual geometry space
                p.x = x1;
                p.y = y2;
                p.z = z2;

                const fov = 650;
                const cameraDist = 700;
                const scale = fov / (fov + z2 + cameraDist);

                // Add parallax offset
                const sx = x1 * scale + width / 2 + mouseRef.current.x * 35;
                const sy = y2 * scale + height / 2 + mouseRef.current.y * 35;

                projected.push({
                    x: sx,
                    y: sy,
                    z: z2,
                    color: p.color,
                    size: p.size * scale * 1.6,
                });
            }

            // Draw constellation lines between close nodes in 3D
            ctx.lineWidth = 0.75;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dz = p1.z - p2.z;
                    const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    // If nodes are within network range, draw active connection line
                    if (dist3d < 165) {
                        const proj1 = projected[i];
                        const proj2 = projected[j];

                        // Calculate fade based on depth (Z) and distance
                        const depthFactor = (proj1.z + proj2.z + 2 * radius) / (4 * radius);
                        const opacity = (1 - dist3d / 165) * 0.12 * Math.max(depthFactor, 0.15);

                        if (opacity > 0) {
                            ctx.strokeStyle = `rgba(13, 115, 119, ${opacity})`;
                            ctx.beginPath();
                            ctx.moveTo(proj1.x, proj1.y);
                            ctx.lineTo(proj2.x, proj2.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Sort projected points by depth to render background particles first (Painter's algorithm)
            const sortedIndices = Array.from({ length: projected.length }, (_, i) => i)
                .sort((a, b) => projected[b].z - projected[a].z);

            // Draw particles with glowing layer on close ones
            for (let i = 0; i < sortedIndices.length; i++) {
                const idx = sortedIndices[i];
                const p = projected[idx];

                // Calculate opacity based on Z depth position
                const alpha = Math.min(Math.max((p.z + radius) / (2 * radius) * 0.8 + 0.15, 0.12), 0.95);

                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(p.size, 0.6), 0, Math.PI * 2);

                // Add drop shadows/glow on foreground particles
                if (p.z > 0) {
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 6 * (p.z / radius);
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fillStyle = p.color;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1.0;
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="threed-background-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -5,
                pointerEvents: 'none',
                background: 'transparent',
            }}
        />
    );
};

export default ThreeDBackground;
