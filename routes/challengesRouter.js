import { Router } from 'express';
import {
  getTemplate,
  getChallenges,
  postChallenge,
} from '../controllers/challengesController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const challengesRouter = Router();

challengesRouter.get('/template', getTemplate);
challengesRouter.get('/challenges', getChallenges);
challengesRouter.post('/challenges', validateToken, postChallenge);

export default challengesRouter;
