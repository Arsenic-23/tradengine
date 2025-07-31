import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Leaderboard, LeaderboardDocument } from './leaderboard.schema';
import { Model } from 'mongoose';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Leaderboard.name)
    private leaderboardModel: Model<LeaderboardDocument>,
  ) {}

  async updateUserPerformance(userId: string, profit: number, returnPercent: number) {
    await this.leaderboardModel.findOneAndUpdate(
      { user: userId },
      { $set: { profit, returnPercent } },
      { upsert: true, new: true },
    );
  }

  async getRankings(type: 'profit' | 'percent' = 'profit') {
    const sortField = type === 'percent' ? 'returnPercent' : 'profit';
    const rankings = await this.leaderboardModel
      .find()
      .sort({ [sortField]: -1 })
      .limit(100)
      .lean();

    return rankings.map((entry, index) => ({
      rank: index + 1,
      user: entry.user,
      profit: entry.profit,
      returnPercent: entry.returnPercent,
    }));
  }
}
