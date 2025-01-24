import { ShortenedUrls } from '@prisma/client';
import { ShortenedUrlResponseDto } from '../dto/shortened-url-response.dto';

export const ShortenedUrlMapper = {
  toResponse(data: ShortenedUrls): ShortenedUrlResponseDto {
    return new ShortenedUrlResponseDto(data.id, data.name, data.url, data.key);
  },
};
