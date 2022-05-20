import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../database/mongoClient.js';

import dotenv from 'dotenv';
dotenv.config();

export async function createUser(req, res, next) {
  const username = stripHtml(req.body.username);
  const password = stripHtml(req.body.password);

  const users = db.collection('users');
  try {
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .send({ error: `Username ${username} already taken` });
    }

    const newUser = users.insertOne({
      username,
      password: bcrypt.hashSync(password, process.env.BCRYPT_SALT),
    });

    res.locals.userId = newUser._id;
    res.locals.username = username;

    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function findUser(req, res, next) {
  const username = stripHtml(req.body.username);

  const users = db.collection('users');
  try {
    const existingUser = await users.findOne({ username });
    if (!existingUser) {
      return res
        .status(404)
        .send({ error: `Username ${username} not registered` });
    }

    res.locals.userId = existingUser._id;
    res.locals.username = username;

    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function signIn(_req, res) {
  const { userId, username } = res.locals;
  try {
    const sessions = db.collection('sessions');
    const newSession = await sessions.insertOne({ userId });

    const token = jwt.sign(
      { sessionId: newSession._id, userId },
      process.env.JWT_SECRET,
    );
    res.status(200).send({ token, username });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}
