import { Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractSendEmailService } from '@core/email/services/abstract/abstract-send-email.service';
import { EmailOptions, EmailType } from '@core/email/types/email-type.enum';

@Injectable()
export class SendEmailService extends AbstractSendEmailService {
  @Inject()
  private readonly logger: Logger;

  sendEmail<T extends EmailType>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    targetEmail: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: EmailOptions<T>,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }
}
