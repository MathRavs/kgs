import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AbstractUrlShortenerService } from './services/abstract/abstract-url-shortener.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@core/features/api-keys/guards/api-key.guard';
import { User } from '@prisma/client';
import { CreateShortenedUrlDto } from './dto/controller_layer/create-shortened-url.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@core/pagination/dto/pagination.dto';
import { mapPaginationResultToPaginationDto } from '@core/pagination/mappers/pagination-dto.mapper';
import { ShortenedUrlMapper } from './mapper/shortened-url.mapper';
import { OpenApiPaginationResponse } from '@core/pagination/decorators/api-ok-response-paginated.decorator';
import { ShortenedUrlResponseDto } from '@feature/url-shortener/dto/controller_layer/shortened-url-response.dto';
import { AccessSecuredUrlDto } from '@feature/url-shortener/dto/controller_layer/access-secured-url.dto';
import { TemporaryAccessUrlMapper } from '@feature/url-shortener/mapper/temporary-access-url.mapper';

@ApiTags('url-shortener')
@Controller('url-shortener')
export class UrlShortenerController {
  @Inject()
  private readonly urlShortenerService: AbstractUrlShortenerService;

  @ApiSecurity('api-key')
  @Post('shorten')
  @UseGuards(ApiKeyGuard)
  async createShortenedUrl(
    @Request() { user }: { user: User },
    @Body() data: CreateShortenedUrlDto,
  ) {
    return ShortenedUrlMapper.toResponse(
      await this.urlShortenerService.createShortenedUrl(
        ShortenedUrlMapper.toCreateShortenedUrlInput(data, user.id),
      ),
    );
  }

  @Get('my-shortened-urls')
  @ApiSecurity('api-key')
  @UseGuards(ApiKeyGuard)
  @OpenApiPaginationResponse(ShortenedUrlResponseDto)
  async getMyShortenedUrl(
    @Request()
    {
      user,
    }: {
      user: User;
    },
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ShortenedUrlResponseDto>> {
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

  @Get('temporary-access-url/:key')
  @Redirect()
  async accessTemporaryLink(@Param('key') key: string) {
    const shortenedUrl = await this.urlShortenerService.accessTemporaryUrl(key);
    return { url: shortenedUrl.url };
  }

  @Get(':key')
  @Redirect()
  async viewCorrespondingUrl(@Param('key') key: string) {
    const shortenedUrl =
      await this.urlShortenerService.accessShortenedUrlByKey(key);

    return { url: shortenedUrl.url };
  }

  @Post('access-secured-url')
  async getSecuredUrlTemporaryLink(@Body() dto: AccessSecuredUrlDto) {
    return TemporaryAccessUrlMapper.toResponse(
      await this.urlShortenerService.generateTemporaryUrl(
        dto.key,
        dto.password,
      ),
    );
  }
}
