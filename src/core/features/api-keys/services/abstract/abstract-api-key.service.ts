import { ApiKey } from '@prisma/client';

export abstract class AbstractApiKeyService {
  abstract findApiKey(key: string): Promise<ApiKey>;

  abstract create(ownerId: string): Promise<ApiKey>;

  abstract list(ownerId: string): Promise<ApiKey[]>;
}
