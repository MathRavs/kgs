import * as Joi from 'joi';

export type ConfigurationType = {
  DATABASE_URL: string;
  BCRYPT_SALT: number;
  JWT_SECRET: string;
  REDIS_URL: string;
  EMAIL: {
    username: string;
    password: string;
  };
};

export const validationSchema = Joi.object<ConfigurationType>({
  DATABASE_URL: Joi.string().required(),
  BCRYPT_SALT: Joi.number().required().positive(),
  JWT_SECRET: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  EMAIL: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
