import fs from 'fs';
import path from 'path';
import { embedMany } from 'ai';

/**
 * Smart Splitting: Splits text by Markdown headers, numbered sections, or blog titles.
 * Implements 15% overlap for context preservation.
 */
export function chunkText(text, source, chunkSize = 1000, overlap = 0.15) {
    // Split by headers (##, ###) or numbered sections (1. SECTION)
    const sections = text.split(/(?=^##\s)|(?=^###\s)|(?=^\d+\.\s[A-Z])/m);
    const chunks = [];
    const overlapSize = Math.floor(chunkSize * overlap);

    sections.forEach(section => {
        if (section.length <= chunkSize) {
            chunks.push({ text: section.trim(), source });
        } else {
            // Further split large sections into overlapping chunks
            let start = 0;
            while (start < section.length) {
                let end = start + chunkSize;
                const chunk = section.substring(start, end).trim();
                chunks.push({ text: chunk, source });
                start += (chunkSize - overlapSize);
            }
        }
    });

    return chunks;
}

/**
 * In-memory Vector Store logic
 */
let vectorStore = [];

export async function initRAG(embeddingModel, dataDir = './backend/data') {
    console.log("🚀 Initializing Hybrid RAG System...");
    
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        console.warn(`⚠️ Created missing directory: ${dataDir}. Add data files and restart.`);
        return [];
    }

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));
    let allChunks = [];

    files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        allChunks.push(...chunkText(content, file));
    });

    if (allChunks.length === 0) {
        console.warn("⚠️ No knowledge found in data directory.");
        return [];
    }

    console.log(`🧩 Processed ${allChunks.length} chunks. Generating embeddings...`);
    
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: allChunks.map(c => c.text),
    });

    vectorStore = allChunks.map((chunk, i) => ({
        ...chunk,
        embedding: embeddings[i]
    }));

    console.log(`✅ Semantic Indexing Complete. ${vectorStore.length} chunks vectorized.`);
    return vectorStore;
}

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function retrieveContext(queryEmbedding, topK = 5) {
    return vectorStore
        .map(chunk => ({
            ...chunk,
            similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
}
