import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const GEMINI_MODEL = "gemini-2.5-flash";

export function createGeminiModel(): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in .env");
  }

  return new ChatGoogleGenerativeAI({
    apiKey,
    model: GEMINI_MODEL,
    temperature: 0.3,
  });
}
