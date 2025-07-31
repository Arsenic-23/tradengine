import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Trade, TradeDocument } from '../trades/trades.schema';
import { Portfolio, PortfolioDocument } from '../portfolio/portfolio.schema';
import { FlagUserDto } from './dto/flag-user.dto';
import { AdminAnalyticsDto } from './dto/admin-analytics.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Trade.name) private tradeModel: Model<TradeDocument>,
    @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
  ) {}

  async flagUser(dto: FlagUserDto) {
    return this.userModel.findByIdAndUpdate(
      dto.userId,
      { isFlagged: true, flaggedReason: dto.reason },
      { new: true },
    );
  }

  async getFlaggedUsers() {
    return this.userModel.find({ isFlagged: true }).lean();
  }

  async getUserDetails(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    const trades = await this.tradeModel.find({ userId }).lean();
    const portfolio = await this.portfolioModel.findOne({ userId }).lean();
    return { user, trades, portfolio };
  }

  async getAnalytics(): Promise<AdminAnalyticsDto> {
    const totalUsers = await this.userModel.countDocuments();
    const totalTrades = await this.tradeModel.countDocuments();
    const totalPortfolioValue = await this.portfolioModel.aggregate([
      { $group: { _id: null, total: { $sum: '$totalValue' } } },
    ]);

    return {
      totalUsers,
      totalTrades,
      totalPortfolioValue: totalPortfolioValue[0]?.total || 0,
      flaggedUsers: await this.userModel.countDocuments({ isFlagged: true }),
    };
  }
}