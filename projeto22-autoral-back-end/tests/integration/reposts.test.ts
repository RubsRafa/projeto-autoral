import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { cleanDb, generateValidToken } from '../helpers';
import { createPost, createUser } from '../factories';
import { bodyRepost, createRepost } from '../factories/reposts-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /repost', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post(`/repost`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post(`/repost`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post(`/repost`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if post id does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post('/repost').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 409 if post is already reposted by user', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      await createRepost(user, post);
      const body = bodyRepost(post);

      const response = await server.post('/repost').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it('should respond with status 200 if repost was added', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      const body = bodyRepost(post);

      const response = await server.post('/repost').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe('DELETE /repost/:postId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete(`/repost/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete(`/repost/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/repost/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if post id does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.delete(`/repost/0`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 409 if user has no repost to remove', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);

      const response = await server.delete(`/repost/${post.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it('should respond with status 200 if repost was removed', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      await createRepost(user, post);

      const response = await server.delete(`/repost/${post.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
