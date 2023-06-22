import { Users } from '@prisma/client';
import { createUser } from './authentication-factory';
import { prisma } from '@/config';

export async function createSession(user: Users, token: string) {
  const incomingUser = user || (await createUser());

  await prisma.sessions.deleteMany({
    where: {
      userId: incomingUser.id,
    },
  });

  return await prisma.sessions.create({
    data: {
      token: token,
      userId: incomingUser.id,
    },
  });
}
