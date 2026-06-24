import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TiltCard = ({ children, className = '', maxRotate = 10 }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic motion values for X and Y rotations
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Smooth springs to damp transitions
    const springRotateX = useSpring(rotateX, { damping: 22, stiffness: 180 });
    const springRotateY = useSpring(rotateY, { damping: 22, stiffness: 180 });

    // Track spotlight relative coordinates
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Relative cursor position on the card surface
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalise rotation based on hover offset
        const rY = ((mouseX / width) - 0.5) * maxRotate;
        const rX = (((mouseY / height) - 0.5) * -maxRotate);

        if (window.innerWidth >= 992) {
            rotateX.set(rX);
            rotateY.set(rY);
            setSpotlightPos({ x: mouseX, y: mouseY });
        }
    };

    const handleMouseEnter = () => {
        if (window.innerWidth >= 992) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset coordinates on leave to bring it back to center
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`tilt-card-container ${className}`}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                position: 'relative',
                display: 'block',
                width: '100%',
                height: '100%'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: 'preserve-3d',
                    height: '100%',
                    width: '100%'
                }}
                className="tilt-card-inner"
            >
                {children}

                {/* Ambient spotlight overlay */}
                {isHovered && (
                    <div
                        className="tilt-card-spotlight"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            borderRadius: 'inherit',
                            zIndex: 5,
                            background: `radial-gradient(circle 220px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(45, 212, 191, 0.15) 0%, rgba(45, 212, 191, 0) 100%)`,
                            mixBlendMode: 'screen',
                            transition: 'opacity 0.25s ease'
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export default TiltCard;
