import { Injectable } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import { ClsService } from 'nestjs-cls';
import { ClsKeysEnum } from '@core/request-context/types/cls-keys.enum';
import { Logger } from 'winston';

/**
 * @description
 * adds the correlationId to the log message
 */
@Injectable()
export class CustomWinstonLoggerService extends WinstonLogger {
  constructor(
    logger: Logger,
    private readonly clsService: ClsService,
  ) {
    super(logger);
  }

  override log(message: any, context?: string) {
    super.log(this.getMessageContent(message), context);
  }

  override fatal(message: any, trace?: string, context?: string) {
    super.fatal(this.getMessageContent(message), trace, context);
  }

  override error(message: any, trace?: string, context?: string) {
    super.error(this.getMessageContent(message), trace, context);
  }

  override warn(message: any, context?: string) {
    super.warn(this.getMessageContent(message), context);
  }

  override debug(message: any, context?: string) {
    super.debug(this.getMessageContent(message), context);
  }

  override verbose(message: any, context?: string) {
    super.verbose(this.getMessageContent(message), context);
  }

  private getMessageContent(message: any): Record<string, string> {
    return {
      message,
      correlationId: this.clsService.get(ClsKeysEnum.CORRELATION_ID),
    };
  }
}
