import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './services/implementation/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './mappers/user.mapper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async signup(@Body() createUserDto: CreateUserDto) {
    return UserMapper.toUserResponse(
      await this.userService.createUser(createUserDto),
    );
  }
}
