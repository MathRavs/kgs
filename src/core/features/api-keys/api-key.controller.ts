import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiKeyMapper } from './mappers/api-key.mapper';
import { AbstractApiKeyService } from './services/abstract/abstract-api-key.service';

@Controller('api-key')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ApiKeyController {
  constructor(private readonly apiKeyService: AbstractApiKeyService) {}

  @Post('create')
  async create(@Request() { user }: { user: User }) {
    return ApiKeyMapper.toApiKeyResponse(
      await this.apiKeyService.create(user.id),
    );
  }

  @Get('list')
  async list(@Request() { user }: { user: User }) {
    return ApiKeyMapper.toApiKeyResponseArray(
      await this.apiKeyService.list(user.id),
    );
  }
}
