import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../components/DancingChart';
import strategyIcon from '../assets/img/icons/about-page-sec-icon1.png';
import customIcon from '../assets/img/icons/about-page-sec-icon2.png';
import analyticsIcon from '../assets/img/icons/about-page-sec-icon3.png';
import { pageSchema } from '../data/schema';

// Distinct corporate imagery for the Demand Generation page
const CORP_IMG = {
    hero: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=80',     // collaborative business team at a meeting
    section1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', // laptop with analytics charts
    section2: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80', // diverse marketing team brainstorm
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const DemandGeneration = () => {
    return (
        <>
            <Helmet>
                <title>Demand Generation Services | Datamarketics</title>
                <meta name="description" content="Create awareness and generate qualified demand with targeted campaigns, prospecting data and demand generation strategies designed to support sustainable business growth." />
                <meta name="keywords" content="demand generation, B2B demand generation, B2B lead generation services, targeted B2B leads, B2B prospecting data" />
                <link rel="canonical" href="https://datamarketics.com/demand-generation" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Demand Generation Services | Generate Qualified B2B Pipeline" />
                <meta property="og:description" content="Generate qualified leads and build a stronger sales pipeline with Data Marketics' demand generation solutions." />
                <meta property="og:url" content="https://datamarketics.com/demand-generation" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Demand Generation Services | Generate Qualified B2B Pipeline" />
                <meta name="twitter:description" content="Generate qualified leads and build a stronger sales pipeline with Data Marketics' demand generation solutions." />
                <script type="application/ld+json">{pageSchema('/demand-generation')}</script>
            </Helmet>

            {/* Hero */}
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="main-headding"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h1 style={{ fontSize: '50px', lineHeight: '1.1' }}>B2B Demand Generation Services</h1>
                                <p>Data Marketics powers B2B demand generation with precise data insights and qualified leads, helping businesses drive awareness, engage decision-makers, and achieve sustainable revenue growth.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us</Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="hero-image hero-image-static"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <img
                                    className="img-fluid"
                                    src={CORP_IMG.hero}
                                    alt="B2B demand generation team driving pipeline growth"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: Pipeline + analytics dashboard photo + live line chart */}
            <div className="about-page-area1 sp">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="headding2"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={fadeUp}
                            >
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
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="work4-images service-corporate-images"
                                initial={{ opacity: 0, scale: 0.92, x: 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="image1">
                                    <img src={CORP_IMG.section1} alt="Demand generation analytics dashboard" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <DancingChart variant="line" label="PIPELINE GROWTH" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Strategies — corporate scene + bar dashboard + strategy cards */}
            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <motion.div
                                className="headding2"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={fadeUp}
                            >
                                <h2>Effective Demand Generation Strategies by Data Marketics</h2>
                                <div className="space16"></div>
                                <p>Data Marketics uses data-driven demand generation strategies to maximize lead quality and engagement. Our approach targets ideal prospects and nurtures relationships for long-term business growth. Explore our <Link to="/">data-driven marketing solutions</Link> and comprehensive <Link to="/services">marketing services</Link> to discover our <Link to="/features">core features</Link>, or <Link to="/contact">contact us</Link> to accelerate your pipeline.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="work4-images service-corporate-images"
                                initial={{ opacity: 0, scale: 0.92, x: -20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="image1">
                                    <img src={CORP_IMG.section2} alt="B2B marketing team strategy session" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="bars" label="CAMPAIGN PERF" />
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="about-page-boxs aligned-boxs"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-20px' }}
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.12 } }
                                }}
                            >
                                <motion.div className="single-box" variants={fadeUp}>
                                    <div className="icon"><img src={strategyIcon} alt="strategy icon" /></div>
                                    <div className="space20"></div>
                                    <div className="headding2">
                                        <h3><Link to="/features">Data-Driven Targeting</Link></h3>
                                        <div className="space10"></div>
                                        <p>We use advanced analytics and B2B data intelligence to identify high-value prospects and improve campaign performance.</p>
                                    </div>
                                </motion.div>
                                <motion.div className="single-box" variants={fadeUp}>
                                    <div className="icon"><img src={customIcon} alt="Custom Campaigns" /></div>
                                    <div className="space20"></div>
                                    <div className="headding2">
                                        <h3><Link to="/features">Custom Campaign Design</Link></h3>
                                        <div className="space10"></div>
                                        <p>We design personalized B2B marketing campaigns that resonate with your target audience to maximize lead engagement.</p>
                                    </div>
                                </motion.div>
                                <motion.div className="single-box" variants={fadeUp}>
                                    <div className="icon"><img src={analyticsIcon} alt="Performance" /></div>
                                    <div className="space20"></div>
                                    <div className="headding2">
                                        <h3><Link to="/features">Performance Monitoring &amp; Adjustment</Link></h3>
                                        <div className="space10"></div>
                                        <p>We continuously monitor demand generation metrics and adjust tactics to ensure optimal pipeline growth and ROI.</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DemandGeneration;
