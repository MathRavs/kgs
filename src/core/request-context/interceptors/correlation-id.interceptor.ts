import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService, InjectCls } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { ClsKeysEnum } from '@core/request-context/types/cls-keys.enum';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  @InjectCls()
  private readonly clsService: ClsService;

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const correlationId = this.clsService.get(ClsKeysEnum.CORRELATION_ID);
    const response = context.switchToHttp().getResponse();

    response.setHeader('X-Correlation-Id', correlationId);
    return next.handle();
  }
}
