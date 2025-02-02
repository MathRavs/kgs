import { Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractUrlShortenerService } from '../abstract/abstract-url-shortener.service';
import { ShortenedUrls } from '@prisma/client';
import * as MD5 from 'crypto-js/md5';
import { AbstractUrlShortenerRepository } from '../../repositories/abstract/abstract-url-shortener.repository';
import { AbstractSequenceManagerRepository } from '@core/database/repositories/abstract/abstract-sequence-manager.repository';
import { SequencesEnum } from '@core/database/enums/sequences.enum';
import { Base62 } from '@core/utils/base-62.util';
import { PaginationDto } from '@core/pagination/dto/pagination.dto';
import { PaginatedResult } from '@core/pagination/utils/prisma-pagination.util';
import { AbstractUrlMetadataService } from '@feature/url-metadata/services/abstract/abstract-url-metadata.service';

@Injectable()
export class UrlShortenerService extends AbstractUrlShortenerService {
  @Inject()
  private readonly urlShortenerRepository: AbstractUrlShortenerRepository;

  @Inject()
  private readonly abstractSequenceRepository: AbstractSequenceManagerRepository;

  @Inject()
  private readonly metadataService: AbstractUrlMetadataService;

  @Inject()
  private readonly logger: Logger;

  private readonly md5LengthToTakeIntoAccount = 7;

  async createShortenedUrl(
    name: string,
    url: string,
    ownerId: string,
  ): Promise<ShortenedUrls> {
    this.logger.log(`Creating shortened url`, this.constructor.name);

    const metadata = await this.metadataService.getMetadata(url);

    this.logger.debug(`Metadata fetched`, this.constructor.name);

    let urlKey = this.getMd5Suffix(MD5(url).toString());

    this.logger.debug(`Url key created`, this.constructor.name);

    this.logger.debug(
      'checking if the key already exists',
      this.constructor.name,
    );

    const existingUrl = await this.urlShortenerRepository.findByKey(
      Base62.encode(urlKey),
    );

    if (existingUrl) {
      this.logger.debug(
        'the key already exists, creating a new one',
        this.constructor.name,
      );

      const prefix = await this.createSequenceForKey();
      urlKey = `${prefix}${urlKey}`;

      this.logger.debug('new key created', this.constructor.name);
    }

    const shortenedUrl = await this.urlShortenerRepository.create(
      ownerId,
      await this.createEncodedUrl(urlKey),
      url,
      name,
      metadata,
    );

    this.logger.log('Shortened url created', this.constructor.name);

    return shortenedUrl;
  }

  async getShortenedUrls(
    ownerId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<ShortenedUrls>> {
    this.logger.log(
      `Retrieving shortened urls for user ${ownerId}`,
      this.constructor.name,
    );

    const urls = await this.urlShortenerRepository.list(
      ownerId,
      pagination.page,
      pagination.limit,
    );

    this.logger.log(`Urls retrieved ${ownerId}`, this.constructor.name);

    return urls;
  }

  /**
   * @throws an error when the owners doesn't match
   * @param key
   * @param ownerId
   */
  async getShortenedUrlByKey(key: string): Promise<ShortenedUrls> {
    this.logger.log(`Retrieving shortened url ${key}`, this.constructor.name);

    const shortenedUrl =
      await this.urlShortenerRepository.findByKeyOrThrow(key);

    this.logger.log(`shortened url ${key} retrieved`, this.constructor.name);
    return shortenedUrl;
  }

  private getMd5Suffix(MD5FromUrl: string): string {
    return MD5FromUrl.slice(0, this.md5LengthToTakeIntoAccount);
  }

  /**
   * @description creates a sequence to increment to hashed the key to make it stay unique
   */
  private async createSequenceForKey(): Promise<string> {
    const nextVal = await this.abstractSequenceRepository.getNextVal(
      SequencesEnum.URL,
    );
    return nextVal.id;
  }

  private async createEncodedUrl(key: string): Promise<string> {
    return Base62.encode(key);
  }
}
