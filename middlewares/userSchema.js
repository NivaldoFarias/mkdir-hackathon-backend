import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(2).required().messages({
    'string.min': 'Username must be at least 2 characters long',
    'any.required': 'Username is a required field',
  }),
  password: Joi.string().min(3).required().messages({
    'string.min': 'Password must be at least 3 characters long',
    'any.required': 'Password is a required field',
  }),
});

export function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  next();
}
