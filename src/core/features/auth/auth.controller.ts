import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './services/implementation/auth.service';
import { AbstractUserService } from '../user/services/interfaces/abstract-user.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: AbstractUserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('profile')
  async profile() {}
}
