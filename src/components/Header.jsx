import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/img/logo/header-logo2.png';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header>
            <div className={`header-area header-area2 header-area-all d-none d-lg-block ${isSticky ? 'sticky' : ''}`} id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="site-logo home1-site-logo">
                                    <Link to="/" aria-label="Go to Home Page">
                                        <img className="img-fluid" src={logo2} alt="Data Marketics Logo" />
                                    </Link>
                                </div>
                                <nav className="main-menu-ex main-menu-ex1" aria-label="Main Navigation">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/features">Features</Link></li>
                                        <li><Link to="/services">Services</Link></li>
                                        <li><Link to="/demand-generation">Demand Generation</Link></li>
                                        <li><Link to="/exhibitors-data">Exhibitors Data</Link></li>
                                    </ul>
                                </nav>
                                <div className="header2-buttons">
                                    <Link to="/contact" className="theme-btn2" aria-label="Contact Us">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className={`mobile-header-area d-lg-none ${isSticky ? 'sticky' : ''}`}>
                <div className="container">
                    <div className="col-12">
                        <div className="mobile-header-elements">
                            <div className="mobile-logo">
                                <Link to="/"><img src={logo2} alt="Logo" width="150" /></Link>
                            </div>
                            <div className="mobile-nav-icon" onClick={toggleMobileMenu}>
                                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`mobile-sidebar ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
                <div className="menu-close" onClick={toggleMobileMenu}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="mobile-nav">
                    <ul>
                        <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMobileMenu}>About Us</Link></li>
                        <li><Link to="/features" onClick={toggleMobileMenu}>Features</Link></li>
                        <li><Link to="/services" onClick={toggleMobileMenu}>Services</Link></li>
                        <li><Link to="/demand-generation" onClick={toggleMobileMenu}>Demand Generation</Link></li>
                        <li><Link to="/exhibitors-data" onClick={toggleMobileMenu}>Exhibitors Data</Link></li>
                        <li><Link to="/contact" onClick={toggleMobileMenu}>Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            {isMobileMenuOpen && <div className="menu-overlay" onClick={toggleMobileMenu}></div>}
        </header>
    );
};

export default Header;
