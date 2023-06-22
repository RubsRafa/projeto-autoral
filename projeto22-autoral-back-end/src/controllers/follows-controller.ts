import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { findMyFollows, followUser, removeFollowService } from '../services';
import { AuthenticatedRequest, FollowIdUser, JWT } from '../protocols';

export async function getMyFollows(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  try {
    const follows = await findMyFollows(userId);
    return res.status(httpStatus.OK).send(follows);
  } catch (e) {
    next(e);
  }
}

export async function followAnUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { userIdIFollow } = req.body as FollowIdUser;
  try {
    const follows = await followUser(userId, userIdIFollow);
    return res.status(httpStatus.OK).send(follows);
  } catch (e) {
    next(e);
  }
}

export async function removeFollow(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // const { userId } = req as JWT;
  const followId = Number(req.params.followId);
  try {
    await removeFollowService(followId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}
