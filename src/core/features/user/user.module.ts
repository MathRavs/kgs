import { Module } from '@nestjs/common';
import { UserService } from './services/implementation/user.service';
import { UserRepository } from './services/implementation/user.repository';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
