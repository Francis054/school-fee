import {
  IsBoolean,
  IsEmail,
  IsOptional,
  isString,
  IsString,
  isStrongPassword,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  firstName!: string;

  @IsString()
  @Length(2, 100)
  lastName!: string;

  @IsEmail()
  @IsString()
  emailAddress!: string;

  @Length(8, 150)
  @IsString()
  password!: string;

  @IsString()
  @Length(8,150)
  confirmedPassword!: string;

  @IsString()
  @Length(10, 10)
  phoneNumber!: string;
}
