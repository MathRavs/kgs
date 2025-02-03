import { ShortenedUrls } from '@prisma/client';
import { PaginationDto } from '@core/pagination/dto/pagination.dto';
import { PaginatedResult } from '@core/pagination/utils/prisma-pagination.util';

export abstract class AbstractUrlShortenerService {
  abstract createShortenedUrl(
    name: string,
    url: string,
    ownerId: string,
    customUrl?: string | null,
  ): Promise<ShortenedUrls>;

  abstract getShortenedUrls(
    ownerId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<ShortenedUrls>>;

  abstract getShortenedUrlByKey(key: string): Promise<ShortenedUrls>;

  abstract incrementNumberOfTimesViewed(key: string): Promise<void>;
}
