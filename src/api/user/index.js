import { Router } from 'express';
import { password, master, token } from '../../services/passport';
import { checkUserExists, register, signIn, signOut } from './controller';
import { validations, registerValidator } from './helpers';

const router = new Router();

router.post(
  '/register',
  master(),
  validations,
  registerValidator,
  checkUserExists,
  register
);
router.post('/sign-in', master(), password(), signIn);
router.get('/sign-out', token({ required: true }), signOut);

export default router;
