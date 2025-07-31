import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Kyc, KycDocument } from './kyc.schema';
import { Model } from 'mongoose';
import { UploadKycDto } from './dto/upload-kyc.dto';

@Injectable()
export class KycService {
  constructor(@InjectModel(Kyc.name) private kycModel: Model<KycDocument>) {}

  async uploadKyc(userId: string, dto: UploadKycDto) {
    const existing = await this.kycModel.findOne({ user: userId });
    if (existing) {
      await this.kycModel.updateOne({ user: userId }, { ...dto, status: 'pending' });
      return { message: 'KYC updated and submitted for verification.' };
    }
    const kyc = new this.kycModel({ ...dto, user: userId, status: 'pending' });
    await kyc.save();
    return { message: 'KYC uploaded and submitted for verification.' };
  }

  async getUserKyc(userId: string) {
    const kyc = await this.kycModel.findOne({ user: userId });
    if (!kyc) throw new NotFoundException('No KYC found.');
    return kyc;
  }

  async getAllKycs() {
    return await this.kycModel.find().populate('user');
  }

  async verifyKyc(id: string) {
    const kyc = await this.kycModel.findById(id);
    if (!kyc) throw new NotFoundException('KYC record not found');
    kyc.status = 'verified';
    await kyc.save();
    return { message: 'KYC verified successfully.' };
  }
}