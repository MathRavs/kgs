import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractApiKeyService } from '../services/abstract/abstract-api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: AbstractApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new UnauthorizedException('the api key is invalid');
    }
    const key = await this.apiKeyService.findApiKey(apiKey);
    if (!key) {
      throw new UnauthorizedException('the api key is invalid');
    }
    request.user = key.owner;
    return true;
  }
}
