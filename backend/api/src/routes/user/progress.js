import { Router } from 'express';
import { UserProgress, Submission, PracticeAttempt, PracticeWord } from '../../sequelize/models/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const up = await UserProgress.findAll({ where: { userId: req.user.id } });
    res.json({ progress: up });
  } catch (e) { next(e); }
});

router.get('/submissions', async (req, res, next) => {
  try {
    const subs = await Submission.findAll({ where: { userId: req.user.id } });
    res.json({ submissions: subs });
  } catch (e) { next(e); }
});

router.get('/practice/:attemptId', async (req, res, next) => {
  try {
    const { attemptId } = req.params;
    const attempt = await PracticeAttempt.findOne({ where: { id: attemptId, userId: req.user.id } });
    if (!attempt) return res.status(404).json({ error: 'Not found' });
    const words = await PracticeWord.findAll({ where: { attemptId: attempt.id } });
    res.json({ attempt, words });
  } catch (e) { next(e); }
});

export default router;


