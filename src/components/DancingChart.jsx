import React from 'react';

/**
 * DancingChart — small live-animated chart widget used on the Services page.
 * Pure CSS/SVG animation, no external deps. Variants:
 *   - "bars"   → 6 dancing vertical bars (account performance)
 *   - "donut"  → animated arc + percentage (verified contacts)
 *   - "line"   → drawing line + bars (demand generation pipeline)
 *   - "pulse"  → audience activity blips (event intelligence)
 */
export default function DancingChart({ variant = 'bars', label }) {
    const renderBody = () => {
        switch (variant) {
            case 'donut':
                return <DonutChart />;
            case 'line':
                return <LineChart />;
            case 'pulse':
                return <PulseChart />;
            case 'bars':
            default:
                return <BarsChart />;
        }
    };

    return (
        <div className="dc-card">
            <div className="dc-header">
                <span className="dc-dot dc-dot-r" />
                <span className="dc-dot dc-dot-y" />
                <span className="dc-dot dc-dot-g" />
                <span className="dc-title">{label || 'LIVE'}</span>
                <span className="dc-live-pill">
                    <span className="dc-live-blip" /> Live
                </span>
            </div>
            <div className="dc-body">{renderBody()}</div>
        </div>
    );
}

/* ------------ Variant 1: dancing bars ------------ */
function BarsChart() {
    const bars = [55, 80, 42, 90, 65, 75];
    return (
        <div className="dc-bars">
            {bars.map((h, i) => (
                <div className="dc-bar-col" key={i}>
                    <div
                        className="dc-bar"
                        style={{
                            ['--h']: `${h}%`,
                            animationDelay: `${i * 0.18}s`,
                        }}
                    />
                </div>
            ))}
            <div className="dc-axis" />
        </div>
    );
}

/* ------------ Variant 2: animated donut + counter ------------ */
function DonutChart() {
    const circumference = 2 * Math.PI * 42;
    return (
        <div className="dc-donut-wrap">
            <svg className="dc-donut" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="dc-donut-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0d7377" />
                        <stop offset="60%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#5eead4" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e0f5f1" strokeWidth="8" />
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#dc-donut-grad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    transform="rotate(-90 50 50)"
                    className="dc-donut-arc"
                />
            </svg>
            <div className="dc-donut-text">
                <span className="dc-donut-num">98%</span>
                <span className="dc-donut-label">Verified</span>
            </div>
            <div className="dc-mini-bars">
                <span style={{ ['--h']: '50%' }} />
                <span style={{ ['--h']: '70%' }} />
                <span style={{ ['--h']: '40%' }} />
                <span style={{ ['--h']: '85%' }} />
                <span style={{ ['--h']: '60%' }} />
            </div>
        </div>
    );
}

/* ------------ Variant 3: line chart + columns ------------ */
function LineChart() {
    return (
        <div className="dc-line-wrap">
            <svg viewBox="0 0 220 110" className="dc-line-svg" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="dc-line-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0d7377" />
                        <stop offset="50%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                    <linearGradient id="dc-area-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(20,184,166,0.35)" />
                        <stop offset="100%" stopColor="rgba(20,184,166,0)" />
                    </linearGradient>
                </defs>
                {/* gridlines */}
                <line x1="0" y1="30" x2="220" y2="30" stroke="rgba(13,115,119,0.08)" />
                <line x1="0" y1="60" x2="220" y2="60" stroke="rgba(13,115,119,0.08)" />
                <line x1="0" y1="90" x2="220" y2="90" stroke="rgba(13,115,119,0.08)" />
                {/* area fill */}
                <path
                    d="M0,85 L20,70 L40,75 L60,55 L80,60 L100,40 L120,50 L140,30 L160,35 L180,20 L200,28 L220,15 L220,110 L0,110 Z"
                    fill="url(#dc-area-grad)"
                    className="dc-line-area"
                />
                {/* main line */}
                <path
                    d="M0,85 L20,70 L40,75 L60,55 L80,60 L100,40 L120,50 L140,30 L160,35 L180,20 L200,28 L220,15"
                    fill="none"
                    stroke="url(#dc-line-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dc-line-path"
                />
                {/* moving dot */}
                <circle r="5" fill="#14b8a6" className="dc-line-dot">
                    <animateMotion
                        dur="3.5s"
                        repeatCount="indefinite"
                        path="M0,85 L20,70 L40,75 L60,55 L80,60 L100,40 L120,50 L140,30 L160,35 L180,20 L200,28 L220,15"
                    />
                </circle>
            </svg>
            <div className="dc-line-stats">
                <span><b>+38%</b> MQL</span>
                <span><b>2.4k</b> reached</span>
            </div>
        </div>
    );
}

/* ------------ Variant 4: pulse / activity blips ------------ */
function PulseChart() {
    return (
        <div className="dc-pulse-wrap">
            <div className="dc-pulse-row">
                {Array.from({ length: 18 }).map((_, i) => (
                    <span
                        key={i}
                        className="dc-pulse-bar"
                        style={{
                            ['--h']: `${30 + Math.round(Math.sin(i * 0.9) * 25 + Math.random() * 30)}%`,
                            animationDelay: `${i * 0.08}s`,
                        }}
                    />
                ))}
            </div>
            <div className="dc-pulse-meta">
                <div className="dc-pulse-num">
                    <span className="dc-pulse-count">1,284</span>
                    <span className="dc-pulse-label">Attendees</span>
                </div>
                <div className="dc-pulse-trend">
                    <svg width="48" height="24" viewBox="0 0 48 24">
                        <path
                            d="M2 18 L12 14 L20 8 L30 12 L40 4 L46 2"
                            fill="none"
                            stroke="#14b8a6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>+12%</span>
                </div>
            </div>
        </div>
    );
}
