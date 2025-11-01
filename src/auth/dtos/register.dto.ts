import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  name: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
