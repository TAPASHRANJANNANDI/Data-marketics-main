import React from 'react';
import { Helmet } from 'react-helmet';

const GRAD_HEADING = 'linear-gradient(90deg, #042f2e 0%, #064e4a 18%, #0d7377 42%, #14b8a6 70%, #2dd4bf 100%)';

const gradientHeading = {
    background: GRAD_HEADING,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'inline-block',
};

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | Datamarketics</title>
                <meta name="description" content="Read the Datamarketics privacy policy to understand how we collect, use, protect and manage information when you use our website and services." />
                <meta name="keywords" content="Datamarketics privacy policy, privacy policy, data privacy" />
                <link rel="canonical" href="https://datamarketics.com/privacy-policy" />
            </Helmet>

            {/* Hero */}
            <div className="pages-hero" style={{ paddingTop: '90px', paddingBottom: '60px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center">
                            <h1 style={{ fontSize: '52px', fontWeight: 900, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
                                <span style={gradientHeading}>Privacy Policy</span>
                            </h1>
                            <p style={{ fontSize: '17px', color: '#4f6b6b', marginTop: '18px', lineHeight: 1.7 }}>
                                How Data Marketics collects, uses, and protects the personal information you share with us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="sp" style={{ paddingTop: '40px', paddingBottom: '90px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="privacy-content" style={{
                                background: '#ffffff',
                                borderRadius: '20px',
                                padding: '50px 56px',
                                boxShadow: '0 14px 40px rgba(13, 115, 119, 0.08)',
                                border: '1px solid rgba(45, 212, 191, 0.18)',
                            }}>
                                <p>
                                    Data Marketics (also referred to as "we", "our", or "us") recognize and greatly respect the privacy of all individuals whose Personal Information may be processed by us in the performance of our services and our business operations. We provide this privacy policy to make you aware of how we collect and use information from you pertaining to your use in accordance with our website.
                                </p>

                                <h5>What information is collected?</h5>
                                <p>When browsing our Website, you are not required to provide any Personal Information unless and until you choose to make a purchase or sign up for one of our e-mail newsletters or log in to our service. You may be asked to enter your name, personal and work email, work or home address, phone number or other details.</p>

                                <h5>How we use it?</h5>
                                <p>We may use the information we collect from you to respond to your customer service requests, to send communications and administrative emails, to send periodic emails regarding your services, and to analyze how customers are using our website.</p>

                                <h5>GDPR &amp; International Compliance</h5>
                                <p>Data Marketics complies with major international data protection frameworks. We adhere to transparency principles and provide you with clear options to manage your data, including the right to unsubscribe at any time.</p>

                                <h5>Cookies &amp; Web Beacons</h5>
                                <p>Our website uses cookies and web beacons to enhance your user experience, track site usage, and analyze the effectiveness of our communication. You can manage cookie preferences through your browser settings.</p>

                                <h5>Contact Information</h5>
                                <p>If you have any questions, concerns or complaints regarding our compliance with this notice, please contact us at <a href="mailto:sales@datamarketics.com">sales@datamarketics.com</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
