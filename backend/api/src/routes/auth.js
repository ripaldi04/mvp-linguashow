import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../sequelize/models/index.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password, name } = req.body;
      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ error: 'Email already exists' });

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ email, passwordHash, name });
      return res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.passwordHash || '');
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { sub: user.id, email: user.email, role: user.role || 'user' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

export default router;


