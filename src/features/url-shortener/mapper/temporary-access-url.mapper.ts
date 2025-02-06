import { TemporaryAccessUrl } from '@prisma/client';
import { AccessedSecuredUrlResponseDto } from '@feature/url-shortener/dto/controller_layer/accessed-secured-url-response.dto';

export const TemporaryAccessUrlMapper = {
  toResponse: (data: TemporaryAccessUrl) => {
    const response = new AccessedSecuredUrlResponseDto();
    response.key = data.key;
    response.expirationDate = data.expirationDate;
    return response;
  },
};
