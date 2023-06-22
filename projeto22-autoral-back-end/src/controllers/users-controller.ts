import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { editUserService, findUser, getUserInfoService } from '../services';
import { AuthenticatedRequest, EditUserParams, JWT } from '../protocols';

export async function getUsersInfoController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  try {
    const userInfo = await getUserInfoService(userId);
    return res.status(httpStatus.OK).send(userInfo);
  } catch (e) {
    next(e);
  }
}

export async function editUserInfoController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const body = req.body as EditUserParams;
  try {
    await editUserService(userId, body);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function searchForUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { name } = req.params as EditUserParams;
  try {
    const users = await findUser(name);
    return res.status(httpStatus.OK).send(users);
  } catch (e) {
    next(e);
  }
}
