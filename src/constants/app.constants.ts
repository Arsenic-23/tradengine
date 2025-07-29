export const APP_NAME = 'Scalefund Trading Engine';
export const APP_DESCRIPTION = 'A full-stack backend for prop trading and retail platforms.';
export const DEFAULT_PORT = parseInt(process.env.PORT || '3000', 10);

export const RATE_LIMIT_MAX = 100;
export const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export const PASSWORD_SALT_ROUNDS = 12;
export const JWT_EXPIRY = '1h';
export const MAX_LOGIN_ATTEMPTS = 5;

export const TRADE_TIMEOUT_MS = 10000;
export const MARKET_UPDATE_INTERVAL = 1000; // 1 second
