import { Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractApiKeyService } from '../abstract/abstract-api-key.service';
import { ApiKey } from '@prisma/client';
import { AbstractApiKeyRepository } from '../../repositories/abstract/abstract-api-key.repository';
import { generateRandomCharacters } from '@core/utils/random-text-generator.util';
import { ApiKeyWithOwner } from '../../types/api-key.type';

@Injectable()
export class ApiKeyService extends AbstractApiKeyService {
  @Inject()
  private readonly apiKeyRepository: AbstractApiKeyRepository;

  @Inject()
  private readonly logger: Logger;

  constructor() {
    super();
  }

  async findApiKey(key: string): Promise<ApiKeyWithOwner> {
    this.logger.log('Retrieving api key', this.constructor.name);

    const result = await this.apiKeyRepository.findByKey(key);

    this.logger.log(
      `api key found for user ${result.ownerId}`,
      this.constructor.name,
    );
    return result;
  }

  async create(ownerId: string): Promise<ApiKey> {
    this.logger.log(
      `Creating api key for user ${ownerId}`,
      this.constructor.name,
    );

    let generatedApiKey: string;

    const apiKeys = await this.apiKeyRepository.findKeys(ownerId);

    this.logger.debug('Retrieved api keys', this.constructor.name);

    do {
      generatedApiKey = generateRandomCharacters(15);

      this.logger.debug(`Generated api key`, this.constructor.name);
    } while (this.checkIfApiKeyExists(apiKeys, generatedApiKey));

    const apiKey = await this.apiKeyRepository.create(generatedApiKey, ownerId);

    this.logger.log(`api key created`, this.constructor.name);

    return apiKey;
  }

  async list(ownerId: string): Promise<ApiKey[]> {
    const keys = await this.apiKeyRepository.findKeys(ownerId);
    this.logger.log(
      `api keys retrieved for user ${ownerId}`,
      this.constructor.name,
    );
    return keys;
  }

  private checkIfApiKeyExists(apiKeys: ApiKey[], key: string): boolean {
    const apiKeyExists = apiKeys.some((apiKey) => apiKey.key === key);

    if (apiKeyExists) {
      this.logger.warn(
        `Generated api key already exists`,
        this.constructor.name,
      );
    }

    return apiKeyExists;
  }
}
