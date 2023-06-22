import { prisma } from '../config';

export async function addComment(userId: number, postId: number, comment: string) {
  return await prisma.comments.create({
    data: {
      userId,
      postId,
      comment,
    },
  });
}

export async function findComment(id: number) {
  return await prisma.comments.findUnique({
    where: {
      id,
    },
  });
}

export async function removeComment(id: number) {
  return await prisma.comments.delete({
    where: {
      id,
    },
  });
}

export async function getAllComments() {
  return await prisma.comments.findMany({
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

const commentsRepository = {
  addComment,
  findComment,
  removeComment,
  getAllComments,
};

export default commentsRepository;
