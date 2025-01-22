import { ShortenedUrls } from '@prisma/client';

export abstract class AbstractUrlShortenerService {
  abstract createShortenedUrl(
    name: string,
    url: string,
    ownerId: string,
  ): Promise<ShortenedUrls>;

  abstract getShortenedUrls(ownerId: string): Promise<ShortenedUrls[]>;

  abstract getShortenedUrlByKey(key: string): Promise<ShortenedUrls>;
}
