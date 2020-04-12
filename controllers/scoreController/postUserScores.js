const { Games, Scores } = require('../../models');

const postUserScores = (req, res) => {
  // Find or create the game in the games table
  // Register the score along with the given user_id using JWT token
  const { score, gameTitle } = req.body;
  const user_id = req.user.sub;
  Games.findOrCreate({ where: { name: gameTitle } })
    .then(([result]) => {
      const game_id = result.dataValues.id;
      Scores.create({
        user_id,
        game_id,
        score,
      })
        .then(() => {
          res.status(201).send('Score saved!');
        })
        .error(() => {
          res.status(401).send('Score failed to save');
        });
    })
    .catch(() => {
      res.status(400).send('Error in Games table');
    });
};

module.exports = postUserScores;
