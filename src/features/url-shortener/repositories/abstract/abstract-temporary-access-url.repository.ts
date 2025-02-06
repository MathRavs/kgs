import { TemporaryAccessUrl } from '@prisma/client';
import { TemporaryUrlWithOriginalUrl } from '@feature/url-shortener/types/temporary-url.type';

export abstract class AbstractTemporaryAccessUrlRepository {
  abstract createTemporaryAccessUrl(
    key: string,
    shortenedUrlId: string,
    expirationDate: Date,
  ): Promise<TemporaryAccessUrl>;

  abstract getTemporaryAccessUrlByKey(
    key: string,
  ): Promise<TemporaryUrlWithOriginalUrl>;
}
