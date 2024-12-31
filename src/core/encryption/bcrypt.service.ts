import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../features/configuration/configuration.type';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hashSync(password, this.configService.get('BCRYPT_SALT'));
  }

  verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
