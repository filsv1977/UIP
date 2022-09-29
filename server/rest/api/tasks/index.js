import {Router} from 'express';
import updateTask from './update.js';
import listTask from './getList.js';

const router = Router();

router.get('/', listTask);

router.put('/:id', updateTask);

export default router;
