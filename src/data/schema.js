// JSON-LD structured data (https://schema.org) for the public pages.
//
// The Organization and WebSite nodes live in index.html so every page carries
// them, including before JavaScript runs. Pages reference them here by @id and
// add their own WebPage / BreadcrumbList / Service / FAQPage nodes.

export const SITE_URL = 'https://datamarketics.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

// One entry per indexable static route. `name` is the page's short name as
// used in the site navigation; `parent` builds the breadcrumb trail; `service`
// marks pages that describe a service the company offers.
const PAGES = {
    '/': { name: 'Home' },
    '/about-us': { name: 'About Us', type: 'AboutPage' },
    '/features': { name: 'Features' },
    '/services': { name: 'Services', type: 'CollectionPage' },
    '/contact': { name: 'Contact Us', type: 'ContactPage' },
    '/demand-generation': { name: 'Demand Generation', parent: '/services', service: true },
    '/b2b-lead-generation': { name: 'B2B Lead Generation', parent: '/services', service: true },
    '/data-enrichment': { name: 'Data Enrichment Services', parent: '/services', service: true },
    '/intent-data': { name: 'Intent Data Solutions', parent: '/services', service: true },
    '/appointment-setting': { name: 'Appointment Setting', parent: '/services', service: true },
    '/exhibitors-data': { name: 'Exhibitors Data', parent: '/services', service: true },
    '/technographic-data': { name: 'Technographic Data', service: true },
    '/industries/finance': { name: 'Finance Industry' },
    '/industries/healthcare': { name: 'Healthcare Industry' },
    '/industries/manufacturing': { name: 'Manufacturing Industry' },
    '/industries/saas': { name: 'SaaS Industry' },
    '/industries/technology': { name: 'Technology Industry' },
    '/blog': { name: 'Blog', type: 'CollectionPage' },
    '/sitemap': { name: 'Sitemap' },
    '/privacy-policy': { name: 'Privacy Policy' },
};

const absolute = path => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

// items: [{ name, path }] ordered from the homepage down to the current page.
export const breadcrumbNode = (items, id) => ({
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absolute(item.path),
    })),
});

// faqs: [{ q, a }] — must be the same questions and answers shown on the page.
export const faqNode = (faqs, id) => ({
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
    })),
});

const trail = path => {
    const page = PAGES[path];
    const up = page.parent ? trail(page.parent) : [{ name: 'Home', path: '/' }];
    return [...up, { name: page.name, path }];
};

// Returns the JSON-LD string for a static page, ready for a
// <script type="application/ld+json"> tag inside <Helmet>.
export const pageSchema = (path, { faqs } = {}) => {
    const page = PAGES[path];
    const url = absolute(path);
    const webPage = {
        '@type': page.type || 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.name,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        inLanguage: 'en',
    };
    const graph = [webPage];

    if (path !== '/') {
        webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
        graph.push(breadcrumbNode(trail(path), `${url}#breadcrumb`));
    }
    if (page.service) {
        webPage.mainEntity = { '@id': `${url}#service` };
        graph.push({
            '@type': 'Service',
            '@id': `${url}#service`,
            name: page.name,
            serviceType: page.name,
            url,
            provider: { '@id': ORG_ID },
        });
    }
    if (faqs && faqs.length) {
        graph.push(faqNode(faqs, `${url}#faq`));
    }

    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
};
