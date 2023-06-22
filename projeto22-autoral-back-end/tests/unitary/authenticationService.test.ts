import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { returnSignInParams, returnUserExist } from '../factories';
import authService from '@/services/auth-services';
import { duplicatedEmailError, notFoundUserError } from '@/errors';
import authenticantionRepository from '@/repositories/authentication-repository';

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('@/repositories/authentication-repository');
jest.mock('jsonwebtoken');

describe('authService test suite', () => {
  describe('createUser function', () => {
    it('should not allow user creation with an email in use', async () => {
      const user = returnUserExist();

      jest.spyOn(authenticantionRepository, 'findUserEmail').mockResolvedValue(user);

      await expect(authService.createUser(user)).rejects.toEqual(duplicatedEmailError());

      expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(user.email);
      expect(authenticantionRepository.singUp).not.toHaveBeenCalled();
    });
    it('should allow user creation', async () => {
      const user = returnUserExist();

      const hashedPassword = faker.internet.password();

      jest.spyOn(authenticantionRepository, 'findUserEmail').mockImplementationOnce(null);
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        return hashedPassword;
      });
      jest.spyOn(authenticantionRepository, 'singUp').mockResolvedValue(user);

      const response = await authService.createUser(user);

      expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(user.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 12);
      expect(authenticantionRepository.singUp).toHaveBeenCalledWith(user, hashedPassword);
      expect(response).toEqual(user);
    });
  });
  describe('validateInfo function', () => {
    it('should validate user info', async () => {
      const user = returnUserExist();
      const userSignInParams = returnSignInParams();

      jest.spyOn(authenticantionRepository, 'findUserEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): boolean => {
        return true;
      });

      const response = await authService.validateInfo(userSignInParams);

      expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(userSignInParams.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(userSignInParams.password, user.password);
      expect(response).toStrictEqual(user);
    });
    it('should throw error if user email was not found', async () => {
      const user = returnUserExist();
      const hashedPassword = faker.internet.password();

      jest.spyOn(authenticantionRepository, 'findUserEmail').mockResolvedValue(undefined);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): string => {
        return hashedPassword;
      });

      await expect(authService.validateInfo(user)).rejects.toEqual(notFoundUserError());
      expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(user.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });
    it('should throw error if user password is not correct', async () => {
      const user = returnUserExist();

      jest.spyOn(authenticantionRepository, 'findUserEmail').mockImplementationOnce((): any => {
        return user;
      });
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): boolean => {
        return false;
      });

      await expect(authService.validateInfo(user)).rejects.toEqual(notFoundUserError());
      expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(user.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(user.password, user.password);
    });
  });
  describe('loginUser function', () => {
    it('should allow user login', async () => {
      const user = returnUserExist();
      const userSignInParams = returnSignInParams();
      const token = faker.string.uuid();
      const info = { userId: user.id, image: user.image, email: user.email, name: user.name, birthday: user.birthday };

      jest.spyOn(authenticantionRepository, 'findUserEmail').mockImplementationOnce((): any => {
        return user;
      });
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): boolean => {
        return true;
      });
      jest.spyOn(jwt, 'sign').mockImplementationOnce((): string => {
        return token;
      });
      jest.spyOn(authenticantionRepository, 'createSession').mockImplementationOnce((): undefined => {
        return;
      });

      const response = await authService.loginUser(userSignInParams);

      expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(userSignInParams.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(userSignInParams.password, user.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(authenticantionRepository.createSession).toHaveBeenCalledWith(user.id, token);
      expect(response).toEqual({ info, token });
    });
  });
});
