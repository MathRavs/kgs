import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@core/database/prisma.service';
import { AbstractTemporaryAccessUrlRepository } from '@feature/url-shortener/repositories/abstract/abstract-temporary-access-url.repository';
import { TemporaryAccessUrl } from '@prisma/client';
import { TemporaryUrlWithOriginalUrl } from '@feature/url-shortener/types/temporary-url.type';

@Injectable()
export class TemporaryAccessUrlRepository extends AbstractTemporaryAccessUrlRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  createTemporaryAccessUrl(
    key: string,
    shortenedUrlId: string,
    expirationDate: Date,
  ): Promise<TemporaryAccessUrl> {
    return this.prismaService.temporaryAccessUrl.create({
      data: {
        key,
        shortenedUrlId,
        expirationDate,
      },
    });
  }

  getTemporaryAccessUrlByKey(
    key: string,
  ): Promise<TemporaryUrlWithOriginalUrl> {
    return this.prismaService.temporaryAccessUrl.findUnique({
      where: {
        key,
      },
      include: {
        shortenedUrl: true,
      },
    });
  }
}
