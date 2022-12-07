import {Router} from 'express';
import update from './update.js';
import list from './list.js';

const router = Router();

router.get('/', list);
router.patch('/:id', update);

export default router;
