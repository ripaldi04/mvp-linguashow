import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import authRouter from './routes/auth.js';
import lessonsRouter from './routes/lessons.js';
import progressRouter from './routes/progress.js';
import conversationsRouter from './routes/conversations.js';
import adminRouter from './routes/admin/index.js';
import userRouter from './routes/user/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRouter);
app.use('/lessons', lessonsRouter);
app.use('/progress', progressRouter);
app.use('/conversations', conversationsRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;


