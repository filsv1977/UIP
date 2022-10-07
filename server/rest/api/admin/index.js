import {Router} from 'express';
import patchTask from './tasks/update.js';
import logon from './auth/logon.js';
import logoff from './auth/logoff.js';
import exportTasks from './export.js';
import convertParams from './convertParams.js';
import {isAdmin} from '../../../strategies/isAdmin.js';

const router = Router();

router.patch('/tasks/:id', patchTask);

router.get('/export', exportTasks);

router.get('/convert', isAdmin, convertParams);

router.post('/auth/logon', logon);

router.get('/auth/logoff', logoff);

export default router;
