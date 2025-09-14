import { Router } from 'express';
import { User } from '../../sequelize/models/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'email', 'name', 'role'] });
    res.json(user);
  } catch (e) { next(e); }
});

export default router;


