import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await models.json();
    console.log(data.models.map(m => m.name).filter(n => n.includes('embed')));
  } catch (error) {
    console.error(error);
  }
}

listModels();
