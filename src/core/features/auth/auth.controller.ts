import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './services/abstracts/auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserMapper } from '../user/mappers/user.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
