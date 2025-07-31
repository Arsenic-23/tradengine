import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskController } from './risk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Risk, RiskSchema } from './risk.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }])],
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}
