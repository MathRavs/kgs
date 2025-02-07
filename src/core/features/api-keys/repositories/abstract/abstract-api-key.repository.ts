import { ApiKey } from '@prisma/client';
import { ApiKeyWithOwner } from '../../types/api-key.type';

export abstract class AbstractApiKeyRepository {
  abstract findByKey(key: string): Promise<ApiKeyWithOwner>;

  abstract findByIdOrThrow(id: string): Promise<ApiKey>;

  abstract create(key: string, ownerId: string): Promise<ApiKey>;

  abstract findKeys(ownerId: string): Promise<ApiKey[]>;

  abstract deleteById(id: string): Promise<ApiKey>;
}
