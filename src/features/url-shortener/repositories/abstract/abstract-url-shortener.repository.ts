import { ShortenedUrls } from '@prisma/client';
import { PaginatedResult } from '@core/pagination/utils/prisma-pagination.util';
import { UrlMetadataType } from '@feature/url-metadata/types/url-metadata.type';

export abstract class AbstractUrlShortenerRepository {
  abstract create(
    ownerId: string,
    key: string,
    url: string,
    name: string,
    metadata: UrlMetadataType,
    expirationDate?: Date,
  ): Promise<ShortenedUrls>;

  abstract list(
    ownerId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<ShortenedUrls>>;

  abstract findAll(): Promise<ShortenedUrls[]>;

  abstract findByKeyOrThrow(key: string): Promise<ShortenedUrls>;

  abstract findByKey(key: string): Promise<ShortenedUrls | undefined>;

  abstract incrementNumberOfTimesViewed(key: string): Promise<void>;
}
