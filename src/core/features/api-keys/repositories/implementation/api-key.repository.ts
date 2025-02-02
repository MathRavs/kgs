import { Inject, Injectable } from '@nestjs/common';
import { AbstractApiKeyRepository } from '../abstract/abstract-api-key.repository';
import { ApiKey } from '@prisma/client';
import { PrismaService } from '@core/database/prisma.service';
import { ApiKeyWithOwner } from '../../types/api-key.type';

@Injectable()
export class ApiKeyRepository extends AbstractApiKeyRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  findByKey(key: string): Promise<ApiKeyWithOwner> {
    return this.prismaService.apiKey.findUniqueOrThrow({
      where: {
        key,
      },
      include: {
        owner: true,
      },
    });
  }

  findKeys(ownerId: string): Promise<ApiKey[]> {
    return this.prismaService.apiKey.findMany({
      where: {
        ownerId,
      },
    });
  }

  create(key: string, ownerId: string): Promise<ApiKey> {
    return this.prismaService.apiKey.create({
      data: {
        key,
        ownerId,
      },
    });
  }
}
