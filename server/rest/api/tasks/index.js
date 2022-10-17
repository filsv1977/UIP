import {Router} from 'express';
import list from './list.js';
import {isAdminAuth} from '../../../strategies/autentification.js';
import patchTask from './patchTask.js';

const router = Router();

router.get('/', list);
router.patch('/tasks/:id', isAdminAuth, patchTask);

export default router;
