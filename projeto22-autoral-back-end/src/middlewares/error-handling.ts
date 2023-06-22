import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Error } from '../protocols';

export function handleErrors(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'InvalidDataError' || err.name === 'BadRequestError') {
    return res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === 'ConflictError') {
    return res.status(httpStatus.CONFLICT).send({ message: err.message });
  }
  if (err.name === 'UnauthorizedError' || err.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }
  if (err.name === 'NotFoundUserError' || err.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
