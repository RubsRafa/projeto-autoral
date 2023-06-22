import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { addLike, getAllLikesService, getLikesService, removeLike } from '../services';
import { AuthenticatedRequest, JWT, PostId } from '../protocols';

export async function likePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { postId } = req.body as PostId;
  try {
    await addLike(userId, postId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function dislikePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const postId = Number(req.params.postId);
  try {
    await removeLike(userId, postId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function getLikes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  try {
    const userLikes = await getLikesService(userId);
    return res.status(httpStatus.OK).send(userLikes);
  } catch (e) {
    next(e);
  }
}

export async function getAllLikes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const allLikes = await getAllLikesService();
    return res.status(httpStatus.OK).send(allLikes);
  } catch (e) {
    next(e);
  }
}
