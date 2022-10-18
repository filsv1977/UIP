import {Router} from 'express';
import patchTask from './patchTask.js';
import list from './list.js';

const router = Router();

router.get('/', list);
router.patch('/:id', patchTask);

export default router;
