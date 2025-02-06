import { ShortenedUrls } from '@prisma/client';
import { addDays, isFuture } from 'date-fns';
import { ForbiddenException, GoneException } from '@nestjs/common';

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

export const assertUrlIsNotSecured = (shortenedUrl: ShortenedUrls) => {
  if (shortenedUrl.password) {
    throw new ForbiddenException('the requested url is secured');
  }
};

export const assertUrlIsSecured = (shortenedUrl: ShortenedUrls) => {
  if (!shortenedUrl.password) {
    throw new ForbiddenException('the requested url is not secured');
  }
};

/**
 * @param {number} lifetime number of days
 */
export const createExpirationDate = (lifetime: number) => {
  return addDays(new Date(), lifetime);
};
