import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
})); // Allows your React Vite website to communicate with this server
app.use(json());

// Initialize Gemini Client
const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

// Health Check Route
app.get('/api/health', (req, res) => {
    res.send('✅ Chatbot Server is Online!');
});

// The Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
    console.log("🚀 Request received at /api/chat");
    try {
        // console.log("--- New Chat Request ---");
        // console.log("📥 Raw Body:", JSON.stringify(req.body, null, 2));

        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            console.error("❌ Invalid messages array received");
            return res.status(400).json({ error: "Messages array is required" });
        }

        // Read the DataMarketics text file
        let knowledgeData = "";
        try {
            knowledgeData = readFileSync('./knowledge-base.txt', 'utf-8');
        } catch (fsError) {
            console.error("❌ Error reading knowledge-base.txt:", fsError.message);
        }

        // console.log("🤖 Calling Gemini API (Version 2.0)...");
        // Call Gemini
        const result = await streamText({
            model: google('gemini-flash-latest'),
            system: `You are the Executive AI Assistant for Professionals Data. 

            ### AI Response Formatting Protocol
            1. Structure Guidelines:
            - Header Emphasis: Write the **Label:** on its own line.
            - Values: Place the email or phone value on the IMMEDIATE next line.
            - Bullet Points: Use a single asterisk followed by a space for the labels: * **Label:**
            - Paragraph Spacing: Use double line breaks between different topics.

            2. Visual Constraints:
            - Conciseness: Keep each point clear and high-contrast.
            - Cleanliness: No characters like '->' or ':' outside the bold tags.
               ${knowledgeData}`,
            messages,
        });


        // console.log("📡 Streaming response started...");
        // console.log("🚀 Starting plain-text stream from Gemini...");

        // Manual stream to ensure compatibility with our manual frontend fetch
        for await (const textPart of result.textStream) {
            res.write(textPart);
        }

        res.end();
        // console.log("✅ Stream completed");
    } catch (error) {
        console.error("🚨 GEMINI SERVER ERROR:", error);
        res.status(500).json({ error: "Failed to generate response.", details: error.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Chatbot Server is running on http://localhost:${PORT}`);
});
