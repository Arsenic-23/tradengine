import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Analytics, AnalyticsSchema } from './analytics.schema';
import { UsersModule } from '../users/users.module';
import { TradesModule } from '../trades/trades.module';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Analytics.name, schema: AnalyticsSchema }]),
    UsersModule,
    TradesModule,
    PortfolioModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
