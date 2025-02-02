import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbstractUserRepository } from '../../../user/repositories/abstract/abstract-user.repository';
import { BcryptService } from '@core/encryption/bcrypt.service';
import { AbstractAuthService } from '../abstracts/abstract-auth.service';

@Injectable()
export class AuthService extends AbstractAuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly userRepository: AbstractUserRepository;

  @Inject()
  private readonly bcryptService: BcryptService;

  @Inject()
  private readonly logger: Logger;

  async login(email: string, password: string) {
    this.logger.log(`Logging in user`, this.constructor.name);
    const user = await this.userRepository.findUserByEmail(email);

    if (!this.bcryptService.verifyPassword(password, user.password)) {
      this.logger.warn(`Password check fails`, this.constructor.name);

      throw new NotFoundException('User not found', {
        cause: new Error('User not found'),
        description: 'Invalid password',
      });
    }
    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
    });

    this.logger.log(`Logging successful`, this.constructor.name);
    return token;
  }
}
