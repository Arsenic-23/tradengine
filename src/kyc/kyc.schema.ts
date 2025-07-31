import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KycDocument = Kyc & Document;

@Schema({ timestamps: true })
export class Kyc {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  idType: string;

  @Prop({ required: true })
  idNumber: string;

  @Prop({ required: true })
  frontImage: string;

  @Prop({ required: true })
  backImage: string;

  @Prop({ enum: ['pending', 'verified', 'rejected'], default: 'pending' })
  status: string;
}

export const KycSchema = SchemaFactory.createForClass(Kyc);
