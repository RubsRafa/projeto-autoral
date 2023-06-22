import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import {
  bodyWrongPassword,
  changeBirthday,
  changeImage,
  changeName,
  createUser,
  findUserInfo,
  changeEmail,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /users/:userId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/users/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/users/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/users/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if user does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get(`/users/0`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 200 with user info', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();

      const response = await server.get(`/users/${otherUser.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: otherUser.id,
        image: otherUser.image,
        name: otherUser.name,
        birthday: otherUser.birthday,
        email: otherUser.email,
      });
    });
  });
});

describe('PUT /users/edit', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.put(`/users/edit`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.put(`/users/edit`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put(`/users/edit`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 401 if user send email that already exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const body = changeEmail(otherUser);

      const response = await server.put('/users/edit').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 400 if user send password but no confirmPassword', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const password = faker.internet.password();
      const body = { password };

      const response = await server.put('/users/edit').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if user send confirmPassword but no password', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const password = faker.internet.password();
      const body = { confirmPassword: password };

      const response = await server.put('/users/edit').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 404 if user did not send valid password', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyWrongPassword();

      const response = await server.put('/users/edit').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 200 and edit user name', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = changeName();

      const response = await server.put(`/users/edit`).set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.OK);

      const userInfo = await findUserInfo(user);
      expect(userInfo).toStrictEqual({
        id: user.id,
        name: body.name,
        email: user.email,
        password: expect.any(String),
        image: user.image,
        birthday: user.birthday,
      });
    });
    it('should respond with status 200 and edit user image', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = changeImage();

      const response = await server.put(`/users/edit`).set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.OK);

      const userInfo = await findUserInfo(user);
      expect(userInfo).toStrictEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        password: expect.any(String),
        image: body.image,
        birthday: user.birthday,
      });
    });
    it('should respond with status 200 and edit user birthday', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = changeBirthday();

      const response = await server.put(`/users/edit`).set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.OK);

      const userInfo = await findUserInfo(user);
      expect(userInfo).toStrictEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        password: expect.any(String),
        image: user.image,
        birthday: body.birthday,
      });
    });
  });
});
