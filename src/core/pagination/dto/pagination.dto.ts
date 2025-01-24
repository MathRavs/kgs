import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  constructor(
    data: T[],
    total: number,
    page: number,
    limit: number,
    totalPages: number,
  ) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = totalPages;
  }
}

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'Page number', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number.parseInt(value, 10))
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    required: false,
  })
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}
