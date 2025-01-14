import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { AbstractUserService } from './services/abstract/abstract-user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: AbstractUserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return UserMapper.toUserResponse(
      await this.userService.createUser(createUserDto),
    );
  }
}
