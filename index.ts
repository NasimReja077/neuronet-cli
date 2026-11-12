#!/usr/bin/env node
import "dotenv/config";
import chalk from "chalk";
import promptSync from "prompt-sync";
import { HumanMessage } from "@langchain/core/messages";
import { createNexusAgent } from "./agent.js";
import { verifyEmailTransporter } from "./src/service/mail.service.js";

const prompt = promptSync({ sigint: true });
const AI_NAME = "NEXUS";

const THREAD_ID = "default-session"; // can be made dynamic later (e.g. per project)

function printBanner() {
  console.clear();
  console.log(chalk.cyan.bold("╔══════════════════════════════════════════════════╗"));
  console.log(chalk.cyan.bold("║") + chalk.green.bold("           NEXUS CLI  •  Terminal AI             ") + chalk.cyan.bold("║"));
  console.log(chalk.cyan.bold("║") + chalk.gray("     Intelligent agent with memory & tools        ") + chalk.cyan.bold("║"));
  console.log(chalk.cyan.bold("╚══════════════════════════════════════════════════╝"));
  console.log();
  console.log(chalk.gray("  Commands: /help  /clear  /exit  /tools  /memory"));
  console.log(chalk.gray("  Powered by LangChain + Mistral AI\n"));
}

function printHelp() {
  console.log(chalk.yellow("\nAvailable commands:"));
  console.log(chalk.white("  /help     ") + chalk.gray("Show this help"));
  console.log(chalk.white("  /clear    ") + chalk.gray("Clear screen and start fresh conversation context"));
  console.log(chalk.white("  /tools    ") + chalk.gray("List available agent tools"));
  console.log(chalk.white("  /memory   ") + chalk.gray("Show stored long-term facts (via tool)"));
  console.log(chalk.white("  /exit     ") + chalk.gray("Quit NexusCLI\n"));
  console.log(chalk.yellow("Natural language examples:"));
  console.log(chalk.gray('  "list files in current folder"'));
  console.log(chalk.gray('  "read package.json"'));
  console.log(chalk.gray('  "create a file notes.txt with hello world"'));
  console.log(chalk.gray('  "send email to me@example.com about the meeting"'));
  console.log(chalk.gray('  "remember that my name is Alex and I prefer TypeScript"'));
  console.log(chalk.gray('  "what do you know about me?"'));
  console.log(chalk.gray('  "run git status"\n'));
}

async function main() {
  if (!process.env.MISTRAL_API_KEY) {
    console.error(chalk.red("Error: MISTRAL_API_KEY is not set in .env"));
    process.exit(1);
  }

  // Optional email check (non-blocking)
  void verifyEmailTransporter();

  const agent = createNexusAgent();
  const config = { configurable: { thread_id: THREAD_ID } };

  printBanner();

  while (true) {
    let query: string;
    try {
      query = prompt(chalk.yellow.bold("You › ")).trim();
    } catch {
      // Ctrl+C
      break;
    }

    if (!query) continue;

    // Built-in slash commands
    if (query === "/exit" || query === "/quit") {
      break;
    }
    if (query === "/help") {
      printHelp();
      continue;
    }
    if (query === "/clear") {
      printBanner();
      // Note: checkpointer keeps history; for true reset we could change thread_id
      console.log(chalk.gray("(Screen cleared. Conversation memory still active for this session.)\n"));
      continue;
    }
    if (query === "/tools") {
      console.log(chalk.cyan("\nAgent tools:"));
      console.log("  • send_email");
      console.log("  • list_directory, read_file, write_file, delete_file");
      console.log("  • run_shell_command");
      console.log("  • remember_fact, recall_facts, add_memory_note\n");
      continue;
    }
    if (query === "/memory") {
      // Let the agent handle it via tool for consistency
      query = "Please recall all facts you have stored about me or this project using the recall_facts tool.";
    }

    try {
      process.stdout.write(chalk.gray("Thinking...\r"));

      const result = await agent.invoke(
        {
          messages: [new HumanMessage(query)],
        },
        config
      );

      // Clear the "Thinking..." line
      process.stdout.write(" ".repeat(20) + "\r");

      const lastMessage = result.messages.at(-1);
      if (!lastMessage) {
        throw new Error("The agent returned no messages.");
      }

      let text = "";

      if (typeof lastMessage.content === "string") {
        text = lastMessage.content;
      } else if (Array.isArray(lastMessage.content)) {
        text = lastMessage.content.reduce((resultText, block) => {
          if (
            typeof block === "object" &&
            block !== null &&
            "type" in block &&
            block.type === "text" &&
            "text" in block &&
            typeof block.text === "string"
          ) {
            return resultText + block.text;
          }
          return resultText;
        }, "");
      } else {
        text = String(lastMessage.content ?? "");
      }

      console.log(chalk.blue.bold(`${AI_NAME} › `) + chalk.white(text));
      console.log(chalk.gray("─".repeat(50)));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(chalk.red(`\nError: ${message}`));
      console.log(chalk.gray("─".repeat(50)));
    }
  }

  console.log(chalk.green.bold(`\n${AI_NAME}: Session ended. See you next time!\n`));
}

main().catch((err: unknown) => {
  console.error(chalk.red("Fatal error:"), err);
  process.exit(1);
});
