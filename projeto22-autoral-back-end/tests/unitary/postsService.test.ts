import { jest } from '@jest/globals';
import { bodyChangePostParams, bodyPost, bodyPostWithNoText, bodyPostWithTextEmpty, postWithNothing, returnBodyPost, returnFollows, returnGetPosts, returnGetReposts, returnReposts, returnUserExist } from '../factories';
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
    it('should return filtered and sorted posts', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const post = returnGetPosts(otherUser);
      const posts = [post];
      const repost = returnReposts(otherUser, post);
      const reposts = [repost];
      const repostAsPost = returnGetReposts(post, repost);
      const repostsToConcat = [repostAsPost];
      const follow = returnFollows(user, otherUser);
      const follows = [follow];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
      jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(follows);

      const response = await postsService.getPostsService(user.id);
      const result = posts.concat(repostsToConcat);
      result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(result);
    });
    it('should return no post if user does not follow anyone', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const post = returnGetPosts(otherUser);
      const posts = [post];
      const repost = returnReposts(otherUser, post);
      const reposts = [repost];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
      jest.spyOn(followsRepository, 'getAllFollows').mockImplementationOnce((): any => {
        return [];
      });

      const response = await postsService.getPostsService(user.id);

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual([]);
    });
    it('should return only post user made', async () => {
      const user = returnUserExist();
      const post = returnGetPosts(user);
      const posts = [post];
      const repost = returnReposts(user, post);
      const reposts = [repost];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
      jest.spyOn(followsRepository, 'getAllFollows').mockImplementationOnce((): any => {
        return [];
      });

      const response = await postsService.getPostsService(user.id);
   

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(posts)
    });
    it('should return post from my follows', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const post = returnGetPosts(otherUser);
      const posts = [post];
      const follow = returnFollows(user, otherUser);
      const follows = [follow];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockImplementationOnce((): any => {
        return [];
      });
      jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(follows);

      const response = await postsService.getPostsService(user.id);

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(posts);
    });
    it('should return my post not reposted', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const post = returnGetPosts(user);
      const posts = [post];
      const follow = returnFollows(user, otherUser);
      const follows = [follow];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockImplementationOnce((): any => {
        return [];
      });
      jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(follows);

      const response = await postsService.getPostsService(user.id);

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(posts);
    });
    it('should return reposted posts by me', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const thirdUser = returnUserExist();
      const post = returnGetPosts(thirdUser);
      const posts = [post];
      const repost = returnReposts(user, post);
      const reposts = [repost];
      const repostAsPost = returnGetReposts(post, repost);
      const repostsToConcat = [repostAsPost];
      const follow = returnFollows(user, otherUser);
      const follows = [follow];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
      jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(follows);

      const response = await postsService.getPostsService(user.id);

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(repostsToConcat);
    });
    it('should return reposted posts by followers', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const thirdUser = returnUserExist();
      const post = returnGetPosts(thirdUser);
      const posts = [post];
      const repost = returnReposts(otherUser, post);
      const reposts = [repost];
      const repostFromFollower = returnGetReposts(post, repost);
      const follow = returnFollows(user, otherUser);
      const follows = [follow];

      const getAllPostsMock = jest.spyOn(postsRepository, 'getAllPosts').mockResolvedValueOnce(posts);
      const getAllRepostsMock = jest.spyOn(repostsRepository, 'getAllReposts').mockResolvedValueOnce(reposts);
      jest.spyOn(followsRepository, 'getAllFollows').mockResolvedValueOnce(follows);

      const response = await postsService.getPostsService(user.id);

      expect(getAllPostsMock).toHaveBeenCalled();
      expect(getAllRepostsMock).toHaveBeenCalled();
      expect(followsRepository.getAllFollows).toHaveBeenCalledWith(user.id);
      expect(response).toEqual([repostFromFollower]);
    });
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
    it('should return only user post and reposts', async () => {
      const otherUser = returnUserExist();
      const post = returnGetPosts(otherUser);
      const posts = [post];
      const repost = returnReposts(otherUser, post);
      const reposts = [repost];
      const repostAsPost = returnGetReposts(post, repost);
      const repostsToConcat = [repostAsPost];


      jest.spyOn(authenticantionRepository, 'findUserById').mockResolvedValue(otherUser);
      jest.spyOn(postsRepository, 'getAllUserPosts').mockResolvedValueOnce(posts);
      jest.spyOn(repostsRepository, 'getAllUserReposts').mockResolvedValueOnce(reposts);

      const response = await postsService.getUserAllPosts(otherUser.id);
      const result = posts.concat(repostsToConcat);
      result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

      expect(authenticantionRepository.findUserById).toHaveBeenCalledWith(otherUser.id);
      expect(postsRepository.getAllUserPosts).toHaveBeenCalledWith(otherUser.id);
      expect(repostsRepository.getAllUserReposts).toHaveBeenCalledWith(otherUser.id);
      expect(response).toEqual(result);
    });
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
      const post = returnGetPosts(user);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);
      jest.spyOn(postsRepository, 'deletePost').mockResolvedValue(null);

      const response = await postsService.deletePostService(user.id, post.id)
      
      expect(response).toBe(undefined)
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
      expect(postsRepository.deletePost).toHaveBeenCalledWith(post.id);
    })
    it('should not delete if post does not exist', async () => {
      const user = returnUserExist();
      const post = returnGetPosts(user);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(undefined);

      await expect(postsService.deletePostService(user.id, post.id)).rejects.toEqual(conflictError());
      
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    })
    it('should not delete if user does not own post', async () => {
      const user = returnUserExist();
      const otherUser = returnUserExist();
      const post = returnGetPosts(otherUser);

      jest.spyOn(likesRepository, 'findPostById').mockResolvedValue(post);

      await expect(postsService.deletePostService(user.id, post.id)).rejects.toEqual(conflictError());
      
      expect(likesRepository.findPostById).toHaveBeenCalledWith(post.id);
    })
  })
});
