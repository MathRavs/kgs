import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../configuration/configuration.type';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';

export const CacheModule = CacheManagerModule.registerAsync({
  inject: [ConfigService],
  isGlobal: true,
  useFactory: async (
    configService: ConfigService<ConfigurationType>,
  ): Promise<CacheOptions> => ({
    isGlobal: true,
    store: await redisStore.redisStore({
      socket: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
      password: configService.get('REDIS_PASSWORD'),
    }),
  }),
});
