const { Users } = require('../../models');

const userCheckDuplicates = {
  checkDuplicateID: (req, res) => {
    const { username } = req.body;
    Users.findOne({ where: { username } }).then((result) => {
      if (result) {
        res.status(200).send('Username already exists');
      } else {
        res.status(200).send('Username available');
      }
    });
  },
  checkDuplicateNickname: (req, res) => {
    const { nickname } = req.body;
    Users.findOne({ where: { nickname } }).then((result) => {
      if (result) {
        res.status(200).send('Nickname taken!');
      } else {
        res.status(200).send('Nickname Available');
      }
    });
  },
};

module.exports = userCheckDuplicates;
