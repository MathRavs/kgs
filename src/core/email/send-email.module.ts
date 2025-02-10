import { Global, Module } from '@nestjs/common';
import { AbstractSendEmailService } from '@core/email/services/abstract/abstract-send-email.service';
import { SendEmailService } from '@core/email/services/implementation/send-email.service';

@Global()
@Module({
  providers: [
    {
      provide: AbstractSendEmailService,
      useClass: SendEmailService,
    },
  ],
  exports: [AbstractSendEmailService],
})
export class SendEmailModule {}
