import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DESKTOP_MIN_WIDTH = 992;
const SESSION_KEY = 'splash-screen-seen';
const SAFETY_TIMEOUT_MS = 9000;

export default function SplashScreen() {
    const location = useLocation();
    const videoRef = useRef(null);

    const [visible, setVisible] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (location.pathname !== '/') return false;
        if (window.innerWidth < DESKTOP_MIN_WIDTH) return false;
        if (sessionStorage.getItem(SESSION_KEY) === '1') return false;
        return true;
    });
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (!visible) return;

        document.body.style.overflow = 'hidden';

        sessionStorage.setItem(SESSION_KEY, '1');
        const startFade = () => {
            setFading(true);
            setTimeout(() => setVisible(false), 550);
        };

        const timer = setTimeout(startFade, SAFETY_TIMEOUT_MS);

        const v = videoRef.current;
        if (v) {
            const onEnded = () => startFade();
            v.addEventListener('ended', onEnded);
            const playPromise = v.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => startFade());
            }
            return () => {
                clearTimeout(timer);
                v.removeEventListener('ended', onEnded);
                document.body.style.overflow = '';
            };
        }

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, [visible]);

    if (!visible) return null;

    const handleSkip = () => {
        setFading(true);
        setTimeout(() => setVisible(false), 300);
    };

    return (
        <div
            role="presentation"
            className="dm-splash"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2147483000,
                background: '#0b2727',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                pointerEvents: fading ? 'none' : 'auto'
            }}
        >
            <video
                ref={videoRef}
                src="/datamarketics-intro.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                }}
            />
            <button
                type="button"
                onClick={handleSkip}
                aria-label="Skip intro"
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    padding: '10px 20px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    fontFamily: "'Figtree', 'IBM Plex Sans', -apple-system, sans-serif"
                }}
            >
                Skip intro →
            </button>
        </div>
    );
}
