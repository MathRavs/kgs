import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Injectable()
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  @Inject()
  private readonly logger: Logger;

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.debug(exception, this.constructor.name);

    if (exception.code === 'P2002') {
      this.logger.warn('entity already exists', this.constructor.name);

      const target =
        (exception.meta?.target as string[])?.join(', ') || 'field';
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `Unique constraint violation on ${target}`,
        error: 'Conflict',
      });
    } else if (exception.code === 'P2025') {
      this.logger.warn('entity not found', this.constructor.name);

      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Entity not found`,
        error: 'Not found',
      });
    } else {
      this.logger.error(exception, this.constructor.name);

      // Handle other Prisma errors if necessary
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected database error occurred.',
        error: 'Internal Server Error',
      });
    }
  }
}
