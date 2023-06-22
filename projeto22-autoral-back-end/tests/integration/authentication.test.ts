import httpStatus from 'http-status';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { cleanDb } from '../helpers';
import { createUser, returnUserBody, userSignIn } from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /auth/signup', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/signup');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const user = {};

    const response = await server.post('/auth/signup').send(user);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 401 if email already exists', async () => {
    const user = await createUser();
    const newUser = returnUserBody(user.email);

    const response = await server.post('/auth/signup').send(newUser);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const user = {};

    const response = await server.post('/auth/signup').send(user);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 201 when body is valid', async () => {
    const user = returnUserBody();

    const response = await server.post('/auth/signup').send(user);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.text).toBe('User created successfully!');
  });
});

describe('POST /auth/signin', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/signin');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const user = {};

    const response = await server.post('/auth/signin').send(user);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 404 if email does not exists', async () => {
    const user = await createUser();
    const fakerEmail = faker.internet.email();
    const newUser = userSignIn(fakerEmail, user.password);

    const response = await server.post('/auth/signin').send(newUser);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 404 if password is incorrect', async () => {
    const user = await createUser();
    const fakerPassword = faker.internet.password();
    const newUser = userSignIn(user.email, fakerPassword);

    const response = await server.post('/auth/signin').send(newUser);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it('should respond with status 200 and user info if login was successfull', async () => {
    const password = faker.internet.password();
    const user = await createUser({ password });
    const signIn = userSignIn(user.email, password);

    const response = await server.post('/auth/signin').send(signIn);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      info: {
        userId: user.id,
        image: user.image,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
      },
      token: expect.any(String),
    });
  });
});
