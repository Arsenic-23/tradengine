import { IsOptional, IsNumber } from 'class-validator';

export class UpdatePortfolioDto {
  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsNumber()
  equity?: number;

  @IsOptional()
  @IsNumber()
  marginUsed?: number;
}
