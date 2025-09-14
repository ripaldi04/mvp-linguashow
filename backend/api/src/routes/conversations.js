import { Router } from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';
import { ConversationVideo } from '../sequelize/models/index.js';

const router = Router();

router.get('/:id/videos', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const videos = await ConversationVideo.findAll({ where: { conversationId: id } });
    res.json({ videos });
  } catch (err) {
    next(err);
  }
});

export default router;


