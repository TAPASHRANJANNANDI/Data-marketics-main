import React from 'react';
import aboutMainImg from '../assets/img/about/about-main-img.png';
import aboutPageImg1 from '../assets/img/about/about-page-img1.png';
import aboutPageImg2 from '../assets/img/about/about-page-img2.png';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import growthIcon from '../assets/img/icons/about-page-sec-icon2.png';
import leadGenIcon from '../assets/img/icons/about-page-sec-icon3.png';

// import shape2 from '../assets/img/shapes/common-hero-shape2.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
            <Helmet>
                <meta name="title" content="About Datamarketics | B2B Marketing & Lead Generation Experts" />
                <meta name="description" content="Learn about Datamarketics, a data-driven B2B marketing company helping businesses grow through strategic lead generation and marketing solutions." />
            </Helmet>
            <div className="pages-hero" aria-label="About Data Marketics Hero Section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1' }}>About Data Marketics <br /> Data-Driven Marketing Experts</h1>
                                <p>
                                    Data Marketics is a trusted provider of data-driven marketing solutions, helping businesses accelerate growth through accurate contact data, intelligent strategies, and performance-focused marketing execution. With over six years of industry experience, we empower organizations to expand their reach, generate qualified leads, and build stronger customer relationships.
                                    Our mission is simple — deliver marketing solutions powered by reliable data and strategic insights that drive measurable business success.

                                </p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image shape-animaiton3">
                                <img className="img-fluid" src={aboutMainImg} alt="Datamarketics B2B marketing team" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="who-we-are-area sp" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <div className="headding2">
                                <h2>Who We Are</h2>
                                <div className="space16"></div>
                                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                                    Data Marketics is a team of marketing professionals, analysts, and lead generation specialists dedicated to helping businesses achieve sustainable growth. We combine advanced data intelligence with modern marketing techniques to create targeted campaigns that connect brands with the right audience.
                                </p>
                                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555', marginTop: '15px' }}>
                                    By understanding market behavior and customer intent, we help companies improve engagement, increase conversions, and maximize return on investment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-img">
                                <img className="img-fluid" src={aboutPageImg1} alt="Data-driven marketing strategy meeting" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="headding2">
                                <h2>Custom Marketing Solutions Tailored to Your Business</h2>
                                <div className="space16"></div>
                                <p>Every business has unique goals and challenges. At Data Marketics, we design customized marketing strategies aligned with specific business objectives.</p>
                                <div className="space16"></div>
                                <p>Our solutions focus on:</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Personalized marketing strategies tailored to business goals</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Intelligent lead generation using targeted data insights</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Data-backed campaigns that improve customer acquisition</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Scalable marketing solutions for long-term growth</li>
                                </ul>
                                <div className="space16"></div>
                                <p style={{ fontWeight: '500', color: '#1a1a1a' }}>We ensure every strategy delivers practical and measurable outcomes.</p>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Get Started Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page-area2 _relative sp" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <div className="headding2">
                                <h2>Trusted Data-Driven Marketing Solutions</h2>
                                <div className="space16"></div>
                                <p>Customer satisfaction and innovation are at the core of everything we do. Businesses trust Data Marketics because our marketing solutions are built on accurate data, strategic planning, and continuous optimization.</p>
                                <div className="space16"></div>
                                <p>Our data-driven approach enables companies to:</p>
                            </div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="row text-center">
                                {['Boost sales performance', 'Expand their customer base', 'Improve campaign effectiveness', 'Achieve sustainable business growth'].map((item, index) => (
                                    <div className="col-md-6 mb-3" key={index}>
                                        <div style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderRadius: '8px', borderLeft: '4px solid #007bff', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                                            <div style={{ backgroundColor: '#007bff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', flexShrink: 0 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space80"></div>

                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="left-image">
                                <img className="img-fluid" src={aboutPageImg2} alt="Lead generation experts working" style={{ borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="headding2 mb-4">
                                <h2>What We Specialize In</h2>
                            </div>
                            <div className="about-page-boxs aligned-boxs">
                                <div className="single-box" style={{ padding: '25px', marginBottom: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="icon" style={{ flexShrink: 0, marginRight: '15px' }}><img src={strategyIcon} style={{ width: '40px' }} alt="Strategy" /></div>
                                        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Custom Marketing Strategies</h4>
                                    </div>
                                    <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>We develop personalized marketing strategies supported by deep data analysis to deliver scalable and high-impact results.</p>
                                </div>
                                <div className="single-box" style={{ padding: '25px', marginBottom: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="icon" style={{ flexShrink: 0, marginRight: '15px' }}><img src={growthIcon} style={{ width: '40px' }} alt="Growth" /></div>
                                        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Sales Growth & Customer Expansion</h4>
                                    </div>
                                    <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>Our targeted marketing campaigns help businesses increase revenue while reaching new markets and audiences.</p>
                                </div>
                                <div className="single-box" style={{ padding: '25px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="icon" style={{ flexShrink: 0, marginRight: '15px' }}><img src={leadGenIcon} style={{ width: '40px' }} alt="Lead Gen" /></div>
                                        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Data-Driven Lead Generation</h4>
                                    </div>
                                    <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>Using predictive analytics and audience segmentation, we generate high-quality leads that improve engagement and conversion rates.</p>
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
                                    'Verified and up-to-date contact data',
                                    'Data-driven decision making',
                                    'Customized marketing strategies',
                                    'Proven performance and measurable results',
                                    'Focus on long-term client success'
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
                                <p style={{ fontSize: '18px', fontWeight: '500', color: '#007bff', padding: '15px', backgroundColor: '#eef5ff', borderRadius: '8px', display: 'inline-block' }}>We work as a strategic partner, helping businesses grow confidently in competitive markets.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-area sp text-center" style={{ backgroundColor: '#007bff', color: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: '700', marginBottom: '20px' }}>Let's Grow Together</h2>
                            <p style={{ fontSize: '18px', color: '#eef5ff', marginBottom: '40px', lineHeight: '1.6' }}>
                                At Data Marketics, we believe successful marketing starts with understanding data and turning insights into action. Whether your goal is to generate leads, expand market reach, or improve sales performance, our team is ready to support your growth journey.
                            </p>
                            <Link to="/contact" className="theme-btn2" style={{
                                backgroundColor: '#fff',
                                color: '#007bff',
                                border: 'none',
                                padding: '18px 45px',
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
                                    e.currentTarget.querySelector('svg').style.transform = 'translateX(5px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                                    e.currentTarget.querySelector('svg').style.transform = 'translateX(0)';
                                }}>
                                Contact us today
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '12px', transition: 'transform 0.3s ease' }}>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
