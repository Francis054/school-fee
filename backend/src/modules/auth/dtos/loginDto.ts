import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
    
  @IsEmail()
  emailAddress!: string;

  @IsString()
  @Length(8, 150)
  password!: string;

 
}