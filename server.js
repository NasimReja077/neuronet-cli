import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import promptSync from "prompt-sync";
import { HumanMessage, createAgent, tool } from "langchain";
import chalk from "chalk";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

const prompt = promptSync();

const AI_NAME = "NEXUS";

const model = new ChatMistralAI({
    model: "magistral-small-latest",
});

const messages = [];

const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send an email",
        returnDirect: true,
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        }),
    }
);

const agent = createAgent({
    model,
    tools: [
        emailTool
    ]
});

function banner() {
    console.clear();
    console.log(chalk.cyan.bold("======================================"));
    console.log(chalk.green.bold(`        ${AI_NAME} TERMINAL AI`));
    console.log(chalk.gray("      Type /exit to quit"));
    console.log(chalk.cyan.bold("======================================\n"));
}

banner();

while (true) {
    const query = prompt(chalk.yellow.bold("You > "));

    if (query === "/exit") {
        break;
    }

    messages.push(new HumanMessage(query));

    if (messages.length > 10) messages.shift();

    const res = await agent.invoke({
        messages
    });

    const reply = res.messages[res.messages.length - 1];

    let text;

    if (typeof reply.content === "string") {
        text = reply.content;
    } else {
        text = reply.content
            .filter(c => c.type === "text")
            .map(c => c.text)
            .join("");
    }

    // messages.push(reply);

    console.log(chalk.blue.bold(`${AI_NAME} > `) + chalk.white(text));
    console.log(chalk.gray("--------------------------------------"));
}

console.log(
    chalk.green.bold(`\n${AI_NAME}: Thanks for using the assistant.`)
);

// run node server.js
// to run the code.