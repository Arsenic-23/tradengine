import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trade } from './trades.schema';
import { Model } from 'mongoose';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradesService {
  constructor(
    @InjectModel(Trade.name) private readonly tradeModel: Model<Trade>,
  ) {}

  async createTrade(dto: CreateTradeDto, userId: string) {
    const trade = new this.tradeModel({ ...dto, user: userId });
    return await trade.save();
  }

  async getUserTrades(userId: string) {
    return this.tradeModel.find({ user: userId }).sort({ createdAt: -1 });
  }

  async getTradesBySymbol(symbol: string) {
    return this.tradeModel.find({ symbol }).sort({ createdAt: -1 });
  }

  async getAllTrades() {
    return this.tradeModel.find().sort({ createdAt: -1 });
  }
}
