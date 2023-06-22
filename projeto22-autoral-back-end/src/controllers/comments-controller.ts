import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { addCommentService, getComments, removeCommentService } from '../services';
import { AuthenticatedRequest, CommentParams, JWT } from '../protocols';

export async function commentPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { postId, comment } = req.body as CommentParams;
  try {
    await addCommentService(userId, postId, comment);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function removeCommentPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const commentId = Number(req.params.commentId);
  try {
    await removeCommentService(userId, commentId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function getCommentsPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const comments = await getComments();
    return res.status(httpStatus.OK).send(comments);
  } catch (e) {
    next(e);
  }
}
