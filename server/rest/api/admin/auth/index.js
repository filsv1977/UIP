import {Router} from 'express';
import logon from './logon.js';
import logoff from './logoff.js';

import checkToken from './checkToken.js';
import {isAdminAuth} from '../../../../strategies/autentification.js';

const router = Router();

router.post('/logon', logon);
router.get('/logoff', isAdminAuth, logoff);
router.get('/checkToken', isAdminAuth, checkToken);

export default router;
