import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Scalefund!',
      template: 'welcome',
      context: {
        name,
      },
    });
    this.logger.log(`Welcome email sent to ${to}`);
  }

  async sendPasswordResetEmail(to: string, name: string, resetLink: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Reset Your Password',
      template: 'reset-password',
      context: {
        name,
        resetLink,
      },
    });
    this.logger.log(`Password reset email sent to ${to}`);
  }

  async sendDailySummaryEmail(to: string, name: string, summary: any) {
    await this.mailerService.sendMail({
      to,
      subject: 'Your Daily Trading Summary',
      template: 'daily-summary',
      context: {
        name,
        trades: summary.trades,
        pnl: summary.pnl,
        winRate: summary.winRate,
      },
    });
    this.logger.log(`Daily summary email sent to ${to}`);
  }
}
