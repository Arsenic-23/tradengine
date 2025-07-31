import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() body: { userId: string; message: string }) {
    return this.notificationsService.createNotification(body.userId, body.message);
  }

  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationsForUser(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') notificationId: string) {
    return this.notificationsService.markNotificationAsRead(notificationId);
  }
}
