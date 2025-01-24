import { AbstractUrlShortenerRepository } from '../abstract/abstract-url-shortener.repository';
import { Injectable } from '@nestjs/common';
import { Prisma, ShortenedUrls } from '@prisma/client';
import { PrismaService } from '../../../../core/database/prisma.service';
import {
  paginate,
  PaginatedResult,
} from '../../../../core/pagination/utils/prisma-pagination.util';

@Injectable()
export class UrlShortenerRepository extends AbstractUrlShortenerRepository {
  constructor(private prismaService: PrismaService) {
    super();
  }

  create(
    ownerId: string,
    key: string,
    url: string,
    name: string,
  ): Promise<ShortenedUrls> {
    return this.prismaService.shortenedUrls.create({
      data: {
        key,
        ownerId,
        name,
        url,
      },
    });
  }

  findByKey(key: string): Promise<ShortenedUrls | undefined> {
    return this.prismaService.shortenedUrls.findUnique({
      where: {
        key,
      },
    });
  }

  findByKeyOrThrow(key: string): Promise<ShortenedUrls> {
    return this.prismaService.shortenedUrls.findUniqueOrThrow({
      where: {
        key,
      },
    });
  }

  list(
    ownerId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<ShortenedUrls>> {
    return paginate<
      ShortenedUrls,
      Prisma.ShortenedUrlsWhereInput,
      Prisma.ShortenedUrlsOrderByWithAggregationInput
    >('ShortenedUrls', { page, limit }, this.prismaService, {
      where: {
        ownerId,
      },
    });
  }

  findAll(): Promise<ShortenedUrls[]> {
    return this.prismaService.shortenedUrls.findMany();
  }
}
