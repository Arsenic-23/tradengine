import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Request } from 'express';

@Controller('portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getUserPortfolio(@Req() req: Request) {
    return this.portfolioService.getPortfolioByUser(req.user['userId']);
  }

  @Patch()
  updatePortfolio(@Req() req: Request, @Body() dto: UpdatePortfolioDto) {
    return this.portfolioService.updatePortfolio(req.user['userId'], dto);
  }
}
