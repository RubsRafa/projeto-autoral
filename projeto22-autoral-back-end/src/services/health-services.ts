import { HealthParams } from '../protocols';
import { conflictError } from '../errors';
import { addHumor, changeHumor, deleteHumor, findHumorDiary, getUserDiary } from '../repositories';

export async function getUserHumor(userId: number) {
  const diary = await getUserDiary(userId);
  diary.sort((a, b) => b.date.getTime() - a.date.getTime());
  return diary;
}

export async function postHumor(userId: number, text: string, color: string, mood: number) {
  await addHumor(userId, text, color, mood);
  return;
}

export async function putHumor(body: HealthParams) {
  const humor = await findHumorDiary(body.id);
  if (!humor) throw conflictError();

  await changeHumor(body);
  return;
}

export async function deleteItem(id: number) {
  const humor = await findHumorDiary(id);
  if (!humor) throw conflictError();

  await deleteHumor(id);
  return;
}

const healthService = {
  getUserHumor,
  postHumor,
  putHumor,
  deleteItem,
};

export default healthService;
