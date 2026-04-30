import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import express, { json } from 'express';
import cors from 'cors';
import { streamText, embed, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { initRAG, retrieveContext } from './rag.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(json());

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = google('gemini-flash-latest');
const embeddingModel = google.textEmbeddingModel('gemini-embedding-001');

/**
 * STARTUP: Top-Level Await to ensure RAG initialization
 */
await initRAG(embeddingModel, path.resolve(__dirname, './data'));

/**
 * QUERY CONDENSING: Conversational history into standalone search query
 */
async function condenseQuery(history, latestMessage) {
    if (history.length === 0) return latestMessage;

    const { text } = await generateText({
        model: model,
        system: `Given the following conversation history and a follow-up question, rephrase the follow-up question to be a standalone search query. 
        Focus only on the company context (Data Marketics / Professionals Data).`,
        prompt: `History: ${JSON.stringify(history.slice(-3))} \nQuestion: ${latestMessage}`,
    });
    return text.trim();
}

app.post('/api/chat', async (req, res) => {
    try {
        let { messages } = req.body;

        // PERFORMANCE: History Trimming (Keep only the last 10 messages)
        const history = messages.slice(0, -1).slice(-10);
        const userMessage = messages[messages.length - 1].content;

        // 1. CONDENSE QUERY
        const standaloneQuery = await condenseQuery(history, userMessage);
        console.log(`🔍 Standalone Query: ${standaloneQuery}`);

        // 2. RETRIEVAL
        const { embedding } = await embed({
            model: embeddingModel,
            value: standaloneQuery,
        });

        const matches = retrieveContext(embedding, 5);
        const context = matches.map(m => `[Source: ${m.source}]\n${m.text}`).join("\n\n---\n\n");

        // 3. GENERATION (Hybrid System Prompt)
        const result = await streamText({
            model: model,
            temperature: 0, // High-precision retrieval
            system: `You are the Executive AI Assistant for Professionals Data (Sister brand of Data Marketics).

            ### RETRIEVED CONTEXT:
            ${context}

            ### HYBRID OPERATIONAL RULES:
            Rule 1 (Primary): Use the provided [CONTEXT] for all company-specific facts (services, pricing, scale, contact info).
            Rule 2 (Hybrid): Use internal general knowledge for non-company questions (e.g., general definitions of B2B, formatting help, greetings).
            Rule 3 (Anti-Hallucination): If a specific company fact is missing from the [CONTEXT], say: "I don't have that specific company detail, but I can help you with general information."
            Rule 4 (Citations): Mention the source if multiple files or specific documents are used (e.g., "According to our Service Guide...").

            ### RESPONSE PROTOCOL:
            - Tone: Be sweet, friendly, and highly readable.
            - Length: Keep answers extremely short and to the point (maximum 2-3 short sentences). Never use long paragraphs.
            - Structure: Write labels in bold (e.g., **Label:**) on their own line.
            - Spacing: Use double line breaks between topics.`,
            messages: history.concat([{ role: 'user', content: userMessage }]),
            maxTokens: 300,
        });

        // SSE STREAMING
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        for await (const textPart of result.textStream) {
            res.write(textPart);
        }
        res.end();

    } catch (error) {
        console.error("🚨 HYBRID RAG SERVER ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ ULTIMATE HYBRID RAG Server running on http://localhost:${PORT}`);
});
