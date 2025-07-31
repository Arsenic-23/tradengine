import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TradesService } from './trades.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateTradeDto } from './dto/create-trade.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTrade(
    @Body() dto: CreateTradeDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.tradesService.createTrade(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTrades(@CurrentUser('_id') userId: string) {
    return this.tradesService.getUserTrades(userId);
  }

  @Get('symbol')
  async getTradesBySymbol(@Query('symbol') symbol: string) {
    return this.tradesService.getTradesBySymbol(symbol);
  }
}
