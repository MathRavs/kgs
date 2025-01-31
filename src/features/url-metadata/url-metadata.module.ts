import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AbstractUrlMetadataService } from './services/abstract/abstract-url-metadata.service';
import { UrlMetadataService } from './services/implementation/url-metadata.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: AbstractUrlMetadataService,
      useClass: UrlMetadataService,
    },
  ],
  exports: [AbstractUrlMetadataService],
})
export class UrlMetadataModule {}
