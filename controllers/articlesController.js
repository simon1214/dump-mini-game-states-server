const { Articles, Users } = require('../models');

const articlesController = {
  getArticles: (req, res) => {
    Articles.findAll()
      .then((rawResult) => {
        return rawResult.map((rawData) => rawData.dataValues);
      })
      .then((untrimmedResult) => {
        return untrimmedResult.map(async (article) => {
          const nickname = await Users.findByPk(article.user_id).then(
            (result) => {
              console.log(result.nickname);
              return result.nickname;
            },
          );
          console.log('nickname : ', nickname);
          return {
            ...article,
            [nickname]: nickname,
          };
        });
      })
      .then((result) => {
        console.log(result);
      });
    res.sendStatus(200);
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

module.exports = articlesController;
