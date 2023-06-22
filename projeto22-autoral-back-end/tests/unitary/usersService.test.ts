import { jest } from '@jest/globals';
import { bodyUserComplete, confirmButNoPassword, passWordButNoConfirm, returnFoundedUser, returnUserExist, returnUserInfo } from '../factories';
import authenticantionRepository from '@/repositories/authentication-repository';
import usersRepository from '@/repositories/users-repository';
import usersService from '@/services/users-services';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { badRequestError, duplicatedEmailError, notFoundUserError } from '@/errors';

jest.mock('@/repositories/authentication-repository');
jest.mock('@/repositories/users-repository');

describe('usersService function', () => {
    describe('getUserInfoService function', () => {
        it('should return user information', async () => {
            const user = returnUserExist();
            const userInfo = returnUserInfo();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);
            jest.spyOn(usersRepository, 'getUserInfo').mockResolvedValue(userInfo);

            const response = await usersService.getUserInfoService(user.id);

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
            expect(usersRepository.getUserInfo).toHaveBeenCalledWith(user.id);
            expect(response).toEqual(userInfo);
        })
        it('should not return info if user does not exit', async () => {
            const user = returnUserExist();
            const userInfo = returnUserInfo();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(undefined);

            await expect(usersService.getUserInfoService(user.id)).rejects.toEqual(notFoundUserError())

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
        })
    })
    describe('editUserService function', () => {
        it('should edit user information', async () => {
            const user = returnUserExist();
            const body = bodyUserComplete();
            const hashedPassword = faker.internet.password();
            const newBody = { name: body.name, email: body.email, password: hashedPassword, image: body.image, birthday: body.birthday }

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);
            jest.spyOn(authenticantionRepository, 'findUserEmail').mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): boolean => { return true });
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce((): string => { return hashedPassword });
            jest.spyOn(usersRepository, 'editUserInfo').mockResolvedValue(undefined);

            const response = await usersService.editUserService(user.id, body);

            expect(response).toEqual(undefined);
            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
            expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(body.email);
            expect(bcrypt.compare).toHaveBeenCalled(),
            expect(bcrypt.hash).toHaveBeenCalled(),
            expect(usersRepository.editUserInfo).toHaveBeenCalledWith(user.id, newBody);
        })
        it('should not edit user info if email already exist', async () => {
            const user = returnUserExist();
            const otherUser = { id: 0, name: user.name, email: user.email, password: user.password, birthday: user.birthday, image: user.image }
            const body = bodyUserComplete();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);
            jest.spyOn(authenticantionRepository, 'findUserEmail').mockResolvedValue(otherUser);

            await expect(usersService.editUserService(user.id, body)).rejects.toEqual(duplicatedEmailError());

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
            expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(body.email);
        })
        it('should not edit user info if password exist but no confirm password', async () => {
            const user = returnUserExist();
            const body = passWordButNoConfirm();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);

            await expect(usersService.editUserService(user.id, body)).rejects.toEqual(badRequestError());

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
        })
        it('should not edit user info if confirm password exist but no password', async () => {
            const user = returnUserExist();
            const body = confirmButNoPassword();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);

            await expect(usersService.editUserService(user.id, body)).rejects.toEqual(badRequestError());

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
        })
        it('should not edit user info if password is wrong', async () => {
            const user = returnUserExist();
            const body = bodyUserComplete();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);
            jest.spyOn(authenticantionRepository, 'findUserEmail').mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): boolean => { return false });

            await expect(usersService.editUserService(user.id, body)).rejects.toEqual(notFoundUserError());

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
            expect(authenticantionRepository.findUserEmail).toHaveBeenCalledWith(body.email);
            expect(bcrypt.compare).toHaveBeenCalled()
        })
    })
    describe('findUser', () => {
        it('should find user by its name', async () => {
            const users = returnFoundedUser();

            jest.spyOn(usersRepository, 'findUserByName').mockResolvedValue([users]);

            const response = await usersService.findUser(users.name);

            expect(response).toEqual([users]);
            expect(usersRepository.findUserByName).toHaveBeenCalledWith(users.name);
        })
        
    })
})