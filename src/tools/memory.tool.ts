import { tool } from "langchain";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

const MEMORY_FILE = path.join(process.cwd(), ".nexus-memory.json");

interface MemoryStore {
  facts: Record<string, string>;
  notes: string[];
  updatedAt: string;
}

async function loadMemory(): Promise<MemoryStore> {
  try {
    const raw = await fs.readFile(MEMORY_FILE, "utf-8");
    return JSON.parse(raw) as MemoryStore;
  } catch {
    return { facts: {}, notes: [], updatedAt: new Date().toISOString() };
  }
}

async function saveMemory(store: MemoryStore): Promise<void> {
  store.updatedAt = new Date().toISOString();
  await fs.writeFile(MEMORY_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export const rememberFactTool = tool(
  async ({ key, value }) => {
    const store = await loadMemory();
    store.facts[key.toLowerCase()] = value;
    await saveMemory(store);
    return `Remembered: ${key} = ${value}`;
  },
  {
    name: "remember_fact",
    description:
      "Store a long-term fact or preference about the user or project (e.g. name, preferred language, project goal). Use this when the user shares lasting information.",
    schema: z.object({
      key: z.string().describe("Short key, e.g. 'user_name', 'preferred_editor'"),
      value: z.string().describe("The value to remember"),
    }),
  }
);

export const recallFactTool = tool(
  async ({ key }) => {
    const store = await loadMemory();
    if (key) {
      const val = store.facts[key.toLowerCase()];
      return val ? `${key}: ${val}` : `No fact found for key "${key}"`;
    }
    // return all
    if (Object.keys(store.facts).length === 0) return "No facts stored yet.";
    return JSON.stringify(store.facts, null, 2);
  },
  {
    name: "recall_facts",
    description:
      "Retrieve stored long-term facts. Pass a key to get one fact, or omit key to list all facts.",
    schema: z.object({
      key: z
        .string()
        .optional()
        .describe("Optional key to look up. Leave empty to list all facts."),
    }),
  }
);

export const addNoteTool = tool(
  async ({ note }) => {
    const store = await loadMemory();
    store.notes.push(`[${new Date().toISOString()}] ${note}`);
    // keep last 50 notes
    if (store.notes.length > 50) store.notes = store.notes.slice(-50);
    await saveMemory(store);
    return "Note saved to long-term memory.";
  },
  {
    name: "add_memory_note",
    description: "Add a free-form note to long-term memory (e.g. meeting summary, idea).",
    schema: z.object({
      note: z.string().describe("The note content"),
    }),
  }
);

export const memoryTools = [rememberFactTool, recallFactTool, addNoteTool];
