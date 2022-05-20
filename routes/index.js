import express from 'express';

//import sessionRouter from './sessionRouter.js';
import authRouter from './authRouter.js';
import challengesRouter from './challengesRouter.js';

const router = express.Router();

router.use(authRouter);
router.use(challengesRouter);
router.use('auth', authRouter);

export default router;
