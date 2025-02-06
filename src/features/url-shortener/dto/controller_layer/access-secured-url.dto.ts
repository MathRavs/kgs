import { IsNotEmpty, MinLength } from 'class-validator';

export class AccessSecuredUrlDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
