require('dotenv').config()
const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.accessTokenSecret || "@development"

const {Users} = require('../models')

const userController = {
  signin : (req, res) => {
    const {username, password} = req.body

    Users.findOne({
      where:{
        username
      }
    }).then(result => {
      if (!result) {
        res.sendStatus(404)
      } else {
        if (result.dataValues.password !== `${password}`) {
          res.sendStatus(401)
        } else {
          const accessToken = jwt.sign({
            sub:result.dataValues.id,
            iat:Date.now()
          }, accessTokenSecret)

          res.status(200).json({token:accessToken})
        }

      }
      
    })
    
    
  },
  signup : (req, res) => {
    const {username, password, nickname, email} = req.body

    Users.findOrCreate({
      where: {
        username
      },
      defaults: {
        password,
        nickname,
        email
      }
    }).then(([result, created]) => {
      if (!created) {
        res.sendStatus(409)
      } else {
        res.sendStatus(201)
      }
    }).catch(err => {
      res.sendStatus(409)
    })
  },
  signout : (req, res) => {
    res.sendStatus(200)
  }
}

module.exports = userController