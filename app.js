import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { SERVER } from './blueprint/chalk.js';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.get('/', (_req, res) => {
  res.send('Online');
});
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.bold.yellow(`${SERVER} Server running on port ${PORT}`));
});
