import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/users.schema';

export type TradeDocument = Trade & Document;

@Schema({ timestamps: true })
export class Trade {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  side: 'buy' | 'sell';

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'open' })
  status: 'open' | 'closed' | 'cancelled';
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
