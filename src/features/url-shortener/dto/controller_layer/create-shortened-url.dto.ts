import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsFutureDateConstraint } from '@core/constraints/date.constraints';
import { transformToIsoDateOrUndefined } from '@core/transformers/iso-date.transformer';

export class CreateShortenedUrlDto {
  @IsUrl()
  url: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Value must be alphanumeric' })
  @Transform(({ value }) => value || undefined)
  customUrl?: string;

  @IsOptional()
  @Transform(({ value }) => transformToIsoDateOrUndefined(value))
  @Validate(IsFutureDateConstraint)
  expirationDate?: Date;

  @IsOptional()
  @MinLength(8)
  password?: string;
}
