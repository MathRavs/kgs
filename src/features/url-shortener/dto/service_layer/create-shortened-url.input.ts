export class CreateShortenedUrlInput {
  name: string;
  url: string;
  ownerId: string;
  customUrl?: string;
  expirationDate?: Date;
  password?: string;

  constructor(
    name: string,
    url: string,
    ownerId: string,
    customUrl?: string,
    expirationDate?: Date,
    password?: string,
  ) {
    this.name = name;
    this.url = url;
    this.ownerId = ownerId;
    this.customUrl = customUrl;
    this.expirationDate = expirationDate;
    this.password = password;
  }
}
