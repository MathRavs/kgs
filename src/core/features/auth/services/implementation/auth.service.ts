import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbstractUserRepository } from '../../../user/services/interfaces/abstract-user.repository';
import { BcryptService } from '../../../../encryption/bcrypt.service';
import { AbstractAuthService } from '../interfaces/abstract-auth.service';

@Injectable()
export class AuthService implements AbstractAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: AbstractUserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!this.bcryptService.verifyPassword(password, user.password)) {
      throw new NotFoundException('User not found', {
        cause: new Error('User not found'),
        description: 'Invalid password',
      });
    }
    return this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
  }
}
