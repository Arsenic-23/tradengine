import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Risk, RiskDocument } from './risk.schema';
import { Model } from 'mongoose';

@Injectable()
export class RiskService {
  constructor(@InjectModel(Risk.name) private riskModel: Model<RiskDocument>) {}

  async setRiskLimit(userId: string, maxLoss: number, maxDailyLoss: number) {
    const existing = await this.riskModel.findOne({ user: userId });
    if (existing) {
      existing.maxLoss = maxLoss;
      existing.maxDailyLoss = maxDailyLoss;
      return existing.save();
    }
    return this.riskModel.create({ user: userId, maxLoss, maxDailyLoss });
  }

  async getRiskLimits(userId: string) {
    return this.riskModel.findOne({ user: userId }).lean();
  }

  async updateRiskLimits(userId: string, update: Partial<{ maxLoss: number; maxDailyLoss: number }>) {
    return this.riskModel.findOneAndUpdate({ user: userId }, update, { new: true, upsert: true });
  }

  async checkRisk(userId: string, currentLoss: number, todayLoss: number): Promise<boolean> {
    const limits = await this.riskModel.findOne({ user: userId });
    if (!limits) return true;
    return currentLoss <= limits.maxLoss && todayLoss <= limits.maxDailyLoss;
  }
}
