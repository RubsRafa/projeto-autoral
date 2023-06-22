import { UserType } from '../protocols';
import { prisma } from '../config';

export async function findSession(token: string) {
  return await prisma.sessions.findFirst({
    where: {
      token,
    },
  });
}

export async function findUserEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
}

export async function singUp(user: UserType, hashedPassword: string) {
  return await prisma.users.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      image: user.image,
      birthday: user.birthday,
    },
  });
}

export async function createSession(userId: number, token: string) {
  await prisma.sessions.deleteMany({
    where: {
      userId,
    },
  });
  return await prisma.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

export async function findUserById(id: number) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
}

const authenticantionRepository = {
  findSession,
  findUserEmail,
  singUp,
  createSession,
  findUserById,
};

export default authenticantionRepository;
