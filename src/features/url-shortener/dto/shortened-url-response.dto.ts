import { UrlMetadataResponseDto } from '@feature/url-metadata/dto/url-metadata-response.dto';

export class ShortenedUrlResponseDto {
  id: string;
  name: string;
  url: string;
  key: string;
  metadata: UrlMetadataResponseDto;

  constructor(
    id: string,
    name: string,
    url: string,
    key: string,
    metadataTitle: string,
    metadataDescription: string,
    metadataSiteName: string,
    metadataImage: string | null,
    metadataFavicon: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.key = key;

    this.metadata = new UrlMetadataResponseDto(
      metadataTitle,
      metadataDescription,
      metadataSiteName,
      metadataImage,
      metadataFavicon,
    );
  }
}
