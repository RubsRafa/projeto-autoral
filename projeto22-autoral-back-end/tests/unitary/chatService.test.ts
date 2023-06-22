import { jest } from '@jest/globals';
import { chatReturn, getFollowsInfo, returnMessages, returnSendChatParams, returnUserExist } from '../factories';
import chatRepository from '@/repositories/chat-repository';
import chatServices from '@/services/chat-services';
import authenticantionRepository from '@/repositories/authentication-repository';
import { conflictError, notFoundError, notFoundUserError } from '@/errors';
import followsRepository from '@/repositories/follows-repository';

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('@/repositories/chat-repository');
jest.mock('@/repositories/authentication-repository');
jest.mock('@/repositories/follows-repository');

describe('chatService test suite', () => {
  describe('getAllMyMessages function', () => {
    it('should return messages filtered', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const chat = chatReturn(user, otherUser);
      const otherChat = chatReturn(otherUser, user);
      const chats = [chat, otherChat];
      jest.spyOn(chatRepository, 'getMyMessages').mockResolvedValue(chats);

      const response = await chatServices.getAllMyMessages(user.id, otherUser.id);

      expect(chatRepository.getMyMessages).toHaveBeenCalled();
      expect(response).toEqual(chats);
    });
    it('should return an empty array if there is no message', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();

      jest.spyOn(chatRepository, 'getMyMessages').mockResolvedValue([]);

      const response = await chatServices.getAllMyMessages(user.id, otherUser.id);

      expect(chatRepository.getMyMessages).toHaveBeenCalled();
      expect(response).toEqual([]);
    });
  });
  describe('addNewMessage function', () => {
    it('should add message if user and other user exist', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const body = returnSendChatParams(user, otherUser);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);
      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(otherUser);

      const response = await chatServices.addNewMessage(body);

      expect(authenticantionRepository.findUserById).toHaveBeenCalledTimes(2);
      expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(body.fromId);
      expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(body.toId);
      expect(response).toEqual(undefined);
    });
    it('should throw not found user error if user does not exist', async () => {
      const user = returnUserExist();
      const body = returnSendChatParams(user, user);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(undefined);

      await expect(chatServices.addNewMessage(body)).rejects.toEqual(notFoundUserError());

      expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
    });
    it('should throw not found user error if other user does not exist', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const body = returnSendChatParams(user, otherUser);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValueOnce(user);
      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(undefined);

      await expect(chatServices.addNewMessage(body)).rejects.toEqual(notFoundUserError());

      expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
    });
  });
  describe('deleteUserMessage function', () => {
    it('should delete message', async () => {
      const user = returnUserExist();
      const chat = chatReturn(user, user);

      jest.spyOn(chatRepository, 'findChatById').mockResolvedValue(chat);

      const response = await chatServices.deleteUserMessage(user.id, chat.id);

      expect(chatRepository.findChatById).toHaveBeenCalledWith(chat.id);
      expect(chatRepository.deleteMessage).toHaveBeenCalledWith(chat.id);
      expect(chatRepository.deleteMessage).toHaveBeenCalled();
      expect(response).toEqual(undefined);
    });
    it('should not delete if message does not exist', async () => {
      const user = returnUserExist();
      const chat = chatReturn(user, user);

      jest.spyOn(chatRepository, 'findChatById').mockResolvedValue(undefined);

      await expect(chatServices.deleteUserMessage(user.id, chat.id)).rejects.toEqual(notFoundError());

      expect(chatRepository.findChatById).toHaveBeenCalledWith(chat.id);
    });
    it('should not delete if user does not own message', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const chat = chatReturn(otherUser, user);

      jest.spyOn(chatRepository, 'findChatById').mockResolvedValue(chat);

      await expect(chatServices.deleteUserMessage(user.id, chat.id)).rejects.toEqual(conflictError());

      expect(chatRepository.findChatById).toHaveBeenCalledWith(chat.id);
      expect(chatRepository.deleteMessage).not.toHaveBeenCalled();
    });
  });
  describe('getOnlyUsersChat function', () => {
    it('should return only chat and followes info from user', async () => {
      const userLogged = returnUserExist();
      const chatUser = returnUserExist();
      const followerUser = returnUserExist();
      const followersInfo = getFollowsInfo(userLogged, followerUser);
      const messages = returnMessages(userLogged, chatUser);

      jest.spyOn(followsRepository, 'getMyFollowsInfo').mockResolvedValue([followersInfo]);
      jest.spyOn(chatRepository, 'getUserMessages').mockResolvedValue([messages]);

      const response = await chatServices.getOnlyUsersChat(userLogged.id);

      expect(followsRepository.getMyFollowsInfo).toHaveBeenCalledWith(userLogged.id);
      expect(chatRepository.getUserMessages).toHaveBeenCalled();
      expect(response).toEqual(
        expect.arrayContaining([
          {
            user: messages.Chat_toIdToUsers,
            message: messages.message,
          },
        ]),
      );
    });
    it('should return only chat and followes info to user', async () => {
      const userLogged = returnUserExist();
      const chatUser = returnUserExist();
      const followerUser = returnUserExist();
      const followersInfo = getFollowsInfo(userLogged, followerUser);
      const messages = returnMessages(chatUser, userLogged);

      jest.spyOn(followsRepository, 'getMyFollowsInfo').mockResolvedValue([followersInfo]);
      jest.spyOn(chatRepository, 'getUserMessages').mockResolvedValue([messages]);

      const response = await chatServices.getOnlyUsersChat(userLogged.id);

      expect(followsRepository.getMyFollowsInfo).toHaveBeenCalledWith(userLogged.id);
      expect(chatRepository.getUserMessages).toHaveBeenCalled();
      expect(response).toEqual(
        expect.arrayContaining([
          {
            user: messages.Chat_fromIdToUsers,
            message: messages.message,
          },
        ]),
      );
    });
    it('should not add user that already exist on filterUsersIds', async () => {
      const userLogged = returnUserExist();
      const chatUser = returnUserExist();
      const followerUser = returnUserExist();
      const followersInfo = getFollowsInfo(userLogged, followerUser);
      const messages = returnMessages(chatUser, userLogged);

      jest.spyOn(followsRepository, 'getMyFollowsInfo').mockResolvedValue([followersInfo, followersInfo]);
      jest.spyOn(chatRepository, 'getUserMessages').mockResolvedValue([messages, messages]);

      const response = await chatServices.getOnlyUsersChat(userLogged.id);

      expect(followsRepository.getMyFollowsInfo).toHaveBeenCalledWith(userLogged.id);
      expect(chatRepository.getUserMessages).toHaveBeenCalled();
      expect(response).toEqual(
        expect.arrayContaining([
          {
            user: messages.Chat_fromIdToUsers,
            message: messages.message,
          },
          {
            user: {
              id: followerUser.id,
              name: followerUser.name,
              image: followerUser.image,
            },
            message: null,
          }
        ]),
      );
    });
  });
});
