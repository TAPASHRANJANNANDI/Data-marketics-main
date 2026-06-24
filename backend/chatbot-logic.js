import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load the FAQ
const FAQ_PATH = path.resolve(__dirname, './data/faq.json');
let faq = [];
try {
    const rawData = fs.readFileSync(FAQ_PATH, 'utf-8');
    faq = JSON.parse(rawData);
} catch (err) {
    console.error("❌ Failed to load faq.json:", err);
}

// 2. Normalization Logic
function normalize(text) {
    if (!text) return "";
    // Remove punctuation and lowercase. Brand tokens are kept so questions like
    // "Tell me about Data Marketics" retain enough signal to match company entries.
    let out = text.replace(/[^\w\s]/gi, "");
    return out.trim().toLowerCase();
}

// 3. Pre-process FAQ for better matching
// We store the normalized version of the question for the search
const searchCorpus = faq.map(entry => ({
    ...entry,
    normalizedQuestion: normalize(entry.question)
}));

// 4. Initialize Fuse.js
// Tightened threshold: 0.3 instead of 0.5 avoids weak substring matches
// (e.g. "hi" matching the middle of "tecHnograpHIc"). minMatchCharLength
// raised to 3 so single short tokens can't dominate a fuzzy score.
const fuseOptions = {
    keys: ['normalizedQuestion'],
    threshold: 0.3,
    includeScore: true,
    distance: 100,
    ignoreLocation: true,
    minMatchCharLength: 3
};

const HELPFUL_FALLBACK = "For specific questions our knowledge base does not directly cover, please contact our team:\n• Email: sales@datamarketics.com\n• Phone: +1 (609) 322-2666\n\nI can also answer questions about our services, pricing, data accuracy, compliance, delivery process, or industries we serve — please feel free to rephrase or ask about one of these topics.";

const fuse = new Fuse(searchCorpus, fuseOptions);

/**
 * Main function to ask the chatbot
 * @param {string} query - The user's question
 * @param {string[]} exclude - List of recently shown questions to avoid repetition
 */
export function askChatbot(query, exclude = []) {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
        return {
            confident: false,
            matches: [],
            fallback: "I'm sorry, could you please rephrase that?"
        };
    }

    // Skip fuzzy search for very short queries: a 2-char query like "hi" can
    // confidently substring-match unrelated tokens via Fuse.
    if (normalizedQuery.length < 4) {
        return {
            confident: false,
            matches: [],
            fallback: HELPFUL_FALLBACK
        };
    }

    // Perform the search
    const results = fuse.search(normalizedQuery);

    // Filter out excluded items
    const filteredResults = results.filter(res => !exclude.includes(res.item.question));

    if (filteredResults.length === 0) {
        return {
            confident: false,
            matches: [],
            fallback: HELPFUL_FALLBACK
        };
    }

    const topMatch = filteredResults[0];

    // Confidence threshold (Fuse score: lower is better). Aligned with the fuse threshold.
    const isConfident = topMatch.score <= 0.3;

    if (!isConfident) {
        return {
            confident: false,
            matches: filteredResults.slice(0, 3).map(r => r.item),
            fallback: HELPFUL_FALLBACK
        };
    }

    return {
        confident: true,
        matches: filteredResults.slice(0, 3).map(r => r.item),
        bestMatch: topMatch.item
    };
}
