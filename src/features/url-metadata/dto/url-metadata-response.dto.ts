export class UrlMetadataResponseDto {
  title: string;
  description: string;
  siteName: string;
  image?: string;
  favicon?: string;

  constructor(
    title: string,
    description: string,
    siteName: string,
    image?: string,
    favicon?: string,
  ) {
    this.title = title;
    this.description = description;
    this.siteName = siteName;
    this.image = image;
    this.favicon = favicon;
  }
}
