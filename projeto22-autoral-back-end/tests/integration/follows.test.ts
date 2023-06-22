import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { bodyDeleteFollow, bodyPostFollows, createFollow, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /follow/:userId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/follow/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/follow/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/follow/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 200 and empty array if user has no follows', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get(`/follow/${user.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([]);
    });
    it('should respond with status 200 and followers info', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const follow = await createFollow(user, otherUser);

      const response = await server.get(`/follow/${user.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        expect.objectContaining({
          id: follow.id,
          userId: user.id,
          userIdIFollow: otherUser.id,
          userName: otherUser.name,
          userImage: otherUser.image,
        }),
      ]);
    });
  });
});

describe('POST /follow', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post(`/follow`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post(`/follow`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post(`/follow`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if user follower does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post('/follow').set('Authorization', `Bearer ${token}`).send({ userIdIFollow: 0 });
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 200 and add follow', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const body = bodyPostFollows(otherUser);

      const response = await server.post(`/follow`).set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});

describe('DELETE /follow/:followId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete(`/follow/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete(`/follow/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/follow/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if user follow does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.delete(`/follow/0`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 200 and add follow', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const follow = await createFollow(user, otherUser);

      const response = await server.delete(`/follow/${follow.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
