// Post-build check that the pre-rendered output actually works.
//
// Serves dist/ the way nginx and .htaccess do — one pre-rendered page per
// route, a real 404, the legacy redirects — and drives it with a headless
// browser to confirm that:
//
//   - every route answers 200 with its content already in the HTML
//   - React hydrates that HTML without errors or mismatches
//   - each page has exactly one <h1>, visible after hydration
//   - an unknown URL returns a genuine 404, not the homepage
//
// Not part of `npm run build`: it needs a headless browser, which the
// Docker build has no reason to download. Run it before a deploy with:
//
//   npm i -D puppeteer && npm run verify
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const DIST = path.resolve('dist');
const PORT = 5199;
const BASE = `http://127.0.0.1:${PORT}`;

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
    '.mp4': 'video/mp4',
    '.json': 'application/json',
};

const REDIRECTS = {
    '/about.html': '/about-us',
    '/about': '/about-us',
    '/features.html': '/features',
    '/privacy-policy.html': '/privacy-policy',
    '/index.html': '/',
};

const send = (res, status, body, type) => {
    res.writeHead(status, { 'content-type': type });
    res.end(body);
};

const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);

    if (REDIRECTS[url]) {
        res.writeHead(301, { location: REDIRECTS[url] });
        return res.end();
    }

    const candidates = url === '/'
        ? [path.join(DIST, 'index.html')]
        : [path.join(DIST, url), path.join(DIST, url, 'index.html')];

    for (const file of candidates) {
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            return send(res, 200, fs.readFileSync(file), TYPES[path.extname(file)] || 'application/octet-stream');
        }
    }

    // No SPA fallback: exactly what nginx/.htaccess now do.
    return send(res, 404, fs.readFileSync(path.join(DIST, '404.html')), TYPES['.html']);
});

await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const failures = [];

const ROUTES = ['/', '/about-us', '/services', '/b2b-lead-generation', '/contact', '/blog', '/blog/how-to-choose-a-b2b-data-provider', '/industries/healthcare'];

for (const route of ROUTES) {
    const page = await browser.newPage();
    const errors = [];

    page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
    page.on('console', msg => {
        const text = msg.text();
        if (msg.type() === 'error' || /hydrat|did not match|Minified React error/i.test(text)) {
            errors.push(`console.${msg.type()}: ${text}`);
        }
    });

    const response = await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 45000 });
    await new Promise(r => setTimeout(r, 1500));

    const result = await page.evaluate(() => {
        const root = document.getElementById('root');
        const h1 = document.querySelector('h1');
        const style = h1 && getComputedStyle(h1);
        return {
            status: document.title,
            rootChildren: root ? root.childElementCount : 0,
            h1Text: h1 ? h1.innerText.trim().slice(0, 60) : null,
            h1Opacity: style ? style.opacity : null,
            h1Count: document.querySelectorAll('h1').length,
            anchors: document.querySelectorAll('a[href]').length,
            bodyChars: document.body.innerText.replace(/\s+/g, ' ').trim().length,
        };
    });

    const row = `${route} -> HTTP ${response.status()} | h1 "${result.h1Text}" (x${result.h1Count}, opacity ${result.h1Opacity}) | ${result.anchors} links | ${result.bodyChars} chars`;
    console.log(row);

    if (response.status() !== 200) failures.push(`${route}: HTTP ${response.status()}`);
    if (!result.h1Text) failures.push(`${route}: no visible h1 after hydration`);
    if (result.h1Count !== 1) failures.push(`${route}: ${result.h1Count} h1 elements (expected exactly 1)`);
    if (result.bodyChars < 500) failures.push(`${route}: only ${result.bodyChars} characters visible after hydration`);
    if (result.h1Opacity !== null && Number(result.h1Opacity) < 0.9) {
        failures.push(`${route}: h1 still at opacity ${result.h1Opacity} after hydration`);
    }
    for (const e of errors) failures.push(`${route}: ${e}`);

    await page.close();
}

// Unknown URL must be a real 404 carrying the 404 page.
{
    const page = await browser.newPage();
    const response = await page.goto(BASE + '/this-page-does-not-exist-xyz', { waitUntil: 'networkidle0' });
    const title = await page.title();
    console.log(`/this-page-does-not-exist-xyz -> HTTP ${response.status()} | "${title}"`);
    if (response.status() !== 404) failures.push(`unknown URL returned ${response.status()}, expected 404`);
    if (!/not found/i.test(title)) failures.push(`unknown URL title was "${title}"`);
    await page.close();
}

await browser.close();
server.close();

if (failures.length) {
    console.log(`\n${failures.length} FAILURE(S):`);
    for (const f of failures) console.log('  - ' + f);
    process.exit(1);
}

console.log('\nAll checks passed.');
