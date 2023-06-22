import Joi from 'joi';

export const ChatSchema = Joi.object({
  toId: Joi.number().required(),
  message: Joi.string().required(),
});
