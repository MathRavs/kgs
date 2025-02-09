import { Global, Module } from '@nestjs/common';
import { ApiKeyController } from './api-key.controller';
import { AbstractApiKeyRepository } from './repositories/abstract/abstract-api-key.repository';
import { ApiKeyRepository } from './repositories/implementation/api-key.repository';
import { ApiKeyService } from './services/implementation/api-key.service';
import { AbstractApiKeyService } from './services/abstract/abstract-api-key.service';
import { ApiKeyGuard } from './guards/api-key.guard';

@Global()
@Module({
  controllers: [ApiKeyController],
  providers: [
    {
      provide: AbstractApiKeyRepository,
      useClass: ApiKeyRepository,
    },
    {
      provide: AbstractApiKeyService,
      useClass: ApiKeyService,
    },
    ApiKeyGuard,
  ],
  exports: [AbstractApiKeyRepository, AbstractApiKeyService, ApiKeyGuard],
})
export class ApiKeyModule {}
