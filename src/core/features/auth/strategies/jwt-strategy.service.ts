import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../../../configuration/configuration.type';
import { JwtPayload } from '../types/jwt-payload.type';
import { AbstractUserService } from '../../user/services/interfaces/abstract-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly userService: AbstractUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // Replace with an environment variable in production
    });
  }

  validate(payload: JwtPayload) {
    return this.userService.findUserById(payload.userId);
  }
}
