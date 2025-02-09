import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserMapper } from '../user/mappers/user.mapper';
import { AbstractAuthService } from '@core/features/auth/services/abstracts/abstract-auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AbstractAuthService;

  @Inject()
  private readonly logger: Logger;

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const responseDto = new LoginResponseDto();
    responseDto.token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return responseDto;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() { user }: { user: User }) {
    return UserMapper.toUserResponse(user);
  }
}
