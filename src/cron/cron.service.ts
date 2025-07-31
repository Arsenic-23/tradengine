import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron('0 0 * * *') // Runs every day at midnight
  handleMidnightTasks() {
    this.logger.log('Running scheduled midnight cron jobs...');
    // You can trigger additional logic here
  }
}
