import React from 'react';
import ReactDOM from 'react-dom/client';
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
