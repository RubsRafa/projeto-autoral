import { Router } from 'express';
import { addRepostPost, removeRepostPost } from '../controllers';
import { authenticateToken } from '../middlewares';

const repostsRouter = Router();

repostsRouter.all('/*', authenticateToken).post('/', addRepostPost).delete('/:postId', removeRepostPost);

export { repostsRouter };
