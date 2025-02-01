import { Injectable } from '@nestjs/common';
import { AbstractUrlShortenerService } from '../abstract/abstract-url-shortener.service';
import { ShortenedUrls } from '@prisma/client';
import * as MD5 from 'crypto-js/md5';
import { AbstractUrlShortenerRepository } from '../../repositories/abstract/abstract-url-shortener.repository';
import { AbstractSequenceManagerRepository } from '../../../../core/database/repositories/abstract/abstract-sequence-manager.repository';
import { SequencesEnum } from '../../../../core/database/enums/sequences.enum';
import { Base62 } from '../../../../core/utils/base-62.util';
import { PaginationDto } from '../../../../core/pagination/dto/pagination.dto';
import { PaginatedResult } from '../../../../core/pagination/utils/prisma-pagination.util';
import { AbstractUrlMetadataService } from '../../../url-metadata/services/abstract/abstract-url-metadata.service';

@Injectable()
export class UrlShortenerService extends AbstractUrlShortenerService {
  constructor(
    private readonly urlShortenerRepository: AbstractUrlShortenerRepository,
    private readonly abstractSequenceRepository: AbstractSequenceManagerRepository,
    private readonly metadataService: AbstractUrlMetadataService,
  ) {
    super();
  }

  private readonly md5LengthToTakeIntoAccount = 7;

  async createShortenedUrl(
    name: string,
    url: string,
    ownerId: string,
  ): Promise<ShortenedUrls> {
    const metadata = await this.metadataService.getMetadata(url);

    let urlKey = this.getMd5Suffix(MD5(url).toString());

    const existingUrl = await this.urlShortenerRepository.findByKey(
      Base62.encode(urlKey),
    );

    if (existingUrl) {
      const prefix = await this.createSequenceForKey();
      urlKey = `${prefix}${urlKey}`;
    }

    return this.urlShortenerRepository.create(
      ownerId,
      await this.createEncodedUrl(urlKey),
      url,
      name,
      metadata,
    );
  }

  async getShortenedUrls(
    ownerId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<ShortenedUrls>> {
    return this.urlShortenerRepository.list(
      ownerId,
      pagination.page,
      pagination.limit,
    );
  }

  /**
   * @throws an error when the owners doesn't match
   * @param key
   * @param ownerId
   */
  async getShortenedUrlByKey(key: string): Promise<ShortenedUrls> {
    return this.urlShortenerRepository.findByKeyOrThrow(key);
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
