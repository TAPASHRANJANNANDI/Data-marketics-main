// Generates a 1200x630 Open Graph image per static page, into public/og/.
//
// Every page used to share the same og-banner.png, so a link to the intent
// data page and a link to the homepage looked identical in a LinkedIn feed.
// Each page now gets a card carrying its own name.
//
// Not part of `npm run build`: the PNGs are committed, so the build needs no
// native image dependency. Re-run after adding a page or changing a title:
//
//   npm i -D sharp && node scripts/generate-og-images.mjs
//
// vite.config.mjs points each page's og:image at public/og/<slug>.png when
// the file exists, and falls back to og-banner.png when it does not.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT = path.join(ROOT, 'public', 'og');

const WIDTH = 1200;
const HEIGHT = 630;

// Faces that actually exist on a machine running this script. The site's own
// Figtree is a webfont the rasteriser cannot see.
const FONT = "'Segoe UI','DejaVu Sans',Arial,Helvetica,sans-serif";

// One card per page: the headline, and a line of supporting copy. Keyed by
// route, and converted to a filename by `slugFor` below.
const CARDS = {
    '/': ['B2B Data & Lead Generation', 'Verified contact data and qualified pipeline for B2B teams.'],
    '/about-us': ['About Data Marketics', 'Six years helping businesses reach the right decision-makers.'],
    '/features': ['Platform Features', 'What our data, targeting and delivery actually give you.'],
    '/services': ['Our Services', 'Lead generation, demand generation, enrichment and intent data.'],
    '/contact': ['Contact Data Marketics', 'Tell us your target market and we will send a sample.'],
    '/blog': ['Data Marketics Blog', 'Practical guides on B2B data, prospecting and pipeline growth.'],
    '/privacy-policy': ['Privacy Policy', 'How we collect, use and protect information.'],

    '/b2b-lead-generation': ['B2B Lead Generation', 'Qualified leads that match your ideal customer profile.'],
    '/demand-generation': ['Demand Generation', 'Build awareness and interest before buyers are ready.'],
    '/data-enrichment': ['Data Enrichment', 'Fill the gaps in your CRM and keep records accurate.'],
    '/intent-data': ['Intent Data', 'Find the accounts already researching what you sell.'],
    '/technographic-data': ['Technographic Data', 'Target accounts by the technology they actually run.'],
    '/appointment-setting': ['Appointment Setting', 'Qualified meetings booked into your sales calendar.'],
    '/exhibitors-data': ['Exhibitors Data', 'Attendee and exhibitor lists from the events buyers attend.'],

    '/industries/technology': ['Technology Industry Data', 'Reach IT and engineering decision-makers.'],
    '/industries/healthcare': ['Healthcare Industry Data', 'Reach providers, payers and health system buyers.'],
    '/industries/finance': ['Finance Industry Data', 'Reach finance, banking and insurance decision-makers.'],
    '/industries/manufacturing': ['Manufacturing Industry Data', 'Reach plant, operations and procurement leaders.'],
    '/industries/saas': ['SaaS Industry Data', 'Reach software buyers and product decision-makers.'],
};

export const slugFor = route =>
    route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');

const escapeXml = value =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

// Greedy wrap. The card is 1200px wide with 90px gutters, and the headline
// renders at roughly 0.52em per character, so ~24 characters fits a line.
const wrap = (text, perLine) => {
    const lines = [];
    let current = '';

    for (const word of text.split(' ')) {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > perLine && current) {
            lines.push(current);
            current = word;
        } else {
            current = candidate;
        }
    }

    if (current) lines.push(current);
    return lines;
};

const card = (headline, tagline) => {
    const lines = wrap(headline, 24);
    // Keep the block vertically centred however many lines it runs to.
    const size = lines.length > 2 ? 54 : 64;
    const step = size * 1.18;
    const top = 300 - ((lines.length - 1) * step) / 2;

    const headlineTspans = lines
        .map((line, i) =>
            `<tspan x="90" y="${Math.round(top + i * step)}">${escapeXml(line)}</tspan>`
        )
        .join('\n      ');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#042f2e"/>
      <stop offset="55%" stop-color="#0d7377"/>
      <stop offset="100%" stop-color="#14b8a6"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="22%" r="58%">
      <stop offset="0%" stop-color="#99f6e4" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#99f6e4" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#ccfbf1" fill-opacity="0.10"/>
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <text x="90" y="118" fill="#5eead4" font-family="${FONT}" font-weight="700" font-size="20" letter-spacing="4.5">DATA MARKETICS</text>
  <rect x="90" y="140" width="92" height="5" rx="2.5" fill="#fcd34d"/>

  <text fill="#ffffff" font-family="${FONT}" font-weight="800" font-size="${size}" letter-spacing="-1">
      ${headlineTspans}
  </text>

  <text x="90" y="${Math.round(top + lines.length * step + 18)}" fill="#ccfbf1" font-family="${FONT}" font-weight="500" font-size="26" opacity="0.92">${escapeXml(tagline)}</text>

  <text x="90" y="560" fill="#99f6e4" font-family="${FONT}" font-weight="600" font-size="22" opacity="0.85">datamarketics.com</text>

  <g opacity="0.5" stroke="#ccfbf1" stroke-width="2" fill="none">
    <circle cx="1010" cy="430" r="110"/>
    <circle cx="1010" cy="430" r="72"/>
    <circle cx="1010" cy="430" r="34"/>
  </g>
  <circle cx="1010" cy="430" r="12" fill="#fcd34d"/>
</svg>`;
};

let sharp;
try {
    ({ default: sharp } = await import('sharp'));
} catch {
    console.error(
        '\nsharp is not installed. It is only needed to regenerate these images:\n' +
        '  npm i -D sharp && node scripts/generate-og-images.mjs\n'
    );
    process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });

for (const [route, [headline, tagline]] of Object.entries(CARDS)) {
    const file = path.join(OUT, `${slugFor(route)}.png`);

    await sharp(Buffer.from(card(headline, tagline)))
        .png({ compressionLevel: 9 })
        .toFile(file);

    console.log(`${route} -> og/${path.basename(file)}`);
}

console.log(`\nGenerated ${Object.keys(CARDS).length} Open Graph images at ${WIDTH}x${HEIGHT}.\n`);
