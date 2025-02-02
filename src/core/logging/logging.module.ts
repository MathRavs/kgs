import { Global, Module } from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import { winstonLogger } from '@core/logging/constants/winston-logging.constant';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      instance: winstonLogger,
    }),
  ],
  providers: [],
  exports: [],
})
export class LoggingModule {}
