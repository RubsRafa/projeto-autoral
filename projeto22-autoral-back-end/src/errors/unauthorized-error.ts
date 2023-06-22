import { Error } from '../protocols';

export function unauthorizedError(): Error {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}
