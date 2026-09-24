
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString()
  @Length(2, 255)
  address!: string;

  @IsEmail()
  emailAddress!: string;

  @IsString()
  @Length(7, 20)
  phoneNumber!: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsString()
  @Length(3, 3)
  currency!: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

