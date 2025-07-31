import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true })
  user: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  equity: number;

  @Prop({ default: 0 })
  marginUsed: number;

  @Prop({
    type: [
      {
        symbol: { type: String },
        quantity: { type: Number },
        avgPrice: { type: Number },
      },
    ],
    default: [],
  })
  holdings: {
    symbol: string;
    quantity: number;
    avgPrice: number;
  }[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
