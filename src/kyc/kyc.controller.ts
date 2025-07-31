import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { KycService } from './kyc.service';
import { UploadKycDto } from './dto/upload-kyc.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  async uploadKyc(@Request() req, @Body() dto: UploadKycDto) {
    return this.kycService.uploadKyc(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyKyc(@Request() req) {
    return this.kycService.getUserKyc(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('all')
  async getAllKycs() {
    return this.kycService.getAllKycs();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('verify/:id')
  async verifyKyc(@Param('id') id: string) {
    return this.kycService.verifyKyc(id);
  }
}
