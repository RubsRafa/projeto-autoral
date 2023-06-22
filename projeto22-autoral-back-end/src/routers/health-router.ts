import { Router } from 'express';
import { addHumor, changeHumorItem, deleteHumorItem, getUserHumorDiary } from '../controllers';
import { authenticateToken } from '../middlewares';

const healthRouter = Router();

healthRouter
  .all('/*', authenticateToken)
  .get('/', getUserHumorDiary)
  .post('/', addHumor)
  .put('/', changeHumorItem)
  .delete('/:id', deleteHumorItem);

export { healthRouter };
