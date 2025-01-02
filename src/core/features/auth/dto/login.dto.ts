import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  password: string;
}

export class LoginResponseDto {
  token: string;
}
