import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractUrlShortenerService } from '../abstract/abstract-url-shortener.service';
import { ShortenedUrls, TemporaryAccessUrl } from '@prisma/client';
import * as MD5 from 'crypto-js/md5';
import { AbstractUrlShortenerRepository } from '../../repositories/abstract/abstract-url-shortener.repository';
import { AbstractSequenceManagerRepository } from '@core/database/repositories/abstract/abstract-sequence-manager.repository';
import { SequencesEnum } from '@core/database/enums/sequences.enum';
import { Base62 } from '@core/utils/base-62.util';
import { PaginationDto } from '@core/pagination/dto/pagination.dto';
import { PaginatedResult } from '@core/pagination/utils/prisma-pagination.util';
import { AbstractUrlMetadataService } from '@feature/url-metadata/services/abstract/abstract-url-metadata.service';
import { generateRandomCharacters } from '@core/utils/random-text-generator.util';
import {
  assertUrlIsNotSecured,
  assertUrlIsSecured,
  assertUrlStillValid,
  createExpirationDate,
} from '@feature/url-shortener/utils/url-shortener.utils';
import { BcryptService } from '@core/encryption/bcrypt.service';
import { CreateShortenedUrlInput } from '@feature/url-shortener/dto/service_layer/create-shortened-url.input';
import { AbstractTemporaryAccessUrlRepository } from '@feature/url-shortener/repositories/abstract/abstract-temporary-access-url.repository';
import {
  assertTemporaryUrlHasBeenAccessed,
  assertTemporaryUrlIsExpired,
} from '@feature/url-shortener/utils/temporary-access-url.utils';

@Injectable()
export class UrlShortenerService extends AbstractUrlShortenerService {
  @Inject()
  private readonly urlShortenerRepository: AbstractUrlShortenerRepository;

  @Inject()
  private readonly abstractSequenceRepository: AbstractSequenceManagerRepository;

  @Inject()
  private readonly metadataService: AbstractUrlMetadataService;

  @Inject()
  private readonly abstractTemporaryUrlRepository: AbstractTemporaryAccessUrlRepository;

  @Inject()
  private readonly logger: Logger;

  @Inject()
  private readonly bcryptService: BcryptService;

  private readonly md5LengthToTakeIntoAccount = 7;

