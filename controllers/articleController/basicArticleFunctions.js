const { Articles, Users } = require('../../models');

const basicArticleFunctions = {
  getArticles: (req, res) => {
    Articles.findAll({
      include: [
        {
          model: Users,
          required: true,
          attributes: ['nickname'],
          as: 'Users',
        },
      ],
    })
      .then((rawResult) => rawResult.map((rawData) => {
        // Get properties of articles except user_id
        const {
          id,
          title,
          contents,
          likes,
          dislikes,
          created_at,
        } = rawData.dataValues;

        // Get the nickname of the article owner
        const { nickname } = rawData.dataValues.Users.dataValues;

        // Create a clean object with desired values
        const cleanedObj = {
          id,
          nickname,
          title,
          contents,
          likes,
          dislikes,
          created_at,
        };

        return cleanedObj;
      }))
      .then((result) => {
        res.status(200).json(result);
      });
  },
  postArticle: (req, res) => {
    const { title, contents } = req.body;
    const { sub } = req.user;

    Articles.create({
      title,
      contents,
      user_id: sub,
    })
      .then(() => {
        res.status(201).json({ title });
      })
      .catch(() => {
        res.sendStatus(400);
      });
  },
};

module.exports = basicArticleFunctions;
