import { Router } from 'express';
import { getClients, updateClientStatus } from '../controllers/clientController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getClients);
router.patch('/:id', authenticate, updateClientStatus);

export default router;
