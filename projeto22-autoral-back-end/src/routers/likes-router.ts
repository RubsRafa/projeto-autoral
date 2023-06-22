import { Router } from 'express';
import { dislikePost, getAllLikes, getLikes, likePost } from '../controllers';
import { authenticateToken } from '../middlewares';

const likesRouter = Router();

likesRouter
  .all('/*', authenticateToken)
  .get('/users', getAllLikes)
  .get('/', getLikes)
  .post('/', likePost)
  .delete('/:postId', dislikePost);

export { likesRouter };
