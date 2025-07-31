import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RiskDocument = HydratedDocument<Risk>;

@Schema({ timestamps: true })
export class Risk {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ required: true })
  maxLoss: number;

  @Prop({ required: true })
  maxDailyLoss: number;
}

export const RiskSchema = SchemaFactory.createForClass(Risk);
