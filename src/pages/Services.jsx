import React, { useState } from 'react';
import aboutMainImg from '../assets/img/about/about-main-img.png';
import icon1 from '../assets/img/icons/work5-icon1.png';
import icon2 from '../assets/img/icons/work5-icon2.png';
import icon3 from '../assets/img/icons/work5-icon3.png';
import icon4 from '../assets/img/icons/work5-icon4.png';
import abmDataImg from '../assets/img/work/abm-data.png';
import work4Img2 from '../assets/img/work/work4-img2.png';
import prospectingImg from '../assets/img/work/prospecting-tool.png';
import leadScoringImg from '../assets/img/work/lead-scoring.png';
import customMarketingImg from '../assets/img/work/custom-marketing.png';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
const Services = () => {
    const [activeTab, setActiveTab] = useState('abm');

    const tabs = [
        { id: 'abm', name: 'Account-Based Marketing Data', icon: icon1 },
        { id: 'contact', name: 'Verified B2B Contact Intelligence', icon: icon2 },
        { id: 'demand', name: 'Demand Generation Support', icon: icon3 },
        { id: 'event', name: 'Event & Exhibitor Intelligence', icon: icon4 },
    ];

    const content = {
        abm: {
            title: 'Account-Based Marketing (ABM) Data Solutions',
            text: 'Target high-value accounts with precision using our Account-Based Marketing data services.',
            description: 'Our ABM solutions help businesses identify and engage decision-makers within their Ideal Customer Profile (ICP) using:',
            list: [
                'Firmographic targeting',
                'Technographic insights',
                'Buyer intent data',
                'Job-role-based contact lists',
                'Custom account segmentation'
            ],
            footer: 'Perfect for outbound sales teams focused on quality over quantity and personalized outreach strategies.',
            img1: abmDataImg,
            img2: work4Img2
        },
        contact: {
            title: 'Verified B2B Contact Intelligence',
            text: 'Fuel your sales pipeline with accurate and verified B2B contact data.',
            description: 'We provide:',
            list: [
                'Verified decision-maker contacts',
                'Industry-specific databases',
                'Email & phone verification',
                'GDPR-compliant data sourcing',
                'Updated business intelligence'
            ],
            footer: 'Our data enables businesses to reach prospects confidently and improve conversion rates.',
            img1: prospectingImg,
            img2: work4Img2
        },
        demand: {
            title: 'Demand Generation Support',
            text: 'Boost your marketing ROI with strategic demand generation solutions.',
            description: 'Our services include:',
            list: [
                'Lead nurturing support',
                'Audience targeting strategies',
                'Campaign data support',
                'Marketing-qualified lead (MQL) generation',
                'Performance-driven outreach planning'
            ],
            footer: 'We help businesses create predictable pipelines and scalable growth opportunities.',
            img1: leadScoringImg,
            img2: work4Img2
        },
        event: {
            title: 'Event & Exhibitor Intelligence',
            text: 'Maximize event marketing success with targeted event and exhibitor data.',
            description: 'We help you:',
            list: [
                'Identify relevant industry events',
                'Access exhibitor and attendee insights',
                'Target decision-makers before events',
                'Improve event outreach campaigns',
                'Generate qualified opportunities faster'
            ],
            footer: '',
            img1: customMarketingImg,
            img2: work4Img2
        }
    };

    return (
        <>
         <Helmet>
            <meta name="title" content= "B2B Marketing Services | Data & Demand Generation – Data Marketics" />
            <meta name="description" content="Explore Data Marketics’ B2B marketing services including ABM data, verified contact intelligence, demand generation, and event intelligence solutions."/>
            <link rel="canonical" href="https://datamarketics.com/services" />
         </Helmet>
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1' }}>Our Core Services <br />Data-Driven B2B Marketing Solutions</h1>
                                <p>Fuel your revenue engine with precision-targeted data and demand-generation strategies. Data Marketics helps B2B organizations accelerate growth through insight-driven outreach, verified business intelligence, and performance-focused marketing solutions.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image shape-animaiton3">
                                <img className="img-fluid" src={aboutMainImg} alt="Services team" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="work5 sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 m-auto text-center">
                            <div className="headding4 pbmit-heading-subheading">
                                <span style={{ color: '#25b9a3', fontSize: '20px', fontWeight: '600', marginBottom: '16px', display: 'inline-block' }}>Our Services</span>
                                <h2>Data-Driven Solutions for B2B Growth</h2>
                                <p>We provide advanced data and marketing solutions designed to help sales and marketing teams connect with the right decision-makers, improve campaign performance, and generate high-quality leads.</p>
                                <div className="space16"></div>
                            </div>
                        </div>
                    </div>
                    <div className="space60"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="work5-tabs-all">
                                <ul className="nav nav-pills mb-3" role="tablist">
                                    {tabs.map((tab) => (
                                        <li className="nav-item" key={tab.id} role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => setActiveTab(tab.id)}
                                                type="button"
                                            >
                                                <span><img src={tab.icon} alt={tab.name} /></span>
                                                {tab.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active">
                                        <div className="work-tab-body">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <div className="headding4">
                                                        <h3>{content[activeTab].title}</h3>
                                                        <div className="space16"></div>
                                                        <p style={{ fontWeight: 'bold' }}>{content[activeTab].text}</p>
                                                        <div className="space16"></div>
                                                        <p>{content[activeTab].description}</p>
                                                        <ul className="list mt-3 mb-3">
                                                            {content[activeTab].list.map((item, idx) => (
                                                                <li key={idx}><i className="fa-regular fa-check"></i> {item}</li>
                                                            ))}
                                                        </ul>
                                                        {content[activeTab].footer && <p>{content[activeTab].footer}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="work4-images">
                                                        <div className="image1">
                                                            <img src={content[activeTab].img1} alt="Main detail" />
                                                        </div>
                                                        <div className="image2">
                                                            <img src={content[activeTab].img2} alt="Sub detail" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                        <h2>Why Choose Data Marketics</h2>
                        <div className="space16"></div>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', color: '#555' }}>
                            Data Marketics is a trusted provider of data-driven marketing solutions helping businesses grow faster through actionable insights and reliable data.
                        </p>
                        <div className="space30"></div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <ul className="custom-bullet-list" style={{ listStyleType: 'none', padding: 0 }}>
                                {[
                                    'High-quality verified data',
                                    'Customized targeting solutions',
                                    'Industry-focused intelligence',
                                    'Improved campaign performance',
                                    'Scalable B2B growth strategies'
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
                                <p style={{ fontSize: '18px', fontWeight: '500', color: '#007bff', padding: '15px', backgroundColor: '#eef5ff', borderRadius: '8px', display: 'inline-block' }}>
                                    Founded six years ago, we continue helping companies expand their customer base and increase revenue with accurate, up-to-date business data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
