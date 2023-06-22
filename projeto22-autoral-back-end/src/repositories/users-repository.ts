import { EditUserParams } from '../protocols';
import { prisma } from '../config';

export async function getUserInfo(userId: number) {
  return await prisma.users.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      birthday: true,
    },
  });
}

export async function editUserInfo(id: number, body: EditUserParams) {
  if (body.name && body.name !== '') {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        name: body.name,
      },
    });
  }
  if (body.email && body.email !== '') {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        email: body.email,
      },
    });
  }
  if (body.password && body.password !== '') {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        password: body.password,
      },
    });
  }
  if (body.image && body.image !== '') {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        image: body.image,
      },
    });
  }
  if (body.birthday) {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        birthday: body.birthday,
      },
    });
  }
  return;
}

export async function findUserByName(name: string) {
  return await prisma.users.findMany({
    where: {
      name: {
        startsWith: name,
        contains: name,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
}

const usersRepository = {
  getUserInfo,
  editUserInfo,
  findUserByName,
};

export default usersRepository;
