import * as jwt from 'jsonwebtoken';
import { Users } from '@prisma/client';
import { createSession, createUser } from './factories';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.comments.deleteMany({});
  await prisma.follows.deleteMany({});
  await prisma.likes.deleteMany({});
  await prisma.reposts.deleteMany({});
  await prisma.sessions.deleteMany({});
  await prisma.posts.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: Users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(incomingUser, token);

  return token;
}
