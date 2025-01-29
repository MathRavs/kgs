import * as Joi from 'joi';

export type ConfigurationType = {
  DATABASE_URL: string;
  BCRYPT_SALT: number;
  JWT_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
};

export const validationSchema = Joi.object<ConfigurationType>({
  DATABASE_URL: Joi.string().required(),
  BCRYPT_SALT: Joi.number().required().positive(),
  JWT_SECRET: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required().positive(),
  REDIS_PASSWORD: Joi.string().required(),
});
