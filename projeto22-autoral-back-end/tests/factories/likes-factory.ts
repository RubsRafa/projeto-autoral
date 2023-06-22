import { Posts, Users } from '@prisma/client';
import { prisma } from '@/config';
import { faker } from '@faker-js/faker';

export async function createLike(user: Users, post: Posts) {
  return await prisma.likes.create({
    data: {
      userId: user.id,
      postId: post.id,
    },
  });
}

export function bodyLike(post?: Posts) {
  return {
    postId: post.id,
  };
}

export async function findLikeByUserAndPost(user: Users, post: Posts) {
  return await prisma.likes.findMany({
    where: {
      userId: user.id,
      postId: post.id,
    },
  });
}

export function returnLikeInfo(user: Users, post: Posts) {
  return {
    id: faker.number.int({ max: 50 }),
    userId: user.id,
    postId: post.id,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  }
}

export function returnAllLikes() {
  return {
    id: faker.number.int({ max: 50 }),
    userId: faker.number.int({ max: 50}),
    postId: faker.number.int({ max: 50}),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    Users: {
      id: faker.number.int({ max: 50}),
      name: faker.internet.userName(),
      image: faker.internet.avatar(),
    }
  }
}