import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './core/configuration/configuration.type';
import CoreFeatures from './core/features/core.features';
import { DatabaseModule } from './core/database/database.module';
import { ConfigurationDataLoader } from './core/configuration/configuration';
import { EncryptionModule } from './core/encryption/encryption.module';
import { UrlShortenerModule } from './features/url-shortener/url-shortener.module';

const features = [UrlShortenerModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ConfigurationDataLoader],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    DatabaseModule,
    EncryptionModule,
    ...CoreFeatures,
    ...features,
  ],
})
export class AppModule {}
