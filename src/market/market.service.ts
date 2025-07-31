import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketService {
  private prices: Record<string, number> = {
    BTCUSD: 28957.43,
    ETHUSD: 1811.93,
    AAPL: 179.43,
    TSLA: 261.18,
    META: 303.89,
    GOOG: 137.93,
  };

  getAvailableSymbols(): string[] {
    return Object.keys(this.prices);
  }

  getPrice(symbol: string): number | null {
    return this.prices[symbol] ?? null;
  }

  updatePrice(symbol: string, price: number) {
    this.prices[symbol] = price;
  }

  getAllPrices(): Record<string, number> {
    return this.prices;
  }
}
