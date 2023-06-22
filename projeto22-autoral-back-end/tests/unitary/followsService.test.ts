import { jest } from '@jest/globals';
import { returnFollows, returnUserExist } from '../factories';
import followsRepository from '@/repositories/follows-repository';
import followsService from '@/services/follows-services';
import authenticantionRepository from '@/repositories/authentication-repository';
import { conflictError, notFoundError, notFoundUserError } from '@/errors';


jest.mock('@/repositories/follows-repository');
jest.mock('@/repositories/authentication-repository');

describe('followsService test suite', () => {
    describe('findMyFollows function', () => {
        it('should return user info', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const follow = returnFollows(user, otherUser);

            jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValue([follow]);
            jest.spyOn(followsRepository, 'getAllUsers').mockResolvedValue([otherUser]);

            const response = await followsService.findMyFollows(user.id);

            expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
            expect(followsRepository.getAllUsers).toHaveBeenCalled();
            expect(response).toEqual([
                {
                    id: follow.id,
                    userId: follow.userId,
                    userIdIFollow: follow.userIdIFollow,
                    userName: otherUser.name,
                    userImage: otherUser.image,
                }
            ])
        })
    })
    describe('followUser function', () => {
        it('should allow user to follow another user', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(otherUser);
            jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValue([]);
            jest.spyOn(followsRepository, 'createFollow').mockResolvedValue(null);

            const response = await followsService.followUser(user.id, otherUser.id);
         
            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(otherUser.id);
            expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
            expect(followsRepository.createFollow).toHaveBeenCalledWith(user.id, otherUser.id);
            expect(response).toEqual(undefined);
        });
        it('should not allow following if other user does not exist', async () => {
            const user = returnUserExist();

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(undefined);

            await expect(followsService.followUser(user.id, 0)).rejects.toEqual(notFoundUserError());

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(0);
        })
        it('should not allow following if follow already exist', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const follow = returnFollows(user, otherUser);

            jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(otherUser);
            jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValue([follow]);

            await expect(followsService.followUser(user.id, otherUser.id)).rejects.toEqual(conflictError());

            expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(otherUser.id);
            expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
            expect(followsRepository.createFollow).not.toHaveBeenCalled();
        })
    })
    describe('removeFollowService function', () => {
        it('should remove user follow', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const follow = returnFollows(user, otherUser);

            jest.spyOn(followsRepository, 'findFollow').mockResolvedValue(follow);
            jest.spyOn(followsRepository, 'removeFollow').mockResolvedValue(undefined);

            const response = await followsService.removeFollowService(follow.id);

            expect(response).toBe(undefined);
            expect(followsRepository.findFollow).toHaveBeenCalledWith(follow.id)
            expect(followsRepository.removeFollow).toHaveBeenCalledWith(follow.id);
        })
        it('should not remove user follow if follow does not exit', async () => {

            jest.spyOn(followsRepository, 'findFollow').mockResolvedValue(undefined);
            jest.spyOn(followsRepository, 'removeFollow').mockResolvedValue(undefined);

            await expect(followsService.removeFollowService(0)).rejects.toEqual(notFoundError());

            expect(followsRepository.findFollow).toHaveBeenCalledWith(0)
            expect(followsRepository.removeFollow).not.toHaveBeenCalled();
        })
    })
})