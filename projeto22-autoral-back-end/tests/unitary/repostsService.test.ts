import { jest } from '@jest/globals';
import { bodyPost, returnBodyPost, returnOnlyReposts, returnUserExist } from '../factories';
import likesRepository from '@/repositories/likes-repository';
import repostsService from '@/services/reposts-services';
import repostsRepository from '@/repositories/reposts-repository';
import { conflictError, notFoundError } from '@/errors';

jest.mock('@/repositories/likes-repository');
jest.mock('@/repositories/reposts-repository');

describe('repostsService test suite', () => {
    describe('verifyInfo function', () => {
        it('should verify if post exist', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body)

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);

            const response = await repostsService.verifyInfo(post.id);

            expect(response).toEqual(undefined);
            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
        })
        it('should throw error if post does not exist', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body)

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(undefined);

            await expect(repostsService.verifyInfo(post.id)).rejects.toEqual(notFoundError());
            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
        })
    })
    describe('addRepostService function', () => {
        it('should add repost', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body)
            const repost = returnOnlyReposts(otherUser, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(repostsRepository, 'findRepostIdByPostId').mockResolvedValue([repost]);
            jest.spyOn(repostsRepository, 'repost').mockResolvedValue(undefined);

            const response = await repostsService.addRepostService(user.id, post.id);

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(repostsRepository.findRepostIdByPostId).toHaveBeenCalledWith(post.id);
            expect(repostsRepository.repost).toHaveBeenCalledWith(user.id, post.id);
            expect(response).toEqual(undefined);
        })
        it('should not add repost if user already reposted this post', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body)
            const repost = returnOnlyReposts(user, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(repostsRepository, 'findRepostIdByPostId').mockResolvedValue([repost]);

            await expect(repostsService.addRepostService(user.id, post.id)).rejects.toEqual(conflictError())

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(repostsRepository.findRepostIdByPostId).toHaveBeenCalledWith(post.id);
        })
    })
    describe('removeRepostService function', () => {
        it('should remove repost', async () => {
            const user = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body)
            const repost = returnOnlyReposts(user, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(repostsRepository, 'findRepostIdByPostId').mockResolvedValue([repost]);
            jest.spyOn(repostsRepository, 'removeRepost').mockResolvedValue(undefined);

            const response = await repostsService.removeRepostService(user.id, post.id);

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(repostsRepository.findRepostIdByPostId).toHaveBeenCalledWith(post.id);
            expect(repostsRepository.removeRepost).toHaveBeenCalledWith(repost.id);
            expect(response).toEqual(undefined);
        })
        it('should not remove repost if user did not reposted', async () => {
            const user = returnUserExist();
            const otherUser = returnUserExist();
            const body = bodyPost(1);
            const post = returnBodyPost(user, body)
            const repost = returnOnlyReposts(otherUser, post);

            jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
            jest.spyOn(repostsRepository, 'findRepostIdByPostId').mockResolvedValue([repost]);

            await expect(repostsService.removeRepostService(user.id, post.id)).rejects.toEqual(conflictError())

            expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
            expect(repostsRepository.findRepostIdByPostId).toHaveBeenCalledWith(post.id);
        })
    })
})