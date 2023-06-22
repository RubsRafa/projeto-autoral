import supertest from "supertest";
import httpStatus from "http-status";
import app, {init} from "@/app";
import { cleanDb, generateValidToken } from "../helpers";
import { createFollow, createUser, createUserMessages, returnBodySendMessage, returnUserExist } from "../factories";
import { findChatById } from "@/repositories";

beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await cleanDb();
})

const server = supertest(app);

describe('GET /chat/users', () => {
    describe('when token is valid', () => {
        it('should return user info and message from me', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            const follow = await createFollow(user, otherUser);
            const message = await createUserMessages(user, otherUser);

            const response = await server.get('/chat/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    user: {
                        id: otherUser.id,
                        name: otherUser.name,
                        image: otherUser.image,
                    },
                    message: message.message
                },
            ])
        });
        it('should return user info and message from user', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            // const follow = await createFollow(user, otherUser);
            const message = await createUserMessages(otherUser, user);

            const response = await server.get('/chat/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    user: {
                        id: otherUser.id,
                        name: otherUser.name,
                        image: otherUser.image,
                    },
                    message: message.message
                },
            ])
        });
        it('should return user info and message from user only one time', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            // const follow = await createFollow(user, otherUser);
            const message = await createUserMessages(otherUser, user);
            const otherMessage = await createUserMessages(otherUser, user);

            const response = await server.get('/chat/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    user: {
                        id: otherUser.id,
                        name: otherUser.name,
                        image: otherUser.image,
                    },
                    message: message.message
                },
            ])
        });
        it('should return user info and message from user', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            const follow = await createFollow(user, otherUser);
            // const message = await createUserMessages(otherUser, user);

            const response = await server.get('/chat/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    user: {
                        id: otherUser.id,
                        name: otherUser.name,
                        image: otherUser.image,
                    },
                    message: null
                },
            ])
        });
    })
})

describe('GET /chat/:userId', () => {
    describe('when token is valid', () => {
        it('should return user messages where its id is either fromId or toId', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            const message = await createUserMessages(user, otherUser);
            const otherMessage = await createUserMessages(otherUser, user);

            const response = await server.get(`/chat/${otherUser.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual([
                {
                    id: message.id,
                    fromId: message.fromId,
                    toId: message.toId,
                    message: message.message,
                    time: expect.any(String),
                },
                {
                    id: otherMessage.id,
                    fromId: otherMessage.fromId,
                    toId: otherMessage.toId,
                    message: otherMessage.message,
                    time: expect.any(String),
                },
            ])

        })
    })
})

describe('POST /chat', () => {
    describe('when token is valid', () => {
        it('should not add message if user does not exist', async () => {
            const token = await generateValidToken();
            const otherUser = returnUserExist();
            const body = returnBodySendMessage(otherUser);

            const response = await server.post('/chat').set('Authorization', `Bearer ${token}`).send(body);
            
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        })
        it('should not add message if other user does not exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = returnUserExist();
            const body = returnBodySendMessage(otherUser);

            const response = await server.post('/chat').set('Authorization', `Bearer ${token}`).send(body);
            
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        })
        it('should add message', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            const body = returnBodySendMessage(otherUser);

            const response = await server.post('/chat').set('Authorization', `Bearer ${token}`).send(body);
            
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toStrictEqual({})
        })
    })
})

describe('DELETE /chat/:messageId', () => {
    describe('when token is valid', () => {
        it('should not delete message if message does not exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.delete(`/chat/${0}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        })
        it('should not delete message if user does not own message', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            const message = await createUserMessages(otherUser, user);

            const response = await server.delete(`/chat/${message.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.CONFLICT);
        })
        it('should delete message', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const otherUser = await createUser();
            const message = await createUserMessages(user, otherUser);

            const response = await server.delete(`/chat/${message.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(await findChatById(message.id)).toBe(null)
        })
    })
})