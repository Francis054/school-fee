import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(2, 100)
  firstName!: string;

  @IsString()
  @Length(2, 100)
  lastName!: string;

  @IsEmail()
  emailAddress!: string;

  @IsString()
  @Length(8, 150)
  password!: string;

  @IsString()
  @Length(8, 150)
  confirmedPassword!: string;

  @IsString()
  @Length(7, 20)
  phoneNumber!: string;
}