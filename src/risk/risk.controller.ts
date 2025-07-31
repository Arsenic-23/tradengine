import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { RiskService } from './risk.service';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  async setRiskLimit(@Body() body: { userId: string; maxLoss: number; maxDailyLoss: number }) {
    return this.riskService.setRiskLimit(body.userId, body.maxLoss, body.maxDailyLoss);
  }

  @Get(':userId')
  async getRiskLimits(@Param('userId') userId: string) {
    return this.riskService.getRiskLimits(userId);
  }

  @Patch(':userId')
  async updateRisk(@Param('userId') userId: string, @Body() update: Partial<{ maxLoss: number; maxDailyLoss: number }>) {
    return this.riskService.updateRiskLimits(userId, update);
  }
}
