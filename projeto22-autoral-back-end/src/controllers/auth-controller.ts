import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createUser, loginUser } from '../services';
import { UserType, SignInParams } from '../protocols';

export async function singUp(req: Request, res: Response, next: NextFunction) {
  const user = req.body as UserType;
  try {
    await createUser(user);
    return res.status(httpStatus.CREATED).send('User created successfully!');
  } catch (e) {
    next(e);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const user = req.body as SignInParams;
  try {
    const info = await loginUser(user);
    return res.status(httpStatus.OK).send(info);
  } catch (e) {
    next(e);
  }
}
