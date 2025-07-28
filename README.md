# ⚡ Scalefund Trading Engine Backend

> 🏦 A full-stack, modular, and scalable trading engine backend for proprietary trading firms built with NestJS, featuring real-time market handling, smart account control, and automated rule enforcement.

<p align="left">
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" />
  <img src="https://img.shields.io/badge/stack-NestJS%20%7C%20MongoDB%20%7C%20WebSocket-blueviolet" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey" />
  <img src="https://img.shields.io/badge/stability-beta-orange" />
</p>

---

## 🚀 Key Features

- 🧠 **Modular Architecture** – Built with NestJS for maintainability and scalability  
- 📊 **Real-Time Trading** – WebSocket integration for market subscriptions and updates  
- 🔐 **Authentication & Roles** – JWT + Guard-based access control  
- 🛡️ **Risk Engine** – Rule-based account validation & violation auto-handling  
- 📬 **Email Notification System** – Custom templates for key user events  
- 🏆 **Leaderboard & Analytics** – Track performance, rank users, and monitor behavior  
- 🔁 **Scheduled Cron Jobs** – For tasks like account resets and position closure  
- 📦 **Docker-Ready** – Smooth containerized deployment  

---

## 🗂️ Folder Structure

```bash
Scalefund-backend/
│
├── src/
│   ├── app.module.ts             # Root module
│   ├── main.ts                   # Entry point
│   ├── config/                   # Environment and API config
│   ├── constants/                # Roles, symbols, app-wide constants
│   ├── common/                   # Decorators, guards, filters, interceptors
│   ├── auth/                     # Auth logic, strategies, DTOs
│   ├── users/                    # User profile management
│   ├── kyc/                      # KYC handling
│   ├── market/                   # Live market feed and WebSocket gateway
│   ├── trades/                   # Order placement, closure, history
│   ├── portfolio/                # Account & portfolio tracking
│   ├── leaderboard/              # Ranking and competition logic
│   ├── notifications/            # Email, alerts
│   ├── risk/                     # Risk rules and auto-blocking
│   ├── admin/                    # Admin tools and analytics
│   ├── logger/                   # Request logging and middleware
│   ├── cron/                     # Scheduled tasks (reset, close)
│   ├── analytics/                # User performance analysis
│   └── email/                    # Templates + Email service
│
├── test/                         # E2E tests
├── .env
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── nest-cli.json
└── Dockerfile
---

## 🧠 Techstack

📦 Framework   : NestJS

🧬 Language    : TypeScript

🗄️ Database    : MongoDB / Mongoose

🔐 Auth        : JWT + Role Guards

📡 Realtime    : WebSocket Gateway

📊 Monitoring  : Custom Analytics + Leaderboard

⏱️ Scheduling  : CRON tasks with NestJS Schedule

📧 Emails      : Handlebars templating + SMTP