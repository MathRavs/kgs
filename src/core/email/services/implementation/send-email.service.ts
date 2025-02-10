import { Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractSendEmailService } from '@core/email/services/abstract/abstract-send-email.service';
import { EmailOptions, EmailType } from '@core/email/types/email-type.enum';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigurationType } from '@core/configuration/types/configuration.type';
import { EmailSubjectConstant } from '@core/email/constants/email-subject.constant';
import LinearLoginCodeEmail from '@core/email/templates/emails/signup-email.template';
import Mail from 'nodemailer/lib/mailer';
import { render } from '@react-email/components';

@Injectable()
export class SendEmailService extends AbstractSendEmailService {
  @Inject()
  private readonly logger: Logger;

  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    super();
    const emailConfiguration =
      this.configService.get<ConfigurationType['EMAIL']>('EMAIL');

    this.transporter = createTransport({
      host: emailConfiguration.host,
      port: emailConfiguration.port,
      auth: {
        user: emailConfiguration.username,
        pass: emailConfiguration.password,
      },
    });
  }

  async sendEmail<T extends EmailType>(
    type: T,
    to: string,
    options: EmailOptions<T>,
  ): Promise<void> {
    const mailerOptions: Mail.Options = {
      from: 'support@shortly.com',
      to,
      subject: EmailSubjectConstant[type],
      html: await this.resolveTemplateDependingOnType(type, options),
    };
    this.logger.log('Sending email', this.constructor.name);

    const result = await this.transporter.sendMail(mailerOptions);

    this.logger.log('Email sent', this.constructor.name);

    return result;
  }

  private async resolveTemplateDependingOnType<T extends EmailType>(
    type: T,
    options: EmailOptions<T>,
  ) {
    switch (type) {
      case 'ACCOUNT_CONFIRMATION_EMAIL': {
        return await render(LinearLoginCodeEmail(options));
      }
    }
  }
}
