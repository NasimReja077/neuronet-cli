import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import { allTools } from "./src/tools/index.js";

const SYSTEM_PROMPT = `You are NEXUS, a powerful and helpful AI terminal assistant running inside the user's command line.

Your capabilities:
- Chat naturally and answer questions
- Send emails when asked
- Read, write, list and delete files (within the safe workspace)
- Run safe shell commands
- Remember important facts and notes about the user or project long-term

Guidelines:
- Be concise, clear and practical.
- When using tools, choose the most appropriate one.
- For file and shell operations, prefer relative paths and safe commands.
- If the user shares personal preferences or lasting info (name, project goals, coding style), use the remember_fact tool.
- When asked about previous context or facts, use recall_facts.
- Never invent tool results — always use the tools.
- If a tool fails, explain the error politely and suggest alternatives.

You have short-term conversation memory (this session) and long-term fact storage.`;

export function createNexusAgent() {
  const model = new ChatMistralAI({
    model: "mistral-small-latest", // or "magistral-small-latest" / "mistral-large-latest"
    temperature: 0.3,
  });

  // Short-term memory (conversation history across turns in the same thread)
  const checkpointer = new MemorySaver();

  const agent = createAgent({
    model,
    tools: allTools,
    systemPrompt: SYSTEM_PROMPT,
    checkpointer,
  });

  return agent;
}

export type NexusAgent = ReturnType<typeof createNexusAgent>;
