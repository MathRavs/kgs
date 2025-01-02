import { Injectable } from '@nestjs/common';
import { AbstractUserService } from '../interfaces/abstract-user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';
import { BcryptService } from '../../../../encryption/bcrypt.service';
import { AbstractUserRepository } from '../interfaces/abstract-user.repository';

@Injectable()
export class UserService extends AbstractUserService {
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly bcryptService: BcryptService,
  ) {
    super();
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const encryptedPassword = this.bcryptService.hashPassword(
      createUserDto.password,
    );
    return this.userRepository.createUser(
      createUserDto.name,
      createUserDto.email,
      encryptedPassword,
    );
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findUserById(id);
  }
}
