import { Router } from 'express';
import user from './user';

const router = new Router();

router.use('/user', user);

export default router;
