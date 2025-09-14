import { Router } from 'express';
import multer from 'multer';
import axios from 'axios';
import { authMiddleware } from '../utils/authMiddleware.js';
import { PracticeAttempt, PracticeWord, Submission, ConversationLine } from '../sequelize/models/index.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/:lessonId/understanding', authMiddleware, async (req, res, next) => {
  try {
    // Minimal placeholder: store feedback on understanding
    // In a full impl, this would create UnderstandingFeedback row
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post('/:lessonId/practice/:lineId', authMiddleware, upload.single('audio'), async (req, res, next) => {
  try {
    const { lessonId, lineId } = req.params;
    const line = await ConversationLine.findByPk(lineId);
    if (!line) return res.status(404).json({ error: 'Line not found' });

    const audioUrl = req.file?.path; // in production, upload to storage
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const { data } = await axios.post(`${aiUrl}/analyze`, {
      audio_url: audioUrl,
      target_text: line.text
    });

    const attempt = await PracticeAttempt.create({
      userId: req.user.id,
      lessonId,
      lineId,
      transcribedText: data.transcribed_text,
      accuracyScore: data.accuracy_score,
      fluencyScore: data.fluency_score
    });

    if (Array.isArray(data.words)) {
      for (const w of data.words) {
        await PracticeWord.create({
          attemptId: attempt.id,
          word: w.word,
          status: w.status,
          expected: w.expected,
          position: w.position
        });
      }
    }

    res.json({ attemptId: attempt.id, analysis: data });
  } catch (err) {
    next(err);
  }
});

router.post('/:lessonId/submission', authMiddleware, upload.single('audio'), async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const audioUrl = req.file?.path;
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    // For submission, we can optionally pass concatenated expected text
    const { data } = await axios.post(`${aiUrl}/analyze`, {
      audio_url: audioUrl,
      target_text: req.body.target_text || ''
    });

    const submission = await Submission.create({
      userId: req.user.id,
      lessonId,
      transcribedText: data.transcribed_text,
      accuracyScore: data.accuracy_score,
      fluencyScore: data.fluency_score
    });

    res.json({ submissionId: submission.id, analysis: data });
  } catch (err) {
    next(err);
  }
});

export default router;


