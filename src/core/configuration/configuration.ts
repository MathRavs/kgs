import { ConfigurationType } from './configuration.type';

export const ConfigurationDataLoader = (): ConfigurationType => ({
  DATABASE_URL: process.env.DATABASE_URL,
  BCRYPT_SALT: Number.parseInt(process.env.BCRYPT_SALT, 10),
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number.parseInt(process.env.REDIS_PORT, 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
});
