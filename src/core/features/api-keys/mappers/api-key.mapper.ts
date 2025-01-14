import { ApiKeyResponseDto } from '../dto/api-key-response.dto';
import { ApiKey } from '@prisma/client';

export const ApiKeyMapper = {
  toApiKeyResponse(apiKey: ApiKey): ApiKeyResponseDto {
    const apiKeyResponseDto = new ApiKeyResponseDto();
    apiKeyResponseDto.key = apiKey.key;
    apiKeyResponseDto.id = apiKey.id;

    return apiKeyResponseDto;
  },
  toApiKeyResponseArray(apiKeys: ApiKey[]): ApiKeyResponseDto[] {
    return apiKeys.map((apiKey) => this.toApiKeyResponse(apiKey));
  },
};
