import { Router } from 'express';
import { followAnUser, getMyFollows, removeFollow } from '../controllers';
import { authenticateToken } from '../middlewares';

const followsRouter = Router();

followsRouter
  .all('/*', authenticateToken)
  .get('/:userId', getMyFollows)
  .post('/', followAnUser)
  .delete('/:followId', removeFollow);

export { followsRouter };
