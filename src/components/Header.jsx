import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo2 from '../assets/img/logo/header-logo2.png';

const servicesMenu = [
    {
        label: 'Data Enrichment Services',
        to: '/data-enrichment',
        icon: '🗃️',
        desc: 'Enhance CRM & marketing databases with accurate, updated data',
    },
    {
        label: 'Appointment Setting',
        to: '/appointment-setting',
        icon: '📅',
        desc: 'Connect your sales team with qualified decision-makers',
    },
    {
        label: 'Intent Data Solutions',
        to: '/intent-data',
        icon: '🎯',
        desc: 'Identify in-market buyers before your competitors do',
    },
    {
        label: 'B2B Lead Generation',
        to: '/b2b-lead-generation',
        icon: '🚀',
        desc: 'Generate qualified business leads at scale',
    },
    {
        label: 'Demand Generation',
        to: '/demand-generation',
        icon: '📈',
        desc: 'Build awareness and drive sustainable revenue pipeline',
    },
    {
        label: 'Exhibitors Data',
        to: '/exhibitors-data',
        icon: '🏛️',
        desc: 'Target exhibitors & attendees at industry events',
    },
];

const industriesMenu = [
    {
        label: 'Finance',
        to: '/industries/finance',
        icon: '🏦',
        desc: 'Financial organizations and institutions',
    },
    {
        label: 'Manufacturing',
        to: '/industries/manufacturing',
        icon: '🏭',
        desc: 'Industrial and manufacturing businesses',
    },
    {
        label: 'SaaS',
        to: '/industries/saas',
        icon: '☁️',
        desc: 'Software as a Service providers',
    },
    {
        label: 'Healthcare',
        to: '/industries/healthcare',
        icon: '🏥',
        desc: 'Healthcare technology and services',
    },
    {
        label: 'Technology',
        to: '/industries/technology',
        icon: '💻',
        desc: 'Technology vendors and IT services',
    },
    {
        label: 'Technographic Data',
        to: '/technographic-data',
        icon: '📊',
        desc: 'Technology stack insights for B2B prospecting',
    },
];

