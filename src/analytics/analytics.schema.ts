import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsDocument = Analytics & Document;

@Schema({ timestamps: true })
export class Analytics {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  totalTrades: number;

  @Prop({ default: 0 })
  profitableTrades: number;

  @Prop({ default: 0 })
  losingTrades: number;

  @Prop({ default: 0 })
  totalVolume: number;

  @Prop({ default: 0 })
  netProfit: number;

  @Prop({ default: 0 })
  winRate: number; // percentage
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
