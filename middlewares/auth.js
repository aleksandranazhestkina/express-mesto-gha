const { JWT_SECRET = 'dev-key' } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { Аuthorization } = req.headers;

  if (!Аuthorization || !Аuthorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }

  const token = Аuthorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }
  req.user = payload;

  next();
};
