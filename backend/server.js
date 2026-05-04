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

import { askChatbot } from './chatbot-logic.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(json());

// Note: Keeping Gemini vars for other potential uses, but the main chatbot now uses local logic.
const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = google('gemini-flash-latest');
const embeddingModel = google.textEmbeddingModel('gemini-embedding-001');

/**
 * Chat Route - Now using local logic (Deterministic FAQ)
 */
app.post('/api/chat', (req, res) => {
    try {
        const { messages, exclude = [] } = req.body;
        const userMessage = messages[messages.length - 1].content;

        console.log(`💬 User Query: ${userMessage}`);

        const result = askChatbot(userMessage, exclude);

        if (result.confident) {
            const answer = result.bestMatch.answer;
            res.json({
                role: 'assistant',
                content: answer,
                matches: result.matches,
                confident: true
            });
        } else {
            res.json({
                role: 'assistant',
                content: result.fallback,
                matches: result.matches,
                confident: false
            });
        }

    } catch (error) {
        console.error("🚨 CHAT SERVER ERROR:", error);
        res.status(500).json({ error: "Sorry, I'm having trouble processing that right now." });
    }
});

app.listen(PORT, () => {
    console.log(`✅ LOCAL CHATBOT Server running on http://localhost:${PORT}`);
});

