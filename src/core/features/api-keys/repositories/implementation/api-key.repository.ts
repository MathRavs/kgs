import { Injectable } from '@nestjs/common';
import { AbstractApiKeyRepository } from '../abstract/abstract-api-key.repository';
import { ApiKey } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class ApiKeyRepository extends AbstractApiKeyRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findByKey(key: string): Promise<ApiKey> {
    return this.prismaService.apiKey.findUniqueOrThrow({
      where: {
        key,
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
