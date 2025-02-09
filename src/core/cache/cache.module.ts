import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../configuration/types/configuration.type';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { CacheOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';
import KeyvRedis from '@keyv/redis';
import Keyv from 'keyv';

export const CacheModule = CacheManagerModule.registerAsync({
  inject: [ConfigService],
  isGlobal: true,
  useFactory: async (
    configService: ConfigService<ConfigurationType>,
  ): Promise<CacheOptions> => {
    const keyv = new Keyv({
      store: new KeyvRedis(configService.get('REDIS_URL')),
    });

    keyv.on('error', (err) => {
      console.error('Connection Error', err);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(0);
    });

    return {
      isGlobal: true,
      stores: keyv,
      ttl: 60_000,
    };
  },
});
