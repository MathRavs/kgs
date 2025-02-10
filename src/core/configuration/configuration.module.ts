import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { AbstractVaultService } from '@core/configuration/services/abstract/abstract-vault.service';
import { VaultService } from '@core/configuration/services/implementation/vault.service';
import * as process from 'node:process';
import {
  ConfigurationType,
  validationSchema,
} from '@core/configuration/types/configuration.type';

@Global()
@Module({
  providers: [
    {
      provide: AbstractVaultService,
      useClass: VaultService,
    },
    {
      provide: ConfigService,
      inject: [AbstractVaultService],
      useFactory: async (vaultService: AbstractVaultService) => {
        const secrets = await vaultService.getSecrets(process.env.VAULT_PATH);

        const configuration: ConfigurationType = {
          DATABASE_URL: secrets.postgres_url,
          BCRYPT_SALT: secrets.bcrypt_salt,
          JWT_SECRET: secrets.jwt_secret,
          REDIS_URL: secrets.redis_url,
          EMAIL: {
            password: secrets.email.password,
            username: secrets.email.username,
            host: secrets.email.host,
            port: secrets.email.port,
          },
        };

        const errors = validationSchema.validate(configuration, {
          abortEarly: false,
        });

        if (errors.error) {
          throw errors.error;
        }

        return {
          get: (key: keyof ConfigurationType) => configuration[key],
        };
      },
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({})],
    }),
  ],
  exports: [ConfigService],
})
export class ConfigurationModule {}