  async createShortenedUrl(
    input: CreateShortenedUrlInput,
  ): Promise<ShortenedUrls> {
    const { name, url, customUrl, expirationDate, ownerId, password } = input;

    this.logger.log(`Creating shortened url`, this.constructor.name);

    this.logger.debug(`Fetching metadata`, this.constructor.name);

    const metadata = await this.metadataService.getMetadata(url);

    this.logger.debug(`Metadata fetched`, this.constructor.name);

    const key = await (customUrl
      ? this.manageCustomUrl(customUrl)
      : this.generateRandomKey(url));

    const customPassword = password
      ? this.bcryptService.hashPassword(password)
      : undefined;

    const shortenedUrl = await this.urlShortenerRepository.create(
      ownerId,
      key,
      url,
      name,
      metadata,
      expirationDate,
      customPassword,
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
   * @param key
   */
  async getShortenedUrlByKey(key: string): Promise<ShortenedUrls> {
    this.logger.log(`Retrieving shortened url ${key}`, this.constructor.name);

    const shortenedUrl =
      await this.urlShortenerRepository.findByKeyOrThrow(key);

    this.logger.log(`shortened url ${key} retrieved`, this.constructor.name);
    return shortenedUrl;
  }

  async incrementNumberOfTimesViewed(key: string): Promise<void> {
    this.logger.log(
      `Incrementing number of times viewed for shortened url ${key}`,
      this.constructor.name,
    );

    await this.urlShortenerRepository.incrementNumberOfTimesViewed(key);

    this.logger.log(`Number of views incremented`, this.constructor.name);
  }

  async accessShortenedUrlByKey(key: string): Promise<ShortenedUrls> {
    this.logger.debug('accessing the url', this.constructor.name);

    const url = await this.getShortenedUrlByKey(key);

    this.logger.debug(
      'validating if the url is secured',
      this.constructor.name,
    );

    assertUrlIsNotSecured(url);

    this.logger.debug(
      'validating if the url is expired',
      this.constructor.name,
    );

    assertUrlStillValid(url);

    await this.incrementNumberOfTimesViewed(key);

    return url;
  }

  async generateTemporaryUrl(
    key: string,
    password: string,
  ): Promise<TemporaryAccessUrl> {
    this.logger.log('Accessing secured url', this.constructor.name);

    this.logger.debug('retrieving the url', this.constructor.name);

    const originalShortedUrl = await this.getShortenedUrlByKey(key);

    this.logger.debug('url retrieved', this.constructor.name);

    assertUrlStillValid(originalShortedUrl);
    assertUrlIsSecured(originalShortedUrl);

    if (
      !this.bcryptService.verifyPassword(password, originalShortedUrl.password)
    ) {
      throw new ForbiddenException('The given password is incorrect');
    }

    this.logger.debug('the url is secure', this.constructor.name);

    const urlMd5 = this.getMd5Suffix(MD5(key).toString(), 4);

    const generateKey = () => {
      return this.createEncodedUrl(`${urlMd5}${generateRandomCharacters(4)}`);
    };

    let temporaryUrlKey = generateKey();

    while (
      await this.abstractTemporaryUrlRepository.getTemporaryAccessUrlByKey(
        temporaryUrlKey,
      )
    ) {
      this.logger.debug(
        'duplicate key found for temporary access url, generating a new key',
        this.constructor.name,
      );

      temporaryUrlKey = generateKey();
    }

    this.logger.debug('key generated', this.constructor.name);

    const temporaryUrl =
      await this.abstractTemporaryUrlRepository.createTemporaryAccessUrl(
        temporaryUrlKey,
        originalShortedUrl.id,
        createExpirationDate(2),
      );

    this.logger.debug('temporary url generated', this.constructor.name);

    return temporaryUrl;
  }

  async accessTemporaryUrl(key: string): Promise<ShortenedUrls> {
    this.logger.log(
      `Accessing the temporary access url`,
      this.constructor.name,
    );

    const temporaryUrl =
      await this.abstractTemporaryUrlRepository.getTemporaryAccessUrlByKey(key);

    this.logger.debug(
      `Validating if the temporary url is accessible`,
      this.constructor.name,
    );

    assertTemporaryUrlIsExpired(temporaryUrl);

    assertTemporaryUrlHasBeenAccessed(temporaryUrl);

    assertUrlStillValid(temporaryUrl.shortenedUrl);

    this.logger.log(`Temporary access url retrieved`, this.constructor.name);

    await this.incrementNumberOfTimesViewed(temporaryUrl.shortenedUrl.key);

    return temporaryUrl.shortenedUrl;
  }

  private getMd5Suffix(
    MD5FromUrl: string,
    length = this.md5LengthToTakeIntoAccount,
  ): string {
    return MD5FromUrl.slice(0, length);
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

  private createEncodedUrl(key: string): string {
    console.log({
      key,
    });
    return Base62.encode(key);
  }

  private async generateRandomKey(url: string): Promise<string> {
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
    return this.createEncodedUrl(urlKey);
  }

  private async manageCustomUrl(customUrl: string): Promise<string> {
    this.logger.debug(
      'checking if the key already exists',
      this.constructor.name,
    );

    let key = customUrl;

    const fetchByKey = (key: string) => {
      return this.urlShortenerRepository.findByKey(key);
    };

    let existingUrl: ShortenedUrls = await fetchByKey(key);

    while (existingUrl) {
      this.logger.debug(
        'the key already exists, customizing the actual one',
        this.constructor.name,
      );

      const generatedSuffix = generateRandomCharacters(2);

      this.logger.debug(`Appending ${generatedSuffix}`, this.constructor.name);

      key = `${key}-${generatedSuffix}`;
      existingUrl = await fetchByKey(key);
    }

    this.logger.debug('new key created', this.constructor.name);

    return key;
  }
}
