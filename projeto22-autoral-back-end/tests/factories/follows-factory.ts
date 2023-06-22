import { Follows, Users } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { prisma } from '@/config';

export async function createFollow(user: Users, follow: Users) {
  return await prisma.follows.create({
    data: {
      userId: user.id,
      userIdIFollow: follow.id,
    },
  });
}

export function bodyPostFollows(user: Users) {
  return {
    userIdIFollow: user.id,
  };
}

export function bodyDeleteFollow(follow: Follows) {
  return {
    followId: follow.id,
  };
}

export function returnFollows(user: Users, otherUser: Users) {
  return {
    id: faker.number.int(),
    userId: user.id,
    userIdIFollow: otherUser.id,
  };
}

export function getFollowsInfo(user: Users, otherUser: Users) {
  return {
    id: faker.number.int(),
    userId: user.id,
    userIdIFollow: otherUser.id,
    Users_Follows_userIdIFollowToUsers: {
      id: otherUser.id,
      image: otherUser.image,
      name: otherUser.name,
    },
  };
}
