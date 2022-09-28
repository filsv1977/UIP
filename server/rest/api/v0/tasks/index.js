import {Router} from 'express';
// import passport from 'passport';
import createTask from './create.js';
import updateTask from './update.js';
import deleteTask from './delete.js';
import listTask from './getList.js';
import getTask from './getById.js';

const router = Router();

// router.get('/', require('./list'));

router.get(
    '/',
    // passport.authenticate('jwt', { session: false }),
    // true,
    listTask
);

router.get(
    '/:id',
    // passport.authenticate('jwt', { session: false }),
    // true,
    getTask
);

// router.get('/:id', require('./fetch'));

// router.get(
//   '/auth/:id',
//   passport.authenticate('jwt', { session: false }),
//   require('./fetch'),
// );

router.post(
    '/',
    // passport.authenticate('jwt', { session: false }),
    createTask
);

router.put(
    '/:id',
    // passport.authenticate('jwt', { session: false }),
    updateTask
);

router.delete(
    '/:id',
    // passport.authenticate('jwt', { session: false }),
    deleteTask
);

export default router;
