import { emailTool } from "./email.tool.js";
import { fileTools } from "./file.tool.js";
import { shellTool } from "./shell.tool.js";
import { memoryTools } from "./memory.tool.js";

export const allTools = [
  emailTool,
  ...fileTools,
  shellTool,
  ...memoryTools,
];
