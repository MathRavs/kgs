import { ShortenedUrls } from '@prisma/client';
import { PaginationDto } from '@core/pagination/dto/pagination.dto';
import { PaginatedResult } from '@core/pagination/utils/prisma-pagination.util';

export abstract class AbstractUrlShortenerService {
  abstract createShortenedUrl(
    name: string,
    url: string,
    ownerId: string,
    customUrl?: string,
    expirationDate?: Date,
  ): Promise<ShortenedUrls>;

  abstract getShortenedUrls(
    ownerId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<ShortenedUrls>>;

  /**
   * @description get the target url by key
   * @param {string} key
   */
  abstract getShortenedUrlByKey(key: string): Promise<ShortenedUrls>;

  /**
   * get the target url by key
   * @description
   * This function retrieves the url object by key
   * Then checks if the url is expired
   * Throws an error if so
   * Then increments the view count
   * Then returns the url object
   * @param {string} key
   */
  abstract accessShortenedUrlByKey(key: string): Promise<ShortenedUrls>;

  abstract incrementNumberOfTimesViewed(key: string): Promise<void>;
}
