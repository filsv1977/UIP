import {Router} from 'express';
import list from './list.js';

const router = Router();

router.get('/tasks', list);

export default router;
