import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics, AnalyticsDocument } from './analytics.schema';
import { Model } from 'mongoose';
import { TradesService } from '../trades/trades.service';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private analyticsModel: Model<AnalyticsDocument>,
    private tradesService: TradesService,
    private portfolioService: PortfolioService,
  ) {}

  async updateAnalyticsForUser(userId: string): Promise<void> {
    const trades = await this.tradesService.getAllTradesForUser(userId);
    const totalTrades = trades.length;
    const profitableTrades = trades.filter(t => t.profit > 0).length;
    const losingTrades = trades.filter(t => t.profit < 0).length;
    const totalVolume = trades.reduce((sum, t) => sum + Math.abs(t.volume), 0);
    const netProfit = trades.reduce((sum, t) => sum + (t.profit || 0), 0);
    const winRate = totalTrades ? (profitableTrades / totalTrades) * 100 : 0;

    await this.analyticsModel.findOneAndUpdate(
      { userId },
      {
        userId,
        totalTrades,
        profitableTrades,
        losingTrades,
        totalVolume,
        netProfit,
        winRate: parseFloat(winRate.toFixed(2)),
      },
      { upsert: true, new: true },
    );
  }

  async getUserAnalytics(userId: string): Promise<Analytics> {
    return this.analyticsModel.findOne({ userId });
  }

  async getPlatformStats() {
    const analytics = await this.analyticsModel.find();
    const totalUsers = analytics.length;
    const totalTrades = analytics.reduce((sum, a) => sum + a.totalTrades, 0);
    const totalProfit = analytics.reduce((sum, a) => sum + a.netProfit, 0);
    const averageWinRate =
      totalUsers > 0
        ? analytics.reduce((sum, a) => sum + a.winRate, 0) / totalUsers
        : 0;

    return {
      totalUsers,
      totalTrades,
      totalProfit,
      averageWinRate: parseFloat(averageWinRate.toFixed(2)),
    };
  }
}
