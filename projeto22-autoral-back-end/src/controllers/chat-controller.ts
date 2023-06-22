import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest, JWT, MessagesParams } from '../protocols';
import { addNewMessage, deleteUserMessage, getAllMyMessages, getOnlyUsersChat } from '../services';

export async function getUserMessages(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const otherUser = Number(req.params.userId);
  try {
    const messages = await getAllMyMessages(userId, otherUser);
    return res.status(httpStatus.OK).send(messages);
  } catch (e) {
    next(e);
  }
}

export async function sendNewMessages(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { toId, message } = req.body;
  try {
    const body = {
      fromId: userId,
      toId,
      message,
    } as MessagesParams;
    await addNewMessage(body);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function deleteMessage(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const messageId = Number(req.params.messageId);
  try {
    await deleteUserMessage(userId, messageId);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function getUsersChat(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  try {
    const messages = await getOnlyUsersChat(userId);
    return res.status(httpStatus.OK).send(messages);
  } catch (e) {
    next(e);
  }
}
