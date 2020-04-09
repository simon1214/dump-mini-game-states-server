const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.accessTokenSecret

const jwtAuthenticator = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    jwt.verify(authHeader, accessTokenSecret, (err, user) => {
      if (err) res.sendStatus(403)

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }

}

module.exports = jwtAuthenticator