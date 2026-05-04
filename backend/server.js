import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import express, { json, urlencoded } from 'express';
import fs from 'fs';
import cors from 'cors';
import { streamText, embed, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { initRAG, retrieveContext } from './rag.js';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
const app = express();
const PORT = process.env.PORT || 3000;

// Set up rate limiting
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // limit each IP to 20 requests per windowMs
    message: "You are asking questions too fast! Please wait a minute and try again.",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors({ origin: '*' }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/chat', apiLimiter);

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
        Focus only on the company context Data Marketics.`,
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
            system: `You are the Executive AI Assistant for Data Marketics).

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

app.post('/api/send-email', async (req, res) => {
    const body = req.body || {};
    const { first_name, email, phone, website, industry, services, message } = body;
    console.log(body);
    if (!first_name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587', 10),
            secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const templatePath = path.resolve(__dirname, './emailTemplate.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        htmlTemplate = htmlTemplate
            .replace(/\{\{first_name\}\}/g, first_name)
            .replace(/\{\{email\}\}/g, email)
            .replace(/\{\{phone\}\}/g, phone)
            .replace(/\{\{website\}\}/g, website)
            .replace(/\{\{industry\}\}/g, industry)
            .replace(/\{\{services\}\}/g, services)
            .replace(/\{\{message\}\}/g, message)
            .replace(/\{\{year\}\}/g, new Date().getFullYear());

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${first_name}`,
            text: `
Name: ${first_name}
Email: ${email}
Phone: ${phone}
Website: ${website}
Industry: ${industry}
Services: ${services}
Message: ${message}
            `,
            html: htmlTemplate
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ ULTIMATE HYBRID RAG Server running on http://localhost:${PORT}`);
});
