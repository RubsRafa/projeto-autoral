import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { deleteItem, getUserHumor, postHumor, putHumor } from '../services';
import { AuthenticatedRequest, HealthParams, JWT } from '../protocols';

export async function getUserHumorDiary(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  try {
    const diary = await getUserHumor(userId);
    return res.status(httpStatus.OK).send(diary);
  } catch (e) {
    next(e);
  }
}

export async function addHumor(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { text, color, mood } = req.body as HealthParams;
  try {
    await postHumor(userId, text, color, mood);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function changeHumorItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as JWT;
  const { id, text, color, mood } = req.body as HealthParams;
  try {
    await putHumor({ userId, id, text, color, mood });
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}

export async function deleteHumorItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  try {
    await deleteItem(id);
    return res.sendStatus(httpStatus.OK);
  } catch (e) {
    next(e);
  }
}
