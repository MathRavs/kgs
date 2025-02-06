import { Module } from '@nestjs/common';
import { AbstractUrlShortenerRepository } from './repositories/abstract/abstract-url-shortener.repository';
import { UrlShortenerRepository } from './repositories/implementation/url-shortener.repository';
import { AbstractUrlShortenerService } from './services/abstract/abstract-url-shortener.service';
import { UrlShortenerService } from './services/implementation/url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlMetadataModule } from '../url-metadata/url-metadata.module';
import { AbstractTemporaryAccessUrlRepository } from '@feature/url-shortener/repositories/abstract/abstract-temporary-access-url.repository';
import { TemporaryAccessUrlRepository } from '@feature/url-shortener/repositories/implementation/temporary-access-url.repository';

@Module({
  providers: [
    {
      provide: AbstractTemporaryAccessUrlRepository,
      useClass: TemporaryAccessUrlRepository,
    },
    {
      provide: AbstractUrlShortenerRepository,
      useClass: UrlShortenerRepository,
    },
    {
      provide: AbstractUrlShortenerService,
      useClass: UrlShortenerService,
    },
  ],
  imports: [UrlMetadataModule],
  exports: [AbstractUrlShortenerService],
  controllers: [UrlShortenerController],
})
export class UrlShortenerModule {}
