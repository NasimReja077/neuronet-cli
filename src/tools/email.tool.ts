import { tool } from "langchain";
import { z } from "zod";
import { sendEmail } from "../services/mail.service.js";

export const emailTool = tool(
  async ({ to, subject, html }) => {
    return await sendEmail({ to, subject, html });
  },
  {
    name: "send_email",
    description:
      "Send an email to a recipient. Use this when the user asks to email someone. Provide a clear subject and well-formatted HTML body.",
    schema: z.object({
      to: z.string().email().describe("Recipient email address"),
      subject: z.string().min(1).describe("Email subject line"),
      html: z.string().min(1).describe("HTML content of the email body"),
    }),
  }
);
