import { prisma } from '../config';

export async function repost(userId: number, postId: number) {
  return await prisma.reposts.create({
    data: {
      userId,
      postId,
    },
  });
}

export async function removeRepost(id: number) {
  return await prisma.reposts.delete({
    where: {
      id,
    },
  });
}

export async function findRepostIdByPostId(postId: number) {
  return await prisma.reposts.findMany({
    where: {
      postId,
    },
  });
}

export async function getAllReposts() {
  return await prisma.reposts.findMany({
    include: {
      Users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function getAllUserReposts(userId: number) {
  return await prisma.reposts.findMany({
    where: {
      userId,
    },
    include: {
      Users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

const repostsRepository = {
  repost,
  removeRepost,
  findRepostIdByPostId,
  getAllReposts,
  getAllUserReposts,
};

export default repostsRepository;
