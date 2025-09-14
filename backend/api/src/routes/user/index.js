import { Router } from 'express';
import { authMiddleware } from '../../utils/authMiddleware.js';
import meRouter from './me.js';
import progressRouter from './progress.js';

const router = Router();

router.use(authMiddleware);
router.use('/me', meRouter);
router.use('/progress', progressRouter);

export default router;


