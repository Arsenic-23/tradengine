import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class UploadKycDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  idType: string;

  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @IsString()
  @IsNotEmpty()
  frontImage: string;

  @IsString()
  @IsNotEmpty()
  backImage: string;
}
