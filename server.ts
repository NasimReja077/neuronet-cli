import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import promptSync from "prompt-sync";
import { createAgent, tool } from "langchain";
import chalk from "chalk";
import { sendEmail } from "./src/service/mail.service.js";
import { z } from "zod";

const prompt = promptSync({ sigint: true });
const AI_NAME = "NEXUS";
const messages: HumanMessage[] = [];

function printBanner(): void {
  console.clear();
  console.log(chalk.cyan.bold("======================================"));
  console.log(chalk.green.bold(`        ${AI_NAME} TERMINAL AI`));
  console.log(chalk.gray("      Type /exit to quit"));
  console.log(chalk.cyan.bold("======================================\n"));
}

function messageText(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (!Array.isArray(content)) {
    return String(content ?? "");
  }

  return content.reduce<string>((text, block) => {
    if (
      typeof block === "object" &&
      block !== null &&
      "type" in block &&
      block.type === "text" &&
      "text" in block &&
      typeof block.text === "string"
    ) {
      return text + block.text;
    }

    return text;
  }, "");
}

async function main(): Promise<void> {
  if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not set in .env");
  }

  const model = new ChatMistralAI({
    model: "magistral-small-latest",
  });
  const emailTool = tool(
    async ({ to, html, subject }) => sendEmail({ to, html, subject }),
    {
      name: "emailTool",
      description: "Use this tool to send an email",
      returnDirect: true,
      schema: z.object({
        to: z.string().email().describe("The recipient's email address"),
        html: z.string().min(1).describe("The HTML content of the email"),
        subject: z.string().min(1).describe("The subject of the email"),
      }),
    }
  );
  const agent = createAgent({
    model,
    tools: [emailTool],
  });

  printBanner();

  while (true) {
    let query: string;
    try {
      query = prompt(chalk.yellow.bold("You > ")).trim();
    } catch {
      break;
    }

    if (query === "/exit" || query === "/quit") {
      break;
    }
    if (!query) {
      continue;
    }

    messages.push(new HumanMessage(query));
    if (messages.length > 10) {
      messages.shift();
    }

    try {
      const result = await agent.invoke({ messages });
      const reply = result.messages.at(-1);
      if (!reply) {
        throw new Error("The agent returned no messages.");
      }

      console.log(
        chalk.blue.bold(`${AI_NAME} > `) + chalk.white(messageText(reply.content))
      );
      console.log(chalk.gray("--------------------------------------"));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`Error: ${errorMessage}`));
    }
  }

  console.log(chalk.green.bold(`\n${AI_NAME}: Thanks for using the assistant.`));
}

main().catch((err: unknown) => {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.error(chalk.red(`Fatal error: ${errorMessage}`));
  process.exitCode = 1;
});
