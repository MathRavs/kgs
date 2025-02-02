import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractApiKeyService } from '../services/abstract/abstract-api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  @Inject()
  private readonly apiKeyService: AbstractApiKeyService;

  @Inject()
  private readonly logger: Logger;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('Checking api key', this.constructor.name);

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      this.logger.error('No api key is provided', this.constructor.name);
      throw new UnauthorizedException('the api key is mandatory');
    }

    this.logger.debug('Retrieving api key', this.constructor.name);

    const key = await this.apiKeyService.findApiKey(apiKey);

    if (!key) {
      this.logger.debug('Invalid api key', this.constructor.name);
      throw new UnauthorizedException('the api key is invalid');
    }
    this.logger.debug('Api key retrieved', this.constructor.name);

    request.user = key.owner;
    return true;
  }
}
