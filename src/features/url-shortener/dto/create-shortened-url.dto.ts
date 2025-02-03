import { IsNotEmpty, IsOptional, IsUrl, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateShortenedUrlDto {
  @IsUrl()
  url: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Value must be alphanumeric' })
  @Transform(({ value }) => value || undefined)
  customUrl?: string;
}
