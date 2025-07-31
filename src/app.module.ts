import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KycModule } from './kyc/kyc.module';
import { MarketModule } from './market/market.module';
import { TradesModule } from './trades/trades.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RiskModule } from './risk/risk.module';
import { AdminModule } from './admin/admin.module';
import { LoggerModule } from './logger/logger.module';
import { CronModule } from './cron/cron.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    AuthModule,
    UsersModule,
    KycModule,
    MarketModule,
    TradesModule,
    PortfolioModule,
    LeaderboardModule,
    NotificationsModule,
    RiskModule,
    AdminModule,
    CronModule,
    AnalyticsModule,
    EmailModule,
  ],
})
export class AppModule {}
