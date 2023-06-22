import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '@/app';
import { createUser } from '../factories';
import { generateValidToken } from '../helpers';
import { createHumorDiary, returnBodyWithInvalidHumor, returnChangeHealthParams, returnHealthParams } from '../factories/health-factory';
import { any } from 'joi';
import { Health } from '@prisma/client';

beforeAll(async () => {
  await init();
});

const server = supertest(app);

describe('GET /heatlh', () => {
  it('should respond with status 200 with OK! text', async () => {
    const response = await server.get('/health');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe('OK!');
  });
});

describe('GET /mental-health', () => {
  describe('when token is valid', () => {
    it('should respond with status 200 and user diary info', async () => {
       const user = await createUser();
       const token = await generateValidToken(user);
       const humor = await createHumorDiary(user);

       const response = await server.get('/mental-health').set('Authorization', `Bearer ${token}`);
       expect(response.status).toBe(httpStatus.OK);
       expect(response.body).toStrictEqual([
        {
          id: humor.id,
          mood: humor.mood,
          color: humor.color,
          text: humor.text,
          userId: humor.userId,
          date: expect.any(String),
        }
       ]);
    })
    it('should respond with status 200 and user diary info in order', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const humor = await createHumorDiary(user);
      const otherHumor = await createHumorDiary(user);
      const diary = [humor, otherHumor];

      const response = await server.get('/mental-health').set('Authorization', `Bearer ${token}`);
      const responseBody = response.body.map((entry: Health) => ({ ... entry, date: expect.any(String) }))
      diary.sort((a, b) => b.date.getTime() - a.date.getTime());
      
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(responseBody)
   })
  })
}) 

describe('POST /mental-health', () => {
  describe('when token is valid', () => {
    it('should create user hurmo', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = returnHealthParams();

      const response = await server.post('/mental-health').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual({})
    })
  })
})

describe('PUT /mental-health', () => {
  describe('when token is valid', () => {
    it('should not edit user humor if humor does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = returnBodyWithInvalidHumor();

      const response = await server.put('/mental-health').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it('should edit user humor', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const humor = await createHumorDiary(user);
      const body = returnChangeHealthParams(humor);

      const response = await server.put('/mental-health').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({});
    })
  })
})

describe('DELETE /mental-health/:id', () => {
  describe('when token is valid', () => {
    it('should not delete humor if humor does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.delete(`/mental-health/${0}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.CONFLICT);
    })
    it('should delete user hurmo', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const humor = await createHumorDiary(user);

      const response = await server.delete(`/mental-health/${humor.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    })
  })
})