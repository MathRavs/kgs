import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { ClsKeysEnum } from '@core/request-context/types/cls-keys.enum';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  @Inject(ClsService)
  private readonly clsService: ClsService;

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const correlationId = this.clsService.get(ClsKeysEnum.CORRELATION_ID);
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Correlation-Id', correlationId);
    response.locals.correlationId = correlationId;

    return next.handle();
  }
}
