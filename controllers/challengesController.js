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

export async function getChallenges(_req, res) {
  try {
    const challenges = await db.collection('challenges').find({});
    res.status(200).send(challenges);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting challenges',
      detail: err,
    });
  }
}

export async function postChallenge(req, res) {
  try {
    await db.collection('challenges').insertOne(req.body);
    res.status(201).send('Challenge created');
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while getting challenges',
      detail: err,
    });
  }
}
