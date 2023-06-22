import { Error } from '../protocols';

export function conflictError(): Error {
  return {
    name: 'ConflictError',
    message: 'Action not allowed, conflict error',
  };
}
