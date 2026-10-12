import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/img/logo/header-logo2.png';
import footerIcon1 from '../assets/img/icons/footer-icon1.png';
import footerIcon2 from '../assets/img/icons/footer-icon2.png';
import footerIcon3 from '../assets/img/icons/footer-icon3.png';
import SocialLinks from './SocialLinks';
// import footerShape1 from '../assets/img/shapes/footer2-shape.png';
// import footerShape2 from '../assets/img/shapes/footer2-shape2.png';

const Footer = () => {
    return (
        <div className="footer2 _relative">
            <div className="container">
                <div className="row">
                    <div className="footer-icon-box-all">
                        <div className="footer-icon-box">
                            <div className="icon">
                                <img className="img-fluid" src={footerIcon1} alt="Pipeline icon" loading="lazy" width="48" height="48" />
                            </div>
                            <div className="headding">
                                <p>Fuel pipelines with verified contacts.</p>
                            </div>
                        </div>
                        <div className="footer-icon-box">
                            <div className="icon">
                                <img className="img-fluid" src={footerIcon2} alt="Network icon" loading="lazy" width="48" height="48" />
                            </div>
                            <div className="headding">
                                <p>Expand networks through data solutions</p>
                            </div>
                        </div>
                        <div className="footer-icon-box">
                            <div className="icon">
                                <img className="img-fluid" src={footerIcon3} alt="Campaign icon" loading="lazy" width="48" height="48" />
                            </div>
                            <div className="headding">
                                <p>Boost outreach with effective campaigns</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space50"></div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="single-footer-items">
                            <h3>Data Marketics</h3>
                            <p>Data Marketics is a leading provider of data-driven marketing solutions. Founded six years ago, we have been on a journey to help businesses increase sales and expand their customer base by providing them with accurate and up-to-date data.</p>
                            <SocialLinks variant="footer" />
                        </div>
                    </div>
                    <div className="col-lg col-md-6 col-6">
                        <div className="single-footer-items">
                            <h3>Company</h3>
                            <ul className="menu-list">
                                <li><Link to="/about-us">About us</Link></li>
                                <li><Link to="/features">Features</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg col-md-6 col-6">
                        <div className="single-footer-items">
                            <h3>Resources</h3>
                            <ul className="menu-list">
                                <li><Link to="/services">Our Services</Link></li>
                                <li><Link to="/about-us">Why Choose Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="space40"></div>
                <div className="copyright-area">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <div className="logo">
                                <Link to="/">
                                    <img className="img-fluid" src={logo2} alt="Data Marketics Logo" loading="lazy" width="120" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="coppyright text-md-right text-center">
                                <span className="copy-text">© 2026</span>
                                <Link to="/">Data Marketics</Link>
                                <span className="copy-sep" aria-hidden="true">•</span>
                                <Link to="/privacy-policy">Privacy Policy</Link>
                                <span className="copy-sep" aria-hidden="true">•</span>
                                <a href="https://datamarketics.com/sitemap.xml">Sitemap</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <img className="footer-shape" src={footerShape1} alt="Decorative Shape" loading="lazy" /> */}
            {/* <img className="footer-shape2" src={footerShape2} alt="Decorative Shape" loading="lazy" /> */}
        </div>
    );
};

export default Footer;
