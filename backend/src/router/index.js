import express from 'express';

import user from './user';
import auth from './auth';
import post from './post';
import folder from './folder';
import work from './work';
import plan from './plan';

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);
router.use('/post', post);
router.use('/folder', folder);
router.use('/work', work);
router.use('/plan', plan);

export default router;
