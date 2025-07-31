import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ResetAccountsTask {
  private readonly logger = new Logger(ResetAccountsTask.name);

  constructor(private readonly usersService: UsersService) {}

  @Cron('0 0 * * 0') // Every Sunday at midnight
  async handleResetAccounts() {
    this.logger.log('Resetting user accounts to initial state...');
    await this.usersService.resetAllAccounts();
  }
}
