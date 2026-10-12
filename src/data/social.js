// Official Data Marketics social media profiles — the single source of truth.
//
// Used by the header and footer icons (components/SocialLinks.jsx) and, at
// build time, by the Organization schema's "sameAs" in index.html (see
// vite.config.mjs). Only add a profile here once its URL is confirmed as an
// official company page; an entry without a URL is not rendered anywhere.
//
// `icon` is a Font Awesome brands class; `header` marks the profiles that also
// appear in the top navigation.
export const SOCIAL_LINKS = [
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/datamarketics-b2b-data-solutions-b1152b425/', icon: 'fa-linkedin-in', header: true },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/data_marketics/', icon: 'fa-instagram', header: false },
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61592564615834', icon: 'fa-facebook-f', header: true },
    { id: 'pinterest', label: 'Pinterest', url: 'https://in.pinterest.com/Data_marketics/', icon: 'fa-pinterest-p', header: false },
];

export const SOCIAL_URLS = SOCIAL_LINKS.filter(link => link.url).map(link => link.url);
