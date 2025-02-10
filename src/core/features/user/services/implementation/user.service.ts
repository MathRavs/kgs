import { Inject, Injectable, Logger } from '@nestjs/common';
import { AbstractUserService } from '../abstract/abstract-user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';
import { BcryptService } from '@core/encryption/bcrypt.service';
import { AbstractUserRepository } from '../../repositories/abstract/abstract-user.repository';
import { AbstractSendEmailService } from '@core/email/services/abstract/abstract-send-email.service';

@Injectable()
export class UserService extends AbstractUserService {
  @Inject()
  private readonly userRepository: AbstractUserRepository;

  @Inject()
  private readonly bcryptService: BcryptService;

  @Inject()
  private readonly logger: Logger;

  @Inject()
  private readonly sendMailService: AbstractSendEmailService;

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating user', this.constructor.name);

    const encryptedPassword = this.bcryptService.hashPassword(
      createUserDto.password,
    );

    const result = await this.userRepository.createUser(
      createUserDto.name,
      createUserDto.email,
      encryptedPassword,
    );

    await this.sendMailService.sendEmail(
      'ACCOUNT_CONFIRMATION_EMAIL',
      createUserDto.email,
      {
        verificationUrl: 'https://google.mg',
      },
    );

    this.logger.log('User created', this.constructor.name);

    return result;
  }

  async findUserById(id: string): Promise<User> {
    this.logger.log(`Retrieving user ${id}`, this.constructor.name);
    const result = await this.userRepository.findUserById(id);

    this.logger.log(`User retrieved`, this.constructor.name);
    return result;
  }
}
