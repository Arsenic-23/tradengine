import { IsString } from 'class-validator';

export class FlagUserDto {
  @IsString()
  userId: string;

  @IsString()
  reason: string;
}
