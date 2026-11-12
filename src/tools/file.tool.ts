import { tool } from "langchain";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

const SAFE_ROOT = process.env.SAFE_WORKDIR
  ? path.resolve(process.env.SAFE_WORKDIR)
  : process.cwd();

function resolveSafe(userPath: string): string {
  const resolved = path.resolve(SAFE_ROOT, userPath);
  if (!resolved.startsWith(SAFE_ROOT)) {
    throw new Error(`Access denied: path escapes safe workspace (${SAFE_ROOT})`);
  }
  return resolved;
}

export const listDirTool = tool(
  async ({ dirPath = "." }) => {
    const full = resolveSafe(dirPath);
    const entries = await fs.readdir(full, { withFileTypes: true });
    const result = entries.map((e) => ({
      name: e.name,
      type: e.isDirectory() ? "dir" : "file",
    }));
    return JSON.stringify(result, null, 2);
  },
  {
    name: "list_directory",
    description: "List files and folders in a directory (relative to workspace).",
    schema: z.object({
      dirPath: z
        .string()
        .optional()
        .default(".")
        .describe("Directory path relative to workspace root"),
    }),
  }
);

export const readFileTool = tool(
  async ({ filePath }) => {
    const full = resolveSafe(filePath);
    const content = await fs.readFile(full, "utf-8");
    // Limit size to avoid huge responses
    if (content.length > 50_000) {
      return content.slice(0, 50_000) + "\n\n...[truncated – file too large]";
    }
    return content;
  },
  {
    name: "read_file",
    description: "Read the contents of a text file.",
    schema: z.object({
      filePath: z.string().describe("Path to the file relative to workspace"),
    }),
  }
);

export const writeFileTool = tool(
  async ({ filePath, content }) => {
    const full = resolveSafe(filePath);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, content, "utf-8");
    return `Successfully wrote ${content.length} characters to ${filePath}`;
  },
  {
    name: "write_file",
    description: "Create or overwrite a text file with the given content.",
    schema: z.object({
      filePath: z.string().describe("Path for the file relative to workspace"),
      content: z.string().describe("Full text content to write"),
    }),
  }
);

export const deleteFileTool = tool(
  async ({ filePath }) => {
    const full = resolveSafe(filePath);
    await fs.unlink(full);
    return `Deleted ${filePath}`;
  },
  {
    name: "delete_file",
    description: "Delete a file. Use with caution.",
    schema: z.object({
      filePath: z.string().describe("Path of the file to delete"),
    }),
  }
);

export const fileTools = [listDirTool, readFileTool, writeFileTool, deleteFileTool];
