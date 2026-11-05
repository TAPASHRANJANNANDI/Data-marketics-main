import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DancingChart from '../components/DancingChart';
import spanImage6 from '../assets/img/icons/span-image6.png';
import edit1 from '../assets/img/icons/editing6-icon1.svg';
import edit2 from '../assets/img/icons/editing6-icon2.svg';
import edit3 from '../assets/img/icons/editing6-icon3.svg';
import edit4 from '../assets/img/icons/editing6-icon4.svg';
import secIcon1 from '../assets/img/icons/about-page-sec-icon1.png';
import secIcon2 from '../assets/img/icons/about-page-sec-icon2.png';
import { pageSchema } from '../data/schema';
import { RelatedPosts } from '../components/RelatedLinks';

// Distinct corporate event imagery for this page
const CORP_EVENT = {
    hero: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',      // exhibitor / trade show data screen
    industries: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80', // conference audience
    power: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80',      // trade show floor
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const ExhibitorsData = () => {
    return (
        <>
        <Helmet>
            <title>Exhibitor Data &amp; Prospecting Solutions | Data Marketics</title>
            <meta name="description" content="Discover potential customers with exhibitor data, company information and prospecting solutions designed to turn trade show audiences into sales opportunities." />
            <meta name="keywords" content="exhibitor data, exhibitor lists, trade show leads, B2B prospecting data, B2B Company profile, targeted B2B leads" />
            <link rel="canonical" href="https://datamarketics.com/exhibitors-data" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Exhibitors Data Provider | Trade Show & Event Contact Database" />
            <meta property="og:description" content="Access verified exhibitors data for trade shows and events to improve prospecting and sales outreach." />
            <meta property="og:url" content="https://datamarketics.com/exhibitors-data" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Exhibitors Data Provider | Trade Show & Event Contact Database" />
            <meta name="twitter:description" content="Access verified exhibitors data for trade shows and events to improve prospecting and sales outreach." />
            <script type="application/ld+json">{pageSchema('/exhibitors-data')}</script>
        </Helmet>
            <div className="pages-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="headding2">
                                <h1>B2B Event Exhibitors Data for Targeted Lead Generation</h1>
                                <p>Data Marketics provides verified event exhibitors data to help businesses connect with decision-makers from global trade shows and industry events. Our curated databases enable targeted outreach, improved engagement, and faster sales pipeline growth.</p>
                                <div className="space30"></div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn2">Contact Us - Attendees Data</Link>
                                </div>
                            </div>
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
                                    src={CORP_EVENT.hero}
                                    alt="Exhibitors data dashboard for B2B event marketing"
                                    style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(13, 115, 119, 0.22)', width: '100%', height: '420px', objectFit: 'cover' }}
                                    loading="eager" fetchPriority="high"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
                {/* <img className="hero-shape1" src={shape1} alt="" loading="lazy" /> */}
                {/* <img className="hero-shape2" src={shape2} alt="" loading="lazy" /> */}
            </div>

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
                                <h2>Industry-Wise Exhibitors Data Solutions</h2>
                                <p>Our industry-specific exhibitor databases help B2B companies identify high-intent prospects actively participating in global events.</p>
                                <ul className="list">
                                    <li><span><i className="fa-solid fa-check"></i></span> Healthcare Events Data</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Technology Events</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Banking & Finance Events</li>
                                    <li><span><i className="fa-solid fa-check"></i></span> Travel & Tourism Events</li>
                                </ul>
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
                                    <img src={CORP_EVENT.industries} alt="Industry trade-show audience" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="pulse" label="EVENT ACTIVITY" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="editing6 sp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center">
                            <div className="heading6">
                                <span className="title"><img src={spanImage6} alt="Icon" loading="lazy" /></span>
                                <h2>How Our Exhibitors Data Helps You Generate Qualified Leads</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {[
                            { title: 'Events List', text: 'Global events calendar and insider exhibitor data.', icon: edit1 },
                            { title: 'Exhibitor’s List', text: 'See all companies in your industry taking part in each event.', icon: edit2 },
                            { title: 'Event Attendees Data', text: 'Sales-qualified leads primed for conversion.', icon: edit2 },
                            { title: 'Name of Events', text: 'Relevant business event details and direct URLs.', icon: edit3 },
                            { title: 'Website URL', text: 'Direct URLs to connect with organizers & exhibitors.', icon: edit4 },
                            { title: 'Sponsors & Organisers', text: 'Detailed information on sponsors helping evaluate funding strength.', icon: edit4 },
                        ].map((item, index) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={index}>
                                <div className="editing-box">
                                    <div className="icon"><img src={item.icon} alt={item.title} width="48" loading="lazy" /></div>
                                    <h4>{item.title}</h4>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="about-page-area2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto text-center">
                            <div className="headding2">
                                <h5>Unlock the Power of Verified Exhibitor Data</h5>
                                <p>Access accurate, sales-ready exhibitor contacts from global events and empower your marketing and sales teams to connect with decision-makers quickly and effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="work4-images service-corporate-images"
                                initial={{ opacity: 0, scale: 0.92, x: -20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="image1">
                                    <img src={CORP_EVENT.power} alt="Verified exhibitor leads at a global trade show" loading="lazy" />
                                </div>
                                <motion.div
                                    className="image2 image2-chart"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.4 }}
                                >
                                    <DancingChart variant="donut" label="LEAD QUALITY" />
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
                                    visible: { transition: { staggerChildren: 0.15 } }
                                }}
                            >
                                <motion.div className="single-box" variants={fadeUp}>
                                    <div className="icon"><img src={secIcon1} alt="trade show exhibitor analytics" loading="lazy" /></div>
                                    <h4>Time and Cost Efficiency</h4>
                                    <p>Save resources by accessing curated lists in one place.</p>
                                </motion.div>
                                <motion.div className="single-box" variants={fadeUp}>
                                    <div className="icon"><img src={secIcon2} alt="exhibitor data sales analytics dashboard" loading="lazy" /></div>
                                    <h4>Ready-to-Use Sales Leads</h4>
                                    <p>Exhibitor contacts are sales-qualified prospects primed for outreach.</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts that cover this service, so the blog and the
                service pages link to each other in both directions. */}
            <RelatedPosts service="/exhibitors-data" />
        </>
    );
};

export default ExhibitorsData;
