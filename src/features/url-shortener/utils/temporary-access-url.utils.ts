import { TemporaryAccessUrl } from '@prisma/client';
import { isPast } from 'date-fns';
import { ForbiddenException, GoneException } from '@nestjs/common';

export const assertTemporaryUrlIsExpired = (
  temporaryUrl: TemporaryAccessUrl,
) => {
  if (isPast(temporaryUrl.expirationDate)) {
    throw new GoneException('the url has expired');
  }
};

export const assertTemporaryUrlHasBeenAccessed = (
  temporaryUrl: TemporaryAccessUrl,
) => {
  if (temporaryUrl.accessed) {
    throw new ForbiddenException(
      'the url has already been accessed , generate a new one',
    );
  }
};
