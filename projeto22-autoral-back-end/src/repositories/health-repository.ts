import { HealthParams } from '../protocols';
import { prisma } from '../config';

export async function getUserDiary(id: number) {
  return await prisma.health.findMany({
    where: {
      userId: id,
    },
  });
}

export async function addHumor(userId: number, text: string, color: string, mood: number) {
  return await prisma.health.create({
    data: {
      userId,
      text,
      color,
      mood,
    },
  });
}

export async function changeHumor(body: HealthParams) {
  return await prisma.health.update({
    where: {
      id: body.id,
    },
    data: {
      text: body.text,
      color: body.color,
      mood: body.mood,
    },
  });
}

export async function findHumorDiary(id: number) {
  return await prisma.health.findFirst({
    where: {
      id,
    },
  });
}

export async function deleteHumor(id: number) {
  return await prisma.health.delete({
    where: {
      id,
    },
  });
}

const healthRepository = {
  getUserDiary,
  addHumor,
  changeHumor,
  findHumorDiary,
  deleteHumor,
};

export default healthRepository;
