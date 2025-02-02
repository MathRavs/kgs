import { ConfigModule } from '@nestjs/config';
import { ConfigurationDataLoader } from '@core/configuration/configuration';
import { validationSchema } from '@core/configuration/configuration.type';

export const ConfigurationModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [ConfigurationDataLoader],
  validationSchema,
  validationOptions: {
    abortEarly: true,
  },
});
