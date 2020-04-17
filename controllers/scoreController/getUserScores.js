const { Scores, Users, Games } = require('../../models');

const getUserScores = (req, res) => {
  const user_id = req.user.sub;
  Scores.findAll({
    where: { user_id },
    include: [
      {
        model: Users,
        as: 'Users',
        attributes: ['nickname'],
        required: true,
      },
      {
        model: Games,
        as: 'Games',
      },
    ],
  })
    .then((rawResult) => {
      if (rawResult.length < 1) {
        return res.status(400).send('No scores available');
      }

      const { nickname } = rawResult[0].dataValues.Users.dataValues;

      // Clean the raw results to only include score and game title
      const rawScores = rawResult.map((rawData) => {
        // eslint-disable-next-line
        const { score, Games } = rawData.dataValues;
        return { score, gameTitle: Games.dataValues.name };
      });

      /* Seperate scores based on game title */

      // Add unique game titles to set
      const gameTitles = new Set();
      rawResult.forEach((rawData) => {
        gameTitles.add(rawData.dataValues.Games.name);
      });

      const arrayToReturn = [];
      // eslint-disable-next-line
      for (const gameTitle of gameTitles) {
        const filteredGameScores = rawScores.filter(
          (raw) => raw.gameTitle === gameTitle,
        );
        const saveOnlyGameScores = filteredGameScores.reduce(
          (acc, curr) => [...acc, curr.score],
          [],
        );
        arrayToReturn.push({ gameTitle, scores: saveOnlyGameScores });
      }

      return res.status(200).json({ nickname, games: arrayToReturn });
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err);
      res.status(400).send("Couldn't search for the scores");
    });
};

module.exports = getUserScores;
