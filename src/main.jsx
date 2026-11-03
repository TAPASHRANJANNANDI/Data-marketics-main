import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Import vendor + theme CSS first so our overrides win
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome.css';
import './assets/css/magnific-popup.css';
import './assets/css/nice-select.css';
import './assets/css/slick-slider.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/aos.css';
import './assets/css/mobile-menu.css';
import './assets/css/main.css';
import './assets/css/responsive-fixes.css';

// Gradient design system — loaded last so it can override the legacy theme
import './index.css';

const container = document.getElementById('root');

const app = (
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// `npm run build` pre-renders every route into #root (scripts/prerender.mjs),
// so in production there is already markup to adopt. Hydrating reuses it
// instead of discarding and re-painting the whole page. In dev — and if the
// pre-render step is ever skipped — #root is empty, so fall back to a plain
// client render.
if (container.hasChildNodes()) {
    hydrateRoot(container, app);
} else {
    createRoot(container).render(app);
}
