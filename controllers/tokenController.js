const jwt = require('jsonwebtoken')
const {refreshTokenList, refreshTokenSecret, accessTokenSecret, expirationTime} = require('../middlewares/jwtAuthenticator')

const tokenController = {
  getNewToken : (req, res) => {
    const {refreshToken} = req.body

    if (!refreshToken) {
      return res.sendStatus(401)
    }
    
    if (!refreshTokenList.includes(refreshToken)) {
      return res.sendStatus(403)
    }
      jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403)
        }
        const accessToken = jwt.sign({
          sub:user.sub
        }, accessTokenSecret, {
          expiresIn:expirationTime
        })
  
        res.status(201).json({accessToken})
      })
  }
}

module.exports = tokenController