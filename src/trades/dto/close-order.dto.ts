import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CloseOrderDto {
  @IsString()
  tradeId: string;

  @IsOptional()
  @IsNumber()
  exitPrice?: number;
}
