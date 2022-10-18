import {Router} from 'express';
import authRouter from './auth/index.js';
import tasksRouter from './tasks/index.js';
import serviceRouter from './service/index.js';
import {isAdminAuth} from '../../../strategies/autentification.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', isAdminAuth, tasksRouter);
router.use('/service', isAdminAuth, serviceRouter);

export default router;
