import { ShortenedUrls } from '@prisma/client';

export abstract class AbstractUrlShortenerRepository {
  abstract create(
    ownerId: string,
    key: string,
    url: string,
    name: string,
  ): Promise<ShortenedUrls>;

  abstract list(ownerId: string): Promise<ShortenedUrls[]>;

  abstract findAll(): Promise<ShortenedUrls[]>;

  abstract findByKeyOrThrow(key: string): Promise<ShortenedUrls>;

  abstract findByKey(key: string): Promise<ShortenedUrls | undefined>;
}
