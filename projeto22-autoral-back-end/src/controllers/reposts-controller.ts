import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { addRepostService, removeRepostService } from '../services';
import { AuthenticatedRequest, JWT, PostId } from '../protocols';

export async function addRepostPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { postId } = req.body as PostId;
  try {
    await addRepostService(userId, postId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function removeRepostPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const postId = Number(req.params.postId);
  try {
    await removeRepostService(userId, postId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}
