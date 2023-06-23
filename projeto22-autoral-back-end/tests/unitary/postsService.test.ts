import { jest } from '@jest/globals';
import { bodyChangePostParams, bodyPost, bodyPostWithNoText, bodyPostWithTextEmpty, postWithNothing, returnBodyPost, returnFollows, returnGetAllPosts, returnGetPosts, returnGetReposts, returnReposts, returnUserExist } from '../factories';
import postsRepository from '@/repositories/posts-repository';
import repostsRepository from '@/repositories/reposts-repository';
import postsService from '@/services/posts-services';
import followsRepository from '@/repositories/follows-repository';
import authenticantionRepository from '@/repositories/authentication-repository';
import { badRequestError, conflictError, notFoundUserError } from '@/errors';
import likesRepository from '@/repositories/likes-repository';

jest.mock('@/repositories/posts-repository');
jest.mock('@/repositories/reposts-repository');
jest.mock('@/repositories/follows-repository');
jest.mock('@/repositories/authentication-repository');
jest.mock('@/repositories/likes-repository');

describe('postsService test suite', () => {
  describe('getPostsService function', () => {
  });
  describe('postPost function', () => {
    it('should post with user id and sent body post', async () => {
      const user = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);
      jest.spyOn(postsRepository, 'post').mockResolvedValue(post);

      const response = await postsService.postPost(user.id, body);

      expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(user.id);
      expect(postsRepository.post).toHaveBeenCalledWith(user.id, body);
      expect(response).toEqual(post);
    });
    it('should not post if body does not exist', async () => {
      const user = returnUserExist();
      const body = postWithNothing(1);

      await expect(postsService.postPost(user.id, body)).rejects.toEqual(badRequestError());

      expect(postsRepository.post).not.toHaveBeenCalled();
    });
    it('should not post if body is empty', async () => {
      const user = returnUserExist();
      const body = bodyChangePostParams(1,'','','');

      await expect(postsService.postPost(user.id, body)).rejects.toEqual(badRequestError());

      expect(postsRepository.post).not.toHaveBeenCalled();
    });
    it('should not post if type 1 but text does not exist and image or video exist', async () => {
      const user = returnUserExist();
      const body = bodyPostWithNoText(1);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);

      await expect(postsService.postPost(user.id, body)).rejects.toEqual(badRequestError());

      expect(postsRepository.post).not.toHaveBeenCalled();
    });
    it('should not post if type 1 but text is empty and image or video exist', async () => {
      const user = returnUserExist();
      const body = bodyPostWithTextEmpty(1);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);

      await expect(postsService.postPost(user.id, body)).rejects.toEqual(badRequestError());

      expect(postsRepository.post).not.toHaveBeenCalled();
    });
    it('should not post if type 2 but image does not exist', async () => {
      const user = returnUserExist();
      const body = bodyChangePostParams(2,'a', null, 'a');

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);

      await expect(postsService.postPost(user.id, body)).rejects.toEqual(badRequestError());

      expect(postsRepository.post).not.toHaveBeenCalled();
    });
    it('should not post if type 3 but video does not exist', async () => {
      const user = returnUserExist();
      const body = bodyChangePostParams(3, 'a', 'a', null);

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(user);

      await expect(postsService.postPost(user.id, body)).rejects.toEqual(badRequestError());

      expect(postsRepository.post).not.toHaveBeenCalled();
    });
  })
  describe('getUserAllPosts function', () => {
    it('should return error if user does not exist', async () => {
      const otherUser = returnUserExist();

      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(undefined);

      await expect(postsService.getUserAllPosts(0)).rejects.toEqual(notFoundUserError())

      expect(postsRepository.getAllUserPosts).not.toHaveBeenCalledWith(otherUser.id);
      expect(repostsRepository.getAllUserReposts).not.toHaveBeenCalledWith(otherUser.id);
    });
  })
  describe('deletePostService function', () => {
    it('should delete user post', async () => {
      const user = returnUserExist();
      const allPosts = returnGetAllPosts(user);
      const post = returnGetPosts(allPosts, user);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
      jest.spyOn(postsRepository, 'deletePost').mockResolvedValue(null);

      const response = await postsService.deletePostService(user.id, post.id)
      
      expect(response).toBe(undefined)
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
      expect(postsRepository.deletePost).toHaveBeenCalledWith(post.id);
    })
    it('should not delete if post does not exist', async () => {
      const user = returnUserExist();
      const allPosts = returnGetAllPosts(user);
      const post = returnGetPosts(allPosts, user);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(undefined);

      await expect(postsService.deletePostService(user.id, post.id)).rejects.toEqual(conflictError());
      
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    })
    it('should not delete if user does not own post', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const allPosts = returnGetAllPosts(otherUser);
      const post = returnGetPosts(allPosts, otherUser);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);

      await expect(postsService.deletePostService(user.id, post.id)).rejects.toEqual(conflictError());
      
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    })
  })
});
