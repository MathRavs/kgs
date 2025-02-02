import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '@core/configuration/configuration.type';
import { JwtPayload } from '../types/jwt-payload.type';
import { AbstractUserService } from '../../user/services/abstract/abstract-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject()
  private readonly userService: AbstractUserService;

  @Inject()
  private readonly logger: Logger;

  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // Replace with an environment variable in production
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.debug(
      `Validating user with id: ${payload.id}`,
      this.constructor.name,
    );

    const user = this.userService.findUserById(payload.id);

    this.logger.debug(`User validated`, this.constructor.name);
    return user;
  }
}
