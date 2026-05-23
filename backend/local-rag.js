import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FAQ_PATH = path.resolve(__dirname, './data/faq.json');

const STOPWORDS = new Set([
    'a','an','the','is','are','was','were','be','been','being','have','has','had',
    'do','does','did','i','me','my','we','us','our','you','your','he','she','it',
    'they','them','their','this','that','these','those','to','of','in','on','at',
    'for','with','by','from','about','as','what','which','who','whom','how','why',
    'when','where','can','could','should','would','will','shall','may','might','must',
    'and','or','but','if','then','so','than','because','please','tell','give','show',
    'know','let','am'
]);

const SYNONYMS = {
    'phone': ['phone', 'number', 'call', 'telephone', 'mobile', 'cell', 'dial', 'contact'],
    'number': ['number', 'phone', 'contact'],
    'contact': ['contact', 'reach', 'phone', 'email'],
    'email': ['email', 'mail', 'address'],
    'address': ['address', 'location', 'office', 'headquarters'],
    'location': ['location', 'address', 'office', 'headquarters', 'situated'],
    'cost': ['cost', 'price', 'pricing', 'fee', 'rate', 'expensive', 'cheap', 'budget'],
    'price': ['price', 'cost', 'pricing', 'fee', 'rate', 'quote'],
    'pricing': ['pricing', 'price', 'cost', 'fee', 'plans'],
    'gdpr': ['gdpr', 'compliance', 'compliant', 'regulation', 'privacy'],
    'ccpa': ['ccpa', 'compliance', 'compliant', 'california', 'privacy'],
    'company': ['company', 'business', 'organization', 'firm', 'about'],
    'service': ['service', 'services', 'offering', 'product', 'solution', 'offer'],
    'data': ['data', 'database', 'information', 'records'],
    'lead': ['lead', 'leads', 'prospect', 'prospects'],
    'free': ['free', 'trial', 'demo', 'sample', 'complimentary'],
    'trial': ['trial', 'free', 'demo', 'pilot'],
    'demo': ['demo', 'demonstration', 'trial', 'preview', 'walkthrough'],
    'discount': ['discount', 'cheap', 'deal', 'offer', 'promo'],
    'crm': ['crm', 'salesforce', 'hubspot', 'integration'],
    'tech': ['tech', 'technology', 'technographic', 'stack'],
    'industry': ['industry', 'sector', 'vertical', 'niche'],
    'healthcare': ['healthcare', 'health', 'medical', 'hospital', 'pharma'],
    'fintech': ['fintech', 'finance', 'banking', 'financial'],
    'saas': ['saas', 'software', 'tech', 'technology'],
    'accuracy': ['accuracy', 'accurate', 'verified', 'quality', 'precise'],
    'verify': ['verify', 'verified', 'validation', 'verification', 'check'],
    'safe': ['safe', 'secure', 'safety', 'security', 'protection'],
    'goodbye': ['bye', 'goodbye', 'farewell', 'see you', 'later'],
    'hello': ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening']
};

function tokenize(text) {
    if (!text) return [];
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length >= 2 && !STOPWORDS.has(t));
}

function expandSynonyms(tokens) {
    const expanded = new Set(tokens);
    for (const tok of tokens) {
        if (SYNONYMS[tok]) SYNONYMS[tok].forEach(s => expanded.add(s));
    }
    return Array.from(expanded);
}

const documents = [];
const idf = new Map();
let ready = false;

function buildIDF() {
    const docFreq = new Map();
    for (const doc of documents) {
        const unique = new Set(doc.tokens);
        for (const tok of unique) docFreq.set(tok, (docFreq.get(tok) || 0) + 1);
    }
    const N = documents.length;
    for (const [tok, df] of docFreq) {
        idf.set(tok, Math.log((N + 1) / (df + 1)) + 1);
    }
}

function tfidfVector(tokens) {
    const tf = new Map();
    for (const tok of tokens) tf.set(tok, (tf.get(tok) || 0) + 1);
    const vector = new Map();
    let norm = 0;
    for (const [tok, count] of tf) {
        const w = (count / tokens.length) * (idf.get(tok) || Math.log((documents.length + 1) / 1) + 1);
        vector.set(tok, w);
        norm += w * w;
    }
    return { vector, norm: Math.sqrt(norm) || 1 };
}

function cosine(a, b) {
    let dot = 0;
    const [smaller, larger] = a.vector.size < b.vector.size ? [a.vector, b.vector] : [b.vector, a.vector];
    for (const [tok, w] of smaller) {
        const lw = larger.get(tok);
        if (lw !== undefined) dot += w * lw;
    }
    return dot / (a.norm * b.norm);
}

export async function initLocalRag() {
    console.log('🚀 Building TF-IDF index over FAQ...');
    const raw = fs.readFileSync(FAQ_PATH, 'utf-8');
    const faq = JSON.parse(raw);

    for (const entry of faq) {
        const baseTokens = tokenize(entry.question);
        const tokens = expandSynonyms(baseTokens);
        documents.push({ entry, tokens });
    }
    buildIDF();
    for (const doc of documents) {
        doc.tfidf = tfidfVector(doc.tokens);
    }
    console.log(`✅ TF-IDF index built: ${documents.length} entries, ${idf.size} terms`);
    ready = true;
}

export function isLocalRagReady() {
    return ready;
}

export async function searchFaq(query, topK = 3) {
    if (!ready) throw new Error('Local RAG not initialised');
    const queryTokens = expandSynonyms(tokenize(query));
    if (queryTokens.length === 0) return [];
    const queryVec = tfidfVector(queryTokens);

    const scored = documents.map(doc => ({
        question: doc.entry.question,
        answer: doc.entry.answer,
        category: doc.entry.category,
        similarity: cosine(queryVec, doc.tfidf)
    }));
    scored.sort((a, b) => b.similarity - a.similarity);
    return scored.slice(0, topK);
}
