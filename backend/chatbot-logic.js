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
const fuseOptions = {
    keys: ['normalizedQuestion', 'question'],
    threshold: 0.45, // Balanced: tolerates typos/paraphrasing without matching unrelated overlap
    includeScore: true,
    distance: 100,
    location: 0,
    minMatchCharLength: 2
};

const HELPFUL_FALLBACK = "I apologize — I was not able to find a direct answer to your question. I would be happy to help with the following topics:\n• Our services (ABM, intent data, event intelligence, demand generation)\n• Pricing and how to schedule a discovery call\n• Data accuracy, GDPR compliance, and delivery formats\n• The industries we serve and how we compare to other providers\n\nFor a personalised response, please contact our team at sales@datamarketics.com or +1 (281) 789-6642.";

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
            fallback: HELPFUL_FALLBACK
        };
    }

    const topMatch = filteredResults[0];

    // Confidence threshold (Fuse score: lower is better). Aligned with the fuse threshold.
    const isConfident = topMatch.score <= 0.45;

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
