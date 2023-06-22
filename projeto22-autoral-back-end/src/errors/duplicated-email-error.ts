import { Error } from '../protocols';

export function duplicatedEmailError(): Error {
  return {
    name: 'DuplicatedEmailError',
    message: 'This email cannot be used',
  };
}
