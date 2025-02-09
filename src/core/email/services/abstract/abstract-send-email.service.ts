import { EmailOptions, EmailType } from '@core/email/types/email-type.enum';

export abstract class AbstractSendEmailService {
  abstract sendEmail<T extends EmailType>(
    type: T,
    targetEmail: string,
    options: EmailOptions<T>,
  ): Promise<void>;
}
