import { Router } from 'express';
import { Lesson, LessonContent } from '../../sequelize/models/index.js';

const router = Router();

// CRUD skeleton
router.get('/', async (_req, res, next) => {
  try {
    const items = await Lesson.findAll({ include: [{ model: LessonContent, as: 'contents' }] });
    res.json(items);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, contents } = req.body;
    const lesson = await Lesson.create({ title, description });
    if (Array.isArray(contents)) {
      for (const c of contents) {
        await LessonContent.create({ lessonId: lesson.id, contentType: c.contentType, content: c.content });
      }
    }
    res.status(201).json(lesson);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    await lesson.update({ title, description });
    res.json(lesson);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    await lesson.destroy();
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;


