import { Router } from 'express';
import { ChatSchema } from '../schemas';
import { deleteMessage, getUserMessages, getUsersChat, sendNewMessages } from '../controllers';
import { authenticateToken, validateBody } from '../middlewares';

const chatRouter = Router();

chatRouter
  .all('/*', authenticateToken)
  .get('/users', getUsersChat)
  .get('/:userId', getUserMessages)
  .post('/', validateBody(ChatSchema), sendNewMessages)
  .delete('/:messageId', deleteMessage);

export { chatRouter };
