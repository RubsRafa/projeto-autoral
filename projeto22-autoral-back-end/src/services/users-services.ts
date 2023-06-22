import bcrypt from 'bcrypt';
import { EditUserParams } from '../protocols';
import { badRequestError, duplicatedEmailError, notFoundUserError } from '../errors';
import { editUserInfo, findUserById, findUserByName, findUserEmail, getUserInfo } from '../repositories';

export async function getUserInfoService(userId: number) {
  const userExist = await findUserById(userId);
  if (!userExist) throw notFoundUserError();

  const userInfo = await getUserInfo(userId);
  return userInfo;
}

export async function editUserService(userId: number, body: EditUserParams) {
  const userExist = await findUserById(userId);

  if (body.email && body.email !== '') {
    const emailExist = await findUserEmail(body.email);
    if (emailExist && emailExist.id !== userId) throw duplicatedEmailError();
  }

  let hashedPassword;

  if (body.password && !body.confirmPassword) throw badRequestError();
  if (!body.password && body.confirmPassword) throw badRequestError();

  if (body.password && body.password !== '' && body.confirmPassword && body.confirmPassword !== '') {
    const validPassword = await bcrypt.compare(body.confirmPassword, userExist.password);
    if (!validPassword) throw notFoundUserError();
    hashedPassword = await bcrypt.hash(body.password, 12);
  }

  const newBody = {
    name: body.name && body.name,
    email: body.email && body.email,
    password: body.password && hashedPassword,
    image: body.image && body.image,
    birthday: body.birthday && body.birthday,
  };

  return await editUserInfo(userId, newBody);
}

export async function findUser(name: string) {
  const users = await findUserByName(name);
  return users;
}

const usersService = {
  getUserInfoService,
  editUserService,
  findUser,
};

export default usersService;
