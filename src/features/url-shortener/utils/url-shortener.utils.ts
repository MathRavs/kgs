import { ShortenedUrls } from '@prisma/client';
import { isFuture } from 'date-fns';
import { GoneException } from '@nestjs/common';

/**
 * @description validate if the url is a expired or not
 * @param {ShortenedUrls} shortenedUrl
 */
export const assertUrlStillValid = (shortenedUrl: ShortenedUrls) => {
  const isFutureUrl =
    !shortenedUrl.expirationDate || isFuture(shortenedUrl.expirationDate);

  if (!isFutureUrl) {
    throw new GoneException(
      'The requested url has expired and cannot be accessed.',
    );
  }
};
