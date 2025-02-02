import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import { ClsKeysEnum } from '@core/request-context/types/cls-keys.enum';
import { CorrelationIdInterceptor } from '@core/request-context/interceptors/correlation-id.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls) => {
          cls.set(ClsKeysEnum.CORRELATION_ID, uuidv4());
        },
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
  ],
  exports: [],
})
export class RequestContextModule {}
