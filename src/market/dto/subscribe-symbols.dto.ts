import { IsArray, IsString } from 'class-validator';

export class SubscribeSymbolsDto {
  @IsArray()
  @IsString({ each: true })
  symbols: string[];
}
