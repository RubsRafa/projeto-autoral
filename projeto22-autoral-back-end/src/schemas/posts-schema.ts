import Joi from 'joi';
import { PostParams } from '../protocols';

const isImage = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
const isVideo = /\.(mp4|avi|mov|wmv)$/i;

export const postsSchema = Joi.object<PostParams>({
  type: Joi.number().required(),
  video: Joi.string().allow(null).regex(isVideo),
  image: Joi.string().allow(null).regex(isImage),
  text: Joi.string().allow(null),
});
