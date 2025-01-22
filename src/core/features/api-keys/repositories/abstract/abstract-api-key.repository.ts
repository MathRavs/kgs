import { ApiKey } from '@prisma/client';
import { ApiKeyWithOwner } from '../../types/api-key.type';

export abstract class AbstractApiKeyRepository {
  abstract findByKey(key: string): Promise<ApiKeyWithOwner>;

  abstract create(key: string, ownerId: string): Promise<ApiKey>;

  abstract findKeys(ownerId: string): Promise<ApiKey[]>;
}
