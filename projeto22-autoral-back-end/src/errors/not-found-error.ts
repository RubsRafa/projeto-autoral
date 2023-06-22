import { Error } from '../protocols';

export function notFoundError(): Error {
  return {
    name: 'NotFoundError',
    message: 'This post was not found.',
  };
}
