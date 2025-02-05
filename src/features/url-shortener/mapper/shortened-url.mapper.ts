import { ShortenedUrls } from '@prisma/client';
import { CreateShortenedUrlDto } from '@feature/url-shortener/dto/controller_layer/create-shortened-url.dto';
import { CreateShortenedUrlInput } from '@feature/url-shortener/dto/service_layer/create-shortened-url.input';
import { ShortenedUrlResponseDto } from '@feature/url-shortener/dto/controller_layer/shortened-url-response.dto';

export const ShortenedUrlMapper = {
  toResponse(data: ShortenedUrls): ShortenedUrlResponseDto {
    return new ShortenedUrlResponseDto(
      data.id,
      data.name,
      data.url,
      data.key,
      data.metadata_title,
      data.metadata_description,
      data.metadata_sitename,
      data.metadata_image,
      data.metadata_favicon,
      data.password,
    );
  },
  toCreateShortenedUrlInput(
    dto: CreateShortenedUrlDto,
    ownerId: string,
  ): CreateShortenedUrlInput {
    return new CreateShortenedUrlInput(
      dto.name,
      dto.url,
      ownerId,
      dto.customUrl,
      dto.expirationDate,
      dto.password,
    );
  },
};
