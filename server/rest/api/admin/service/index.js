import {Router} from 'express';
import exportTasks from './exportTasks.js';
import ubx2usdt from './ubx2usdt.js';
import {isAdminAuth} from '../../../../strategies/autentification.js';

const router = Router();

router.get('/export', isAdminAuth, exportTasks);
router.get('/ubx2usdt', isAdminAuth, ubx2usdt);

export default router;
