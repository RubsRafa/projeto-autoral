import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { deleteUserPosts, getPosts, getUserPosts, postAPost } from '../controllers';
import { postsSchema } from '../schemas';

const postsRouter = Router();

postsRouter
  .all('/*', authenticateToken)
  .get('/', getPosts)
  .get('/user/:userId', getUserPosts)
  .post('/', validateBody(postsSchema), postAPost)
  .delete('/:postId', deleteUserPosts);

export { postsRouter };
