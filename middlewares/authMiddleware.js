import jwt from 'jsonwebtoken';
import db from '../database/mongoClient.js';

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];

  const { sessionId, userId, error } = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      return err ? { error: 'Invalid token' } : decoded;
    },
  );

  if (error) return res.status(401).send(error);

  try {
    const activeSession = await db
      .collection('sessions')
      .find({ _id: sessionId });
    if (!activeSession)
      return res.status(401).send({ error: 'No active session for token' });

    res.locals.userInfo = {
      userId,
      sessionId,
    };

    next();
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while validating token',
      detail: err,
    });
  }
}
