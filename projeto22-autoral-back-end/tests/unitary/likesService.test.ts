import { jest } from '@jest/globals';
import { bodyPost, returnAllLikes, returnBodyPost, returnLikeInfo, returnUserExist } from '../factories';
import likesRepository from '@/repositories/likes-repository';
import likesService from '@/services/likes-services';
import { conflictError, notFoundError } from '@/errors';

jest.mock('@/repositories/likes-repository');

describe('likesService test suite', () => {
    describe('verifyInfo function', () => {
        it('should verify is post exist', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);

            const response = await likesService.verifyInfo(post.id);

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(response).toBe(undefined);
        })
        it('should return error if post does not exist', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(undefined);

            await expect(likesService.verifyInfo(post.id)).rejects.toEqual(notFoundError());

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
        })
    })
    describe('addLike function', () => {
        it('should add user like', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(likesRepository, 'findLikeByPost').mockResolvedValue([])
            jest.spyOn(likesRepository, 'like').mockResolvedValue(undefined);

            const response = await likesService.addLike(user.id, post.id);

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(likesRepository.findLikeByPost).toHaveBeenCalledWith(post.id);
            expect(likesRepository.like).toHaveBeenCalledWith(user.id, post.id);
            expect(response).toBe(undefined)
        })
        it('should not add like if like already exist', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body);
            const like = returnLikeInfo(user, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(likesRepository, 'findLikeByPost').mockResolvedValue([like])

            await expect(likesService.addLike(user.id, post.id)).rejects.toEqual(conflictError());

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(likesRepository.findLikeByPost).toHaveBeenCalledWith(post.id);
            expect(likesRepository.like).not.toHaveBeenCalled();
        })
    })
    describe('removeLike function', () => {
        it('should delete like', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body);
            const like = returnLikeInfo(user, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(likesRepository, 'findLikeByPost').mockResolvedValue([like]);
            jest.spyOn(likesRepository, 'dislike').mockResolvedValue(undefined);

            const response = await likesService.removeLike(user.id, post.id);

            expect(response).toBe(undefined);
            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(likesRepository.findLikeByPost).toHaveBeenCalledWith(post.id);
            expect(likesRepository.dislike).toHaveBeenCalledWith(like.id);
        })
        it('should not delete like if user did not liked the post', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(otherUser, body);
            const like = returnLikeInfo(otherUser, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(likesRepository, 'findLikeByPost').mockResolvedValue([like]);

            await expect(likesService.removeLike(user.id, post.id)).rejects.toEqual(conflictError());
            
            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(likesRepository.findLikeByPost).toHaveBeenCalledWith(post.id);
        })
    })
    describe('getLikesService function', () => {
        it('should get likes from logged user', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body);
            const like = returnLikeInfo(user, post);

            jest.spyOn(likesRepository, 'getLikesUser').mockResolvedValue([like]);

            const response = await likesService.getLikesService(user.id);

            expect(response).toEqual([post.id]);
            expect(likesRepository.getLikesUser).toHaveBeenCalledWith(user.id);
        })
        it('should return empty array if user did not like any post', async () => {
            const user = returnUserExist();

            jest.spyOn(likesRepository, 'getLikesUser').mockResolvedValue([]);

            const response = await likesService.getLikesService(user.id);

            expect(response).toEqual([]);
            expect(likesRepository.getLikesUser).toHaveBeenCalledWith(user.id);
        })
    })  
    describe('getAllLikesService function', () => {
        it('should return all likes with user information', async () => {
            const likes = returnAllLikes();

            jest.spyOn(likesRepository, 'getAllLikes').mockResolvedValue([likes]);

            const response = await likesService.getAllLikesService();

            expect(response).toEqual([likes]);
            expect(likesRepository.getAllLikes).toHaveBeenCalled();
        })
    })
})