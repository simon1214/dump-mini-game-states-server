const { Users, Scores, Games } = require('../../models');

const getLeaderboard = (req, res) => {
  const { gameTitle } = req.body;

  Games.findOne({ where: { name: gameTitle } }).then((rawResult) => {
    const game_id = rawResult.dataValues.id;

    Scores.findAll({
      order: [['score', 'DESC']],
      limit: 10,
      where: {
        game_id,
      },
      include: [
        {
          model: Users,
          as: 'Users',
          attributes: ['nickname'],
        },
      ],
    })
      .then((rawResult) => {
        // Filtering keys to return
        const filteredResult = rawResult.map((rawData, index) => {
          const { score, Users } = rawData.dataValues;
          const { nickname } = Users.dataValues;
          return {
            place: index + 1,
            nickname,
            score,
          };
        });

        // Cleaning up the result object to send back
        const refinedResult = {
          gameTitle,
          leaderboard: filteredResult,
        };

        res.status(200).json(refinedResult);
      })
      .catch(() => {
        res.status(400).send('Error');
      });
  });
};

module.exports = getLeaderboard;
