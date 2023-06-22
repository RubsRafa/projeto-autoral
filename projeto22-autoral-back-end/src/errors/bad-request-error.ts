import { Error } from '../protocols';

export function badRequestError(): Error {
  return {
    name: 'BadRequestError',
    message: 'Invalid body format',
  };
}
