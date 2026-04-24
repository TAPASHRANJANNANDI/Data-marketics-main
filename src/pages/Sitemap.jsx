import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
    const links = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Features', path: '/features' },
        { name: 'Services', path: '/services' },
        { name: 'Demand Generation', path: '/demand-generation' },
        { name: 'Exhibitors Data', path: '/exhibitors-data' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
    ];

    return (
        <div className="testimonial-page sp">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 m-auto text-center">
                        <div className="common-main-headding">
                            <h1>Site Map</h1>
                        </div>
                    </div>
                </div>
                <div className="space60"></div>
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="sitemap-list mt-4">
                            <ul className="list-unstyled">
                                {links.map((link, index) => (
                                    <li key={index} className="mb-3">
                                        <Link to={link.path} className="h5 text-dark text-decoration-none">
                                            <i className="fa-solid fa-arrow-right-long me-2"></i> {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="space60"></div>
            </div>
        </div>
    );
};

export default Sitemap;
