import {Router} from 'express';
import patchTask from './tasks/update.js';
import logon from './auth/logon.js';
import logoff from './auth/logoff.js';
import exportTasks from './export.js';
import ubx2usdt from './ubx2usdt.js';
import checkToken from './auth/checkToken.js';
import {isAdminAuth} from '../../../strategies/autentification.js';

const router = Router();

router.patch('/tasks/:id', isAdminAuth, patchTask);
router.get('/export', isAdminAuth, exportTasks);
router.get('/ubx2usdt', isAdminAuth, ubx2usdt);
router.post('/auth/logon', logon);
router.get('/auth/logoff', isAdminAuth, logoff);
router.get('/auth/checkToken', isAdminAuth, checkToken);

export default router;
