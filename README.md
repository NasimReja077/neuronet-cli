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
* 🧠 Project Analyzer (AI-based insights)

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

* Node.js
* JavaScript (ES6+)

### 🤖 AI & Agent

* LangChain
* Mistral AI

### 🛠️ CLI & UX

* Chalk
* Inquirer.js
* Ora

### 📧 Communication

* Nodemailer

### 🧠 Validation

* Zod

### 📂 System & OS

* fs / fs-extra
* path
* child_process

### 🌐 Internet

* Axios
* Cheerio (optional)

### 🔐 Config

* dotenv

---

## 🧩 Architecture

```text
User (CLI)
   ↓
CLI Interface (Inquirer + Chalk)
   ↓
LangChain Agent (Decision Maker)
   ↓
 ┌────────────── Tools ──────────────┐
 │ File │ Web │ Code │ Email │ Exec │ Analyzer │
 └───────────────────────────────────┘
   ↓
Mistral AI (LLM)
```

---

## 📁 Project Structure

```
neuronet-cli/
│
├── src/
│   ├── agents/
│   ├── tools/
│   ├── services/
│   ├── utils/
│   ├── config/
│   ├── cli/
│   └── index.js
│
├── assets/
│   └── banner.png
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
