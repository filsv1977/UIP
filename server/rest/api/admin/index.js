import {Router} from 'express';
import patchTask from './patch.js';
import logon from './authLogin.js';
import passport from 'passport';
import logoff from './authLogoff.js';
import exportTasks from './export.js';

const router = Router();

router.patch(
    '/tasks/:id',
    passport.authenticate('basic', {session: false}),
    // true,
    patchTask
);

router.get(
    '/export',
    passport.authenticate('basic', {session: false}),
    // true,
    exportTasks
);

router.post('/auth/logon', passport.authenticate('basic', {session: false}), logon);

router.get('/auth/logoff', passport.authenticate('basic', {session: false}), logoff);

export default router;
