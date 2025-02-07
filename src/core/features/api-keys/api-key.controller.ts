import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiKeyMapper } from './mappers/api-key.mapper';
import { AbstractApiKeyService } from './services/abstract/abstract-api-key.service';
import { GenericResponseDto } from '@core/dto/generic-response.dto';

@ApiTags('api-keys')
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

  @Delete('delete/:id')
  async delete(@Request() { user }: { user: User }, @Param('id') id: string) {
    await this.apiKeyService.deleteById(id, user.id);

    return new GenericResponseDto('The api key has been deleted');
  }
}
