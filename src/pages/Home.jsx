import React from 'react';
import aboutMainImg from '../assets/img/about/about-main-img.png';
import aboutPageImg1 from '../assets/img/about/about-page-img1.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1' }}>Marketing Data Provider for<br /> B2B Lead Generation & Sales Growth</h1>
                                <p>As a leading marketing data provider, we help businesses connect with qualified decision-makers through accurate B2B contact databases, targeted email lists, and data-driven <b><Link to="/services" style={{ color: '#007bff' }} >lead generation solutions</Link></b> designed to accelerate sales growth.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Get Started Now</Link>
                                    <Link to="/services" className="theme-btn3 ml-3" style={{ marginLeft: '15px' }}>Our Services</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image shape-animaiton3">
                                <img className="img-fluid" src={aboutMainImg} alt="B2B marketing data solutions" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page-area1 sp" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="headding2 text-center">
                        <h2>B2B Marketing Data Solutions That Deliver Results</h2>
                        <div className="space30"></div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <ul className="custom-bullet-list" style={{ listStyleType: 'none', padding: 0 }}>
                                {[
                                    'B2B Email Database',
                                    'Sales Leads Provider',
                                    'Demand Generation Data',
                                    'Sales Intelligence Platform',
                                    'Intent Data Solutions'
                                ].map((solution, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        padding: '20px 30px',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                        marginBottom: '15px',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                                        }}>
                                        <div style={{ backgroundColor: '#eef5ff', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px', flexShrink: 0 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '22px', color: '#1a1a1a', fontWeight: '600' }}>{solution}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="headding2 text-center">
                        <h2>Why We Are a Leading Marketing Data Provider ?</h2>
                        <div className="space16"></div>
                        <p>We combine massive B2B datasets with intelligent lead scoring to deliver high-quality leads for your business.</p>
                    </div>
                    <div className="space30"></div>
                    <div className="row justify-content-center">
                        {[
                            'Verified B2B Contact Data',
                            'High Data Accuracy',
                            'Industry Targeting',
                            'AI-Powered Insights',
                            'Global Business Coverage'
                        ].map((feature, index) => (
                            <div className="col-xl col-lg-4 col-md-6 mb-4" key={index}>
                                <div className="single-box h-100 text-center" style={{
                                    backgroundColor: '#fff',
                                    padding: '30px 15px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    border: '1px solid #eaeaea',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                                    }}>
                                    <div style={{ backgroundColor: '#10b981', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a', fontWeight: '600', lineHeight: '1.4' }}>{feature}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="about-page-area1 sp" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="about-image">
                                <img src={aboutPageImg1} alt="Industry Solutions" className="img-fluid" style={{ borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="headding2">
                                <h2>Marketing Data Solutions for Every Industry</h2>
                                <div className="space16"></div>
                                <p>We provide tailored B2B data solutions to match the unique targeting requirements and audiences of key global industries.</p>
                            </div>
                            <div className="space30"></div>
                            <ul className="custom-bullet-list" style={{ listStyleType: 'none', padding: 0 }}>
                                {[
                                    'Financial Services',
                                    'Technology',
                                    'Healthcare',
                                    'Manufacturing',
                                    'SaaS Companies'
                                ].map((industry, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        padding: '15px 25px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                        marginBottom: '12px',
                                        border: '1px solid #eaeaea',
                                        transition: 'transform 0.2s ease'
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(5px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}>
                                        <div style={{ backgroundColor: '#007bff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', flexShrink: 0 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        </div>
                                        <span style={{ margin: 0, fontSize: '18px', color: '#1a1a1a', fontWeight: '500' }}>{industry}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="headding2 text-center">
                        <h2>Drive Better Marketing & Sales Outcomes</h2>
                        <div className="space30"></div>
                    </div>
                    <div className="row justify-content-center">
                        {[
                            'Increase Lead Conversion',
                            'Improve Campaign ROI',
                            'Reach Decision Makers Faster',
                            'Scale Demand Generation'
                        ].map((outcome, index) => (
                            <div className="col-lg-3 col-md-6 mb-4" key={index}>
                                <div className="single-box h-100 text-center" style={{
                                    backgroundColor: '#fff',
                                    padding: '30px 20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    border: '1px solid #eaeaea',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                                    }}>
                                    <div style={{ backgroundColor: '#fff4f6', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                            <polyline points="17 6 23 6 23 12"></polyline>
                                        </svg>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a', fontWeight: '600', lineHeight: '1.4' }}>{outcome}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="about-page-area1 sp" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="headding2 text-center">
                        <h2>Frequently Asked Questions</h2>
                        <div className="space30"></div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="faq-accordion">
                                {[
                                    { q: 'What does a marketing data provider do?', a: 'A marketing data provider supplies accurate and targeted contact lists, firmographic data, and insights to help businesses reach their ideal customers.' },
                                    { q: 'How accurate is your B2B data?', a: 'Our B2B data undergoes rigorous verification processes, ensuring high deliverability rates and up-to-date contact information for reliable outreach so your messages hit the inbox.' },
                                    { q: 'Who can use marketing data services?', a: 'Any B2B organization looking to scale their outbound sales, run targeted marketing campaigns, or expand into new markets can benefit from our data solutions.' },
                                    { q: 'Do you provide industry-specific contact data?', a: 'Yes! We provide highly segmented data tailored to specific industries, roles, company sizes, geographic locations, and other critical targeting criteria.' }
                                ].map((faq, index) => (
                                    <details key={index} style={{
                                        backgroundColor: '#fff',
                                        marginBottom: '15px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid #eaeaea',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                                    }}>
                                        <summary style={{
                                            padding: '20px 25px',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            color: '#1a1a1a',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            listStyle: 'none'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#007bff'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = '#1a1a1a'}
                                            onClick={(e) => {
                                                const icon = e.currentTarget.querySelector('.faq-icon');
                                                icon.style.transform = e.currentTarget.parentElement.open ? 'rotate(0deg)' : 'rotate(180deg)';
                                            }}>
                                            {faq.q}
                                            <svg className="faq-icon" style={{ transition: 'transform 0.3s ease', flexShrink: 0, marginLeft: '15px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </summary>
                                        <div style={{ padding: '0 25px 20px', color: '#555', lineHeight: '1.6', fontSize: '16px' }}>
                                            <p style={{ margin: 0 }}>{faq.a}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-area sp text-center" style={{ backgroundColor: '#007bff', color: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: '700', marginBottom: '20px' }}>Ready to Grow with Accurate Marketing Data?</h2>
                            <p style={{ fontSize: '18px', color: '#eef5ff', marginBottom: '40px', lineHeight: '1.6' }}>
                                Get access to verified business contacts and accelerate your sales pipeline today.
                            </p>
                            <div className="hero-btns d-flex flex-wrap justify-content-center gap-3 mt-4">
                                <Link to="/contact" className="theme-btn2">
                                     Request Demo
                                </Link>
                                <Link to="/contact" className="theme-btn3">
                                     Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
