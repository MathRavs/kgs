import { ApiKey, User } from '@prisma/client';

export type ApiKeyWithOwner = ApiKey & { owner: User };
