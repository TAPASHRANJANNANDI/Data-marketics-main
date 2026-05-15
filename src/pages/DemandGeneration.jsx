import React from 'react';
import aboutMainImg from '../assets/img/about/about-main-img.png';
import aboutPageImg1 from '../assets/img/about/about-page-img1.png';
import aboutPageImg2 from '../assets/img/about/about-page-img2.png';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import customIcon from '../assets/img/icons/about-page-sec-icon2.png';
import analyticsIcon from '../assets/img/icons/about-page-sec-icon3.png';
// import shape1 from '../assets/img/shapes/common-hero-shape1.png';
// import shape2 from '../assets/img/shapes/common-hero-shape2.png';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
const DemandGeneration = () => {
    return (
        <>
        <Helmet>
            <meta name="title" content="B2B Demand Generation Services | Data Marketics" />
            <meta name="description" content="Generate qualified B2B leads with Data Marketics demand generation services. Improve pipeline growth using data-driven targeting and personalized outreach strategies." />
            <link rel="canonical" href="https://datamarketics.com/demand-generation" />
        </Helmet>
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-headding">
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1'}}>B2B Demand Generation Services</h1>
                                <p>Data Marketics powers B2B demand generation with precise data insights and qualified leads, helping businesses drive awareness, engage decision-makers, and achieve sustainable revenue growth.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image shape-animaiton3">
                                <img className="img-fluid" src={aboutMainImg} alt="b2b demand generation marketing strategy" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img className="hero-shape1" src={shape1} alt="" /> */}
                {/* <img className="hero-shape2" src={shape2} alt="" /> */}
            </div>

            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="headding2">
                                <h2>Fuel Your Sales Pipeline with Demand Generation</h2>
                                <div className="space16"></div>
                                <p>Our data-driven demand generation strategies combine accurate contact intelligence with targeted outreach to convert prospects into customers faster. By connecting your sales team directly with high-intent decision-makers, we help you build a robust and scalable B2B sales pipeline.</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Precision-targeted B2B data</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Actionable insights for campaigns</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Scalable solutions for growth</li>
                                </ul>
                                <div className="space30"></div>
                                <Link to="/contact" className="theme-btn2">Get Started Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-img">
                                <img className="img-fluid" src={aboutPageImg1} alt="demand generation analytics dashboard" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <div className="headding2">
                                <h2>Effective Demand Generation Strategies by Data Marketics</h2>
                                <div className="space16"></div>
                                <p>Data Marketics uses data-driven demand generation strategies to maximize lead quality and engagement. Our approach targets ideal prospects and nurtures relationships for long-term business growth. Explore our <Link to="/">data-driven marketing solutions</Link> and comprehensive <Link to="/services">marketing services</Link> to discover our <Link to="/features">core features</Link>, or <Link to="/contact">contact us</Link> to accelerate your pipeline.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="left-image">
                                <img className="img-fluid" src={aboutPageImg2} alt="lead generation performance analysis" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-page-boxs aligned-boxs">
                                <div className="single-box">
                                    <div className="icon"><img src={strategyIcon} alt="strategy icon" /></div>
                                    <div className="space20"></div>
                                    <div className="headding2">
                                        <h3><Link to="/features">Data-Driven Targeting</Link></h3>
                                        <div className="space10"></div>
                                        <p>We use advanced analytics and B2B data intelligence to identify high-value prospects and improve campaign performance.</p>
                                    </div>
                                </div>
                                <div className="single-box">
                                    <div className="icon"><img src={customIcon} alt="Custom Campaigns" /></div>
                                    <div className="space20"></div>
                                    <div className="headding2">
                                        <h3><Link to="/features">Custom Campaign Design</Link></h3>
                                        <div className="space10"></div>
                                        <p>We design personalized B2B marketing campaigns that resonate with your target audience to maximize lead engagement.</p>
                                    </div>
                                </div>
                                <div className="single-box">
                                    <div className="icon"><img src={analyticsIcon} alt="Performance" /></div>
                                    <div className="space20"></div>
                                    <div className="headding2">
                                        <h3><Link to="/features">Performance Monitoring &amp; Adjustment</Link></h3>
                                        <div className="space10"></div>
                                        <p>We continuously monitor demand generation metrics and adjust tactics to ensure optimal pipeline growth and ROI.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img className="about-shape2" src={shape2} alt="" /> */}
            </div>
        </>
    );
};

export default DemandGeneration;
