// The service pages, with the short copy used wherever one service is linked
// from another page. One list so the label of a service never drifts between
// the footer, a blog post and a sibling service page.
export const SERVICES = {
    '/b2b-lead-generation': {
        label: 'B2B Lead Generation',
        blurb: 'Qualified, verified leads that match your ideal customer profile.',
    },
    '/demand-generation': {
        label: 'Demand Generation',
        blurb: 'Build awareness and interest before prospects are ready to buy.',
    },
    '/data-enrichment': {
        label: 'Data Enrichment',
        blurb: 'Fill the gaps in your CRM and keep existing records accurate.',
    },
    '/intent-data': {
        label: 'Intent Data',
        blurb: 'Find the accounts already researching what you sell.',
    },
    '/technographic-data': {
        label: 'Technographic Data',
        blurb: 'Target accounts by the technology they actually run.',
    },
    '/appointment-setting': {
        label: 'Appointment Setting',
        blurb: 'Qualified meetings booked directly into your sales calendar.',
    },
    '/exhibitors-data': {
        label: 'Exhibitors Data',
        blurb: 'Attendee and exhibitor lists from the events your buyers attend.',
    },
};

export const serviceLabel = path => SERVICES[path]?.label ?? path;
