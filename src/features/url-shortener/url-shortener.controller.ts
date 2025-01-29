import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AbstractUrlShortenerService } from './services/abstract/abstract-url-shortener.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../../core/features/api-keys/guards/api-key.guard';
import { User } from '@prisma/client';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { PaginationDto } from '../../core/pagination/dto/pagination.dto';
import { mapPaginationResultToPaginationDto } from '../../core/pagination/mappers/pagination-dto.mapper';
import { ShortenedUrlMapper } from './mapper/shortened-url.mapper';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('url-shortener')
@Controller('url-shortener')
export class UrlShortenerController {
  constructor(
    private readonly urlShortenerService: AbstractUrlShortenerService,
  ) {}

  @ApiSecurity('api-key')
  @Post('shorten')
  @UseGuards(ApiKeyGuard)
  createShortenedUrl(
    @Request() { user }: { user: User },
    @Body() data: CreateShortenedUrlDto,
  ) {
    return this.urlShortenerService.createShortenedUrl(
      data.name,
      data.url,
      user.id,
    );
  }

  @Get('my-shortened-urls')
  @ApiSecurity('api-key')
  @UseGuards(ApiKeyGuard)
  async getMyShortenedUrl(
    @Request()
    {
      user,
    }: {
      user: User;
    },
    @Query() paginationDto: PaginationDto,
  ) {
    const results = await this.urlShortenerService.getShortenedUrls(
      user.id,
      paginationDto,
    );
    return mapPaginationResultToPaginationDto(
      paginationDto.limit,
      paginationDto.page,
      results,
      (value) => ShortenedUrlMapper.toResponse(value),
    );
  }

  @Get(':key')
  @CacheTTL(20_000)
  @UseInterceptors(CacheInterceptor)
  @Redirect()
  async getCorrespondingUrl(@Param('key') key: string) {
    const shortenedUrl =
      await this.urlShortenerService.getShortenedUrlByKey(key);

    return { url: shortenedUrl.url };
  }
}
