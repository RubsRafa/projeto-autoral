import Joi from 'joi';
import { SignInParams } from '../protocols';

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  image: Joi.string().required(),
  birthday: Joi.string().isoDate(),
});
