import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../configuration/types/configuration.type';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
  ) {
    super({
      datasourceUrl: configService.get('DATABASE_URL'),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
