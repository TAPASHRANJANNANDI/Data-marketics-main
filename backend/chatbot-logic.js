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

// 2. Normalization Logic (from CHATBOT.md)
const BRAND_STRIP = /\b(datamarketics|data marketics|marketics)\b/gi;

function normalize(text) {
    if (!text) return "";
    // Strip brand tokens, remove punctuation, and lowercase
    let out = text.replace(BRAND_STRIP, "");
    out = out.replace(/[^\w\s]/gi, "");
    return out.trim().toLowerCase();
}

// 3. Pre-process FAQ for better matching
// We store the normalized version of the question for the search
const searchCorpus = faq.map(entry => ({
    ...entry,
    normalizedQuestion: normalize(entry.question)
}));

// 4. Initialize Fuse.js
const fuseOptions = {
    keys: ['normalizedQuestion', 'question'],
    threshold: 0.4, // Threshold for fuzzy matching (0.0 = perfect match, 1.0 = match anything)
    includeScore: true,
    distance: 100,
    location: 0
};

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

    // Perform the search
    const results = fuse.search(normalizedQuery);
    
    // Filter out excluded items
    const filteredResults = results.filter(res => !exclude.includes(res.item.question));

    if (filteredResults.length === 0) {
        return {
            confident: false,
            matches: [],
            fallback: "I'm not sure about that. Would you like to contact our sales team at sales@datamarketics.com?"
        };
    }

    const topMatch = filteredResults[0];
    
    // Confidence threshold (Fuse score: lower is better)
    // 0.4 is a good balance for spelling mistakes vs random noise
    const isConfident = topMatch.score <= 0.45;

    if (!isConfident) {
        return {
            confident: false,
            matches: filteredResults.slice(0, 2).map(r => r.item),
            fallback: "I'm not entirely sure, but here is what I found. If this doesn't help, feel free to email support@datamarketics.com."
        };
    }

    return {
        confident: true,
        matches: filteredResults.slice(0, 3).map(r => r.item),
        bestMatch: topMatch.item
    };
}
