import { faker } from '@faker-js/faker';
import { Comments, Posts, Users } from '@prisma/client';
import { prisma } from '@/config';

export async function createComment(user: Users, post: Posts) {
  return await prisma.comments.create({
    data: {
      userId: user.id,
      postId: post.id,
      comment: faker.word.words(),
    },
  });
}

export function bodyComment(post: Posts) {
  return {
    postId: post.id,
    comment: faker.word.words(),
  };
}

export function bodyDeleteComment(comment: Comments) {
  return {
    commentId: comment.id,
  };
}

export function returnComment() {
  return faker.word.words()
}

export function returnCommentItem(user: Users, post:Posts, comment: string) {
  return {
    id: faker.number.int({ max: 50 }),
    comment,
    userId: user.id,
    postId: post.id,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  }
}

export function returnCommentsWithUsers(){
  return {
    id: faker.number.int({ max: 50 }),
    comment: faker.word.words(),
    userId: faker.number.int({ max: 50 }),
    postId: faker.number.int({ max: 50 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    Users: {
      id: faker.number.int({ max: 50 }),
      name: faker.internet.userName(),
      image: faker.internet.avatar(),
    }
  }
}