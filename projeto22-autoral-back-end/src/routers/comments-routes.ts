import { Router } from 'express';
import { commentPost, getCommentsPosts, removeCommentPost } from '../controllers';
import { authenticateToken } from '../middlewares';

const commentsRouter = Router();

commentsRouter
  .all('/*', authenticateToken)
  .get('/', getCommentsPosts)
  .post('/', commentPost)
  .delete('/:commentId', removeCommentPost);

export { commentsRouter };
