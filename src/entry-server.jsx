// Server entry used only by `scripts/prerender.mjs` at build time.
//
// Google indexes what the initial HTML contains. The client entry
// (`main.jsx`) renders into an empty <div id="root">, so without this step
// crawlers receive meta tags and nothing else — no H1, no body copy, no
// links to follow. Rendering every route to static HTML here fixes that
// while keeping the app a plain Vite SPA.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

export function render(url) {
    return renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );
}
