import React, { useState, useEffect } from 'react';
import axios from 'axios';
import contactIcon1 from '../assets/img/icons/contact-page-icon1.png';
import contactIcon2 from '../assets/img/icons/contact-page-icon2.png';
import contactIcon3 from '../assets/img/icons/contact-page-icon3.png';
import { Helmet } from 'react-helmet';

const Contact = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        services: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (status && status !== 'Sending...') {
            const timer = setTimeout(() => {
                setStatus('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const baseUrl = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '');
            const response = await axios.post(`${baseUrl}/api/send-email`, formData);
            if (response.data.success) {
                setStatus('Message sent successfully!');
                setFormData({ first_name: '', email: '', phone: '', website: '', industry: '', services: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <Helmet>
                <meta name="title" content="Contact Data Marketics | B2B Data & Demand Generation Experts" />
                <meta name="description" content="Get in touch with Data Marketics for verified B2B contact data, account-based marketing lists, and demand generation solutions. Request a free consultation today." />
                <link rel="canonical" href="https://datamarketics.com/contact" />
            </Helmet>
            <div className="contact-page-area sp">

                <div className="container">

                    <div className="space60"></div>

                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10">
                            <h1 style={{ fontSize: '40px', lineHeight: '1.2', fontWeight: '700' }}>Contact Data Marketics – Let’s Grow Your Pipeline</h1>
                            <div className="space16"></div>
                            <p style={{ fontSize: '18px', color: '#555', maxWidth: '900px', margin: '0 auto 30px', lineHeight: '1.6' }}>
                                Looking for accurate B2B data, targeted marketing intelligence, or demand generation support? Our experts are here to help you connect with the right decision-makers and accelerate your sales growth.
                            </p>
                            <hr style={{ maxWidth: '100px', margin: '0 auto 30px', borderTop: '2px solid #007bff' }} />
                            <h2 style={{ fontSize: '32px', fontWeight: '600' }}>Talk to Our Data Experts</h2>
                            <div className="space16"></div>
                            <p style={{ fontSize: '16px', color: '#666', maxWidth: '800px', margin: '0 auto 50px', lineHeight: '1.6' }}>
                                Whether you need verified B2B contact data, account-based marketing lists, or custom marketing research, our team will design a solution tailored to your goals.
                            </p>
                        </div>
                    </div>

                    <div className="contact-form-all">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <div className="form-inputs">
                                    <form onSubmit={handleSubmit} aria-label="Contact Form">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name*"
                                                        name="first_name"
                                                        value={formData.first_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input
                                                        type="email"
                                                        placeholder="Email*"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone*"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input
                                                        type="url"
                                                        placeholder="Website*"
                                                        name="website"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input
                                                        type="text"
                                                        placeholder="Industry*"
                                                        name="industry"
                                                        value={formData.industry}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input" style={{ marginBottom: '20px' }}>
                                                    <select
                                                        name="services"
                                                        value={formData.services}
                                                        onChange={handleChange}
                                                        required
                                                        style={{ width: '100%', padding: '15px 20px', backgroundColor: '#fff', border: '1px solid #e1e1e1', borderRadius: '5px', fontSize: '16px', color: '#666', outline: 'none', height: '60px' }}
                                                    >
                                                        <option value="" disabled>Services Interested In*</option>
                                                        <option value="Account-Based Marketing Data">Account-Based Marketing Data</option>
                                                        <option value="Verified B2B Contact Intelligence">Verified B2B Contact Intelligence</option>
                                                        <option value="Demand Generation Support">Demand Generation Support</option>
                                                        <option value="Event & Exhibitor Data">Event & Exhibitor Data</option>
                                                        <option value="Custom Marketing Research">Custom Marketing Research</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input">
                                                    <textarea
                                                        cols="30"
                                                        rows="3"
                                                        placeholder="Your Message*"
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="button">
                                                    <button type="submit" className="theme-btn2">Submit Now</button>
                                                </div>
                                                {status && (
                                                    <div style={{
                                                        marginTop: '20px',
                                                        padding: '16px 24px',
                                                        borderRadius: '8px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        backgroundColor: status === 'Message sent successfully!' ? '#e6f4ea' : status === 'Sending...' ? '#eef5ff' : '#fce8e6',
                                                        color: status === 'Message sent successfully!' ? '#137333' : status === 'Sending...' ? '#007bff' : '#c5221f',
                                                        border: `1px solid ${status === 'Message sent successfully!' ? '#ceead6' : status === 'Sending...' ? '#cce5ff' : '#fad2cf'}`,
                                                        fontWeight: '600',
                                                        fontSize: '16px',
                                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                                        transition: 'all 0.3s ease-in-out'
                                                    }}>
                                                        {status === 'Message sent successfully!' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        )}
                                                        {status === 'Sending...' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M22 2L11 13"></path>
                                                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                                            </svg>
                                                        )}
                                                        {status !== 'Message sent successfully!' && status !== 'Sending...' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                            </svg>
                                                        )}
                                                        <span>{status}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-page-boxs">
                                    <div className="single-box">
                                        <div className="icon">
                                            <img className="img-fluid" src={contactIcon1} alt="Phone Icon" width="48" height="48" loading="lazy" />
                                        </div>
                                        <div className="headding">
                                            <h5>Call</h5>
                                            <a href="tel:2817896642">281-789-6642</a>
                                        </div>
                                    </div>
                                    <div className="single-box">
                                        <div className="icon">
                                            <img className="img-fluid" src={contactIcon2} alt="Email Icon" width="48" height="48" loading="lazy" />
                                        </div>
                                        <div className="headding">
                                            <h5>Email</h5>
                                            <a href="mailto:sales@datamarketics.com">sales@datamarketics.com</a>
                                        </div>
                                    </div>
                                    <div className="single-box">
                                        <div className="icon">
                                            <img className="img-fluid" src={contactIcon3} alt="Address Icon" width="48" height="48" loading="lazy" />
                                        </div>
                                        <div className="headding">
                                            <h5>Address</h5>
                                            <p>100, Horizon Center Blvd, Hamilton, NJ 08691</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="why-choose-area sp" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="headding2 text-center">
                            <h2>Why Businesses Choose Data Marketics</h2>
                            <div className="space30"></div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <ul className="custom-bullet-list" style={{ listStyleType: 'none', padding: 0 }}>
                                    {[
                                        '95%+ Data Accuracy',
                                        'Global Industry Coverage',
                                        'GDPR & CAN-SPAM Compliant Data',
                                        'Custom-Tailored Data Solutions',
                                        'Dedicated Account Support'
                                    ].map((feature, index) => (
                                        <li key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#fff',
                                            padding: '15px 25px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                            marginBottom: '12px',
                                            border: '1px solid #eaeaea'
                                        }}>
                                            <div style={{ backgroundColor: '#10b981', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', flexShrink: 0 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            <span style={{ margin: 0, fontSize: '18px', color: '#1a1a1a', fontWeight: '600' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="space30"></div>
                                <div className="text-center">
                                    <p style={{ fontSize: '18px', fontWeight: '500', color: '#007bff', padding: '15px', backgroundColor: '#eef5ff', borderRadius: '8px', display: 'inline-block' }}>We don’t just provide data — we provide qualified growth opportunities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cta-area sp text-center" style={{ backgroundColor: '#007bff', color: '#fff', padding: '80px 0' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: '700', marginBottom: '20px' }}>Get Started Today</h2>
                                <p style={{ fontSize: '18px', color: '#eef5ff', marginBottom: '40px', lineHeight: '1.6' }}>
                                    Ready to fuel your revenue engine?<br />
                                    Let’s help you reach the right audience, at the right time, with the right message.
                                </p>
                                <div className="d-flex justify-content-center gap-4 flex-wrap">
                                    {[
                                        { text: "Request Sample Data", href: "#" },
                                        { text: "Schedule a Strategy Call", href: "#" },
                                        { text: "Get a Custom Quote", href: "#" }
                                    ].map((btn, index) => (
                                        <a key={index} href={btn.href} className="theme-btn2" style={{
                                            backgroundColor: '#fff',
                                            color: '#007bff',
                                            border: 'none',
                                            padding: '18px 35px',
                                            borderRadius: '50px',
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease',
                                            textDecoration: 'none'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)';
                                                if (e.currentTarget.querySelector('svg')) {
                                                    e.currentTarget.querySelector('svg').style.transform = 'translateX(5px)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                                                if (e.currentTarget.querySelector('svg')) {
                                                    e.currentTarget.querySelector('svg').style.transform = 'translateX(0)';
                                                }
                                            }}>
                                            {btn.text}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '12px', transition: 'transform 0.3s ease' }}>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
