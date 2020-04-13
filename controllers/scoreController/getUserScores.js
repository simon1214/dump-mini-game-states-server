const { Scores } = require('../../models');

const getUserScores = (req, res) => {
  const user_id = req.user.sub;
  Scores.findAll({ where: { user_id } })
    .then((rawResult) => rawResult.map((rawData) => {
      const { game_id, score, created_at } = rawData.dataValues;
      return {
        user_id,
        game_id,
        score,
        created_at,
      };
    }))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(400).send("Couldn't search for the scores");
    });
};

module.exports = getUserScores;
