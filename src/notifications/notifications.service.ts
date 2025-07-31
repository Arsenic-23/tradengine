import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notifications.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(userId: string, message: string) {
    const notification = new this.notificationModel({
      user: userId,
      message,
    });
    return notification.save();
  }

  async getNotificationsForUser(userId: string) {
    return this.notificationModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async markNotificationAsRead(notificationId: string) {
    return this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true });
  }
}
