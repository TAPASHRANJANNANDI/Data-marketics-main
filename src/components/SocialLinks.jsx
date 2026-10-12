import React from 'react';
import { SOCIAL_LINKS } from '../data/social';

// Row of circular social media buttons.
// variant: 'footer' (on the dark footer) or 'header' (on light backgrounds).
// headerOnly: show only the profiles flagged for the top navigation.
const SocialLinks = ({ variant = 'footer', headerOnly = false, className = '' }) => {
    const links = SOCIAL_LINKS.filter(link => link.url && (!headerOnly || link.header));
    if (!links.length) return null;

    return (
        <div className={`dm-social dm-social-${variant} ${className}`.trim()} role="group" aria-label="Data Marketics on social media">
            {links.map(link => (
                <a
                    key={link.id}
                    href={link.url}
                    className="dm-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Data Marketics on ${link.label} (opens in a new tab)`}
                    title={link.label}
                >
                    <i className={`fa-brands ${link.icon}`} aria-hidden="true"></i>
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;
