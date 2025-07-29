import { registerAs } from '@nestjs/config';

export default registerAs('market', () => ({
  apiKey: process.env.MARKET_API_KEY || '',
  baseUrl: process.env.MARKET_BASE_URL || 'https://api.market.example.com',
}));