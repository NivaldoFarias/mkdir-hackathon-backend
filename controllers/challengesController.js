import dotenv from 'dotenv';
import db from '../database/mongoClient.js';
// import { SUCCESS, ERROR } from "./../models/blueprint/chalk.js";

export async function getTemplate(_req, res) {
  try {
    const template = await db.collection('templates').findOne({});
    res.send(template);
  } catch (err) {
    // console.log(chalk.red(`${ERROR} ${err}`));
    res.status(500).send({
      message: 'Internal error while getting template',
      detail: err,
    });
  }
}
