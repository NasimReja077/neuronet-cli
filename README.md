# 🧠 NeuroNet CLI

![NeuroNet Banner](./assets/banner.png)


> ⚡ **AI-powered terminal assistant with LangChain agents for automation, code analysis, and system control.**

---

## 🚀 Overview

**NeuroNet CLI** is a powerful AI assistant that runs directly in your terminal.

It uses an intelligent **LangChain agent** powered by **Google Gemini** to understand natural language and perform real-world tasks like file operations, code debugging, automation, and more.

---

## ⚡ Features -

* 💬 AI Chat Assistant
* 🧠 Context Memory (short-term)
* 📧 Send Emails via AI
* 📂 File System Control (create, read, delete files)
* 🌐 Web Search & Data Fetching
* 🐞 Debug Code
* 📖 Explain Code
* ⚙️ Execute Shell Commands

---

## 🧠 AI Capabilities

NeuroNet uses a **tool-augmented AI agent** that can intelligently decide when to:
* Execute system commands
* Analyze and debug code
* Interact with files
* Send emails
* Fetch real-time data

---

## 🏗️ Tech Stack

### ⚙️ Core
- **Node.js** – Runtime environment
- **TypeScript** – Programming language

### 🤖 AI & Agent
- **LangChain** – AI agent & tool orchestration
- **Google Gemini** – Large Language Model (LLM)

### 🛠️ CLI & UX
- **Chalk** – Terminal styling
- **Inquirer.js** – Interactive CLI prompts
- **Ora** – Loading spinners

### 📧 Communication
- **Nodemailer** – Email automation

### 🧠 Validation
- **Zod** – Schema validation & input safety

### 📂 System & OS
- **fs / fs-extra** – File system operations
- **path** – Path handling
- **child_process** – Execute shell commands

### 🌐 Internet
- **Axios** – API requests
- **Cheerio (optional)** – Web scraping

### 🔐 Config
- **dotenv** – Environment variable management
---

## 🧩 Architecture

```text
                ┌──────────────────────┐
                │     User (CLI)       │
                └─────────┬────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │   CLI Interface      │
                │ (Inquirer + Chalk)   │
                └─────────┬────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │   LangChain Agent    │
                │ (Decision Maker)     │
                └─────────┬────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Code Tool   │  │  File Tool   │  │  Web Tool    │
│ (Debug/Explain)│ │ (FS Ops)    │  │ (Search/API) │
└──────────────┘  └──────────────┘  └──────────────┘

        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Email Tool   │  │ Command Tool │  │ Analyzer Tool│
│ (Nodemailer) │  │ (Shell Exec) │  │ (Project AI) │
└──────────────┘  └──────────────┘  └──────────────┘

                          │
                          ▼
                ┌──────────────────────┐
                │    Gemini AI LLM     │
                └──────────────────────┘

---

## 📁 Project Structure

```text
neuronet/
│
├── src/
│   ├── index.ts           # CLI entry point
│   ├── agent.ts           # LangChain agent setup
│   └── src/
│       ├── service/
│       │   └── mail.service.ts
│       └── tools/
│           ├── email.tool.ts
│           ├── file.tool.ts
│           ├── index.ts
│           ├── memory.tool.ts
│           └── shell.tool.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```
---

## 📦 Installation

```bash
git clone https://github.com/NasimReja077/neuronet-cli.git
cd neuronet-cli
npm install
```

---

## 🔑 Environment Setup

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_USER=your_email@gmail.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

Copy `.env.example` to `.env`, add your Gemini API key, and fill in the Gmail OAuth2 values only if you want to use the email tool. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey).

---

## ▶️ Usage

```bash
npm start
```

Run `npm run dev` while developing, `npm run typecheck` to check types, and
`npm run build` to compile the application into `dist/`.

---

## 💻 Example Commands

```bash
# Chat
> explain recursion

# File
> create file notes.txt

# Email
> send email to abc@gmail.com

# Code
> debug this error...

# Command
> install express

# Analyze
> analyze my project
```

---

## 🌟 Future Enhancements

* 🔊 Voice Commands
* 📂 Advanced File Automation
* 🌐 Browser Control
* 🤖 Multi-Agent System

---

## 🤝 Contributing

Contributions are welcome!

```bash
fork → clone → create branch → commit → push → PR
```

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Nasim Reja Mondal**

---

## ⭐ Support

If you like this project:

⭐ Star the repo
🚀 Share it
🤝 Contribute

---

## ⚡ Tagline

> **“Control your terminal with intelligence.”**
