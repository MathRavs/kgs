import { ApiKey } from '@prisma/client';

export abstract class AbstractApiKeyRepository {
  abstract findByKey(key: string): Promise<ApiKey>;
  abstract create(key: string, ownerId: string): Promise<ApiKey>;
  abstract findKeys(ownerId: string): Promise<ApiKey[]>;
}
