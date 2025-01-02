import { Global, Module } from '@nestjs/common';
import { UserService } from './services/implementation/user.service';
import { UserRepository } from './services/implementation/user.repository';
import { UserController } from './user.controller';
import { AbstractUserService } from './services/interfaces/abstract-user.service';
import { AbstractUserRepository } from './services/interfaces/abstract-user.repository';

@Global()
@Module({
  providers: [
    {
      provide: AbstractUserService,
      useClass: UserService,
    },
    {
      provide: AbstractUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [AbstractUserService, AbstractUserRepository],
  controllers: [UserController],
})
export class UserModule {}
