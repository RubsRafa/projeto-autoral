import Joi from 'joi';
import { EditUserParams } from '../protocols';

const isImage = /\.(jpg|jpeg|png|gif)$/i;

export const usersEditSchema = Joi.object<EditUserParams>({
  name: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  password: Joi.string().allow(null),
  confirmPassword: Joi.string().allow(null),
  image: Joi.string().allow(null).regex(isImage),
  birthday: Joi.string().isoDate().allow(null),
});
