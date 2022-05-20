import express from 'express';

//import sessionRouter from './sessionRouter.js';
import authRouter from './authRouter.js';
import challengesRouter from './challengesRouter.js';

const router = express.Router();

//router.use(sessionRouter);
router.use(authRouter);
router.use(challengesRouter);

export default router;
