import { tool } from "langchain";
import { z } from "zod";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const DANGEROUS_PATTERNS = [
  /rm\s+-rf\s+[\/~]/i,
  /mkfs/i,
  /dd\s+if=/i,
  /:\(\)\{\s*:\|:\s*&\s*\};:/, // fork bomb
  /shutdown|reboot|poweroff/i,
  /chmod\s+777/i,
  />\s*\/dev\/sd/i,
];

function isDangerous(cmd: string): boolean {
  return DANGEROUS_PATTERNS.some((p) => p.test(cmd));
}

export const shellTool = tool(
  async ({ command }) => {
    if (isDangerous(command)) {
      return `Refused: command looks dangerous → "${command}"`;
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 30_000,
        maxBuffer: 1024 * 1024, // 1 MB
        cwd: process.env.SAFE_WORKDIR || process.cwd(),
      });

      let output = "";
      if (stdout) output += stdout;
      if (stderr) output += (output ? "\n" : "") + `[stderr]\n${stderr}`;
      return output.trim() || "(no output)";
    } catch (err: any) {
      return `Command failed: ${err.message}\n${err.stderr || ""}`;
    }
  },
  {
    name: "run_shell_command",
    description:
      "Execute a safe shell command and return its output. Avoid destructive or system-level commands. Prefer simple commands like ls, cat, npm, git status, etc.",
    schema: z.object({
      command: z
        .string()
        .describe("The shell command to run (e.g. 'ls -la', 'git status')"),
    }),
  }
);
