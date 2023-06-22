import { Error } from '../protocols';

export function notFoundUserError(): Error {
  return {
    name: 'NotFoundUserError',
    message: 'This user was not found! Incorrect email or password.',
  };
}
