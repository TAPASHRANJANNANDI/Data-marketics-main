// Build-time pre-rendering.
//
// `vite build` produces the client bundle plus one <head>-only index.html per
// route (see the `dm-page-specific-seo-html` plugin in vite.config.mjs). That
// gave crawlers correct meta tags but an empty <div id="root">, so Google,
// Bing, AI search tools and social previews saw no headings, no body copy and
// no links — which is why most pages were never indexed.
//
// This script builds a server bundle of the same React app, renders every
// route to HTML, and writes that HTML inside <div id="root"> of the matching
// file. View Page Source then shows the real page, and main.jsx hydrates the
// markup instead of throwing it away.
//
// Run by `npm run build` (vite build && node scripts/prerender.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = path.join(ROOT, 'dist');
const SSR_DIST = path.join(ROOT, '.ssr-build');

const ROOT_MARKER = '<div id="root"></div>';

// Below this much visible text a page is effectively still blank, which is
// the whole problem this script exists to fix.
const MIN_TEXT_CHARS = 400;

// The header and footer navigation alone clear this comfortably. Below it,
// something has failed to render and the page is a crawl dead end.
const MIN_LINKS = 20;

const fail = (message) => {
    console.error(`\nPre-render failed: ${message}\n`);
    process.exit(1);
};

// dist/index.html -> "/", dist/about-us/index.html -> "/about-us",
// dist/404.html -> "/404", which resolves to the catch-all route.
const routeForFile = (file) => {
    const relative = path.relative(DIST, file).split(path.sep).join('/');
    if (relative === 'index.html') return '/';
    if (relative === '404.html') return '/404';

    const match = /^(.+)\/index\.html$/.exec(relative);
    if (!match) fail(`cannot derive a route from ${relative}`);
    return `/${match[1]}`;
};

// Every page the SEO plugin generated: dist/index.html, dist/404.html and one
// dist/<route>/index.html per route. Discovered from disk so a newly added
// page is picked up automatically and cannot silently ship without content.
const generatedPages = (dir = DIST) => {
    const pages = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === 'assets') continue;
            pages.push(...generatedPages(full));
        } else if (entry.name === 'index.html' || entry.name === '404.html') {
            pages.push({ route: routeForFile(full), file: full });
        }
    }

    return pages;
};

const buildServerBundle = async () => {
    console.log('\nBuilding server bundle for pre-rendering...');

    await build({
        configFile: path.join(ROOT, 'vite.config.mjs'),
        logLevel: 'warn',
        build: {
            ssr: path.join(ROOT, 'src', 'entry-server.jsx'),
            outDir: SSR_DIST,
            emptyOutDir: true,
            // The client build already emitted every asset under the same
            // content-hashed name, so they must not be written twice.
            ssrEmitAssets: false,
            copyPublicDir: false,
        },
    });

    const entry = path.join(SSR_DIST, 'entry-server.js');
    if (!fs.existsSync(entry)) fail(`server bundle missing at ${entry}`);
    return entry;
};

// Asset URLs are content-hashed, so the client and server builds normally
// agree on filenames. Verify rather than assume: a mismatch would ship <img>
// tags that 404 on every pre-rendered page.
const missingAssets = (html, route) => {
    const missing = new Set();

    for (const [, url] of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
        const file = path.join(DIST, url.replace(/^\//, '').split('/').join(path.sep));
        if (!fs.existsSync(file)) missing.add(url);
    }

    return [...missing].map(url => `${route} references a missing asset: ${url}`);
};

const visibleText = html =>
    html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const main = async () => {
    if (!fs.existsSync(DIST)) fail('dist/ not found — run `vite build` first');

    const entry = await buildServerBundle();
    const { render } = await import(pathToFileURL(entry).href);

    const targets = generatedPages();
    if (!targets.length) fail('dist/ contains no generated pages');

    const problems = [];

    for (const { route, file } of targets) {
        const template = fs.readFileSync(file, 'utf8');

        if (!template.includes(ROOT_MARKER)) {
            fail(`${path.relative(ROOT, file)} has no ${ROOT_MARKER} to render into`);
        }

        let body;
        try {
            body = render(route);
        } catch (error) {
            fail(`rendering ${route} threw: ${error.stack || error.message}`);
        }

        const text = visibleText(body);
        const headings = (body.match(/<h1[\s>]/gi) || []).length;
        const links = (body.match(/<a\s[^>]*href=/gi) || []).length;

        if (text.length < MIN_TEXT_CHARS) {
            problems.push(`${route} rendered only ${text.length} characters of text`);
        }
        if (headings !== 1) {
            problems.push(`${route} rendered ${headings} <h1> elements (expected exactly 1)`);
        }
        if (links < MIN_LINKS) {
            problems.push(`${route} rendered only ${links} links (expected at least ${MIN_LINKS})`);
        }
        problems.push(...missingAssets(body, route));

        fs.writeFileSync(file, template.replace(ROOT_MARKER, `<div id="root">${body}</div>`));
        console.log(`Pre-rendered ${route} (${text.length} chars of text)`);
    }

    fs.rmSync(SSR_DIST, { recursive: true, force: true });

    if (problems.length) {
        fail(`${problems.length} page(s) did not render correctly:\n  - ${problems.join('\n  - ')}`);
    }

    console.log(`\nPre-rendered ${targets.length} pages with full HTML content.\n`);
};

await main();
