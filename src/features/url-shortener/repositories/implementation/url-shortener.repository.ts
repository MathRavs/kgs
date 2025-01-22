import { AbstractUrlShortenerRepository } from '../abstract/abstract-url-shortener.repository';
import { Injectable } from '@nestjs/common';
import { ShortenedUrls } from '@prisma/client';
import { PrismaService } from '../../../../core/database/prisma.service';

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

  list(ownerId: string): Promise<ShortenedUrls[]> {
    return this.prismaService.shortenedUrls.findMany({
      where: {
        ownerId,
      },
    });
  }

  findAll(): Promise<ShortenedUrls[]> {
    return this.prismaService.shortenedUrls.findMany();
  }
}
