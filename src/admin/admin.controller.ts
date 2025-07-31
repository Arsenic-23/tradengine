import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FlagUserDto } from './dto/flag-user.dto';
import { AdminAnalyticsDto } from './dto/admin-analytics.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('flag-user')
  async flagUser(@Body() dto: FlagUserDto) {
    return this.adminService.flagUser(dto);
  }

  @Get('analytics')
  async getAdminAnalytics(): Promise<AdminAnalyticsDto> {
    return this.adminService.getAnalytics();
  }

  @Get('flagged-users')
  async getFlaggedUsers() {
    return this.adminService.getFlaggedUsers();
  }

  @Get('user/:id')
  async getUserDetails(@Param('id') id: string) {
    return this.adminService.getUserDetails(id);
  }
}
