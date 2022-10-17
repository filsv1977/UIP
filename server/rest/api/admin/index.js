import {Router} from 'express';
import logon from './auth/logon.js';
import logoff from './auth/logoff.js';
import exportTasks from './exportTasks.js';
import ubx2usdt from './ubx2usdt.js';
import checkToken from './auth/checkToken.js';
import {isAdminAuth} from '../../../strategies/autentification.js';
import patchTask from './tasks/patchTask.js';

const router = Router();

router.get('/export', isAdminAuth, exportTasks);
router.get('/ubx2usdt', isAdminAuth, ubx2usdt);
router.post('/auth/logon', logon);
router.get('/auth/logoff', isAdminAuth, logoff);
router.get('/auth/checkToken', isAdminAuth, checkToken);
router.patch('/tasks/:id', isAdminAuth, patchTask);

export default router;
