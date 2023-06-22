import { faker } from '@faker-js/faker';
import { Users } from '@prisma/client';
import { prisma } from '@/config';

export function bodyUserComplete() {
  const pass = faker.internet.password();
  return {
    name: faker.internet.domainName(),
    email: faker.internet.email(),
    password: pass,
    confirmPassword: pass,
    image: faker.image.avatar(),
    birthday: faker.date.anytime(),
  };
}

export function changeEmail(user: Users) {
  return {
    email: user.email,
  };
}

export function bodyWrongPassword() {
  return {
    password: faker.internet.password(),
    confirmPassword: faker.internet.password(),
  };
}

export function changeName() {
  return {
    name: faker.string.sample(),
  };
}

export function changeImage() {
  return {
    image: faker.internet.avatar(),
  };
}

export function changeBirthday() {
  return {
    birthday: faker.date.anytime(),
  };
}

export async function findUserInfo(user: Users) {
  return await prisma.users.findFirst({
    where: {
      id: user.id,
    },
  });
}

export function returnUserInfo() {
  return {
    id: faker.number.int({ max: 50 }),
    name: faker.internet.userName(),
    image: faker.internet.avatar(),
    email: faker.internet.email(),
    birthday: faker.date.anytime(),
  }
}

export function passWordButNoConfirm() {
  return {
    password: faker.internet.password(),
  }
}

export function confirmButNoPassword() {
  return {
    confirmPassword: faker.internet.password(),
  }
}

export function returnFoundedUser() {
  return {
    id: faker.number.int({ max: 50 }),
    name: faker.internet.userName(),
    image: faker.internet.avatar(),
  }
}