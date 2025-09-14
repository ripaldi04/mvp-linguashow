import { Router } from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';
import { Lesson, LessonContent, Conversation, ConversationLine } from '../sequelize/models/index.js';

const router = Router();

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id, {
      include: [{ model: LessonContent, as: 'contents' }]
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/conversation', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findOne({
      where: { lessonId: id },
      include: [{ model: ConversationLine, as: 'lines' }]
    });
    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
    res.json(conversation);
  } catch (err) {
    next(err);
  }
});

export default router;


