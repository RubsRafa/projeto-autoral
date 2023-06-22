import { Posts, Users } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { PostsReturn, RepostReturn } from '@/protocols';

export async function createRepost(user: Users, post: Posts) {
  return await prisma.reposts.create({
    data: {
      userId: user.id,
      postId: post.id,
    },
  });
}

export function bodyRepost(post: Posts) {
  return {
    postId: post.id,
  };
}

export function returnReposts(otherUser: Users, post: PostsReturn): RepostReturn {
  return {
    id: faker.number.int({ max: 50 }),
    userId: otherUser.id,
    postId: post.id,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    Users: {
      id: otherUser.id,
      name: faker.internet.displayName(),
      image: faker.internet.avatar(),
    },
  };
}

export function returnOnlyReposts(user: Users, post: Posts) {
  return {
    id: faker.number.int({ max: 50 }),
    userId: user.id,
    postId: post.id,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  }
}

export function returnGetReposts(post: PostsReturn, repost: RepostReturn): PostsReturn {
  return {
    id: post.id,
    userId: post.userId,
    type: post.type,
    video: post.video,
    image: post.image,
    text: post.text,
    isReposted: true,
    createdAt: repost.createdAt,
    updatedAt: repost.updatedAt,
    PostType: post.PostType,
    Users: post.Users,
    repostedById: repost.Users.id,
    repostedByName: repost.Users.name,
    repostedByImage: repost.Users.image,
  };
}
