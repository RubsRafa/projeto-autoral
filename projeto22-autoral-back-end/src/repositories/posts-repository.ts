import { PostParams } from '../protocols';
import { prisma } from '../config';

export async function getAllPosts() {
  return await prisma.posts.findMany({
    include: {
      PostType: true,
      Users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function post(userId: number, body: PostParams) {
  return await prisma.posts.create({
    data: {
      userId: userId,
      type: body.type,
      text: body.text,
      image: body.image,
      video: body.video,
    },
  });
}

export async function getAllUserPosts(userId: number) {
  return await prisma.posts.findMany({
    where: {
      userId,
    },
    include: {
      PostType: true,
      Users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function deletePost(postId: number) {
  return await prisma.posts.delete({
    where: {
      id: postId,
    },
  });
}

const postsRepository = {
  getAllPosts,
  post,
  getAllUserPosts,
  deletePost,
};

export default postsRepository;
