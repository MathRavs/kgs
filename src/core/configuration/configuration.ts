import { ConfigurationType } from './configuration.type';

export const ConfigurationDataLoader = (): ConfigurationType => ({
  DATABASE_URL: process.env.DATABASE_URL,
  BCRYPT_SALT: Number.parseInt(process.env.BCRYPT_SALT, 10),
  JWT_SECRET: process.env.JWT_SECRET,
});
