require('dotenv').config();
const jwt = require('jsonwebtoken');

const expirationTime = '20m';
const accessTokenSecret = '@development' || process.env.accessTokenSecret;
const refreshTokenSecret = '@development-refresh' || process.env.refreshTokenSecret;
const refreshTokenList = [];

const jwtAuthenticator = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, accessTokenSecret, (err, user) => {
      if (err) res.sendStatus(403);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  jwtAuthenticator,
  accessTokenSecret,
  refreshTokenSecret,
  refreshTokenList,
  expirationTime,
};
