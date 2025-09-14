import { Router } from 'express';
import { authMiddleware } from '../../utils/authMiddleware.js';
import { requireRole } from '../../utils/roleMiddleware.js';
import lessonsAdmin from './lessons.js';
import conversationsAdmin from './conversations.js';

const router = Router();

router.use(authMiddleware, requireRole('admin'));
router.use('/lessons', lessonsAdmin);
router.use('/conversations', conversationsAdmin);

export default router;


