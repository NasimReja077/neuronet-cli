# 🧠 NeuroNet CLI

![NeuroNet Banner](./assets/banner.png)


> ⚡ **AI-powered terminal assistant with LangChain agents for automation, code analysis, and system control.**

---

## 🚀 Overview

**NeuroNet CLI** is a powerful AI assistant that runs directly in your terminal.

It uses an intelligent **LangChain agent** powered by **Mistral AI** to understand natural language and perform real-world tasks like file operations, code debugging, automation, and more.

---

## ⚡ Features

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
- **JavaScript (ES6+)** – Programming language

### 🤖 AI & Agent
- **LangChain** – AI agent & tool orchestration
- **Mistral AI** – Large Language Model (LLM)

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
                │    Mistral AI LLM    │
                └──────────────────────┘

---

## 📁 Project Structure

```text
neuronet/
│
├── src/
│   ├── agents/           # LangChain agent setup
│   │   └── agent.js
│   │
│   ├── tools/   # All AI tools
│   │   ├── email.tool.js
│   │   ├── file.tool.js
│   │   ├── web.tool.js
│   │   ├── code.tool.js
│   │   ├── command.tool.js
│   │   └── analyzer.tool.js
│   │
│   ├── services/    # External services
│   │   ├── mistral.service.js
│   │   └── email.service.js
│   │
│   ├── utils/     # Helper functions
│   │   ├── logger.js
│   │   └── validator.js
│   │
│   ├── config/    # Config files
│   │   └── env.js
│   │
│   ├── cli/              # CLI interface
│   │   └── index.js
│   │
│   └── index.js          # Entry point
│
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
MISTRAL_API_KEY=your_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

## ▶️ Usage

```bash
npm start
```

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
