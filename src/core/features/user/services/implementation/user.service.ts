import { Injectable } from '@nestjs/common';
import { AbstractUserService } from '../interfaces/abstract-user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';
import { BcryptService } from '../../../../encryption/bcrypt.service';

@Injectable()
export class UserService implements AbstractUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

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
