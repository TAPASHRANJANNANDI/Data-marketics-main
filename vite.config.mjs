import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { SOCIAL_URLS } from './src/data/social.js';

// Fills the Organization schema's "sameAs" in index.html from the shared
// social profile list, so the icons and the schema can never drift apart.
const socialSameAs = () => ({
    name: 'dm-social-same-as',
    transformIndexHtml(html) {
        const token = '"__SOCIAL_SAME_AS__"';
        if (!html.includes(token)) {
            throw new Error('index.html: the "sameAs" placeholder for the Organization schema is missing');
        }
        return html.replace(token, JSON.stringify(SOCIAL_URLS));
    },
});

export default defineConfig({
    base: '/',
    plugins: [react(), socialSameAs()],
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
