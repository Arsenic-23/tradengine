import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Portfolio } from './portfolio.schema';
import { Model } from 'mongoose';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>,
  ) {}

  async getPortfolioByUser(userId: string) {
    const portfolio = await this.portfolioModel.findOne({ user: userId });
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    return portfolio;
  }

  async updatePortfolio(userId: string, dto: UpdatePortfolioDto) {
    const portfolio = await this.portfolioModel.findOneAndUpdate(
      { user: userId },
      { $set: dto },
      { new: true, upsert: true },
    );
    return portfolio;
  }

  async createInitialPortfolio(userId: string) {
    return this.portfolioModel.create({
      user: userId,
      balance: 0,
      holdings: [],
      equity: 0,
      marginUsed: 0,
    });
  }

  async adjustBalance(userId: string, amount: number) {
    return this.portfolioModel.findOneAndUpdate(
      { user: userId },
      { $inc: { balance: amount } },
      { new: true },
    );
  }
}
