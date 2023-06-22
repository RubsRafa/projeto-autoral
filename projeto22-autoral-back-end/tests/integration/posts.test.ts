import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import {
  bodyEmpty,
  bodyPost,
  bodyPostWithNoText,
  bodyPostWithTextEmpty,
  createFollow,
  createPost,
  createUser,
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

describe('GET /posts', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/posts');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 200 and empty array if user has no posts and no followers', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
    it('should respond with status 200 and post made by user', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const post = await createPost(user, 1);

      const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        {
          id: post.id,
          userId: user.id,
          type: post.type,
          video: null,
          image: null,
          text: post.text,
          isReposted: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          PostType: {
            id: 1,
            type: 'Text',
          },
          Users: {
            id: user.id,
            name: user.name,
            image: user.image,
          },
          repostedById: null,
          repostedByName: null,
          repostedByImage: null,
        },
      ]);
    });
    it('should respond with status 200 and post from follower', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const userIFollow = await createUser();
      await createFollow(user, userIFollow);
      const post = await createPost(userIFollow, 1);

      const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        expect.objectContaining({
          id: post.id,
          userId: userIFollow.id,
          type: post.type,
          video: null,
          image: null,
          text: post.text,
          isReposted: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          PostType: {
            id: 1,
            type: expect.any(String),
          },
          Users: {
            id: userIFollow.id,
            name: userIFollow.name,
            image: userIFollow.image,
          },
          repostedById: null,
          repostedByName: null,
          repostedByImage: null,
        }),
      ]);
    });
  });
});

describe('GET /posts/user/:userId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/posts/user/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/posts/user/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/posts/user/0`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should responde with status 404 if user is not found', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get(`/posts/user/0`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 200 and empty array if user has no posts', async () => {
      const user = await createUser();
      const findUser = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get(`/posts/user/${findUser.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
    it('should respond with status 200 and post made by user', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const findUser = await createUser();
      const post = await createPost(findUser, 1);

      const response = await server.get(`/posts/user/${findUser.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        expect.objectContaining({
          id: post.id,
          userId: findUser.id,
          type: post.type,
          video: null,
          image: null,
          text: post.text,
          isReposted: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          PostType: {
            id: 1,
            type: expect.any(String),
          },
          Users: {
            id: findUser.id,
            name: findUser.name,
            image: findUser.image,
          },
          repostedById: null,
          repostedByName: null,
          repostedByImage: null,
        }),
      ]);
    });
  });
});

describe('POST /posts', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/posts`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/posts`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/posts`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 400 if body is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = {};

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if body is empty', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyEmpty(1);

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if body is null', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = { type: 1 };

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if post is type 1 but has no text', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyPostWithNoText(1);

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if post is type 1 but has text is empty', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyPostWithTextEmpty(1);

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if post is type 2 but has no image', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyPost(2);

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 400 if post is type 3 but has no video', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyPost(3);

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 201', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = bodyPost(1);

      const response = await server.post('/posts').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
