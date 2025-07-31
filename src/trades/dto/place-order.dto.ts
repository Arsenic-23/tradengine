import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  symbol: string;

  @IsIn(['buy', 'sell'])
  side: 'buy' | 'sell';

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  orderType?: 'market' | 'limit'; // Optional, can be extended later
}
