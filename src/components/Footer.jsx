import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/img/logo/header-logo2.png';
import footerIcon1 from '../assets/img/icons/footer-icon1.png';
import footerIcon2 from '../assets/img/icons/footer-icon2.png';
import footerIcon3 from '../assets/img/icons/footer-icon3.png';
import SocialLinks from './SocialLinks';

// Every service and industry page is linked from here. The footer is on all
// pages, so it is what gives the deeper pages the internal links a crawler
// needs to find and rank them — previously only five pages were reachable
// from the footer.
const SERVICE_LINKS = [
    { to: '/b2b-lead-generation', label: 'B2B Lead Generation' },
    { to: '/demand-generation', label: 'Demand Generation' },
    { to: '/data-enrichment', label: 'Data Enrichment' },
    { to: '/intent-data', label: 'Intent Data' },
    { to: '/technographic-data', label: 'Technographic Data' },
    { to: '/appointment-setting', label: 'Appointment Setting' },
    { to: '/exhibitors-data', label: 'Exhibitors Data' },
];

const INDUSTRY_LINKS = [
    { to: '/industries/technology', label: 'Technology' },
    { to: '/industries/healthcare', label: 'Healthcare' },
    { to: '/industries/finance', label: 'Finance' },
    { to: '/industries/manufacturing', label: 'Manufacturing' },
    { to: '/industries/saas', label: 'SaaS' },
];

const COMPANY_LINKS = [
    { to: '/about-us', label: 'About Us' },
    { to: '/features', label: 'Features' },
    { to: '/services', label: 'Our Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/sitemap', label: 'Sitemap' },
];

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
                    <div className="col-lg-4 col-md-12">
                        <div className="single-footer-items">
                            <h3>Data Marketics</h3>
                            <p>Data Marketics is a leading provider of data-driven marketing solutions. Founded six years ago, we have been on a journey to help businesses increase sales and expand their customer base by providing them with accurate and up-to-date data.</p>

                            {/* Name, address, phone and email in plain text so they
                                match the Google Business Profile and directory
                                listings exactly. */}
                            <address className="footer-nap">
                                <p>
                                    100 Horizon Center Blvd,<br />
                                    Hamilton, NJ 08691, United States
                                </p>
                                <p>
                                    <a href="tel:+16093222666">+1 (609) 322-2666</a>
                                    <br />
                                    <a href="mailto:sales@datamarketics.com">sales@datamarketics.com</a>
                                </p>
                            </address>

                            <SocialLinks variant="footer" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="single-footer-items">
                            <h3>Services</h3>
                            <ul className="menu-list">
                                {SERVICE_LINKS.map(link => (
                                    <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6">
                        <div className="single-footer-items">
                            <h3>Industries</h3>
                            <ul className="menu-list">
                                {INDUSTRY_LINKS.map(link => (
                                    <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="single-footer-items">
                            <h3>Company</h3>
                            <ul className="menu-list">
                                {COMPANY_LINKS.map(link => (
                                    <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                                ))}
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
                                    <img className="img-fluid" src={logo2} alt="Data Marketics Logo" loading="lazy" width="120" height="34" />
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
                                <Link to="/sitemap">Sitemap</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
