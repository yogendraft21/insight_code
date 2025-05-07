<div align="center">

# 🤖 AI Code Reviewer

**Your AI-powered senior engineer that automatically reviews GitHub Pull Requests, comments intelligently, and notifies your team via Slack.**

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-8e44ad?style=flat-square)](https://lovable.dev)
[![Powered by Vite](https://img.shields.io/badge/Vite-Powered-blue?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strongly%20Typed-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

</div>

---

## 🚀 About the Project

AI Code Reviewer is a SaaS tool that automates your code review process. It integrates directly with GitHub to:

- Automatically review Pull Requests using AI
- Leave detailed, line-by-line suggestions
- Detect potential bugs and improvements
- Notify developers via Slack or email
- Provide dashboards with review insights

Save time, improve code quality, and boost team productivity — all without writing a single comment yourself.

---

## 🛠️ Key Features

- 🔗 GitHub App Installation with full repository access
- 🤖 GPT-powered automated PR reviews
- 💬 Inline code comments on GitHub PRs
- 🧑‍💻 Detect who opened the PR and analyze their code patterns
- 🔔 Real-time Slack/Email alerts
- 📊 Analytics dashboard for review activity

---

## ⚙️ Tech Stack

| Layer       | Stack                                   |
|-------------|------------------------------------------|
| Frontend    | Vite, React, TypeScript, TailwindCSS, shadcn/ui |
| Backend     | Node.js / Express or Next.js (API Routes) |
| Auth        | GitHub OAuth & GitHub App (JWT-based)    |
| AI Engine   | OpenAI GPT-4 / Claude for code reviews   |
| Notifications | Slack Webhooks / Email (e.g., SendGrid) |
| Hosting     | Lovable / Vercel / Custom Node server    |

---

## 🌐 Live Demo

🔗 [https://lovable.dev/projects/c3b3531c-6abe-42c0-8e7a-04918bb9dd76](https://lovable.dev/projects/c3b3531c-6abe-42c0-8e7a-04918bb9dd76)

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js (use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- GitHub account
- GitHub App credentials (Client ID, Secret, Private Key)
- Slack webhook (optional)

### Clone and Setup

```bash
git clone https://github.com/YOUR_ORG/ai-code-reviewer.git
cd ai-code-reviewer
npm install
npm run dev


### .env.local Example

GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

### 🔐 GitHub Integration Flow

- User logs in via GitHub OAuth

- User installs your GitHub App on their org or repo

- App receives webhook events (pull_request, push, etc.)

- Your system fetches PR data using installation token

- AI reviews the PR, generates comments

- Comments posted via GitHub API

- Slack/email notifications sent to the team

### 🛡️ Permissions Required

Your GitHub App should request:

- Repository access (Read/Write on Pull Requests & Issues)

- Metadata (To identify repos)

- User Email & Team Info

- Webhooks: pull_request, issue_comment, push

### ✨ Contribution Guide

- Contributions are welcome! To contribute:

- Fork the repository

- Create a new branch (feat/your-feature)

- Commit your changes

- Push to your branch

- Open a Pull Request 🙌

### 📄 License
This project is licensed under the MIT License — see LICENSE file for details.

<div align="center"> Built with ❤️ by your team. </div> 
```
