import { Provider } from '@nestjs/common';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { winstonLogger } from '@core/logging/constants/winston-logging.constant';
import { Logger } from 'winston';
import { ClsService } from 'nestjs-cls';
import { CustomWinstonLoggerService } from '@core/logging/service/logger.service';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';

export const LogginProviders: Provider[] = [
  {
    provide: WINSTON_MODULE_PROVIDER,
    useFactory: () => winstonLogger,
  },
  {
    provide: WINSTON_MODULE_NEST_PROVIDER,
    useFactory: (logger: Logger, clsService: ClsService) => {
      return new CustomWinstonLoggerService(logger, clsService);
    },
    inject: [WINSTON_MODULE_PROVIDER, ClsService],
  },
  {
    provide: NestLogger,
    useFactory: (logger: NestLogger) => logger,
    inject: [WINSTON_MODULE_NEST_PROVIDER],
  },
];
