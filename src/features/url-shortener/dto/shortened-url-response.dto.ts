export class ShortenedUrlResponseDto {
  id: string;
  name: string;
  url: string;
  key: string;

  constructor(id: string, name: string, url: string, key: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.key = key;
  }
}
