import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../configuration/configuration.type';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';

export const CacheModule = CacheManagerModule.register({
  inject: [ConfigService],
  isGlobal: true,
  useFactory: (
    configService: ConfigService<ConfigurationType>,
  ): CacheOptions => ({
    isGlobal: true,
    store: redisStore,
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
    password: configService.get('REDIS_PASSWORD'),
  }),
});
