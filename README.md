# 🚀 **Scalefund Trading Engine Backend**

## ✨ **Project Overview**
This repository houses the **core backend services** for the Scalefund proprietary trading engine. It's designed for **high-performance, low-latency** trading operations, providing the backbone for market data processing, order management, portfolio tracking, and real-time risk assessment. Built with **NestJS and TypeScript**, it leverages a robust, modular architecture suitable for demanding financial environments.

## 🛠️ **Key Technologies**
* **Framework**: **NestJS** (Node.js)
* **Language**: **TypeScript**
* **Database**: (Assumed MongoDB - based on `.schema.ts` files)
* **Real-time**: **WebSockets** (for market data)
* **Authentication**: **JWT**, Local Strategy
* **Containerization**: **Docker**

## 📁 **Core Modules & Functionality**
# This section provides a quick, high-level overview of the most important modules.
# It's crucial for understanding the project's capabilities at a glance.

* **`auth/`**: User authentication, authorization, and security.
* **`market/`**: Real-time market data ingestion and distribution via WebSockets.
* **`trades/`**: Order placement, management, and historical trade data.
* **`portfolio/`**: Real-time position and P&L tracking.
* **`risk/`**: Pre-trade and post-trade risk management logic.
* **`users/`**: Core user profiles and management.
* **`kyc/`**: User KYC documentation handling.
* **`admin/`**: Backend administrative tools and user flagging.
* **`cron/`**: Scheduled tasks for automated processes (e.g., account resets).
* **`config/`**: Centralized application configuration.

## 🏁 **Getting Started**

### **Prerequisites**
Ensure **Node.js (v18+ LTS)**, **npm**, and **Docker** (or local **MongoDB**) are installed.

### **Installation & Setup**
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-organization/Scalefund-backend.git](https://github.com/your-organization/Scalefund-backend.git)
    cd Scalefund-backend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment**: Copy `.env.example` to `.env` and fill in your specific values:
    ```bash
    # .env example (snippet)
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/scalefund
    JWT_SECRET=YOUR_SUPER_SECURE_JWT_KEY_HERE # **CRITICAL: Generate a strong, unique key!**
    MARKET_DATA_API_KEY=your_exchange_api_key
    # ... other configurations for email, etc.
    ```
    # Emphasize the importance of `JWT_SECRET` for security.

### **Running the Application**

#### **Local Development (with Docker Compose)**
This is the recommended way for local development as it sets up the database.
```bash
docker-compose up --build
