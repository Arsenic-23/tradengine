import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TradesService } from '../../trades/trades.service';

@Injectable()
export class ClosePositionsTask {
  private readonly logger = new Logger(ClosePositionsTask.name);

  constructor(private readonly tradesService: TradesService) {}

  @Cron('0 15 * * 1-5') // At 3 PM every weekday
  async handleCloseOpenPositions() {
    this.logger.log('Closing all open positions for users...');
    await this.tradesService.autoCloseAllOpenPositions();
  }
}
