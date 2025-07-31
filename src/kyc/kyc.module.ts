import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { Kyc, KycSchema } from './kyc.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kyc.name, schema: KycSchema }]),
    UsersModule,
  ],
  controllers: [KycController],
  providers: [KycService],
  exports: [KycService],
})
export class KycModule {}
