require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  accessTokenSecret,
  refreshTokenSecret,
  expirationTime,
} = require('../../middlewares/jwtAuthenticator');
let { refreshTokenList } = require('../../middlewares/jwtAuthenticator');
const { Users } = require('../../models');

const userSignFunctions = {
  signin: (req, res) => {
    const { username, password } = req.body;

    Users.findOne({
      where: {
        username,
      },
    }).then((result) => {
      if (!result) {
        res.sendStatus(404);
      } else if (result.dataValues.password !== `${password}`) {
        res.sendStatus(401);
      } else {
        const user_id = result.dataValues.id;

        const accessToken = jwt.sign(
          {
            sub: user_id,
          },
          accessTokenSecret,
          { expiresIn: expirationTime },
        );

        const refreshToken = jwt.sign(
          {
            sub: user_id,
          },
          refreshTokenSecret,
        );

        refreshTokenList.push(refreshToken);

        res.status(200).json({
          accessToken,
          refreshToken,
        });
      }
    });
  },
  signup: (req, res) => {
    const {
      username, password, nickname, email,
    } = req.body.user;

    Users.findOrCreate({
      where: {
        username,
      },
      defaults: {
        password,
        nickname,
        email,
      },
    })
      // eslint-disable-next-line
      .then(([result, created]) => {
        if (!created) {
          res.sendStatus(409);
        } else {
          res.sendStatus(201);
        }
      })
      .catch(() => {
        res.sendStatus(409);
      });
  },
  signout: (req, res) => {
    const { refreshToken } = req.body;
    refreshTokenList = refreshTokenList.filter(
      (token) => token !== refreshToken,
    );
    res.status(200).send('Logout successful');
  },
};

module.exports = userSignFunctions;
