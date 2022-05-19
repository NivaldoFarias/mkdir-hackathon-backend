import { Router } from 'express';

import * as auth from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/api/auth/sign-up', auth.signUp);
authRouter.post('/api/auth/sign-in', auth.signIn);

export default authRouter;