const Header = () => {
    const [isSticky, setIsSticky]                       = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen]       = useState(false);
    const [isServicesOpen, setIsServicesOpen]           = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, notchOffset: '50%' });

    const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
    const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
    const [indDropdownPos, setIndDropdownPos] = useState({ top: 0, left: 0, notchOffset: '50%' });

    const triggerRef  = useRef(null);
    const dropdownRef = useRef(null);
    const indTriggerRef = useRef(null);
    const indDropdownRef = useRef(null);

    /* ── Sticky ── */
    useEffect(() => {
        const onScroll = () => setIsSticky(window.scrollY > 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Position calculator — clamps to viewport ── */
    const PANEL_W  = 720;
    const MARGIN   = 16;

    const recalc = useCallback(() => {
        if (!triggerRef.current) return;
        const r  = triggerRef.current.getBoundingClientRect();
        const vw = window.innerWidth;

        // Ideal centre = middle of the trigger
        const idealLeft = r.left + r.width / 2;

        // Clamp so the panel stays within the viewport
        const minLeft = PANEL_W / 2 + MARGIN;
        const maxLeft = vw - PANEL_W / 2 - MARGIN;
        const clampedLeft = Math.min(Math.max(idealLeft, minLeft), maxLeft);

        // Notch offset = where the trigger centre falls relative to the panel
        const notchPct = ((idealLeft - clampedLeft) / PANEL_W + 0.5) * 100;
        const notchOffset = `${Math.min(Math.max(notchPct, 10), 90)}%`;

        setDropdownPos({ top: r.bottom, left: clampedLeft, notchOffset });
    }, []);

    const recalcInd = useCallback(() => {
        if (!indTriggerRef.current) return;
        const r  = indTriggerRef.current.getBoundingClientRect();
        const vw = window.innerWidth;

        const idealLeft = r.left + r.width / 2;

        const minLeft = PANEL_W / 2 + MARGIN;
        const maxLeft = vw - PANEL_W / 2 - MARGIN;
        const clampedLeft = Math.min(Math.max(idealLeft, minLeft), maxLeft);

        const notchPct = ((idealLeft - clampedLeft) / PANEL_W + 0.5) * 100;
        const notchOffset = `${Math.min(Math.max(notchPct, 10), 90)}%`;

        setIndDropdownPos({ top: r.bottom, left: clampedLeft, notchOffset });
    }, []);

    /* ── Outside click ── */
    useEffect(() => {
        const handler = (e) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                triggerRef.current  && !triggerRef.current.contains(e.target)
            ) setIsServicesOpen(false);

            if (
                indDropdownRef.current && !indDropdownRef.current.contains(e.target) &&
                indTriggerRef.current  && !indTriggerRef.current.contains(e.target)
            ) setIsIndustriesOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* ── Re-position on scroll / resize ── */
    useEffect(() => {
        if (!isServicesOpen) return;
        const h = () => recalc();
        window.addEventListener('scroll', h, true);
        window.addEventListener('resize', h);
        return () => {
            window.removeEventListener('scroll', h, true);
            window.removeEventListener('resize', h);
        };
    }, [isServicesOpen, recalc]);

    useEffect(() => {
        if (!isIndustriesOpen) return;
        const h = () => recalcInd();
        window.addEventListener('scroll', h, true);
        window.addEventListener('resize', h);
        return () => {
            window.removeEventListener('scroll', h, true);
            window.removeEventListener('resize', h);
        };
    }, [isIndustriesOpen, recalcInd]);

    const openServices  = () => { recalc(); setIsServicesOpen(true); setIsIndustriesOpen(false); };
    const closeServices = () => setIsServicesOpen(false);
    
    const openIndustries  = () => { recalcInd(); setIsIndustriesOpen(true); setIsServicesOpen(false); };
    const closeIndustries = () => setIsIndustriesOpen(false);

    const toggleMobile  = () => { setIsMobileMenuOpen(p => !p); setIsMobileServicesOpen(false); setIsMobileIndustriesOpen(false); };

    return (
        <>
        <header>
            {/* ── Desktop ── */}
            <div
                className={`header-area header-area2 header-area-all d-none d-lg-block ${isSticky ? 'sticky-glass-nav' : ''}`}
                id="header"
            >
                <div className="container">
                    <div className="row"><div className="col-12">
                        <div className="header-elements">
                            <div className="site-logo home1-site-logo">
                                <Link to="/" aria-label="Go to Home Page">
                                    <img className="img-fluid" src={logo2} alt="Data Marketics Logo" />
                                </Link>
                            </div>

                            <nav className="main-menu-ex main-menu-ex1" aria-label="Main Navigation">
                                <ul>
                                    <li><NavLink to="/" end>Home</NavLink></li>
                                    <li><NavLink to="/about-us">About Us</NavLink></li>
                                    <li><NavLink to="/features">Features</NavLink></li>

                                    {/* Services trigger */}
                                    <li
                                        ref={triggerRef}
                                        className="dm-nav-dropdown-wrap"
                                        onMouseEnter={openServices}
                                        onMouseLeave={closeServices}
                                    >
                                        <NavLink
                                            to="/services"
                                            className={({ isActive }) => isActive ? 'active' : ''}
                                            onClick={closeServices}
                                            aria-haspopup="true"
                                            aria-expanded={isServicesOpen}
                                        >
                                            Services
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center',
                                                marginLeft: 4, verticalAlign: 'middle',
                                                transition: 'transform .3s',
                                                transform: isServicesOpen ? 'rotate(180deg)' : 'none',
                                            }}>
                                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2.2"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                        </NavLink>
                                    </li>

                                    {/* Industries trigger */}
                                    <li
                                        ref={indTriggerRef}
                                        className="dm-nav-dropdown-wrap"
                                        onMouseEnter={openIndustries}
                                        onMouseLeave={closeIndustries}
                                    >
                                        <span
                                            className="nav-link"
                                            style={{ cursor: 'pointer', padding: '10px 16px', fontWeight: 600, color: 'var(--dm-ink)' }}
                                            aria-haspopup="true"
                                            aria-expanded={isIndustriesOpen}
                                        >
                                            Industries
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center',
                                                marginLeft: 4, verticalAlign: 'middle',
                                                transition: 'transform .3s',
                                                transform: isIndustriesOpen ? 'rotate(180deg)' : 'none',
                                            }}>
                                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2.2"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                        </span>
                                    </li>

                                    <li><NavLink to="/blog">Blog</NavLink></li>
                                </ul>
                            </nav>

                            <div className="header2-buttons">
                                <Link to="/contact" className="theme-btn2" aria-label="Contact Us">Contact Us</Link>
                            </div>
                        </div>
                    </div></div>
                </div>
            </div>

            {/* ── Mobile Header ── */}
            <div
                className={`mobile-header-area d-lg-none ${isSticky ? 'sticky' : ''}`}
                style={isSticky ? {
                    position: 'fixed', top: 0, width: '100%', zIndex: 1000,
                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(45,212,191,0.18)',
                    boxShadow: '0 4px 20px rgba(13,115,119,0.06)',
                } : {}}
            >
                <div className="container"><div className="col-12">
                    <div className="mobile-header-elements">
                        <div className="mobile-logo">
                            <Link to="/"><img src={logo2} alt="Logo" width="150" /></Link>
                        </div>
                        <div className="mobile-nav-icon" onClick={toggleMobile} aria-label="Toggle menu">
                            {isMobileMenuOpen
                                ? <i className="fa-solid fa-xmark"></i>
                                : <span className="dm-vdots" aria-hidden="true">
                                    <span className="dm-vdot"></span>
                                    <span className="dm-vdot"></span>
                                    <span className="dm-vdot"></span>
                                  </span>
                            }
                        </div>
                    </div>
                </div></div>
            </div>

            {/* ── Mobile Sidebar ── */}
            <div className={`mobile-sidebar d-lg-none ${isMobileMenuOpen ? 'mobile-menu-active active' : ''}`}>
                <div className="menu-close" onClick={toggleMobile}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="mobile-nav">
                    <ul>
                        <li><NavLink to="/"           end onClick={toggleMobile}>Home</NavLink></li>
                        <li><NavLink to="/about-us"       onClick={toggleMobile}>About Us</NavLink></li>
                        <li><NavLink to="/features"       onClick={toggleMobile}>Features</NavLink></li>

                        <li className="dm-mobile-dropdown">
                            <button
                                className="dm-mobile-dropdown-trigger"
                                onClick={() => setIsMobileServicesOpen(p => !p)}
                            >
                                <span style={{ flex: 1, textAlign: 'left', fontWeight: 600 }}>Services</span>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    transition: 'transform .3s',
                                    transform: isMobileServicesOpen ? 'rotate(180deg)' : 'none',
                                    color: 'var(--dm-teal-600)',
                                }}>
                                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                            <ul className={`dm-mobile-sub ${isMobileServicesOpen ? 'dm-mobile-sub-open' : ''}`}>
                                                <li><NavLink to="/services" onClick={toggleMobile}>All Services</NavLink></li>
                                {servicesMenu.map(item => (
                                    <li key={item.label}>
                                        <NavLink to={item.to} onClick={toggleMobile}>
                                            {item.icon} {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="dm-mobile-dropdown">
                            <button
                                className="dm-mobile-dropdown-trigger"
                                onClick={() => setIsMobileIndustriesOpen(p => !p)}
                            >
                                <span style={{ flex: 1, textAlign: 'left', fontWeight: 600 }}>Industries</span>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    transition: 'transform .3s',
                                    transform: isMobileIndustriesOpen ? 'rotate(180deg)' : 'none',
                                    color: 'var(--dm-teal-600)',
                                }}>
                                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                            <ul className={`dm-mobile-sub ${isMobileIndustriesOpen ? 'dm-mobile-sub-open' : ''}`}>
                                {industriesMenu.map(item => (
                                    <li key={item.label}>
                                        <NavLink to={item.to} onClick={toggleMobile}>
                                            {item.icon} {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li><NavLink to="/blog"            onClick={toggleMobile}>Blog</NavLink></li>
                        <li><NavLink to="/contact"         onClick={toggleMobile}>Contact Us</NavLink></li>
                    </ul>
                </div>
            </div>
            {isMobileMenuOpen && <div className="menu-overlay d-lg-none" onClick={toggleMobile}></div>}
        </header>

        {/* ── Mega Dropdown — fixed-position so it escapes nav overflow clipping ── */}
        {isServicesOpen && (
            <div
                ref={dropdownRef}
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
                className="dm-mega-dropdown"
                style={{ top: dropdownPos.top, left: dropdownPos.left }}
                role="menu"
            >
                {/* Transparent bridge — fills the gap between the nav bar and the panel */}
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: 0,
                    right: 0,
                    height: '12px',
                    background: 'transparent',
                }} aria-hidden="true" />

                {/* Notch — points at the Services trigger */}
                <div className="dm-mega-notch" aria-hidden="true"
                    style={{ left: dropdownPos.notchOffset }} />

                <div className="dm-mega-inner">
                    {/* ── Left branded panel ── */}
                    <div className="dm-mega-left">
                        <div className="dm-mega-left-badge">OUR SERVICES</div>
                        <h3 className="dm-mega-left-title">
                            Transform Your<br/>B2B Marketing<br/>with Intelligence
                        </h3>
                        <p className="dm-mega-left-sub">
                            Accurate data. Qualified leads. Measurable growth.
                        </p>
                        <Link
                            to="/contact"
                            className="dm-mega-left-cta"
                            onClick={closeServices}
                        >
                            Get a Free Quote
                        </Link>
                        <div className="dm-mega-left-stats">
                            <div className="dm-mega-stat">
                                <span className="dm-mega-stat-num">95%</span>
                                <span className="dm-mega-stat-lbl">Data Accuracy</span>
                            </div>
                            <div className="dm-mega-stat-div" />
                            <div className="dm-mega-stat">
                                <span className="dm-mega-stat-num">6+</span>
                                <span className="dm-mega-stat-lbl">Years Experience</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Right services grid ── */}
                    <div className="dm-mega-right">
                        <div className="dm-mega-right-header">
                            <span className="dm-mega-right-label">All Services</span>
                        </div>
                        <ul className="dm-mega-list" role="none">
                            {servicesMenu.map(item => (
                                <li key={item.label} role="none">
                                    <NavLink
                                        to={item.to}
                                        role="menuitem"
                                        onClick={closeServices}
                                        className={({ isActive }) =>
                                            `dm-mega-item ${isActive ? 'dm-mega-item-active' : ''}`
                                        }
                                    >
                                        <span className="dm-mega-item-icon">{item.icon}</span>
                                        <span className="dm-mega-item-body">
                                            <span className="dm-mega-item-title">{item.label}</span>
                                            <span className="dm-mega-item-desc">{item.desc}</span>
                                        </span>
                                        <span className="dm-mega-item-arrow">›</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}

        {/* ── Industries Dropdown ── */}
        {isIndustriesOpen && (
            <div
                ref={indDropdownRef}
                onMouseEnter={openIndustries}
                onMouseLeave={closeIndustries}
                className="dm-mega-dropdown"
                style={{ top: indDropdownPos.top, left: indDropdownPos.left }}
                role="menu"
            >
                {/* Transparent bridge */}
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: 0,
                    right: 0,
                    height: '12px',
                    background: 'transparent',
                }} aria-hidden="true" />

                {/* Notch */}
                <div className="dm-mega-notch" aria-hidden="true"
                    style={{ left: indDropdownPos.notchOffset }} />

                <div className="dm-mega-inner">
                    {/* ── Left branded panel ── */}
                    <div className="dm-mega-left">
                        <div className="dm-mega-left-badge">INDUSTRIES</div>
                        <h3 className="dm-mega-left-title">
                            Tailored Solutions<br/>for Your<br/>Sector
                        </h3>
                        <p className="dm-mega-left-sub">
                            Targeted campaigns. Verified data. Faster growth.
                        </p>
                        <Link
                            to="/contact"
                            className="dm-mega-left-cta"
                            onClick={closeIndustries}
                        >
                            Find Your Audience
                        </Link>
                        <div className="dm-mega-left-stats">
                            <div className="dm-mega-stat">
                                <span className="dm-mega-stat-num">10+</span>
                                <span className="dm-mega-stat-lbl">Supported Sectors</span>
                            </div>
                            <div className="dm-mega-stat-div" />
                            <div className="dm-mega-stat">
                                <span className="dm-mega-stat-num">100%</span>
                                <span className="dm-mega-stat-lbl">Customized Strategy</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Right industries grid ── */}
                    <div className="dm-mega-right">
                        <div className="dm-mega-right-header">
                            <span className="dm-mega-right-label">All Industries</span>
                        </div>
                        <ul className="dm-mega-list" role="none">
                            {industriesMenu.map(item => (
                                <li key={item.label} role="none">
                                    <NavLink
                                        to={item.to}
                                        role="menuitem"
                                        onClick={closeIndustries}
                                        className={({ isActive }) =>
                                            `dm-mega-item ${isActive ? 'dm-mega-item-active' : ''}`
                                        }
                                    >
                                        <span className="dm-mega-item-icon">{item.icon}</span>
                                        <span className="dm-mega-item-body">
                                            <span className="dm-mega-item-title">{item.label}</span>
                                            <span className="dm-mega-item-desc">{item.desc}</span>
                                        </span>
                                        <span className="dm-mega-item-arrow">›</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Header;
