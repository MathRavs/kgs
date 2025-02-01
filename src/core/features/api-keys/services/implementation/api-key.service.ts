import { Injectable } from '@nestjs/common';
import { AbstractApiKeyService } from '../abstract/abstract-api-key.service';
import { ApiKey } from '@prisma/client';
import { AbstractApiKeyRepository } from '../../repositories/abstract/abstract-api-key.repository';
import { generateRandomCharacters } from '@core/utils/random-text-generator.util';
import { ApiKeyWithOwner } from '../../types/api-key.type';

@Injectable()
export class ApiKeyService extends AbstractApiKeyService {
  constructor(private readonly apiKeyRepository: AbstractApiKeyRepository) {
    super();
  }

  findApiKey(key: string): Promise<ApiKeyWithOwner> {
    return this.apiKeyRepository.findByKey(key);
  }

  async create(ownerId: string): Promise<ApiKey> {
    let generatedApiKey: string;
    const apiKeys = await this.apiKeyRepository.findKeys(ownerId);

    do {
      generatedApiKey = generateRandomCharacters(15);
    } while (apiKeys.some((apiKey) => apiKey.key === generatedApiKey));

    return this.apiKeyRepository.create(generatedApiKey, ownerId);
  }

  list(ownerId: string): Promise<ApiKey[]> {
    return this.apiKeyRepository.findKeys(ownerId);
  }
}
