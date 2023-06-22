import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { deletePostService, getPostsService, getUserAllPosts, postPost } from '../services';
import { AuthenticatedRequest, JWT, PostParams } from '../protocols';

export async function getPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  try {
    const posts = await getPostsService(userId);
    return res.status(httpStatus.OK).send(posts);
  } catch (e) {
    next(e);
  }
}

export async function postAPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const body = req.body as PostParams;
  try {
    await postPost(userId, body);
    return res.sendStatus(httpStatus.CREATED);
  } catch (e) {
    next(e);
  }
}

export async function getUserPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  try {
    const userPosts = await getUserAllPosts(userId);
    return res.status(httpStatus.OK).send(userPosts);
  } catch (e) {
    next(e);
  }
}

export async function deleteUserPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const postId = Number(req.params.postId);
  try {
    await deletePostService(userId, postId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}
