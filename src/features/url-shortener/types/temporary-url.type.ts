import { ShortenedUrls, TemporaryAccessUrl } from '@prisma/client';

export type TemporaryUrlWithOriginalUrl = TemporaryAccessUrl & {
  shortenedUrl: ShortenedUrls;
};
