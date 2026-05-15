import React from 'react';
import aboutMainImg from '../assets/img/about/about-main-img.png';
import featureStiky1 from '../assets/img/features/features-stiky1.png';
import featureStiky2 from '../assets/img/features/features-stiky2.png';
import featureStiky3 from '../assets/img/features/features-stiky3.png';
// import stikyShape from '../assets/img/shapes/stiky-sec-shape2.png';
import innovationImg from '../assets/img/others/others2-image.png';
import innovationShape1 from '../assets/img/shapes/others2-shape1.png';
import innovationShape2 from '../assets/img/shapes/others2-shape2.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Features = () => {
    return (
        <>
            <Helmet>
                <meta name="title" content="Core Features | Data Marketics B2B Data & Marketing Solutions" />
                <meta name="description" content="Explore Data Marketics core features including data enablement, lead scoring, and custom marketing research designed to improve targeting, engagement, and business growth." />
                <link rel="canonical" href="https://datamarketics.com/features" />
            </Helmet>
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1' }}>Core Features of Data Marketics</h1>
                                <p>Our solutions are built to support modern B2B businesses with advanced data intelligence, tailored marketing strategies, and measurable growth outcomes. At Data Marketics, we combine technology, analytics, and industry expertise to help organizations reach the right audience and maximize marketing performance.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image shape-animaiton3">
                                <img className="img-fluid" src={aboutMainImg} alt="Features overview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stiky-sec sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="stiky-sec-boxs _relative">
                                {/* Feature 1 */}
                                <div className="stiky-single">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="headding">
                                                <h3>Data Enablement</h3>
                                                <div className="space16"></div>
                                                <p>Firmographic and demographic data play a critical role in helping businesses expand their customer base and improve sales performance. Our data enablement solutions provide detailed insights about companies and decision-makers, including industry type, company size, geographic location, and audience characteristics.</p>
                                                <div className="space16"></div>
                                                <p>With accurate and structured data, businesses can confidently identify their Ideal Customer Profile (ICP) and execute targeted outreach strategies.</p>
                                                <div className="space16"></div>
                                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Key Benefits:</div>
                                                <ul className="list">
                                                    <li><i className="fa-regular fa-check"></i> Create effective strategies using ideal customer data</li>
                                                    <li><i className="fa-regular fa-check"></i> Identify partnership opportunities and growth markets</li>
                                                    <li><i className="fa-regular fa-check"></i> Improve campaign targeting and customer acquisition</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="stiky-sec-img">
                                                <img className="img-fluid" src={featureStiky1} alt="data enablement solutions" />
                                                {/* <img className="shape" src={stikyShape} alt="Shape" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Feature 2 */}
                                <div className="stiky-single">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="headding">
                                                <h3>Lead Scoring and Nurturing</h3>
                                                <div className="space16"></div>
                                                <p>Effective lead management is essential for converting prospects into customers. Data Marketics provides advanced lead scoring and nurturing solutions that help businesses prioritize high-value prospects and guide them through the sales journey.</p>
                                                <div className="space16"></div>
                                                <p>Our data-driven approach ensures marketing and sales teams focus on leads most likely to convert.</p>
                                                <div className="space16"></div>
                                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Key Benefits:</div>
                                                <ul className="list">
                                                    <li><i className="fa-regular fa-check"></i> Prioritize leads based on engagement and behavior</li>
                                                    <li><i className="fa-regular fa-check"></i> Nurture prospects through personalized campaigns</li>
                                                    <li><i className="fa-regular fa-check"></i> Improve conversion rates using data insights</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="stiky-sec-img">
                                                <img className="img-fluid" src={featureStiky2} alt="b2b lead scoring process" />
                                                {/* <img className="shape" src={stikyShape} alt="Shape" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Feature 3 */}
                                <div className="stiky-single">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="headding">
                                                <h3>Custom Marketing Research</h3>
                                                <div className="space16"></div>
                                                <p>Every business has unique marketing challenges and opportunities. Our custom marketing research solutions help organizations reach the right audience using strategic insights and tailored planning.</p>
                                                <div className="space16"></div>
                                                <p>Our experts analyze market trends, customer behavior, and industry data to develop customized marketing approaches aligned with business goals.</p>
                                                <div className="space16"></div>
                                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Key Benefits:</div>
                                                <ul className="list">
                                                    <li><i className="fa-regular fa-check"></i> Reach the right audience with targeted strategies</li>
                                                    <li><i className="fa-regular fa-check"></i> Identify ideal customers using data insights</li>
                                                    <li><i className="fa-regular fa-check"></i> Improve engagement with personalized marketing content</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="stiky-sec-img">
                                                <img className="img-fluid" src={featureStiky3} alt="marketing research analytics dashboard" />
                                                {/* <img className="shape" src={stikyShape} alt="Shape" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="email-innovation" style={{ backgroundColor: '#25b9a3' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="headding2-w">
                                <h2>Unlocking Business Potential with Data Intelligence</h2>
                                <div className="space16"></div>
                                <p>Data Marketics empowers businesses with intelligent marketing tools designed to optimize engagement, enhance lead management, and increase conversions. By delivering the right message to the right audience at the right time, we help organizations build sustainable growth and long-term success.</p>
                                <div className="space16"></div>
                                <p style={{ fontWeight: 'bold' }}>Our features support:</p>
                                <ul className="list" style={{ color: '#fff', paddingLeft: '20px', marginTop: '15px' }}>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Precision audience targeting</li>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Improved marketing efficiency</li>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Higher lead conversion rates</li>
                                    <li style={{ listStyleType: 'disc', marginBottom: '10px', opacity: 0.9 }}>Scalable business growth</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="images">
                                <div className="image1"><img className="img-fluid" src={innovationImg} alt="data-driven marketing features" /></div>
                                <div className="image2"><img className="img-fluid" src={innovationShape1} alt="Shape" /></div>
                                <div className="image3"><img className="img-fluid" src={innovationShape2} alt="Shape" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-area sp text-center" style={{ backgroundColor: '#007bff', color: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <p style={{ fontSize: '18px', color: '#eef5ff', marginBottom: '40px', lineHeight: '1.6' }}>
                                Fuel your pipeline with verified business contacts, expand your network through intelligent data solutions, and boost outreach performance with high-converting marketing campaigns powered by Data Marketics.
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
                                Contact Us
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

export default Features;
