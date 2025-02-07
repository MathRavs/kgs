import { ApiKey } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';

export const assertApiKeyUserSameAsCurrentUser = (
  apiKey: ApiKey,
  currentUserId: string,
) => {
  if (apiKey.ownerId !== currentUserId) {
    throw new ForbiddenException('You are not allowed to update this resource');
  }
};
