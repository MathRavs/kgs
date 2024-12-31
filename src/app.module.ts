import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './core/features/configuration/configuration.type';
import CoreFeatures from './core/features/core.features';
import { DatabaseModule } from './core/database/database.module';
import { ConfigurationDataLoader } from './core/features/configuration/configuration';
import { EncryptionModule } from './core/encryption/encryption.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
