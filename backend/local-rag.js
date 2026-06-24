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
    'contact': ['contact', 'reach', 'phone', 'email', 'support'],
    'reach': ['reach', 'contact', 'get'],
    'email': ['email', 'mail', 'address'],
    'address': ['address', 'location', 'office', 'headquarters', 'based', 'located'],
    'location': ['location', 'address', 'office', 'headquarters', 'situated', 'based', 'located'],
    'based': ['based', 'located', 'situated', 'headquartered', 'office', 'address', 'location', 'headquarters'],
    'located': ['located', 'based', 'situated', 'headquartered', 'office', 'address', 'location'],
    'headquartered': ['headquartered', 'based', 'located', 'office', 'address', 'headquarters'],
    'headquarters': ['headquarters', 'office', 'address', 'location', 'based', 'headquartered'],
    'office': ['office', 'address', 'headquarters', 'location', 'based'],
    'where': ['where', 'location', 'address', 'office'],
    'cost': ['cost', 'price', 'pricing', 'fee', 'rate', 'expensive', 'cheap', 'budget', 'quote'],
    'price': ['price', 'cost', 'pricing', 'fee', 'rate', 'quote'],
    'pricing': ['pricing', 'price', 'cost', 'fee', 'plans', 'quote', 'rate'],
    'quote': ['quote', 'pricing', 'price', 'cost', 'estimate'],
    'gdpr': ['gdpr', 'compliance', 'compliant', 'regulation', 'privacy'],
    'ccpa': ['ccpa', 'compliance', 'compliant', 'california', 'privacy'],
    'casl': ['casl', 'compliance', 'compliant', 'canada', 'privacy'],
    'compliance': ['compliance', 'compliant', 'gdpr', 'ccpa', 'casl', 'regulation', 'legal'],
    'company': ['company', 'business', 'organization', 'firm', 'about'],
    'ceo': ['ceo', 'founder', 'leadership', 'president', 'owner', 'executive', 'leader'],
    'founder': ['founder', 'ceo', 'leadership', 'owner', 'president'],
    'leadership': ['leadership', 'ceo', 'founder', 'owner', 'president', 'executive', 'team'],
    'service': ['service', 'services', 'offering', 'product', 'solution', 'offer'],
    'offer': ['offer', 'service', 'provide', 'have'],
    'provide': ['provide', 'offer', 'service', 'have', 'supply'],
    'data': ['data', 'database', 'information', 'records', 'list'],
    'lead': ['lead', 'leads', 'prospect', 'prospects'],
    'free': ['free', 'trial', 'demo', 'sample', 'complimentary'],
    'trial': ['trial', 'free', 'demo', 'pilot'],
    'demo': ['demo', 'demonstration', 'trial', 'preview', 'walkthrough'],
    'sample': ['sample', 'free', 'demo', 'trial', 'example'],
    'discount': ['discount', 'cheap', 'deal', 'offer', 'promo', 'bulk'],
    'bulk': ['bulk', 'volume', 'enterprise', 'discount', 'large'],
    'enterprise': ['enterprise', 'bulk', 'volume', 'large'],
    'crm': ['crm', 'salesforce', 'hubspot', 'integration', 'marketo', 'pardot'],
    'integration': ['integration', 'integrate', 'crm', 'sync', 'connect', 'api'],
    'api': ['api', 'integration', 'programmatic', 'endpoint', 'webhook', 'rest'],
    'tech': ['tech', 'technology', 'technographic', 'stack'],
    'industry': ['industry', 'sector', 'vertical', 'niche', 'market'],
    'healthcare': ['healthcare', 'health', 'medical', 'hospital', 'pharma'],
    'fintech': ['fintech', 'finance', 'banking', 'financial'],
    'finance': ['finance', 'fintech', 'banking', 'financial'],
    'saas': ['saas', 'software', 'tech', 'technology'],
    'accuracy': ['accuracy', 'accurate', 'verified', 'quality', 'precise'],
    'verify': ['verify', 'verified', 'validation', 'verification', 'check'],
    'safe': ['safe', 'secure', 'safety', 'security', 'protection'],
    'goodbye': ['bye', 'goodbye', 'farewell', 'see you', 'later'],
    'hello': ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening'],
    'cover': ['cover', 'serve', 'support', 'include', 'available'],
    'serve': ['serve', 'cover', 'support', 'include', 'available'],
    'support': ['support', 'help', 'assist', 'service', 'serve'],
    'help': ['help', 'support', 'assist', 'aid'],
    'get': ['get', 'receive', 'obtain', 'find', 'access'],
    'want': ['want', 'need', 'looking', 'seek', 'require'],
    'need': ['need', 'want', 'require', 'looking'],
    'find': ['find', 'get', 'locate', 'see', 'access'],
    'hours': ['hours', 'time', 'timing', 'schedule', 'availability', 'open'],
    'time': ['time', 'hours', 'when', 'schedule'],
    'open': ['open', 'hours', 'availability'],
    'when': ['when', 'time', 'hours', 'schedule'],
    'format': ['format', 'csv', 'excel', 'xlsx', 'json', 'file', 'output'],
    'csv': ['csv', 'excel', 'xlsx', 'format', 'file'],
    'excel': ['excel', 'xlsx', 'csv', 'format', 'file'],
    'file': ['file', 'format', 'csv', 'excel', 'output'],
    'deliver': ['deliver', 'delivery', 'send', 'provide'],
    'delivery': ['delivery', 'deliver', 'send', 'turnaround'],
    'europe': ['europe', 'european', 'uk', 'germany', 'france', 'netherlands', 'eu'],
    'european': ['european', 'europe', 'eu', 'uk', 'germany'],
    'asia': ['asia', 'apac', 'india', 'japan', 'singapore', 'australia'],
    'apac': ['apac', 'asia', 'india', 'japan', 'singapore', 'australia'],
    'usa': ['usa', 'us', 'america', 'american', 'states', 'united'],
    'india': ['india', 'indian', 'asia', 'apac'],
    'global': ['global', 'worldwide', 'international', 'countries'],
    'started': ['started', 'start', 'begin', 'onboarding', 'first', 'new'],
    'start': ['start', 'started', 'begin', 'onboarding'],
    'onboarding': ['onboarding', 'started', 'start', 'begin', 'first'],
    'difference': ['difference', 'different', 'compare', 'versus', 'vs', 'compared'],
    'compare': ['compare', 'compared', 'difference', 'versus', 'vs'],
    'job': ['job', 'role', 'title', 'position'],
    'role': ['role', 'job', 'title', 'position'],
    'title': ['title', 'role', 'job', 'position'],
    'size': ['size', 'sized', 'smb', 'mid-market', 'enterprise', 'small', 'medium', 'large'],
    'small': ['small', 'smb', 'startup', 'size'],
    'large': ['large', 'enterprise', 'big', 'size'],
    'language': ['language', 'languages', 'multilingual', 'english'],
    'refund': ['refund', 'replacement', 'replace', 'money', 'back', 'guarantee'],
    'guarantee': ['guarantee', 'assurance', 'sla', 'promise'],
    'refresh': ['refresh', 'updated', 'update', 'frequency', 'recent', 'fresh'],
    'opt': ['opt', 'unsubscribe', 'remove', 'suppress', 'suppression'],
    'unsubscribe': ['unsubscribe', 'opt', 'remove', 'suppress'],
    'formats': ['formats', 'format', 'csv', 'excel', 'xlsx', 'json', 'file'],
    'sizes': ['sizes', 'size', 'smb', 'mid-market', 'enterprise', 'small', 'large'],
    'industries': ['industries', 'industry', 'sector', 'vertical', 'market'],
    'roles': ['roles', 'role', 'job', 'title', 'position'],
    'titles': ['titles', 'title', 'role', 'job', 'position'],
    'jobs': ['jobs', 'job', 'role', 'title', 'position'],
    'countries': ['countries', 'country', 'global', 'international', 'worldwide'],
    'services': ['services', 'service', 'offering', 'product', 'solution', 'offer'],
    'leads': ['leads', 'lead', 'prospect', 'prospects'],
    'fees': ['fees', 'fee', 'price', 'pricing', 'cost'],
    'plans': ['plans', 'plan', 'pricing', 'price', 'tier'],
    'samples': ['samples', 'sample', 'free', 'trial', 'demo'],
    'integrations': ['integrations', 'integration', 'crm', 'sync', 'api'],
    'compliances': ['compliances', 'compliance', 'gdpr', 'ccpa', 'casl', 'regulation'],
    'leaders': ['leaders', 'leader', 'ceo', 'executive', 'founder', 'leadership'],
    'founders': ['founders', 'founder', 'ceo', 'leadership']
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
