import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Force IPv4 to avoid ECONNREFUSED ::1 issues
dns.setDefaultResultOrder('ipv4first');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading .env from multiple locations to be safe
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import express, { json, urlencoded } from 'express';
import fs from 'fs';
import cors from 'cors';
import { streamText, embed, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { initRAG, retrieveContext } from './rag.js';
import { initLocalRag, isLocalRagReady, searchFaq } from './local-rag.js';

import { askChatbot } from './chatbot-logic.js';

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

// Initialise local semantic RAG over faq.json (no external API).
initLocalRag().catch(e => console.error('⚠️ Local RAG init failed:', e.message));

// Confidence threshold for cosine similarity over TF-IDF vectors (0..1).
// TF-IDF scores tend to run lower than dense embeddings: ~0.25-0.50 for strong matches.
const RAG_CONFIDENCE = 0.25;

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, exclude = [] } = req.body;
        const userMessage = messages[messages.length - 1].content;
        console.log(`💬 User Query: ${userMessage}`);

        if (isLocalRagReady()) {
            try {
                const top = await searchFaq(userMessage, 3);
                if (top.length && top[0].similarity >= RAG_CONFIDENCE) {
                    return res.json({
                        role: 'assistant',
                        content: top[0].answer,
                        matches: top,
                        confident: true,
                        mode: 'rag',
                        similarity: Number(top[0].similarity.toFixed(3))
                    });
                }
            } catch (ragErr) {
                console.error('⚠️ Local RAG search error, falling back to FAQ:', ragErr.message);
            }
        }

        const result = askChatbot(userMessage, exclude);
        if (result.confident) {
            res.json({
                role: 'assistant',
                content: result.bestMatch.answer,
                matches: result.matches,
                confident: true,
                mode: 'faq'
            });
        } else {
            res.json({
                role: 'assistant',
                content: result.fallback,
                matches: result.matches,
                confident: false,
                mode: 'fallback'
            });
        }

    } catch (error) {
        console.error("🚨 CHAT SERVER ERROR:", error);
        res.status(500).json({ error: "Sorry, I'm having trouble processing that right now." });
    }
});

app.post('/api/send-email', async (req, res) => {
    const body = req.body || {};
    const { first_name, email, phone, website, industry, services, message, source } = body;
    
    const host = process.env.EMAIL_HOST || 'smtp.gmail.com'; // Hard fallback to Gmail
    console.log(`📩 Outgoing Email Request. Host: ${host}, User: ${process.env.EMAIL_USER}`);
    
    const isPopup = source === 'popup';

    // Popup only requires name + email. Contact form requires message too.
    if (!first_name || !email || (!isPopup && !message)) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: host,
            port: parseInt(process.env.EMAIL_PORT || '587', 10),
            secure: process.env.EMAIL_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Pick template based on source
        const templateFile = isPopup ? './popupLeadTemplate.html' : './emailTemplate.html';
        const templatePath = path.resolve(__dirname, templateFile);
        
        console.log(`📧 Attempting to load template: ${templatePath}`);

        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found at: ${templatePath}`);
        }

        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        if (isPopup) {
            // Popup template — only 3 fields
            htmlTemplate = htmlTemplate
                .replace(/\{\{first_name\}\}/g, first_name)
                .replace(/\{\{email\}\}/g, email)
                .replace(/\{\{phone\}\}/g, phone || 'Not provided')
                .replace(/\{\{year\}\}/g, new Date().getFullYear());
        } else {
            // Standard contact form template — all 7 fields
            htmlTemplate = htmlTemplate
                .replace(/\{\{first_name\}\}/g, first_name)
                .replace(/\{\{email\}\}/g, email)
                .replace(/\{\{phone\}\}/g, phone || 'Not provided')
                .replace(/\{\{website\}\}/g, website || 'Not provided')
                .replace(/\{\{industry\}\}/g, industry || 'Not provided')
                .replace(/\{\{services\}\}/g, services || 'Not provided')
                .replace(/\{\{message\}\}/g, message)
                .replace(/\{\{year\}\}/g, new Date().getFullYear());
        }

        const emailSubject = isPopup
            ? `🔔 New Popup Lead — ${first_name}`
            : `New Contact Form Submission from ${first_name}`;

        const plainText = isPopup
            ? `New Popup Lead\nName: ${first_name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}`
            : `Name: ${first_name}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\nIndustry: ${industry}\nServices: ${services}\nMessage: ${message}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: emailSubject,
            text: plainText,
            html: htmlTemplate
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ LOCAL CHATBOT Server running on http://localhost:${PORT}`);
});

