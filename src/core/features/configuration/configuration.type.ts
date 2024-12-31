import * as Joi from 'joi';

export type ConfigurationType = {
  DATABASE_URL: string;
  BCRYPT_SALT: number;
};

export const validationSchema = Joi.object<ConfigurationType>({
  DATABASE_URL: Joi.string().required(),
  BCRYPT_SALT: Joi.number().required().positive(),
});
