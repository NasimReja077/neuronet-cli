import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const user = process.env.GOOGLE_USER;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!user || !clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Email not configured. Set GOOGLE_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env"
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId,
      clientSecret,
      refreshToken,
    },
  });

  return transporter;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  text = "",
}: SendEmailParams): Promise<string> {
  const transport = getTransporter();

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ""),
  };

  const info = await transport.sendMail(mailOptions);
  console.log(`[Email] Sent successfully → ${to} (messageId: ${info.messageId})`);
  return `Email sent successfully to ${to}`;
}

/** Call once at startup to verify credentials (optional) */
export async function verifyEmailTransporter(): Promise<boolean> {
  try {
    const transport = getTransporter();
    await transport.verify();
    console.log("[Email] Transporter verified and ready");
    return true;
  } catch (err) {
    console.warn("[Email] Transporter verification failed:", (err as Error).message);
    return false;
  }
}
