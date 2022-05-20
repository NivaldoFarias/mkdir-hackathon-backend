import { Router } from 'express';
import { getTemplate } from '../controllers/challengesController.js';

const challengesRouter = Router();

challengesRouter.get('/template', getTemplate);

export default challengesRouter;
