# Scalefund Backend: Proprietary Trading Engine
🚀 Project Overview
The Scalefund Backend serves as the robust and high-performance trading engine for a proprietary trading firm. Engineered with a focus on low-latency, high-throughput operations, and stringent security, this system is designed to power sophisticated trading strategies, manage complex portfolios, and ensure regulatory compliance within a dynamic market environment. Built on NestJS, it leverages a modular architecture to provide a scalable and maintainable foundation for all core trading operations.
✨ Features
 * Secure Authentication & Authorization: Robust user management, role-based access control, and JWT-based authentication.
 * Real-time Market Data: WebSocket integration for live market data streams and updates.
 * Comprehensive Trade Management: API for placing, managing, and tracking various order types, alongside detailed trade history.
 * Dynamic Portfolio Management: Real-time tracking of positions, P&L, and portfolio performance.
 * Advanced Risk Management: Dedicated module for pre-trade and post-trade risk checks, ensuring compliance with firm-level risk parameters.
 * User & KYC Management: Secure handling of user profiles and Know Your Customer (KYC) documentation.
 * Admin & Analytics Dashboards: Tools for administrative oversight, user flagging, and performance analytics.
 * Notification System: Event-driven notifications for critical trade events, system alerts, and user updates.
 * Leaderboard Integration: For tracking and displaying performance metrics (if applicable for internal competition/tracking).
 * Scheduled Tasks: Cron-based jobs for automated processes like account resets, position closures, and data synchronization.
 * Robust Logging & Monitoring: Comprehensive logging across all services for auditing, debugging, and operational insights.
 * Email Services: Automated transactional emails for user communication (e.g., welcome, password reset, daily summaries).
 * Highly Configurable: Externalized configurations for database, JWT, market parameters, and more.
🛠️ Technologies Used
 * Framework: NestJS (Node.js framework)
 * Language: TypeScript
 * Database: (Assumed MongoDB based on .schema.ts naming, but adaptable)
 * Real-time Communication: WebSockets
 * Authentication: JWT (JSON Web Tokens) & Local Strategy
 * Validation: Class-validator
 * Hashing: Bcrypt
 * Environment Management: Dotenv
 * Testing: Jest (for unit/integration), Supertest (for e2e)
 * Linting/Formatting: ESLint
 * Containerization: Docker
📁 Repository Structure
Scalefund-backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── config.service.ts
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── market.config.ts
│   ├── constants/
│   │   ├── roles.enum.ts
│   │   ├── symbols.ts
│   │   └── app.constants.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── public.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   └── utils/
│   │       ├── hash.util.ts
│   │       ├── validate.util.ts
│   │       └── token.util.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   ├── reset-password.dto.ts
│   │   │   └── verify-email.dto.ts
│   │   ├── jwt/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt.guard.ts
│   │   └── local/
│   │       ├── local.strategy.ts
│   │       └── local.guard.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.schema.ts
│   │   └── dto/
│   │       ├── update-profile.dto.ts
│   │       └── change-password.dto.ts
│   ├── kyc/
│   │   ├── kyc.module.ts
│   │   ├── kyc.controller.ts
│   │   ├── kyc.service.ts
│   │   ├── kyc.schema.ts
│   │   └── dto/
│   │       └── upload-kyc.dto.ts
│   ├── market/
│   │   ├── market.module.ts
│   │   ├── market.controller.ts
│   │   ├── market.service.ts
│   │   ├── websocket.gateway.ts
│   │   └── dto/
│   │       └── subscribe-symbols.dto.ts
│   ├── trades/
│   │   ├── trades.module.ts
│   │   ├── trades.controller.ts
│   │   ├── trades.service.ts
│   │   ├── trades.schema.ts
│   │   └── dto/
│   │       ├── place-order.dto.ts
│   │       ├── close-order.dto.ts
│   │       └── trade-history.dto.ts
│   ├── portfolio/
│   │   ├── portfolio.module.ts
│   │   ├── portfolio.controller.ts
│   │   ├── portfolio.service.ts
│   │   ├── portfolio.schema.ts
│   │   └── dto/
│   │       └── update-portfolio.dto.ts
│   ├── leaderboard/
│   │   ├── leaderboard.module.ts
│   │   ├── leaderboard.controller.ts
│   │   ├── leaderboard.service.ts
│   │   └── leaderboard.schema.ts
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.controller.ts
│   │   ├── notifications.service.ts
│   │   └── notifications.schema.ts
│   ├── risk/
│   │   ├── risk.module.ts
│   │   ├── risk.service.ts
│   │   └── risk.controller.ts
│   ├── admin/
│   │   ├── admin.module.ts
│   │   ├── admin.controller.ts
│   │   ├── admin.service.ts
│   │   └── dto/
│   │       ├── flag-user.dto.ts
│   │       └── admin-analytics.dto.ts
│   ├── logger/
│   │   ├── logger.module.ts
│   │   ├── logger.service.ts
│   │   └── morgan.middleware.ts
│   ├── cron/
│   │   ├── cron.module.ts
│   │   ├── cron.service.ts
│   │   └── tasks/
│   │       ├── reset-accounts.task.ts
│   │       └── close-positions.task.ts
│   ├── analytics/
│   │   ├── analytics.module.ts
│   │   ├── analytics.controller.ts
│   │   ├── analytics.service.ts
│   │   └── analytics.schema.ts
│   └── email/
│       ├── email.module.ts
│       ├── email.service.ts
│       └── templates/
│           ├── welcome.hbs
│           ├── reset-password.hbs
│           └── daily-summary.hbs
├── test/
│   ├── auth.e2e-spec.ts
│   ├── users.e2e-spec.ts
│   └── trades.e2e-spec.ts
├── .env
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── nest-cli.json
└── Dockerfile