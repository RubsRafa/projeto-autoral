import { jest } from '@jest/globals';
import { bodyPost, returnBodyPost, returnComment, returnCommentItem, returnCommentsWithUsers, returnUserExist } from '../factories';
import likesRepository from '@/repositories/likes-repository';
import commentsService from '@/services/comments-services';
import { conflictError, notFoundError } from '@/errors';
import commentsRepository from '@/repositories/comments-repository';

jest.mock('@/repositories/likes-repository');
jest.mock('@/repositories/comments-repository')

describe('commentsService test suite', () => {
  describe('verifyInfo function', () => {
    it('should verify if post exist', async () => {
      const user = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);
      jest.spyOn(likesRepository, 'findPostById').mockResolvedValueOnce(post);

      const response = await commentsService.verifyInfo(post.id);
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
      expect(response).toEqual(undefined);
    });

    it('should throw error if post does not exist', async () => {
      const user = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(undefined);

      await expect(commentsService.verifyInfo(post.id)).rejects.toEqual(notFoundError());

      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    });
  });
  describe('addCommentService function', () => {
    it('should add user comment', async () => {
      const user = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);
      const comment = returnComment();

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
      jest.spyOn(commentsRepository, 'addComment').mockResolvedValue(null);

      const response = await commentsService.addCommentService(user.id, post.id, comment);

      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
      expect(commentsRepository.addComment).toHaveBeenCalledWith(user.id, post.id, comment);
      expect(response).toBe(undefined)
    })
  })
  describe('removeCommentService function', () => {
    it('should remove user comment', async () => {
      const user = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);
      const comment = returnComment();
      const commentPost = returnCommentItem(user, post, comment);

      jest.spyOn(commentsRepository, 'findComment').mockResolvedValue(commentPost);
      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
      jest.spyOn(commentsRepository, 'removeComment').mockResolvedValue(null);

      const response = await commentsService.removeCommentService(user.id, commentPost.id);

      expect(commentsRepository.findComment).toHaveBeenCalledWith(commentPost.id);
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
      expect(commentsRepository.removeComment).toHaveBeenCalledWith(commentPost.id);
      expect(response).toBe(undefined)
    })
    it('should not remove user comment if comment does not exist', async () => {
      const user = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);
      const comment = returnComment();
      const commentPost = returnCommentItem(user, post, comment);

      jest.spyOn(commentsRepository, 'findComment').mockResolvedValue(undefined);

      await expect(commentsService.removeCommentService(user.id, commentPost.id)).rejects.toEqual(notFoundError());

      expect(commentsRepository.findComment).toHaveBeenCalledWith(commentPost.id);
    })
    it('should not remove user comment if user does not own comment', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const body = bodyPost(1);
      const post = returnBodyPost(user, body);
      const comment = returnComment();
      const commentPost = returnCommentItem(otherUser, post, comment);

      jest.spyOn(commentsRepository, 'findComment').mockResolvedValue(commentPost);
      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);

      await expect(commentsService.removeCommentService(user.id, commentPost.id)).rejects.toEqual(conflictError());

      expect(commentsRepository.findComment).toHaveBeenCalledWith(commentPost.id);
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    })
  })
  describe('getComments function', () => {
    it('should return all comments', async () => {
      const comments = returnCommentsWithUsers();

      jest.spyOn(commentsRepository, 'getAllComments').mockResolvedValue([comments]);

      const response = await commentsService.getComments()

      expect(commentsRepository.getAllComments).toHaveBeenCalled();
      expect(response).toEqual([comments]);
    })
  })
});
