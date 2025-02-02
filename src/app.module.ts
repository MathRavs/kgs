import { Module } from '@nestjs/common';
import CoreFeatures from './core/features/core.features';
import { DatabaseModule } from '@core/database/database.module';
import { EncryptionModule } from '@core/encryption/encryption.module';
import { CacheModule } from '@core/cache/cache.module';
import { LoggingModule } from '@core/logging/logging.module';
import { RequestContextModule } from '@core/request-context/request-context.module';
import { ConfigurationModule } from '@core/configuration/configuration.module';
import { features } from '@feature/features.constant';

@Module({
  imports: [
    ConfigurationModule,
    LoggingModule,
    CacheModule,
    DatabaseModule,
    EncryptionModule,
    RequestContextModule,
    ...CoreFeatures,
    ...features,
  ],
})
export class AppModule {}
