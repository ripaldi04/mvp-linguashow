import { Router } from 'express';
import { Conversation, ConversationLine, ConversationVideo } from '../../sequelize/models/index.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await Conversation.findAll({ include: [{ model: ConversationLine, as: 'lines' }] });
    res.json(items);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { lessonId, title, lines, videos } = req.body;
    const conv = await Conversation.create({ lessonId, title });
    if (Array.isArray(lines)) {
      for (const l of lines) {
        await ConversationLine.create({ 
          conversationId: conv.id, 
          speaker: l.speaker, 
          text: l.text,
          audioUrl: l.audioUrl 
        });
      }
    }
    if (Array.isArray(videos)) {
      for (const v of videos) {
        await ConversationVideo.create({ conversationId: conv.id, url: v.url, label: v.label });
      }
    }
    res.status(201).json(conv);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const conv = await Conversation.findByPk(id);
    if (!conv) return res.status(404).json({ error: 'Not found' });
    await conv.update({ title });
    res.json(conv);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const conv = await Conversation.findByPk(id);
    if (!conv) return res.status(404).json({ error: 'Not found' });
    await conv.destroy();
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;


