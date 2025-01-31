import { UrlMetadataType } from '../../types/url-metadata.type';

export abstract class AbstractUrlMetadataService {
  abstract getMetadata(url: string): Promise<UrlMetadataType>;
}
