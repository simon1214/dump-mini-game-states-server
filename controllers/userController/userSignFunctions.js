require('dotenv').config();
const jwt = require('jsonwebtoken');
const encrypt = require('../../modules/crypto');

const {
  accessTokenSecret,
  refreshTokenSecret,
  expirationTime,
} = require('../../middlewares/jwtAuthenticator');
let { refreshTokenList } = require('../../middlewares/jwtAuthenticator');
const { Users } = require('../../models');

const userSignFunctions = {
  signin: (req, res) => {
    const { username, password } = req.body.user;
    const encryptedPW = encrypt(password);

    Users.findOne({
      where: {
        username,
      },
    }).then((result) => {
      if (!result) {
        res.sendStatus(404);
      } else if (result.dataValues.password !== encryptedPW) {
        res.sendStatus(401);
      } else {
        const user_id = result.dataValues.id;

        // JWT 토큰을 두 개 생성 후 반환
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
          { expiresIn: '1d' },
        );

        refreshTokenList.push(refreshToken);

        res.status(200).json({
          accessToken,
          refreshToken,
          user: { nickname: result.dataValues.nickname },
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
