import { ApiKey } from '@prisma/client';
import { ApiKeyWithOwner } from '../../types/api-key.type';

export abstract class AbstractApiKeyService {
  abstract findApiKey(key: string): Promise<ApiKeyWithOwner>;

  abstract create(ownerId: string): Promise<ApiKey>;

  abstract list(ownerId: string): Promise<ApiKey[]>;
}
