import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <meta name="title" content="Privacy Policy | Data Marketics" />
                <meta name="description" content="Read the Privacy Policy for Data Marketics. We respect your privacy and protect your personal information." />
                <link rel="canonical" href="https://datamarketics.com/privacy-policy" />
            </Helmet>
            <div className="testimonial-page sp">
                <div className="container">
                <div className="row">
                    <div className="col-lg-7 m-auto text-center">
                        <div className="common-main-headding">
                            <h1>Privacy Policy</h1>
                        </div>
                    </div>
                </div>
                <div className="space60"></div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="privacy-content">
                            <p>Data Marketics (also referred to as "we", "our", or "us") recognize and greatly respect the privacy of all individuals whose Personal Information may be processed by us in the performance of our services and our business operations. We provide this privacy policy to make you aware of how we collect and use information from you pertaining to your use in accordance with our website.</p>
                            <div className="space20"></div>
                            <h5>What information is collected?</h5>
                            <p>When browsing our Website, you are not required to provide any Personal Information unless and until you choose to make a purchase or sign up for one of our e-mail newsletters or log in to our service. You may be asked to enter your name, personal and work email, work or home address, phone number or other details.</p>
                            <div className="space20"></div>
                            <h5>How we use it?</h5>
                            <p>We may use the information we collect from you to respond to your customer service requests, to send communications and administrative emails, to send periodic emails regarding your services, and to analyze how customers are using our website.</p>
                            <div className="space20"></div>
                            <h5>GDPR & International Compliance</h5>
                            <p>Data Marketics complies with major international data protection frameworks. We adhere to transparency principles and provide you with clear options to manage your data, including the right to unsubscribe at any time.</p>
                            <div className="space20"></div>
                            <h5>Cookies & Web Beacons</h5>
                            <p>Our website uses cookies and web beacons to enhance your user experience, track site usage, and analyze the effectiveness of our communication. You can manage cookie preferences through your browser settings.</p>
                            <div className="space20"></div>
                            <h5>Contact Information</h5>
                            <p>If you have any questions, concerns or complaints regarding our compliance with this notice, please contact us at sales@datamarketics.com.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PrivacyPolicy;
