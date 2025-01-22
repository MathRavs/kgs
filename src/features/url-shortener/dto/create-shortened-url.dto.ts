import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortenedUrlDto {
  @IsUrl()
  url: string;

  @IsNotEmpty()
  name: string;
}
