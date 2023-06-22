import { prisma } from '../config';

export async function getAllFollows(userId: number) {
  return await prisma.follows.findMany({
    where: {
      userId,
    },
  });
}

export async function getAllUsers() {
  return await prisma.users.findMany({});
}

export async function createFollow(userId: number, userIdIFollow: number) {
  return await prisma.follows.create({
    data: {
      userId,
      userIdIFollow,
    },
  });
}

export async function removeFollow(followId: number) {
  return await prisma.follows.delete({
    where: {
      id: followId,
    },
  });
}

export async function findFollow(id: number) {
  return await prisma.follows.findUnique({
    where: {
      id,
    },
  });
}

export async function getMyFollowsInfo(userId: number) {
  return await prisma.follows.findMany({
    where: {
      userId,
    },
    include: {
      Users_Follows_userIdIFollowToUsers: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

const followsRepository = {
  getAllFollows,
  getAllUsers,
  createFollow,
  removeFollow,
  findFollow,
  getMyFollowsInfo,
};

export default followsRepository;
