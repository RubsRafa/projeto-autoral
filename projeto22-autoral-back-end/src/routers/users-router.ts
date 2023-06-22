import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { editUserInfoController, getUsersInfoController, searchForUser } from '../controllers';
import { usersEditSchema } from '../schemas';

const userRouter = Router();

userRouter
  .all('/*', authenticateToken)
  .get('/find/:name', searchForUser)
  .get('/:userId', getUsersInfoController)
  .put('/edit', validateBody(usersEditSchema), editUserInfoController);

export { userRouter };
