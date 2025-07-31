import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { ResetAccountsTask } from './tasks/reset-accounts.task';
import { ClosePositionsTask } from './tasks/close-positions.task';
import { UsersModule } from '../users/users.module';
import { TradesModule } from '../trades/trades.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    TradesModule,
    PortfolioModule,
    LoggerModule,
  ],
  providers: [CronService, ResetAccountsTask, ClosePositionsTask],
})
export class CronModule {}
