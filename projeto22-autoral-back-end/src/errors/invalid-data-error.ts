import { invalidError } from '../protocols';

export function invalidDataError(details: string[]): invalidError {
  return {
    name: 'InvalidDataError',
    message: 'Invalid data',
    details,
  };
}
