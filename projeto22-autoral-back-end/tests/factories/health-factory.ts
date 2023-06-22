import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import { Health, Users } from '@prisma/client';

export function returnHealth(user: Users): Health {
  return {
    id: faker.number.int(),
    userId: user.id,
    date: faker.date.anytime(),
    text: faker.word.words(),
    color: faker.color.rgb(),
    mood: 3,
  };
}

export function returnChangeHumor(user: Users) {
  return {
    userId: user.id,
    text: faker.word.words(),
    color: faker.color.rgb(),
    mood: 4,
  };
}

export async function createHumorDiary(user: Users) {
  return await prisma.health.create({
    data: {
      userId: user.id,
      mood: faker.number.int({ max: 5 }),
      text: faker.word.words(),
      color: faker.color.rgb(),
    }
  })
}

export function returnHealthParams() {
  return {
    text: faker.word.words(),
    color: faker.color.rgb(),
    mood: faker.number.int({ max: 5 }),
  }
}

export function returnChangeHealthParams(humor?: Health) {
  return {
    id: humor.id | 0,
    text: faker.word.words(),
    color: faker.color.rgb(),
    mood: faker.number.int({ max: 5 }),
  }
}

export function returnBodyWithInvalidHumor() {
  return {
    id: 0,
    text: faker.word.words(),
    color: faker.color.rgb(),
    mood: faker.number.int({ max: 5 }),
  }
}