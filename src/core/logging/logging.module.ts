import { Global, Logger as NestLogger, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LogginProviders } from '@core/logging/providers/loggin.provider';

@Global()
@Module({
  imports: [WinstonModule],
  providers: LogginProviders,
  exports: [NestLogger],
})
export class LoggingModule {}
