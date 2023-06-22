import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { bodyLike, createLike, createPost, createUser, findLikeByUserAndPost } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /like/users', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/like/users`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/like/users`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/like/users`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with all likes', async () => {
      const otherUser = await createUser();
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      const like = await createLike(user, post);

      const response = await server.get('/like/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        expect.objectContaining({
          id: like.id,
          userId: user.id,
          postId: post.id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Users: {
            id: user.id,
            name: user.name,
            image: user.image,
          },
        }),
      ]);
    });
  });
});

describe('GET /like', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/like`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/like`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/like`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 200 and an empty array if user has no likes', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/like').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
    it('should respond with status 200 and an array with id of posts user liked', async () => {
      const otherUser = await createUser();
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      await createLike(user, post);

      const response = await server.get('/like').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([post.id]);
    });
    it('should respond with status 200 and an array with multiple post IDs', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();

      const post1 = await createPost(otherUser, 1);
      const post2 = await createPost(otherUser, 1);
      await createLike(user, post1);
      await createLike(user, post2);

      const response = await server.get('/like').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([post1.id, post2.id]);
    });
  });
});

describe('POST /like', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post(`/like`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post(`/like`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post(`/like`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if post id does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post('/like').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 409 if post is already liked by user', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      await createLike(user, post);
      const body = bodyLike(post);

      const response = await server.post('/like').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it('should respond with status 200 if like was added', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      const body = bodyLike(post);

      const response = await server.post('/like').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe('DELETE /like/:postId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete(`/like/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete(`/like/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/like/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 if post id does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.delete(`/like/0`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 409 if post was not liked', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      await createLike(otherUser, post);

      const response = await server.delete(`/like/${post.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it('should respond with status 200 if like was removed', async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost(otherUser, 1);
      await createLike(user, post);

      const response = await server.delete(`/like/${post.id}`).set('Authorization', `Bearer ${token}`).send({ postId: post.id });

      expect(response.status).toBe(httpStatus.OK);
      const like = await findLikeByUserAndPost(user, post);
      expect(like.length).toBe(0);
    });
  });
});
