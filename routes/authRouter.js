import { Router } from 'express';

import { signIn, createUser, findUser } from '../controllers/authController.js';
import { validateUser } from '../middlewares/userSchema.js';

const authRouter = Router();

authRouter.post('/auth/sign-up', validateUser, createUser, signIn);
authRouter.post('/auth/sign-in', validateUser, findUser, signIn);

export default authRouter;
