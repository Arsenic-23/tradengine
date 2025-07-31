import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeaderboardDocument = HydratedDocument<Leaderboard>;

@Schema({ timestamps: true })
export class Leaderboard {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ default: 0 })
  profit: number;

  @Prop({ default: 0 })
  returnPercent: number;
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
