import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../../configuration/configuration.type';
import { AuthController } from './auth.controller';
import { AbstractAuthService } from '@core/features/auth/services/abstracts/abstract-auth.service';
import { AuthService } from '@core/features/auth/services/implementation/auth.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationType>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  providers: [
    {
      provide: AbstractAuthService,
      useClass: AuthService,
    },
    JwtStrategy,
  ],
  exports: [AbstractAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
